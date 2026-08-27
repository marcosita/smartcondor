# 🚀 05 - Roadmap & Implantação

## 1. Cronograma de Desenvolvimento e Entregas

```mermaid
gantt
    title Roadmap de Desenvolvimento SmartCondo
    dateFormat  YYYY-MM-DD
    section Fase 1: Fundação & Design System
    Setup Next.js, Tailwind, PWA & Docs        :done, f1_1, 2026-08-25, 2d
    Modelagem de Dados & Arquitetura Multi-Tenant :done, f1_2, 2026-08-26, 1d
    Design System & Componentização Fiel ao Mockup :active, f1_3, 2026-08-27, 2d
    
    section Fase 2: Módulos do Morador (Damha 1)
    Calendário Interativo & Modais              :f2_1, 2026-08-29, 2d
    Central de Arquivos & Antes/Depois          :f2_2, 2026-08-31, 2d
    Clube de Vantagens & Pastas com Folder Tab  :f2_3, 2026-09-02, 2d
    Banners Comerciais & WhatsApp Lead Gen      :f2_4, 2026-09-04, 1d
    
    section Fase 3: Painel do Síndico & Gestão
    Autenticação 2FA & CRUD Administrativo      :f3_1, 2026-09-05, 3d
    Upload de Mídias e Relatórios de Obras      :f3_2, 2026-09-08, 2d
    
    section Fase 4: Homologação & Produção
    Configuração de Domínio smartcondo.isol.com.br :f4_1, 2026-09-10, 1d
    Testes de Performance PWA & Lançamento Piloto :f4_2, 2026-09-11, 2d
```

---

## 2. Checklist de Homologação para o Cliente Piloto (Damha 1)

- [x] Definição de domínio oficial: `smartcondo.isol.com.br`
- [x] Configuração da paleta oficial do Residencial Damha 1 Araraquara
- [x] Vetorização e renderização fiel do logotipo institucional
- [ ] Componentização completa dos 6 módulos e telas
- [ ] Implementação do comparador visual "Antes e Depois" com fotos em alta definição
- [ ] Navegação mensal dinâmica do calendário para Outubro de 2026 e datas correntes
- [ ] Grid de pastas do Clube de Vantagens com abas superiores (Folder Tab UI)
- [ ] Links diretos de acionamento de WhatsApp em todos os parceiros e botão de anúncio
- [ ] Testes de responsividade mobile-first e instalação PWA
