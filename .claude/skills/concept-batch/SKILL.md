---
name: concept-batch
description: Run one full batch of the Learn AI by Story pipeline — 5 concept story videos plus study notes, thumbnails, Reels covers and a posting kit — by reading project/progress.md and delegating each stage to its sub-agent. Use when the user says "run the next batch", "make today's videos", "do batch N", or when a scheduled run fires.
---

# Concept batch (orchestrator)

You coordinate; the sub-agents do the stage work. Work unattended: never stop to ask.

## 0. Read state (yourself, in this order)
1. `project/progress.md` — the 5 IDs for this batch, the batch number, STYLE BY BATCH, OPENING RULE, extra docs owed.
2. `project/research.md`, then the style files for this batch:
   - batches 7–12 (IDs 1.22–1.51): `style_plates.md` + `gen_plates.mjs` + `brandkit_plates.py`
   - batch 13+ (2.01 onward): `style_ref.md` + `gen_ref.mjs` + `brandkit_plates.py`
   - never `gen_v2.mjs` / `gen.mjs`
3. `pipeline.md`, `studynotes.md`, `endcard.md`.

If `progress.md` says the roadmap is complete, report that and stop.
Create `out/batch-N/` and a task list with one task per stage per concept.

## 1. Research — `concept-researcher` (one sub-agent per concept, in parallel)
Pass: concept ID + name, the batch number, the path to `project/research.md`.
Each returns `out/batch-N/research/<id>.md` (research log: facts, book chapters opened, second source, verified numbers, items marked illustrative).

## 2. Video — `video-producer` (ONE sub-agent for all 5; rendering is sequential)
Pass: the 5 research logs, batch number, which generator/style applies.
Returns: 5 MP4 paths, each ≥ 62 s by ffprobe, check output (0 lint / 0 layout / 0 craft warnings for plates), contact-sheet paths.

## 3–5. In parallel once research is done (they do not need the MP4s)
- `notes-writer` — one per concept → study-notes doc (≥ 4 pages, Sources at the end).
- `thumbnail-designer` — one for the batch → 5 thumbnails 1280x720 + 5 Reels covers 1080x1920.
- `social-copywriter` — one for the batch → "Posting kit: batch N".

## 6. Wrap up (yourself) — follow the `progress-update` skill
Deliver MP4s and PNGs to the user, open each doc, update `progress.md`, save the improved generator.

## If something blocks
Deliver everything that is finished, and record exactly what is missing and why in `progress.md`.
Never report a stage done that a sub-agent did not verify.
