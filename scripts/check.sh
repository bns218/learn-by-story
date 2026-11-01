#!/usr/bin/env bash
# Run the HyperFrames checker on every built episode. Must show 0 lint, 0 layout errors and no craft warnings.
REPO="$(cd "$(dirname "$0")/.." && pwd)"; ROOT="${REELS_ROOT:-$REPO/work}"
export HYPERFRAMES_BROWSER_PATH="${HYPERFRAMES_BROWSER_PATH:-$(ls /opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell 2>/dev/null | head -1)}"
for d in "$ROOT"/ep-*-en; do
  [ -d "$d" ] || continue
  echo "== $(basename "$d")"
  (cd "$d" && npx hyperframes check --json 2>/dev/null) | python3 -c '
import json,sys
j=json.load(sys.stdin); L=j.get("lint",{}); Y=j.get("layout",{})
print("lint errors:",L.get("errorCount"),"| layout errors:",Y.get("errorCount"),"| warnings:",L.get("warningCount"))
' || echo "check failed for $d"
done
