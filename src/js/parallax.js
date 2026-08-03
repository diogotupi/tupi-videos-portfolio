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
