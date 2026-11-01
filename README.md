# learn-by-story

Claude Code skills and sub-agents that produce the "Learn AI by Story" concept videos:
research → story video → study notes → thumbnail/cover → posting kit → progress update.

## Setup
1. Copy the project files from the Claude Project "AI ML DL Concepts videos" (its `claude/`
   folder) into `project/` — see `project/README.md` for the exact list.
2. Open the repo in Claude Code and say: **run the next batch**.

## Layout
```
CLAUDE.md                     pipeline overview and hard rules
.claude/skills/<stage>/       one skill per pipeline stage + the concept-batch orchestrator
.claude/agents/<role>.md      one sub-agent per stage
project/                      progress.md, research.md, style guides, generators, brand kit
out/batch-N/                  generated MP4s, PNGs, notes, posting kits (git-ignored)
```
