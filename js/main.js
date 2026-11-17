/* Qimma Performance website — vanilla JS. Business details come from js/config.js, text from js/translations.js */
(function () {
  'use strict';
  var C = window.SITE_CONFIG, T = window.I18N;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;
  var lang = 'ar';

  /* ---------- Tracking (only if IDs are supplied in config.js) ---------- */
  window.dataLayer = window.dataLayer || [];
  function track(name, params) {
    try {
      window.dataLayer.push(Object.assign({ event: name }, params || {}));
      if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
      if (typeof window.fbq === 'function') window.fbq('trackCustom', name, params || {});
      if (window.ttq && typeof window.ttq.track === 'function') window.ttq.track('Contact', params || {});
    } catch (e) { /* never break the page because of a tracker */ }
  }
  function loadScript(src) { var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); }
  function initTracking() {
    var t = C.tracking || {};
    if (t.gtmId) {
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      loadScript('https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(t.gtmId));
    }
    if (t.ga4Id) {
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date()); window.gtag('config', t.ga4Id);
      loadScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(t.ga4Id));
    }
    if (t.metaPixelId) {
      (function (f, b, e, v, n, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = true; n.version = '2.0'; n.queue = []; s = b.createElement(e); s.async = true; s.src = v; b.head.appendChild(s); })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', t.metaPixelId); window.fbq('track', 'PageView');
    }
    if (t.tiktokPixelId) {
      var ttq = window.ttq = window.ttq || [];
      ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie'];
      ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); }; };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.load = function (id) { ttq._i = ttq._i || {}; ttq._i[id] = []; ttq._t = ttq._t || {}; ttq._t[id] = +new Date(); loadScript('https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=' + encodeURIComponent(id) + '&lib=ttq'); };
      ttq.load(t.tiktokPixelId); ttq.page();
    }
  }

  /* ---------- Business details binding ---------- */
  function phoneOf(v) { var i = v === 'primary' ? C.primaryPhone : parseInt(v, 10); return C.phones[i] || C.phones[0]; }
  function waLink(phone, text) { return 'https://wa.me/' + phone.wa + (text ? '?text=' + encodeURIComponent(text) : ''); }
  function serviceNameAr(id) { var n = { waterproofing: 1, thermal: 2, foam: 3, tank: 4, leak: 5 }[id]; return n ? T.ar['svc' + n + '.t'] : ''; }
  function bindBusiness() {
    $$('[data-phone]').forEach(function (a) { a.href = 'tel:' + phoneOf(a.getAttribute('data-phone')).tel; });
    $$('[data-phone-text]').forEach(function (a) { a.textContent = phoneOf(a.getAttribute('data-phone-text')).display; });
    $$('[data-wa]').forEach(function (a) {
      var p = phoneOf(a.getAttribute('data-wa')), sid = a.getAttribute('data-wa-service'), m = C.whatsappMessages;
      var text = !sid || sid === 'general' ? m.general : m.service.replace('{service}', serviceNameAr(sid));
      a.href = waLink(p, text);
      if (!a.hasAttribute('data-track')) a.setAttribute('data-track', 'whatsapp_click');
    });
    $$('[data-site]').forEach(function (a) { a.href = C.siteUrl; a.textContent = C.siteUrl.replace(/^https?:\/\//, ''); });
    $$('[data-social]').forEach(function (a) { var u = C.social[a.getAttribute('data-social')]; if (u) a.href = u; else a.hidden = true; });
    $$('[data-maps]').forEach(function (a) { a.href = C.mapsLink; });
    if (C.showEmail && C.email) {
      $$('[data-email]').forEach(function (a) { a.href = 'mailto:' + C.email; a.textContent = C.email; });
      $$('[data-email-row]').forEach(function (r) { r.hidden = false; });
    }
    if (C.mapEmbedUrl) {
      var box = $('#mapEmbed'); if (box) { var f = document.createElement('iframe'); f.src = C.mapEmbedUrl; f.loading = 'lazy'; f.title = 'map'; box.appendChild(f); box.hidden = false; }
    }
    $('#year').textContent = new Date().getFullYear();
    $$('[data-track]').forEach(function (a) { a.addEventListener('click', function () { track(a.getAttribute('data-track'), { link_url: a.href }); }); });
  }

  /* ---------- Language ---------- */
  function splitHero() {
    var h = $('#heroTitle'); if (!h) return;
    var words = h.textContent.trim().split(/\s+/);
    h.innerHTML = '';
    words.forEach(function (w, i) {
      var s = document.createElement('span'); s.className = 'w'; s.style.setProperty('--i', i); s.textContent = w;
      h.appendChild(s); if (i < words.length - 1) h.appendChild(document.createTextNode(' '));
    });
    h.setAttribute('aria-label', words.join(' '));
  }
  function renderReviews(lang) {
    var box = document.getElementById('revs'); var list = C.reviews || [];
    if (!box || !list.length) return;
    box.innerHTML = '';
    list.forEach(function (r) {
      var d = document.createElement('div'); d.className = 'rev rev--real is-in';
      var st = document.createElement('div'); st.className = 'rev__stars';
      st.textContent = new Array((r.stars || 5) + 1).join('\u2605'); st.setAttribute('aria-label', (r.stars || 5) + '/5');
      var p = document.createElement('p'); p.className = 'rev__text'; p.textContent = r.text;
      var n = document.createElement('h3'); n.textContent = r.name + (r.city ? ' - ' + r.city : '');
      d.appendChild(st); d.appendChild(p); d.appendChild(n); box.appendChild(d);
    });
    var lead = document.querySelector('[data-i18n="rev.lead"]'); if (lead) lead.removeAttribute('data-i18n'), lead.textContent = lang === 'en' ? 'What our customers say about our work.' : 'ما يقوله عملاؤنا عن أعمالنا.';
  }
  function setLang(l, first) {
    lang = l === 'en' ? 'en' : 'ar';
    var d = T[lang];
    root.lang = lang; root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach(function (el) { var v = d[el.getAttribute('data-i18n')]; if (v != null) el.textContent = v; });
    $$('[data-i18n-aria]').forEach(function (el) { var v = d[el.getAttribute('data-i18n-aria')]; if (v != null) el.setAttribute('aria-label', v); });
    $$('[data-i18n-ph]').forEach(function (el) { var v = d[el.getAttribute('data-i18n-ph')]; if (v != null) el.setAttribute('placeholder', v); });
    $$('[data-i18n-alt]').forEach(function (el) { var v = d[el.getAttribute('data-i18n-alt')]; if (v != null) el.setAttribute('alt', v + (el.closest('.svc,.about__media') ? '' : '')); });
    $$('[data-dammam]').forEach(function (el) { el.textContent = C.dammam[lang]; el.href = C.dammam.mapsLink; });
    renderReviews(lang);
    $$('[data-address]').forEach(function (el) { el.textContent = C.address[lang]; });
    $$('[data-brand-name]').forEach(function (el) { el.textContent = lang === 'ar' ? C.nameAr : C.nameEn; });
    document.title = d['meta.title'];
    var md = $('meta[name=description]'); if (md) md.setAttribute('content', d['meta.desc']);
    $$('meta[property="og:title"]').forEach(function (m) { m.setAttribute('content', d['meta.title']); });
    $$('meta[property="og:description"]').forEach(function (m) { m.setAttribute('content', d['meta.desc']); });
    $$('meta[property="og:locale"]').forEach(function (m) { m.setAttribute('content', lang === 'ar' ? 'ar_SA' : 'en_US'); });
    $$('[data-more]').forEach(function (b) { b.textContent = d[b.getAttribute('aria-expanded') === 'true' ? 'svc.less' : 'svc.more']; });
    var burger = $('#burger'); if (burger) burger.setAttribute('aria-label', d[$('.hdr').classList.contains('is-open') ? 'menu.close' : 'menu.open']);
    var lb = $('#lb'); if (lb && !lb.hidden) showLb(lbIndex);
    splitHero();
    try { localStorage.setItem('qimma-lang', lang); } catch (e) {}
    if (!first) track('language_switch', { language: lang });
  }

  /* ---------- Header / nav ---------- */
  function initHeader() {
    var hdr = $('.hdr'), burger = $('#burger');
    function onScroll() { hdr.classList.toggle('is-solid', window.scrollY > 40); }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    function toggle(open) {
      hdr.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', T[lang][open ? 'menu.close' : 'menu.open']);
      burger.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
    }
    burger.addEventListener('click', function () { toggle(!hdr.classList.contains('is-open')); });
    $$('#nav a').forEach(function (a) { a.addEventListener('click', function () { toggle(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 960) toggle(false); });
    $('#langBtn').addEventListener('click', function () {
      // keep the visitor on the same section after the text reflows
      var cur = null, best = -1e9;
      $$('main section[id]').forEach(function (s) { var t = s.getBoundingClientRect().top - 90; if (t <= 20 && t > best) { best = t; cur = s; } });
      var off = cur ? cur.getBoundingClientRect().top : 0;
      setLang(lang === 'ar' ? 'en' : 'ar');
      if (cur) { var prev = root.style.scrollBehavior; root.style.scrollBehavior = 'auto'; window.scrollBy(0, cur.getBoundingClientRect().top - off); root.style.scrollBehavior = prev; }
    });
    // active link highlight
    var links = $$('#nav a'), map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting && map[e.target.id]) { links.forEach(function (l) { l.classList.remove('is-active'); }); map[e.target.id].classList.add('is-active'); } });
      }, { rootMargin: '-45% 0px -50% 0px' });
      Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    }
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = $$('[data-reveal]');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (e, i) { e.style.transitionDelay = (i % 3) * 80 + 'ms'; io.observe(e); });
  }

  /* ---------- Services: learn more ---------- */
  function initServices() {
    $$('[data-more]').forEach(function (b) {
      b.addEventListener('click', function () {
        var open = b.getAttribute('aria-expanded') !== 'true', p = document.getElementById(b.getAttribute('aria-controls'));
        b.setAttribute('aria-expanded', String(open)); p.hidden = !open;
        b.textContent = T[lang][open ? 'svc.less' : 'svc.more'];
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    $$('.faq__q').forEach(function (b) {
      b.addEventListener('click', function () {
        var item = b.closest('.faq__item'), open = !item.classList.contains('is-open');
        item.classList.toggle('is-open', open); b.setAttribute('aria-expanded', String(open));
      });
    });
  }

  /* ---------- Gallery: filters + lightbox ---------- */
  var lbIndex = 0, lbItems = [], lastFocus = null;
  function visibleItems() { return $$('.gal__item').filter(function (i) { return !i.hidden; }); }
  function showLb(i) {
    lbItems = visibleItems(); if (!lbItems.length) return;
    lbIndex = (i + lbItems.length) % lbItems.length;
    var btn = $('.gal__btn', lbItems[lbIndex]), img = $('img', btn);
    $('#lbImg').src = btn.getAttribute('data-full'); $('#lbImg').alt = img.alt;
    $('#lbCap').textContent = $('figcaption', btn).textContent.trim() + ' — ' + T[lang]['work.badge'];
  }
  function openLb(i) {
    var lb = $('#lb'); lastFocus = document.activeElement; lb.hidden = false; lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; showLb(i); $('[data-lb=close]').focus();
  }
  function closeLb() {
    var lb = $('#lb'); lb.hidden = true; lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function initGallery() {
    $$('.chip[data-filter]').forEach(function (c) {
      c.addEventListener('click', function () {
        var f = c.getAttribute('data-filter');
        $$('.chip[data-filter]').forEach(function (x) { var on = x === c; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', String(on)); });
        $$('.gal__item').forEach(function (it) { it.hidden = !(f === 'all' || it.getAttribute('data-cat') === f); });
      });
    });
    $$('.gal__btn').forEach(function (b) {
      b.addEventListener('click', function () { var v = visibleItems(); openLb(v.indexOf(b.closest('.gal__item'))); });
    });
    $('#lb').addEventListener('click', function (e) {
      var a = e.target.getAttribute && e.target.closest('[data-lb]');
      if (a) { var k = a.getAttribute('data-lb'); if (k === 'close') closeLb(); else showLb(lbIndex + (k === 'next' ? 1 : -1)); }
      else if (e.target === this) closeLb();
    });
    document.addEventListener('keydown', function (e) {
      if ($('#lb').hidden) return;
      var rtl = root.dir === 'rtl';
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowRight') showLb(lbIndex + (rtl ? -1 : 1));
      else if (e.key === 'ArrowLeft') showLb(lbIndex + (rtl ? 1 : -1));
    });
  }

  /* ---------- Contact form -> WhatsApp (no backend, no fake success) ---------- */
  function initForm() {
    var f = $('#waForm'); if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = f.name.value.trim(), phone = f.phone.value.trim(), digits = phone.replace(/[^\d+]/g, '');
      var okName = name.length > 1, okPhone = /^(\+?966|0)?5\d{8}$/.test(digits.replace(/^\+/, '+')) || digits.replace(/\D/g, '').length >= 9;
      f.name.setAttribute('aria-invalid', String(!okName)); f.phone.setAttribute('aria-invalid', String(!okPhone));
      $('.err', f.name.parentNode).hidden = okName; $('.err', f.phone.parentNode).hidden = okPhone;
      if (!okName || !okPhone) { (okName ? f.phone : f.name).focus(); return; }
      var sid = f.service.value, svc = sid === 'general' ? T.ar['form.opt.general'] : serviceNameAr(sid);
      var msg = C.whatsappMessages.form.replace('{service}', svc).replace('{name}', name).replace('{phone}', phone).replace('{message}', f.message.value.trim() || '-');
      track('form_whatsapp_submit', { service: sid });
      window.open(waLink(phoneOf('primary'), msg), '_blank', 'noopener');
    });
    ['name', 'phone'].forEach(function (n) { f[n].addEventListener('input', function () { f[n].setAttribute('aria-invalid', 'false'); $('.err', f[n].parentNode).hidden = true; }); });
  }

  /* ---------- Init ---------- */
  function init() {
    var saved = null; try { saved = localStorage.getItem('qimma-lang'); } catch (e) {}
    var q = /[?&]lang=(ar|en)/.exec(location.search);
    bindBusiness(); initHeader(); initServices(); initFaq(); initGallery(); initForm(); initReveal(); initTracking();
    setLang(q ? q[1] : saved || 'ar', true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
