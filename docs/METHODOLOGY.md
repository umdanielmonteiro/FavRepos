# Evaluation methodology

FavRepos separates **origin platform**, **resource type**, **category**, **execution environment**, **activities**, **industries**, **compatibility**, and **evidence**.

## Evidence levels
- **Preliminary:** submitted details / inferred classification, without inspecting the source.
- **Documentation inspected:** upstream README or related first-party documentation reviewed; statements may still be untested claims.
- **Source inspected:** implementation/configuration checked against the claim.
- **Hands-on tested:** reproducible local test recorded, including environment, exact revision, command, result, and limitations.

## Editorial rules
1. Attribute upstream descriptions; do not convert marketing claims into verified facts.
   `upstream_description` stores text presented or submitted as an externally sourced description; authorship and provenance must be assessed using `description_status`, and must not be assumed to be verified publisher wording. `catalog_description` stores a concise FavRepos-authored summary and must not be presented as a quotation or publisher wording. Preserve submitted descriptions by default; an editorial replacement or omission requires a specific review and authorization, with provenance and verification limits recorded. Neither field implies permission to republish third-party text.
2. Blank/null means unknown, never incompatible, unsafe, or unsupported.
3. Don't equate compatible with Codex with installable as a Codex skill. Distinguish skill, MCP server, CLI, library, model, application, documentation, and organization.
4. Record deployment prerequisites and license implications before recommending operational use.
5. Separate publisher claims, independent observations, editorial recommendations, and personal impressions.
6. Never infer production readiness from popularity; verify dependencies, maintenance, terms, privacy, and threat model.
7. Never automatically change the editorial verdict as a consequence of a metadata refresh.
8. Date every assessment and preserve source links and revision identifiers.

## Current import
The initial inventory contained 49 unique links across GitHub, Hugging Face and official documentation. The current catalog contains 74 distinct resources; the inventory count is a historical baseline, not the current total. The catalog uses FavRepos-authored summaries and omits previously stored upstream wording whose provenance or permission to republish was not established. A summary is not a license for source text, and cited source links remain references. Compatibility and license fields without sufficient evidence remain unknown or explicitly qualified. Source checks are not exhaustive and may not correspond to the latest upstream revision.

## Practical test evidence
The first practical Boop test is dated 2026-10-19. Its functional result was reported by the owner; FavRepos did not independently observe or reproduce that result. A single positive report applies only to its reported scope and does not establish general reliability, safety, compatibility, support, or an editorial recommendation. Preserve the report's provenance when documenting it; update structured catalog evidence only through a separate reviewed editorial decision.

The executed catalog validator is `scripts/catalog.mjs`, run by `npm run check`; `npm run test` runs its regression suite. It checks the catalog object and resource shapes; non-empty required scalar fields; required `activities` and `industries` arrays (empty arrays are allowed); boolean `hands_on_tested`; types of recognized optional fields; valid calendar dates; HTTPS `url` and `source_urls`; unique IDs and normalized resource URLs; consistency between a positive `hands_on_tested` value and the descriptive `verification_level`; exact CSV synchronization; and that the generated `catalog/README.md` index matches the canonical JSON, including its resource IDs and links to review drafts that currently exist. After JSON edits, `npm run catalog:sync` regenerates the CSV and `npm run catalog:index:sync` regenerates the index. Adding, removing, or renaming a review draft also requires `npm run catalog:index:sync`, even if JSON is unchanged. These are generation commands; `npm run check` and `npm run catalog:index` (also `npm run catalog:index:check`) verify synchronization without writing files. Verification text remains descriptive rather than a closed enum. Unknown optional values remain unknown; the validator does not infer false values from omissions.

`schema/resource.schema.json` is a reference contract, not an executed JSON Schema validator: no JSON Schema engine or dependency is used by `npm run check`. It documents core shape, required fields, types, dates and URL patterns, but does not by itself enforce cross-record uniqueness, normalized URL duplicate detection, CSV synchronization, or the conditional consistency between test status and verification text. The custom script is the runtime authority for those checks. Schema keywords such as `format` may also depend on the behavior of an external JSON Schema implementation if one is used separately.

## Suggested verdicts
`not-assessed`, `research`, `pilot`, `recommended`, `caution`, `avoid`, `retired`. A verdict must include a rationale, evidence, assessment date, and intended use.


## FavRepos material and license scope

The owner designates the root MIT license for original FavRepos software code, scripts, and tests. Original editorial prose and protectable editorial metadata authored by Daniel Monteiro, including with Codex assistance, are offered under CC BY 4.0 only to the extent copyright or related-right protection applies and the owner has authority to license them. The repository-specific boundary is documented in [LICENSE-SCOPE.md](../LICENSE-SCOPE.md); the standard MIT text is not modified. This scope does not cover third-party descriptions, code, documentation, names, trademarks, models, services, media, assets, or contributions. A source citation or link is not permission to republish.
