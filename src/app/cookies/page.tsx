import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies — PactStream",
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[#0A1420] text-white/80 pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert prose-sm">
        <h1 className="text-3xl font-bold text-white mb-8">Política de Cookies</h1>

        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Permiten recordar tus preferencias y analizar cómo usas el sitio.
        </p>

        <h2>2. Cookies que utilizamos</h2>
        <table>
          <thead>
            <tr>
              <th>Cookie</th>
              <th>Tipo</th>
              <th>Finalidad</th>
              <th>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Técnicas</td>
              <td>Necesaria</td>
              <td>Funcionamiento del sitio web</td>
              <td>Sesión</td>
            </tr>
            <tr>
              <td>Analíticas</td>
              <td>Rendimiento</td>
              <td>Análisis de uso (futuro)</td>
              <td>12 meses</td>
            </tr>
          </tbody>
        </table>

        <h2>3. Cookies de terceros</h2>
        <p>
          Actualmente no utilizamos cookies de terceros ni herramientas de análisis externas. En caso de incorporarlas en el futuro, actualizaremos esta política y solicitaremos tu consentimiento previo.
        </p>

        <h2>4. Gestión de cookies</h2>
        <p>
          Puedes configurar tu navegador para rechazar o eliminar cookies. Ten en cuenta que desactivar las cookies técnicas puede afectar al funcionamiento del sitio.
        </p>

        <h2>5. Más información</h2>
        <p>
          Para más información sobre cómo tratamos tus datos, consulta nuestra <a href="/privacidad" className="text-[#0D9B84]">Política de Privacidad</a>.
        </p>

        <p className="text-white/40 text-xs mt-12">Última actualización: junio 2026</p>

        <div className="mt-8">
          <a href="/" className="text-[#0D9B84] hover:text-[#0FC9A8] text-sm">← Volver a la página principal</a>
        </div>
      </div>
    </main>
  );
}
