'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'
import type { DatosFormulario } from './Formulario'
import { usaFichaRES022 } from './Formulario'

const DESTINO = 'hola@pactstream.io'

export function Captacion({ datos }: { datos: DatosFormulario }) {
  const [correo, setCorreo] = useState('')

  const cuerpo = [
    'Quiero el desglose de este cálculo.',
    '',
    `Tecnología: ${datos.tecnologia}`,
    ...(usaFichaRES022(datos.tecnologia) ? [
      `Zona climática: ${datos.zona}`,
      `Superficie: ${datos.superficieM2} m2`,
    ] : []),
    `Importe de obra: ${datos.importeObra} EUR`,
    `Consumo del certificado previo: ${datos.cefCalefaccion ?? 'no lo tengo'}`,
    '',
    `Mi correo: ${correo}`,
  ].join('\n')

  const enlace =
    `mailto:${DESTINO}` +
    `?subject=${encodeURIComponent('Desglose del cálculo de CAE')}` +
    `&body=${encodeURIComponent(cuerpo)}`

  return (
    <div className="mt-4 rounded-[var(--radius-lg)] bg-[var(--color-navy-vault)] p-5">
      <h3 className="font-display text-lg font-bold text-white">
        ¿Te mandamos el desglose?
      </h3>
      <p className="mt-1 text-sm text-[var(--color-ps-navy-200)]">
        Con los números de este cálculo y lo que hace falta para que el expediente no
        se caiga. Sin registro y sin compromiso.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          inputMode="email"
          placeholder="tu@correo.com"
          aria-label="Tu correo electrónico"
          className="w-full rounded-[var(--radius-sm)] border border-[var(--color-ps-navy-400)] bg-white px-3 py-2 font-mono text-sm text-[var(--color-navy-vault)] focus:border-[var(--color-cyan-glow)] focus:outline-none"
          value={correo}
          onChange={(ev) => setCorreo(ev.target.value)}
        />
        <a
          href={enlace}
          onClick={() => track('calculadora_correo', { tecnologia: datos.tecnologia })}
          className="shrink-0 rounded-[var(--radius-sm)] bg-[var(--color-primary)] px-4 py-2 text-center text-sm font-medium text-white hover:opacity-90"
        >
          Enviar
        </a>
      </div>
    </div>
  )
}
