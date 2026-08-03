# Diogo Tupi Portfolio v1.0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a Vite + vanilla HTML/CSS/JS one-page portfolio for Diogo Tupi with hero reel, about, 2×2 works lightbox, and contact — dark teal / burnt orange, halftone-collage identity.

**Architecture:** Static Vite app. `index.html` holds markup; `src/styles/` owns tokens/base/sections; `src/js/` owns nav, hero video, reveal, and lightbox; `src/main.js` boots modules; `public/media/` holds swappable placeholders; empty `src/effects/` reserved for future scroll-scrub / Three.js.

**Tech Stack:** Vite 6, vanilla ES modules, CSS custom properties, Vitest for JS unit tests, Google Fonts (Syne + IBM Plex Sans + IBM Plex Mono).

## Global Constraints

- Brand name: `Diogo Tupi` (hero-level signal)
- Role line: `editor de vídeo`
- Palette: `--bg: #1d3333`, `--accent: #e55b1f`, soft off-white text
- Stack: Vite + vanilla only — no React/Next
- Works grid: exactly 4 items, 2×2 desktop / 1 column mobile
- No contact form, CMS, scroll-scrub, or Three.js in v1
- Honor `prefers-reduced-motion`
- Spec: `docs/superpowers/specs/2026-08-03-diogo-tupi-portfolio-design.md`

---

## File Structure

| Path | Responsibility |
|---|---|
| `package.json` | Scripts: `dev`, `build`, `preview`, `test` |
| `vite.config.js` | Vite + Vitest config |
| `index.html` | One-page markup |
| `src/main.js` | Import CSS + boot modules |
| `src/styles/tokens.css` | Colors, type, spacing, motion tokens |
| `src/styles/base.css` | Reset, grain overlay, typography defaults |
| `src/styles/sections.css` | Nav, hero, sobre, trabalhos, contato, footer, lightbox |
| `src/js/hero-video.js` | Autoplay muted reel + poster fallback |
| `src/js/nav.js` | Smooth scroll anchors + mobile toggle |
| `src/js/reveal.js` | Intersection Observer fade-up + reduced motion |
| `src/js/lightbox.js` | Open/close work modal with video |
| `src/js/parallax.js` | Light parallax on about photo |
| `src/effects/.gitkeep` | Future effects slot |
| `public/media/` | Placeholder reel, photo, work thumbs |
| `src/js/*.test.js` | Vitest unit tests |

---

### Task 1: Scaffold Vite project

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `.gitignore`
- Create: `index.html` (minimal shell)
- Create: `src/main.js` (empty boot)
- Create: `src/effects/.gitkeep`
- Create: `public/media/.gitkeep`

**Interfaces:**
- Consumes: nothing
- Produces: runnable Vite app at `npm run dev`; `npm test` runs Vitest

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "tupi-videos-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "vitest": "^3.0.0",
    "jsdom": "^26.0.0"
  }
}
```

- [ ] **Step 2: Create `vite.config.js`**

```js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  test: {
    environment: 'jsdom',
  },
});
```

- [ ] **Step 3: Create `.gitignore`**

```
node_modules
dist
.DS_Store
*.local
```

- [ ] **Step 4: Create minimal `index.html`**

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Diogo Tupi — Editor de Vídeo</title>
  </head>
  <body>
    <div id="app">
      <p>Diogo Tupi</p>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 5: Create `src/main.js`**

```js
console.log('Diogo Tupi portfolio boot');
```

- [ ] **Step 6: Create `src/effects/.gitkeep` and `public/media/.gitkeep`** (empty files)

- [ ] **Step 7: Install and verify**

Run: `npm install`
Run: `npm run build`
Expected: build succeeds, `dist/` created

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vite.config.js .gitignore index.html src/main.js src/effects/.gitkeep public/media/.gitkeep
git commit -m "chore: scaffold Vite portfolio project"
```

---

### Task 2: Design tokens, base styles, grain

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/base.css`
- Modify: `src/main.js`
- Modify: `index.html` (font links)

**Interfaces:**
- Consumes: Vite CSS import from `main.js`
- Produces: CSS variables `--bg`, `--accent`, `--text`, `--ink`, `--font-display`, `--font-body`, `--font-mono`; `.grain` overlay class

- [ ] **Step 1: Create `src/styles/tokens.css`**

```css
:root {
  --bg: #1d3333;
  --bg-elevated: #243d3d;
  --accent: #e55b1f;
  --text: #f2ebe3;
  --text-muted: rgba(242, 235, 227, 0.65);
  --ink: #0a0a0a;
  --font-display: "Syne", sans-serif;
  --font-body: "IBM Plex Sans", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 6rem;
  --nav-h: 4rem;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --grain-opacity: 0.08;
}
```

- [ ] **Step 2: Create `src/styles/base.css`**

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img,
video {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font: inherit;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
}

.grain {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 9990;
  opacity: var(--grain-opacity);
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

.skip-link {
  position: absolute;
  left: -999px;
  top: 0;
  background: var(--accent);
  color: var(--ink);
  padding: 0.5rem 1rem;
  z-index: 10000;
}

.skip-link:focus {
  left: 0;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Update `index.html` head with fonts + grain node**

Add inside `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Syne:wght@600;700;800&display=swap"
  rel="stylesheet"
/>
```

Replace `#app` contents with:

```html
<a class="skip-link" href="#sobre">Pular para o conteúdo</a>
<div class="grain" aria-hidden="true"></div>
```

- [ ] **Step 4: Update `src/main.js`**

```js
import './styles/tokens.css';
import './styles/base.css';
```

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: success; page background is teal when previewed

- [ ] **Step 6: Commit**

```bash
git add src/styles/tokens.css src/styles/base.css src/main.js index.html
git commit -m "style: add design tokens, base, and grain overlay"
```

---

### Task 3: Full page markup (all sections)

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: section IDs `#sobre`, `#trabalhos`, `#contato`
- Produces: DOM hooks — `#hero-reel`, `.js-reveal`, `#about-photo`, `[data-lightbox-open]`, `#lightbox`, nav links

- [ ] **Step 1: Replace `index.html` body with full markup**

```html
<body>
  <a class="skip-link" href="#sobre">Pular para o conteúdo</a>
  <div class="grain" aria-hidden="true"></div>

  <header class="site-nav" data-nav>
    <a class="site-nav__logo" href="#top">Diogo Tupi</a>
    <button
      class="site-nav__toggle"
      type="button"
      aria-expanded="false"
      aria-controls="site-nav-links"
      data-nav-toggle
    >
      Menu
    </button>
    <nav id="site-nav-links" class="site-nav__links" data-nav-links>
      <a href="#sobre">Sobre</a>
      <a href="#trabalhos">Trabalhos</a>
      <a href="#contato">Contato</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero" aria-label="Apresentação">
      <div class="hero__media">
        <video
          id="hero-reel"
          class="hero__video"
          muted
          loop
          playsinline
          autoplay
          preload="metadata"
          poster=""
          data-hero-video
        >
          <!-- Swap src later: <source src="/media/reel.mp4" type="video/mp4" /> -->
        </video>
        <div class="hero__fallback" data-hero-fallback aria-hidden="true"></div>
        <div class="hero__veil" aria-hidden="true"></div>
      </div>
      <div class="hero__content">
        <p class="hero__label" data-hero-animate>01 / REEL</p>
        <h1 class="hero__brand" data-hero-animate>Diogo Tupi</h1>
        <p class="hero__role" data-hero-animate>editor de vídeo</p>
        <a class="hero__cta" href="#trabalhos" data-hero-animate>Ver trabalhos</a>
      </div>
      <time class="hero__timestamp" datetime="2026-08-03T00:24:55" aria-hidden="true"
        >2026/08/03 00:24:55</time
      >
    </section>

    <section id="sobre" class="about section">
      <div class="about__photo-wrap js-reveal" data-parallax>
        <div class="about__photo" id="about-photo">
          <img
            src="/media/portrait-placeholder.svg"
            alt="Foto de Diogo Tupi — placeholder"
            width="640"
            height="800"
          />
        </div>
      </div>
      <div class="about__copy js-reveal">
        <p class="section__label">Sobre</p>
        <h2 class="section__title">Quem sou</h2>
        <p>
          Olá — sou Diogo Tupi, editor de vídeo. Trabalho com narrativa visual,
          ritmo e cor para transformar rushes em histórias que respiram.
        </p>
        <p>
          Do comercial ao clipe, do documentário ao conteúdo digital, cuido do
          corte fino, do som e da atmosfera até o frame final.
        </p>
        <p>
          Este texto é placeholder: depois trocamos pela bio real, clientes e
          o tom que você quiser.
        </p>
      </div>
    </section>

    <section id="trabalhos" class="works section">
      <header class="works__header js-reveal">
        <p class="section__label">Portfolio</p>
        <h2 class="section__title">Trabalhos</h2>
        <p class="section__lede">
          Seleção de peças recentes — placeholders até entrarem os originais.
        </p>
      </header>
      <ul class="works__grid">
        <li class="works__item js-reveal" data-jagged>
          <button
            type="button"
            class="works__card"
            data-lightbox-open
            data-title="Neon Drift"
            data-tag="Comercial"
            data-src=""
          >
            <div class="works__thumb" style="--thumb: #2a4a4a"></div>
            <div class="works__meta">
              <span class="works__tag">Comercial</span>
              <h3 class="works__title">Neon Drift</h3>
            </div>
          </button>
        </li>
        <li class="works__item js-reveal">
          <button
            type="button"
            class="works__card"
            data-lightbox-open
            data-title="Maré Baixa"
            data-tag="Documentary"
            data-src=""
          >
            <div class="works__thumb" style="--thumb: #314f3a"></div>
            <div class="works__meta">
              <span class="works__tag">Documentary</span>
              <h3 class="works__title">Maré Baixa</h3>
            </div>
          </button>
        </li>
        <li class="works__item js-reveal" data-jagged>
          <button
            type="button"
            class="works__card"
            data-lightbox-open
            data-title="Fita Laranja"
            data-tag="Music video"
            data-src=""
          >
            <div class="works__thumb" style="--thumb: #3d2f28"></div>
            <div class="works__meta">
              <span class="works__tag">Music video</span>
              <h3 class="works__title">Fita Laranja</h3>
            </div>
          </button>
        </li>
        <li class="works__item js-reveal">
          <button
            type="button"
            class="works__card"
            data-lightbox-open
            data-title="Corte Seco"
            data-tag="Short form"
            data-src=""
          >
            <div class="works__thumb" style="--thumb: #1f3a45"></div>
            <div class="works__meta">
              <span class="works__tag">Short form</span>
              <h3 class="works__title">Corte Seco</h3>
            </div>
          </button>
        </li>
      </ul>
    </section>

    <section id="contato" class="contact section js-reveal">
      <p class="section__label">Contato</p>
      <h2 class="section__title">Vamos conversar</h2>
      <p class="contact__lede">
        Tem um projeto? Manda um alô — placeholder de e-mail abaixo.
      </p>
      <a class="contact__email" href="mailto:ola@diogotupi.placeholder"
        >ola@diogotupi.placeholder</a
      >
      <ul class="contact__social">
        <li>
          <a href="https://instagram.com/" rel="noopener noreferrer" target="_blank"
            >Instagram</a
          >
        </li>
        <li>
          <a href="https://vimeo.com/" rel="noopener noreferrer" target="_blank"
            >Vimeo</a
          >
        </li>
      </ul>
    </section>
  </main>

  <footer class="site-footer">
    <p>© <span data-year></span> Diogo Tupi</p>
  </footer>

  <div
    id="lightbox"
    class="lightbox"
    hidden
    data-lightbox
    role="dialog"
    aria-modal="true"
    aria-label="Player de trabalho"
  >
    <div class="lightbox__backdrop" data-lightbox-close></div>
    <div class="lightbox__panel">
      <button type="button" class="lightbox__close" data-lightbox-close aria-label="Fechar">
        Fechar
      </button>
      <p class="lightbox__tag" data-lightbox-tag></p>
      <h3 class="lightbox__title" data-lightbox-title></h3>
      <div class="lightbox__player">
        <video data-lightbox-video controls playsinline></video>
        <p class="lightbox__empty" data-lightbox-empty hidden>
          Vídeo em breve — troque o placeholder quando tiver o arquivo.
        </p>
      </div>
    </div>
  </div>

  <script type="module" src="/src/main.js"></script>
</body>
```

Keep the same `<head>` from Task 2 (charset, viewport, title, fonts).

- [ ] **Step 2: Create portrait placeholder SVG**

Create `public/media/portrait-placeholder.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="800" viewBox="0 0 640 800" role="img" aria-label="Portrait placeholder">
  <rect width="640" height="800" fill="#243d3d"/>
  <circle cx="320" cy="280" r="90" fill="#1d3333"/>
  <ellipse cx="320" cy="520" rx="160" ry="140" fill="#1d3333"/>
  <text x="320" y="740" text-anchor="middle" fill="#e55b1f" font-family="monospace" font-size="22">PHOTO / PLACEHOLDER</text>
</svg>
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: success; HTML includes `#sobre`, `#trabalhos`, `#contato`, `#lightbox`

- [ ] **Step 4: Commit**

```bash
git add index.html public/media/portrait-placeholder.svg
git commit -m "feat: add one-page markup for all sections"
```

---

### Task 4: Section styles (hero, about, works, contact, nav, lightbox)

**Files:**
- Create: `src/styles/sections.css`
- Modify: `src/main.js` (import sections.css)

**Interfaces:**
- Consumes: tokens from `tokens.css`; markup classes from Task 3
- Produces: full visual layout matching teal/orange collage identity

- [ ] **Step 1: Create `src/styles/sections.css`**

```css
.site-nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--nav-h);
  padding: 0 var(--space-md);
  background: linear-gradient(to bottom, rgba(29, 51, 51, 0.85), transparent);
}

.site-nav__logo {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.site-nav__links {
  display: flex;
  gap: var(--space-md);
}

.site-nav__links a {
  color: var(--text-muted);
  font-size: 0.95rem;
  transition: color 0.2s var(--ease);
}

.site-nav__links a:hover {
  color: var(--accent);
}

.site-nav__toggle {
  display: none;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

@media (max-width: 700px) {
  .site-nav__toggle {
    display: block;
  }

  .site-nav__links {
    display: none;
    position: absolute;
    top: var(--nav-h);
    right: var(--space-sm);
    flex-direction: column;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    background: var(--bg-elevated);
    border: 1px solid rgba(229, 91, 31, 0.35);
  }

  .site-nav.is-open .site-nav__links {
    display: flex;
  }
}

.hero {
  position: relative;
  min-height: 100vh;
  display: grid;
  place-items: end start;
  padding: calc(var(--nav-h) + var(--space-lg)) var(--space-md) var(--space-xl);
  overflow: hidden;
}

.hero__media,
.hero__video,
.hero__fallback,
.hero__veil {
  position: absolute;
  inset: 0;
}

.hero__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__fallback {
  background:
    radial-gradient(circle at 30% 40%, rgba(229, 91, 31, 0.18), transparent 45%),
    linear-gradient(160deg, #243d3d, #152525 70%);
  opacity: 0;
  transition: opacity 0.4s var(--ease);
}

.hero.is-fallback .hero__fallback {
  opacity: 1;
}

.hero.is-fallback .hero__video {
  opacity: 0;
}

.hero__veil {
  background:
    linear-gradient(to top, rgba(29, 51, 51, 0.92) 8%, rgba(29, 51, 51, 0.35) 45%, rgba(29, 51, 51, 0.55)),
    radial-gradient(circle, rgba(0, 0, 0, 0.45) 1px, transparent 1.5px);
  background-size: auto, 5px 5px;
  mix-blend-mode: multiply;
  opacity: 0.85;
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 16ch;
}

.hero__label {
  margin: 0 0 var(--space-xs);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: var(--accent);
}

.hero__brand {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(3.2rem, 12vw, 7.5rem);
  line-height: 0.92;
  letter-spacing: -0.04em;
}

.hero__role {
  margin: var(--space-sm) 0 var(--space-md);
  color: var(--text-muted);
  font-size: 1.15rem;
}

.hero__cta {
  display: inline-block;
  padding-bottom: 0.15rem;
  border-bottom: 2px solid var(--accent);
  font-weight: 600;
  transition: color 0.2s var(--ease);
}

.hero__cta:hover {
  color: var(--accent);
}

.hero__timestamp {
  position: absolute;
  right: var(--space-md);
  bottom: var(--space-md);
  z-index: 2;
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent);
  animation: vhs-blink 2.8s steps(2, end) infinite;
}

@keyframes vhs-blink {
  0%,
  90%,
  100% {
    opacity: 1;
  }
  95% {
    opacity: 0.45;
  }
}

[data-hero-animate] {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.7s var(--ease),
    transform 0.7s var(--ease);
}

[data-hero-animate].is-in {
  opacity: 1;
  transform: none;
}

.section {
  padding: var(--space-xl) var(--space-md);
  max-width: 1100px;
  margin: 0 auto;
}

.section__label {
  margin: 0 0 var(--space-xs);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

.section__title {
  margin: 0 0 var(--space-sm);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: -0.03em;
}

.section__lede {
  margin: 0;
  color: var(--text-muted);
  max-width: 40ch;
}

.about {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: var(--space-lg);
  align-items: center;
}

.about__photo {
  position: relative;
  display: inline-block;
  max-width: 420px;
  clip-path: polygon(
    2% 4%,
    96% 0%,
    100% 92%,
    88% 100%,
    4% 97%,
    0% 18%
  );
  outline: 3px solid var(--accent);
  outline-offset: 6px;
  background: var(--bg-elevated);
}

.about__photo img {
  width: 100%;
  height: auto;
  filter: contrast(1.15) grayscale(0.35);
  -webkit-mask-image: radial-gradient(circle, #000 1.1px, transparent 1.35px);
  mask-image: radial-gradient(circle, #000 1.1px, transparent 1.35px);
  -webkit-mask-size: 4px 4px;
  mask-size: 4px 4px;
}

.about__copy p {
  color: var(--text-muted);
  max-width: 42ch;
}

.about__copy p + p {
  margin-top: 0.85rem;
}

.works__header {
  margin-bottom: var(--space-md);
}

.works__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-md);
}

.works__card {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0;
  transition: transform 0.25s var(--ease);
}

.works__card:hover {
  transform: translate(-2px, 3px) rotate(-0.4deg);
}

.works__thumb {
  aspect-ratio: 16 / 10;
  background: var(--thumb, var(--bg-elevated));
  outline: 1px solid transparent;
  transition: outline-color 0.2s var(--ease);
}

.works__card:hover .works__thumb {
  outline-color: var(--accent);
}

.works__item[data-jagged] .works__thumb {
  clip-path: polygon(
    0% 3%,
    97% 0%,
    100% 96%,
    6% 100%,
    1% 70%
  );
}

.works__meta {
  margin-top: var(--space-sm);
}

.works__tag {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}

.works__title {
  margin: 0.25rem 0 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
}

.contact__lede {
  color: var(--text-muted);
  max-width: 36ch;
}

.contact__email {
  display: inline-block;
  margin: var(--space-md) 0;
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 4vw, 2.2rem);
  font-weight: 700;
  border-bottom: 2px solid var(--accent);
}

.contact__social {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: var(--space-md);
}

.contact__social a {
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.85rem;
}

.contact__social a:hover {
  color: var(--accent);
}

.site-footer {
  padding: var(--space-md);
  border-top: 1px solid rgba(242, 235, 227, 0.08);
  color: var(--text-muted);
  font-size: 0.85rem;
  text-align: center;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: var(--space-md);
}

.lightbox[hidden] {
  display: none;
}

.lightbox__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.72);
}

.lightbox__panel {
  position: relative;
  z-index: 1;
  width: min(900px, 100%);
  padding: var(--space-md);
  background: var(--bg-elevated);
  border: 1px solid rgba(229, 91, 31, 0.4);
}

.lightbox__close {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent);
  text-transform: uppercase;
}

.lightbox__tag {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent);
}

.lightbox__title {
  margin: 0.35rem 0 var(--space-sm);
  font-family: var(--font-display);
}

.lightbox__player video {
  width: 100%;
  max-height: 70vh;
  background: #000;
}

.lightbox__empty {
  margin: 0;
  padding: var(--space-lg);
  text-align: center;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.85rem;
}

.js-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.8s var(--ease),
    transform 0.8s var(--ease);
}

.js-reveal.is-visible {
  opacity: 1;
  transform: none;
}

@media (max-width: 700px) {
  .about {
    grid-template-columns: 1fr;
  }

  .works__grid {
    grid-template-columns: 1fr;
  }

  .hero__content {
    max-width: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__timestamp {
    animation: none;
  }

  .works__card:hover {
    transform: none;
  }

  .js-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }

  [data-hero-animate] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 2: Import in `src/main.js`**

```js
import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';
```

- [ ] **Step 3: Verify visually**

Run: `npm run dev`
Check: hero fills viewport; about 2-col; works 2×2; grain visible; accent orange on CTA/timestamp

- [ ] **Step 4: Commit**

```bash
git add src/styles/sections.css src/main.js
git commit -m "style: section layouts with halftone collage identity"
```

---

### Task 5: Hero video module

**Files:**
- Create: `src/js/hero-video.js`
- Create: `src/js/hero-video.test.js`
- Modify: `src/main.js`

**Interfaces:**
- Consumes: `[data-hero-video]`, `[data-hero-fallback]`, `.hero` root
- Produces: `initHeroVideo(root = document): void` — plays muted; on failure adds `.is-fallback` to `.hero`

- [ ] **Step 1: Write failing test `src/js/hero-video.test.js`**

```js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initHeroVideo } from './hero-video.js';

describe('initHeroVideo', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section class="hero">
        <video data-hero-video muted loop playsinline></video>
        <div data-hero-fallback></div>
      </section>
    `;
  });

  it('adds is-fallback when play rejects', async () => {
    const video = document.querySelector('[data-hero-video]');
    video.play = vi.fn(() => Promise.reject(new Error('autoplay blocked')));
    initHeroVideo(document);
    await vi.waitFor(() => {
      expect(document.querySelector('.hero').classList.contains('is-fallback')).toBe(true);
    });
  });

  it('does not add is-fallback when play resolves', async () => {
    const video = document.querySelector('[data-hero-video]');
    video.play = vi.fn(() => Promise.resolve());
    initHeroVideo(document);
    await Promise.resolve();
    expect(document.querySelector('.hero').classList.contains('is-fallback')).toBe(false);
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

Run: `npm test -- src/js/hero-video.test.js`
Expected: FAIL (module missing)

- [ ] **Step 3: Implement `src/js/hero-video.js`**

```js
export function initHeroVideo(root = document) {
  const hero = root.querySelector('.hero');
  const video = root.querySelector('[data-hero-video]');
  if (!hero || !video) return;

  video.muted = true;
  video.playsInline = true;

  const markFallback = () => hero.classList.add('is-fallback');

  const tryPlay = () => {
    const result = video.play();
    if (result && typeof result.catch === 'function') {
      result.catch(markFallback);
    }
  };

  if (video.readyState >= 2) {
    tryPlay();
  } else {
    video.addEventListener('loadeddata', tryPlay, { once: true });
    video.addEventListener('error', markFallback, { once: true });
    // No source yet in v1 → treat as fallback after a tick if no sources
    if (!video.currentSrc && video.networkState === HTMLMediaElement.NETWORK_EMPTY) {
      markFallback();
    }
  }

  const animated = root.querySelectorAll('[data-hero-animate]');
  requestAnimationFrame(() => {
    animated.forEach((el, i) => {
      el.style.transitionDelay = `${i * 80}ms`;
      el.classList.add('is-in');
    });
  });
}
```

Note: with empty video (no source), fallback is expected in v1 until user drops `/media/reel.mp4`. Keep a comment in HTML for the source path.

- [ ] **Step 4: Run tests — expect PASS**

Run: `npm test -- src/js/hero-video.test.js`
Expected: PASS

- [ ] **Step 5: Wire in `src/main.js`**

```js
import './styles/tokens.css';
import './styles/base.css';
import './styles/sections.css';
import { initHeroVideo } from './js/hero-video.js';

initHeroVideo();
```

- [ ] **Step 6: Commit**

```bash
git add src/js/hero-video.js src/js/hero-video.test.js src/main.js
git commit -m "feat: hero video autoplay with poster fallback"
```

---

### Task 6: Nav module

**Files:**
- Create: `src/js/nav.js`
- Create: `src/js/nav.test.js`
- Modify: `src/main.js`

**Interfaces:**
- Consumes: `[data-nav]`, `[data-nav-toggle]`, `[data-nav-links]`
- Produces: `initNav(root = document): void` — toggles `.is-open`, closes on link click, sets `data-year` text

- [ ] **Step 1: Write failing test**

```js
import { describe, it, expect, beforeEach } from 'vitest';
import { initNav } from './nav.js';

describe('initNav', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <header data-nav>
        <button data-nav-toggle aria-expanded="false">Menu</button>
        <nav data-nav-links><a href="#sobre">Sobre</a></nav>
      </header>
      <span data-year></span>
    `;
  });

  it('toggles is-open and aria-expanded', () => {
    initNav(document);
    const header = document.querySelector('[data-nav]');
    const toggle = document.querySelector('[data-nav-toggle]');
    toggle.click();
    expect(header.classList.contains('is-open')).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    toggle.click();
    expect(header.classList.contains('is-open')).toBe(false);
  });

  it('closes on link click', () => {
    initNav(document);
    const header = document.querySelector('[data-nav]');
    document.querySelector('[data-nav-toggle]').click();
    document.querySelector('[data-nav-links] a').click();
    expect(header.classList.contains('is-open')).toBe(false);
  });

  it('fills year', () => {
    initNav(document);
    expect(document.querySelector('[data-year]').textContent).toBe(
      String(new Date().getFullYear()),
    );
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `npm test -- src/js/nav.test.js`

- [ ] **Step 3: Implement `src/js/nav.js`**

```js
export function initNav(root = document) {
  const header = root.querySelector('[data-nav]');
  const toggle = root.querySelector('[data-nav-toggle]');
  const links = root.querySelector('[data-nav-links]');
  const year = root.querySelector('[data-year]');

  if (year) year.textContent = String(new Date().getFullYear());
  if (!header || !toggle || !links) return;

  const setOpen = (open) => {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  toggle.addEventListener('click', () => {
    setOpen(!header.classList.contains('is-open'));
  });

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });
}
```

- [ ] **Step 4: Run — expect PASS**

Run: `npm test -- src/js/nav.test.js`

- [ ] **Step 5: Wire `initNav()` in `src/main.js`**

- [ ] **Step 6: Commit**

```bash
git add src/js/nav.js src/js/nav.test.js src/main.js
git commit -m "feat: nav toggle, anchors, and footer year"
```

---

### Task 7: Reveal + parallax modules

**Files:**
- Create: `src/js/reveal.js`
- Create: `src/js/reveal.test.js`
- Create: `src/js/parallax.js`
- Create: `src/js/parallax.test.js`
- Modify: `src/main.js`

**Interfaces:**
- Consumes: `.js-reveal`, `[data-parallax]`
- Produces:
  - `initReveal(root = document): IntersectionObserver | null`
  - `prefersReducedMotion(): boolean`
  - `initParallax(root = document): () => void` cleanup

- [ ] **Step 1: Write `src/js/reveal.test.js`**

```js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initReveal, prefersReducedMotion } from './reveal.js';

describe('reveal', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div class="js-reveal"></div>`;
  });

  it('marks visible immediately when reduced motion', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({ matches: true, addEventListener() {}, removeEventListener() {} }),
    );
    expect(prefersReducedMotion()).toBe(true);
    initReveal(document);
    expect(document.querySelector('.js-reveal').classList.contains('is-visible')).toBe(true);
    vi.unstubAllGlobals();
  });
});
```

- [ ] **Step 2: Implement `src/js/reveal.js`**

```js
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initReveal(root = document) {
  const items = [...root.querySelectorAll('.js-reveal')];
  if (!items.length) return null;

  if (prefersReducedMotion()) {
    items.forEach((el) => el.classList.add('is-visible'));
    return null;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  );

  items.forEach((el) => io.observe(el));
  return io;
}
```

- [ ] **Step 3: Write `src/js/parallax.test.js`**

```js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initParallax } from './parallax.js';

describe('initParallax', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div data-parallax></div>`;
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({ matches: true, addEventListener() {}, removeEventListener() {} }),
    );
  });

  it('no-ops under reduced motion', () => {
    const cleanup = initParallax(document);
    expect(typeof cleanup).toBe('function');
    cleanup();
    vi.unstubAllGlobals();
  });
});
```

- [ ] **Step 4: Implement `src/js/parallax.js`**

```js
import { prefersReducedMotion } from './reveal.js';

export function initParallax(root = document) {
  const el = root.querySelector('[data-parallax]');
  if (!el || prefersReducedMotion()) return () => {};

  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = el.getBoundingClientRect();
    const viewH = window.innerHeight || 1;
    const progress = (viewH - rect.top) / (viewH + rect.height);
    const offset = (progress - 0.5) * 24;
    el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  update();
  return () => window.removeEventListener('scroll', onScroll);
}
```

- [ ] **Step 5: Run tests**

Run: `npm test`
Expected: all PASS

- [ ] **Step 6: Wire in `main.js`** — call `initReveal()` and `initParallax()`

- [ ] **Step 7: Commit**

```bash
git add src/js/reveal.js src/js/reveal.test.js src/js/parallax.js src/js/parallax.test.js src/main.js
git commit -m "feat: scroll reveal and about photo parallax"
```

---

### Task 8: Lightbox module

**Files:**
- Create: `src/js/lightbox.js`
- Create: `src/js/lightbox.test.js`
- Modify: `src/main.js`

**Interfaces:**
- Consumes: `[data-lightbox]`, `[data-lightbox-open]`, `[data-lightbox-close]`, `[data-lightbox-title]`, `[data-lightbox-tag]`, `[data-lightbox-video]`, `[data-lightbox-empty]`
- Produces: `initLightbox(root = document): void`

- [ ] **Step 1: Write failing test**

```js
import { describe, it, expect, beforeEach } from 'vitest';
import { initLightbox } from './lightbox.js';

describe('initLightbox', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button data-lightbox-open data-title="Neon Drift" data-tag="Comercial" data-src="">Open</button>
      <div data-lightbox hidden>
        <button data-lightbox-close>Fechar</button>
        <p data-lightbox-tag></p>
        <h3 data-lightbox-title></h3>
        <video data-lightbox-video></video>
        <p data-lightbox-empty hidden></p>
      </div>
    `;
  });

  it('opens with title/tag and shows empty state when no src', () => {
    initLightbox(document);
    document.querySelector('[data-lightbox-open]').click();
    const box = document.querySelector('[data-lightbox]');
    expect(box.hidden).toBe(false);
    expect(document.querySelector('[data-lightbox-title]').textContent).toBe('Neon Drift');
    expect(document.querySelector('[data-lightbox-tag]').textContent).toBe('Comercial');
    expect(document.querySelector('[data-lightbox-empty]').hidden).toBe(false);
  });

  it('closes on close button', () => {
    initLightbox(document);
    document.querySelector('[data-lightbox-open]').click();
    document.querySelector('[data-lightbox-close]').click();
    expect(document.querySelector('[data-lightbox]').hidden).toBe(true);
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

- [ ] **Step 3: Implement `src/js/lightbox.js`**

```js
export function initLightbox(root = document) {
  const box = root.querySelector('[data-lightbox]');
  if (!box) return;

  const titleEl = box.querySelector('[data-lightbox-title]');
  const tagEl = box.querySelector('[data-lightbox-tag]');
  const video = box.querySelector('[data-lightbox-video]');
  const empty = box.querySelector('[data-lightbox-empty]');

  const close = () => {
    box.hidden = true;
    document.body.style.overflow = '';
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
  };

  const open = (btn) => {
    const title = btn.getAttribute('data-title') || '';
    const tag = btn.getAttribute('data-tag') || '';
    const src = btn.getAttribute('data-src') || '';
    if (titleEl) titleEl.textContent = title;
    if (tagEl) tagEl.textContent = tag;
    if (src) {
      if (empty) empty.hidden = true;
      if (video) {
        video.hidden = false;
        video.src = src;
        video.play()?.catch(() => {});
      }
    } else {
      if (video) video.hidden = true;
      if (empty) empty.hidden = false;
    }
    box.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  root.querySelectorAll('[data-lightbox-open]').forEach((btn) => {
    btn.addEventListener('click', () => open(btn));
  });

  box.querySelectorAll('[data-lightbox-close]').forEach((el) => {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !box.hidden) close();
  });
}
```

- [ ] **Step 4: Run — expect PASS**

- [ ] **Step 5: Wire `initLightbox()` in `main.js`**

- [ ] **Step 6: Commit**

```bash
git add src/js/lightbox.js src/js/lightbox.test.js src/main.js
git commit -m "feat: works lightbox with empty-state placeholder"
```

---

### Task 9: Final polish, README, verification

**Files:**
- Create: `README.md`
- Modify: `src/styles/sections.css` (any gaps found in visual QA)
- Modify: `index.html` (comment documenting how to swap reel/photo)

**Interfaces:**
- Consumes: complete app
- Produces: documented swap paths; green `npm test` + `npm run build`

- [ ] **Step 1: Write `README.md`** with: project blurb; commands `npm install` / `npm run dev` / `npm test` / `npm run build`; media swap notes (hero reel → `public/media/reel.mp4` + `<source>` in `#hero-reel`; portrait → `public/media/portrait-placeholder.svg`; works → `data-src` on lightbox buttons); note that `src/effects/` is reserved for scroll-scrub / Three.js.
- [ ] **Step 2: Full verification**

Run: `npm test`
Expected: all tests PASS

Run: `npm run build`
Expected: success

Run: `npm run preview` and manually confirm:
- Hero brand dominant; grain visible; timestamp orange
- Sobre photo cut-out + bio
- 2×2 works → lightbox empty state
- Contato email + social
- Mobile nav toggle
- Reduced-motion: no broken layout

- [ ] **Step 3: Commit**

```bash
git add README.md src/styles/sections.css index.html
git commit -m "docs: README and v1.0 polish"
```

---

## Self-Review (plan vs spec)

| Spec requirement | Task |
|---|---|
| Palette teal/orange + grain | 2 |
| Halftone veil + jagged cut-out | 4 |
| Typography Syne / Plex / mono | 2, 4 |
| Nav + anchors | 3, 4, 6 |
| Hero reel muted autoplay + fallback | 3, 5 |
| Sobre photo + bio | 3, 4 |
| Trabalhos 2×2 + lightbox | 3, 4, 8 |
| Contato + footer | 3, 4, 6 |
| Scroll reveal + parallax | 7 |
| prefers-reduced-motion | 2, 4, 7 |
| `src/effects/` reserved | 1 |
| No form/CMS/three/scrub | honored (non-goals) |

No TBD placeholders remain. Function names consistent: `initHeroVideo`, `initNav`, `initReveal`, `prefersReducedMotion`, `initParallax`, `initLightbox`.
