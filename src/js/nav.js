export function initNav(root = document) {
  const header = root.querySelector('[data-nav]');
  const toggle = root.querySelector('[data-nav-toggle]');
  const links = root.querySelector('[data-nav-links]');
  const year = root.querySelector('[data-year]');

  if (year) year.textContent = String(new Date().getFullYear());
  if (!header || !toggle || !links) return;

  const setOpen = (open) => {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  toggle.addEventListener('click', () => {
    setOpen(!header.classList.contains('is-open'));
  });

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });
}
