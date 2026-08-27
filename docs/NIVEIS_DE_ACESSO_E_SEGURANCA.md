# 🔐 04 - Níveis de Acesso & Segurança

## 1. Matriz de Perfis de Acesso

A plataforma **SmartCondo** implementa 3 níveis hierárquicos de acesso com isolamento e permissões bem definidas:

| Perfil | Escopo | Nível de Autenticação | Principais Ações & Permissões |
| :--- | :--- | :--- | :--- |
| **Super Admin (Storne)** | Global (Todos os condomínios) | Login Master + 2FA TOTP | - Cadastrar e ativar novos condomínios/tenants.<br>- Gerenciar anunciantes nacionais do Clube de Vantagens.<br>- Configurar subdomínios e domínios personalizados.<br>- Acessar métricas globais e faturamento de publicidade. |
| **Síndico / Admin** | Específico do Condomínio (Tenant) | Token Seguro + 2FA Obrigatório | - Cadastrar eventos, ações e assembleias no Calendário.<br>- Publicar obras na Central de Arquivos com fotos de "Antes e Depois" e custos.<br>- Aprovar moradores no Indicador Profissional.<br>- Ativar/desativar widgets de tempo e cotações financeiras. |
| **Morador (Associado)** | Específico do Condomínio (Tenant) | Login / Token com Lote/Unidade | - Visualizar o calendário e programações do condomínio.<br>- Consultar relatórios de obras e melhorias.<br>- Acessar cupons, ofertas e sorteios do Clube de Vantagens.<br>- Cadastrar gratuitamente seu serviço no Indicador Profissional do Morador. |

---

## 2. Fluxo de Segurança & 2FA para Síndico

```mermaid
sequenceDiagram
    actor Sindico as Síndico / Gestor
    participant Web as Portal SmartCondo
    participant Auth as Supabase Auth / MFA
    participant DB as PostgreSQL (RLS)

    Sindico->>Web: Acessa /damha1/admin ou Botão Gestão
    Web->>Sindico: Solicita E-mail e Senha
    Sindico->>Web: Envia Credenciais
    Web->>Auth: Validação primária
    Auth-->>Web: Requer Token 2FA (TOTP / SMS)
    Web->>Sindico: Solicita Código de 6 dígitos
    Sindico->>Web: Digita Código 2FA
    Auth-->>Web: Emite JWT com Claim tenant_id & role='sindico'
    Web->>DB: Consulta apenas registros do tenant_id autorizado
    DB-->>Web: Retorna dados administrativos isolados
    Web-->>Sindico: Exibe Painel de Gestão do Condomínio
```
