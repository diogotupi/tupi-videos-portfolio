# Diogo Tupi — Portfolio (v1.0)

One-page portfolio for video editor **Diogo Tupi**. Dark teal and burnt orange, halftone collage, grain overlay — built with Vite, vanilla HTML/CSS/JS. Placeholder media and copy are meant to be swapped without touching layout or modules.

## Commands

```bash
npm install      # install dependencies
npm run dev      # local dev server (Vite)
npm test         # Vitest unit tests
npm run build    # production build → dist/
npm run preview  # serve dist/ locally
```

## Swapping media

### Hero reel

1. Add your file at `public/media/reel.mp4`.
2. Inside `#hero-reel` in `index.html`, add a `<source>` child:

   ```html
   <source src="/media/reel.mp4" type="video/mp4" />
   ```

   The video is muted, looping, and autoplaying. If the file is missing or fails to load, the CSS fallback gradient shows instead (`initHeroVideo` in `src/js/hero-video.js`).

### About portrait

Replace `public/media/portrait-placeholder.svg` (or point the `<img>` in `#sobre` at your own file under `public/media/`).

### Works (lightbox)

Each work card is a `[data-lightbox-open]` button. Set `data-src` to the video URL (e.g. `/media/neon-drift.mp4`). Leave `data-src=""` to show the “Vídeo em breve” empty state. Update `data-title` and `data-tag` for the modal header.

## Project layout

| Path | Role |
|---|---|
| `index.html` | Page markup and media hooks |
| `src/styles/` | Design tokens, base, section styles |
| `src/js/` | Nav, hero video, reveal, parallax, lightbox |
| `src/main.js` | Boots all modules |
| `public/media/` | Swappable assets (reel, portrait, work videos) |
| `src/effects/` | **Reserved** for future scroll-scrub video and Three.js — not used in v1 |

## Future effects

Scroll-scrub hero and Three.js experiments will live under `src/effects/` and be wired from `main.js` when added. v1.0 intentionally keeps that folder empty so the core site stays simple and tweakable.
