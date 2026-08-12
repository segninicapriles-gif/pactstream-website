import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones — PactStream",
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-[#0A1420] text-white/80 pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert prose-sm">
        <h1 className="text-3xl font-bold text-white mb-8">Términos y Condiciones</h1>

        <h2>1. Titular y objeto</h2>
        <p>
          Los presentes Términos y Condiciones regulan el acceso y uso de la plataforma PactStream, titularidad de <strong>PactStream S.L. (en constitución)</strong>, con domicilio en Madrid, España, y correo de contacto hello@pactstream.io.
        </p>
        <p>
          El registro en la plataforma y la creación de una cuenta implican la aceptación plena de estos Términos. Si no está de acuerdo con ellos, no debe utilizar el servicio.
        </p>

        <h2>2. Qué es PactStream y qué no es</h2>
        <p>
          PactStream es una plataforma tecnológica de custodia y validación de pagos por hitos para obras de construcción y reforma. Su función es retener el importe de cada hito hasta que se cumplan las condiciones de liberación pactadas entre las partes.
        </p>
        <p>
          <strong>PactStream no es parte del contrato de obra.</strong> No ejecuta obra, no dirige la ejecución, no supervisa la calidad constructiva ni asume la posición de promotor, constructor o dirección facultativa. El contrato de obra se celebra exclusivamente entre las partes que lo suscriben.
        </p>
        <p>
          PactStream no es una entidad de crédito ni presta servicios bancarios o de inversión. Los importes en custodia no constituyen depósitos bancarios ni devengan intereses a favor del usuario.
        </p>

        <h2>3. Usuarios y roles</h2>
        <p>
          El servicio está dirigido a profesionales y particulares mayores de edad con capacidad legal para contratar. La plataforma contempla los siguientes roles:
        </p>
        <ul>
          <li><strong>Promotor:</strong> quien encarga y financia la obra.</li>
          <li><strong>Constructor:</strong> quien la ejecuta y aporta las evidencias de avance.</li>
          <li><strong>Arquitecto técnico o dirección facultativa:</strong> quien valida técnicamente los hitos en obra mayor.</li>
        </ul>

        <h2>4. Registro y cuenta</h2>
        <p>
          El usuario se compromete a facilitar información veraz, completa y actualizada, y a mantener la confidencialidad de sus credenciales. Es responsable de toda actividad realizada desde su cuenta. Determinadas funcionalidades requieren superar un proceso de verificación de identidad (KYC) exigido por la normativa de prevención de blanqueo de capitales.
        </p>

        <h2>5. Funcionamiento del servicio</h2>
        <p>
          El presupuesto de cada obra se divide en hitos secuenciales. El promotor deposita el importe correspondiente a cada hito en una cuenta de custodia gestionada por PactStream, donde permanece bloqueado hasta su liberación.
        </p>
        <p>
          La validación de cada hito depende del tipo de obra:
        </p>
        <ul>
          <li><strong>Obra mayor:</strong> el arquitecto técnico valida el hito tras revisar las evidencias aportadas por el constructor. Validado técnicamente, el promotor dispone de un plazo de objeción de 48 horas hábiles; transcurrido sin objeción, el hito se considera aprobado tácitamente y se libera el pago.</li>
          <li><strong>Obra menor:</strong> el promotor valida directamente cada hito tras revisar las evidencias. El promotor declara que la obra no afecta a la estructura del inmueble ni requiere licencia de obra mayor, y asume la responsabilidad de dicha declaración.</li>
        </ul>
        <p>
          Las condiciones concretas de cada obra —hitos, importes, plazos y comisión aplicable— se fijan en el contrato que las partes firman electrónicamente en la plataforma y prevalecen sobre cualquier descripción general contenida en estos Términos.
        </p>

        <h2>6. Comisiones</h2>
        <p>
          PactStream percibe una comisión sobre cada hito liberado, detraída en el momento del pago. El porcentaje aplicable se muestra antes de la firma del contrato y queda recogido en él. No se aplican comisiones no informadas previamente.
        </p>

        <h2>7. Obligaciones del usuario</h2>
        <ul>
          <li>Utilizar la plataforma conforme a la ley, la buena fe y estos Términos.</li>
          <li>No aportar evidencias falsas, manipuladas o correspondientes a trabajos no ejecutados.</li>
          <li>No utilizar el servicio para operaciones ajenas a una obra real ni con fines de blanqueo de capitales o financiación del terrorismo.</li>
          <li>No intentar acceder a cuentas ajenas ni alterar el funcionamiento técnico de la plataforma.</li>
        </ul>

        <h2>8. Disputas entre las partes</h2>
        <p>
          Si el promotor objeta un hito o surge discrepancia entre las partes, el hito queda en estado de disputa y el importe permanece retenido. Las partes intentarán resolver el conflicto de buena fe en un plazo de 10 días. Si no se alcanza acuerdo, se someterán a la jurisdicción ordinaria del lugar de la obra.
        </p>
        <p>
          PactStream no arbitra ni decide sobre el fondo de las disputas: mantiene la retención hasta que las partes acuerden una solución o recaiga resolución judicial.
        </p>

        <h2>9. Propiedad intelectual e industrial</h2>
        <p>
          El software, la marca, el diseño y los contenidos de la plataforma son propiedad de PactStream S.L. o de sus legítimos titulares. El usuario conserva la titularidad de los documentos y evidencias que aporta, y concede a PactStream una licencia limitada para almacenarlos y tratarlos con la única finalidad de prestar el servicio.
        </p>

        <h2>10. Limitación de responsabilidad</h2>
        <p>
          PactStream no garantiza la disponibilidad continua e ininterrumpida de la plataforma y no será responsable de los daños derivados de interrupciones, errores de terceros proveedores, virus o desconexiones ajenas a su control.
        </p>
        <p>
          PactStream no responde de la calidad, la legalidad ni el cumplimiento de la obra contratada, ni de la veracidad de las evidencias aportadas por los usuarios, cuya responsabilidad corresponde a quien las aporta.
        </p>

        <h2>11. Suspensión y baja</h2>
        <p>
          El usuario puede solicitar la baja en cualquier momento escribiendo a hello@pactstream.io. La baja no afecta a las obligaciones pendientes derivadas de obras en curso ni a los importes en custodia, que seguirán el régimen pactado en el contrato correspondiente.
        </p>
        <p>
          PactStream podrá suspender o cancelar una cuenta que incumpla estos Términos o la normativa aplicable, informando al usuario salvo que una obligación legal lo impida.
        </p>

        <h2>12. Protección de datos</h2>
        <p>
          El tratamiento de datos personales se rige por la <a href="/privacidad" className="text-[#0D9B84] hover:text-[#0FC9A8]">Política de Privacidad</a>, conforme al RGPD y a la LOPDGDD.
        </p>

        <h2>13. Modificación de los Términos</h2>
        <p>
          PactStream podrá modificar estos Términos para adaptarlos a cambios normativos o del servicio. Los cambios sustanciales se comunicarán con antelación razonable. Las obras ya contratadas se rigen por los Términos vigentes en el momento de la firma.
        </p>

        <h2>14. Legislación aplicable y jurisdicción</h2>
        <p>
          Estos Términos se rigen por la legislación española. Para las controversias relativas al uso de la plataforma, las partes se someten a los Juzgados y Tribunales de Madrid, salvo que la ley establezca otro fuero imperativo, en particular el que corresponda al usuario consumidor. Las controversias sobre la ejecución de la obra se rigen por lo previsto en la cláusula de resolución de disputas del contrato entre las partes.
        </p>

        <p className="text-white/40 text-xs mt-12">Última actualización: agosto 2026</p>

        <div className="mt-8">
          <a href="/" className="text-[#0D9B84] hover:text-[#0FC9A8] text-sm">← Volver a la página principal</a>
        </div>
      </div>
    </main>
  );
}
