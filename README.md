# Arizona Pet Care — remake limpo

Refatoração do export estático original (`Clínica Veterinária - Arizona Pet Care.html` + pasta `_files`
com ~60 arquivos: Elementor, jQuery, Swiper, GTM, CSS duplicado, fontes `css`, `css(1)...`, `*.baixados`).

## Estrutura nova — 13 arquivos

- `index.html` — todo o conteúdo, semântico, em PT-BR, UTF-8
- `styles.css` — todo o visual (substitui ~20 arquivos CSS do Elementor)
- `script.js` — menu mobile, carrossel de avaliações, lightbox da galeria, reveal on scroll
  (substitui jQuery + Elementor + Swiper + 8 arquivos `.baixados`)
- `assets/` — 10 imagens com nomes sãos:
  - `logo.png`, `fachada.png`
  - `espaco-01.jpg` … `espaco-08.jpg` (galeria "Conheça nosso espaço")

## O que foi eliminado

- jQuery, jQuery Migrate, Elementor frontend/modules, Swiper, GTM, Trustindex widget
  (~700 KB de JS) → ~3 KB de JS vanilla
- ~20 CSS do Elementor/WordPress/Google Fonts duplicados → 1 `styles.css` (~10 KB)
- Avatares do Google (`unnamed*.png`, 9 arquivos) → iniciais em CSS
- Ícones de estrela/emoji (`f.svg`, `1f970.svg`, `2b50.svg`, `icon.svg`, `logo.svg`) → ★ em texto + 1 SVG inline do WhatsApp
- Avaliações mantidas como conteúdo estático resumido (8 cards) com link "ver todas no Maps"

## Como rodar

Sem build. Abra `index.html` no navegador ou sirva a pasta:

```sh
python -m http.server 8000
# http://localhost:8000
```

## Contatos (mantidos do original)

- WhatsApp/tel: (11) 98217-9717 — `https://wa.me/5511982179717`
- Endereço: Av. Dr. Altino Arantes, 292 — Vila Clementino, São Paulo/SP
- Maps: `https://maps.app.goo.gl/LRfZLi4AV2fzzZP57`
- Instagram: `https://www.instagram.com/arizona.petcare/`
