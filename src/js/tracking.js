/**
 * Tracking hooks — Semana 1 SEO/tráfego.
 * Preencha VITE_GTM_ID e/ou VITE_META_PIXEL_ID no .env.local
 */
export function initTracking() {
  const gtmId = import.meta.env.VITE_GTM_ID?.trim();
  const ga4Id = import.meta.env.VITE_GA4_ID?.trim();
  const pixelId = import.meta.env.VITE_META_PIXEL_ID?.trim();

  if (gtmId) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(s);

    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtmId)}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.insertBefore(noscript, document.body.firstChild);
  } else if (ga4Id) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', ga4Id);
  }

  if (pixelId) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }

  document.querySelectorAll('a[href*="wa.me"]').forEach((el) => {
    el.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'contact', {
          method: 'whatsapp',
          event_category: 'engagement',
        });
      }
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Contact');
      }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'whatsapp_click' });
    });
  });
}
