export function initHeroGlass(root = document) {
  const glass = root.querySelector('.hero__glass');
  const hero = glass?.closest('.hero');
  if (!glass || !hero) return () => {};

  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!fine.matches) return () => {};

  let raf = 0;

  const onMove = (e) => {
    const rect = glass.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      glass.style.setProperty('--glass-x', `${x.toFixed(1)}%`);
      glass.style.setProperty('--glass-y', `${y.toFixed(1)}%`);
      glass.style.setProperty('--glass-on', '1');
    });
  };

  const onLeave = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    glass.style.setProperty('--glass-on', '0');
  };

  hero.addEventListener('pointermove', onMove);
  hero.addEventListener('pointerleave', onLeave);

  return () => {
    if (raf) cancelAnimationFrame(raf);
    hero.removeEventListener('pointermove', onMove);
    hero.removeEventListener('pointerleave', onLeave);
  };
}
