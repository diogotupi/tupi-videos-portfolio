import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initReveal, prefersReducedMotion } from './reveal.js';

describe('reveal', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div class="js-reveal"></div>`;
  });

  it('marks visible immediately when reduced motion', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({ matches: true, addEventListener() {}, removeEventListener() {} }),
    );
    expect(prefersReducedMotion()).toBe(true);
    initReveal(document);
    expect(document.querySelector('.js-reveal').classList.contains('is-visible')).toBe(true);
    vi.unstubAllGlobals();
  });
});
