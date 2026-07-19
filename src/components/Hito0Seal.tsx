/**
 * Emblema "Hito 0 Asegurado".
 *
 * Sustituye al icono genérico (Shield de lucide) que ilustraba la sección.
 * El arquetipo es un SELLO DE GARANTÍA, no un icono: la sección no describe
 * "seguridad" en abstracto, certifica un aval concreto (póliza de caución sobre
 * el 30% de anticipo). Un sello comunica respaldo; un icono solo tema.
 *
 * Geometría hexagonal a propósito: el onboarding de la app Flutter ya usa un
 * escudo hexagonal, así que el emblema hereda un lenguaje que el ecosistema ya
 * tiene en vez de inventar uno nuevo.
 *
 * Todo son formas puras (sin <text>): no depende de que cargue ninguna fuente,
 * y escala igual de bien a 24px que a 160px.
 */

type Props = {
  /** Lado del cuadrado en px. El trazo escala con él. */
  size?: number
  /** Color principal del sello. */
  accent?: string
  /** Relleno interior (tinte suave). */
  tint?: string
  /** Color del check de validación. */
  check?: string
  className?: string
  /** Texto accesible. `null` lo marca decorativo. */
  title?: string | null
}

export function Hito0Seal({
  size = 96,
  accent = '#0B6E5F',
  tint = '#E6F5F2',
  check = '#00A37A',
  className,
  title = 'Hito 0 Asegurado',
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
    >
      {/* Escudo hexagonal — cuerpo del sello */}
      <path
        d="M32 4.5 L55.4 17.75 L55.4 44.25 L32 57.5 L8.6 44.25 L8.6 17.75 Z"
        fill={tint}
        stroke={accent}
        strokeWidth={2.6}
        strokeLinejoin="round"
      />

      {/* Muescas del sello: 6 marcas cortas en los vértices, el gesto que
          distingue un sello de garantía de un escudo cualquiera. */}
      <g stroke={accent} strokeWidth={2} strokeLinecap="round" opacity={0.45}>
        <path d="M32 9.6 v3.4" />
        <path d="M50.9 20.6 l-2.9 1.7" />
        <path d="M50.9 41.4 l-2.9 -1.7" />
        <path d="M32 52.4 v-3.4" />
        <path d="M13.1 41.4 l2.9 -1.7" />
        <path d="M13.1 20.6 l2.9 1.7" />
      </g>

      {/* El "0" del hito — anillo, no tipografía */}
      <ellipse
        cx="32"
        cy="30.5"
        rx="8.4"
        ry="11.4"
        stroke={accent}
        strokeWidth={5}
        fill="none"
      />

      {/* Check de validación, superpuesto abajo-derecha */}
      <circle cx="47.5" cy="46.5" r="9.5" fill={check} stroke="#FFFFFF" strokeWidth={2.4} />
      <path
        d="M43.2 46.6 l3 3.1 l5.9 -6.4"
        stroke="#FFFFFF"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
