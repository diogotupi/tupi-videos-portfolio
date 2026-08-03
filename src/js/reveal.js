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
