DOCUMENTO DE DISEÑO: SIMULADOR DE PREVENCIÓN DE INCENDIOS "GUARDIÁN DEL BOSQUE"
1. Resumen Ejecutivo (Concepto Central)
Es un serious game de gestión de riesgos basado en un árbol de decisiones con pesos positivos/negativos. El jugador gestiona un territorio forestal siguiendo un ciclo anual:

Invierno (Fase de Preparación): El jugador asigna recursos limitados (presupuesto, maquinaria, personal) a tareas de prevención. Las decisiones aquí construyen el estado del monte y determinan el "Patrón Heurístico" (vulnerabilidad del terreno).

Verano (Fase de Crisis): Se desata un incendio. El jugador enfrenta decisiones en tiempo real (por turnos o eventos) donde la gestión previa (invierno) determina la gravedad del incendio y las opciones disponibles para combatirlo.

2. Mecánicas Principales (Lo que ya tienes)
Árbol de Decisiones: No lineal. Cada nodo (decisión) ofrece ramas con consecuencias inmediatas y permanentes.

Pesos Duales: Cada decisión afecta a dos tipos de valores:

Recursos: Dinero, agua, moral de brigadas, maquinaria operativa (Recursos Limitados).

Riesgo/Estadísticas: Carga de combustible, humedad del suelo, accesibilidad para camiones (Variables de Estado).

Marco Temporal Estacional: Ciclo Invierno (Planificación) -> Verano (Ejecución/Emergencia).

Heurística de Incendio: El comportamiento del fuego no es aleatorio; sigue un patrón calculado en base a las decisiones tomadas en invierno (ej: "Si descuidaste los cortafuegos, el fuego se propaga un 30% más rápido").

3. Roadmap de Desarrollo por Fases (Implementación IA-Guided)
FASE 0: Fundación Técnica (Configuración del Proyecto)
Objetivo: Tener el entorno de desarrollo listo para que la IA pueda generar código funcional sin conflictos.

Tecnología Sugerida:

Frontend: React + Next.js o Vue.js (facilita componentes reutilizables para cada nodo del árbol).

Estilo: Tailwind CSS (rápido de iterar con IA).

Estado: Zustand o Context API (para gestionar los recursos globales).

Entregable: Proyecto base que renderiza "Hola Mundo" y una estructura de carpetas (/components, /data, /utils).

FASE 1: Núcleo del Juego (El Motor de Árbol y Recursos)
Objetivo: Construir la lógica interna sin la interfaz gráfica compleja (Backend lógico en Frontend).

Tareas Específicas:

Definir la Estructura de Datos (JSON): Crear el esqueleto del árbol de decisiones. Cada nodo debe tener:
json
{
  "id": "invierno_1",
  "texto": "Invertir en limpieza de matorral",
  "recursos_requeridos": { "dinero": 500 },
  "opciones": [
    { "texto": "Limpiar zona norte",
      "efecto": { "dinero": -200, "combustibleNorte": -20, "moral": 5 } },
    { "texto": "No hacer nada",
      "efecto": { "dinero": 0, "combustibleNorte": 10, "comunidad": -10 } }
  ]
}
Sistema de Recursos: Implementar un "almacén" (Store) que tenga valores numéricos (Dinero, Combustible, Humedad, etc.) y se actualice cuando se toma una decisión.
Motor de Transiciones: Función que, dado un ID de nodo, cargue el siguiente nodo basado en la elección del usuario (navegación del árbol).
FASE 2: Implementación del Ciclo Estacional (Invierno)
Objetivo: Crear la interfaz de "Preparación".

Tareas Específicas:

Tablero de Invierno: Mostrar recursos iniciales.
Renderizado del Árbol: Mostrar los nodos de decisión de invierno uno por uno. El jugador clica y gasta recursos.
Cálculo del "Patrón Heurístico": Al finalizar el invierno, el sistema debe recopilar las variables de estado (explicado en el gap "Heurística") y guardarlas como un "Snapshot" que se usará en verano.
FASE 3: Implementación del Ciclo de Crisis (Verano)
Objetivo: Crear la interfaz de "Respuesta al Incendio".

Tareas Específicas:

Generación del Escenario: Dependiendo del Snapshot del invierno, el incendio comienza con diferentes parámetros (tamaño, velocidad).
Decisiones en Caliente: Nuevo árbol de decisiones (más urgente, menos tiempo para pensar). Aquí se gestionan recursos como "agua" o "brigadas".
Sistema de Consecuencias: Mostrar cómo el incendio avanza o retrocede basado en las elecciones (UI de barra de progreso del incendio).
FASE 4: UI/UX y Pulido
Objetivo: Hacerlo atractivo y comprensible.

Tareas Específicas: Gráficos del bosque (verde vs quemado), animaciones de transición entre invierno y verano, tooltips explicativos de por qué una decisión afecta al riesgo.

4. Nuevas Ideas y Features (Para enriquecer el juego)
Eventos Aleatorios Encuadrados:

Idea: Introducir una variable "Clima". Aunque el jugador gestione bien, una sequía extrema (evento aleatorio) puede anular parte de su preparación, o una lluvia temprana puede salvarlo. Esto añade rejugabilidad.

Facción/Opinión Pública:

Idea: Añadir un recurso de "Apoyo Vecinal". Si en invierno no limpias y el fuego llega a casas, pierdes el juego automáticamente (game over) o recibes un juicio social.

Mejora del "Patrón Heurístico":

Idea: Que no sea solo una variable. Crear un "Mapa de Calor" conceptual. Ej: Zona 1: Alta pendiente (siempre riesgo). Zona 2: Baja pendiente pero mucha maleza (decisión del jugador). El fuego siempre ataca por la zona más débil (heurística basada en lógica if/else compleja).

Sistema de Legado:

Idea: Campaña de 3 años. Los recursos sobrantes de un año pasan al siguiente, y las zonas quemadas necesitan rehabilitación (nuevo tipo de decisión en invierno).

5. Identificación de Gaps (Brechas en tu concepto original)
Para que el juego funcione y sea divertido, necesitas definir estos puntos. Aquí están los gaps y sus soluciones propuestas:

Gap 1: La Heurística del Fuego (El motor invisible)
El Problema: Dijiste que "sigue un patrón heurístico dependiente de las decisiones", pero no defines cómo se calcula eso. Si no se define, el fuego se comportará igual siempre o parecerá aleatorio.

La Solución (Guía para IA):
Crea una Función de Severidad.

Al final del invierno, calcula un índice: Riesgo_Base = (Combustible * 0.7) + (Pendiente * 0.2) - (Cortafuegos * 0.5).

En verano, cuando el jugador toma una decisión, la efectividad se modifica por ese índice.

Ejemplo: Si el jugador elige "Lanzar agua desde avión", el daño al fuego es -30. Pero si el Riesgo_Base es alto (por malas decisiones en invierno), la efectividad se reduce: Daño_Real = -30 - (Riesgo_Base / 10).

Gap 2: La Derrota y la Victoria (Condiciones de final)
El Problema: ¿Cuándo pierde o gana el jugador? "Gestionar incendios" es muy ambiguo.

La Solución:

Victoria: Llegar a otoño con menos del 20% del bosque quemado y recursos > 0.

Derrota: Quiebra (dinero 0), Pérdida de vidas (no mencionado, pero crucial), o Incendio descontrolado que quema el 80% del mapa.

Gap 3: La Traducción a UI (Interfaz)
El Problema: ¿Cómo sabe el jugador que una decisión de invierno afectará al verano? Si no lo sabe, se frustrará.

La Solución (UX):

Indicadores de Alerta: Junto a cada opción, poner iconos. Si una decisión aumenta el "combustible", mostrar una llama roja. Si lo disminuye, mostrar una llama gris.

Feedback diferido: Al llegar a verano, mostrar un panel que diga: "Diagnóstico: Tus cortafuegos deficientes han permitido que el fuego cruce la colina."

Gap 4: La Paradoja de los Recursos Limitados
El Problema: Si los recursos son limitados y el árbol es lineal, el jugador podría llegar a un nodo donde no tenga dinero para pagar la opción "buena", bloqueando la partida.

La Solución:

Implementar "Préstamos" o "Ayudas de Emergencia" como una rama de último recurso (con penalty de opinión pública).

O permitir que las decisiones "gratuitas" (no hacer nada) estén siempre disponibles.