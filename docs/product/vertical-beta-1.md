# Vertical Beta 1 — ¡Apaga las llamas!

Fecha de decisión: 26 de julio de 2026

## Objetivo de producto

Demostrar de forma comprensible para la ciudadanía que las decisiones tomadas durante el invierno modifican las condiciones, los recursos disponibles y las consecuencias de un incendio durante el verano.

La beta no presenta invierno y verano como modos independientes. Son dos momentos de una misma partida:

- **Invierno:** prevención.
- **Verano:** actuación condicionada por la prevención.

## Público principal

Ciudadanía.

## Duración objetivo

20–25 minutos.

## Fase 1 — Invierno: prevención

### 1. Introducción y rol

- Presentación del municipio y del objetivo.
- Elección de avatar.
- Explicación breve del vínculo entre prevención y emergencia.

### 2. Viviendas y edificios

- Inspección mediante hotspots.
- Selección de cuatro actuaciones.
- Decisiones sobre canalones, fachadas, vegetación, huecos, accesos y edificios de apoyo.

### 3. Fincas, vegetación y combustible

- Priorización de limpieza, accesos, quemas, pastoreo y vegetación.
- Recursos y capacidad de intervención limitados.

### 4. Comunidad preparada

- Planes familiares.
- Población vulnerable.
- Canales oficiales.
- Puntos de apoyo.
- Información para visitantes y senderistas.

### 5. Balance preventivo

El invierno termina con uno de estos estados:

- Municipio preparado.
- Preparación desigual.
- Territorio vulnerable.

## Estado que pasa al verano

La fase de verano debe heredar, como mínimo:

- Defensibilidad de viviendas.
- Continuidad del combustible.
- Accesibilidad.
- Preparación familiar.
- Población vulnerable identificada.
- Confianza ciudadana.
- Claridad de los canales oficiales.
- Recursos disponibles.
- Fortalezas y vulnerabilidades generadas por las decisiones.

## Transición

Se declara un incendio. Antes de actuar, el juego muestra de manera explícita las condiciones heredadas del invierno y explica que la emergencia comienza con ese margen, no desde cero.

## Fase 2 — Verano: actuación

### 6. Primer aviso

- Verificar localización.
- Movilizar medios.
- Ordenar accesos.
- Comunicar sin generar alarma innecesaria.

### 7. Escalada del incendio

- El ataque inicial no resuelve completamente el fuego.
- El jugador debe asignar recursos limitados.
- Las vulnerabilidades del invierno modifican dificultad y costes.

### 8. Cambio de viento y amenaza a viviendas

- Decisión entre evacuación, confinamiento, defensa del núcleo o redistribución de medios.
- Accesos, defensibilidad y preparación ciudadana alteran las opciones disponibles.

### 9. Crisis de comunicación

- Saturación del 112.
- Desinformación o imagen antigua viral.
- Solo pueden ejecutarse dos actuaciones por escena.

### 10. Noche y agotamiento operativo

- Retirada de medios aéreos.
- Relevo de cuadrillas o mantenimiento del ataque.
- La preparación previa determina cuánto margen operativo queda.

## Informe final causal

El resultado debe explicar:

- Qué medida preventiva redujo daños.
- Qué carencia agravó la emergencia.
- Qué decisiones de verano compensaron errores previos.
- Qué daños podrían haberse evitado.
- Población protegida.
- Viviendas afectadas.
- Confusión pública.
- Seguridad de los equipos.
- Resultado alternativo con una prevención diferente.

## Desenlaces

- **Respuesta favorable:** la prevención proporciona margen operativo.
- **Contención con daños:** la preparación parcial obliga a corregir durante la emergencia.
- **Emergencia desbordada:** las vulnerabilidades acumuladas y la respuesta insuficiente superan la capacidad del operativo.

## Criterio de éxito de la beta

Dos partidas con decisiones preventivas diferentes deben producir condiciones, opciones y resultados claramente distintos durante el verano.

## Base técnica acordada

- Aplicación Fastify modular.
- Motor TypeScript separado de la vista.
- Reglas narrativas y heurísticas explicables.
- Territorio ilustrado/SVG.
- Contenido externo y editable.
- Informe final generado desde el estado real de la partida.

## Fuera de alcance

- MapLibre y PostGIS.
- Mapas geográficos reales.
- Simulación física o celular avanzada.
- Cuentas de usuario.
- Multijugador.
- Todos los escenarios existentes.
- Frontend y backend separados.
