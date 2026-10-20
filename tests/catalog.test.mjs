import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkFiles, csvFor, runCatalog, validate } from '../scripts/catalog.mjs';
import { checkIndex, indexFor } from '../scripts/catalog-index.mjs';

const source = JSON.parse(readFileSync(new URL('../catalog/resources.json', import.meta.url), 'utf8'));
const fresh = () => structuredClone(source);

test('accepts current catalog and its current documented values', () => {
  assert.deepEqual(validate(fresh()), []);
});

test('accepts nullable unknowns and descriptive verification text', () => {
  const doc = fresh();
  doc.resources[0].license = null;
  doc.resources[0].codex_compatibility = null;
  doc.resources[0].verification_level = 'Documentation inspected; evidence scope remains limited';
  assert.deepEqual(validate(doc), []);
});

test('accepts string or null catalog descriptions and rejects invalid types', () => {
  const doc = fresh();
  const comfy = doc.resources.find(resource => resource.id === 'fav-014');
  const prompts = doc.resources.find(resource => resource.id === 'fav-016');
  assert.equal(typeof comfy.catalog_description, 'string');
  assert.equal(typeof prompts.catalog_description, 'string');
  assert.deepEqual(validate(doc), []);
  const nullable = fresh();
  nullable.resources.find(resource => resource.id === 'fav-014').catalog_description = null;
  assert.deepEqual(validate(nullable), []);
  for (const value of [17, false, [], {}]) {
    const invalid = fresh();
    invalid.resources.find(resource => resource.id === 'fav-014').catalog_description = value;
    assert.match(validate(invalid).join('\n'), /catalog_description must be a string or null/);
  }
});

test('rejects duplicate IDs and normalized URLs', () => {
  const doc = fresh();
  doc.resources[1].id = doc.resources[0].id;
  doc.resources[1].url = `${doc.resources[0].url}/?ref=duplicate#fragment`;
  const errors = validate(doc).join('\n');
  assert.match(errors, /duplicate ID/);
  assert.match(errors, /duplicate URL/);
});

test('rejects incorrect field types and malformed dates', () => {
  const doc = fresh();
  doc.updated_at = '2026-02-30';
  doc.resources[0].activities = 'transcription';
  doc.resources[0].hands_on_tested = 'false';
  doc.resources[0].reviewed_at = 'yesterday';
  assert.match(validate(doc).join('\n'), /updated_at.*valid/);
  assert.match(validate(doc).join('\n'), /activities must be an array/);
  assert.match(validate(doc).join('\n'), /hands_on_tested must be a boolean/);
  assert.match(validate(doc).join('\n'), /reviewed_at.*valid/);
});

test('requires activities, industries and hands_on_tested', () => {
  for (const key of ['activities', 'industries', 'hands_on_tested']) {
    const doc = fresh();
    delete doc.resources[0][key];
    assert.match(validate(doc).join('\n'), new RegExp(`${key} must be ${key === 'hands_on_tested' ? 'a boolean' : 'an array'}`));
  }
});

test('rejects invalid or non-HTTPS source URLs', () => {
  for (const value of ['not a URL', 'http://example.com/source', 17]) {
    const doc = fresh();
    doc.resources[0].source_urls = [value];
    assert.match(validate(doc).join('\n'), /source_urls\[0\] must be a valid HTTPS URL/);
  }
});

test('rejects inconsistent hands-on evidence in either direction', () => {
  const doc = fresh();
  doc.resources[0].hands_on_tested = true;
  assert.match(validate(doc).join('\n'), /tested resources must identify hands-on testing/);
  doc.resources[0].hands_on_tested = false;
  doc.resources[0].verification_level = 'Hands-on tested';
  assert.match(validate(doc).join('\n'), /claims hands-on testing/);
});

test('rejects missing required values, invalid resource shapes and URL types', () => {
  const doc = fresh();
  doc.resources[0].name = ' ';
  doc.resources[1] = null;
  doc.resources[2].url = 42;
  const errors = validate(doc).join('\n');
  assert.match(errors, /name must be a non-empty string/);
  assert.match(errors, /resource must be an object/);
  assert.match(errors, /url must be a non-empty string/);
});

test('detects stale CSV without writing files', () => {
  const result = checkFiles(JSON.stringify(fresh()), 'id,name\n');
  assert.match(result.failures.join('\n'), /CSV is out of sync/);
});

test('rejects malformed JSON', () => {
  assert.match(checkFiles('{', '').failures[0], /^Invalid JSON:/);
});

test('catalog index generation is deterministic and preserves every ID exactly once', () => {
  const hasDraft = id => {
    try { readFileSync(new URL(`../reviews/drafts/${id}.md`, import.meta.url)); return true; } catch { return false; }
  };
  const first = indexFor(fresh(), hasDraft);
  assert.equal(indexFor(fresh(), hasDraft), first);
  const ids = [...first.matchAll(/\*\*(fav-\d{3,})\*\*/g)].map(match => match[1]);
  assert.equal(ids.length, 53);
  assert.equal(new Set(ids).size, 53);
  assert.deepEqual([...ids].sort(), fresh().resources.map(resource => resource.id).sort());
  assert.deepEqual(checkIndex(JSON.stringify(fresh()), first, hasDraft).failures, []);
});

test('catalog index check detects stale content', () => {
  const result = checkIndex(JSON.stringify(fresh()), '# stale\n', () => false);
  assert.match(result.failures.join('\n'), /out of date/);
  assert.match(result.failures.join('\n'), /every resource ID exactly once/);
});

function withFixture(document, callback, includeIndex = true) {
  const base = mkdtempSync(join(tmpdir(), 'favrepos-index-test-'));
  try {
    mkdirSync(join(base, 'catalog'), { recursive: true });
    mkdirSync(join(base, 'reviews', 'drafts'), { recursive: true });
    writeFileSync(join(base, 'catalog/resources.json'), JSON.stringify(document));
    if (includeIndex) writeFileSync(join(base, 'catalog/README.md'), '# stale index\n');
    writeFileSync(join(base, 'catalog/resources.csv'), 'stale csv\n');
    callback(base);
  } finally {
    rmSync(base, { recursive: true, force: true });
  }
}

test('CSV sync succeeds with stale or missing catalog index', () => {
  const doc = { schema_version: '1.0', resources: [structuredClone(source.resources[0])] };
  withFixture(doc, base => {
    const result = runCatalog('sync', base);
    assert.equal(result.code, 0, result.output);
    assert.equal(readFileSync(join(base, 'catalog/resources.csv'), 'utf8'), csvFor(doc));
  });
  withFixture(doc, base => {
    const result = runCatalog('sync', base);
    assert.equal(result.code, 0, result.output);
    assert.match(readFileSync(join(base, 'catalog/resources.csv'), 'utf8'), /^id,name,url,/);
  }, false);
});

test('index validation remains required and null resources fail with controlled validation', () => {
  const doc = { schema_version: '1.0', resources: [structuredClone(source.resources[0])] };
  withFixture(doc, base => {
    const result = runCatalog('check', base);
    assert.equal(result.code, 1);
    assert.match(result.output, /index is out of date/);
  });
  withFixture({ schema_version: '1.0', resources: [null] }, base => {
    const result = runCatalog('sync', base);
    assert.equal(result.code, 1);
    assert.match(result.output, /resources\[0\]: resource must be an object/);
    assert.doesNotMatch(result.output, /TypeError/);
  });
  assert.match(checkIndex(JSON.stringify({ resources: [null] }), '', () => false).failures.join('\n'), /resources\[0\]: resource must be an object/);
  assert.throws(() => indexFor({ resources: [null] }), /resources\[0\]: resource must be an object/);
});
