/* captura.js - modulo unico de captacion de leads del ecosistema Cimbrium.
 *
 * Una sola implementacion para todas las paginas estaticas de public/.
 * Antes cada pagina llevaba su propia copia del script; cualquier arreglo
 * habia que aplicarlo tantas veces como paginas. Aqui se arregla una vez.
 *
 * Uso en la pagina:
 *   <form data-captura
 *         data-source="fundador-es"
 *         data-sending="Enviando..."
 *         data-ok="Recibido, {nombre}. Te escribimos en breve."
 *         data-err="No se ha podido enviar. Escribenos a hola@cimbrium.com.">
 *     <input name="nombre"> <input name="empresa">
 *     <input name="email" type="email"> <select name="rol">...</select>
 *     <button type="submit">Enviar</button>
 *   </form>
 *   <script src="/assets/captura.js" defer></script>
 *
 * data-source es OBLIGATORIO: es lo que permite segmentar el drip por pagina
 * e idioma. Sin el, todos los leads llegan indistinguibles.
 *
 * Escribe en la tabla `waitlist` (RLS activada, politica anon solo INSERT con
 * validacion de email en WITH CHECK). La clave es publishable por diseno: no
 * puede leer nada, solo insertar.
 */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://tkncogzzlzbfhsfqlnsw.supabase.co';
  var SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_HjRkq_yRX4NzO2s7hGNLSQ_AXT-51VR';
  var ENDPOINT = SUPABASE_URL + '/rest/v1/waitlist';

  function val(form, name) {
    var el = form.querySelector('[name="' + name + '"]');
    return el ? String(el.value || '').trim() : '';
  }

  function attach(form) {
    var source = form.getAttribute('data-source');
    if (!source) {
      // Fallar ruidosamente en consola: un formulario sin source produce
      // leads que luego no se pueden atribuir, y eso no se nota hasta tarde.
      console.error('[captura] falta data-source en el formulario; no se activa.');
      return;
    }

    var btn = form.querySelector('button[type="submit"], button:not([type])');
    var errBox = form.querySelector('[data-captura-error]');
    var textoBoton = btn ? btn.textContent : '';

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (btn) { btn.disabled = true; btn.textContent = form.getAttribute('data-sending') || 'Enviando...'; }
      if (errBox) errBox.hidden = true;

      var nombre = val(form, 'nombre');
      var empresa = val(form, 'empresa');
      var email = val(form, 'email');
      var rol = val(form, 'rol');

      // `role` es texto libre en la tabla; se compone para que el equipo vea
      // de un vistazo origen, perfil y empresa sin cruzar con otra fuente.
      var role = [source, rol, nombre + (empresa ? ' (' + empresa + ')' : '')]
        .filter(Boolean).join(' - ');

      try {
        var res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_PUBLISHABLE_KEY,
            Authorization: 'Bearer ' + SUPABASE_PUBLISHABLE_KEY,
            Prefer: 'return=minimal'
          },
          body: JSON.stringify({ email: email, role: role, source: source })
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);

        // Aqui no se emite ningun evento de analitica, y es deliberado: GA4 se
        // retiro del sitio el 30-ago-2026 (sin banner de consentimiento nunca
        // llego a registrar nada) y estas paginas estaticas quedan fuera del
        // arbol de Next, asi que tampoco cargan Vercel Analytics.
        //
        // El registro de la conversion es la fila que se acaba de insertar en
        // `waitlist`, con su `source` y su `created_at`: sin cookies, sin
        // consentimiento y sin depender de que el visitante acepte nada.
        exito(form, nombre);
      } catch (err) {
        if (btn) { btn.disabled = false; btn.textContent = textoBoton; }
        if (errBox) errBox.hidden = false;
        console.error('[captura] envio fallido:', err);
      }
    });
  }

  function exito(form, nombre) {
    var plantilla = form.getAttribute('data-ok') || 'Recibido. Te escribimos en breve.';
    var caja = document.createElement('div');
    caja.className = 'ok';
    // textContent, NO innerHTML: el nombre lo escribe el visitante y meterlo
    // como HTML seria una via de inyeccion.
    caja.textContent = plantilla.replace('{nombre}', nombre);
    var contenedor = form.closest('[data-captura-card]') || form;
    contenedor.replaceChildren(caja);
  }

  function init() {
    var forms = document.querySelectorAll('form[data-captura]');
    for (var i = 0; i < forms.length; i++) attach(forms[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
