import {
  SITE_URL,
  detectLocale,
  messages,
  pathForLocale,
  t,
} from '../i18n/messages.js';

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

function applyDom(locale) {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const value = t(locale, key);
    if (el.getAttribute('data-i18n-html') === 'true') {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    const spec = el.getAttribute('data-i18n-attr');
    if (!spec) return;
    spec.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      if (!attr || !key) return;
      el.setAttribute(attr, t(locale, key));
    });
  });
}

function applyHead(locale) {
  const m = messages[locale] || messages.en;
  document.documentElement.lang = m.htmlLang;
  document.title = m.title;
  setMeta('meta[name="description"]', 'content', m.description);
  setMeta('meta[name="keywords"]', 'content', m.keywords);
  setMeta('meta[property="og:locale"]', 'content', m.localeOg);
  setMeta('meta[property="og:title"]', 'content', m.title);
  setMeta('meta[property="og:description"]', 'content', m.description);
  setMeta('meta[property="og:url"]', 'content', `${SITE_URL}${pathForLocale(locale)}`);
  setMeta('meta[name="twitter:title"]', 'content', m.title);
  setMeta('meta[name="twitter:description"]', 'content', m.description);
  setMeta('link[rel="canonical"]', 'href', `${SITE_URL}${pathForLocale(locale)}`);

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}${pathForLocale(locale)}`,
        name: 'TUPI',
        description: m.schemaSiteDesc,
        inLanguage: m.htmlLang,
        publisher: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Diogo Tupinambá',
        alternateName: ['TUPI', 'Diogo Tupi', 'Tupi'],
        url: SITE_URL + '/',
        image: `${SITE_URL}/media/portrait.png`,
        jobTitle: m.schemaJobTitle,
        description: m.schemaPersonDesc,
        knowsAbout: [
          'Video editing',
          'Reels',
          'Motion design',
          'Filmmaking',
          'Institutional video',
          'Music video',
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#service`,
        name: 'TUPI — Filmmaker & Editor',
        url: SITE_URL + '/',
        image: `${SITE_URL}/og-image.png`,
        telephone: '+55-21-93618-2629',
        priceRange: '$$',
        areaServed: [
          { '@type': 'Place', name: 'Europe' },
          { '@type': 'Country', name: 'Canada' },
          { '@type': 'Country', name: 'Brazil' },
        ],
        serviceType: [
          'Video editing',
          'Reel production',
          'Motion design',
          'Institutional video',
          'Filmmaking',
        ],
        provider: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: m.faqQ1,
            acceptedAnswer: { '@type': 'Answer', text: m.faqA1 },
          },
          {
            '@type': 'Question',
            name: m.faqQ2,
            acceptedAnswer: { '@type': 'Answer', text: m.faqA2 },
          },
          {
            '@type': 'Question',
            name: m.faqQ3,
            acceptedAnswer: { '@type': 'Answer', text: m.faqA3 },
          },
        ],
      },
    ],
  };

  let script = document.getElementById('schema-jsonld');
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'schema-jsonld';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(graph);
}

function wireLangSwitch(locale) {
  document.querySelectorAll('[data-lang-switch] a').forEach((a) => {
    const lang = a.getAttribute('data-lang');
    const active = lang === locale;
    a.classList.toggle('is-active', active);
    a.setAttribute('aria-current', active ? 'true' : 'false');
    const hash = location.hash || '';
    a.setAttribute('href', `${pathForLocale(lang)}${hash}`);
  });
}

export function initI18n() {
  const locale = detectLocale();
  window.__TUPI_LOCALE__ = locale;
  applyDom(locale);
  applyHead(locale);
  wireLangSwitch(locale);
  return locale;
}

export function getClientPrefix() {
  return t(window.__TUPI_LOCALE__ || 'en', 'clientPrefix');
}

export function getRolesPrefix() {
  return t(window.__TUPI_LOCALE__ || 'en', 'rolesPrefix');
}
