# learn-by-story

Claude Code skills and sub-agents that make **Learn AI by Story** videos: give it an AI/ML/DL concept and it
researches the concept, writes the study notes, the story script, the social posts, and renders a vertical story video.

## Use it
Open the repo in Claude Code (CLI, desktop or claude.ai/code) and say one of:

| You say | What runs | You get |
| --- | --- | --- |
| `make a video on attention mechanism` (or `do 1.22`) | `concept-video` skill | research log, study notes, script, MP4, thumbnail, Reels cover, posts, all in `out/<id>/` |
| `run the next batch` | `concept-batch` skill | the next 5 roadmap IDs from `project/progress.md`, same outputs per video plus one posting kit |

Every video: vertical 1080x1920, English, 95–115 s (always > 62 s). The first line is "Today's topic: …", it shows real
numbers verified in Python, and it ends with a 3 s "study notes in the bio" end card.

## What happens for one concept
1. **Research** (`concept-researcher`): preferred textbooks first (D2L, Goodfellow, ISL/ESL, Bishop, MML, Murphy, …), a
   second independent source, every number checked in Python → `research.md`.
2. **Script**: a 7–9 scene story with a character, 280–316 words → `stories/<id>-<slug>.mjs` + `script.md`.
3. **Video** (`video-producer`): Kokoro narration → HyperFrames build → checker → contact-sheet review → render.
4. **Study notes** (`notes-writer`): ≥ 4 pages, ~2,000+ words, ends with Sources and further reading.
5. **Thumbnail + Reels cover** (`thumbnail-designer`): 1280x720 and 1080x1920, plates style.
6. **Posts** (`social-copywriter`): LinkedIn post, YouTube title + description, Instagram title + caption + hashtags.

## Layout
```
CLAUDE.md                  rules every session follows
.claude/skills/            concept-video, concept-batch, concept-research, episode-video,
                           study-notes, thumbnails-covers, posting-kit, progress-update
.claude/agents/            concept-researcher, video-producer, notes-writer, thumbnail-designer, social-copywriter
project/                   progress.md, research.md, studynotes.md, style_plates.md, gen_plates.mjs,
                           brandkit_plates.py, endcard.md, pipeline.md  (see project/README.md)
stories/                   one story spec per concept or batch; TEMPLATE.mjs to start from
scripts/                   setup.sh, tts.py, check.sh, render.sh
work/, out/                build files and finished outputs (git-ignored)
```

## Run it by hand
```bash
setsid nohup bash scripts/setup.sh > work/setup.log 2>&1 &     # once per fresh machine, ~3 min
export STORIES_FILE=stories/TEMPLATE.mjs
MODE=scripts node project/gen_plates.mjs                      # narration lines → work/scripts.json
python3 scripts/tts.py                                        # Kokoro wavs → work/en_story/
LANG_MODE=en node project/gen_plates.mjs                      # HyperFrames projects → work/ep-*-en/
bash scripts/check.sh                                         # must be 0 lint / 0 layout errors
bash scripts/render.sh                                        # MP4s → work/final/, prints durations
```
Needs Node 22+, Python 3, ffmpeg, Chromium (Playwright), and network access for the setup downloads.

## Known gaps
- `style_ref.md` and `gen_ref.mjs` (reference style for batch 13+, Module 2) are not in the repo; plates style is used until they are added.
- `project/gen_plates.mjs` predates batch 6's `pShapes` unit-ball builder.
- Study notes and posting kits go to Claude Docs when that connector is available, otherwise to Markdown in `out/`.

Roadmap (315 concepts): https://claude.ai/artifact/KhbB3q3ge5bb6NdAmEoGjQ
