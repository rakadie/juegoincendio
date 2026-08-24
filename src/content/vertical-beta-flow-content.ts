import type { ResultVariant } from '../domain/types/game-scene.js';

export const VERTICAL_BETA_BRIEFING = {
  id: 'intro-briefing-mission',
  type: 'briefing',
  title: 'Prepara el territorio antes del incendio',
  body:
    'Inspecciona el territorio y las viviendas. Tus cinco actuaciones cambiaran las condiciones que los equipos encontraran durante la emergencia.',
  continueLabel: 'Iniciar inspeccion'
} as const;

export const VERTICAL_BETA_PREVENTION_SUMMARY = {
  id: 'transition-summary-prevention',
  type: 'summary',
  title: 'Balance preventivo',
  dimensionOrder: [
    'fuelLoad',
    'fuelContinuity',
    'operationalAccess',
    'defensibility',
    'attackOpportunity'
  ],
  continueLabel: 'Comenzar la emergencia'
} as const;

export const VERTICAL_BETA_FIRST_ALERT = {
  id: 'crisis-decision-first-alert',
  type: 'decision',
  title: 'Primer aviso de incendio',
  prompt: 'El primer aviso exige movilizar recursos y verificar las condiciones reales.',
  actions: [
    {
      id: 'movilizar-y-verificar',
      label: 'Movilizar y verificar',
      evidenceIds: ['initial-response-mobilized']
    }
  ]
} as const;

export const VERTICAL_BETA_CAUSAL_ROUTER = {
  id: 'crisis-router-causal-map',
  type: 'router',
  title: 'El territorio condiciona la respuesta',
  body:
    'El recorrido se selecciona automaticamente a partir del balance preventivo. No hay una ruta que elegir.'
} as const;

export interface VerticalBetaResultContent {
  readonly variant: ResultVariant;
  readonly title: string;
  readonly summary: string;
  readonly closing: string;
}

export const VERTICAL_BETA_RESULT_VARIANTS = {
  contained: {
    variant: 'contained',
    title: 'Incendio contenido',
    summary:
      'La preparacion mantuvo acceso, repliegue y una ventana de intervencion dentro de capacidad.',
    closing:
      'La preparacion mejora las opciones, pero no garantiza el control de un incendio real.'
  },
  overwhelmed: {
    variant: 'overwhelmed',
    title: 'Incendio fuera de capacidad',
    summary:
      'Las mejoras de combustible no compensaron las restricciones criticas de acceso y posicion segura.',
    closing:
      'Una mejora real puede no bastar cuando otra condicion critica bloquea la respuesta.'
  }
} as const satisfies Readonly<Record<ResultVariant, VerticalBetaResultContent>>;

export const VERTICAL_BETA_DECLARATIVE_CONTENT = [
  VERTICAL_BETA_BRIEFING,
  VERTICAL_BETA_PREVENTION_SUMMARY,
  VERTICAL_BETA_FIRST_ALERT,
  VERTICAL_BETA_CAUSAL_ROUTER,
  {
    id: 'ending-result-causal-report',
    type: 'result',
    variants: VERTICAL_BETA_RESULT_VARIANTS
  }
] as const;
