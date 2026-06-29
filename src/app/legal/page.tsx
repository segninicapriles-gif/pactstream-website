import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal — PactStream",
};

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#0A1420] text-white/80 pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert prose-sm">
        <h1 className="text-3xl font-bold text-white mb-8">Aviso Legal</h1>

        <h2>1. Datos identificativos</h2>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se informa que este sitio web es titularidad de:
        </p>
        <ul>
          <li><strong>Denominación:</strong> PactStream S.L. (en constitución)</li>
          <li><strong>Domicilio social:</strong> Madrid, España</li>
          <li><strong>Correo electrónico:</strong> hello@pactstream.io</li>
          <li><strong>Sitio web:</strong> pactstream.io</li>
        </ul>

        <h2>2. Objeto</h2>
        <p>
          PactStream es una plataforma tecnológica de escrow inteligente para el sector de la construcción. Este sitio web tiene como finalidad informar sobre los servicios de PactStream y permitir el registro en la lista de espera para acceso anticipado.
        </p>

        <h2>3. Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenidos del sitio web (textos, imágenes, diseño gráfico, código fuente, logotipos, marcas, etc.) son propiedad de PactStream S.L. o de sus legítimos titulares y están protegidos por las leyes de propiedad intelectual e industrial vigentes.
        </p>

        <h2>4. Limitación de responsabilidad</h2>
        <p>
          PactStream no garantiza la disponibilidad continua del sitio web y no será responsable de los daños que puedan derivarse de interferencias, omisiones, interrupciones, virus informáticos, averías o desconexiones en el funcionamiento del sistema.
        </p>

        <h2>5. Legislación aplicable y jurisdicción</h2>
        <p>
          La relación entre PactStream y el usuario se rige por la legislación española vigente. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales de Madrid, salvo que la ley establezca otro fuero.
        </p>

        <p className="text-white/40 text-xs mt-12">Última actualización: junio 2026</p>

        <div className="mt-8">
          <a href="/" className="text-[#0D9B84] hover:text-[#0FC9A8] text-sm">← Volver a la página principal</a>
        </div>
      </div>
    </main>
  );
}
