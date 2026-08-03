import { describe, it, expect, beforeEach } from 'vitest';
import { initLightbox } from './lightbox.js';

describe('initLightbox', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button data-lightbox-open data-title="Neon Drift" data-tag="Comercial" data-src="">Open</button>
      <div data-lightbox hidden>
        <button data-lightbox-close>Fechar</button>
        <p data-lightbox-tag></p>
        <h3 data-lightbox-title></h3>
        <video data-lightbox-video></video>
        <p data-lightbox-empty hidden></p>
      </div>
    `;
  });

  it('opens with title/tag and shows empty state when no src', () => {
    initLightbox(document);
    document.querySelector('[data-lightbox-open]').click();
    const box = document.querySelector('[data-lightbox]');
    expect(box.hidden).toBe(false);
    expect(document.querySelector('[data-lightbox-title]').textContent).toBe('Neon Drift');
    expect(document.querySelector('[data-lightbox-tag]').textContent).toBe('Comercial');
    expect(document.querySelector('[data-lightbox-empty]').hidden).toBe(false);
  });

  it('closes on close button', () => {
    initLightbox(document);
    document.querySelector('[data-lightbox-open]').click();
    document.querySelector('[data-lightbox-close]').click();
    expect(document.querySelector('[data-lightbox]').hidden).toBe(true);
  });
});
