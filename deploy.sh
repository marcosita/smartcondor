#!/usr/bin/env bash
set -e

# ==============================================================================
# SMARTCONDO - AUTOMATED DEPLOYMENT SCRIPT
# Target: storne.com.br (86.48.5.55:22)
# ==============================================================================

SERVER_HOST="86.48.5.55"
SERVER_PORT="22"
SERVER_USER="root"
REMOTE_DIR="/www/wwwroot/storne.com.br"
APP_NAME="storne-smartcondo"
APP_PORT="3050"
KEY_FILE="./deploy_key"
DOMAIN="storne.com.br"

echo "🚀 ====================================================="
echo "🚀 INICIANDO DEPLOY AUTOMÁTICO: $DOMAIN ($SERVER_HOST)"
echo "🚀 ====================================================="

# 1. Check SSH Key
if [ ! -f "$KEY_FILE" ]; then
  echo "❌ Chave SSH $KEY_FILE não encontrada!"
  exit 1
fi
chmod 600 "$KEY_FILE"

SSH_OPTS="-i $KEY_FILE -p $SERVER_PORT -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ConnectTimeout=8 -o BatchMode=yes"

# Helper for resilient SSH execution (handles Contabo routing retries)
run_remote_ssh() {
  local cmd="$1"
  local attempts=6
  for i in $(seq 1 $attempts); do
    if ssh $SSH_OPTS "$SERVER_USER@$SERVER_HOST" "$cmd"; then
      return 0
    fi
    echo "⚠️ Tentativa SSH $i/$attempts falhou, aguardando reconexão..."
    sleep 2
  done
  echo "❌ Falha ao executar comando SSH remoto após $attempts tentativas."
  return 1
}

# 2. Local Production Build
echo "📦 1/5. Compilando o projeto Next.js localmente..."
npm run build

# 3. Create remote directory if not exists & unlock aaPanel files
echo "📂 2/5. Preparando ambiente remoto..."
run_remote_ssh "mkdir -p $REMOTE_DIR && chattr -i $REMOTE_DIR/.user.ini 2>/dev/null || true"

# 4. Sync files via rsync (with retry)
echo "🔄 3/5. Enviando arquivos para o servidor ($REMOTE_DIR)..."
RSYNC_SUCCESS=0
for i in {1..6}; do
  if rsync -avz \
    -e "ssh $SSH_OPTS" \
    --exclude "node_modules" \
    --exclude ".git" \
    --exclude "deploy_key*" \
    --exclude ".DS_Store" \
    --exclude ".user.ini" \
    --exclude ".well-known" \
    ./ "$SERVER_USER@$SERVER_HOST:$REMOTE_DIR/"; then
    RSYNC_SUCCESS=1
    break
  fi
  echo "⚠️ Falha no rsync (tentativa $i/6), tentando novamente em 2 segundos..."
  sleep 2
done

if [ $RSYNC_SUCCESS -ne 1 ]; then
  echo "❌ Erro ao sincronizar arquivos via rsync."
  exit 1
fi

# 5. Remote install, PM2 start/reload and Nginx config
echo "⚙️ 4/5. Instalando dependências e iniciando processo PM2 no servidor..."
REMOTE_SETUP_CMD="
set -e
cd $REMOTE_DIR

# Assegurar symlink de assets estáticos Next.js
ln -sfn $REMOTE_DIR/.next $REMOTE_DIR/_next

echo '📥 Instalando pacotes no servidor...'
npm install --legacy-peer-deps

echo '🔄 Configurando Nginx Reverse Proxy com entrega estática para porta $APP_PORT...'
cat << 'NGINX_CONF' > /www/server/panel/vhost/rewrite/$DOMAIN.conf
location ^~ /_next/static/ {
    alias $REMOTE_DIR/.next/static/;
    expires 365d;
    access_log off;
    types {
        text/css css;
        application/javascript js;
        font/woff2 woff2;
        font/woff woff;
    }
}

location ^~ /_next/ {
    proxy_pass http://127.0.0.1:$APP_PORT;
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host \$host;
    proxy_cache_bypass \$http_upgrade;
}

location / {
    proxy_pass http://127.0.0.1:$APP_PORT;
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_cache_bypass \$http_upgrade;
}
NGINX_CONF

echo '🔄 Recarregando Nginx...'
nginx -t && (nginx -s reload || /etc/init.d/nginx reload)

echo '🚀 Gerenciando processo PM2 $APP_NAME...'
rm -f $REMOTE_DIR/index.html
if pm2 describe $APP_NAME > /dev/null 2>&1; then
  pm2 restart $APP_NAME --update-env
else
  pm2 start ecosystem.config.cjs
fi

pm2 save
echo '✅ Processo PM2 configurado com sucesso!'
"

run_remote_ssh "$REMOTE_SETUP_CMD"

# 6. Verify Online Health Check
echo "🔍 5/5. Verificando status do serviço..."
sleep 3
HTTP_REDIRECT=$(curl --retry 5 --retry-connrefused --retry-delay 2 -s -o /dev/null -w "%{http_code}" "http://$DOMAIN" || echo "000")
HTTPS_STATUS=$(curl --retry 5 --retry-connrefused --retry-delay 2 -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" || echo "000")

echo ""
echo "🎉 ====================================================="
echo "🎉 DEPLOY CONCLUÍDO COM SUCESSO!"
echo "🌐 URL Segura (HTTPS): https://$DOMAIN"
echo "📡 Status HTTPS: $HTTPS_STATUS | Redirecionamento HTTP: $HTTP_REDIRECT"
echo "🎉 ====================================================="
