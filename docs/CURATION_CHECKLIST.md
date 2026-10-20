# Research quality checklist

## Identity
- [ ] Canonical URL resolves to the expected resource
- [ ] Platform, owner/publisher, and resource type confirmed
- [ ] Existing catalog checked for duplicate canonical URLs
- [ ] Source version, commit, release or retrieval date recorded where applicable

## Evidence
- [ ] Upstream description is clearly attributed
- [ ] Compatible environments, integrations and prerequisites linked to primary documentation
- [ ] Codex compatibility is not confused with "Codex can inspect this repository"
- [ ] License identified from an actual license file, or marked unknown
- [ ] Cloud/API accounts, GPU or infrastructure dependencies noted
- [ ] Costs and usage restrictions not guessed
- [ ] Security/privacy risks and unknowns noted without a false safety guarantee

## Editorial
- [ ] Activities and industries are generic, not organization-specific
- [ ] Source-backed facts separated from claims, inferences and opinions
- [ ] No hands-on test claimed without real commands/results
- [ ] Personal impressions not invented
- [ ] No unsupported recommendation or automatic editorial verdict
- [ ] No secrets, client information, proprietary materials, or copied third-party code

## Delivery
- [ ] Review draft links to catalog ID
- [ ] JSON preserves stable IDs and other resources
- [ ] When canonical JSON changes, CSV and Markdown index regenerated with `npm run catalog:sync` and `npm run catalog:index:sync`
- [ ] When a review draft is added, removed, or renamed, Markdown index regenerated with `npm run catalog:index:sync`, even if JSON is unchanged
- [ ] `npm run check` and `npm run catalog:index` verified synchronization without generating files
- [ ] `npm run test` and `git diff --check` passed
- [ ] PR lists changes, evidence and unresolved questions
