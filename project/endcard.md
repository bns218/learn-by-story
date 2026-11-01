# END CARD RULE (user requirement)

The last 3 seconds of EVERY video show an end card telling viewers to check the bio for the study notes ("notebook"). Apply these edits to gen.mjs (the build loop at the bottom) before building, and keep them in the saved gen.mjs:

1. Longer tail on the last scene: change
   `tail = i === V.scenes.length - 1 ? 1.0 : 0.3`
   to
   `tail = i === V.scenes.length - 1 ? 3.2 : 0.3`
   (narration finishes, then the end card has about 3 s; the 62 s length check applies to the final MP4 as before).

2. Series label: change the `#series` text `AI · ML · DL STORIES` to `LEARN AI BY STORY`.

3. In the index.html template string add this CSS (inside <style>):
```
#endcard { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; background: rgba(10,15,31,.96); opacity: 0; }
#ec1 { position: absolute; left: 60px; right: 60px; top: 640px; text-align: center; font-size: 84px; font-weight: 900; line-height: 1.08; color: #F5F7FF; opacity: 0; }
#ec2 { position: absolute; left: 60px; right: 60px; top: 880px; text-align: center; font-size: 64px; font-weight: 900; color: #FBBF24; opacity: 0; }
#ec3 { position: absolute; left: 60px; right: 60px; top: 1010px; text-align: center; font-size: 42px; font-weight: 800; letter-spacing: .08em; color: #22D3EE; opacity: 0; }
```
and this markup right after the captions host div (so it sits above everything, before the audio tags):
```
<div id="endcard"></div><div id="ec1">Free study notes<br/>for this concept</div><div id="ec2">Check the bio</div><div id="ec3">LEARN AI BY STORY</div>
```
and in the main timeline script (next to the `#prog` tween), with T = total duration:
```
tl.fromTo("#endcard", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, ${T - 3.0});
tl.fromTo("#ec1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, ${T - 2.7});
tl.fromTo("#ec2", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, ${T - 2.3});
tl.fromTo("#ec3", { opacity: 0 }, { opacity: 1, duration: 0.4 }, ${T - 1.9});
```
Do not put CSS transforms on these elements (GSAP animates them). The end card elements must not overlap each other (lint). Snapshot the last frame (at T-0.3) and look at it. The narration may optionally end with the line "Study notes are in the bio."
