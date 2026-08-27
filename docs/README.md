# 🏢 SmartCondo — Documentação Oficial do Projeto

Bem-vindo à documentação técnica e de negócio da plataforma **SmartCondo** (Informativo Condominial & Clube de Vantagens White-Label Multi-Tenant).

- **Domínio Oficial de Produção:** `smartcondo.isol.com.br`
- **Cliente Piloto:** Residencial Damha 1 Araraquara (Associação de Moradores)
- **Empresa Mantenedora / Master Admin:** Storne
- **Tipo de Produto:** SaaS Multi-Tenant Web App PWA Mobile-First

---

## 📚 Índice da Documentação

| Documento | Descrição |
| :--- | :--- |
| 🏗️ [**01 - Arquitetura & Stack**](./ARQUITETURA_E_STACK.md) | Visão geral da arquitetura multi-tenant, stack tecnológica, PWA e domínio `smartcondo.isol.com.br`. |
| 🗄️ [**02 - Modelagem de Dados**](./MODELAGEM_DE_DADOS.md) | Schema PostgreSQL completo, isolamento por RLS (`tenant_id`), tabelas e relacionamentos. |
| 🧩 [**03 - Módulos & Funcionalidades**](./MODULOS_E_FUNCIONALIDADES.md) | Especificação detalhada dos 6 módulos da plataforma (Calendário, Antes/Depois, Clube de Vantagens, Banners, etc.). |
| 🔐 [**04 - Níveis de Acesso & Segurança**](./NIVEIS_DE_ACESSO_E_SEGURANCA.md) | Super Admin Storne, Painel do Síndico com 2FA e Acesso do Morador. |
| 🚀 [**05 - Roadmap & Implantação**](./ROADMAP_E_IMPLANTACAO.md) | Fases de desenvolvimento, checklist de homologação e estratégia de deploy. |

---

## 🎯 Propósito Estratégico da Aplicação

A plataforma **NÃO** concorre com softwares operacionais de portaria ou emissão de boletos. Ela atua com alto valor agregado em dois pilares centrais:

1. **Transparência e Memória Condominial:** Prestação de contas visual e documentada com histórico de melhorias, obras comprovadas com fotos "Antes e Depois", investimentos e atas.
2. **Clube de Vantagens & Monetização Comunitária:** Vitrine de ofertas exclusivas, benefícios locais/nacionais, guia profissional de moradores e canal direto de captação de anunciantes via WhatsApp.
