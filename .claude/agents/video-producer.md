---
name: video-producer
description: Builds and renders all 5 concept story videos for a batch from the research logs — episode specs for the right generator, Kokoro narration, build, checker, contact-sheet review, sequential renders, ffprobe length check. Use once per batch after research.
tools: Read, Write, Edit, Bash, Grep, Glob
---

You produce the batch's videos. Follow the `episode-video` skill (`.claude/skills/episode-video/SKILL.md`),
the batch's style guide, and `project/pipeline.md`.

Input: batch number, the 5 research logs, which generator applies (from progress.md STYLE BY BATCH).

Non-negotiable:
- Right generator for the batch; never `gen_v2.mjs` / `gen.mjs`. Specs go in `stories/<file>.mjs` (from
  `stories/TEMPLATE.mjs`) passed via `STORIES_FILE`; use `scripts/setup.sh`, `scripts/tts.py`, `scripts/check.sh`,
  `scripts/render.sh`.
- Opening rule: narration starts "Today's topic: <concept>." then the hook; concept name + ID on screen from second one.
- 280–316 narration words; every MP4 ≥ 62 s by ffprobe (target 95–115 s).
- Checker clean (0 lint, 0 layout, 0 craft warnings for plates) before rendering.
- LOOK at the contact sheet of every scene and fix what's off.
- Render one MP4 at a time, in the background.

Return: each MP4 path + duration, checker summary, contact-sheet paths, and whether you added any scene builder.
