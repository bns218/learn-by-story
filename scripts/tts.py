#!/usr/bin/env python3
"""Generate Kokoro narration for every story in <ROOT>/scripts.json.
Writes <ROOT>/en_story/<key>_s<i>.wav (i starts at 1), voice af_heart, speed 1.06, lang en-us.
Usage: python3 scripts/tts.py [--speed 1.06] [--only KEY]"""
import argparse, json, os, pathlib
import soundfile as sf
from kokoro_onnx import Kokoro

repo = pathlib.Path(__file__).resolve().parent.parent
root = pathlib.Path(os.environ.get("REELS_ROOT", repo / "work"))
ap = argparse.ArgumentParser(); ap.add_argument("--speed", type=float, default=1.06); ap.add_argument("--only")
a = ap.parse_args()
m = "/root/.cache/hyperframes/tts"
k = Kokoro(f"{m}/models/kokoro-v1.0.onnx", f"{m}/voices/voices-v1.0.bin")
(root / "en_story").mkdir(parents=True, exist_ok=True)
for s in json.load(open(root / "scripts.json")):
    if a.only and s["key"] != a.only: continue
    for i, line in enumerate(s["lines"], 1):
        samples, sr = k.create(line, voice="af_heart", speed=a.speed, lang="en-us")
        out = root / "en_story" / f"{s['key']}_s{i}.wav"
        sf.write(out, samples, sr); print(out, round(len(samples) / sr, 2), "s")
