# Repository agent instructions

For requests involving game characters, sprite sheets, transparent animation frames, sprite atlases, or motion loops, read and follow `.agents/skills/sprite-gen/SKILL.md` before taking action.

Important boundaries:
- Keep sprite generation outside the static website's production build and Vercel runtime.
- Preserve existing website behavior and existing character artwork.
- Generate to a separate working directory first; copy approved exports into `images/game-sprites/<character-id>/` only after review and approval.
- Never use a per-call billed API provider or switch to one without explicit user approval.
- Do not commit credentials, tokens, local virtual environments, generated temporary runs, or unreviewed assets.
