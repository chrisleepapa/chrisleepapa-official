---
name: sprite-gen
description: Create and process 2D game sprites, transparent animation frames, sprite atlases, and motion loops for Chris LEE.PAPA projects using aldegad/sprite-gen. Use when the user asks to animate or prepare game characters such as Yul, Jung, Popo, Brook, Pretty, Cutie, TUTU, BBU, or PPI.
---

# sprite-gen project skill

Use the upstream Apache-2.0 tool: https://github.com/aldegad/sprite-gen

## Safety and project boundaries

- This website is a static HTML/CSS/JavaScript project. `sprite-gen` is a separate Python CLI and must not be added as a production website dependency or run in Vercel builds.
- Do not change existing pages, assets, routing, analytics, AdSense, or deployment configuration when preparing sprite assets.
- Keep generated work in a separate run/output directory first. Only copy approved exports into the website after the user approves them.
- Suggested approved export destination: `images/game-sprites/<character-id>/`. Do not overwrite existing character art.
- Never invoke the `openai` provider or any API-billed provider unless the user explicitly chooses it after being told it is billed per call. Do not switch providers or spend credits silently.
- Keep API keys and login tokens out of Git, website files, commits, and logs.

## Install the CLI in a separate local tool directory

Requires CPython 3.11+ and a working `venv`/ `ensurepip`. Do not install the CLI into the website's deployment environment.

```bash
mkdir -p "$HOME/tools"
git clone https://github.com/aldegad/sprite-gen.git "$HOME/tools/sprite-gen"
cd "$HOME/tools/sprite-gen"
python3 -m venv .venv
.venv/bin/python -m pip install -e .
.venv/bin/sprite-gen --help
```

Use the absolute CLI path `$HOME/tools/sprite-gen/.venv/bin/sprite-gen`; do not rely on an activated shell or arbitrary global Python. If the folder already exists, inspect its git status and update intentionally rather than cloning over it.

## Character sprite workflow

1. Confirm the character, the user-provided reference image(s), the desired view, states, and whether the user wants image-row sprites or video-derived loops.
2. Check the upstream workflow/readiness before generation:
   ```bash
   "$HOME/tools/sprite-gen/.venv/bin/sprite-gen" workflow --kind sprite
   ```
3. For a row-based atlas, use the upstream documented sequence: `prepare` → `gen-set --provider codex` → `extract` → `compose-atlas`; optionally open `curation`. Follow current upstream docs rather than inventing CLI flags.
4. For video-derived loops, check upstream requirements first; video workflow may require ffmpeg, img2webp, and the user's Grok login or XAI_API_KEY. Never assume credentials are available.
5. Preserve character identity and proportions from supplied reference images. Review frame consistency, transparency, cropping, foot alignment, loop continuity, and the generated manifest before export.
6. Deliver previews and a list of generated files. Ask before copying approved assets into the website or committing them.

## Provider and billing rules

- The upstream default image route is Codex when available, but its login/usage must be checked; it is not automatically guaranteed by a ChatGPT conversation or GitHub connection.
- Grok uses the user's Grok login or XAI_API_KEY; video generation may consume that service's quota.
- The `openai` provider uses OPENAI_API_KEY and is billed per API call. It is opt-in only.
- If the CLI reports that Codex is unavailable and asks the user to choose, stop and ask; do not choose a paid fallback yourself.

## References

- Upstream README: https://github.com/aldegad/sprite-gen
- Upstream skill: https://github.com/aldegad/sprite-gen/blob/main/SKILL.md
- Upstream Korean README: https://github.com/aldegad/sprite-gen/blob/main/README.ko.md
