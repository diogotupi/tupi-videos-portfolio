export function initLightbox(root = document) {
  const box = root.querySelector('[data-lightbox]');
  if (!box) return;

  const titleEl = box.querySelector('[data-lightbox-title]');
  const tagEl = box.querySelector('[data-lightbox-tag]');
  const video = box.querySelector('[data-lightbox-video]');
  const empty = box.querySelector('[data-lightbox-empty]');
  let savedOverflow = '';
  let triggerEl = null;

  const getFocusTarget = () => {
    const panel = box.querySelector('.lightbox__panel') || box;
    const closeBtn = panel.querySelector('button[data-lightbox-close]');
    if (closeBtn) return closeBtn;
    return panel.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  };

  const close = () => {
    box.hidden = true;
    document.body.style.overflow = savedOverflow;
    if (video) {
      try {
        if (typeof video.pause === 'function') video.pause();
      } catch {}
      video.removeAttribute('src');
      try {
        if (typeof video.load === 'function') video.load();
      } catch {}
    }
    if (triggerEl && document.contains(triggerEl)) {
      triggerEl.focus();
    }
    triggerEl = null;
  };

  const open = (btn) => {
    if (box.hidden) {
      savedOverflow = document.body.style.overflow;
    }
    triggerEl = btn;
    const title = btn.getAttribute('data-title') || '';
    const tag = btn.getAttribute('data-tag') || '';
    const src = btn.getAttribute('data-src') || '';
    if (titleEl) titleEl.textContent = title;
    if (tagEl) tagEl.textContent = tag;
    if (src) {
      if (empty) empty.hidden = true;
      if (video) {
        video.hidden = false;
        video.src = src;
        video.play()?.catch(() => {});
      }
    } else {
      if (video) video.hidden = true;
      if (empty) empty.hidden = false;
    }
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    getFocusTarget()?.focus();
  };

  root.querySelectorAll('[data-lightbox-open]').forEach((btn) => {
    btn.addEventListener('click', () => open(btn));
  });

  box.querySelectorAll('[data-lightbox-close]').forEach((el) => {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !box.hidden) close();
  });
}
