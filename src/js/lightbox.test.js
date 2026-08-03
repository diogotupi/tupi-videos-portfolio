import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initLightbox } from './lightbox.js';

describe('initLightbox', () => {
  let pauseStub;
  let loadStub;

  beforeEach(() => {
    pauseStub = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
    loadStub = vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
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

  afterEach(() => {
    pauseStub.mockRestore();
    loadStub.mockRestore();
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

  it('closes on Escape key', () => {
    initLightbox(document);
    document.querySelector('[data-lightbox-open]').click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(document.querySelector('[data-lightbox]').hidden).toBe(true);
  });

  it('restores body overflow after re-opening without closing', () => {
    document.body.style.overflow = '';
    document.body.innerHTML = `
      <button id="open-a" data-lightbox-open data-title="A" data-tag="Tag" data-src="">Open A</button>
      <button id="open-b" data-lightbox-open data-title="B" data-tag="Tag" data-src="">Open B</button>
      <div data-lightbox hidden>
        <button data-lightbox-close>Fechar</button>
        <p data-lightbox-tag></p>
        <h3 data-lightbox-title></h3>
        <video data-lightbox-video></video>
        <p data-lightbox-empty hidden></p>
      </div>
    `;
    initLightbox(document);
    document.querySelector('#open-a').click();
    expect(document.body.style.overflow).toBe('hidden');
    document.querySelector('#open-b').click();
    expect(document.body.style.overflow).toBe('hidden');
    document.querySelector('[data-lightbox-close]').click();
    expect(document.body.style.overflow).toBe('');
  });

  it('focuses close button on open and restores trigger on close', () => {
    initLightbox(document);
    const trigger = document.querySelector('[data-lightbox-open]');
    const closeBtn = document.querySelector('[data-lightbox-close]');
    trigger.click();
    expect(document.activeElement).toBe(closeBtn);
    closeBtn.click();
    expect(document.activeElement).toBe(trigger);
  });
});
