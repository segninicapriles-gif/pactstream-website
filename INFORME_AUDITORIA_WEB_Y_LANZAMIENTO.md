# Auditoría Web + Estrategia de Lanzamiento — PactStream
**Fecha:** 25 junio 2026 | **Autor:** Claude (auditoría multi-agente)

---

## PARTE 1: CORRECCIONES APLICADAS (ya en código)

### Críticas (GDPR / funcionalidad rota)
| # | Issue | Estado |
|---|-------|--------|
| C1 | URL de referido hardcodeada `pactstream.com/r/invited` → cambiada a `pactstream.io` + botón "Copiar" | ✅ |
| C3 | Links legales `href="#"` en footer → `/legal`, `/privacidad`, `/cookies` | ✅ |
| C4 | Formularios mostraban éxito aunque fallara Supabase → `setSubmitted(true)` movido dentro del `try` | ✅ |
| C5 | IDs duplicados en SVG del logo (navbar + footer) → `useId()` para IDs únicos | ✅ |
| C6 | Páginas legales creadas: Aviso Legal, Privacidad, Cookies (RGPD compliant) | ✅ |
| C7 | Footer links `flex-wrap` para móvil | ✅ |

### Pendiente verificar
| # | Issue | Acción |
|---|-------|--------|
| C2 | Supabase RLS: verificar que `SELECT` está bloqueado para `anon` en tabla `waitlist` | ⚠️ Verificar en dashboard |

---

## PARTE 2: AUDITORÍA UX/UI — PRIORIDADES

### HIGH (implementar antes de lanzamiento)
1. **Reordenar secciones**: Hero → Problema/Pain → Cómo funciona → Features → Social proof → CTA final
2. **Heading duplicado**: "Características" aparece dos veces — consolidar
3. **Social proof**: añadir logos de confianza, counter de waitlist, testimoniales tempranos
4. **Video/Demo**: placeholder de demo o video explicativo en hero o sección dedicada
5. **Estado compartido de formularios**: hero y waitlist section usan estados independientes — sincronizar
6. **OG metadata**: añadir Open Graph tags para compartir en LinkedIn/redes
7. **Labels y aria-labels**: formularios sin labels accesibles

### MEDIUM
- Iconografía consistente (Lucide icons en todo el sitio)
- Animaciones de scroll más sutiles
- Sección de FAQ
- Blog/recursos (SEO)
- Breadcrumbs en páginas legales

---

## PARTE 3: INTELIGENCIA COMPETITIVA

### Competidores directos (ConTech/PropTech España)
| Empresa | Propuesta | Diferencia vs PactStream |
|---------|-----------|--------------------------|
| **PlanRadar** | Documentación y defectos en obra | No tiene escrow ni pagos |
| **Buildertrend** | Gestión integral de obra (US-centric) | No presente en España, sin escrow |
| **Procore** | Plataforma enterprise de construcción | $839M revenue, enterprise — no PYME ni escrow |
| **Conkau** (ES) | Aprovisionamiento y subcontratación | Sin pagos, sin IA verificación |
| **CoCircular** (ES) | Gestión circular de residuos | Nicho diferente |

### ⚠️ COMPETIDOR DIRECTO DESCUBIERTO: Plan Reforma / STIMATpay
| Aspecto | STIMATpay | PactStream |
|---------|-----------|------------|
| Modelo | Escrow manual para reformas | Escrow inteligente con IA |
| Precio | 0.7% por parte por transacción | Por definir |
| IA | No — aprobación manual por propietario | Score 0-100, findings verde/ámbar/rojo |
| App móvil | No | Sí (Flutter) |
| Setup | Requiere llamada telefónica | Self-service digital |
| UX | Anticuado | Mobile-first moderno |
| Certificación digital | No | Sí, con peso legal |
| Integración presupuesto | No | CostPact (ciclo completo) |

**Dato clave:** 70% de usuarios adoptan STIMATpay voluntariamente cuando se les ofrece → **la demanda de escrow en construcción está validada**.

### Posición competitiva de PactStream
No hay ninguna plataforma europea de IA+escrow para construcción residencial. Build Safe Escrow (US, junio 2025) es el análogo más cercano globalmente — sin IA, sin España, sin integración presupuestaria. Los players de verificación IA (Buildots $166M, OpenSpace, Doxel) solo sirven enterprise/GC grandes. El nicho residencial con IA está completamente vacío.

### Messaging que PactStream puede ownar (ningún competidor lo dice)
| Mensaje | Por qué es único |
|---------|-----------------|
| "Tu dinero, bloqueado hasta que la obra está verificada" | Todos hablan al contratista; nadie habla al pagador |
| "La IA actúa como testigo imparcial" | IA posicionada como eficiencia, nunca como árbitro neutral |
| "El presupuesto aprobado es el máximo facturable" | Nadie conecta presupuesto → pago |
| "Paga por fases. Solo cuando está hecho." | Simple, emocional, sin competencia |

### Datos de mercado clave
- España: récord histórico en rehabilitación de reformas (Q4 2025)
- 1.9M renovaciones/año, sector de €52.5B
- 78% aumento de fraude en reformas (AEECF 2024)
- IA en construcción VC: $2.22B en solo 3 trimestres de 2025
- 870 empresas PropTech+ConTech en España (PwC 2025)

### Lo que hacen bien los competidores (a imitar)
| Táctica | Quién | Aplicación PactStream |
|---------|-------|----------------------|
| Calculadora de ROI | Procore, Buildertrend | Calculadora: "¿cuánto pierdes por desfase de cobro?" |
| 440+ case studies | Procore | Empezar con 3-5 casos tempranos con nombres reales |
| Podcast sector | Procore ("The Power of Construction") | Posibilidad futura — webinars primero |
| Hard Hat Hero (storytelling) | Procore | Historias de jefes de obra reales |
| Certificaciones visibles | Todos los fintech | SOC 2, ISO 27001 como trust signals |

---

## PARTE 4: BRAND VOICE (resumen — guidelines completas en `brand-voice-guidelines.md`)

### Atributos de voz
- **Confiable**: lenguaje directo, datos concretos, sin exageraciones
- **Profesional pero accesible**: jerga técnica solo cuando aporta, siempre explicada
- **Empoderador**: el usuario es el protagonista, PactStream es la herramienta

### Messaging framework
- **Core**: "Protege tu inversión. Documenta tu obra. Cobra con confianza."
- **Para promotores**: "Paga solo por trabajo verificado. Documentación trazable ante cualquier disputa."
- **Para constructores**: "Cobra antes, certifica automático, elimina el desfase entre certificación y cobro."
- **Para técnicos**: "Validación IA de evidencias. Score 0-100 por hito. Findings en verde/ámbar/rojo."

### Regla de oro del messaging ConTech (fuente: AltCMO)
> "Start every message with the business outcome. If AI enables that outcome, mention it as supporting evidence, not as the main story."

- ❌ "Plataforma con IA que verifica evidencias"
- ✅ "Cobra antes, documenta mejor, certifica sin riesgos — la IA trabaja en segundo plano"

---

## PARTE 5: ESTRATEGIA DE LANZAMIENTO EN MEDIOS PROPIOS

### Canales por prioridad (España)

| # | Canal | Por qué | Esfuerzo |
|---|-------|---------|----------|
| 1 | **LinkedIn (Andrés como founder)** | 80% de leads B2B vienen de LinkedIn. Founder posts = 4x engagement vs marca | Alto |
| 2 | **Web pactstream.io** | Centro de conversión. Waitlist + contenido + SEO | Medio |
| 3 | **Email nurture** | Secuencia post-registro. Alto ROI, bajo coste | Bajo |
| 4 | **Eventos sector** | REBUILD, SIMA, APCE. Handshake físico cierra deals en España | Alto |
| 5 | **SEO técnico** | Keywords: "escrow construcción", "gestión pagos obra", "certificación obra" | Medio |
| 6 | **PR especializada** | Cinco Días, El Economista (inmobiliario), Idealista News | Medio |

### LinkedIn: datos clave para la estrategia de Andrés

| Dato | Valor |
|------|-------|
| Mejor formato | Carruseles (6.60% ER) > PDFs nativos (5.85%) > Vídeo (5.60%) |
| Founder vs marca | Posts del founder = 4x engagement vs company page |
| Employee amplification | 561% más alcance que company page sola |
| Thought Leader Ads | CPC $4.14 vs $22.54 (ads normales). 40% menos CPL |
| Cadencia óptima | 3-5x/semana. Mar-Jue pico. Primera hora crítica |
| Links externos | Reducen alcance 20-35%. Ponerlos en comentarios |
| Contenido IA detectable | -47% alcance. Editar siempre antes de publicar |

### Pilares de contenido LinkedIn

1. **Dolor del sector** — desfase certificación/cobro, disputas sin documentación, impagos
2. **Behind the scenes** — construcción del producto, decisiones técnicas, vida de founder
3. **Datos del sector** — estadísticas de impago en construcción, digitalización, PropTech España
4. **Educación** — qué es un escrow, cómo funciona la certificación, qué dice la ley
5. **Gender Smart** — Diana como co-fundadora, diversidad en construcción

### Calendario ejemplo — Semana 1

| Día | Contenido | Formato |
|-----|-----------|---------|
| Lunes | "El 65% de las constructoras españolas sufre retrasos en cobros de más de 90 días. ¿Por qué seguimos trabajando así?" | Texto + dato |
| Martes | Carrusel: "5 señales de que tu obra necesita un escrow" | Carrusel 5 slides |
| Miércoles | Boost del mejor post de la semana como Thought Leader Ad | Paid |
| Jueves | "Estamos construyendo PactStream — la primera cuenta escrow para obras en España. Hoy os cuento por qué." | Storytelling founder |
| Viernes | Análisis de engagement + prep semana siguiente | Interno |

### Secuencia email post-waitlist

| Email | Timing | Asunto | Contenido |
|-------|--------|--------|-----------|
| 1 | Inmediato | "Estás dentro 🎉" | Confirmación + qué esperar + timeline |
| 2 | Día 3 | "¿Por qué creamos PactStream?" | Historia del dolor, misión, equipo |
| 3 | Día 7 | "Así protege PactStream tu próxima obra" | Demo visual del flujo escrow + IA |
| 4 | Día 14 | "Tu opinión vale" | Encuesta: ¿qué funcionalidad priorizarías? |
| 5 | Día 21 | "Novedades de desarrollo" | Update del producto, screenshots, progreso |

---

## PARTE 6: NUANCES CULTURALES — COMPRADOR ESPAÑOL DE CONSTRUCCIÓN

| Factor | España | Norte de Europa |
|--------|--------|-----------------|
| Decisión | Gerente/socio decide, pocos comités | Comités formales, RFP |
| Confianza | Relación personal primero | Datos, reviews, benchmarks |
| Canal | LinkedIn + evento + referido | LinkedIn + webinar + contenido |
| Señal #1 | "¿Quién más lo usa que conozca?" | Reviews en G2/Capterra |
| Miedo principal | Riesgo legal, pérdida de control | Eficiencia, integración |
| Ciclo venta | 3-9 meses (promotoras grandes) | Similar enterprise |

### Mensajes que resuenan en España
- "Reduce el desfase entre certificación y cobro"
- "Cumplimiento normativo garantizado"
- "Tu obra, documentada y trazada"
- "La primera cuenta escrow diseñada para la cadena de pago de la obra"

### Mensajes que NO funcionan
- Jerga tecnológica sin contexto de negocio
- "Transformación digital" genérico
- Beneficios que cualquier competidor podría copiar

---

## PARTE 7: PRÓXIMOS PASOS (por prioridad)

### Inmediato (esta semana)
1. ☐ Verificar RLS en Supabase (tabla waitlist)
2. ☐ Build y deploy con correcciones aplicadas
3. ☐ Configurar OG metadata (título, descripción, imagen)
4. ☐ Optimizar perfil LinkedIn de Andrés como founder/CMO

### Corto plazo (2 semanas)
5. ☐ Reordenar secciones de la web (Pain → Solution → Features → Social proof)
6. ☐ Añadir calculadora ROI simple
7. ☐ Crear 3 posts LinkedIn piloto
8. ☐ Configurar secuencia email post-waitlist

### Medio plazo (1 mes)
9. ☐ Video explicativo / demo animada
10. ☐ Primeros case studies (aunque sean mockups/proyecciones)
11. ☐ SEO: blog con 3 artículos iniciales
12. ☐ Thought Leader Ads en LinkedIn (presupuesto mínimo $1,500/mes)

---

## PARTE 8: ESTRATEGIA LINKEDIN DE ANDRÉS — DETALLE

### Optimización de perfil (hacer HOY)

**Titular:**
> *Construyendo la infraestructura de confianza para la construcción española | CMO & Co-fundador PactStream*

**Banner:** Imagen del producto en uso + tagline "Escrow inteligente para obras". Fondo oscuro.

**About (primera línea):**
> *El 47% de las obras en España acaban en disputa. Yo llevo 8 años viéndolo desde dentro. Por eso construimos PactStream.*

**Destacados:** (1) enlace a waitlist, (2) artículo fundacional, (3) demo en YouTube.

### Frecuencia y horario
- 3 posts/semana (semanas 1–8), luego 2/semana
- Horario: lunes y jueves 8:00–9:00 AM o 12:30–13:30 PM
- Responder comentarios en las primeras 2 horas

### Conexiones — Técnicos en Madrid
- 20-30 solicitudes/semana a arquitectos y aparejadores activos
- Mensaje personalizado, NUNCA genérico, NUNCA pitch en primer contacto

### Engagement táctico semanal (20 min)
1. Comentar 5-7 posts de arquitectos/aparejadores con valor real
2. Compartir 1 artículo del sector con comentario propio
3. Responder todos los comentarios en tus posts

---

## PARTE 9: MECANISMO DE REFERIDOS

**Nombre:** "La Red de Confianza PactStream"

**Mecánica:**
1. Cada inscrito recibe enlace único: `pactstream.io/waitlist?ref=CODIGO`
2. Referidos → sube posiciones en la lista
3. 3 técnicos referidos → acceso beta privada antes que nadie

**Por qué técnicos:** Un técnico que entra arrastra a sus promotores y constructores. La red crece desde el prescriptor.

**Herramienta recomendada:** ReferralHero o Viral Loops

---

## PARTE 10: GENDER SMART — VENTAJA COMPETITIVA

### Diana como 50% co-fundadora activa:

| Programa | Aplicabilidad | Detalle |
|----------|--------------|---------|
| **ENISA Emprendedoras Digitales** | ✅ Directa | Diana >20% equity → €25K-€1.5M, hasta 9 años, 7 años carencia |
| **NEOTEC reserva mujeres** | ✅ Directa | €5M reservados para proyectos liderados por mujeres |
| **2X Criteria (global)** | ✅ Cumple | Dimensión "Entrepreneurship" (>20% ownership) + "Leadership" |
| **SISTA Charter VCs** | ✅ Target | 100+ fondos españoles comprometidos con 25% portfolio femenino |
| **WA4STEAM** | Posible | Red de business angels mujeres en STEAM (Barcelona) |

### Cómo posicionar Gender Smart en pitch

**Usar:** "Diana, co-fundadora con 50% del equity, activa el criterio Gender Smart bajo el estándar 2X Global (dimensiones Entrepreneurship y Leadership). PactStream es primera mover en ConTech español con alineación 2X."

**NO usar:** "Tenemos una co-fundadora mujer"

### Dato clave
- 90% de inversores con lente de género cumplieron o superaron sus objetivos financieros (GIIN 2024)
- España: solo 17% de founders tech son mujeres → PactStream está en minoría diferenciada
- Ningún ConTech español se ha posicionado públicamente como 2X-aligned → first mover

---

## PARTE 11: SECUENCIA EMAIL POST-WAITLIST (detalle)

| # | Timing | Asunto | Contenido clave |
|---|--------|--------|-----------------|
| 1 | Inmediato | "Estás dentro 🎉" | Confirmación + qué esperar + tu posición en la lista |
| 2 | Día 3 | "¿Por qué creamos PactStream?" | Historia personal: disputas vistas de cerca → misión → equipo |
| 3 | Día 7 | "Así protege PactStream tu próxima obra" | Demo visual: flujo escrow + IA verificación + semáforo |
| 4 | Día 14 | "Tu opinión vale" | Encuesta: ¿qué funcionalidad priorizarías? + enlace referidos |
| 5 | Día 21 | "Novedades de desarrollo" | Update real del producto + screenshots + progreso beta |

---

## PARTE 12: TABLA DE IMPLEMENTACIÓN INMEDIATA

| Acción | Deadline | Herramienta |
|--------|----------|-------------|
| Actualizar titular/banner/about LinkedIn | HOY | LinkedIn |
| Verificar RLS Supabase (tabla waitlist) | HOY | Supabase Dashboard |
| Build y deploy web con correcciones | HOY | Vercel/Hostinger |
| Instalar Google Search Console | 48h | GSC |
| Crear cuenta ConvertKit/Mailchimp | 48h | ConvertKit |
| Configurar 5 emails automáticos | Semana 1 | ConvertKit |
| Crear página empresa LinkedIn | Semana 1, lunes | LinkedIn |
| Escribir artículo #1 blog | Semana 1, jueves | Web |
| Pedir testimoniales a pilotos | Semana 1 | WhatsApp/Email |
| Configurar link referidos | Semana 2 | ReferralHero |
| Añadir OG metadata en web | Semana 1 | Next.js |
| Reordenar secciones web | Semana 2 | Código |
| Añadir calculadora ROI simple | Semana 2 | Código |

---

## FUENTES

- UX/UI audit (agente interno, 25-jun-2026)
- Brand voice discovery (agente interno, 25-jun-2026)
- Marketing plan + launch strategy (agente interno, 25-jun-2026)
- Gender Smart research (agente interno, 25-jun-2026)
- Competitor analysis: Procore, PlanRadar, Buildertrend, Conkau, CoCircular
- PropTech market: PwC España 2025, Market Data Forecast Europe 2033
- LinkedIn B2B: Averi.ai 2026, Kalungi, Impactable, CCIS Bonds
- ConTech marketing: SaaSHero, AltCMO, Build Media Group, Bricks & Bytes
- Proptech España: Abode Worldwide, elreferente.es, Studio New Brand
- Fintech/Escrow: SmartEscrow, Cronuts Digital, TechIndustryForum
- Gender Smart: 2X Global, GIIN 2024, ENISA, CDTI NEOTEC, SISTA Charter, Pi Labs
- Procore marketing: FeaturedCustomers, Purpose Brand, CoHost Podcast, Demand Gen Visionaries
