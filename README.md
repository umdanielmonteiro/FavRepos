# FavRepos

FavRepos is an independent, evidence-aware catalog of technology resources across GitHub, Hugging Face, official documentation sites, and other platforms. Entries distinguish what a resource is, where it is published, where it runs, and what evidence has been reviewed.

> The owner designates MIT for original FavRepos code, scripts, and tests, and CC BY 4.0 for original editorial prose and protectable editorial metadata, subject to third-party rights and applicable limits on copyright protection. Inclusion is not an endorsement, recommendation, security certification, or proof of compatibility.

## Explore the catalog

**[Browse the catalog index](catalog/README.md)** — the recommended starting point, with resources grouped by category and links to existing reviews.

- [Catalog data (JSON)](catalog/resources.json): canonical machine-readable source.
- [Catalog snapshot (CSV)](catalog/resources.csv): spreadsheet-friendly export.
- [Resource schema](schema/resource.schema.json): reference for catalog fields.
- [Methodology](docs/METHODOLOGY.md): classification and evidence rules.
- [Editorial disclosure](docs/EDITORIAL.md): separation of facts, claims, reviews, and opinions.
- [Reviews and drafts](reviews/drafts/README.md): review material and its current scope.
- [Documentary comparisons](docs/comparisons/README.md): evidence-bounded comparisons and their limits.
- [Contributing](CONTRIBUTING.md): how to suggest or review entries.

The current catalog contains **74 resources across 19 categories**. The initial inventory count of 49 is a historical baseline, not the current total.

## How to read evidence

Verification levels describe the evidence recorded for an entry:

- **Preliminary:** details were submitted or classification inferred; the source was not inspected.
- **Documentation inspected:** upstream documentation was reviewed; its claims may remain untested.
- **Source inspected:** implementation or configuration was checked against the claim.
- **Hands-on tested:** a reproducible local test is documented with its environment, revision, command, result, and limitations.

These levels describe evidence, not an editorial verdict. A resource can be included without being fully evaluated, and evaluation does not automatically mean recommendation. Unknown information remains unknown; inclusion does not establish safety, support, production readiness, or compatibility.

The first practical Boop test is dated 2026-10-19. Its functional result was reported by the owner; FavRepos did not independently observe or reproduce it. That single report applies only to its stated scope and does not establish broader reliability, safety, compatibility, or a recommendation. See the [Boop review draft](reviews/drafts/fav-051.md) and [methodology](docs/METHODOLOGY.md) for the evidence limits.

## Editorial independence and safety

FavRepos is not affiliated with the listed projects. Names and trademarks belong to their owners. Some descriptions originate with upstream maintainers and are presented as claims rather than independent findings. Reviews depend on context and can become outdated.

Catalog entries do not certify that a resource is safe. Before operational use, review its source, license, dependencies, maintenance, privacy implications, and threat model for your intended context. The catalog separates these considerations and does not infer production readiness from popularity.

## Project status

The catalog contains 74 resources with documentary review drafts and FavRepos-authored summaries. Each entry records its evidence scope; source review is not exhaustive, and publisher claims and untested capabilities are not independent findings. The catalog uses editorial summaries where republication provenance for publisher wording was not established. The owner's license designations apply only to original FavRepos material within the stated scope; third-party material remains subject to its holders' rights and terms. Repository protections and source-review work are tracked separately in the [project roadmap](docs/ROADMAP.md).

## Licensing

The owner designates [MIT](LICENSE) for original FavRepos software code, scripts, and tests, and [CC BY 4.0](LICENSE-CONTENT.md) for original editorial prose and protectable editorial metadata. [License scope](LICENSE-SCOPE.md) explains this boundary without modifying the standard MIT text. These grants do not cover third-party code, descriptions, names, models, services, or assets, which remain subject to their holders’ terms and rights.

## Repository policies

- [Security policy](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Changelog](CHANGELOG.md)
- [Automated catalog checks](.github/workflows/catalog-check.yml)
- [Instructions for coding agents](AGENTS.md)
