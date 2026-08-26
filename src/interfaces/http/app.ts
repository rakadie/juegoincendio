import Fastify, { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import {
  VerticalBetaApplicationError,
  VerticalBetaApplicationService,
  type VerticalBetaApplicationView,
  type VerticalBetaResumeCommand
} from '../../application/vertical-beta/vertical-beta-application-service.js';
import {
  createVerticalBetaRuntimeContext,
  VERTICAL_BETA_REFERENCE_CONTEXT,
  type VerticalBetaRuntimeContext
} from '../../application/vertical-beta/vertical-beta-runtime-context.js';
import {
  presentSceneVisualModel,
  type PresentedSceneVisualModel
} from '../../application/vertical-beta/vertical-beta-visual-presenter.js';
import { VERTICAL_BETA_PLAYER_CONTENT } from '../../content/vertical-beta-player-content.js';
import { registerImageRoutes } from './image-routes.js';
import { M4_PLAYER_LOOP_CLIENT } from './m4-player-loop-client.js';
import { renderPrototypePage } from './prototype-page.js';
import { renderSceneVisual } from './scene-visual-renderer.js';

export interface BuildAppOptions {
  readonly context?: VerticalBetaRuntimeContext;
}

export interface VerticalBetaHttpView extends VerticalBetaApplicationView {
  readonly context: VerticalBetaRuntimeContext;
  readonly visual: PresentedSceneVisualModel;
  readonly visualMarkup: string;
}

const MAX_RESUME_COMMANDS = 32;

function parseResumeCommands(value: unknown): readonly VerticalBetaResumeCommand[] {
  if (!Array.isArray(value) || value.length > MAX_RESUME_COMMANDS) {
    throw new VerticalBetaApplicationError('unsupported-command', 'Invalid resume command journal.');
  }
  return value.map((command) => {
    if (command === null || typeof command !== 'object' || Array.isArray(command)) {
      throw new VerticalBetaApplicationError('unsupported-command', 'Invalid resume command.');
    }
    const candidate = command as Record<string, unknown>;
    if (candidate.type === 'advance') return { type: 'advance' } as const;
    if (
      candidate.type === 'action' &&
      typeof candidate.actionId === 'string' &&
      candidate.actionId.trim() !== ''
    ) {
      return { type: 'action', actionId: candidate.actionId } as const;
    }
    throw new VerticalBetaApplicationError('unsupported-command', 'Invalid resume command.');
  });
}

export function buildApp(options: BuildAppOptions = {}): FastifyInstance {
  const context = createVerticalBetaRuntimeContext(
    options.context ?? VERTICAL_BETA_REFERENCE_CONTEXT
  );
  const verticalBeta = new VerticalBetaApplicationService();
  const app = Fastify();
  const present = (view: VerticalBetaApplicationView): VerticalBetaHttpView => {
    const visual = presentSceneVisualModel(view.session);
    return {
      context,
      ...view,
      visual,
      visualMarkup: renderSceneVisual(visual)
    };
  };
  const renderPlayerPage = () =>
    renderPrototypePage().replace(
      '    <script>\n',
      '    <script src="/assets/m4-player-loop.js"></script>\n    <script>\n'
    );

  app.setErrorHandler((error, _request, reply) => {
    const isKnownDomainError = error instanceof Error && 'code' in error;
    const statusCode =
      error instanceof VerticalBetaApplicationError && error.code === 'session-not-found'
        ? 404
        : isKnownDomainError
          ? 400
          : 500;
    reply.status(statusCode).send({
      code: isKnownDomainError ? error.code : 'request-failed',
      message: error instanceof Error ? error.message : 'The request could not be completed.'
    });
  });

  app.get('/health', async () => ({
    status: 'ok',
    referenceContextId: context.referenceContextId,
    randomness: context.randomness
  }));

  app.get('/api/vertical-beta/context', async () => context);
  app.get('/api/vertical-beta/content', async () => VERTICAL_BETA_PLAYER_CONTENT);

  app.post('/api/game-sessions', async () => present(verticalBeta.create(randomUUID())));

  app.get<{ Params: { sessionId: string } }>(
    '/api/game-sessions/:sessionId',
    async (request) => present(verticalBeta.view(request.params.sessionId))
  );

  app.post<{ Params: { sessionId: string } }>(
    '/api/game-sessions/:sessionId/restart',
    async (request) => present(verticalBeta.restart(request.params.sessionId))
  );

  app.post<{
    Params: { sessionId: string };
    Body: {
      resumeSchemaVersion?: unknown;
      referenceContextId?: unknown;
      commands?: unknown;
    };
  }>(
    '/api/game-sessions/:sessionId/restore',
    async (request) => {
      if (
        request.body?.resumeSchemaVersion !== 1 ||
        request.body?.referenceContextId !== context.referenceContextId
      ) {
        throw new VerticalBetaApplicationError(
          'unsupported-command',
          'Resume journal version or reference context is incompatible.'
        );
      }
      const commands = parseResumeCommands(request.body.commands);
      return present(verticalBeta.restore(request.params.sessionId, commands));
    }
  );

  app.post<{ Params: { sessionId: string }; Body: { actionId?: string } }>(
    '/api/game-sessions/:sessionId/actions',
    async (request) => {
      if (typeof request.body?.actionId !== 'string' || request.body.actionId.trim() === '') {
        throw new VerticalBetaApplicationError(
          'unsupported-command',
          'A non-empty actionId is required.'
        );
      }
      return present(verticalBeta.applyAction(request.params.sessionId, request.body.actionId));
    }
  );

  app.post<{ Params: { sessionId: string } }>(
    '/api/game-sessions/:sessionId/advance',
    async (request) => present(verticalBeta.advance(request.params.sessionId))
  );

  app.get('/assets/m4-player-loop.js', async (_request, reply) => {
    reply.type('application/javascript; charset=utf-8');
    return M4_PLAYER_LOOP_CLIENT;
  });

  registerImageRoutes(app);

  app.get('/', async (_request, reply) => {
    reply.type('text/html; charset=utf-8');
    return renderPlayerPage();
  });

  app.get('/prototype', async (_request, reply) => {
    reply.type('text/html; charset=utf-8');
    return renderPlayerPage();
  });

  return app;
}
