import { VERTICAL_BETA_FLOW } from '../../content/vertical-beta-catalog.js';
import type { CanonicalSceneId, CrisisBranch } from '../types/game-scene.js';
import {
  INHERITED_STATE_KEYS,
  type GameResult,
  type GameSession,
  type GameSessionCommand,
  type GameSessionEvent,
  type InheritedState
} from './game-session.js';
import { validateGameSessionContract } from './game-session-validator.js';

export type GameSessionCommandErrorCode =
  | 'invalid-session'
  | 'inactive-session'
  | 'scene-mismatch'
  | 'invalid-decision'
  | 'duplicate-scene-completion'
  | 'invalid-inherited-state'
  | 'invalid-command-order'
  | 'invalid-transition'
  | 'branch-path-mismatch'
  | 'invalid-result';

export class GameSessionCommandError extends Error {
  constructor(
    readonly code: GameSessionCommandErrorCode,
    message: string
  ) {
    super(message);
    this.name = 'GameSessionCommandError';
  }
}

const transitionsByScene = new Map(
  VERTICAL_BETA_FLOW.map((scene) => [
    scene.id,
    new Set<CanonicalSceneId>(scene.transitions.map((transition) => transition.target))
  ])
);

const branchOpening = {
  prepared: 'crisis-decision-emergency-fuel-break',
  vulnerable: 'crisis-decision-access-blockage'
} as const satisfies Readonly<Record<CrisisBranch, CanonicalSceneId>>;

const branchAfterRavine: Readonly<Record<CrisisBranch, CanonicalSceneId>> = {
  prepared: 'crisis-decision-housing-defense',
  vulnerable: 'crisis-decision-crown-fire'
};

const branchClosing: Readonly<Record<CrisisBranch, CanonicalSceneId>> = {
  prepared: 'crisis-decision-housing-defense',
  vulnerable: 'crisis-decision-crown-fire'
};

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function nextEventSequence(session: GameSession): number {
  return session.history.length + 1;
}

function assertNonEmpty(value: string, code: GameSessionCommandErrorCode, label: string): void {
  if (value.trim().length === 0) throw new GameSessionCommandError(code, `${label} cannot be empty.`);
}

function assertUniqueStrings(
  values: readonly string[],
  code: GameSessionCommandErrorCode,
  label: string
): void {
  if (values.some((value) => value.trim().length === 0) || new Set(values).size !== values.length) {
    throw new GameSessionCommandError(code, `${label} must contain unique non-empty strings.`);
  }
}

function assertInheritedState(state: InheritedState): void {
  for (const key of INHERITED_STATE_KEYS) {
    const value = state[key];
    if (!Number.isInteger(value) || value < 0 || value > 100) {
      throw new GameSessionCommandError(
        'invalid-inherited-state',
        `${key} must be an integer between 0 and 100.`
      );
    }
  }
}

function assertValid(session: GameSession): void {
  const validation = validateGameSessionContract(session);
  if (!validation.valid) {
    const first = validation.errors[0];
    throw new GameSessionCommandError(
      'invalid-session',
      `${first.code} at ${first.path}: ${first.message}`
    );
  }
}

function assertActive(session: GameSession): void {
  if (session.status !== 'active') {
    throw new GameSessionCommandError('inactive-session', 'A completed session cannot accept commands.');
  }
}

function withEvent(session: GameSession, event: GameSessionEvent): GameSession {
  return { ...session, history: [...session.history, event] };
}

function expectedBranchTarget(
  from: CanonicalSceneId,
  branch: CrisisBranch | null
): CanonicalSceneId | undefined {
  if (branch === null) return undefined;
  if (from === 'crisis-router-causal-map') return branchOpening[branch];
  if (from === 'crisis-decision-ravine-fire') return branchAfterRavine[branch];
  if (from === branchClosing[branch]) return 'ending-result-causal-report';
  return undefined;
}

export function createGameSession(sessionId: string): GameSession {
  assertNonEmpty(sessionId, 'invalid-session', 'Session ID');
  const session: GameSession = {
    schemaVersion: 1,
    id: sessionId,
    status: 'active',
    progress: { currentSceneId: 'intro-briefing-mission', completedSceneIds: [] },
    decisions: [],
    inheritedState: null,
    crisisBranch: null,
    result: null,
    history: [
      {
        sequence: 1,
        type: 'session-created',
        sessionId,
        schemaVersion: 1,
        initialSceneId: 'intro-briefing-mission'
      }
    ]
  };
  assertValid(session);
  return deepFreeze(session);
}

export function executeGameSessionCommand(
  current: GameSession,
  command: GameSessionCommand
): GameSession {
  assertValid(current);
  assertActive(current);
  let session = clone(current);
  const sequence = nextEventSequence(session);

  switch (command.type) {
    case 'apply-decision': {
      if (command.sceneId !== session.progress.currentSceneId) {
        throw new GameSessionCommandError('scene-mismatch', 'Decision scene is not current.');
      }
      assertNonEmpty(command.actionId, 'invalid-decision', 'Action ID');
      if (
        session.decisions.some(
          (decision) =>
            decision.sceneId === command.sceneId && decision.actionId === command.actionId
        )
      ) {
        throw new GameSessionCommandError(
          'invalid-decision',
          'The same action cannot be applied twice in one scene.'
        );
      }
      const decisionSequence = session.decisions.length + 1;
      session = {
        ...session,
        decisions: [
          ...session.decisions,
          { sequence: decisionSequence, sceneId: command.sceneId, actionId: command.actionId }
        ]
      };
      session = withEvent(session, {
        sequence,
        type: 'decision-applied',
        decisionSequence,
        sceneId: command.sceneId,
        actionId: command.actionId
      });
      break;
    }

    case 'complete-scene': {
      if (command.sceneId !== session.progress.currentSceneId) {
        throw new GameSessionCommandError('scene-mismatch', 'Completed scene is not current.');
      }
      if (session.progress.completedSceneIds.includes(command.sceneId)) {
        throw new GameSessionCommandError(
          'duplicate-scene-completion',
          'A scene can only be completed once.'
        );
      }
      assertUniqueStrings(command.evidenceIds, 'invalid-command-order', 'Evidence IDs');
      session = {
        ...session,
        progress: {
          ...session.progress,
          completedSceneIds: [...session.progress.completedSceneIds, command.sceneId]
        }
      };
      session = withEvent(session, {
        sequence,
        type: 'scene-completed',
        sceneId: command.sceneId,
        evidenceIds: [...command.evidenceIds]
      });
      break;
    }

    case 'record-inherited-state': {
      if (
        session.progress.currentSceneId !== 'prevention-inspection-housing-interface' ||
        !session.progress.completedSceneIds.includes('prevention-inspection-housing-interface') ||
        session.inheritedState !== null
      ) {
        throw new GameSessionCommandError(
          'invalid-command-order',
          'InheritedState is recorded once, immediately after the housing inspection.'
        );
      }
      assertInheritedState(command.state);
      assertUniqueStrings(command.evidenceIds, 'invalid-inherited-state', 'Evidence IDs');
      const preventionSequences = session.decisions
        .filter((decision) =>
          [
            'prevention-inspection-territory-fuel',
            'prevention-inspection-housing-interface'
          ].includes(decision.sceneId)
        )
        .map((decision) => decision.sequence);
      if (JSON.stringify(preventionSequences) !== JSON.stringify(command.sourceDecisionSequences)) {
        throw new GameSessionCommandError(
          'invalid-inherited-state',
          'Source sequences must match all prior prevention decisions in order.'
        );
      }
      session = { ...session, inheritedState: clone(command.state) };
      session = withEvent(session, {
        sequence,
        type: 'inherited-state-calculated',
        state: clone(command.state),
        sourceDecisionSequences: [...command.sourceDecisionSequences],
        evidenceIds: [...command.evidenceIds]
      });
      break;
    }

    case 'select-crisis-branch': {
      if (
        session.progress.currentSceneId !== 'crisis-router-causal-map' ||
        session.inheritedState === null ||
        session.crisisBranch !== null
      ) {
        throw new GameSessionCommandError(
          'invalid-command-order',
          'The branch is selected once at the causal router with InheritedState available.'
        );
      }
      assertUniqueStrings(command.evidenceIds, 'branch-path-mismatch', 'Evidence IDs');
      const nextSceneId = branchOpening[command.branch];
      session = { ...session, crisisBranch: command.branch };
      session = withEvent(session, {
        sequence,
        type: 'crisis-branch-selected',
        branch: command.branch,
        nextSceneId,
        evidenceIds: [...command.evidenceIds]
      });
      break;
    }

    case 'transition-scene': {
      const fromSceneId = session.progress.currentSceneId;
      if (!session.progress.completedSceneIds.includes(fromSceneId)) {
        throw new GameSessionCommandError(
          'invalid-command-order',
          'The current scene must be completed before transition.'
        );
      }
      if (!transitionsByScene.get(fromSceneId)?.has(command.toSceneId)) {
        throw new GameSessionCommandError(
          'invalid-transition',
          `${fromSceneId} -> ${command.toSceneId} is not a canonical transition.`
        );
      }
      const branchTarget = expectedBranchTarget(fromSceneId, session.crisisBranch);
      if (branchTarget !== undefined && branchTarget !== command.toSceneId) {
        throw new GameSessionCommandError(
          'branch-path-mismatch',
          `The ${session.crisisBranch} branch requires transition to ${branchTarget}.`
        );
      }
      if (fromSceneId === 'crisis-router-causal-map' && session.crisisBranch === null) {
        throw new GameSessionCommandError(
          'invalid-command-order',
          'The causal branch must be selected before leaving the router.'
        );
      }
      session = {
        ...session,
        progress: { ...session.progress, currentSceneId: command.toSceneId }
      };
      session = withEvent(session, {
        sequence,
        type: 'scene-transitioned',
        fromSceneId,
        toSceneId: command.toSceneId
      });
      break;
    }

    case 'complete-session': {
      if (
        session.progress.currentSceneId !== 'ending-result-causal-report' ||
        !session.progress.completedSceneIds.includes('ending-result-causal-report') ||
        session.crisisBranch === null
      ) {
        throw new GameSessionCommandError(
          'invalid-command-order',
          'The terminal scene and a causal branch are required before completion.'
        );
      }
      assertUniqueStrings(command.result.evidenceIds, 'invalid-result', 'Result evidence IDs');
      const expectedVariant = session.crisisBranch === 'prepared' ? 'contained' : 'overwhelmed';
      if (command.result.variant !== expectedVariant) {
        throw new GameSessionCommandError(
          'invalid-result',
          `The ${session.crisisBranch} branch requires result ${expectedVariant}.`
        );
      }
      session = { ...session, status: 'completed', result: clone(command.result) };
      session = withEvent(session, {
        sequence,
        type: 'session-completed',
        result: clone(command.result)
      });
      break;
    }
  }

  assertValid(session);
  return deepFreeze(session);
}

function applyEvent(session: GameSession, event: GameSessionEvent): GameSession {
  switch (event.type) {
    case 'session-created':
      return createGameSession(event.sessionId);
    case 'decision-applied':
      return {
        ...session,
        decisions: [
          ...session.decisions,
          {
            sequence: event.decisionSequence,
            sceneId: event.sceneId,
            actionId: event.actionId
          }
        ],
        history: [...session.history, clone(event)]
      };
    case 'scene-completed':
      return {
        ...session,
        progress: {
          ...session.progress,
          completedSceneIds: [...session.progress.completedSceneIds, event.sceneId]
        },
        history: [...session.history, clone(event)]
      };
    case 'inherited-state-calculated':
      return {
        ...session,
        inheritedState: clone(event.state),
        history: [...session.history, clone(event)]
      };
    case 'crisis-branch-selected':
      return {
        ...session,
        crisisBranch: event.branch,
        history: [...session.history, clone(event)]
      };
    case 'scene-transitioned':
      return {
        ...session,
        progress: { ...session.progress, currentSceneId: event.toSceneId },
        history: [...session.history, clone(event)]
      };
    case 'session-completed':
      return {
        ...session,
        status: 'completed',
        result: clone(event.result),
        history: [...session.history, clone(event)]
      };
  }
}

export function replayGameSession(events: readonly GameSessionEvent[]): GameSession {
  const first = events[0];
  if (first?.type !== 'session-created' || first.sequence !== 1) {
    throw new GameSessionCommandError(
      'invalid-session',
      'Replay must start with event 1 session-created.'
    );
  }
  let session = createGameSession(first.sessionId);
  for (const event of events.slice(1)) session = applyEvent(session, event);
  assertValid(session);
  return deepFreeze(session);
}

export function serializeGameSession(session: GameSession): string {
  assertValid(session);
  return JSON.stringify(session);
}

export function deserializeGameSession(serialized: string): GameSession {
  let parsed: unknown;
  try {
    parsed = JSON.parse(serialized);
  } catch {
    throw new GameSessionCommandError('invalid-session', 'Session JSON is malformed.');
  }
  const validation = validateGameSessionContract(parsed);
  if (!validation.valid) {
    const first = validation.errors[0];
    throw new GameSessionCommandError(
      'invalid-session',
      `${first.code} at ${first.path}: ${first.message}`
    );
  }
  return deepFreeze(parsed as GameSession);
}

export function resultForBranch(
  branch: CrisisBranch,
  evidenceIds: readonly string[]
): GameResult {
  return {
    variant: branch === 'prepared' ? 'contained' : 'overwhelmed',
    evidenceIds: [...evidenceIds]
  };
}
