import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — PactStream",
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-[#0A1420] text-white/80 pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert prose-sm">
        <h1 className="text-3xl font-bold text-white mb-8">Política de Privacidad</h1>

        <h2>1. Responsable del tratamiento</h2>
        <p>
          PactStream S.L. (en constitución), con domicilio en Madrid, España. Contacto: hello@pactstream.io.
        </p>

        <h2>2. Datos que recopilamos</h2>
        <p>A través de este sitio web recopilamos:</p>
        <ul>
          <li><strong>Correo electrónico:</strong> proporcionado voluntariamente al registrarse en la lista de espera.</li>
          <li><strong>Rol profesional:</strong> promotor, constructor o técnico, seleccionado al registrarse.</li>
          <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas y duración de la visita (mediante cookies analíticas, sujetas a consentimiento).</li>
        </ul>

        <h2>3. Finalidad del tratamiento</h2>
        <ul>
          <li>Gestionar la lista de espera para el acceso anticipado a PactStream.</li>
          <li>Enviar comunicaciones sobre el lanzamiento del producto y novedades relevantes.</li>
          <li>Analizar el uso del sitio web para mejorar la experiencia del usuario.</li>
        </ul>

        <h2>4. Base jurídica</h2>
        <p>
          El tratamiento se basa en el <strong>consentimiento del interesado</strong> (artículo 6.1.a del RGPD), otorgado al enviar el formulario de registro. Para comunicaciones comerciales, se solicitará consentimiento adicional conforme a la LSSI-CE.
        </p>

        <h2>5. Destinatarios</h2>
        <p>
          Los datos se almacenan en servidores de Supabase (infraestructura en la UE). No se ceden datos a terceros salvo obligación legal.
        </p>

        <h2>6. Derechos del interesado</h2>
        <p>
          Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición escribiendo a <a href="mailto:hello@pactstream.io" className="text-[#0D9B84]">hello@pactstream.io</a>. Tienes derecho a presentar reclamación ante la Agencia Española de Protección de Datos (aepd.es).
        </p>

        <h2>7. Conservación</h2>
        <p>
          Los datos se conservarán mientras dure la relación de interés legítimo o hasta que el usuario solicite su supresión.
        </p>

        <h2>8. Seguridad</h2>
        <p>
          Implementamos medidas técnicas y organizativas para proteger tus datos: cifrado en tránsito (TLS), acceso restringido y almacenamiento en infraestructura con certificación SOC 2.
        </p>

        <p className="text-white/40 text-xs mt-12">Última actualización: junio 2026</p>

        <div className="mt-8">
          <a href="/" className="text-[#0D9B84] hover:text-[#0FC9A8] text-sm">← Volver a la página principal</a>
        </div>
      </div>
    </main>
  );
}
