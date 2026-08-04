import { prefersReducedMotion } from './reveal.js';

function pad(n) {
  return String(n).padStart(2, '0');
}

function formatStamp(d) {
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function initLiveTimestamp(root = document) {
  const el = root.querySelector('[data-live-stamp]');
  if (!el) return () => {};

  const tick = () => {
    el.textContent = formatStamp(new Date());
    el.dateTime = new Date().toISOString();
  };

  tick();
  if (prefersReducedMotion()) {
    const id = window.setInterval(tick, 1000);
    return () => clearInterval(id);
  }

  let id = window.setInterval(tick, 1000);
  let glitchId = 0;

  const glitch = () => {
    const raw = el.textContent;
    const chars = [...raw];
    for (let i = 0; i < 3; i++) {
      const idx = (Math.random() * chars.length) | 0;
      if (chars[idx] === ' ' || chars[idx] === '/' || chars[idx] === ':') continue;
      chars[idx] = String((Math.random() * 10) | 0);
    }
    el.textContent = chars.join('');
    el.classList.add('is-glitch');
    window.setTimeout(() => {
      el.classList.remove('is-glitch');
      tick();
    }, 120);
    glitchId = window.setTimeout(glitch, 4000 + Math.random() * 6000);
  };

  glitchId = window.setTimeout(glitch, 2500);

  return () => {
    clearInterval(id);
    clearTimeout(glitchId);
  };
}
