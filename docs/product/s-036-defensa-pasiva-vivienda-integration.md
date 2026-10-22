# Integración de `s-036-defensa-pasiva-vivienda`

- Fecha: 22 de octubre de 2026
- Destino: `prevention-inspection-housing-interface`
- Alcance: adaptación de una tarjeta histórica; no se recupera su escenario ni su pregunta original

## Decisión de producto

La tarjeta se integra como el cuarto punto de la inspección de vivienda. El jugador continúa eligiendo exactamente dos actuaciones. No se crea escena, fase, rama, ruta, dimensión causal ni puntuación global.

La fotografía de la vivienda muestra dos problemas distintos y legibles: una pila de leña junto a la fachada que ocupa parte del paso, y puntos de la cubierta expuestos a brasas. Cada elemento tiene hotspot, tarjeta y cambio visual propios.

## Contrato causal

```text
hotspotId: vivienda-expuesta-pavesas
actionId: proteger-vivienda-pavesas
evidencia favorable: home-ember-entry-points-protected
condición omitida: home-ember-entry-points-exposed
InheritedState: defensibility +10
consecuencia: housingDefenseCapability
```

El incremento de 10 coincide con el impacto secundario de separar copas y es inferior al efecto de recuperar el acceso local. No toca directamente `fuelLoad`, `fuelContinuity`, `operationalAccess` ni `attackOpportunity`; esta última sigue derivándose con las reglas existentes.

## Perfiles de regresión

### Preparado

Territorio: restos de poda, discontinuidad vegetal y márgenes del camino. Vivienda: alejar la leña/despejar el paso y proteger frente a brasas.

```text
fuelLoad: 55
fuelContinuity: 45
operationalAccess: 80
defensibility: 60
attackOpportunity: 61
branch: prepared
result: contained
```

### Vulnerable

Territorio: restos de poda, pastoreo y evaluación de quema preventiva. Vivienda: poda baja y protección frente a brasas.

```text
fuelLoad: 25
fuelContinuity: 55
operationalAccess: 20
defensibility: 30
rawAttackOpportunity: 49
attackOpportunity: 24 (límite por acceso crítico)
branch: vulnerable
result: overwhelmed
```

La mejora de defensa pasiva es real en ambos perfiles. En el segundo no compensa la falta de entrada, maniobra y repliegue seguros.

## Presentación

El estado inicial muestra restos secos en el canalón, un respiradero abierto y material combustible próximo. Al aplicar la actuación, los restos desaparecen, se instala una malla y queda un estado tratado estable. La transición es breve, se ejecuta una sola vez y se sustituye por el estado final inmediato con `prefers-reduced-motion`.

El estado del juego es la única fuente de verdad: `GameSession` produce el modelo visual, el modelo decide el overlay y el overlay únicamente representa el resultado. La animación no modifica reglas ni desbloquea acciones.

## Cambio de vocabulario asociado

El punto territorial antes llamado «Zona para revisar» se presenta como «Quemas preventivas», pero su tarjeta y confirmación indican expresamente que se trata de una evaluación y planificación profesional, no de una quema ejecutada.

El punto de acceso de vivienda se representa mediante leña apilada junto a la fachada. Se conserva el `actionId` canónico `despejar-accesos` porque la actuación «Alejar la leña y despejar el paso» reduce combustible junto a la vivienda y recupera el corredor operativo sin romper las reglas causales existentes.
