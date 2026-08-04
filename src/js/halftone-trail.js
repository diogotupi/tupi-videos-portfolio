import { prefersReducedMotion } from './reveal.js';

export function initHalftoneTrail(root = document) {
  if (prefersReducedMotion()) return () => {};

  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!fine.matches) return () => {};

  const layer = document.createElement('div');
  layer.className = 'halftone-trail';
  layer.setAttribute('aria-hidden', 'true');
  (root.body || root).appendChild(layer);

  let last = 0;
  const spacing = 28;

  const onMove = (e) => {
    const now = performance.now();
    if (now - last < 24) return;
    last = now;

    const dot = document.createElement('span');
    dot.className = 'halftone-trail__dot';
    const size = 4 + Math.random() * 7;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${e.clientX - size / 2}px`;
    dot.style.top = `${e.clientY - size / 2}px`;
    if (Math.random() > 0.55) dot.classList.add('is-accent');
    layer.appendChild(dot);

    requestAnimationFrame(() => dot.classList.add('is-out'));
    window.setTimeout(() => dot.remove(), 700);

    // keep layer light
    while (layer.childElementCount > 40) {
      layer.firstElementChild?.remove();
    }
  };

  // slight spatial throttle via last position
  let lx = -spacing;
  let ly = -spacing;
  const onMoveThrottled = (e) => {
    const dx = e.clientX - lx;
    const dy = e.clientY - ly;
    if (dx * dx + dy * dy < spacing * spacing) return;
    lx = e.clientX;
    ly = e.clientY;
    onMove(e);
  };

  window.addEventListener('pointermove', onMoveThrottled, { passive: true });
  return () => {
    window.removeEventListener('pointermove', onMoveThrottled);
    layer.remove();
  };
}
