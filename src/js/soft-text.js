import { prefersReducedMotion } from './reveal.js';

function wrapLetters(el) {
  if (el.dataset.softReady === '1') return;
  const text = el.textContent;
  el.dataset.softText = text;
  el.textContent = '';
  el.setAttribute('aria-label', text);
  [...text].forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'soft-letter';
    span.style.setProperty('--i', String(i));
    span.textContent = ch === ' ' ? '\u00a0' : ch;
    el.appendChild(span);
  });
  el.dataset.softReady = '1';
}

function play(el) {
  // Hero brand (and any [data-soft-whole]): animate as one block — no letter split
  if (el.classList.contains('hero__brand') || el.hasAttribute('data-soft-whole')) {
    el.classList.add('is-soft-in');
    return;
  }
  wrapLetters(el);
  el.classList.add('is-soft-in');
}

export function initSoftText(root = document) {
  const nodes = [
    ...root.querySelectorAll('[data-soft-text], [data-scramble]'),
  ];
  if (!nodes.length) return null;

  if (prefersReducedMotion()) {
    nodes.forEach((el) => el.classList.add('is-soft-in'));
    return null;
  }

  // Prepare hero brand for whole-block fade (avoid vertical letter wrap)
  nodes
    .filter((el) => el.classList.contains('hero__brand') || el.hasAttribute('data-soft-whole'))
    .forEach((el) => el.classList.add('soft-block'));

  nodes
    .filter((el) => el.closest('.hero'))
    .forEach((el, i) => {
      window.setTimeout(() => play(el), 160 + i * 90);
    });

  const others = nodes.filter((el) => !el.closest('.hero'));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        play(entry.target);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.35 },
  );
  others.forEach((el) => io.observe(el));
  return io;
}
