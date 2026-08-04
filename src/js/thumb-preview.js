import { prefersReducedMotion } from './reveal.js';

function posterTime(video) {
  const src = video.getAttribute('src') || '';
  const match = src.match(/#t=([\d.]+)/);
  return match ? Number(match[1]) : 0;
}

export function initThumbPreview(root = document) {
  if (prefersReducedMotion()) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  root.querySelectorAll('[data-lightbox-open]').forEach((btn) => {
    const thumb = btn.querySelector('.works__thumb');
    if (!thumb) return;

    let video = thumb.querySelector('video.works__thumb-media');
    const previewSrc =
      btn.getAttribute('data-preview-src') || btn.getAttribute('data-src') || '';
    const previewEndRaw = btn.getAttribute('data-preview-end');
    const previewEnd = previewEndRaw ? Number(previewEndRaw) : null;
    let generated = false;
    let startAt = video ? posterTime(video) : 0;
    let onTimeUpdate = null;
    let holdTimer = null;
    let suppressClick = false;
    let activePointerId = null;

    const ensureVideo = () => {
      if (video) return video;
      if (!previewSrc) return null;
      video = document.createElement('video');
      video.className = 'works__thumb-media works__thumb-media--preview';
      video.muted = true;
      video.playsInline = true;
      video.loop = previewEnd == null || Number.isNaN(previewEnd);
      video.preload = 'metadata';
      video.setAttribute('src', previewSrc);
      video.setAttribute('aria-hidden', 'true');
      thumb.appendChild(video);
      generated = true;
      startAt = 0;
      return video;
    };

    const clearBound = () => {
      if (video && onTimeUpdate) {
        video.removeEventListener('timeupdate', onTimeUpdate);
        onTimeUpdate = null;
      }
    };

    const stop = () => {
      if (holdTimer) {
        window.clearTimeout(holdTimer);
        holdTimer = null;
      }
      activePointerId = null;
      if (!video) return;
      clearBound();
      video.pause();
      try {
        video.currentTime = startAt;
      } catch {
        /* ignore seek errors */
      }
      if (generated) {
        video.classList.remove('is-playing');
      }
    };

    const start = () => {
      const el = ensureVideo();
      if (!el) return;
      el.muted = true;
      clearBound();

      if (previewEnd != null && !Number.isNaN(previewEnd) && previewEnd > 0) {
        el.loop = false;
        onTimeUpdate = () => {
          if (el.currentTime >= previewEnd) {
            try {
              el.currentTime = 0;
            } catch {
              /* ignore */
            }
            const again = el.play();
            if (again && typeof again.catch === 'function') again.catch(() => {});
          }
        };
        el.addEventListener('timeupdate', onTimeUpdate);
      } else {
        el.loop = true;
      }

      if (generated) el.classList.add('is-playing');
      try {
        el.currentTime = startAt;
      } catch {
        /* ignore */
      }
      const play = el.play();
      if (play && typeof play.catch === 'function') play.catch(() => {});
    };

    if (finePointer.matches) {
      btn.addEventListener('mouseenter', start);
      btn.addEventListener('mouseleave', stop);
      btn.addEventListener('focusout', (e) => {
        if (!btn.contains(e.relatedTarget)) stop();
      });
    }

    // Touch / pen: press-and-hold previews like desktop hover
    btn.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse') return;
      if (e.button != null && e.button !== 0) return;
      activePointerId = e.pointerId;
      suppressClick = false;
      holdTimer = window.setTimeout(() => {
        holdTimer = null;
        suppressClick = true;
        start();
      }, 180);
    });

    const endHold = (e) => {
      if (activePointerId != null && e.pointerId !== activePointerId) return;
      stop();
    };

    btn.addEventListener('pointerup', endHold);
    btn.addEventListener('pointercancel', endHold);
    btn.addEventListener('pointerleave', endHold);

    btn.addEventListener(
      'click',
      (e) => {
        if (!suppressClick) return;
        e.preventDefault();
        e.stopPropagation();
        suppressClick = false;
      },
      true,
    );
  });
}
