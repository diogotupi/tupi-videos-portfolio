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

  it('loops preview within data-preview-end window', () => {
    document.body.innerHTML = `
      <button
        data-lightbox-open
        data-preview-src="https://example.com/preview.mp4"
        data-preview-end="10"
        data-embed="https://www.youtube.com/embed/x"
        data-src=""
      >
        <div class="works__thumb">
          <img class="works__thumb-media" src="/thumb.jpg" alt="" />
        </div>
      </button>
    `;
    const playStub = vi
      .spyOn(HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve());
    initThumbPreview(document);
    const btn = document.querySelector('[data-lightbox-open]');
    btn.dispatchEvent(new Event('mouseenter'));
    const video = btn.querySelector('video.works__thumb-media--preview');
    expect(video).toBeTruthy();
    expect(video.getAttribute('src')).toBe('https://example.com/preview.mp4');
    Object.defineProperty(video, 'currentTime', {
      configurable: true,
      get() {
        return this._t || 0;
      },
      set(v) {
        this._t = v;
      },
    });
    video._t = 10.2;
    video.dispatchEvent(new Event('timeupdate'));
    expect(video._t).toBe(0);
    playStub.mockRestore();
  });

  it('plays muted preview on touch press-and-hold without opening', async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query) => ({
        matches: query.includes('prefers-reduced-motion') ? false : false,
        addEventListener() {},
        removeEventListener() {},
      })),
    );
    vi.useFakeTimers();
    const playStub = vi
      .spyOn(HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve());
    const pauseStub = vi
      .spyOn(HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => {});

    const touchPointer = (type, pointerId = 1) => {
      const event = new Event(type, { bubbles: true, cancelable: true });
      Object.defineProperty(event, 'pointerType', { value: 'touch' });
      Object.defineProperty(event, 'pointerId', { value: pointerId });
      Object.defineProperty(event, 'button', { value: 0 });
      return event;
    };

    initThumbPreview(document);
    const btn = document.querySelector('[data-lightbox-open]');
    btn.dispatchEvent(touchPointer('pointerdown'));
    vi.advanceTimersByTime(200);
    expect(playStub).toHaveBeenCalled();

    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    btn.dispatchEvent(click);
    expect(click.defaultPrevented).toBe(true);

    btn.dispatchEvent(touchPointer('pointerup'));
    expect(pauseStub).toHaveBeenCalled();
    vi.useRealTimers();
    playStub.mockRestore();
    pauseStub.mockRestore();
  });
});
