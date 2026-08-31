/* Analítica propia del ecosistema Cimbrium — sin cookies, sin PII.
   Registra una fila por visita: host, ruta, procedencia, idioma y ancho.
   NO guarda IP, cookie ni identificador de persona → no requiere banner de consentimiento.
   Se sirve desde cada web; escribe en la tabla `visitas` (anon solo INSERT, RLS).

   Uso:  <script defer src="/assets/visitas.js"></script>

   Además expone  window.cimbriumEvento('nombre')  → escribe una fila con
   path='/evento/nombre'. Sirve para medir clics de CTA con la MISMA tabla y sin
   infraestructura nueva. Sin esto solo se ven altas: no se puede distinguir
   «nadie pulsa el botón» de «pulsan y abandonan el formulario», que piden
   arreglos opuestos.  Consulta:
     select path, count(*) from visitas where path like '/evento/%' group by 1;

   ⚠️ Fichero IDÉNTICO en las 4 webs. Al tocarlo, copiarlo a las cuatro rutas
   (ver la nota de memoria `analitica-visitas-canario`).                        */
(function () {
  var URL = 'https://tkncogzzlzbfhsfqlnsw.supabase.co/rest/v1/visitas';
  var KEY = 'sb_publishable_HjRkq_yRX4NzO2s7hGNLSQ_AXT-51VR';

  function permitido() {
    if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return false;
    var h = location.hostname;
    return !(h === 'localhost' || h === '127.0.0.1' || /\.vercel\.app$/.test(h));
  }

  function enviar(path) {
    try {
      if (!permitido()) return;
      var ref = document.referrer || null;
      if (ref && ref.indexOf(location.origin) === 0) ref = null;  // navegación interna

      fetch(URL, {
        method: 'POST',
        headers: {
          apikey: KEY,
          Authorization: 'Bearer ' + KEY,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({
          host: location.hostname,
          path: path.slice(0, 300),
          referrer: ref ? ref.slice(0, 300) : null,
          lang: (navigator.language || '').slice(0, 12) || null,
          ancho: window.innerWidth || null
        }),
        keepalive: true   // sobrevive a la navegación que dispara el propio clic
      }).catch(function () { /* la analítica jamás rompe la página */ });
    } catch (e) { /* idem */ }
  }

  window.cimbriumEvento = function (nombre) {
    enviar('/evento/' + String(nombre || 'sin-nombre').slice(0, 60));
  };

  enviar(location.pathname);
})();
