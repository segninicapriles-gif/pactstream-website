'use client'

import { useEffect, useRef, useState } from 'react'
import { Formulario, DATOS_INICIALES, usaFichaRES022, type DatosFormulario } from './Formulario'
import { Resultado } from './Resultado'
import { Captacion } from './Captacion'
import { AvisoPeriodoTransitorio } from './AvisoPeriodoTransitorio'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function Calculadora() {
  const [datos, setDatos] = useState<DatosFormulario>(DATOS_INICIALES)

  // Se mide la tecnología elegida: responde cuál es el segmento real,
  // que es una de las dudas abiertas del análisis estratégico.
  //
  // El efecto depende SOLO de la tecnología, no del valor del consumo: si
  // dependiera de `datos.cefCalefaccion`, cada dígito tecleado en ese campo
  // disparaba un evento idéntico (teclear "20000" mandaba cinco eventos). Lo
  // que interesa es si hay consumo o no (`!= null`), leído en el momento en
  // que la tecnología cambia, no cada pulsación. Tampoco se mide el montaje
  // inicial: interesa la elección, no la visita.
  const esPrimerRenderizado = useRef(true)
  useEffect(() => {
    if (esPrimerRenderizado.current) {
      esPrimerRenderizado.current = false
      return
    }
    window.gtag?.('event', 'calculadora_tecnologia', {
      tecnologia: datos.tecnologia,
      tiene_cef: datos.cefCalefaccion != null,
    })
  }, [datos.tecnologia])

  // El aviso del periodo transitorio es de la RES022 y solo de ella. Vivía en
  // la cabecera de la página, así que salía también con aerotermia o
  // fotovoltaica: no era falso —lleva su etiqueta— pero es ruido para quien no
  // viene a buhardillas. Al vivir aquí sigue apareciendo en el HTML servido,
  // porque la tecnología inicial ES buhardilla: no se pierde ni para los
  // buscadores ni para quien no ejecuta JavaScript.
  return (
    <>
      {usaFichaRES022(datos.tecnologia) && <AvisoPeriodoTransitorio />}

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
    </>
  )
}
