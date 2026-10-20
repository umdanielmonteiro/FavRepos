# Boop (fav-051): pre-pilot readiness assessment

**Assessment date:** 2026-10-19
**Status:** Documentary preflight only; owner decision required before any installation or execution.

## Objective and scope

Determine whether Boop could be considered for a first simple, free, low-risk macOS evaluation. This assessment uses official project pages, the prior FavRepos review for `fav-051`, and the catalog entry. It does not inspect this Mac's personal data, credentials, or private configuration. It does not install, download, build, or execute Boop.

The prior review is dated 2026-10-18 and records documentation-level observations, including uncertainties about minimum macOS, signing, entitlements, OS sandboxing, network behavior, and exact source revision. Those are prior-review records, not fresh tests. The catalog likewise labels Boop “Documentation inspected”, `hands_on_tested: false`, and editorial verdict “Not assessed”.

## Official version and distribution findings

- The official GitHub Releases page lists **1.4.0** as its latest release. Its release entry links tag `1.4.0` to abbreviated commit `2c30ad5`; the release page says the GitHub signature was verified, while noting its key has expired. The release page/tag is immutable as a named release, but the abbreviated SHA is not a full commit identifier. An immutable full SHA was not established in this preflight.
- Release notes state that 1.4.0 is a universal build with Apple Silicon support. This is an official release-note claim, not a binary inspection.
- The project README documents GitHub Releases and the Mac App Store as recommended distribution channels, and source build. It mentions Homebrew but explicitly says that route is not officially supported. The current Homebrew formula is third-party corroboration only, not a project-endorsed distribution channel.
- The official Mac App Store listing identifies Boop as “Only for Mac” and “Free”. The project also identifies an MIT license in its repository. The App Store price and repository license are different facts: neither establishes that every bundled or community script has the same license.

## macOS compatibility

Boop is documented as a macOS application. Release 1.4.0 notes a universal build and Apple Silicon support; this is evidence of Apple Silicon compatibility for that release. The official pages inspected here do not state a minimum macOS version, and do not clearly establish Intel compatibility for the current downloadable artifact. A universal build historically implies more than one architecture, but without an official architecture listing or binary metadata this assessment does not conclude Intel support. **Minimum macOS and current Intel compatibility remain unknown.** Confirm the selected distribution's system requirements before any install decision.

## Costs and licensing

The Mac App Store listing currently displays **Free**. No account, subscription, paid API, or in-app purchase requirement was documented for the proposed local text-only use. Downloading from the Mac App Store may use the owner's Apple account and normal platform conditions; the App Store listing establishes no requirement for a separate Boop account. GitHub and Homebrew distribution costs or account requirements were not independently established here. The repository declares MIT; review bundled components and any later-added scripts separately before reuse or redistribution.

## Permissions and security limitations

- The custom-script documentation says scripts run in JavaScriptCore and describes a sandbox where the `ScriptExecution` object is the route for reading or changing editor text and selection. It also says browser and Node globals such as `window` and `process` are absent. This is a project documentation claim about the script environment, not proof of a macOS application sandbox or complete isolation.
- The app documentation says Boop checks for updates by fetching a static JSON file and says no additional data is passed in that check. This is a project claim. It is not a network audit; the assessment did not observe network traffic or inspect a built binary.
- The project documentation describes paste-in/edit/copy-out text use and the script API exposes document text. Clipboard use is therefore part of the practical workflow; its exact macOS permission prompts and access path are not established here. File access, network access beyond the documented update check, and app-level entitlements are unknown.
- The release page reports a verified GitHub signature for the tag commit, but that does not establish that a distributed macOS app is Developer ID signed, notarized, sandboxed, or identical to that source. Signing, notarization, entitlements, and differences between App Store and GitHub builds were not verified.
- Treat bundled scripts as executable code and community/custom scripts as unreviewed code until reviewed. The proposed test excludes custom and third-party scripts. No safety conclusion follows from missing documentation.

## Proposed minimal synthetic evaluation

This is a proposal only. It requires a separate explicit owner decision naming the distribution, version, Mac, and permission to install and run it. Do not proceed until the blockers below are resolved.

1. Use only a short, locally typed synthetic string: `boop sample 123`.
2. Select the bundled **Uppercase** transformation only after confirming its exact script source is part of the selected official release and performs only a deterministic case conversion. Do not use a custom, downloaded, or community script. If this exact bundled operation cannot be confirmed before execution, stop and choose no substitute without review.
3. Define the expected result in advance as `BOOP SAMPLE 123`.
4. Paste the synthetic string into Boop, run the confirmed bundled operation once, and compare the displayed result with the expected result. Do not paste real clipboard contents or copy the result elsewhere during this minimal check.
5. Record only the app version/distribution, macOS version/architecture voluntarily supplied for the pilot, and pass/fail outcome. Do not collect unrelated machine details or personal data.

Stop immediately if the app requests unexpected access or credentials, attempts an unexpected network action, the operation's source cannot be confirmed, output differs, the app crashes, or any data beyond the synthetic string appears or is modified. Do not continue with files, account data, real clipboard contents, custom scripts, or third-party scripts.

## Blockers and unknowns

- Minimum supported macOS version is not established by the official material inspected.
- Intel support for the selected current distribution is not established. Apple Silicon support is claimed in 1.4.0 release notes.
- The exact full commit corresponding to the release tag was not confirmed in this assessment; the prior review likewise recorded only an abbreviated SHA for inspected dynamic sources. Resolve and record the full immutable commit before execution.
- The exact source of the proposed bundled Uppercase operation in the selected artifact has not been confirmed. Confirm it statically before any authorized run.
- Application signature, notarization, entitlements, macOS permission prompts, file access, and app-level sandbox settings are unknown.
- Network behavior beyond the project's documented update-check claim is unknown; no traffic inspection was performed.
- App Store listing is free, but current availability/terms in the owner's storefront and any Apple account requirement must be confirmed by the owner before choosing that channel.

## Recommendation: BLOCKED

The official sources establish a plausible no-cost macOS text utility, a latest listed release of 1.4.0, and Apple Silicon support stated in its release notes. They do not establish enough about minimum macOS, Intel compatibility for the selected artifact, app signing/permissions, or the exact bundled transformation source to recommend proceeding directly to installation. A later owner decision may authorize resolving these points and then performing only the bounded synthetic check above. This recommendation is not an install or execution authorization.

## Official sources and consultation date

Consulted 2026-10-19. Dynamic `main` documentation may change; version-specific facts are attributed to the 1.4.0 release page where available.

- Repository and README: https://github.com/IvanMathy/Boop
- Releases, including 1.4.0 and tag link: https://github.com/IvanMathy/Boop/releases
- Release tag: https://github.com/IvanMathy/Boop/tree/1.4.0
- App documentation: https://github.com/IvanMathy/Boop/blob/main/Boop/Documentation/Readme.md
- Custom-script documentation: https://github.com/IvanMathy/Boop/blob/main/Boop/Documentation/CustomScripts.md
- Repository license: https://github.com/IvanMathy/Boop/blob/main/LICENSE
- Mac App Store listing: https://apps.apple.com/us/app/boop/id1518425043
- Homebrew formula (unofficial per project README): https://formulae.brew.sh/cask/boop

## Execution statement

Boop was **not installed, downloaded, built, or tested** for this assessment. No Boop code or script was executed. No pilot has been authorized by this document.
