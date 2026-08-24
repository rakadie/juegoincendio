# Vertical Beta 1 — Plan de validación experta y ciudadana

- Issue de planificación: #10
- Ejecución experta: #99
- Ejecución ciudadana: #100
- Fecha de decisión: 19 de agosto de 2026
- Estado: plan definido; validación externa no ejecutada

## 1. Decisión y alcance

La Vertical Beta 1 se valida en dos puertas distintas y trazables:

1. **revisión experta**, para comprobar rigor operativo, simplificaciones y mensajes de seguridad;
2. **pruebas con ciudadanía**, para comprobar aprendizaje, comprensión, duración y accesibilidad.

Cerrar #10 significa que el método está definido. No significa que especialistas o ciudadanía hayan aprobado el producto. La publicación pública requiere ejecutar y cerrar #99 y #100 sobre una versión candidata identificada, además de superar la aceptación técnica #76.

El proceso no pretende certificar una simulación científica ni medir impacto educativo poblacional. La muestra ciudadana es cualitativa y sirve como puerta de producto: detecta problemas, permite iterar y aporta evidencia suficiente para decidir si la beta puede exponerse a un público más amplio.

## 2. Preguntas de validación

La validación debe responder con evidencia a estas preguntas:

1. ¿Las relaciones entre prevención, estado heredado, crisis y resultado son plausibles y están formuladas con límites correctos?
2. ¿El contenido evita convertir una regla de juego en una garantía científica, una predicción o una orden operativa real?
3. ¿Una persona entiende sin ayuda que decisiones preventivas diferentes cambian las condiciones de la emergencia?
4. ¿Las consecuencias se atribuyen a decisiones anteriores y no a azar, puntuaciones ocultas o un guion predeterminado?
5. ¿Las opciones, consecuencias y el informe causal se comprenden con el contexto disponible?
6. ¿Las partidas preparada y vulnerable se perciben como diferentes por causas identificables?
7. ¿El recorrido se completa en el tiempo objetivo sin confusión, abandono ni barreras de acceso?

## 3. Orden y puertas

```text
#10 plan integrado
  -> #99 revisión experta documental inicial
  -> #76 candidato ejecutable y aceptación técnica
  -> #99 dictamen experto final sobre versión candidata
  -> #100 ronda ciudadana diagnóstica
  -> correcciones y nueva versión
  -> #100 ronda ciudadana final
  -> decisión editorial de publicación
```

No se expone a participantes un candidato con un hallazgo experto de seguridad bloqueante. Un cambio posterior que altere una afirmación revisada, un texto de seguridad, una regla causal o una escena invalida solo las firmas afectadas, que deben repetirse sobre el nuevo commit.

## 4. Revisión experta

### 4.1 Perfiles mínimos

Debe existir al menos una firma independiente para cada dominio:

| Dominio | Experiencia requerida | Foco de revisión |
|---|---|---|
| Prevención y comportamiento del fuego | Gestión de combustibles, prevención o análisis de incendios forestales | Carga, continuidad, tratamientos, interfaz y límites de las simplificaciones. |
| Protección civil y evacuación | Planificación o coordinación de emergencias | Autoridad, alertas, evacuación/confinamiento, coordinación territorial y población expuesta. |
| Operaciones de extinción | Mando, seguridad o intervención en incendios forestales | Acceso, repliegue, línea preventiva, defensa de viviendas y oportunidad de ataque. |
| Comunicación pública y 112 | Comunicación de emergencias o centro coordinador | Canales oficiales, rumores, llamadas al 112, incertidumbre y mensajes accionables. |
| Población vulnerable e interfaz | Servicios sociales, accesibilidad, autoprotección o interfaz urbano-forestal | Apoyos, movilidad, lenguaje no estigmatizante, vivienda y necesidades de acceso. |

Una persona puede cubrir como máximo dos dominios si acredita ambos. Las cinco decisiones se registran por separado. Producto y desarrollo pueden observar y responder, pero no sustituyen las firmas externas.

### 4.2 Paquete de revisión

Cada revisor recibe un manifiesto inmutable con:

- commit, URL del candidato, fecha, idioma y navegador objetivo;
- catálogo y grafo de los 12 nodos oficiales;
- matriz, combinaciones e informe causal;
- afirmaciones `OP-*`, `SIM-*` y estados de validación;
- dos partidas y fixtures canónicos;
- textos, opciones, consecuencias e informe final visibles;
- aviso educativo y límites de uso del producto;
- formulario de dictamen y registro de hallazgos.

El manifiesto, la matriz de escenas y afirmaciones, el formato de dictamen y el acta se materializan en [`vertical-beta-1-expert-review-package.md`](../validation/vertical-beta-1-expert-review-package.md).

La revisión toma como referencia territorial el INFOCA y las recomendaciones oficiales vigentes del Gobierno de Canarias. Las fuentes sostienen el contraste; no convierten al equipo en autoridad operativa.

### 4.3 Método

1. **Declaración:** identidad, perfil, dominio, afiliación y posibles conflictos.
2. **Revisión individual:** recorrido de ambos fixtures y decisión por cada afirmación o escena asignada.
3. **Registro:** `accept`, `adjust` o `reject`, con justificación, evidencia, severidad y versión.
4. **Contraste conjunto:** resolver contradicciones entre dominios sin borrar el dictamen original.
5. **Corrección:** cada bloqueante o mayor se convierte en issue con responsable y prueba de cierre.
6. **Revisión dirigida:** la persona competente reevalúa únicamente las filas afectadas.
7. **Acta:** cinco firmas y decisión `approved`, `approved-with-non-blocking-follow-up` o `rejected`.

El silencio no cuenta como aprobación. Una afirmación `plausible-pending-expert-review` solo cambia de estado cuando el acta identifica decisión, persona, fecha y commit.

## 5. Pruebas con ciudadanía

### 5.1 Muestra

Se realizan dos rondas moderadas de **seis personas adultas** cada una. La primera es diagnóstica; la segunda evalúa el candidato corregido. Si la evidencia es contradictoria se añade otra ronda pequeña, no se amplía retrospectivamente una ronda cerrada.

Cada ronda debe incluir:

- dos personas de 18–34 años, dos de 35–59 y dos de 60 o más;
- al menos tres personas que vivan o hayan vivido en territorio rural o de interfaz urbano-forestal;
- al menos dos personas con competencia digital baja o media-baja;
- al menos una persona con discapacidad, tecnología de apoyo o necesidad de adaptación;
- uso representativo de móvil y escritorio;
- diversidad de género y de experiencia previa con incendios.

No se recluta al equipo, especialistas del panel ni personas que hayan diseñado el contenido como sustitutos de ciudadanía. La primera validación excluye menores para no introducir un protocolo adicional de consentimiento; una versión educativa dirigida a menores necesitará una ronda específica.

La guía de GOV.UK sitúa habitualmente las rondas de entrevistas o usabilidad entre cuatro y ocho participantes y recomienda incluir personas con discapacidad o que necesitan apoyo. Se eligen seis para permitir variedad sin convertir una prueba cualitativa en una encuesta.

### 5.2 Reparto de partidas

En cada ronda, tres participantes recorren la partida preparada y tres la vulnerable usando decisiones de referencia presentadas como tareas, no como respuestas correctas. Después se muestra a cada persona el informe final canónico de la ruta alternativa para comprobar si distingue las causas y consecuencias de ambos recorridos.

Los participantes no reciben antes de jugar una explicación de la relación causal que se quiere medir. La persona moderadora puede resolver un problema técnico, pero no interpretar opciones ni explicar el modelo.

### 5.3 Guion de sesión

| Bloque | Tiempo orientativo | Actividad |
|---|---:|---|
| Bienvenida | 5 min | Información, consentimiento, derecho a parar y necesidades de acceso. |
| Pretest | 5 min | Preguntas abiertas sobre prevención y consecuencias, sin enseñar el modelo. |
| Inicio | 2 min | Tarea y técnica de pensar en voz alta; no se explican controles. |
| Partida | 20–25 min | Recorrido completo; tiempos, errores, ayudas y comentarios observados. |
| Comparación | 5 min | Lectura del informe alternativo y comparación entre partidas. |
| Postest | 10 min | Comprensión causal, atribución, opciones, informe y transferencia. |
| Accesibilidad y cierre | 5–10 min | Barreras, confianza, malestar, comentarios y recordatorio de retirada. |

Se ejecuta antes un piloto interno para probar el guion y los instrumentos. El piloto no se mezcla con la evidencia ciudadana.

El screener, la información y consentimiento, el guion neutral, las claves canónicas, las rúbricas y el cuadro agregado se materializan en [`vertical-beta-1-citizen-test-kit.md`](../validation/vertical-beta-1-citizen-test-kit.md).

### 5.4 Preguntas antes de jugar

1. ¿Qué cosas pueden cambiar las consecuencias de un incendio antes de que empiece?
2. Si dos municipios afrontan el mismo incendio, ¿por qué podrían obtener resultados diferentes?
3. ¿Qué información necesitarías para decidir durante una emergencia?
4. ¿Qué esperarías aprender de una experiencia como esta?

Las respuestas se codifican después; no se corrigen durante la sesión.

### 5.5 Preguntas después de jugar

1. Cuéntame con tus palabras qué ocurrió y por qué terminó así.
2. ¿Qué decisión preventiva tuvo una consecuencia durante la crisis? Indica la decisión, el cambio y la consecuencia.
3. ¿Hubo algo que pareciera azaroso, predeterminado o difícil de relacionar con tus decisiones?
4. ¿Qué opción o texto te resultó más difícil de entender?
5. ¿Qué te enseñó el informe final que no estuviera claro durante la partida?
6. Al comparar ambos informes, ¿qué cambió, qué decisión lo causó y qué no puede concluirse sobre un incendio real?
7. Si volvieras a jugar, ¿qué cambiarías y qué efecto esperarías?
8. ¿Encontraste una barrera de lectura, navegación, control, tiempo o concentración?

## 6. Métricas y criterios de aceptación

Los porcentajes se expresan también como recuentos porque seis personas no permiten inferencias estadísticas. La puerta se evalúa sobre la ronda final; la primera ronda sirve para encontrar y corregir problemas.

| Señal | Registro | Puerta de ronda final |
|---|---|---|
| Comprensión prevención–crisis | Rúbrica `0` sin relación, `1` relación genérica, `2` cadena decisión–estado–consecuencia correcta. | Al menos 5 de 6 alcanzan `2`; quien ya partía de `2` debe mantenerlo. |
| Atribución | Causa declarada del resultado. | Al menos 5 de 6 lo atribuyen a decisiones anteriores, no a azar o guion fijo. |
| Informe causal | Número de cadenas correctas identificadas. | Al menos 5 de 6 identifican dos cadenas correctas. |
| Diferencia entre partidas | Comparación del informe alternativo. | Al menos 5 de 6 distinguen ruta, resultado y una causa preventiva. |
| Comprensión de opciones | Paráfrasis antes de confirmar y ayudas solicitadas. | Ninguna opción crítica induce una interpretación peligrosa; al menos 5 de 6 completan sin explicación del moderador. |
| Duración | Tiempo desde inicio de partida hasta informe. | Mediana no superior a 25 minutos; las adaptaciones no cuentan como fallo de tiempo. |
| Finalización | Cierre, abandono y motivo. | 6 de 6 completan o no existe abandono causado por bloqueo del producto. |
| Accesibilidad | Barreras observadas y tareas con apoyo. | Cero bloqueantes o mayores abiertos; recorrido completo por teclado y con las ayudas representadas. |
| Transferencia prudente | Respuesta sobre límites del juego. | Al menos 5 de 6 no interpretan `contained` como garantía ni `overwhelmed` como predicción universal. |

La beta no se aprueba por promediar señales. Un único hallazgo con riesgo de daño, instrucción equivocada o exclusión completa puede bloquear aunque el resto de métricas pase.

## 7. Accesibilidad

La revisión combina comprobación técnica de WCAG 2.2 AA y evaluación humana. Como mínimo se prueba:

- recorrido completo por teclado, foco visible y orden coherente;
- ampliación al 200 % sin pérdida de contenido o acciones;
- ausencia de información dependiente solo de color, sonido, hover o memoria;
- objetivos, errores, contadores y consecuencias con nombres comprensibles;
- tamaño y separación de controles en móvil;
- movimiento reducido;
- lectura con la tecnología de apoyo representada en la muestra;
- tiempo flexible y posibilidad de pausa sin penalizar la lectura.

Superar una herramienta automática no sustituye las tareas manuales ni la participación de personas con discapacidad. Las necesidades de acceso se solicitan sin exigir diagnósticos médicos.

## 8. Consentimiento, bienestar y datos

Antes de reclutar deben aprobarse una hoja de información y un consentimiento comprensibles. Cada participante puede omitir preguntas, pedir una pausa o retirarse sin justificarlo. El contenido puede recordar una emergencia vivida; la persona moderadora detiene la sesión ante malestar y no insiste en obtener evidencia.

Reglas mínimas:

- usar códigos `P01`–`P12` en notas, métricas, commits e issues;
- separar datos de contacto y consentimiento de los hallazgos;
- no registrar diagnósticos, direcciones, experiencias traumáticas detalladas ni decisiones personales innecesarias;
- hacer audio o vídeo solo con permiso opcional y finalidad declarada;
- eliminar contactos y grabaciones como máximo 30 días después de cerrar compensación y análisis;
- conservar únicamente notas anonimizadas y métricas agregadas necesarias para justificar la decisión;
- no incluir datos personales en GitHub, logs de la aplicación ni payloads de prueba.

Si la entidad responsable necesita otra retención, debe aprobarla antes del reclutamiento y comunicarla a participantes. El plan no activa analítica ni persistencia de sesiones en el producto.

## 9. Registro y priorización de hallazgos

Cada hallazgo utiliza esta estructura:

```text
findingId
source: expert | citizen | accessibility
participantOrReviewerCode
observedVersion
sceneIds
claimIds
observation
evidence
impact
severity: blocker | major | moderate | improvement
owner
issueUrl
status: open | fixed | accepted-risk | rejected
verificationVersion
verifiedBy
```

| Severidad | Criterio | Tratamiento |
|---|---|---|
| `blocker` | Puede inducir una actuación peligrosa, contradice autoridad operativa, expone datos o impide completar una tarea crítica. | Parar la ronda o publicación, abrir issue inmediata y repetir la evidencia afectada. |
| `major` | Rompe el aprendizaje principal, causa atribución errónea repetida o excluye un perfil objetivo. | Corregir antes de la siguiente ronda o del dictamen final. |
| `moderate` | Genera fricción o confusión recuperable sin falsear el mensaje principal. | Priorizar con producto y verificar si se modifica. |
| `improvement` | Preferencia o mejora sin impacto demostrado en seguridad, comprensión o acceso. | Backlog; no bloquea. |

Dos observaciones similares pueden agruparse, conservando sus evidencias. Una sola observación puede ser bloqueante por impacto. `accepted-risk` exige justificación pública, responsable y fecha de revisión; no está permitido para `blocker`.

## 10. Evidencias y decisión final

#99 y #100 deben producir, sin datos personales innecesarios:

- manifiesto de versión;
- matriz experta y acta de cinco dominios;
- guion y piloto;
- tabla agregada de muestra, tareas y métricas;
- registro de hallazgos e issues derivadas;
- evidencia de corrección y revalidación;
- decisión `approved`, `approved-with-non-blocking-follow-up` o `rejected`.

La publicación requiere simultáneamente:

1. #76 correcto sobre el mismo candidato;
2. #99 aprobado y sin `blocker`/`major` abierto;
3. #100 con todas las puertas de la ronda final superadas;
4. cualquier cambio posterior relevante revalidado;
5. responsable editorial identificado y versión aprobada registrada.

## 11. Fuentes de método y contexto

- [GOV.UK — Plan user research for your service](https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service)
- [GOV.UK — Plan a round of user research](https://www.gov.uk/service-manual/user-research/plan-round-of-user-research)
- [GOV.UK — Finding participants for user research](https://www.gov.uk/service-manual/user-research/find-user-research-participants)
- [GOV.UK — Managing user research data and participant privacy](https://www.gov.uk/service-manual/user-research/managing-user-research-data-participant-privacy)
- [W3C — Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C — Cognitive Accessibility](https://www.w3.org/WAI/cognitive/)
- [Gobierno de Canarias — INFOCA](https://www.gobiernodecanarias.org/emergencias/planes-de-emergencias/infoca.html)
- [Gobierno de Canarias — recomendaciones a la población por riesgo de incendios forestales](https://www.gobiernodecanarias.org/cmsgob1/export/sites/emergencias/descargas/alertas/ANEXO-V-RECOMENDACIONES-POBLACION-RIESGO-INFOCA.PDF)

Estas fuentes orientan método, accesibilidad y contraste territorial. Los umbrales de aceptación son decisiones de producto para esta beta y deben revisarse si cambia el público, el idioma o el formato de sesión.

## 12. Matriz de aceptación de #10

| Criterio | Evidencia | Estado |
|---|---|---|
| Perfiles revisores | Cinco dominios, sección 4.1 | Cumplido |
| Muestra inicial | Dos rondas de seis con cuotas inclusivas, sección 5.1 | Cumplido |
| Guion de prueba | Secuencia, tiempos y reparto, secciones 5.2–5.3 | Cumplido |
| Preguntas antes y después | Secciones 5.4–5.5 | Cumplido |
| Métricas y aceptación | Recuentos y puertas, sección 6 | Cumplido |
| Registro y priorización | Esquema y severidades, sección 9 | Cumplido |
| Ejecución trazable | Issues #99 y #100, secciones 3 y 10 | Cumplido |
