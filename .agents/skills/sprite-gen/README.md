# sprite-gen setup for Chris LEE.PAPA

This repository integration adds a project-local agent skill at `.agents/skills/sprite-gen/SKILL.md`. It teaches compatible coding agents how to use the upstream sprite-generation tool while keeping the production website unchanged.

## What is and is not installed

- **Added to this repository:** agent instructions and a safe setup workflow.
- **Not vendored into the website:** the Python CLI, Python environment, model credentials, generated character assets, or heavy runtime dependencies.
- **No Vercel build changes:** sprite generation is a local/offline asset-production workflow, not a production runtime dependency.
- **Agent compatibility:** the `.agents/skills/` convention is intended for compatible Codex-style coding agents. A normal ChatGPT conversation does not automatically install or permanently load arbitrary repository skills; use the skill file as project guidance when working with a compatible agent, or ask ChatGPT to read it from GitHub.

## Install the upstream CLI locally

Requirements: CPython 3.11+ and a working `venv`/ `ensurepip`.

```bash
mkdir -p "$HOME/tools"
git clone https://github.com/aldegad/sprite-gen.git "$HOME/tools/sprite-gen"
cd "$HOME/tools/sprite-gen"
python3 -m venv .venv
.venv/bin/python -m pip install -e .
.venv/bin/sprite-gen --help
```

If `$HOME/tools/sprite-gen` already exists, inspect its Git status and update it deliberately instead of cloning over it. See the skill file for workflows, QA, reference-image handling, and billing safeguards.

## Use with existing character artwork

Start with the original character reference images and create output in a separate working directory. Review all frames and transparency before copying approved exports to `images/game-sprites/<character-id>/`. Do not overwrite existing images. The tool's image providers require their own supported login or API credentials; do not assume a GitHub connection provides these credentials.

Upstream project: https://github.com/aldegad/sprite-gen (Apache-2.0).
