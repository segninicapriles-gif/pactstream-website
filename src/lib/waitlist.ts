/**
 * Alta en la lista de espera — única implementación del sitio.
 *
 * Antes vivía dentro de `SiteContent.tsx` sin exportar, así que cualquier otro
 * componente que quisiera captar tenía que duplicarla (o, como hacía la
 * calculadora de días de caja, renunciar a captar y mandar al visitante de
 * vuelta a la home).
 *
 * Escribe en la tabla `waitlist` de Supabase, que tiene RLS activada y una
 * única política: `anon` solo INSERT, con validación del email en WITH CHECK.
 * La clave es publishable por diseño — no puede leer nada, solo insertar.
 *
 * `source` es lo que permite segmentar después: qué página y qué idioma trajo
 * cada lead. Pásalo siempre; el valor por defecto es solo una red de seguridad.
 */

const SUPABASE_URL = "https://tkncogzzlzbfhsfqlnsw.supabase.co";

// ⚠️ 30-ago-2026: la clave que traía SiteContent.tsx (`sb_publishable_9Td5AI…`)
// devolvía 401 contra este proyecto — comprobado enviando la misma fila con
// ambas claves: 401 con aquella, 201 con esta. Es decir, los formularios de la
// home de pactstream.io llevaban meses fallando en silencio para el visitante,
// que solo veía el mensaje genérico de error.
// Esta es la clave que ya usaban /fundador, CostPact y el presupuesto de
// muestra, y es la única válida. Al haber una sola copia en el sitio, un fallo
// así vuelve a ser imposible de tener «a medias».
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_HjRkq_yRX4NzO2s7hGNLSQ_AXT-51VR";

export async function insertWaitlist(
  email: string,
  role?: string,
  source = "website",
): Promise<void> {
  try {
    await insertarFila(email, role, source);
    medirAlta(true, role, source);
  } catch (err) {
    medirAlta(false, role, source);
    throw err;
  }
}

async function insertarFila(email: string, role: string | undefined, source: string): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ email, role: role || null, source }),
  });
  // 409 = ya estaba apuntado. Para el visitante eso es un éxito, no un fallo:
  // ya está en la lista y volver a decírselo como error solo confunde.
  if (!res.ok && res.status !== 409) throw new Error("Error al registrar");
}

/**
 * Medición del alta (PostHog, NG-67). Inerte mientras analitica.js lleve el
 * marcador de clave. NUNCA recibe ni envía el email: solo el perfil (si es un
 * valor corto, no el texto libre de la calculadora) y el `source` de la página.
 */
export function medirAlta(ok: boolean, role?: string, source?: string): void {
  try {
    const perfil = role && role.length <= 40 ? role : undefined;
    (window as any).pactstreamAnalitica?.(
      ok ? "waitlist_submit_success" : "waitlist_submit_error",
      { perfil, origen: source },
    );
  } catch {
    /* la analítica jamás rompe el formulario */
  }
}
