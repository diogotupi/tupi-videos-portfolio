import { describe, it, expect, beforeEach } from 'vitest';
import { initNav } from './nav.js';

describe('initNav', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <header data-nav>
        <button data-nav-toggle aria-expanded="false">Menu</button>
        <nav data-nav-links><a href="#sobre">Sobre</a></nav>
      </header>
      <span data-year></span>
    `;
  });

  it('toggles is-open and aria-expanded', () => {
    initNav(document);
    const header = document.querySelector('[data-nav]');
    const toggle = document.querySelector('[data-nav-toggle]');
    toggle.click();
    expect(header.classList.contains('is-open')).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    toggle.click();
    expect(header.classList.contains('is-open')).toBe(false);
  });

  it('closes on link click', () => {
    initNav(document);
    const header = document.querySelector('[data-nav]');
    document.querySelector('[data-nav-toggle]').click();
    document.querySelector('[data-nav-links] a').click();
    expect(header.classList.contains('is-open')).toBe(false);
  });

  it('fills year', () => {
    initNav(document);
    expect(document.querySelector('[data-year]').textContent).toBe(
      String(new Date().getFullYear()),
    );
  });
});
