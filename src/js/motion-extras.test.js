import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initScrambleText } from './scramble-text.js';
import { initHalftoneTrail } from './halftone-trail.js';

describe('motion extras', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  it('scramble no-ops under reduced motion', () => {
    document.body.innerHTML = `<h1 data-scramble>Diogo Tupi</h1>`;
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({ matches: true, addEventListener() {}, removeEventListener() {} }),
    );
    expect(initScrambleText(document)).toBeNull();
    expect(document.querySelector('[data-scramble]').textContent).toBe('Diogo Tupi');
  });

  it('halftone trail no-ops without fine pointer', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((q) => ({
        matches: q.includes('prefers-reduced-motion') ? false : false,
        addEventListener() {},
        removeEventListener() {},
      })),
    );
    const cleanup = initHalftoneTrail(document);
    expect(document.querySelector('.halftone-trail')).toBeNull();
    cleanup();
  });
});
