/* PactStream · medición del embudo con PostHog (NG-67)
   INERTE mientras POSTHOG_KEY sea el marcador: no carga nada ni pide nada a PostHog.
   Para activarlo, sustituir '__POSTHOG_KEY__' por la clave de proyecto (phc_…; pública por diseño).
   Misma clave que cimbrium.com (mismo proyecto PostHog); se distinguen por la propiedad site.

   Sin banner (RGPD): persistence 'memory' (ni cookies ni localStorage), sin grabación de sesión,
   sin autocaptura, respeta Do Not Track. Nunca se envía email ni datos personales.

   Eventos (nombres estables):
     $pageview                  → automático
     waitlist_submit_success    → {perfil?, origen, lang, site}  (lo llama src/lib/waitlist.ts)
     waitlist_submit_error      → {perfil?, origen, lang, site}
   Propiedad común: site = 'pactstream'. El origen desde cimbrium.com llega en utm_source=cimbrium.
*/
(function () {
  var POSTHOG_KEY = 'phc_m2ZMAr4Qq6a3Uf3PdQsnJBB4MFg9r4ZF587mMCrVKptw';
  var HOST = 'https://eu.i.posthog.com';

  var m = (location.pathname || '/').match(/^\/(en|pt)(\/|$)/);
  var lang = m ? m[1] : (document.documentElement.lang || 'es').slice(0, 2);
  if (['es', 'en', 'pt'].indexOf(lang) < 0) lang = 'es';

  // API pública para los formularios; siempre existe y nunca rompe la página.
  window.pactstreamAnalitica = function () {};
  if (!POSTHOG_KEY || POSTHOG_KEY.indexOf('__') === 0) return;

  /* Snippet oficial de posthog-js (carga asíncrona y cola de llamadas previas a la carga) */
  !function (t, e) {
    var o, n, p, r;
    e.__SV || (window.posthog = e, e._i = [], e.init = function (i, s, a) {
      function g(t, e) { var o = e.split('.'); 2 == o.length && (t = t[o[0]], e = o[1]), t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); }; }
      (p = t.createElement('script')).type = 'text/javascript', p.crossOrigin = 'anonymous', p.async = !0,
        p.src = s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js',
        (r = t.getElementsByTagName('script')[0]).parentNode.insertBefore(p, r);
      var u = e;
      for (void 0 !== a ? u = e[a] = [] : a = 'posthog', u.people = u.people || [], u.toString = function (t) { var e = 'posthog'; return 'posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e; }, u.people.toString = function () { return u.toString(1) + '.people (stub)'; },
        o = 'init capture register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group identify setPersonProperties'.split(' '), n = 0; n < o.length; n++) g(u, o[n]);
      e._i.push([i, s, a]);
    }, e.__SV = 1);
  }(document, window.posthog || []);

  window.posthog.init(POSTHOG_KEY, {
    api_host: HOST,
    persistence: 'memory',
    capture_dead_clicks: false,
    capture_performance: false,
    capture_heatmaps: false,
    disable_session_recording: true,
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: false,
    respect_dnt: true,
    disable_surveys: true,
    ip: false,
    person_profiles: 'never'
  });
  window.posthog.register({ site: 'pactstream' });

  window.pactstreamAnalitica = function (nombre, props) {
    try {
      var p = { lang: lang, site: 'pactstream' };
      for (var k in (props || {})) p[k] = props[k];
      window.posthog.capture(nombre, p);
    } catch (e) { /* la analítica jamás rompe la página */ }
  };
})();
