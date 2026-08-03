import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initHeroVideo } from './hero-video.js';

describe('initHeroVideo', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section class="hero">
        <video data-hero-video muted loop playsinline></video>
        <div data-hero-fallback></div>
      </section>
    `;
  });

  it('adds is-fallback when play rejects', async () => {
    const video = document.querySelector('[data-hero-video]');
    video.play = vi.fn(() => Promise.reject(new Error('autoplay blocked')));
    initHeroVideo(document);
    await vi.waitFor(() => {
      expect(document.querySelector('.hero').classList.contains('is-fallback')).toBe(true);
    });
  });

  it('does not add is-fallback when play resolves', async () => {
    const video = document.querySelector('[data-hero-video]');
    video.play = vi.fn(() => Promise.resolve());
    initHeroVideo(document);
    await Promise.resolve();
    expect(document.querySelector('.hero').classList.contains('is-fallback')).toBe(false);
  });
});
