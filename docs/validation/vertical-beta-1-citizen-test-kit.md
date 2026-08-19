# Vertical Beta 1 — Kit de pruebas ciudadanas

- Issue de ejecución: #100
- Plan normativo: #10
- Estado: kit preparado; reclutamiento y sesiones no ejecutados
- Precondiciones de ejecución: #76 correcta y bloqueantes de #99 resueltos

## 1. Propósito y límite

Este kit convierte el plan de #10 en instrumentos reproducibles para dos rondas moderadas de seis personas. Incluye manifiesto, reclutamiento, información y consentimiento, guion, claves de recorrido, observación, rúbricas, accesibilidad, hallazgos y decisión.

El kit **no contiene resultados**. Las filas vacías, ejemplos y acciones canónicas no acreditan que una sesión haya ocurrido. #100 solo puede cerrarse con evidencia agregada de una ronda diagnóstica, correcciones y una ronda final sobre versiones identificadas.

No se almacenan en GitHub nombres, contactos, consentimientos, grabaciones, diagnósticos ni notas que permitan identificar a una persona. Esos datos, si son necesarios, permanecen en el sistema autorizado por la entidad responsable y se eliminan según el plan.

## 2. Manifiesto de ronda

Se completa una copia por piloto y ronda:

```text
roundId: pilot | diagnostic-r1 | final-r2 | additional-rN
candidateCommit:
candidateUrl:
acceptanceRunUrl:
expertReviewUrl:
sessionDates:
moderatorCode:
noteTakerCode:
observerCodes:
language: es
targetRouteCounts: prepared=3, vulnerable=3
actualRouteCounts:
knownLimitations:
analysisCompletedAt:
decision: pending | iterate | pass | fail
```

Para `diagnostic-r1` y `final-r2`, `candidateCommit`, `candidateUrl`, `acceptanceRunUrl` y `expertReviewUrl` son obligatorios. El piloto interno usa datos ficticios y nunca se agrega a la evidencia ciudadana.

## 3. Roles de sesión

| Rol | Responsabilidad | No debe hacer |
|---|---|---|
| Moderación | Informar, obtener consentimiento, leer tareas, controlar tiempo y bienestar. | Explicar el modelo causal, recomendar opciones o defender el diseño. |
| Notas | Registrar acciones, tiempos, ayudas, frases y barreras con código de participante. | Anotar datos personales o interpretar durante la partida. |
| Observación | Observar en silencio y aportar hechos al análisis posterior. | Interrumpir, preguntar directamente o comunicarse con la persona participante. |
| Coordinación | Gestionar reclutamiento, acceso, incentivos, almacenamiento y borrado. | Copiar datos de contacto o consentimiento a GitHub. |
| Producto | Resolver incidencias del candidato después de la sesión y priorizar findings. | Moderar sesiones de personas que conoce si puede introducir sesgo o presión. |

Una sesión requiere como mínimo moderación y notas. Si se hace en remoto, se verifica antes la alternativa ante fallo de audio, vídeo, enlace o tecnología de apoyo.

## 4. Reclutamiento

### 4.1 Screener privado

El formulario de reclutamiento se conserva fuera del repositorio y pregunta únicamente lo necesario:

1. ¿Tienes 18 años o más? (`sí` obligatorio).
2. ¿Puedes comprender la sesión en español o necesitas apoyo lingüístico?
3. Franja de edad: `18–34`, `35–59`, `60+`.
4. ¿Vives o has vivido en un entorno rural o de interfaz urbano-forestal?
5. Confianza usando webs: `baja`, `media-baja`, `media`, `alta`.
6. Dispositivo habitual: `móvil`, `escritorio/portátil`, `ambos`.
7. ¿Necesitas alguna adaptación para participar? No se solicita diagnóstico.
8. ¿Has vivido de cerca un incendio forestal? Respuesta opcional y sin pedir detalles.
9. ¿Trabajas en incendios, protección civil, 112, diseño o desarrollo de este proyecto?
10. ¿Tienes relación directa con el equipo que pueda hacerte sentir obligado a participar?

Se excluyen menores, personas que no puedan dar consentimiento informado y miembros del equipo o panel experto usados como sustitutos de ciudadanía. Haber vivido una emergencia no excluye: activa una comprobación de bienestar y el derecho a parar sin explicar el motivo.

### 4.2 Cuotas por ronda

La coordinación conserva el detalle privado. En GitHub se publica únicamente este agregado:

| Cuota | Objetivo por ronda | Real | Estado |
|---|---:|---:|---|
| Participantes adultos | 6 | Pendiente | Pendiente |
| 18–34 | 2 | Pendiente | Pendiente |
| 35–59 | 2 | Pendiente | Pendiente |
| 60+ | 2 | Pendiente | Pendiente |
| Experiencia rural/interfaz | ≥3 | Pendiente | Pendiente |
| Competencia digital baja o media-baja | ≥2 | Pendiente | Pendiente |
| Discapacidad, tecnología de apoyo o adaptación | ≥1 | Pendiente | Pendiente |
| Móvil | ≥2 | Pendiente | Pendiente |
| Escritorio/portátil | ≥2 | Pendiente | Pendiente |
| Ruta preparada | 3 | Pendiente | Pendiente |
| Ruta vulnerable | 3 | Pendiente | Pendiente |

La diversidad de género y experiencia previa se comprueba sin publicar combinaciones que puedan reidentificar a una persona.

## 5. Información y consentimiento

### 5.1 Hoja de información

La invitación y la apertura de sesión deben explicar en lenguaje claro:

> Estamos probando una experiencia educativa sobre prevención e incendios forestales, no tus conocimientos ni tu capacidad. La sesión dura aproximadamente 60 minutos. Te pediremos completar una partida, comparar dos resultados y comentar qué entiendes. Puedes omitir preguntas, pedir una pausa o retirarte sin dar una razón. La experiencia no ofrece instrucciones para actuar en una emergencia real; en una situación real deben seguirse siempre las indicaciones oficiales.

También se informa de:

- entidad responsable y canal privado de contacto;
- finalidad y versión probada;
- notas y datos que se recogerán;
- grabación opcional, separada del consentimiento principal;
- quién podrá acceder a datos sin anonimizar;
- compensación, si existe, sin condicionarla a completar la sesión;
- fecha límite para retirar datos antes de agregarlos;
- retención y borrado, con máximo de 30 días para contactos y grabaciones tras compensación/análisis;
- uso de citas únicamente anonimizadas;
- posible contenido sensible y protocolo de parada.

### 5.2 Lista de consentimiento privado

La coordinación registra fuera de GitHub respuestas separadas para:

- [ ] tengo 18 años o más;
- [ ] he leído o recibido la información y pude preguntar;
- [ ] entiendo que participar es voluntario y puedo parar;
- [ ] acepto que se tomen notas anonimizadas;
- [ ] acepto el uso de citas anonimizadas;
- [ ] acepto audio (`opcional`, sí/no);
- [ ] acepto vídeo/pantalla (`opcional`, sí/no);
- [ ] conozco la fecha límite y el canal para retirar mis datos.

Negarse a audio o vídeo no impide participar. En el repositorio solo se registra `consentVerified: yes` junto al código, nunca el formulario.

## 6. Preparación previa

Un día antes y de nuevo antes de la primera sesión se comprueba:

- commit, URL y aceptación #76 coinciden;
- #99 no tiene bloqueantes de seguridad abiertos;
- ambas rutas canónicas terminan y muestran el informe correcto;
- reinicio entre participantes y ausencia de datos de la sesión anterior;
- dispositivo, navegador, resolución y tecnología de apoyo acordados;
- teclado, foco, ampliación 200 %, movimiento reducido y alternativa sin sonido;
- reloj independiente y hoja de notas;
- informe alternativo preparado sin revelar la etiqueta de la ruta;
- protocolo de incidencia técnica y copia de seguridad;
- información, consentimiento y contacto de bienestar disponibles.

El piloto reproduce el guion completo con una persona del equipo que no aporta evidencia. Todo cambio de instrumento posterior al piloto se versiona antes de reclutar.

## 7. Asignación de recorridos

Los códigos impares de cada ronda reciben la ruta preparada y los pares la vulnerable, salvo reasignación documentada para mantener 3/3:

| Ronda | Preparada | Vulnerable |
|---|---|---|
| Diagnóstica | `P01`, `P03`, `P05` | `P02`, `P04`, `P06` |
| Final | `P07`, `P09`, `P11` | `P08`, `P10`, `P12` |

La tarjeta visible utiliza etiquetas de la interfaz y no menciona `prepared`, `vulnerable`, `contained`, `overwhelmed` ni el efecto esperado. La persona moderadora solo repite la tarea; no traduce su intención.

### 7.1 Clave privada de moderación — ruta preparada

```text
gestionar-restos-poda
crear-discontinuidades-vegetales
limpiar-margenes-caminos
podar-ramas-y-retirar-seco
despejar-accesos
movilizar-y-verificar
autorizar-maniobra-condicionada
asegurar-flancos-y-repliegue
defender-desde-posicion-segura
```

### 7.2 Clave privada de moderación — ruta vulnerable

```text
gestionar-restos-poda
activar-pastoreo-preventivo
evaluar-quema-tecnica
podar-ramas-y-retirar-seco
separar-copas
movilizar-y-verificar
despejar-corredor-operativo
asegurar-flancos-y-repliegue
replegar-ante-fuego-de-copas
```

La clave sirve para comprobar la asignación, no para enseñar qué opción pulsar. Si el candidato no permite recorrer ambas referencias mediante tareas neutrales, se registra como finding y no se fuerza el resultado desde código o consola.

## 8. Guion de moderación

### 8.1 Apertura — 5 minutos

1. Confirmar código, consentimiento y necesidades de acceso.
2. Leer: “Probamos el producto, no a ti. No hay respuestas que debas adivinar”.
3. Recordar pausa, retirada y ausencia de penalización.
4. Pedir que piense en voz alta sin justificar todas sus decisiones.

### 8.2 Pretest — 5 minutos

Preguntar sin corregir ni ampliar:

1. ¿Qué cosas pueden cambiar las consecuencias de un incendio antes de que empiece?
2. Si dos municipios afrontan el mismo incendio, ¿por qué podrían obtener resultados diferentes?
3. ¿Qué información necesitarías para decidir durante una emergencia?
4. ¿Qué esperarías aprender de una experiencia como esta?

Sondas permitidas: “¿Algo más?” y “¿Qué quieres decir con eso?”. No se nombran prevención, estado heredado ni causalidad si la persona no los menciona.

### 8.3 Partida — objetivo 20–25 minutos

1. Entregar la tarjeta de tarea asignada.
2. Iniciar reloj cuando aparece la primera pantalla interactiva.
3. Registrar primera acción, ayudas, retrocesos, errores, pausas y frases causales.
4. Ante silencio prolongado, preguntar “¿Qué estás buscando?” sin señalar un control.
5. Dar ayuda solo después de que la persona la solicite o quede bloqueada; registrar nivel de ayuda.
6. Detener reloj cuando el informe final es visible y se ha intentado leer.

Niveles de ayuda:

- `H0`: ninguna;
- `H1`: repetir tarea o pedir pensar en voz alta;
- `H2`: orientar hacia una zona general de la pantalla;
- `H3`: señalar control o explicar interacción;
- `H4`: explicar opción, causalidad o completar por la persona.

`H3/H4` en una tarea crítica impide contarla como completada sin explicación del moderador.

### 8.4 Comparación — 5 minutos

Mostrar el informe canónico alternativo sin decir cuál es mejor. Preguntar:

1. ¿Qué diferencias ves?
2. ¿Qué decisión anterior puede explicar una diferencia?
3. ¿Qué no podrías concluir sobre un incendio real a partir de estos dos resultados?

### 8.5 Postest — 10 minutos

1. Cuéntame con tus palabras qué ocurrió y por qué terminó así.
2. Indica una decisión preventiva, qué cambió y qué consecuencia tuvo durante la crisis.
3. ¿Algo pareció azaroso, predeterminado o difícil de relacionar con tus decisiones?
4. ¿Qué opción o texto fue más difícil de entender?
5. ¿Qué enseñó el informe final que no estuviera claro durante la partida?
6. Al comparar ambos informes, ¿qué cambió, qué decisión lo causó y qué no puede concluirse sobre un incendio real?
7. Si volvieras a jugar, ¿qué cambiarías y qué efecto esperarías?
8. ¿Encontraste una barrera de lectura, navegación, control, tiempo o concentración?

### 8.6 Cierre — 5 minutos

- preguntar si queda algún comentario;
- comprobar bienestar y detener cualquier profundización no necesaria;
- recordar contacto, retirada y compensación;
- cerrar sesión, borrar estado local y preparar un candidato limpio.

## 9. Hoja de observación anonimizada

```text
participantCode:
roundId:
candidateCommit:
assignedRoute:
actualRoute:
deviceCategory:
browserCategory:
accessSupportRepresented:
consentVerified: yes | no
startedAt:
reportVisibleAt:
durationMinutes:
completed: yes | no
abandonmentReasonCategory:
highestHelpLevel: H0 | H1 | H2 | H3 | H4
pretestCausalScore: 0 | 1 | 2
posttestCausalScore: 0 | 1 | 2
attributesOutcomeToDecisions: yes | partial | no
causalChainsInReport: 0 | 1 | 2+
distinguishesRoutes: yes | partial | no
understandsSimulationLimits: yes | partial | no
keyboardPathCompleted: yes | no | not-tested
accessBarrierFindingIds:
otherFindingIds:
anonymousObservations:
```

`anonymousObservations` contiene comportamientos o citas breves necesarias para justificar un finding. No incluye edad exacta, municipio, ocupación, diagnóstico, contacto ni relato traumático.

## 10. Rúbricas

### 10.1 Comprensión causal

| Puntuación | Evidencia |
|---:|---|
| `0` | No relaciona una decisión previa con una consecuencia o atribuye todo a azar/guion. |
| `1` | Expresa una relación genérica (“prepararse ayuda”) sin identificar cambio y consecuencia. |
| `2` | Identifica decisión preventiva, cambio de condición/capacidad y consecuencia en crisis. |

### 10.2 Informe causal

Una cadena cuenta si contiene:

1. decisión u omisión identificable;
2. cambio de `inheritedState` o capacidad expresado en lenguaje ciudadano;
3. escena o condición de crisis afectada;
4. consecuencia o resultado coherente.

No se exige recordar IDs, valores numéricos ni terminología técnica.

### 10.3 Comprensión de límites

- `yes`: reconoce que el juego muestra un caso simplificado y no garantiza un resultado real;
- `partial`: expresa incertidumbre, pero generaliza alguna regla;
- `no`: interpreta `contained` como garantía, `overwhelmed` como predicción o una opción como orden real.

Un `no` que pueda inducir conducta peligrosa se registra como `blocker` aunque aparezca una sola vez.

## 11. Accesibilidad

La ronda agrega observación humana a la comprobación técnica. Se distribuyen, como mínimo:

- una sesión completa o tareas críticas por teclado en cada ronda;
- una sesión con ampliación al 200 %;
- una sesión móvil con tamaño y separación de controles;
- la tecnología de apoyo o adaptación representada por la persona reclutada;
- movimiento reducido y experiencia sin sonido;
- comprensión de foco, errores, contadores, consecuencias y estado sin depender solo del color.

Si una tecnología de apoyo no puede completar una tarea crítica, se abre un finding aunque el resto de participantes complete. No se pide a la persona que revele diagnóstico ni que actúe como representante de todas las discapacidades.

## 12. Cuadro agregado de ronda

| Puerta | Resultado | Umbral final | Estado |
|---|---:|---:|---|
| Participantes con puntuación causal `2` | Pendiente/6 | ≥5/6 | Pendiente |
| Atribuyen diferencias a decisiones | Pendiente/6 | ≥5/6 | Pendiente |
| Identifican al menos dos cadenas del informe | Pendiente/6 | ≥5/6 | Pendiente |
| Distinguen ambas rutas y una causa | Pendiente/6 | ≥5/6 | Pendiente |
| Comprenden límites de la simulación | Pendiente/6 | ≥5/6 | Pendiente |
| Completan sin explicación `H3/H4` | Pendiente/6 | ≥5/6 | Pendiente |
| Mediana de duración | Pendiente | ≤25 min | Pendiente |
| Abandonos por bloqueo del producto | Pendiente | 0 | Pendiente |
| `blocker` abiertos | Pendiente | 0 | Pendiente |
| `major` abiertos | Pendiente | 0 | Pendiente |
| Recorrido por teclado/ayudas representadas | Pendiente | completo | Pendiente |

Las adaptaciones de acceso no se contabilizan como fallo de tiempo. La ronda diagnóstica siempre termina en `iterate` o `fail`; solo la ronda final puede producir `pass`.

## 13. Registro y análisis de hallazgos

| ID | Ronda | Versión | Escena | Observación e impacto | Evidencia anónima | Severidad | Responsable | Issue | Estado | Verificación |
|---|---|---|---|---|---|---|---|---|---|---|
| Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | `open` | Pendiente |

Proceso después de cada sesión:

1. moderación y notas separan observación de interpretación;
2. se extraen hechos y citas anonimizadas;
3. se agrupan patrones sin ocultar casos únicos de seguridad o exclusión;
4. se asigna severidad según el plan #10;
5. todo `blocker`/`major` recibe issue, responsable y prueba de cierre;
6. se analiza la ronda el mismo día o lo antes posible;
7. se publica solo la tabla agregada y findings anonimizados;
8. se revalida la corrección en la siguiente ronda o con el perfil afectado.

## 14. Definition of Done de #100

- [ ] #76 correcta y candidato identificado;
- [ ] #99 sin bloqueantes de seguridad;
- [ ] información, consentimiento y almacenamiento aprobados;
- [ ] piloto interno completado y excluido de la evidencia;
- [ ] ronda diagnóstica de seis con cuotas cumplidas;
- [ ] findings diagnósticos corregidos o resueltos según severidad;
- [ ] ronda final de seis sobre candidato identificado;
- [ ] todas las puertas finales del cuadro agregado superadas;
- [ ] cero `blocker`/`major` abiertos;
- [ ] evidencia de teclado y apoyos representados;
- [ ] notas publicadas solo de forma anónima/agregada;
- [ ] decisión final y versión registradas en #100.

Hasta completar la lista, #100 permanece abierta y no autoriza publicación pública.
