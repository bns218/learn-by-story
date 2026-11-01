#!/usr/bin/env bash
# Render every built episode ONE AT A TIME into <ROOT>/final/, then print each MP4 duration (must be >= 62 s).
# Run detached:  setsid nohup bash scripts/render.sh > work/render.log 2>&1 &
REPO="$(cd "$(dirname "$0")/.." && pwd)"; ROOT="${REELS_ROOT:-$REPO/work}"
export HYPERFRAMES_BROWSER_PATH="${HYPERFRAMES_BROWSER_PATH:-$(ls /opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell 2>/dev/null | head -1)}"
mkdir -p "$ROOT/final"
for d in "$ROOT"/ep-*-en; do
  [ -d "$d" ] || continue
  n=$(basename "$d"); echo "RENDER $n $(date +%T)"
  (cd "$d" && npx hyperframes render -o "../final/$n.mp4") || echo "FAILED $n (if ERR_MODULE_NOT_FOUND: cd /tmp && npm i -g hyperframes@latest)"
done
for f in "$ROOT"/final/*.mp4; do
  t=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")
  python3 -c "import sys;t=float('$t');print('$f',round(t,1),'s','OK' if t>=62 else 'TOO SHORT (<62 s)')"
done
echo "RENDER DONE"
