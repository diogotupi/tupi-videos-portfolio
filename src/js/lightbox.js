import { getClientPrefix, getRolesPrefix } from './i18n.js';

export function initLightbox(root = document) {
  const box = root.querySelector('[data-lightbox]');
  if (!box) return;

  const titleEl = box.querySelector('[data-lightbox-title]');
  const tagEl = box.querySelector('[data-lightbox-tag]');
  const creditEl = box.querySelector('[data-lightbox-credit]');
  const rolesEl = box.querySelector('[data-lightbox-roles]');
  const video = box.querySelector('[data-lightbox-video]');
  const embed = box.querySelector('[data-lightbox-embed]');
  const empty = box.querySelector('[data-lightbox-empty]');
  const player = box.querySelector('.lightbox__player');
  let savedOverflow = '';
  let triggerEl = null;

  const getFocusTarget = () => {
    const panel = box.querySelector('.lightbox__panel') || box;
    const closeBtn = panel.querySelector('button[data-lightbox-close]');
    if (closeBtn) return closeBtn;
    return panel.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
  };

  const clearMedia = () => {
    if (video) {
      try {
        if (typeof video.pause === 'function') video.pause();
      } catch {
        /* jsdom */
      }
      video.removeAttribute('src');
      try {
        if (typeof video.load === 'function') video.load();
      } catch {
        /* jsdom */
      }
      video.hidden = true;
    }
    if (embed) {
      embed.removeAttribute('src');
      embed.hidden = true;
    }
    if (player) {
      player.classList.remove('is-embed', 'is-video', 'is-vertical-media');
    }
  };

  const close = () => {
    box.hidden = true;
    document.body.style.overflow = savedOverflow;
    clearMedia();
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
    const credit = btn.getAttribute('data-client') || '';
    const roles = btn.getAttribute('data-roles') || '';
    const src = btn.getAttribute('data-src') || '';
    const embedSrc = btn.getAttribute('data-embed') || '';

    if (titleEl) titleEl.textContent = title;
    if (tagEl) tagEl.textContent = tag;
    if (creditEl) {
      creditEl.textContent = credit ? `${getClientPrefix()}${credit}` : '';
      creditEl.hidden = !credit;
    }
    if (rolesEl) {
      rolesEl.textContent = roles ? `${getRolesPrefix()}${roles}` : '';
      rolesEl.hidden = !roles;
    }

    clearMedia();

    const isVertical = Boolean(btn.closest('[data-vertical]'));
    box.classList.toggle('is-vertical', isVertical);

    if (embedSrc && embed) {
      if (empty) empty.hidden = true;
      if (player) {
        player.classList.add('is-embed');
        if (isVertical) player.classList.add('is-vertical-media');
      }
      embed.hidden = false;
      embed.src = embedSrc;
    } else if (src && video) {
      if (empty) empty.hidden = true;
      if (player) {
        player.classList.add('is-video');
        if (isVertical) player.classList.add('is-vertical-media');
      }
      video.hidden = false;
      video.src = src;
      video.play()?.catch(() => {});
    } else {
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
