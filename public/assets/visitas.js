/* Analítica propia del ecosistema Cimbrium — sin cookies, sin PII.
   Registra una fila por visita: host, ruta, procedencia, idioma y ancho.
   NO guarda IP, cookie ni identificador de persona → no requiere banner de consentimiento.
   Se sirve desde cada web; escribe en la tabla `visitas` (anon solo INSERT, RLS).
   Uso:  <script defer src="/assets/visitas.js"></script>          */
(function () {
  try {
    if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;
    var h = location.hostname;
    if (h === 'localhost' || h === '127.0.0.1' || /\.vercel\.app$/.test(h)) return;

    var ref = document.referrer || null;
    if (ref && ref.indexOf(location.origin) === 0) ref = null;  // navegación interna

    var cuerpo = {
      host: h,
      path: location.pathname.slice(0, 300),
      referrer: ref ? ref.slice(0, 300) : null,
      lang: (navigator.language || '').slice(0, 12) || null,
      ancho: window.innerWidth || null
    };

    var url = 'https://tkncogzzlzbfhsfqlnsw.supabase.co/rest/v1/visitas';
    var key = 'sb_publishable_HjRkq_yRX4NzO2s7hGNLSQ_AXT-51VR';

    fetch(url, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: 'Bearer ' + key,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(cuerpo),
      keepalive: true
    }).catch(function () { /* la analítica jamás rompe la página */ });
  } catch (e) { /* idem */ }
})();
