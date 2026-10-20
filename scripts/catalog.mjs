import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { checkIndex } from './catalog-index.mjs';

export const fields = ['id','name','url','platform','publisher','category','resource_type','license','verification_level','editorial_verdict'];
export const requiredFields = ['id','name','url','platform','category','resource_type','verification_level'];
const requiredArrays = ['activities','industries'];
const optionalArrays = ['source_urls'];
const strings = ['id','name','url','platform','publisher','category','resource_type','license','verification_level','editorial_verdict','execution_environment','codex_compatibility','upstream_description','catalog_description','description_status','industry_tag_status','technical_notes','personal_impressions'];
const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const reportsHandsOnTest = value => /(?:^|[;.]\s*)hands[- ]on tested(?:$|[;.]|\s)/i.test(value) && !/(?:not|no)\s+hands[- ]on tested/i.test(value);
const quote = v => '"' + String(v ?? '').replaceAll('"', '""') + '"';

export function csvFor(document) {
  const rows = document.resources;
  return [fields.join(','), ...rows.map(r => fields.map(f => quote(r[f])).join(','))].join('\n') + '\n';
}

export function validate(document) {
  const failures = [];
  const assert = (condition, message) => { if (!condition) failures.push(message); };
  assert(document !== null && typeof document === 'object' && !Array.isArray(document), 'catalog must be an object');
  if (document === null || typeof document !== 'object' || Array.isArray(document)) return failures;
  assert(typeof document.schema_version === 'string' && document.schema_version.trim() !== '', 'schema_version must be a non-empty string');
  if (document.updated_at !== undefined) assert(validDate(document.updated_at), 'updated_at must be a valid YYYY-MM-DD date');
  assert(Array.isArray(document.resources), 'resources must be an array');
  if (!Array.isArray(document.resources)) return failures;

  const ids = new Set(), urls = new Set();
  document.resources.forEach((resource, index) => {
    const label = `resources[${index}]`;
    assert(resource !== null && typeof resource === 'object' && !Array.isArray(resource), `${label}: resource must be an object`);
    if (resource === null || typeof resource !== 'object' || Array.isArray(resource)) return;
    for (const key of requiredFields) assert(typeof resource[key] === 'string' && resource[key].trim() !== '', `${label}: ${key} must be a non-empty string`);
    for (const key of strings) {
      if (resource[key] !== undefined && resource[key] !== null) assert(typeof resource[key] === 'string', `${label}: ${key} must be a string or null`);
    }
    for (const key of [...requiredArrays, ...optionalArrays]) {
      if (requiredArrays.includes(key) || resource[key] !== undefined) {
        assert(Array.isArray(resource[key]), `${label}: ${key} must be an array`);
        if (Array.isArray(resource[key])) resource[key].forEach((entry, i) => {
          if (key === 'source_urls') {
            try {
              const url = new URL(entry);
              assert(typeof entry === 'string' && url.protocol === 'https:', `${label}: source_urls[${i}] must be a valid HTTPS URL`);
            } catch { failures.push(`${label}: source_urls[${i}] must be a valid HTTPS URL`); }
          } else assert(typeof entry === 'string' && entry.trim() !== '', `${label}: ${key}[${i}] must be a non-empty string`);
        });
      }
    }
    assert(/^fav-\d{3,}$/.test(typeof resource.id === 'string' ? resource.id : ''), `${label}: bad ID`);
    if (typeof resource.id === 'string') {
      assert(!ids.has(resource.id), `${label}: duplicate ID ${resource.id}`);
      ids.add(resource.id);
    }
    let normalized;
    try {
      assert(typeof resource.url === 'string', `${label}: url must be a string`);
      const u = new URL(resource.url);
      assert(u.protocol === 'https:', `${label}: expected HTTPS URL`);
      normalized = `${u.hostname}${u.pathname.replace(/\/+$/, '')}`.toLowerCase();
    } catch { failures.push(`${label}: invalid URL`); }
    if (normalized) {
      assert(!urls.has(normalized), `${label}: duplicate URL ${resource.url}`);
      urls.add(normalized);
    }
    assert(typeof resource.hands_on_tested === 'boolean', `${label}: hands_on_tested must be a boolean`);
    if (resource.reviewed_at !== undefined && resource.reviewed_at !== null) assert(validDate(resource.reviewed_at), `${label}: reviewed_at must be a valid YYYY-MM-DD date or null`);
    if (resource.hands_on_tested === true) assert(typeof resource.verification_level === 'string' && reportsHandsOnTest(resource.verification_level), `${label}: tested resources must identify hands-on testing in verification_level`);
    if (typeof resource.verification_level === 'string' && reportsHandsOnTest(resource.verification_level)) assert(resource.hands_on_tested === true, `${label}: verification_level claims hands-on testing but hands_on_tested is not true`);
    for (const key of ['editorial_verdict','personal_impressions']) if (resource[key] !== undefined) assert(typeof resource[key] === 'string' || resource[key] === null, `${label}: ${key} must be a string or null`);
  });
  return failures;
}

export function checkFiles(jsonText, csvText) {
  let document;
  try { document = JSON.parse(jsonText); } catch (err) { return { failures: [`Invalid JSON: ${err.message}`] }; }
  const failures = validate(document);
  let expected;
  if (document && Array.isArray(document.resources)) expected = csvFor(document);
  if (expected !== undefined && csvText !== expected) failures.push('CSV is out of sync; run npm run catalog:sync');
  return { failures, document };
}

export function runCatalog(mode, base) {
  const jsonFile = resolve(base, 'catalog/resources.json');
  const csvFile = resolve(base, 'catalog/resources.csv');
  const jsonText = readFileSync(jsonFile, 'utf8');
  let document;
  try { document = JSON.parse(jsonText); } catch (err) { return { code: 1, output: `Invalid JSON: ${err.message}` }; }
  const failures = validate(document);
  if (failures.length) return { code: 1, output: failures.join('\n') };
  if (mode === 'check') {
    let indexText;
    try { indexText = readFileSync(resolve(base, 'catalog/README.md'), 'utf8'); }
    catch (error) {
      if (error.code !== 'ENOENT') throw error;
      indexText = '';
    }
    const indexResult = checkIndex(jsonText, indexText, id => existsSync(resolve(base, 'reviews/drafts', `${id}.md`)));
    if (indexResult.failures.length) return { code: 1, output: indexResult.failures.join('\n') };
  }
  const expected = csvFor(document);
  if (mode === 'sync') {
    writeFileSync(csvFile, expected);
    return { code: 0, output: `Updated CSV for ${document.resources.length} resources` };
  }
  if (readFileSync(csvFile, 'utf8') !== expected) return { code: 1, output: 'CSV is out of sync; run npm run catalog:sync' };
  return { code: 0, output: `Validated ${document.resources.length} resources and synchronized CSV` };
}

if (process.argv[1] && import.meta.url === new URL(`file://${resolve(process.argv[1])}`).href) {
  const base = resolve(import.meta.dirname, '..');
  const mode = process.argv[2];
  if (mode !== 'check' && mode !== 'sync') { console.error('Use: node scripts/catalog.mjs <check|sync>'); process.exit(2); }
  const result = runCatalog(mode, base);
  if (result.code) { console.error(result.output); process.exit(result.code); }
  console.log(result.output);
}
