#!/usr/bin/env bash
# One-time setup for a fresh container (~3 min). Run in the background at the start of a session:
#   setsid nohup bash scripts/setup.sh > work/setup.log 2>&1 &
set -euo pipefail
REPO="$(cd "$(dirname "$0")/.." && pwd)"
ROOT="${REELS_ROOT:-$REPO/work}"
TPL="${HF_TEMPLATE:-/tmp/hf-smoke/demo}"
mkdir -p "$ROOT"/{en_story,final} "$(dirname "$TPL")"

# HyperFrames CLI + template project (gen_plates.mjs copies gsap.min.js, package.json etc. from it)
(cd /tmp && npm i -g hyperframes@latest)
[ -d "$TPL" ] || (cd "$(dirname "$TPL")" && npx -y hyperframes init "$(basename "$TPL")" --non-interactive)
if [ ! -f "$TPL/gsap.min.js" ]; then
  G=$(find / -name gsap.min.js -path '*gsap@*' 2>/dev/null | head -1 || true)
  [ -n "$G" ] && cp "$G" "$TPL/gsap.min.js" || echo "WARN: gsap.min.js not found; copy it into $TPL"
fi

# Kokoro TTS (voice af_heart)
pip install kokoro-onnx soundfile --break-system-packages -q
M=/root/.cache/hyperframes/tts
mkdir -p "$M/models" "$M/voices"
U=https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0
[ -f "$M/models/kokoro-v1.0.onnx" ] || curl -sSL -o "$M/models/kokoro-v1.0.onnx" "$U/kokoro-v1.0.onnx"
[ -f "$M/voices/voices-v1.0.bin" ]  || curl -sSL -o "$M/voices/voices-v1.0.bin"  "$U/voices-v1.0.bin"

# Thumbnails need python playwright (uses the pre-installed chromium)
python3 -c "import playwright" 2>/dev/null || pip install playwright --break-system-packages -q
echo "SETUP DONE"
