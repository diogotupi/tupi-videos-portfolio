import { prefersReducedMotion } from './reveal.js';

function jaggedPath(w, h) {
  const x0 = Math.random() * w * 0.85;
  const y0 = Math.random() * h * 0.85;
  const segs = 4 + Math.floor(Math.random() * 4);
  const len = 40 + Math.random() * 110;
  const angle = Math.random() * Math.PI * 2;
  let x = x0;
  let y = y0;
  let d = `M ${x.toFixed(1)} ${y.toFixed(1)}`;
  for (let i = 0; i < segs; i += 1) {
    const t = (i + 1) / segs;
    const jitter = (Math.random() - 0.5) * 18;
    x = x0 + Math.cos(angle) * len * t + Math.cos(angle + Math.PI / 2) * jitter;
    y = y0 + Math.sin(angle) * len * t + Math.sin(angle + Math.PI / 2) * jitter;
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

export function initAmbientElectric(root = document) {
  if (prefersReducedMotion()) return null;

  const host = root.querySelector('.site-ambient');
  if (!host) return null;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('site-ambient__bolts');
  svg.setAttribute('aria-hidden', 'true');
  host.appendChild(svg);

  let timer = null;
  let stopped = false;

  const size = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('width', String(w));
    svg.setAttribute('height', String(h));
    return { w, h };
  };

  size();

  const spawn = () => {
    if (stopped) return;
    const { w, h } = size();
    const count = Math.random() > 0.72 ? 2 : 1;

    for (let i = 0; i < count; i += 1) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', jaggedPath(w, h));
      path.classList.add('site-ambient__bolt');
      if (Math.random() > 0.78) path.classList.add('is-accent');
      svg.appendChild(path);
      window.setTimeout(() => path.remove(), 700);
    }

    const next = 1600 + Math.random() * 3200;
    timer = window.setTimeout(spawn, next);
  };

  timer = window.setTimeout(spawn, 900 + Math.random() * 1200);

  const onResize = () => size();
  window.addEventListener('resize', onResize);

  return () => {
    stopped = true;
    if (timer) window.clearTimeout(timer);
    window.removeEventListener('resize', onResize);
    svg.remove();
  };
}
