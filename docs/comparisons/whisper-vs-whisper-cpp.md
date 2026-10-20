# Whisper vs. whisper.cpp: documentary pilot

**Reviewed:** 2026-10-19

**Editorial verdict:** **Not assessed** for both resources; their catalog verdicts are unchanged.

**Test status:** Neither Whisper nor whisper.cpp was tested locally by FavRepos. No resource code, model, or dependency was run or installed for this comparison.

This is a comparison of evidence documented in the FavRepos records and review drafts, not a benchmark. Statements about project capabilities, platforms, model sizes, or requirements below are attributed to the cited upstream documentation. They have not been independently confirmed in execution.

## Resources and source scope

| | OpenAI Whisper | whisper.cpp |
| --- | --- | --- |
| Catalog record | [`fav-001`](../../catalog/resources.json) — [catalog index](../../catalog/README.md) | [`fav-009`](../../catalog/resources.json) — [catalog index](../../catalog/README.md) |
| Review draft | [fav-001 review](../../reviews/drafts/fav-001.md) | [fav-009 review](../../reviews/drafts/fav-009.md) |
| Canonical project | [openai/whisper](https://github.com/openai/whisper) | [ggml-org/whisper.cpp](https://github.com/ggml-org/whisper.cpp) |
| Evidence level / local test | Source inspected; not hands-on tested | Documentation inspected; not hands-on tested |
| Source revision documented | `v20250625`, full commit `31243bad24cc746f07d4c8bfdd2d974872cb1803`; reviewed 2026-10-18 [W1] | `v1.9.4`, released 2026-09-11; release page displays short commit `927cfce`; full SHA not recorded; reviewed 2026-10-18 [C1][C3] |

The comparison was prepared on 2026-10-19 from these existing records. The Whisper draft describes static inspection of first-party documentation, package metadata, and selected implementation files at its pinned release. The whisper.cpp draft describes first-party README, release, and license inspection; it did not pin a full source SHA. These are different documented evidence scopes, not comparative validation. [W1][C1]

## Documented characteristics

| Topic | OpenAI Whisper (`fav-001`) | whisper.cpp (`fav-009`) |
| --- | --- | --- |
| Resource type | Python library plus downloadable model weights. [W1][W2] | Local transcription engine/library implementing Whisper inference in C/C++. [C1][C4] |
| Interfaces | Python API and `whisper` command-line interface; documented outputs include text, subtitle, and structured formats. [W1][W2] | `whisper-cli` example and C-style API. The quick-start CLI example expects 16-bit WAV; other-format handling may require preprocessing or optional FFmpeg support. [C1][C4] |
| Technologies | Python package using PyTorch, NumPy, Numba, `tiktoken`, and other declared packages; audio loading invokes FFmpeg. [W2][W3] | C/C++ with `ggml`; documented build uses CMake. [C1][C4] |
| Execution environment | Local Python environment, with CPU selection in the CLI and accelerator behavior dependent on the installed PyTorch/platform stack. The review records Python `>=3.8` in package metadata; that metadata is not proof of end-to-end compatibility across versions. [W2][W3] | Local native build/runtime with CPU inference documented. Optional acceleration paths depend on the selected backend, platform, drivers, and toolchains. The README lists multiple desktop, mobile, embedded, and WebAssembly targets; these are documented targets, not independent platform tests. [C1][C4] |
| Documented requirements | Python package installation, the separate FFmpeg executable, declared Python dependencies, and model acquisition. A Rust toolchain may be needed where no prebuilt `tiktoken` wheel is available. No universal CPU RAM minimum was established in the review. [W1][W2][W3] | C++ toolchain and CMake for the documented build; converted `ggml` model files. Optional accelerators may require their own toolkits/runtimes. No universal GPU VRAM minimum or measured throughput was established in the review. [C1][C4] |
| Model preparation | Upstream documents loading/download of published Whisper weights through its package/library flow; the review does not record a conversion step for this implementation. [W1][W4] | The project documents converted `ggml` model files and model download/conversion workflows. Quantized variants are documented, but this review did not measure their quality or resource trade-offs. [C1][C4] |
| Software license | The repository declares MIT. [W1][W5] | The repository declares MIT. [C2] |
| Model license | The upstream README states that Whisper model weights are MIT licensed. This is the publisher's statement; it does not grant rights to source recordings or other materials. [W1][W5] | The license/provenance of each converted model file was not established by the review; verify the exact artifact separately. [C1][C2] |
| Dependencies and other materials | The review identifies third-party Python dependencies and says their terms require separate review; recording, transcript, and media rights are separate as well. [W1][W2] | Third-party dependency, recording, voice, and transcript terms are not resolved by the repository MIT license and require separate review. [C1][C2] |

## Integration differences: documented facts and conditional hypotheses

The documented interfaces differ: Whisper exposes Python and CLI entry points, while whisper.cpp documents a native CLI and C-style API. **Conditional hypothesis:** if an application already runs Python/PyTorch, Whisper's Python API could reduce the amount of native integration glue; if it needs a C/C++ library boundary or a native build, whisper.cpp's documented API may be relevant. Neither workflow was built here, so ease of integration, portability, and operational fit remain unverified. [W1][W2][C1]

Whisper's package flow and whisper.cpp's converted `ggml` model flow are also different documented preparation paths. **Conditional hypothesis:** a requirement to use a particular model artifact or conversion pipeline could affect setup choices. No download, conversion, install, or artifact-license review was performed for this comparison. [W1][W4][C1][C2]

Both reviews describe local inference paths, but this does not prove that a complete application, wrapper, downloader, or dependency stack stays offline or handles recordings safely. No Codex compatibility, privacy guarantee, or security property is inferred. [W1][W6][C1]

No winner, score, or recommendation follows from these interface and setup differences. The current editorial verdict remains **Not assessed** for both resources. [W1][C1]

## Limits and unknowns

- There is no like-for-like test of transcription quality, latency, throughput, memory, VRAM, energy use, or cost. Upstream estimates or benchmark claims mentioned in the reviews are not FavRepos comparative results. [W1][C1]
- The exact behavior of each implementation on the same hardware, operating system, runtime, model, and audio corpus is unknown. The selected whisper.cpp review revision is identified by a release tag and short SHA only. [C1]
- Effective model and dependency licenses for a particular installation, including redistribution conditions, have not been resolved here. Repository licenses alone do not settle every component. [W1][W5][C2]
- Accuracy by language, accent, noise, domain vocabulary, and recording quality; required human correction; and behavior on sensitive material remain untested comparatively. [W1][C1]
- Actual installation/build friction, platform/backend compatibility, offline behavior, telemetry, retention, and security posture are unknown. Documentation is not a security audit or runtime test. [W1][C1]

## Tests needed for a performance comparison

A future benchmark would need a predeclared question and protocol, the same consented audio corpus and evaluation split, stated language/accent/noise/domain coverage, fixed model variants and artifact hashes, exact software/dependency revisions, equivalent hardware and power settings, reproducible build/runtime configurations, repeated runs, and reported quality metrics alongside latency, memory, and energy. It should document failures and uncertainty and separate upstream estimates from measured results. No such tests have been performed for this pilot.

## References

**Whisper (`v20250625`)**

- [W1] [fav-001 review draft](../../reviews/drafts/fav-001.md), reviewed 2026-10-18; includes source references and limitations.
- [W2] [Whisper `pyproject.toml`](https://github.com/openai/whisper/blob/v20250625/pyproject.toml) — declared package metadata, dependencies, and CLI entry point.
- [W3] [Whisper audio loader](https://github.com/openai/whisper/blob/v20250625/whisper/audio.py) — FFmpeg invocation and audio preprocessing constants.
- [W4] [Whisper model loader](https://github.com/openai/whisper/blob/v20250625/whisper/__init__.py) — documented model URLs and loading path.
- [W5] [Whisper MIT license](https://github.com/openai/whisper/blob/v20250625/LICENSE) — repository license text; see also the upstream license statement in the [README](https://github.com/openai/whisper/blob/v20250625/README.md).
- [W6] [Whisper source revision](https://github.com/openai/whisper/commit/31243bad24cc746f07d4c8bfdd2d974872cb1803) — full SHA corresponding to the reviewed tag.

**whisper.cpp (`v1.9.4`)**

- [C1] [fav-009 review draft](../../reviews/drafts/fav-009.md), reviewed 2026-10-18; documents the upstream README, platform/build/model claims, and open questions.
- [C2] [whisper.cpp MIT license at `v1.9.4`](https://github.com/ggml-org/whisper.cpp/blob/v1.9.4/LICENSE) — repository license; does not establish terms for every model or dependency.
- [C3] [whisper.cpp `v1.9.4` release](https://github.com/ggml-org/whisper.cpp/releases/tag/v1.9.4) — release date and displayed short commit prefix `927cfce`.
- [C4] [whisper.cpp README at `v1.9.4`](https://github.com/ggml-org/whisper.cpp/blob/v1.9.4/README.md) — upstream documentation for interfaces, build, models, platforms, and optional backends; not independently tested.
