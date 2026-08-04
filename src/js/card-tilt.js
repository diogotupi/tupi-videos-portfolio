import { prefersReducedMotion } from './reveal.js';

export function initCardTilt(root = document) {
  if (prefersReducedMotion()) return () => {};

  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!fine.matches) return () => {};

  const cards = [...root.querySelectorAll('[data-tilt]')];
  const cleanups = [];

  cards.forEach((card) => {
    const max = 8;
    let raf = 0;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - y) * max;
      const ry = (x - 0.5) * max;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(700px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0)`;
        card.style.setProperty('--tilt-x', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--tilt-y', `${(y * 100).toFixed(1)}%`);
        card.classList.add('is-tilting');
      });
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      card.style.transform = '';
      card.classList.remove('is-tilting');
    };

    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
