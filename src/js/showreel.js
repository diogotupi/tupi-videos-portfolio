import { prefersReducedMotion } from './reveal.js';

export function initShowreel(root = document) {
  const section = root.querySelector('.showreel');
  const video = section?.querySelector('[data-showreel-video]');
  const frame = section?.querySelector('.showreel__frame');
  const playBtn = section?.querySelector('.showreel__play');
  if (!section || !video) return;

  // Inline playback on mobile; do not mute or loop by default
  video.playsInline = true;

  const loadSrcIfNeeded = () => {
    if (!video.currentSrc && !video.src) {
      const dataSrc = video.getAttribute('data-src');
      if (dataSrc) {
        video.src = dataSrc;
        return true;
      }
      return false;
    }
    return true;
  };

  // Overlay play behavior: start from beginning with sound
  const onPlayClick = () => {
    const hasSource = loadSrcIfNeeded();
    if (!hasSource) return;
    try {
      video.muted = false;
      // Always start from the beginning as requested
      video.currentTime = 0;
      const result = video.play();
      if (result && typeof result.catch === 'function') {
        result.catch(() => {
          /* ignore play() rejections (permissions, etc.) */
        });
      }
    } catch {
      /* no-op */
    }
  };

  playBtn?.addEventListener('click', onPlayClick);
  video.addEventListener('play', () => frame?.classList.add('is-playing'));
  const showOverlay = () => frame?.classList.remove('is-playing');
  video.addEventListener('pause', showOverlay);
  video.addEventListener('ended', showOverlay);

  // Lazy-load the full MP4 near viewport; do not autoplay
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadSrcIfNeeded();
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '200px 0px -8% 0px' },
  );
  io.observe(section);

  return () => {
    io.disconnect();
    playBtn?.removeEventListener('click', onPlayClick);
    video.removeEventListener('play', () => frame?.classList.add('is-playing'));
    video.removeEventListener('pause', showOverlay);
    video.removeEventListener('ended', showOverlay);
  };
}

