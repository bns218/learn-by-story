# Learn AI by Story — concept video pipeline

This repo turns one roadmap of 315 AI/ML/DL concepts into short story videos for the
"Learn AI by Story" YouTube channel and Instagram page, 5 concepts per batch.

## How to run a batch
Say "run the next batch" (or `/concept-batch`). The `concept-batch` skill reads
`project/progress.md`, picks the next 5 IDs, and hands each stage to a sub-agent:

| Stage | Skill | Sub-agent |
| --- | --- | --- |
| 1. Research | `concept-research` | `concept-researcher` |
| 2. Video (spec, narration, build, check, render) | `episode-video` | `video-producer` |
| 3. Study notes | `study-notes` | `notes-writer` |
| 4. Thumbnail + Reels cover | `thumbnails-covers` | `thumbnail-designer` |
| 5. Posting kit | `posting-kit` | `social-copywriter` |
| 6. Progress + generator save | `progress-update` | (main session) |

## Source of truth (in this order)
1. `project/progress.md` — which IDs are next, what is done, STYLE BY BATCH, OPENING RULE
2. `project/research.md` — mandatory research rule + preferred books
3. The style guide for the batch (`project/style_plates.md` or `project/style_ref.md`)
4. `project/studynotes.md`, `project/pipeline.md`, `project/endcard.md`

Where `pipeline.md` conflicts with the files above it, the files above win.

## Hard rules
- Never use `gen_v2.mjs` or `gen.mjs`. Batches 7–12 (IDs 1.22–1.51) use `gen_plates.mjs`;
  batch 13 onward (2.01+) uses `gen_ref.mjs`.
- Finish Module 1 (1.22–1.51, strict order) before Module 2; Module 2 starts AT 2.01 (remade full length).
- Every video: vertical 1080x1920, English, longer than 62 s (target 95–115 s),
  narration 280–316 words, first line "Today's topic: <concept>." then the hook,
  ends with the 3 s end card ("free study notes in the bio").
- Never claim to have read a book you did not open. Verify every on-screen number in Python.
- Work unattended: do not stop to ask questions; record blockers in `progress.md`.
