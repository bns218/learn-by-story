---
name: concept-video
description: Make the full Learn AI by Story package for ANY single AI/ML/DL concept the user names (a roadmap ID like "1.22" or free text like "attention mechanism") — research, study notes, story script, narration, rendered vertical video, thumbnail + Reels cover, and LinkedIn/YouTube/Instagram posts. Use when the user says "make a video on <concept>", "do <concept>", "research <concept>", or gives one concept instead of asking for the next batch.
---

# One concept → research, notes, posts, script, video

Input: one concept. If it is a roadmap ID, take its exact name from the Roadmap doc (see `project/progress.md` for how to read it).
If it is free text, give it an ID of the form `x.<slug>` (e.g. `x.attention`) so file names stay unique.
Output folder: `out/<id>/`. Work unattended; record blockers in the final message.

## 0. Setup (start in the background, it takes ~3 min)
`mkdir -p work && setsid nohup bash scripts/setup.sh > work/setup.log 2>&1 &` — skip if `work/setup.log` already ends with `SETUP DONE`.
Read `CLAUDE.md`, `project/research.md`, `project/style_plates.md`, `project/studynotes.md`, `project/endcard.md` while it runs.

## 1. Research — `concept-researcher` sub-agent
Follow the `concept-research` skill. Output `out/<id>/research.md` (facts with sources, books opened, second source,
worked example verified in Python, illustrative items, best 2–3 links).

## 2. Script — write `stories/<id>-<slug>.mjs` (copy `stories/TEMPLATE.mjs`)
- 7–9 scenes, `scenes.length === en.length`, 280–316 narration words.
- Narration line 1 starts `Today's topic: <concept in plain words>.` then the story hook; scene 1 is `pHook` showing `TODAY: <id> <name>`.
- Real numbers + worked steps on screen, only from the research log's verified example. Last scene `pEnd` ("Remember").
- Neighbouring plates in different themes. Builder options are documented in `project/style_plates.md`.
- Spell acronyms with spaces for Kokoro ("A I", "L L M").
- Also save the narration as plain text in `out/<id>/script.md` (scene by scene) for the user.

## 3. Video — `video-producer` sub-agent (or yourself)
```
export STORIES_FILE=stories/<file>.mjs
MODE=scripts node project/gen_plates.mjs        # writes work/scripts.json
python3 scripts/tts.py --only <key>             # work/en_story/<key>_s<i>.wav
LANG_MODE=en node project/gen_plates.mjs        # builds work/ep-<id>-<slug>-en/
bash scripts/check.sh                           # 0 lint, 0 layout, 0 craft warnings
```
Snapshot every scene at ~86 % (`npx hyperframes snapshot --at t1,t2,... --no-end -o snaps` inside the episode dir),
build a contact sheet (crop 0,168,1080,1340), LOOK at it, fix, rebuild, re-check.
Render: `setsid nohup bash scripts/render.sh > work/render.log 2>&1 &` (keep any single `sleep` ≤ 400 s while waiting).
The MP4 must be ≥ 62 s (render.sh prints it). Copy it to `out/<id>/`.

## 4–6. In parallel after research
- **Study notes** — `notes-writer`, `study-notes` skill → Docs doc or `out/<id>/notes.md` (≥ 4 pages, ~2,000+ words, Sources at the end).
- **Thumbnail + Reels cover** — `thumbnail-designer`, `thumbnails-covers` skill → `out/<id>/` (unset HYPERFRAMES_BROWSER_PATH first).
- **Posts** — `social-copywriter`, `posting-kit` skill for this one video → `out/<id>/posts.md`
  (LinkedIn post, YouTube title + description, Instagram title + caption + hashtags, brand line).

## 7. Finish
Send the MP4 and PNGs to the user, give links/paths for notes and posts.
Commit `stories/<file>.mjs` and any new scene builder in `project/gen_plates.mjs` (MP4/PNG/WAV are git-ignored).
If the concept is a roadmap ID, add a line under "Ad-hoc videos" in `project/progress.md`; do not change the batch order.
