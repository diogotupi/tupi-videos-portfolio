# Diogo Tupi — Portfolio One-Page (v1.0) Design

**Date:** 2026-08-03  
**Status:** Approved for planning  
**Stack:** Vite + HTML/CSS/JS (vanilla)

## Goal

A simple, elegant, artistic one-page portfolio for video editor **Diogo Tupi**. Visual identity: dark teal + burnt orange, halftone + collage (lo-fi / zine), without visual clutter. Ship a tweakable v1.0; future effects (scroll-scrub video, Three.js) are out of scope but the structure must leave room for them.

## Visual identity

### Palette

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#1d3333` | Page background |
| `--accent` | `#e55b1f` | Cut-out outlines, CTAs, timestamps, hover accents |
| `--text` | soft off-white | Body and display text |
| `--ink` | near-black | Text on collage blocks if used |

Background is never flat: a subtle fixed grain/noise overlay covers the site.

### Texture & collage

- Site-wide grain overlay (low opacity; must not compete with content).
- Halftone treatment on key media: about photo (dot-screen + irregular cut-out), and a light halftone veil over the hero reel so the video stays readable.
- Jagged / irregular `clip-path` (or SVG edge) on the about photo and on 1–2 work frames only — collage without chaos.

### Typography

- Bold display sans for **Diogo Tupi** (hero-level brand signal).
- Clean sans for body and section headlines.
- Monospace / pixel-like only for micro-details (VHS-style timestamp, labels like `01 / REEL`).

### Tone

Artistic and tactile, lots of negative space, one job per section. No purple gradients, no cream editorial look, no dense dashboard chrome.

## Page structure

One page, four content zones + minimal chrome.

### Nav

- Minimal, fixed/transparent.
- Text logo: `Diogo Tupi`.
- Anchor links: Sobre · Trabalhos · Contato.
- Mobile: compact links or simple toggle — no heavy hamburger UI.

### Hero (~100vh)

- Full-bleed `<video>` placeholder as background: `autoplay`, `muted`, `loop`, `playsinline`.
- Dark overlay + grain + light halftone veil.
- First viewport content only:
  - Brand: **Diogo Tupi**
  - One supporting line (e.g. “editor de vídeo”)
  - One CTA group (“Ver trabalhos” → `#trabalhos`)
- Decorative VHS-style timestamp in a corner (accent color).
- No cards, badges, stats, or floating promo chips.

### Sobre (`#sobre`)

- Left: photo placeholder with jagged cut-out, orange outline, halftone.
- Right: short generic bio (2–3 short paragraphs) — placeholder copy to be replaced later.
- One purpose: who Diogo is and what he does.

### Trabalhos (`#trabalhos`)

- Section headline + one supporting sentence.
- Grid of exactly 4 work placeholders in a 2×2 layout (stacks to 1 column on mobile): thumbnail/video + title + tag (e.g. Comercial / Music video).
- Click opens a simple lightbox/modal with a video player (external links can replace this later).
- Quality over quantity in v1.

### Contato (`#contato`)

- Short line + email placeholder + social links (e.g. Instagram).
- No contact form in v1.

### Footer

- Minimal: © year + Diogo Tupi.

## Motion & behavior

### On load

- Hero brand + support line: light staggered fade/reveal; reel already playing.
- Nav may appear after a short delay or on first scroll.

### On scroll

- Sobre / Trabalhos / Contato: Intersection Observer reveals (fade-up).
- Light parallax on the about cut-out only.
- Smooth scroll for nav anchors and hero CTA.

### Hover / micro

- Work items: slight shift/jitter (zine feel) + orange outline on hover.
- Optional subtle VHS blink on hero timestamp — keep discreet.

### Accessibility

- Honor `prefers-reduced-motion`: disable reveals, parallax, and non-essential motion.
- If hero autoplay fails, show a static poster/fallback.

## Technical architecture

### Stack

Vite + vanilla HTML/CSS/JS. No React/Next in v1.

### Suggested layout

```
/
  index.html
  package.json
  vite.config.js
  src/
    main.js              # boot: nav, reveal, hero video
    styles/
      tokens.css         # colors, type, spacing
      base.css
      sections.css
    js/
      reveal.js
      nav.js
      hero-video.js
    effects/             # reserved empty for future scroll-scrub / three
  public/
    media/               # reel, photo, work thumbs (placeholders)
    textures/            # optional noise asset
```

### Assets

- v1 ships with placeholder media (files or labeled gradient fallbacks).
- Swapping real reel/photo/work videos must not require restructuring HTML.

### Build & deploy

- `vite build` → static `dist/`.
- Hosting target: any static host (Netlify / Vercel / GitHub Pages) when needed.

### Future hooks (explicitly out of v1)

- Scroll-scrubbed video (frame advances with scroll) — preferred first “wow” upgrade.
- Three.js section for optional 3D — only when there is a clear idea.
- Both live under `src/effects/` later; do not implement in v1.

## Content placeholders (v1)

- Brand: Diogo Tupi
- Role line: `editor de vídeo`
- Bio: generic Portuguese placeholder paragraphs
- Email / social: clearly marked placeholders
- Work titles/tags: fake but plausible

## Success criteria

- One-page loads and reads as a single artistic composition, not a dashboard.
- Hero brand is the dominant first-viewport signal; reel is full-bleed muted autoplay.
- Halftone/collage language is visible but not noisy.
- Sobre / Trabalhos / Contato work on desktop and mobile.
- Scroll motion enhances hierarchy; reduced-motion users get a calm static experience.
- Codebase is easy to tweak and ready for later effects without a rewrite.

## Non-goals (v1)

- CMS, auth, contact form backend
- Real project CMS or YouTube/Vimeo API
- Scroll-scrub video implementation
- Three.js
- Multi-page routing
- Blog or case-study pages
