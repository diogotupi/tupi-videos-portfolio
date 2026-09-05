/**
 * Tracking hooks — GTM (preferred) / GA4 fallback / Meta Pixel.
 *
 * With VITE_GTM_ID set, only GTM loads (head script + body noscript).
 * Configure GA4 / Pixel as tags inside the GTM container to avoid
 * double pageviews. VITE_GA4_ID is used only when GTM is empty.
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

/**
 * Fire Meta Pixel ViewContent and push a GTM dataLayer event
 * when a portfolio video is opened.
 *
 * @param {{ name: string, category?: string, id?: string }} param0
 */
export function trackViewContent({ name, category, id }) {
  const videoTitle = String(name || '').trim();
  const videoCategory = String(category || '').trim();
  const contentId = id && String(id).trim() ? String(id).trim() : undefined;

  // Meta Pixel (if available)
  try {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', {
        content_name: videoTitle,
        content_category: videoCategory || undefined,
        content_type: 'video',
        content_ids: contentId ? [contentId] : undefined,
      });
    }
  } catch {
    // Ignore tracking exceptions
  }

  // GTM dataLayer
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'video_view',
      video_title: videoTitle,
      video_tag: videoCategory || '',
    });
  } catch {
    // Ignore dataLayer exceptions
  }

  // Optional GA4 direct event (nice-to-have)
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'view_item', {
        item_id: contentId,
        item_name: videoTitle,
        item_category: videoCategory || undefined,
        content_type: 'video',
      });
    }
  } catch {
    // Ignore GA exceptions
  }
}
