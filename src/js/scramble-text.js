import { prefersReducedMotion } from './reveal.js';

const GLYPHS = '░▒▓█ entX#/+*■▪︎01';

function scrambleOnce(el, { duration = 900 } = {}) {
  const finalText = el.dataset.scrambleText ?? el.textContent;
  el.dataset.scrambleText = finalText;
  const chars = [...finalText];
  const start = performance.now();

  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const reveal = Math.floor(t * chars.length);
    const out = chars
      .map((ch, i) => {
        if (ch === ' ' || ch === '·') return ch;
        if (i < reveal) return finalText[i];
        return GLYPHS[(Math.random() * GLYPHS.length) | 0];
      })
      .join('');
    el.textContent = out;
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = finalText;
  };

  requestAnimationFrame(tick);
}

export function initScrambleText(root = document) {
  if (prefersReducedMotion()) return null;

  const nodes = [...root.querySelectorAll('[data-scramble]')];
  if (!nodes.length) return null;

  // Hero brand: run soon after paint
  nodes
    .filter((el) => el.closest('.hero'))
    .forEach((el, i) => {
      window.setTimeout(() => scrambleOnce(el, { duration: 1100 }), 180 + i * 120);
    });

  const others = nodes.filter((el) => !el.closest('.hero'));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        scrambleOnce(entry.target, { duration: 850 });
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );
  others.forEach((el) => io.observe(el));
  return io;
}
