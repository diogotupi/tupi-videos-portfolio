import { describe, it, expect, afterEach, vi } from 'vitest';
import { initSoftText } from './soft-text.js';
import { initHalftoneTrail } from './halftone-trail.js';

describe('motion extras', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
  });

  it('soft text marks reduced-motion nodes as in', () => {
    document.body.innerHTML = `<h1 data-scramble>Diogo Tupi</h1>`;
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({ matches: true, addEventListener() {}, removeEventListener() {} }),
    );
    expect(initSoftText(document)).toBeNull();
    expect(document.querySelector('[data-scramble]').classList.contains('is-soft-in')).toBe(true);
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
