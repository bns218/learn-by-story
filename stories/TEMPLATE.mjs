// Story template for one concept. Copy to stories/<id>-<slug>.mjs and fill in.
// Build with:  STORIES_FILE=stories/<file>.mjs MODE=scripts node project/gen_plates.mjs   (then TTS, then build)
// Rules (project/style_plates.md + CLAUDE.md):
//  - 7-9 scenes; scenes.length === en.length; 280-316 narration words total (95-115 s at Kokoro speed 1.06)
//  - first line starts "Today's topic: <concept in plain words>." then the story hook
//  - scene 1 = pHook with the character, last scene = pEnd ("Remember" plate); neighbouring plates in different themes
//  - real numbers + worked steps on screen, every number verified in Python (see the research log)
//  - id must look like "ep-<roadmap id>-<slug>"; key is a short unique code used for wav file names
export default ({ pHook, pBig, pChart, pTable, pSigns, pGrid, pEnd }) => [
  {
    id: "ep-0.00-template", key: "t000", n: 0,
    scenes: [
      pHook({ th: "yellow", n: 1, title: "Today:<br/>Topic", sub: "TODAY: 0.00 Template concept. A character meets a problem.", mood: "think" }),
      pBig({ th: "blue", n: 2, title: "The idea", lines: [{ html: "2 + 2 = 4", fs: 220, at: 0.2, top: 660 }, { html: "one worked step", fs: 58, serif: true, at: 0.6, top: 1000 }] }),
      pEnd({ th: "cream", n: 3, title: "Remember", quote: "One concept, one story." }),
    ],
    en: [
      "Today's topic: the template concept. Meet Asha, who has a problem only this idea can solve.",
      "Here is the idea in one worked step. Two plus two is four, and every number on screen is checked.",
      "Remember: one concept, one story. Study notes are in the bio.",
    ],
  },
];
