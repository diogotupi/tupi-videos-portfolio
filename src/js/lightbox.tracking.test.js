import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock tracking module BEFORE importing the lightbox module
vi.mock('./tracking.js', () => ({
  trackViewContent: vi.fn(),
}));

describe('lightbox tracking', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button
        data-lightbox-open
        data-title="Reel"
        data-tag="Reels"
        data-id="reel-123"
        data-embed="https://player.vimeo.com/video/999"
        data-src=""
      >Open</button>
      <div data-lightbox hidden>
        <button data-lightbox-close>Fechar</button>
        <p data-lightbox-tag></p>
        <h3 data-lightbox-title></h3>
        <p data-lightbox-credit hidden></p>
        <p data-lightbox-roles hidden></p>
        <video data-lightbox-video hidden></video>
        <iframe data-lightbox-embed hidden></iframe>
        <p data-lightbox-empty hidden></p>
      </div>
    `;
  });

  it('fires trackViewContent when a video is opened', async () => {
    const tracking = await import('./tracking.js');
    const { initLightbox } = await import('./lightbox.js');

    initLightbox(document);
    document.querySelector('[data-lightbox-open]').click();

    expect(tracking.trackViewContent).toHaveBeenCalledTimes(1);
    expect(tracking.trackViewContent).toHaveBeenCalledWith({
      name: 'Reel',
      category: 'Reels',
      id: 'reel-123',
    });
  });
});

