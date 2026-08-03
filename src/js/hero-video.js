export function initHeroVideo(root = document) {
  const hero = root.querySelector('.hero');
  const video = root.querySelector('[data-hero-video]');
  if (!hero || !video) return;

  video.muted = true;
  video.playsInline = true;

  const markFallback = () => hero.classList.add('is-fallback');

  const hasSource = Boolean(
    video.currentSrc || video.src || video.querySelector('source'),
  );

  const tryPlay = () => {
    if (!hasSource) return;
    const result = video.play();
    if (result && typeof result.catch === 'function') {
      result.catch(markFallback);
    }
  };

  if (video.readyState >= 2) {
    if (hasSource) {
      tryPlay();
    } else {
      markFallback();
    }
  } else {
    video.addEventListener('loadeddata', tryPlay, { once: true });
    video.addEventListener('error', markFallback, { once: true });
    if (
      !hasSource &&
      video.networkState === HTMLMediaElement.NETWORK_EMPTY
    ) {
      markFallback();
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
