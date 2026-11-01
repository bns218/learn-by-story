---
name: episode-video
description: Turn research logs into finished vertical story videos for Learn AI by Story — write the STORIES specs for the batch's generator, generate Kokoro narration, build, run the checker, snapshot and fix visuals, and render MP4s of at least 62 s. Use after concept-research for a batch.
---

# Episode video

## Pick the generator (from progress.md STYLE BY BATCH)
| Batches | IDs | Style guide | Generator |
| --- | --- | --- | --- |
| 7–12 | 1.22–1.51 | `style_plates.md` | `gen_plates.mjs` — hook plate with the character first, real numbers + worked steps on screen, closing Remember plate, 7–9 plates, neighbouring plates in different colour themes |
| 13+ | 2.01 onward | `style_ref.md` | `gen_ref.mjs` — no plate frame; builders `rDiorama rBoard rHud rTerm rPoster rKinetic rReddit rNested rEndcard` take `(D,P,o)`, written `(d,p)=>rHud(d,p,{...})`; each STORIES entry needs `caps` (one caption class per scene); 8–9 scenes ending with `rEndcard` |

Never use `gen_v2.mjs` or `gen.mjs`.
**Not in this repo yet:** `style_ref.md` and `gen_ref.mjs` (reference style, batch 13+). Until they are added to `project/`,
use the plates style for every batch and say so in `progress.md`.

Write each concept's spec as its own file `stories/<id>-<slug>.mjs` (copy `stories/TEMPLATE.mjs`; for a batch, one file
with all 5 stories, e.g. `stories/batch-7.mjs`) and pass it with `STORIES_FILE=...`. Do not edit the inline STORIES array.
If a concept needs a visual the library lacks, add a new scene builder in the same style.

## Spec rules (every video)
- English, vertical 1080x1920, target 95–115 s, MUST be > 62 s.
- Narration 280–316 words total.
- **Opening rule:** first narration line starts `Today's topic: <concept in plain words>.` then the story's hook.
  Scene 1 shows the concept name + ID from the first second (plates: hook plate title + title block;
  reference: a headline/HUD line such as `TODAY: 2.05 Loss functions: MSE, MAE, Huber`).
- Scene 1 still opens on the character's story.
- On-screen numbers come only from the research log's verified worked example.
- The 3 s end card ("free study notes in the bio") is automatic in the generator — don't remove it.

## Build steps (all paths default to `work/`; override with REELS_ROOT)
1. Fresh container: `setsid nohup bash scripts/setup.sh > work/setup.log 2>&1 &` (~3 min, wait for `SETUP DONE`).
2. `STORIES_FILE=stories/<file>.mjs MODE=scripts node project/gen_plates.mjs` → `work/scripts.json`.
3. Kokoro narration: `python3 scripts/tts.py` → `work/en_story/<key>_s<i>.wav`, speed 1.06 (~2 min per story).
4. `STORIES_FILE=... LANG_MODE=en node project/gen_plates.mjs`, then `bash scripts/check.sh`.
   Required: 0 lint errors, 0 layout errors, 0 craft warnings (plates).
5. Snapshot every scene, build a contact sheet, LOOK at it, fix anything off, rebuild, re-check.
6. `setsid nohup bash scripts/render.sh > work/render.log 2>&1 &` — one MP4 at a time, ~7–10 min each.
7. render.sh prints each duration: must be ≥ 62 s. Fail → lengthen narration/scenes and re-render.

## Return
MP4 paths with durations, checker output, contact-sheet paths, and the improved generator file.
