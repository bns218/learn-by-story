---
name: progress-update
description: Close out a Learn AI by Story batch — deliver files, record the batch in project/progress.md with the next 5 IDs, and save the improved generator back. Use at the end of every batch, including partial ones.
---

# Progress update

## Deliver
- Send the MP4s and PNGs to the user; open every study-notes doc and the posting kit.

## Update `project/progress.md`
Append, never rewrite earlier records. Add for this batch:
- batch number, the 5 IDs + names, links to each study-notes doc and the posting kit
- MP4 durations, anything marked illustrative, lessons from this run
- the NEXT 5 IDs in roadmap order
Keep intact: all earlier records, the Module 1 → Module 2 plan (finish 1.22–1.51, then 2.01 remade full length),
the STYLE BY BATCH rule, and the OPENING RULE.
If the batch was partial, record exactly what is finished and what is missing.

## Save the generator
Write the improved generator (`gen_plates.mjs` or `gen_ref.mjs`) back to `project/` holding only this batch's STORIES.

## Commit
`git add project/ && git commit` with a message like `batch N: 1.22–1.26 done` and push to the working branch.
