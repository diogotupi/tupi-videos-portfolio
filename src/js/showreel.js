import { prefersReducedMotion } from './reveal.js';

export function initShowreel(root = document) {
  const section = root.querySelector('.showreel');
  const video = section?.querySelector('[data-showreel-video]');
  if (!section || !video) return;

  // Ensure mobile autoplay compliance and looping
  video.muted = true;
  video.playsInline = true;
  video.loop = true;

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

  const tryPlay = () => {
    const hasSource = Boolean(video.currentSrc || video.src);
    if (!hasSource) return;
    const result = video.play();
    if (result && typeof result.catch === 'function') {
      result.catch(() => {
        /* swallow autoplay failures */
      });
    }
  };

  // Respect reduced motion: do not autoplay
  if (prefersReducedMotion()) {
    return;
  }

  // Lazy-load and autoplay when the section enters the viewport
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const justLoaded = loadSrcIfNeeded();
        if (video.readyState >= 2 && !justLoaded) {
          tryPlay();
        } else {
          video.addEventListener('loadeddata', tryPlay, { once: true });
        }
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
  );
  io.observe(section);

  return () => io.disconnect();
}

