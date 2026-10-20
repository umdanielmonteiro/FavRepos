# Evaluation Shortlist — Five Candidates for Future Review

**Status:** Documentary shortlist proposed on 2026-10-19. No candidate is approved for installation or hands-on evaluation by this document. No candidate is thereby recommended, tested, supported, or considered safe. Humanizer (`fav-050`) remains paused; its operational pilot is not resumed here.

## Scope and status

This document compares five already catalogued resources for possible later, separately authorized, synthetic-data evaluations. It records planning hypotheses from the catalog, the existing review drafts, and the existing hands-on plan. It does not refresh upstream sources, execute resources, change catalog fields or verdicts, or claim current behavior beyond those dated documentary records. Unknowns remain unknown.

A practical evaluation would require its own approval naming the exact resource and immutable revision, host/environment, permitted actions, synthetic inputs, network and account boundaries, costs, evidence retention, and stop conditions. Editorial review of this shortlist is a separate gate and grants no execution authority.

## Selection method

The five candidates were selected as a documentary shortlist, not as a ranking of quality. The comparison uses the same questions for each: (1) likely catalog utility, (2) smallest useful synthetic evaluation, (3) setup/runtime breadth, (4) external accounts/network/cost, (5) permissions and data exposure, (6) unresolved facts, and (7) whether objective outcomes can be specified before execution.

“Prior priority” reproduces the planning queue in `docs/HANDS_ON_TEST_PLAN.md` (P1/P2); it is not an editorial verdict or quality score. Assessments below are planning inferences from documentary evidence, not observed outcomes. No numeric scores are assigned. A smaller scope or fewer apparent dependencies does not establish safety.

## Five candidate profiles

### fav-051 — Boop

- **Purpose:** macOS desktop scratchpad for transforming text with bundled or custom scripts; classified in its review as an application, not a Codex skill, plugin, or MCP server.
- **Prior priority:** P1.
- **Potential FavRepos utility:** A bounded example of a local developer text utility, useful for documenting platform, scriptability, distribution, and the distinction between an app and an agent integration.
- **Smallest plausible evaluation:** On a designated macOS machine, use a synthetic, non-sensitive text fixture with one built-in transformation; compare output to a prewritten expected result. Avoid custom/community scripts in the first pass. This still requires installing/opening the app and is only a proposed scope.
- **Apparent setup and dependencies:** macOS app. GitHub release and Mac App Store distribution are documented; source build uses Xcode. A source build is unnecessary for a basic app-use case. Minimum macOS version is unknown. The review reports release 1.4.0 and only an abbreviated tag SHA; exact immutable correspondence was not established.
- **Accounts, network, paid services:** No account or paid API requirement was found in the consulted documents. The Mac App Store may involve an account; whether a charge applies is not established. Network behavior was not audited. Homebrew is described upstream as unofficial.
- **Permissions and risks:** The review says custom scripts run in JavaScriptCore and communicate through `ScriptExecution`, but the actual isolation boundary, app entitlements, clipboard behavior, and filesystem/network scope were not tested. Text in the scratchpad may be sensitive. A custom script would be executable code and needs separate static review.
- **Unknowns:** Minimum OS/Xcode versions; distribution build signing/entitlements and differences; bundled script inventory and licenses; actual app/script permissions; network behavior; exact pinned release/source snapshot.
- **Objective criteria for a later test:** Record app version and distribution source; use only a generated fixture; choose a deterministic built-in transformation and predefine expected output; record whether the output matches exactly; confirm the fixture contains no private text; document visible permission prompts and any unexpected network or file access. Stop on unexpected access, prompts, or data changes. These criteria do not presume a pass.
- **Primary evidence consulted:** Existing [fav-051 review](../reviews/drafts/fav-051.md), which cites the [README](https://github.com/IvanMathy/Boop/blob/main/README.md), [app documentation](https://github.com/IvanMathy/Boop/blob/main/Boop/Documentation/Readme.md), [custom scripts documentation](https://github.com/IvanMathy/Boop/blob/main/Boop/Documentation/CustomScripts.md), [releases](https://github.com/IvanMathy/Boop/releases), and [license](https://github.com/IvanMathy/Boop/blob/main/LICENSE). Those review links are dynamic except where noted in the review.
- **Separate authorization needed:** Install/open the named release or App Store build; authorize the macOS host and exact synthetic fixture; permit the selected built-in operation; approve any custom script, source build, permission inspection, network access, or evidence retention separately.

### fav-053 — Diagram Design

- **Purpose:** Agent skill/plugin collection that generates diagram-oriented HTML with inline SVG and documents redraw/import workflows for tools such as draw.io and Mermaid.
- **Prior priority:** P1.
- **Potential FavRepos utility:** A concrete, reviewable output workflow for assessing how an agent skill handles a simple synthetic architecture diagram and documents its host-specific packaging.
- **Smallest plausible evaluation:** After reviewing and pinning one skill revision, ask an approved agent host to produce one static diagram from a synthetic three-component system description; inspect the resulting HTML/SVG as text. Exclude imports and image export initially.
- **Apparent setup and dependencies:** An Agent Skills-compatible host and skill files; upstream documents a Skills CLI and host/plugin installation routes. SVG export uses a packaged Python helper; PNG export requires Python Playwright and Chromium. Neither export dependency is needed for the proposed HTML/SVG-only scope. The review does not establish exact Python requirements.
- **Accounts, network, paid services:** No paid service was established by the review. An agent/model account may be required and could incur costs depending on the selected host. Default HTML may request Google Fonts; the upstream README documents a system-font/offline option, but generated output and network traffic were not tested.
- **Permissions and risks:** Skill instructions influence agent behavior; inspect the exact skill and referenced assets/scripts. Generated HTML is executable/renderable content. Avoid imports, remote fonts, and browser export in the first scope; do not treat plugin manifests as a security boundary.
- **Unknowns:** Upstream type count conflicts (44/45); exact full SHA corresponding to the reviewed manifest version was not confirmed; specific skill/host behavior, system-font output, helper dependencies and generated artifact behavior are untested.
- **Objective criteria for a later test:** Pin and record a full revision; use a fixed synthetic prompt with exactly three named components and labeled connections; require a static HTML file with inline SVG and no remote resource references; inspect that labels and connections match the fixture; record any tool calls and attempted network access. No visual-quality rating is implied unless separately defined before the test.
- **Primary evidence consulted:** Existing [fav-053 review](../reviews/drafts/fav-053.md), citing the [repository](https://github.com/cathrynlavery/diagram-design), [README](https://github.com/cathrynlavery/diagram-design/blob/main/README.md), [skill](https://github.com/cathrynlavery/diagram-design/blob/main/skills/diagram-design/SKILL.md), [Codex manifest](https://github.com/cathrynlavery/diagram-design/blob/main/.codex-plugin/plugin.json), [export instructions](https://github.com/cathrynlavery/diagram-design/blob/main/commands/export-diagram.md), [license](https://github.com/cathrynlavery/diagram-design/blob/main/LICENSE), [security policy](https://github.com/cathrynlavery/diagram-design/blob/main/SECURITY.md), and [third-party notices](https://github.com/cathrynlavery/diagram-design/blob/main/THIRD_PARTY_LICENSES.md). Review notes report dynamic pages and abbreviated revision evidence.
- **Separate authorization needed:** Approve the exact skill snapshot and host/model; approve installation or loading method and prompt transmission; approve any network access, font fetch, plugin activation, Python helper, Playwright/Chromium install, import, export, or evidence retention separately.

### fav-013 — Remotion AI Skills

- **Purpose:** Officially documented Remotion-focused agent instruction files for project creation, React markup, preview/render guidance, captions, maps, SaaS, interactivity, documentation, and upgrades. This resource is the skills collection, not the Remotion framework, a video generator, or the separately documented Codex plugin.
- **Prior priority:** P2.
- **Potential FavRepos utility:** Illustrates specialized instructions whose usefulness depends on a separate project/runtime; can help document the boundary between agent guidance and the software it guides.
- **Smallest plausible evaluation:** Review one pinned instruction file statically, then, if separately approved, ask an approved host to draft a minimal static composition plan against a synthetic specification without installing packages, creating a project, previewing, or rendering.
- **Apparent setup and dependencies:** Static reading needs no special runtime. The documented install routes use `npx skills` or a Bun project scaffold; executing an instruction may invoke a Remotion project, Node.js/Bun, packages, browser preview, rendering, or topic-specific services. None is necessary for static review; a model host is needed for an agent behavior test.
- **Accounts, network, paid services:** The instruction files have no separately documented price. Skills CLI/scaffolding may use network/package infrastructure. Agent provider and potential framework licensing, rendering, or third-party service costs depend on the later scope; no account or cost was tested.
- **Permissions and risks:** Instructions can influence agent tool use. A render path can read project/media files and execute packages; avoid all project creation, installation, rendering, external assets, and services in the smallest proposed evaluation. Review the exact skill and host permissions.
- **Unknowns:** Skills CLI placement/update/overwrite behavior; exact host behavior; current license applicability for the selected files; package and external-service requirements for particular skill topics; no quality, compatibility, or render outcome measured.
- **Objective criteria for a later test:** Pin a full repository revision and one named skill; define a synthetic request and require a written plan only; check that the plan names no unapproved files, commands, packages, services, or media inputs and preserves the fixture's fixed requirements. Record tool calls and output. Any actual command or project write requires a separate authorization.
- **Primary evidence consulted:** Existing [fav-013 review](../reviews/drafts/fav-013.md), citing [Remotion Agent Skills docs](https://www.remotion.dev/docs/ai/skills), the [skills repository at pinned commit `1441a11e95db35443bd76bb318386c0d3ca00053`](https://github.com/remotion-dev/skills/tree/1441a11e95db35443bd76bb318386c0d3ca00053), [Remotion AI overview](https://www.remotion.dev/docs/ai), [plugins docs](https://www.remotion.dev/docs/ai/plugins), and [project docs](https://www.remotion.dev/docs/). The review records documentation checked 2026-10-18 and a live page date separately from the pinned repository snapshot.
- **Separate authorization needed:** Approve exact skill/revision, host/model and prompt submission; separately authorize any CLI/scaffolder, package install, project writes, preview/render, media access, network service, licensing/cost exposure, or retention.

### fav-023 — Agent Skills

- **Purpose:** A broad collection of reusable agent instruction directories, with optional references, scripts, plugin metadata, and helper files. It is not one uniform executable or one single Codex integration.
- **Prior priority:** P2.
- **Potential FavRepos utility:** Useful representative for explaining skill anatomy, collection sampling, and the difference between Markdown instructions, optional code, and host packaging.
- **Smallest plausible evaluation:** Select one skill only after static review of its complete directory and references; use it with an approved host on a synthetic task in a disposable repository, with tools constrained to that fixture. This is broader than document-only review and requires a deliberate sample choice.
- **Apparent setup and dependencies:** Plain Markdown can be supplied to a compatible agent without an installer, but optional scripts and integrations have variable runtimes. Documented `npx skills` and Codex marketplace paths involve external CLI/plugin setup and filesystem/configuration writes. Neither is needed for static inspection.
- **Accounts, network, paid services:** No fixed service requirement for reading the files. An agent provider may be needed for an invocation; installer/plugin routes may use network. Cost and retention depend on selected host/model.
- **Permissions and risks:** Skill instructions may direct file reads/writes, shell commands, network activity, or other host tools. Optional helpers and referenced content expand scope. The collection is not exhaustively audited; host permissions define actual capability. Avoid installing the whole collection.
- **Unknowns:** Which representative skill has the narrowest workflow; which files/scripts/dependencies it references; per-skill license/provenance; current Codex CLI support; install layout and reference preservation; behavior under host permissions.
- **Objective criteria for a later test:** Pin the documented candidate commit; identify one skill and every referenced file; predeclare allowed fixture paths and tools; use a synthetic task with explicit expected file changes; compare the diff against that boundary; record tool calls, denied/out-of-scope attempts, and whether acceptance criteria are met. No result can generalize to the rest of the collection.
- **Primary evidence consulted:** Existing [fav-023 review](../reviews/drafts/fav-023.md), citing the [repository README at candidate commit `aeac41d4d005999432bb7312f7ff06383a91d59d`](https://github.com/addyosmani/agent-skills/blob/aeac41d4d005999432bb7312f7ff06383a91d59d/README.md), [skill anatomy](https://github.com/addyosmani/agent-skills/blob/aeac41d4d005999432bb7312f7ff06383a91d59d/docs/skill-anatomy.md), [getting started](https://github.com/addyosmani/agent-skills/blob/aeac41d4d005999432bb7312f7ff06383a91d59d/docs/getting-started.md), and [Codex setup guide](https://github.com/addyosmani/agent-skills/blob/aeac41d4d005999432bb7312f7ff06383a91d59d/docs/codex-setup.md). The review says only selected docs were pinned and the collection was not exhaustively audited.
- **Separate authorization needed:** Choose and approve one skill/revision and host/model; authorize prompt transmission and constrained file/tool use; authorize any installation, script, package, network access, provider cost, or evidence retention separately.

### fav-052 — Skills for Real Engineers

- **Purpose:** Engineering and productivity agent skill collection, with user-invoked and model-invoked workflows and documented host-specific plugins/install routes.
- **Prior priority:** P2.
- **Potential FavRepos utility:** Provides a practical engineering-workflow collection for documenting agent instructions, optional helpers, and differences between editable files and managed plugin copies.
- **Smallest plausible evaluation:** Statically review one chosen skill and references; if behavior is later approved, run one synthetic code/document task in a disposable repository with issue trackers and external integrations disabled.
- **Apparent setup and dependencies:** No single runtime applies to all Markdown skills. The repository includes scripts/package metadata, but the review did not inventory per-skill dependencies. README documents Codex marketplace and `skills.sh` routes, among others; installation can write host/project configuration. Static review requires no installation.
- **Accounts, network, paid services:** A provider account may be needed for invocation. Issue tracker services are only relevant if configured; installer or plugin routes may use network. No costs or data handling were tested.
- **Permissions and risks:** Some skills can ask agents to edit files, run shell/tests, create tickets, or use configured issue trackers. Setup workflows may gather project-specific information. Review skill instructions and host permissions; avoid external integrations and broad collection installation.
- **Unknowns:** Current README and older release notes differ on Codex plugin status; exact revision and skill-to-file mapping; actual per-skill runtimes and side effects; host/update behavior; dependencies, provenance and permissions for the selected skill.
- **Objective criteria for a later test:** Resolve and pin one full immutable revision and one skill; enumerate referenced files and allowed actions; use a synthetic task with a fixed expected change; disable issue trackers and network integrations; record the resulting diff and all tool calls; fail or stop if any out-of-scope file/service is accessed. Do not generalize the result across the collection.
- **Primary evidence consulted:** Existing [fav-052 review](../reviews/drafts/fav-052.md), citing the [repository](https://github.com/mattpocock/skills), [README](https://github.com/mattpocock/skills/blob/main/README.md), [skills directory](https://github.com/mattpocock/skills/tree/main/skills), [release history](https://github.com/mattpocock/skills/releases), [Claude plugin manifest](https://github.com/mattpocock/skills/blob/main/.claude-plugin/plugin.json), and [license](https://github.com/mattpocock/skills/blob/main/LICENSE). Review evidence is largely dynamic and does not pin all reviewed files to one commit.
- **Separate authorization needed:** Approve exact skill/revision, host/model and prompt; authorize installation/invocation and any file writes or commands; authorize network, issue-tracker connections, paid provider use, and evidence retention separately.

## Comparative decision matrix

| Candidate | Prior priority | Utility hypothesis | Smallest useful synthetic scope | Setup/dependency breadth | Account/network/cost exposure | Main permission/risk question | Documentary blocker |
|---|---|---|---|---|---|---|---|
| fav-051 Boop | P1 | Local developer text workflow; clear application classification | One built-in transform on synthetic text | macOS application; distribution choice; no source build needed for basic use | No paid API found; App Store/account and network behavior unresolved | App/script entitlements, clipboard and actual isolation boundary | Exact release/build and minimum OS unknown |
| fav-053 Diagram Design | P1 | Inspectable diagram artifact from synthetic requirements | One inline-SVG HTML artifact; no export | Agent host plus one skill; optional exports add Python/Playwright/Chromium | Model/account may apply; default fonts may contact Google Fonts | Skill instructions, generated HTML, and remote resources | 44/45 type-count conflict and revision pinning |
| fav-013 Remotion AI Skills | P2 | Specialized instructions with clear boundary from framework | One skill produces a plan only | Static files are light; execution can expand to Node/Bun, packages, preview/render | Provider/package network or later service costs depend on scope | Agent can trigger project writes, package use, media access or rendering | Exact host behavior and selected-skill dependencies unknown |
| fav-023 Agent Skills | P2 | Useful for collection anatomy and sampling | One statically reviewed skill, then fixture-only task | Varies by skill; CLI/plugin routes add network and config writes | Provider and installer network may apply | Variable scripts, references, shell and file access | Representative skill and full referenced file set not selected |
| fav-052 Skills for Real Engineers | P2 | Engineering workflow coverage and host packaging | One skill in disposable repo, integrations disabled | Varies by skill; scripts/package metadata not inventoried | Provider may apply; issue trackers optional | File edits, shell commands, tickets or setup questions | Dynamic review evidence and per-skill behavior unresolved |

The matrix is qualitative and does not assign safety, quality, or performance scores. “No paid API found” and similar phrases summarize the review evidence; they are not proof of absence.

## Proposed evaluation order

1. **Boop (`fav-051`) — provisional first choice.** Its smallest scenario is a deterministic transformation of synthetic text in a single-purpose desktop app, with no model-provider call or external issue-tracker integration apparent. This keeps the task narrow and the output directly comparable to a fixed expected string. The tradeoff is a macOS app installation plus unresolved distribution provenance, OS support, and actual permission boundaries. Therefore it is a suitable first hypothesis only if the owner accepts those blockers and chooses a release/build. It has not been tested or cleared as safe.
2. **Diagram Design (`fav-053`).** A single synthetic diagram can yield a concrete artifact, and optional Playwright/Chromium export can be excluded. It has greater prompt/host and possible font-network exposure than the Boop fixture, plus the unresolved type-count and revision questions.
3. **Remotion AI Skills (`fav-013`).** Keep the first behavior scope to a written plan so framework installation and media rendering remain out. It is specialized and well bounded by skill selection, but its practical utility depends on an agent host and any later Remotion project prerequisites.
4. **Agent Skills (`fav-023`).** Defer until one narrow skill and all references/helpers are selected; the broad collection cannot be represented by one sample result.
5. **Skills for Real Engineers (`fav-052`).** Defer until per-skill actions are inventoried, especially any shell, write, setup, or issue-tracker instructions. Its broader engineering workflows make the synthetic task more likely to entail file changes or host tools.

This is a proposed sequence for future owner decisions, not authorization. If the owner does not approve macOS app installation or cannot establish the selected distribution and permission scope, Boop is blocked and Diagram Design may be considered next only after its own host, revision, prompt, and network blockers are resolved. No candidate is automatically substituted or approved.

## First-pilot recommendation and blockers

**Provisional evaluation order:** retain Boop as the first candidate to evaluate, consistent with the prior P1 hypothesis, using only a built-in transformation on synthetic text. It currently appears to avoid model/provider, external service, and project-write dependencies in the narrowest scenario. This is a relative scope judgment based on documentary records, not a finding that Boop has fewer total risks or is safe.

**Blockers before any practical pilot:**

- Select and verify an immutable release/build and distribution channel; establish supported macOS baseline and relevant signing/entitlement information.
- Decide whether app installation/opening is authorized on the named Mac and whether any App Store account/payment is involved.
- Review the chosen built-in transformation and applicable app permissions; determine how clipboard, filesystem, and network access will be observed or constrained.
- Approve the synthetic fixture, exact expected output, evidence/log retention, and stop conditions.
- Re-check first-party sources and licenses for the pinned artifact. The existing review used dynamic pages and did not inspect the full implementation or test the app.

If these are not resolved, keep the pilot blocked at the documentary stage. The shortlist itself does not approve installation, execution, or a change to `hands_on_tested`, `editorial_verdict`, or `personal_impressions`.

## Required owner decisions

1. Accept, revise, or reject the shortlist and proposed order after independent editorial audit.
2. Decide whether Boop remains the first candidate given the macOS installation and permission unknowns; if yes, specify release/build and distribution source.
3. For any later candidate, name the exact skill, immutable revision, agent host/model, permitted tools/files, and whether prompts may be sent to a provider.
4. Set synthetic fixture, objective acceptance criteria, network/account/cost limits, stop conditions, evidence retention, and publication redaction rules for each pilot.
5. Separately authorize every installation, invocation, package download, app/plugin activation, filesystem write, network request, external service, account connection, paid usage, and practical test. Approval of this document or its order does not grant these permissions.
6. Decide any catalog/review changes only after a separate evidence audit. This document does not revise editorial verdicts, hands-on status, or personal impressions.

## Sources and evidence limitations

The primary source material for this shortlist is the canonical `catalog/resources.json`, `docs/HANDS_ON_TEST_PLAN.md`, and the five existing review drafts: [`fav-051`](../reviews/drafts/fav-051.md), [`fav-053`](../reviews/drafts/fav-053.md), [`fav-013`](../reviews/drafts/fav-013.md), [`fav-023`](../reviews/drafts/fav-023.md), and [`fav-052`](../reviews/drafts/fav-052.md). Each review links first-party repositories, official documentation, manifests, release pages, or license materials consulted. Source dates and revision confidence vary by review; dynamic `main` pages and abbreviated SHAs do not prove the same current state or a complete source audit. Refer to each review for its exact scope, claims, dates, links, and limitations.

Evidence is documentary only. No resource, installer, app, skill, helper, CLI, plugin, package, or model was installed or executed for this shortlist. No agent prompt was sent. No account was connected, no service was contacted for evaluation, no test output was observed, and no security or quality conclusion follows. Catalog compatibility fields and upstream claims remain distinct from practical confirmation. Re-check relevant first-party sources and pin exact revisions before any future test.

**Humanizer (`fav-050`) is paused.** Its operational pilot is not resumed, included, or implicitly authorized by this shortlist. Any future consideration requires a separate explicit owner decision.
