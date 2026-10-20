# FavRepos agent instructions

Read `README.md`, `docs/METHODOLOGY.md`, and `docs/EDITORIAL.md` before editing the catalog.

## Purpose
FavRepos is a public-ready, independent, cross-platform technology resource catalog. Avoid company-specific tailoring, private client data, secrets, or commercial endorsements.

## Source of truth
- `catalog/resources.json` is canonical.
- `catalog/resources.csv` is generated from JSON with `npm run catalog:sync`. `catalog/README.md` is generated from the JSON and the available `reviews/drafts/fav-XXX.md` files with `npm run catalog:index:sync`.
- After valid JSON edits, run `npm run catalog:sync` and `npm run catalog:index:sync`. After adding, removing, or renaming a review draft, run `npm run catalog:index:sync` even if the JSON did not change.
- `npm run check` validates the catalog and checks that the CSV and index are synchronized; `npm run catalog:index` (also `npm run catalog:index:check`) checks the index without writing files.
- IDs are immutable. Do not recycle identifiers or merge distinct resources. Preserve all existing entries and fields.
- `schema/resource.schema.json` defines the minimum shape.

## Add or revise a resource
1. Check the canonical URL for duplicates (ignore query strings, trailing slashes and fragments).
2. Verify the exact platform, owner, and type: repository, organization, model, dataset, skill, MCP server, CLI, framework, app, template, or documentation.
3. Preserve curator-supplied descriptions and mark them as claims, not observations.
   `upstream_description` is text attributed to the publisher (or submitted as such); `catalog_description` is a FavRepos-authored summary. Do not place an editorial paraphrase in `upstream_description` or present it as a publisher quotation. Preserve submitted text by default; replace or omit it only after a specific reviewed and authorized editorial decision, and record its provenance and limitations.
4. Distinguish execution environment from Codex compatibility. Never write generic prerequisites into the Codex field.
5. Use `null` for unknown, and do not imply tested, safe, supported, or production-ready without evidence.
6. Record first-party links, date, and specific version/commit when conducting new evaluations.
7. Keep `personal_impressions` blank unless the owner provides their actual experience.
8. Never update an editorial verdict automatically from popularity, metadata, or project marketing.
9. Prefer narrow edits. Keep the other 48+ entries intact.
10. After JSON edits, run `npm run catalog:sync` and `npm run catalog:index:sync`. After adding, removing, or renaming a review draft, run `npm run catalog:index:sync` even if JSON is unchanged. Then run `npm run test`, `npm run check`, `npm run catalog:index`, and `git diff --check` before proposing changes.

## Allowed work
- Source inspection and read-only research: yes.
- Modify catalog, docs, or tests: yes when requested, via a reviewed diff or pull request.
- Install packages, run third-party code, modify deployment, publish changes, or change repository settings: only with explicit authorization.
- Run target code or security tests against live services: never without owner authorization and isolation.

## PR response format
Summarize: resources added/changed; classification; verified evidence; unknowns; validation results; and editorial decisions requiring approval. Never claim a test was run unless it was run.
