import type { CampaignContent, CampaignNode } from '../domain/types/campaign-node.js';

export const WINTER_CAMPAIGN_NODES: CampaignNode[] = [
        {
          id: 'invierno_1',
          title: 'Invierno · Limpieza estratégica de matorral',
          context:
            'Debes priorizar dónde invertir el primer bloque presupuestario. Esta decisión afecta combustible y accesibilidad.',
          options: [
            {
              id: 'a',
              text: 'Limpiar ladera norte + apertura de pistas secundarias',
              recommended: true,
              resourceEffects: { dinero: -260, maquinaria: -1, moral: 2 },
              terrainEffects: { combustible: -22, accesibilidad: 7, cortafuegos: 5 },
              indicators: [
                { icon: '🔥', text: 'Reduce combustible', tone: 'good' },
                { icon: '🛣️', text: 'Mejora acceso', tone: 'good' },
                { icon: '💰', text: 'Coste alto', tone: 'warn' }
              ],
              diagnosisHint: 'La zona sur quedó con combustible residual al priorizar la ladera norte.'
            },
            {
              id: 'b',
              text: 'Solo despejar entorno de viviendas críticas',
              recommended: false,
              resourceEffects: { dinero: -140, apoyo: 3 },
              terrainEffects: { combustible: -9, cortafuegos: 3 },
              indicators: [
                { icon: '🏘️', text: 'Protección local', tone: 'good' },
                { icon: '🔥', text: 'Impacto limitado', tone: 'warn' }
              ],
              diagnosisHint: 'La estrategia parcial dejó corredores de propagación sin intervenir.'
            },
            {
              id: 'c',
              text: 'No actuar (opción gratuita)',
              recommended: false,
              resourceEffects: { apoyo: -6, moral: -5 },
              terrainEffects: { combustible: 14, accesibilidad: -5 },
              indicators: [
                { icon: '🔥', text: 'Aumenta riesgo', tone: 'bad' },
                { icon: '👥', text: 'Baja confianza', tone: 'bad' }
              ],
              diagnosisHint: 'La inacción en invierno elevó claramente la vulnerabilidad del terreno.'
            }
          ]
        },
        {
          id: 'invierno_2',
          title: 'Invierno · Infraestructura hídrica y cortafuegos',
          context:
            'Debes definir la inversión en puntos de agua rurales y mantenimiento de cortafuegos principales.',
          options: [
            {
              id: 'a',
              text: 'Plan completo: balsas + señalización + mantenimiento continuo',
              recommended: true,
              resourceEffects: { dinero: -310, agua: 18, apoyo: 4 },
              terrainEffects: { cortafuegos: 18, accesibilidad: 4, humedad: 6 },
              indicators: [
                { icon: '💧', text: 'Reserva hídrica', tone: 'good' },
                { icon: '🛡️', text: 'Defensa robusta', tone: 'good' },
                { icon: '💰', text: 'Inversión fuerte', tone: 'warn' }
              ],
              diagnosisHint: 'La inversión hídrica ayudó, aunque el riesgo depende del conjunto de decisiones.'
            },
            {
              id: 'b',
              text: 'Mantenimiento mínimo de cortafuegos existentes',
              recommended: false,
              resourceEffects: { dinero: -120, agua: 4 },
              terrainEffects: { cortafuegos: 6, humedad: 1 },
              indicators: [
                { icon: '🛠️', text: 'Cumplimiento básico', tone: 'warn' },
                { icon: '🔥', text: 'Cobertura limitada', tone: 'warn' }
              ],
              diagnosisHint: 'El mantenimiento mínimo dejó zonas con defensa insuficiente.'
            },
            {
              id: 'c',
              text: 'Aplazar inversión (opción gratuita)',
              recommended: false,
              resourceEffects: { apoyo: -8 },
              terrainEffects: { cortafuegos: -10, humedad: -4, combustible: 6 },
              indicators: [
                { icon: '⏳', text: 'Sin coste inmediato', tone: 'warn' },
                { icon: '🔥', text: 'Riesgo futuro alto', tone: 'bad' }
              ],
              diagnosisHint: 'La falta de mantenimiento de cortafuegos aceleró la propagación del frente.'
            }
          ]
        },
        {
          id: 'invierno_3',
          title: 'Invierno · Cultura preventiva y simulacros',
          context:
            'La coordinación ciudadana afecta al cumplimiento de evacuaciones y al apoyo a las brigadas en verano.',
          options: [
            {
              id: 'a',
              text: 'Simulacros trimestrales + campaña de autoprotección vecinal',
              recommended: true,
              resourceEffects: { dinero: -170, apoyo: 8, moral: 5 },
              terrainEffects: { accesibilidad: 5 },
              indicators: [
                { icon: '👥', text: 'Sube apoyo social', tone: 'good' },
                { icon: '📢', text: 'Mejor coordinación', tone: 'good' }
              ],
              diagnosisHint: 'La campaña comunitaria redujo incidencias de desinformación.'
            },
            {
              id: 'b',
              text: 'Comunicación digital mínima',
              recommended: false,
              resourceEffects: { dinero: -65, apoyo: 1 },
              terrainEffects: {},
              indicators: [
                { icon: '📱', text: 'Coste bajo', tone: 'warn' },
                { icon: '👥', text: 'Cobertura parcial', tone: 'warn' }
              ],
              diagnosisHint: 'La comunicación fue útil, aunque insuficiente para núcleos rurales dispersos.'
            },
            {
              id: 'c',
              text: 'No lanzar campaña (opción gratuita)',
              recommended: false,
              resourceEffects: { apoyo: -10, moral: -4 },
              terrainEffects: {},
              indicators: [
                { icon: '👥', text: 'Baja apoyo vecinal', tone: 'bad' },
                { icon: '🚨', text: 'Mayor caos potencial', tone: 'bad' }
              ],
              diagnosisHint: 'La ausencia de simulacros incrementó la tensión durante la crisis.'
            }
          ]
        }
      ];

export const SUMMER_CAMPAIGN_NODES: CampaignNode[] = [
        {
          id: 'verano_1',
          title: 'Verano · Conato en ladera de alta pendiente',
          context: 'Se detecta una columna de humo con viento ascendente. Decide la respuesta inicial.',
          options: [
            {
              id: 'a',
              text: 'Ataque inicial fuerte: 2 brigadas + 2 descargas aéreas',
              recommended: true,
              resourceEffects: { dinero: -230, agua: -24, brigadas: -1, moral: 3 },
              fireDelta: -30,
              burnedDelta: -6,
              indicators: [
                { icon: '🚁', text: 'Ataque aéreo', tone: 'good' },
                { icon: '💧', text: 'Consumo alto de agua', tone: 'warn' }
              ]
            },
            {
              id: 'b',
              text: 'Despliegue moderado con una brigada',
              recommended: false,
              resourceEffects: { dinero: -120, agua: -12 },
              fireDelta: -14,
              burnedDelta: 0,
              indicators: [
                { icon: '⚖️', text: 'Respuesta equilibrada', tone: 'warn' },
                { icon: '🔥', text: 'Puede quedarse corta', tone: 'warn' }
              ]
            },
            {
              id: 'c',
              text: 'Esperar más datos (opción gratuita)',
              recommended: false,
              resourceEffects: { apoyo: -4, moral: -3 },
              fireDelta: 16,
              burnedDelta: 7,
              indicators: [
                { icon: '⏱️', text: 'Demora táctica', tone: 'bad' },
                { icon: '🔥', text: 'Frente crece', tone: 'bad' }
              ]
            }
          ]
        },
        {
          id: 'verano_2',
          title: 'Verano · Cambio de viento hacia zona habitada',
          context: 'El frente gira y amenaza viviendas y explotaciones. Decide la evacuación operativa.',
          options: [
            {
              id: 'a',
              text: 'Evacuar personas y animales con corredores seguros',
              recommended: true,
              resourceEffects: { dinero: -150, brigadas: -1, apoyo: 6 },
              fireDelta: -10,
              burnedDelta: -4,
              indicators: [
                { icon: '🚌', text: 'Evacuación completa', tone: 'good' },
                { icon: '👥', text: 'Sube confianza', tone: 'good' }
              ]
            },
            {
              id: 'b',
              text: 'Evacuar solo personas',
              recommended: false,
              resourceEffects: { dinero: -90, apoyo: -2 },
              fireDelta: -4,
              burnedDelta: 3,
              indicators: [
                { icon: '🏘️', text: 'Protección parcial', tone: 'warn' },
                { icon: '🐄', text: 'Impacto rural', tone: 'warn' }
              ]
            },
            {
              id: 'c',
              text: 'Sin evacuación por ahora (opción gratuita)',
              recommended: false,
              resourceEffects: { apoyo: -11, moral: -6 },
              fireDelta: 12,
              burnedDelta: 8,
              indicators: [
                { icon: '⚠️', text: 'Riesgo humano', tone: 'bad' },
                { icon: '🔥', text: 'Más exposición', tone: 'bad' }
              ]
            }
          ]
        },
        {
          id: 'verano_3',
          title: 'Verano · Defensa nocturna del perímetro',
          context: 'Con menor visibilidad, decide cómo sostener la línea sin colapsar a las brigadas.',
          options: [
            {
              id: 'a',
              text: 'Relevos coordinados + defensa en puntos críticos',
              recommended: true,
              resourceEffects: { dinero: -130, agua: -14, moral: 5 },
              fireDelta: -18,
              burnedDelta: -5,
              indicators: [
                { icon: '🛡️', text: 'Contención progresiva', tone: 'good' },
                { icon: '👨‍🚒', text: 'Menor fatiga', tone: 'good' }
              ]
            },
            {
              id: 'b',
              text: 'Ataque directo continuo sin relevo',
              recommended: false,
              resourceEffects: { dinero: -80, moral: -12, brigadas: -2 },
              fireDelta: -12,
              burnedDelta: 4,
              indicators: [
                { icon: '⚔️', text: 'Alta exposición', tone: 'bad' },
                { icon: '😮‍💨', text: 'Fatiga operativa', tone: 'bad' }
              ]
            },
            {
              id: 'c',
              text: 'Retirada táctica y protección solo de viviendas (opción gratuita)',
              recommended: false,
              resourceEffects: { apoyo: -5 },
              fireDelta: 8,
              burnedDelta: 10,
              indicators: [
                { icon: '🏠', text: 'Protección local', tone: 'warn' },
                { icon: '🔥', text: 'Bosque más expuesto', tone: 'bad' }
              ]
            }
          ]
        }
      ];

export const CAMPAIGN_CONTENT: CampaignContent = {
  winterNodes: WINTER_CAMPAIGN_NODES,
  summerNodes: SUMMER_CAMPAIGN_NODES
};


