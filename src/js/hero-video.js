export function initHeroVideo(root = document) {
  const hero = root.querySelector('.hero');
  const video = root.querySelector('[data-hero-video]');
  if (!hero || !video) return;

  video.muted = true;
  video.playsInline = true;

  const markFallback = () => hero.classList.add('is-fallback');

  const tryPlay = () => {
    const result = video.play();
    if (result && typeof result.catch === 'function') {
      result.catch(markFallback);
    }
  };

  if (video.readyState >= 2) {
    tryPlay();
  } else {
    video.addEventListener('loadeddata', tryPlay, { once: true });
    video.addEventListener('error', markFallback, { once: true });
    // No source yet in v1 — attempt play; rejection triggers fallback
    if (!video.currentSrc && video.networkState === HTMLMediaElement.NETWORK_EMPTY) {
      tryPlay();
    }
  }

  const animated = root.querySelectorAll('[data-hero-animate]');
  requestAnimationFrame(() => {
    animated.forEach((el, i) => {
      el.style.transitionDelay = `${i * 80}ms`;
      el.classList.add('is-in');
    });
  });
}
