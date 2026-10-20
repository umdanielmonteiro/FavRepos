import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';

export function validateIndexDocument(document) {
  if (!document || typeof document !== 'object' || Array.isArray(document) || !Array.isArray(document.resources)) return ['Catalog resources must be an array'];
  return document.resources.flatMap((resource, index) => {
    if (!resource || typeof resource !== 'object' || Array.isArray(resource)) return [`resources[${index}]: resource must be an object`];
    const failures = [];
    for (const field of ['id', 'name', 'url', 'category', 'resource_type', 'verification_level']) {
      if (typeof resource[field] !== 'string' || resource[field].trim() === '') failures.push(`resources[${index}]: ${field} must be a non-empty string`);
    }
    return failures;
  });
}

export function indexFor(document, hasDraft = () => false) {
  const validationFailures = validateIndexDocument(document);
  if (validationFailures.length) throw new Error(validationFailures.join('\n'));
  const groups = new Map();
  for (const resource of document.resources) {
    if (!groups.has(resource.category)) groups.set(resource.category, []);
    groups.get(resource.category).push(resource);
  }
  const lines = [
    '# Catálogo FavRepos',
    '',
    'Índice gerado a partir de [`resources.json`](resources.json). A inclusão no catálogo não significa recomendação, endosso ou certificação de segurança.',
    '',
    '## Níveis de verificação',
    '',
    'O nível resume a evidência registrada: **Preliminary** indica classificação sem inspeção da fonte; **Documentation inspected** indica documentação consultada; **Source inspected** indica implementação ou configuração examinada; **Hands-on tested** indica teste local reproduzível registrado. O texto específico de cada recurso pode detalhar escopo e limitações.',
    '',
  ];
  const collator = new Intl.Collator('en', { sensitivity: 'base' });
  for (const category of [...groups.keys()].sort(collator.compare)) {
    lines.push(`## ${category}`, '');
    const resources = groups.get(category).sort((a, b) => collator.compare(a.name, b.name) || collator.compare(a.id, b.id));
    for (const resource of resources) {
      const draft = hasDraft(resource.id) ? ` · [Review/draft](../reviews/drafts/${resource.id}.md)` : '';
      lines.push(`- **${resource.id}** — [${resource.name}](${resource.url}) · ${resource.resource_type} · ${resource.verification_level}${draft}`);
    }
    lines.push('');
  }
  lines.push('---', '', '[README principal](../README.md) · [JSON canônico](resources.json) · [CSV](resources.csv) · [Metodologia](../docs/METHODOLOGY.md)', '');
  return lines.join('\n');
}

export function checkIndex(jsonText, indexText, hasDraft) {
  let document;
  try { document = JSON.parse(jsonText); } catch (error) { return { failures: [`Invalid JSON: ${error.message}`] }; }
  const invalid = validateIndexDocument(document);
  if (invalid.length) return { failures: invalid };
  const ids = document.resources.map(resource => resource.id);
  const failures = [];
  if (new Set(ids).size !== ids.length) failures.push('Catalog contains duplicate IDs');
  const expected = indexFor(document, hasDraft);
  if (indexText !== expected) failures.push('Catalog index is out of date; run npm run catalog:index:sync');
  const listed = [...indexText.matchAll(/\*\*(fav-\d{3,})\*\*/g)].map(match => match[1]);
  if (listed.length !== ids.length || new Set(listed).size !== ids.length || ids.some(id => !listed.includes(id))) {
    failures.push('Catalog index must contain every resource ID exactly once');
  }
  return { failures, expected };
}

if (process.argv[1] && import.meta.url === new URL(`file://${resolve(process.argv[1])}`).href) {
  const base = resolve(import.meta.dirname, '..');
  const mode = process.argv[2];
  if (!['check', 'sync'].includes(mode)) { console.error('Use: node scripts/catalog-index.mjs <check|sync>'); process.exit(2); }
  const jsonText = readFileSync(resolve(base, 'catalog/resources.json'), 'utf8');
  const target = resolve(base, 'catalog/README.md');
  const hasDraft = id => existsSync(resolve(base, 'reviews/drafts', `${id}.md`));
  if (mode === 'sync') {
    const document = JSON.parse(jsonText);
    const failures = validateIndexDocument(document);
    if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
    writeFileSync(target, indexFor(document, hasDraft));
    console.log(`Updated catalog index for ${document.resources.length} resources`);
  } else {
    const result = checkIndex(jsonText, readFileSync(target, 'utf8'), hasDraft);
    if (result.failures.length) { console.error(result.failures.join('\n')); process.exit(1); }
    console.log('Validated catalog index');
  }
}
