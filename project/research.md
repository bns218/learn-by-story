# RESEARCH RULE (user requirement, added 2026-10-30): research every concept from reliable sources BEFORE writing the script and the study notes

Why: the earlier videos and notes were written from memory. Facts, dates and numbers must now be checked against sources, and the study notes must show their sources.

## Procedure for EACH concept (do this before writing the episode spec)
1. Search the web (WebSearch, then WebFetch on the best pages) for the concept. Prefer, in this order: university course notes and textbooks (Stanford CS229/CS231n/CS224n, MIT OpenCourseWare, Khan Academy, Dive into Deep Learning d2l.ai, Goodfellow et al. Deep Learning book, Murphy's Probabilistic ML, Bishop's PRML), official library docs (scikit-learn, PyTorch, TensorFlow, NumPy), original papers (arXiv, with the paper title and year), and well-known explainers (3Blue1Brown, StatQuest, Jay Alammar, Lilian Weng). Avoid random blogs, content farms, and AI-generated listicles.
2. Read at least 2 independent sources per concept; for a historical date, a record, a benchmark number, a model size or a quoted statistic, find the original source (paper, official announcement) and use its number.
3. Write down a short research log per concept in the working directory (concept id, 4-8 key facts with the source URL for each). Use it to write the narration, the on-screen numbers and the study notes.
4. If sources disagree, say so in the notes ("sources differ: ...") or leave the claim out of the video. If a number cannot be confirmed, do not state it as fact: drop it or mark it "illustrative" / "about" / "reported".
5. Check all arithmetic by running it in code (Python), including every worked example shown on screen.
6. If web search is unavailable in the run, say so in progress.md, write only well-established textbook-level facts, avoid specific statistics and dates, and mark the notes "sources to be added".

## Study notes must end with a SOURCES section
- Heading "Sources and further reading", 4-8 entries: [Title, author/site, year](URL). Include the sources actually used for the facts in the notes plus 2-3 "go deeper" resources. Only list URLs you opened in this run.
- Also add a one-line "Accuracy note" saying which figures are illustrative.

## In the posting kit
- Add the 2-3 best source links to the LinkedIn post (as "Sources: ..." in the first comment text) and to the YouTube description.
