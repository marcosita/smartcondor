# ♿ 07 - Acessibilidade & Inclusão Digital (e-MAG / WCAG 2.1)

A plataforma **SmartCondo** incorpora diretrizes universais de acessibilidade digital (WCAG 2.1 nível AA e e-MAG), garantindo que idosos, pessoas com baixa visão, daltonismo, dislexia ou limitações motoras tenham acesso irrestrito aos comunicados e benefícios.

---

## 1. Recursos Implementados

### 🔍 1. Ajuste Dinâmico do Tamanho da Fonte
- **4 Níveis de Escala:**
  - `Padrão (100%)`
  - `Médio (115%)`
  - `Grande (130%)`
  - `Extra Grande (150%)`
- Adaptação proporcional de todos os textos, cartões e botões sem quebra de layout.

### 🌗 2. Modos de Alto Contraste
- **Alto Contraste Escuro:** Fundo preto puro (`#000000`) com textos em branco e bordas marcadas.
- **Amarelo no Preto (Yellow-on-Black):** Esquema consagrado para usuários com fotofobia, degeneração macular ou baixa acuidade visual.
- **Modo Noturno Reforçado:** Paleta escura suave para conforto visual em ambientes com pouca luz.

### 📖 3. Tipografia para Dislexia (OpenDyslexic Friendly)
- Alternância instantânea para fontes com base reforçada e espaçamento entre caracteres diferenciado, facilitando a diferenciação entre letras similares (`b`/`d`, `p`/`q`).

### 📐 4. Espaçamento Aumentado entre Linhas
- Aumento do `line-height` e `letter-spacing` para evitar aglomeração visual de parágrafos.

### ⏸️ 5. Redução de Movimento (Prefers Reduced Motion)
- Desativação de efeitos giratórios, carrosséis automáticos acelerados e micro-animações para prevenção de labirintite e distúrbios vestibulares.

### 🔊 6. Leitor de Texto em Português (Web Speech API)
- Síntese de voz nativa no navegador para reproduzir em áudio o informativo geral, resumos de assembleias e descrições de obras.

### 🎯 7. Navegação por Teclado e Foco Visível
- Todos os botões, cards e modais possuem indicadores visuais de foco (`focus-visible:ring-4`), permitindo navegação completa via tecla `Tab` e atalhos.
