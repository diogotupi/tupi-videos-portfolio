import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initThumbPreview } from './thumb-preview.js';

describe('initThumbPreview', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button data-lightbox-open data-src="https://example.com/a.mp4">
        <div class="works__thumb">
          <video class="works__thumb-media" muted src="https://example.com/a.mp4#t=16"></video>
        </div>
      </button>
    `;
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query) => ({
        matches:
          query.includes('prefers-reduced-motion')
            ? false
            : query.includes('hover: hover'),
        addEventListener() {},
        removeEventListener() {},
      })),
    );
  });

  it('plays muted video on mouseenter and pauses on mouseleave', async () => {
    const video = document.querySelector('video');
    video.play = vi.fn(() => Promise.resolve());
    video.pause = vi.fn();
    Object.defineProperty(video, 'currentTime', {
      writable: true,
      value: 0,
    });

    initThumbPreview(document);
    const btn = document.querySelector('[data-lightbox-open]');
    btn.dispatchEvent(new Event('mouseenter'));
    expect(video.play).toHaveBeenCalled();
    btn.dispatchEvent(new Event('mouseleave'));
    expect(video.pause).toHaveBeenCalled();
  });

  it('no-ops under reduced motion', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: true,
        addEventListener() {},
        removeEventListener() {},
      }),
    );
    const video = document.querySelector('video');
    video.play = vi.fn(() => Promise.resolve());
    initThumbPreview(document);
    document.querySelector('[data-lightbox-open]').dispatchEvent(new Event('mouseenter'));
    expect(video.play).not.toHaveBeenCalled();
  });
});
