---
name: thumbnails-covers
description: Make the YouTube thumbnail (1280x720) and Instagram Reels cover (1080x1920) for each concept video with project/brandkit_plates.py, then look at every image and fix problems. Use once per batch after the episode specs exist.
---

# Thumbnails and covers

1. Use `project/brandkit_plates.py` for both sizes, for every batch (plates and reference styles alike).
2. Per concept: one YouTube thumbnail **1280x720** and one Reels cover **1080x1920**, into `out/batch-N/art/`
   as `<id>_thumb.png` and `<id>_cover.png`.
3. Text: concept name in plain words + ID, the brand line "Learn AI by Story". Short, readable at phone size.
4. LOOK at every PNG (open the image). Check: text not clipped, contrast readable, no overlap with the
   YouTube timestamp corner (bottom-right of the thumbnail), Reels safe zone (keep text out of the top and
   bottom ~250 px of the cover). Fix and regenerate until clean.
5. Verify sizes with Python/PIL before returning.
