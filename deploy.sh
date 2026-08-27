#!/usr/bin/env bash
set -e

# ==============================================================================
# SMARTCONDOR - AUTOMATED DEPLOYMENT SCRIPT
# Target: smartcondor.isol.com.br
# ==============================================================================

SERVER_HOST="smartcondor.isol.com.br"
SERVER_PORT="2251"
SERVER_USER="root"
REMOTE_DIR="/www/wwwroot/smartcondor.isol.com.br"
APP_PORT="3050"
KEY_FILE="./deploy_key"

echo "🚀 ====================================================="
echo "🚀 INICIANDO DEPLOY AUTOMÁTICO: $SERVER_HOST"
echo "🚀 ====================================================="

# 1. Check SSH Key
if [ ! -f "$KEY_FILE" ]; then
  echo "❌ Chave SSH $KEY_FILE não encontrada!"
  exit 1
fi
chmod 600 "$KEY_FILE"

# 2. Local Production Build
echo "📦 1/5. Compilando o projeto Next.js localmente..."
npm run build

# 3. Create remote directory if not exists & unlock aaPanel files
echo "📂 2/5. Preparando ambiente remoto..."
ssh -i "$KEY_FILE" -p "$SERVER_PORT" -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_HOST" "mkdir -p $REMOTE_DIR && chattr -i $REMOTE_DIR/.user.ini 2>/dev/null || true"

# 4. Sync files via rsync
echo "🔄 3/5. Enviando arquivos para o servidor ($REMOTE_DIR)..."
rsync -avz \
  -e "ssh -i $KEY_FILE -p $SERVER_PORT -o StrictHostKeyChecking=no" \
  --exclude "node_modules" \
  --exclude ".git" \
  --exclude "deploy_key*" \
  --exclude ".DS_Store" \
  --exclude ".user.ini" \
  --exclude ".well-known" \
  ./ "$SERVER_USER@$SERVER_HOST:$REMOTE_DIR/"

# 5. Remote install, PM2 start/reload and Nginx config
echo "⚙️ 4/5. Instalando dependências e iniciando processo PM2 no servidor..."
ssh -i "$KEY_FILE" -p "$SERVER_PORT" -o StrictHostKeyChecking=no "$SERVER_USER@$SERVER_HOST" << 'EOF'
  set -e
  cd /www/wwwroot/smartcondor.isol.com.br
  
  echo "📥 Instalando pacotes no servidor..."
  npm install --legacy-peer-deps

  echo "🔄 Configurando Nginx Reverse Proxy para a porta 3050..."
  cat << 'NGINX_CONF' > /www/server/panel/vhost/rewrite/smartcondor.isol.com.br.conf
location ^~ /_next/ {
    proxy_pass http://127.0.0.1:3050;
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host \$host;
    proxy_cache_bypass \$http_upgrade;
}

location / {
    proxy_pass http://127.0.0.1:3050;
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

  echo "🔄 Recarregando Nginx..."
  nginx -s reload || /etc/init.d/nginx reload

  echo "🚀 Iniciando / Recarregando processo PM2 'smartcondor'..."
  if pm2 describe smartcondor > /dev/null 2>&1; then
    pm2 reload ecosystem.config.cjs --update-env
  else
    pm2 start ecosystem.config.cjs
  fi

  pm2 save
  echo "✅ Processo PM2 configurado com sucesso!"
EOF

# 6. Verify Online Health Check
echo "🔍 5/5. Verificando status online..."
sleep 3
HTTP_STATUS=$(curl -k -s -o /dev/null -w "%{http_code}" https://smartcondor.isol.com.br || echo "000")

echo ""
echo "🎉 ====================================================="
echo "🎉 DEPLOY CONCLUÍDO COM SUCESSO!"
echo "🌐 URL Online: https://smartcondor.isol.com.br"
echo "📡 Status HTTP: $HTTP_STATUS"
echo "🎉 ====================================================="
