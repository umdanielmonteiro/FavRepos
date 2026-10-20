# Codex curation workflow

FavRepos uses **research → evidence → review draft → validation → pull request → human decision**.

## One-time setup
Clone FavRepos and open the repository root in Codex. Codex automatically reads `AGENTS.md`. Use the repository's Node.js 20+ scripts; no third-party dependencies are required for validation.

## Research a resource
Use this prompt, replacing the URL:

> Review https://github.com/owner/project for FavRepos. Read AGENTS.md and docs/METHODOLOGY.md. Check for duplicates, inspect primary documentation, identify repository or resource type, source platform, intended activities and general industries, integration options, runtime prerequisites, license and limitations. Cite first-party evidence URLs and a source revision or release where possible. Separate upstream claims from your observations. Do not execute third-party code, install software, disclose private data, or change an editorial verdict. Prepare an English review draft in reviews/drafts/<resource-id>.md, update catalog/resources.json only for verified corrections, regenerate the CSV with npm run catalog:sync and the Markdown index with npm run catalog:index:sync. Adding, removing, or renaming a review draft also requires npm run catalog:index:sync, even when JSON is unchanged, because the index includes links only to existing drafts. These sync commands generate files; npm run check and npm run catalog:index verify synchronization without writing files. Then run npm run test and git diff --check. Open a pull request only when authorized. Clearly mark unknowns and untested claims. Stop if external actions require permission.

## Reviewing an existing item
Use its immutable ID. Write `reviews/drafts/fav-XXX.md`, based on `reviews/REVIEW_TEMPLATE.md`. Avoid speculative performance numbers or invented hands-on results. Never attribute personal impressions to the curator without input.

## Adding a new resource
Check canonical source URL (ignore query parameters/fragments and trailing slash), differentiate organizations from individual repositories, assign the next unused ID, and preserve the existing records. Do not automatically add unrelated resources linked from a README.

## Review and merge
- Codex creates a feature branch and pull request rather than pushing to `main`.
- Review the changed records, attribution, evidence, validation and any generated review.
- The `validate` CI job must pass. If CI has not run, do not merge.
- Human editor chooses or changes verdicts; never delegate publication of personal experience.
- Before accepting public contributions, configure and verify a ruleset or branch protection for `main`: require pull requests and passing validation checks, block force pushes and branch deletion, and limit bypasses. These are GitHub settings; local validation does not confirm them.

## Notes
GitHub Actions verifies catalog structure and export consistency, **not** the accuracy of technical claims. Security and license checks require separate analysis.
