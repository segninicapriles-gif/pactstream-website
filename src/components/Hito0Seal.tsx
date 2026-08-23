"use client";

import { useId } from "react";

/**
 * Emblema «Hito 0 Asegurado».
 *
 * Pieza híbrida, y a propósito: el medallón es **el render original de Andrés**
 * (aros, escudo, «0» y check, con su relieve), y solo el rótulo del aro es
 * vectorial. Se hizo así porque hacía falta traducir el rótulo — con el texto
 * rasterizado, `/pt` mostraba «HITO 0 ASEGURADO» aunque el copy de esa página
 * dice «Marco 0 Assegurado».
 *
 * ⚠️ Se intentó primero redibujar el sello entero en SVG y **no dio la talla**:
 * el escudo con relieve no se iguala con paths planos. No repetir ese camino.
 * El reparto correcto es este: lo pictórico se queda en el render, lo que tiene
 * que cambiar por idioma se vuelve texto.
 *
 * `/hito0-seal-base.png` es el render con la banda del rótulo borrada. El fondo
 * de esa banda se reconstruyó con un ajuste de la iluminación en base de
 * Fourier sobre θ (periódica: un polinomio dejaría costura al cerrar el aro).
 * Si algún día hay que regenerarlo, el maestro está en `brand/hito0/`.
 *
 * Los ids llevan `useId()` porque el sello puede pintarse más de una vez en la
 * misma página: con ids fijos, la segunda instancia robaría los del DOM.
 */

type Props = {
  /** Lado del cuadrado en px. */
  size?: number;
  /** Rótulo del arco superior, en el idioma de la página. */
  top?: string;
  /** Rótulo del arco inferior, en la otra lengua. */
  bottom?: string;
  className?: string;
  /** Texto accesible. `null` lo marca decorativo. */
  title?: string | null;
};

/* Arco reservado a cada rótulo, en unidades del viewBox (200 = diámetro).
   Medidos sobre el render original: el texto de arriba ocupaba 139° a radio 72
   y el de abajo 153° a radio 84. Fijarlos con `textLength` es lo que mantiene
   el sello idéntico en los tres idiomas, aunque las cadenas midan distinto. */
const TOP_ARC = 192;
const BOTTOM_ARC = 224;

export function Hito0Seal({
  size = 176,
  top = "HITO 0 ASEGURADO",
  bottom = "MILESTONE 0 SECURED",
  className,
  title = "Hito 0 Asegurado",
}: Props) {
  const uid = useId();
  const arcTop = `${uid}-top`;
  const arcBottom = `${uid}-bottom`;

  /* Cada línea se pinta dos veces: una copia oscura desplazada que hace de
     sombra del relieve, y la blanca encima. Se evita `<filter>` a propósito:
     los filtros SVG se rasterizan a resolución fija y en pantallas @3x se ven
     blandos, justo lo que se venía a arreglar. */
  const line = (href: string, text: string, len: number) => {
    const run = (
      <textPath href={`#${href}`} startOffset="50%" textLength={len} lengthAdjust="spacing">
        {text}
      </textPath>
    );
    return (
      <>
        {/* sombra proyectada */}
        <text fill="#06182F" opacity="0.55" transform="translate(0.9 1.3)">
          {run}
        </text>
        {/* filo iluminado arriba-izquierda: es lo que hace que la letra
            parezca tallada y no pegada encima */}
        <text fill="#FFFFFF" opacity="0.9" transform="translate(-0.4 -0.5)">
          {run}
        </text>
        {/* filete del mismo color: la fuente original del render es algo más
            gruesa que Hanken 800, y esto cierra la diferencia de peso */}
        <text fill="#EDF1FB" stroke="#EDF1FB" strokeWidth={0.3}>
          {run}
        </text>
      </>
    );
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        {/* El arco de arriba gira en sentido horario (sweep 1): las letras
            quedan con la cabeza hacia fuera. El de abajo gira al revés
            (sweep 0) para leerse de izquierda a derecha con la cabeza hacia el
            centro — la convención de sello. Con el mismo flag saldría del revés. */}
        <path id={arcTop} d="M 28 100 A 72 72 0 0 1 172 100" fill="none" />
        <path id={arcBottom} d="M 16 100 A 84 84 0 0 0 184 100" fill="none" />
      </defs>

      <image href="/hito0-seal-base.png" x="0" y="0" width="200" height="200" />

      <g
        fontFamily="var(--font-sans), 'Hanken Grotesk', system-ui, sans-serif"
        fontWeight={800}
        fontSize={16.6}
        textAnchor="middle"
      >
        {line(arcTop, top, TOP_ARC)}
        {line(arcBottom, bottom, BOTTOM_ARC)}
      </g>
    </svg>
  );
}
