'use client'

// Aviso del periodo transitorio de la ficha RES022.
//
// Qué dice el BOE, literalmente: la resolución abre "un periodo transitorio de
// tres meses, a contar desde el día siguiente al de la publicación", durante el
// cual se puede certificar "conforme a los criterios y metodología recogidos en
// la ficha modificada, siempre y cuando el solicitante pueda demostrar que en la
// fecha de la modificación ya se había iniciado la ejecución de la actuación".
//
// Por tanto NO es que el CAE caduque el 7 de septiembre, y decirlo así sería
// fabricar una urgencia. Lo que vence es la posibilidad de acogerse a los
// criterios anteriores para una obra ya empezada.
//
// La cuenta de días se calcula solo tras montar: en la exportación estática el
// HTML se genera en el build, así que un número calculado en servidor quedaría
// congelado en la fecha de compilación y mentiría a los pocos días. El texto sin
// cuenta sí va en el HTML servido, que es lo que lee un buscador y lo que ve
// quien no ejecuta JavaScript.

import { useEffect, useState } from 'react'
import { FICHA_RES022 } from '@/lib/cae/fichas'

const FIN = FICHA_RES022.finPeriodoTransitorio // '2026-09-07'
const FIN_LEGIBLE = '7 de septiembre de 2026'

export function AvisoPeriodoTransitorio() {
  const [dias, setDias] = useState<number | null>(null)

  useEffect(() => {
    // Fin del día en curso: el plazo se agota al terminar el 7 de septiembre.
    const fin = new Date(`${FIN}T23:59:59`).getTime()
    setDias(Math.ceil((fin - Date.now()) / 86_400_000))
  }, [])

  const vencido = dias !== null && dias <= 0

  return (
    <div className="mt-6 rounded-[var(--radius-md)] border border-[var(--color-primary)]/25 bg-[var(--color-primary)]/5 px-4 py-3">
      <p className="text-sm font-medium text-[var(--color-navy-vault)]">
        {vencido ? (
          <>
            El periodo transitorio de la ficha RES022 terminó el{' '}
            <span className="font-mono">{FIN_LEGIBLE}</span>.
          </>
        ) : (
          <>
            Periodo transitorio de la ficha RES022: hasta el{' '}
            <span className="font-mono">{FIN_LEGIBLE}</span>
            {dias !== null && (
              <>
                {' '}
                — quedan <span className="font-mono">{dias}</span>{' '}
                {dias === 1 ? 'día' : 'días'}
              </>
            )}
            .
          </>
        )}
      </p>
      <p className="mt-1 text-sm text-[var(--color-ps-navy-400)]">
        {vencido
          ? 'Todo expediente va ya bajo la RES022: informe fotográfico desde el mismo ángulo con elementos estructurales visibles, empresa inscrita en el REA con código de verificación, y el ahorro topado contra el certificado energético previo.'
          : 'Hasta esa fecha, una actuación de buhardilla todavía puede certificarse con los criterios de la ficha anterior, siempre que se pueda demostrar que la ejecución ya había empezado el 6 de junio de 2026. Después, todo expediente va bajo la RES022: informe fotográfico desde el mismo ángulo con elementos estructurales visibles, empresa inscrita en el REA con código de verificación, y el ahorro topado contra el certificado energético previo.'}
      </p>
      <span className="mt-1 block font-mono text-[11px] leading-tight text-[var(--color-ps-navy-300)]">
        Fuente: BOE-A-2026-12283, disposición segunda
      </span>
    </div>
  )
}
