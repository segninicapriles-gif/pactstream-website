'use client'

import { useEffect, useState } from 'react'
import { Formulario, DATOS_INICIALES, type DatosFormulario } from './Formulario'
import { Resultado } from './Resultado'
import { Captacion } from './Captacion'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function Calculadora() {
  const [datos, setDatos] = useState<DatosFormulario>(DATOS_INICIALES)

  // Se mide la tecnología elegida: responde cuál es el segmento real,
  // que es una de las dudas abiertas del análisis estratégico.
  useEffect(() => {
    window.gtag?.('event', 'calculadora_tecnologia', {
      tecnologia: datos.tecnologia,
      tiene_cef: datos.cefCalefaccion != null,
    })
  }, [datos.tecnologia, datos.cefCalefaccion])

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
      <section aria-label="Datos de la actuación">
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-ps-neutral-400)] bg-white p-5 shadow-[var(--shadow-ps-sm)]">
          <Formulario datos={datos} onChange={setDatos} />
        </div>
      </section>

      <section aria-label="Resultado">
        <Resultado datos={datos} />
        <Captacion datos={datos} />
      </section>
    </div>
  )
}
