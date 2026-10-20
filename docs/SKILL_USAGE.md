# FavRepos review skill

The repository-local skill lives at `.agents/skills/favrepos-review/SKILL.md`.

## Using Codex
Open the FavRepos project in Codex and begin a new session so project-local skills are discovered. Ask: `Use $favrepos-review to review fav-002 (ECC). Do not create a pull request or merge before my review.`

The skill uses the project's existing editorial methodology and writes `reviews/drafts/fav-XXX.md`. It never installs or executes third-party projects without explicit approval.

If your Codex version does not automatically detect `.agents/skills/`, check the skill list and use the project's `AGENTS.md` and `docs/CODEX_WORKFLOW.md` as a fallback; do not silently install globally. When canonical JSON changes, run `npm run catalog:sync` and `npm run catalog:index:sync`. Adding, removing, or renaming a review draft also requires `npm run catalog:index:sync`, even if JSON is unchanged, because the index links to drafts that exist. These commands generate files; `npm run check` and `npm run catalog:index` verify synchronization without generating files. Run `npm run test` and `git diff --check` as well.

## Editorial approval
Reviews are research drafts until human editorial acceptance. Personal impressions and publication verdicts must remain human-authored. Always work from a dedicated feature branch, never merge automatically.
