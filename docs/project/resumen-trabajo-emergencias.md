# Resumen de trabajo: variables y contenido educativo de emergencias

## Objetivo aplicado

Se incorporó un bloque estructurado de contenido para el juego con variables y escenarios de decisión orientados a prevención, operación de emergencias, evacuación y comunicación pública.

## Archivo creado

- `src/domain/entities/emergency-training-content.ts`

## Qué se implementó

### 1) Modelo tipado reutilizable

Se definieron tipos e interfaces para permitir reutilización del contenido en frontend, backend o motor de simulación:

- `VariableType`
- `GameVariableDefinition`
- `VariableImpact`
- `TrainingOption`
- `TrainingScenario`

### 2) Variables del juego incorporadas

Se añadió la constante `EMERGENCY_GAME_VARIABLES` con variables de estado del sistema de emergencia:

- `alertaTemperatura`
- `vientoKmh`
- `humedadRelativa`
- `confianzaVecinal`
- `cumplimientoPreventivo`
- `capacidadOperativa`
- `danosPotencialesVivienda`
- `continuidadSectorPrimario`

Cada variable incluye tipado, descripción e `initialValue` (y límites en variables numéricas).

### 3) Escenarios y decisiones implementadas

Se añadió la constante `EMERGENCY_TRAINING_SCENARIOS` con escenarios de tipo cuestionario y decisiones operativas.

Cobertura de temas incluidos:

- Limpieza perimetral en viviendas.
- Selección de vegetación tras limpieza de finca.
- Uso de maquinaria en condiciones de riesgo.
- Quemas agrícolas y autorización.
- Recogida de pinocha/leña/caña/forraje con criterios de autorización.
- Hogueras en monte (zonas autorizadas).
- Conducta ciudadana ante declaración de incendio.
- Campaña de comunicación sobre sector primario y consumo local.
- Primer envío de medios en aviso naranja.
- Evacuación con cambio de viento hacia núcleo poblado.
- Estrategia de defensa nocturna y relevos.
- Toma de decisiones ante persona que no evacúa en zona de alto riesgo.

### 4) Variables adicionales para “dar más vida”

Además del bloque principal solicitado, se añadieron dos escenarios extra para enriquecer la simulación:

- Simulacros escolares de autoprotección.
- Plan municipal de puntos de agua rurales.

## Lógica de impacto

Cada opción contiene:

- `recommended` para identificar decisión recomendada.
- `rationale` para justificar pedagógicamente la elección.
- `impacts` con ajustes sobre variables (por ejemplo `confianzaVecinal`, `capacidadOperativa`, `danosPotencialesVivienda`).

Esto permite usar el bloque como base de scoring o evolución de partida.

## Estado de validación

- Se intentó lanzar validación de tipado (`npx tsc --noEmit`), pero el flujo se interrumpió por cambio de instrucción para generar este resumen.
- El contenido quedó listo para validación en la siguiente ejecución de tipado/test.

## Resultado

Quedó implementado un módulo de contenido educativo y operativo, tipado y extensible, alineado con decisiones de prevención y respuesta ante incendios forestales para su integración en el juego.

