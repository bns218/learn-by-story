# STYLE PLATES (current house style from 2026-10-29; overrides style_v2.md and pipeline.md where they differ)

Chosen by the user after reviewing six reference videos: hand-drawn character + bold flat colour plates + giant numerals/data posters. First video in this style: 1.05 Functions and slope.

## Generator
- Use `claude/gen_plates.mjs` (NOT gen_v2.mjs, NOT gen.mjs). Write it to /home/claude/ai-ml-reels/gen_plates.mjs, replace ONLY the `const STORIES = [ ... ];` array each day (keep the library above and the build loop below). It already contains: end card (3.2 s tail, 2.35 s hold of the last line), LEARN AI BY STORY label on every plate, left-sliding scene seams, whoosh sound effects at seams, chime on the end card, synthesized background music pad, grain-free flat plates, caption chips (dark rounded chip behind every caption word so captions read on any colour).
- Build command: `MODE=scripts node gen_plates.mjs` (writes scripts.json), Kokoro wavs to en_story/<key>_s<i>.wav, then `LANG_MODE=en node gen_plates.mjs`.
- ROOT defaults to `<repo>/work` (override with REELS_ROOT); TEMPLATE defaults to /tmp/hf-smoke/demo (HF_TEMPLATE). In the repo,
  put each concept's specs in `stories/<file>.mjs` and pass `STORIES_FILE=stories/<file>.mjs` instead of editing the inline array.

## Scene builders (all take `th` = plate colour theme: "blue" | "yellow" | "cream" | "black" | "orange", and `n` = plate number out of the scene count; the plate label says "PLATE n/9", change `total = 9` default in `plate()` if you use a different scene count)
- `pHook({th, n, title, sub, mood})`: big title, italic subtitle, hand-drawn character on a hill line. Use for scene 1.
- `pBig({th, n, title, lines:[{html, fs, col:"a"|"b"|"mute", serif, at, top}], dots:{n,x,y,g,at}})`: giant numerals/expressions with an optional n x n dot square. ALWAYS give every line a `top` (px, between 600 and 1050).
- `pChart({th, n, title, sub, domain:[x0,x1], range:[y0,y1], f, curveCol, lines:[{x1,y1,x2,y2,col,at,dash}], pts:[{x,y,col,at,r}], notes:[{x,y | px,py, html, col, at, fs, serif}], char:{x,y,s,mood,at}})`: a real chart in data coordinates (axes drawn automatically). Keep every line/point/note y inside the range (a line starting below the axis draws outside the chart).
- `pTable({th, n, title, rows:[{left,right,at}], end, endAt})`: rows of giant numerals (max 4 rows so it clears the caption zone).
- `pSigns({th, n, title, items:[{glyph,title,sub,bg,fg}]})`: three coloured bars.
- `pEnd({th, n, title, quote})`: closing plate with the happy character.
- Add new builders in the same style when a concept needs one (use `plate(P, th, {n, css, body, js})` as the wrapper; `agent(id,x,y,s,mood)` draws the character; moods: "happy", "think", "wow").
- Palette per theme is in the `TH` object. Fonts bundled with HyperFrames: League Gothic (titles/numerals), Playfair Display italic (subtitles), Space Mono (labels), Inter.

## Thumbnails and covers
- Use claude/brandkit_plates.py (plate-style YouTube thumbnail 1280x720 + Reels cover 1080x1920 with the character, giant League Gothic title, italic hook, optional giant expression). Look at the PNGs before delivering; if a title is long, shorten it to 2-4 short words.

## Design rules (from the reference videos, the HyperFrames motion skills and the Remotion motion-graphics skills)
1. One idea per plate; alternate colours so no two neighbouring plates share a theme; use black or blue for dense charts, yellow/orange for big numerals, cream for diagrams.
2. REAL DATA ON SCREEN: show the actual numbers and worked steps of the concept (filled tables, tangent slopes, gap values), not just words that repeat the narration.
3. Titles in League Gothic at most 2 short lines (<= 14 characters per line). Nothing between y 1130 and 1310 except captions (chart bottom y 1060, notes above y 1100).
4. Every seam slides left (same direction every time), no crossfades, no looping or idle motion, entrances power4.out, no bounce.
5. No glow or neon; flat colours, thick outlines on the character, hairline crop marks at the corners.
6. Each video has a hook plate with the character first and a closing "Remember" plate with the character; the end card is automatic.
7. Narration: 7-9 scenes; 250-330 words gives 95-115 s. Spell acronyms with spaces for Kokoro ("A I", "L L M").
8. Review gate: `npx hyperframes check --json` must show lint.errorCount 0, layout.errorCount 0 and no craft warnings (watch line_unread: late-appearing last lines must appear at least 2 s before the scene ends; text_below_floor: labels at least 30 px). Then snapshot every scene at 86% of its duration, build a contact sheet (crop 0,168,1080,1340) and LOOK at it before rendering.
9. If `npx hyperframes render` fails with ERR_MODULE_NOT_FOUND, run `cd /tmp && npm i -g hyperframes@latest` and retry. Render one video at a time in the background (about 10 min each).
