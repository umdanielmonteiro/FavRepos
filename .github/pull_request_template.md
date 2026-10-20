## Summary
What changed and why?

## Sources and evidence
Link first-party sources and state the reviewed version/commit and date.

## Verification
- [ ] `npm run test` passed
- [ ] `npm run check` passed (catalog, CSV snapshot, and generated Markdown index)
- [ ] `npm run catalog:index` passed
- [ ] `git diff --check` passed
- [ ] If canonical JSON changed, ran `npm run catalog:sync` and `npm run catalog:index:sync`
- [ ] If review drafts were added, removed, or renamed, ran `npm run catalog:index:sync` even if JSON was unchanged
- [ ] Exact URL checked for duplicates
- [ ] Resource type, platform, and execution environment distinguished
- [ ] Vendor claims distinguished from verified findings
- [ ] No private information, credentials, or company-specific evaluations
- [ ] Any personal impressions are clearly identified as opinions
- [ ] Editorial verdicts were not silently modified

## Notes
Open questions, risks, trade-offs, and any tests not performed.
