import { prefersReducedMotion } from './reveal.js';

function posterTime(video) {
  const src = video.getAttribute('src') || '';
  const match = src.match(/#t=([\d.]+)/);
  return match ? Number(match[1]) : 0;
}

export function initThumbPreview(root = document) {
  if (prefersReducedMotion()) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!finePointer.matches) return;

  root.querySelectorAll('[data-lightbox-open]').forEach((btn) => {
    const thumb = btn.querySelector('.works__thumb');
    if (!thumb) return;

    let video = thumb.querySelector('video.works__thumb-media');
    const mp4 = btn.getAttribute('data-src') || '';
    let generated = false;
    let startAt = video ? posterTime(video) : 0;

    const ensureVideo = () => {
      if (video) return video;
      if (!mp4) return null;
      video = document.createElement('video');
      video.className = 'works__thumb-media works__thumb-media--preview';
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.preload = 'metadata';
      video.setAttribute('src', mp4);
      video.setAttribute('aria-hidden', 'true');
      thumb.appendChild(video);
      generated = true;
      startAt = 0;
      return video;
    };

    const stop = () => {
      if (!video) return;
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
      el.loop = true;
      if (generated) el.classList.add('is-playing');
      const play = el.play();
      if (play && typeof play.catch === 'function') play.catch(() => {});
    };

    btn.addEventListener('mouseenter', start);
    btn.addEventListener('mouseleave', stop);
    btn.addEventListener('focusout', (e) => {
      if (!btn.contains(e.relatedTarget)) stop();
    });
  });
}
