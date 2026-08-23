import Image from "next/image";

/**
 * Emblema "Hito 0 Asegurado".
 *
 * Sello de garantía diseñado por Andrés (ago-2026). Sustituye al icono
 * vectorial que ilustraba la sección: ésta no describe "seguridad" en
 * abstracto, certifica un aval concreto (anticipo del 30% cubierto por una
 * póliza de caución), y un sello comunica respaldo donde un icono solo
 * comunica tema.
 *
 * El maestro a 1600 px vive en `brand/hito0/`. Aquí se sirve un PNG de 512 px:
 * la pieza se pinta como mucho a 176 px, así que 512 cubre @2x y @3x sin
 * reescalar hacia arriba. Pesa ~329 KB — el build es `output: "export"` con
 * `images.unoptimized`, así que Next sirve el fichero tal cual y el peso lo
 * fija este asset, no el framework. Se queda en PNG a color completo a
 * propósito: cuantizar la paleta ahorraba ~70 KB pero abandonaba los degradados
 * del relieve, que son justamente lo que da cuerpo al sello.
 *
 * OJO — el rótulo del anillo está rasterizado en castellano e inglés. La web es
 * trilingüe, así que en `/pt` el sello sigue diciendo "HITO 0 ASEGURADO". Para
 * rotularlo por idioma hay que rehacer la pieza en SVG con <textPath>, no
 * escalar ésta.
 */

type Props = {
  /** Lado del cuadrado en px. */
  size?: number;
  className?: string;
  /** Texto accesible. `null` lo marca decorativo. */
  title?: string | null;
};

export function Hito0Seal({
  size = 176,
  className,
  title = "Hito 0 Asegurado",
}: Props) {
  return (
    <Image
      src="/hito0-seal.png"
      width={size}
      height={size}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      className={className}
    />
  );
}
