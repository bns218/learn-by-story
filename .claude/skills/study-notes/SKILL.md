---
name: study-notes
description: Write the detailed study-notes document for one concept video — at least 4 pages and about 2,000 words, no maximum, covering definitions, explanations and everything the video did not explain, ending with Sources and further reading. Use for every video in a batch. Not a Jupyter notebook.
---

# Study notes

Length and structure rules come from `project/studynotes.md` (it wins on any conflict).

## Requirements
- MINIMUM 4 pages, about 2,000 words. NO MAXIMUM — write as long as the concept needs.
- Not a Jupyter notebook. A document: a Claude Docs doc when the Docs connector is available
  (open it with the Artifact `open` action), otherwise `out/batch-N/notes/<id>.md`.
- Facts only from the research log; anything marked illustrative stays labelled illustrative.

## Structure
1. Title: `<id> <concept name>` + one-line summary
2. Key definitions
3. Detailed explanation (intuition → math → worked example with the verified numbers)
4. What the video did not cover (edge cases, variants, common mistakes, how it's used in practice)
5. Formulas as display LaTeX blocks
6. Practice questions with short answers
7. **Sources and further reading** — 4–8 sources you actually opened: books with chapter titles, papers,
   course notes, plus a one-line accuracy note (what was verified, what is illustrative)
