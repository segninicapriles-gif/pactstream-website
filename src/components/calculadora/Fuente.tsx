// Pastilla de procedencia. Ninguna cifra de esta página aparece sin una.
// Es lo que separa esta calculadora de las del sector.

export function Fuente({ texto }: { texto: string }) {
  return (
    <span className="mt-1 block font-mono text-[11px] leading-tight text-[var(--color-ps-neutral-600)]">
      Fuente: {texto}
    </span>
  )
}
