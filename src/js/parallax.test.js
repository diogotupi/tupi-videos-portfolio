import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initParallax } from './parallax.js';

describe('initParallax', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div data-parallax></div>`;
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({ matches: true, addEventListener() {}, removeEventListener() {} }),
    );
  });

  it('no-ops under reduced motion', () => {
    const cleanup = initParallax(document);
    expect(typeof cleanup).toBe('function');
    cleanup();
    vi.unstubAllGlobals();
  });
});
