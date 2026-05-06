import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { EMERGENCY_TRAINING_SCENARIOS } from '../src/domain/entities/emergency-training-content.js';

const root = 'src/content/scenarios';

const phaseByCategory: Record<string, string> = {
  prevencion: 'prevencion',
  operaciones: 'crisis',
  evacuacion: 'crisis',
  comunicacion: 'alerta',
  postincendio: 'recuperacion'
};

function toExportName(id: string): string {
  const parts = id.split(/[^a-zA-Z0-9]+/).filter(Boolean);

  return parts
    .map((part, index) => {
      const normalized = part.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      if (index === 0) return normalized.toLowerCase();

      return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    })
    .join('');
}

function collectTsFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);

    if (entry.isDirectory()) return collectTsFiles(path);
    if (entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'index.ts') {
      return [path];
    }

    return [];
  });
}

for (const oldScenario of EMERGENCY_TRAINING_SCENARIOS) {
  const dir = join(root, oldScenario.category);
  mkdirSync(dir, { recursive: true });

  const exportName = toExportName(oldScenario.id);
  const filePath = join(dir, `${oldScenario.id}.ts`);
  const scenario = {
    id: oldScenario.id,
    title: oldScenario.title,
    category: oldScenario.category,
    phase: phaseByCategory[oldScenario.category] ?? 'crisis',
    block: oldScenario.category,
    difficulty: 'media',
    estimatedTime: '2 min',
    tags: [oldScenario.category],
    status: 'available',
    context: oldScenario.context,
    question: oldScenario.context.includes('¿')
      ? '¿Qué decisión tomas?'
      : '¿Cómo respondes ante este escenario?',
    briefing: oldScenario.context,
    requirements: null,
    options: oldScenario.options.map((option) => ({
      id: option.id,
      text: option.text,
      evaluation: option.recommended ? 'recommended' : 'risky',
      severity: option.recommended ? 'medium' : 'high',
      rationale: option.rationale,
      shortFeedback: option.rationale,
      impacts: option.impacts,
      mediaOutputs: [],
      flags: []
    })),
    unlocks: [],
    sourceNotes: ['Migrado desde EMERGENCY_TRAINING_SCENARIOS.']
  };

  const body = `import type { Scenario } from '../../../domain/types/scenario.js';\n\nexport const ${exportName}: Scenario = ${JSON.stringify(
    scenario,
    null,
    2
  )};\n`;

  writeFileSync(filePath, body, 'utf8');
}

const files = collectTsFiles(root).sort((a, b) => a.localeCompare(b));
const imports: string[] = [];
const names: string[] = [];

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const match = content.match(/export const (\w+): Scenario/);

  if (!match) continue;

  const name = match[1];
  const importPath = `./${relative(root, file).replace(/\\/g, '/').replace(/\.ts$/, '.js')}`;

  imports.push(`import { ${name} } from '${importPath}';`);
  names.push(name);
}

const index = `import type { Scenario } from '../../domain/types/scenario.js';\n${imports.join(
  '\n'
)}\n\nexport {\n  ${names.join(',\n  ')}\n};\n\nexport const NEW_GAME_SCENARIOS: Scenario[] = [\n  ${names.join(
  ',\n  '
)}\n];\n`;

writeFileSync(join(root, 'index.ts'), index, 'utf8');

console.log(
  `Migrados ${EMERGENCY_TRAINING_SCENARIOS.length} escenarios. Catálogo total: ${names.length}.`
);
