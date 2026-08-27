# 🎨 06 - Catálogo de Componentes & Design System

Este documento cataloga a arquitetura de componentes do frontend, seus campos, estados, cards e modais.

## 1. Estrutura de Componentes

```
src/
├── components/
│   ├── common/
│   │   ├── CondoLogo.tsx          # Logo vetorial fiel (Damha 1 / White-label)
│   │   ├── CommercialBanner.tsx   # Banner rotativo de anúncio WhatsApp
│   │   ├── BottomNav.tsx          # Barra de navegação inferior estilo App Nativo
│   │   └── ThemeProvider.tsx      # Injetor de variáveis de cor CSS do condomínio
│   ├── navigation/
│   │   ├── Header.tsx             # Top bar com branding e botões rápidos
│   │   ├── TabNavigation.tsx      # Switcher "CONDOMÍNIO" vs "CLUBE DE VANTAGENS"
│   │   └── TenantSelectorModal.tsx# Seletor para demonstrar troca de condomínio
│   ├── condo/
│   │   ├── CondoCalendar.tsx      # Calendário interativo com pílulas coloridas
│   │   ├── CalendarEventCard.tsx  # Card resumo do evento
│   │   ├── EventDetailModal.tsx   # Modal completo com detalhes e salvar na agenda
│   │   ├── BeforeAfterSection.tsx # Grid de Antes e Depois
│   │   ├── BeforeAfterCard.tsx    # Card com fotos lado a lado e botão de detalhes
│   │   ├── BeforeAfterModal.tsx   # Modal com comparador deslizante e prestação de contas
│   │   └── BoardSection.tsx       # Quadro de síndico, diretoria e contatos
│   ├── club/
│   │   ├── FolderCard.tsx         # Card com aba de pasta física (Folder Tab UI)
│   │   ├── ClubSection.tsx        # Grid das 6 pastas de vantagens
│   │   ├── FolderDetailModal.tsx  # Modal com lista de parceiros da pasta clicada
│   │   ├── PartnerCard.tsx        # Card do parceiro com botão direto de WhatsApp
│   │   └── SorteioInteractive.tsx # Sorteador/roleta interativa com confetes
│   ├── admin/
│   │   ├── AdminDrawer.tsx        # Painel lateral do Síndico com 2FA
│   │   ├── EventFormModal.tsx     # Formulário de cadastro de novo evento
│   │   └── BeforeAfterFormModal.tsx# Formulário de cadastro de obra/antes e depois
│   ├── modals/
│   │   └── AdvertiseModal.tsx     # Modal "Quero Anunciar para 1.500 Moradores"
│   └── widgets/
│       └── WeatherExchangeWidget.tsx # Widget com clima e cotações (Dólar/Euro/Bolsa)
```
