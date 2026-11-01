#!/usr/bin/env python3
"""Learn AI by Story thumbnails and Reels covers in the PLATES style (flat colour plate, League Gothic title, hand-drawn character).
Usage: python3 brandkit_plates.py thumbs items.json OUT
items.json: [{"id":"1.05","title":"Functions and slope","hook":"How steep is it here?","th":"blue","big":"f'(x) = 2x","mood":"think"}]
  th (optional): blue|yellow|cream|black|orange (default cycles by item). big (optional): giant expression shown with the character.
Needs: python playwright + chromium, node, and the global `hyperframes` npm package (its embedded fonts are used)."""
import sys, json, os, html, subprocess
from playwright.sync_api import sync_playwright
TH = {
 "blue":{"bg":"#1F2D8F","ink":"#F6F0E0","a":"#FBB91F"}, "yellow":{"bg":"#FBB91F","ink":"#14110F","a":"#1F2D8F"},
 "cream":{"bg":"#F4EFE3","ink":"#14110F","a":"#D63A12"}, "black":{"bg":"#14110F","ink":"#F4EFE3","a":"#FF6A2B"},
 "orange":{"bg":"#E8481C","ink":"#14110F","a":"#F4EFE3"}}
ORDER = ["blue","yellow","orange","cream","black"]
def fonts_css():
    root = subprocess.check_output(["npm","root","-g"]).decode().strip()
    js = ("import('%s/hyperframes/dist/chunk-FI4I7CME.js').then(m=>{const o={};for(const [k,v] of m.EMBEDDED_FONT_DATA)o[k]=v;console.log(JSON.stringify(o))})" % root)
    d = json.loads(subprocess.check_output(["node","-e",js]).decode())
    want = [("League Gothic","@fontsource/league-gothic:400:normal",400),("Playfair Display","@fontsource/playfair-display:700:normal",700),
            ("Space Mono","@fontsource/space-mono:700:normal",700),("Inter","@fontsource/inter:900:normal",900)]
    return "".join("@font-face{font-family:'%s';font-weight:%d;src:url(%s) format('woff2')}" % (n,w,d[k]) for n,k,w in want)
def agent(x,y,s,mood="happy"):
    ink,body="#231815","#E46B49"
    if mood=="wow": eyes=f'<circle cx="-34" cy="-82" r="15" fill="#fff" stroke="{ink}" stroke-width="5"/><circle cx="34" cy="-82" r="15" fill="#fff" stroke="{ink}" stroke-width="5"/><circle cx="-34" cy="-80" r="6" fill="{ink}"/><circle cx="34" cy="-80" r="6" fill="{ink}"/>'; mouth=f'<ellipse cx="0" cy="-42" rx="13" ry="16" fill="{ink}"/>'
    elif mood=="think": eyes=f'<circle cx="-34" cy="-80" r="7" fill="{ink}"/><circle cx="34" cy="-80" r="7" fill="{ink}"/><path d="M-52 -104 L-20 -98 M52 -104 L20 -98" stroke="{ink}" stroke-width="6" stroke-linecap="round"/>'; mouth=f'<path d="M-14 -40 L14 -44" stroke="{ink}" stroke-width="6" stroke-linecap="round"/>'
    else: eyes=f'<path d="M-50 -78 Q-34 -100 -18 -78 M18 -78 Q34 -100 50 -78" stroke="{ink}" stroke-width="7" stroke-linecap="round" fill="none"/>'; mouth=f'<path d="M-22 -50 Q0 -24 22 -50" stroke="{ink}" stroke-width="7" stroke-linecap="round" fill="none"/>'
    return (f'<g transform="translate({x} {y}) scale({s})"><rect x="-70" y="-22" width="22" height="26" rx="6" fill="{body}" stroke="{ink}" stroke-width="7"/><rect x="48" y="-22" width="22" height="26" rx="6" fill="{body}" stroke="{ink}" stroke-width="7"/>'
            f'<rect x="-100" y="-146" width="200" height="130" rx="22" fill="{body}" stroke="{ink}" stroke-width="7"/><rect x="-118" y="-100" width="20" height="46" rx="8" fill="{body}" stroke="{ink}" stroke-width="7"/><rect x="98" y="-100" width="20" height="46" rx="8" fill="{body}" stroke="{ink}" stroke-width="7"/>'
            f'<circle cx="-62" cy="-56" r="9" fill="#F59A80" opacity=".8"/><circle cx="62" cy="-56" r="9" fill="#F59A80" opacity=".8"/>{eyes}{mouth}</g>')
def marks(w,h,m,c):
    L=lambda x,y,dx,dy:f'<path d="M{x+dx} {y} L{x} {y} L{x} {y+dy}" stroke="{c}" stroke-width="4" opacity=".6" fill="none"/>'
    return f'<svg style="position:absolute;left:0;top:0" width="{w}" height="{h}">{L(m,m,34,34)}{L(w-m,m,-34,34)}{L(m,h-m,34,-34)}{L(w-m,h-m,-34,-34)}</svg>'
import textwrap
def fit(text,width,sizes,maxh):
    for sz in sizes:
        cpl=max(4,int(width/(sz*0.42)))
        words=text.split(); lines=[]; cur=""
        for wd in words:
            if len(cur)+len(wd)+(1 if cur else 0)<=cpl: cur=(cur+" "+wd).strip()
            else:
                lines.append(cur); cur=wd
        lines.append(cur)
        if max(len(l) for l in lines)<=cpl and len(lines)*sz*0.9<=maxh: return sz
    return sizes[-1]
def page(it,idx,w,h,vertical,css):
    th=TH[it.get("th") or ORDER[idx%5]]; t=html.escape(it["title"]).upper(); hook=html.escape(it.get("hook","")); i=html.escape(it["id"]); big=html.escape(it.get("big","")); mood=it.get("mood","happy")
    base=f"*{{margin:0;box-sizing:border-box}}body{{width:{w}px;height:{h}px;position:relative;overflow:hidden;background:{th['bg']};color:{th['ink']}}}.t{{font-family:'League Gothic';text-transform:uppercase;line-height:.9;position:absolute}}.l{{font-family:'Space Mono';font-weight:700;letter-spacing:.12em;position:absolute}}.s{{font-family:'Playfair Display';font-style:italic;font-weight:700;color:{th['a']};position:absolute;line-height:1.1}}.b{{font-family:'League Gothic';color:{th['a']};position:absolute;line-height:.9;white-space:nowrap}}"
    if not vertical:
        body=(f"{marks(w,h,36,th['ink'])}<div class=l style='left:70px;top:58px;font-size:30px'>LEARN AI BY STORY · {i}</div>"
              f"<div class=t style='left:70px;top:130px;width:780px;font-size:{fit(t,780,[240,210,180,150],390)}px'>{t}</div>"
              f"<div class=s style='left:70px;bottom:62px;width:800px;font-size:52px'>{hook}</div>"
              f"<svg style='position:absolute;left:0;top:0' width={w} height={h}>{agent(1040,520,1.55,mood)}</svg>"
              + (f"<div class=b style='left:860px;width:380px;top:150px;font-size:{90 if len(big)>8 else 120}px;text-align:center'>{big}</div>" if big else ""))
    else:
        body=(f"{marks(w,h,60,th['ink'])}<div class=l style='left:0;right:0;top:250px;text-align:center;font-size:40px'>LEARN AI BY STORY · {i}</div>"
              f"<div class=t style='left:70px;right:70px;top:420px;text-align:center;font-size:{fit(t,940,[300,260,220,180],520)}px'>{t}</div>"
              f"<div class=s style='left:90px;right:90px;top:1180px;text-align:center;font-size:72px'>{hook}</div>"
              f"<svg style='position:absolute;left:0;top:0' width={w} height={h}>{agent(540,1700,2.0,mood)}</svg>"
              + (f"<div class=b style='left:0;right:0;top:1000px;text-align:center;font-size:150px'>{big}</div>" if big else ""))
    return f"<html><head><style>{css}{base}</style></head><body>{body}</body></html>"
def shot(p,src,w,h,path):
    pg=p.new_page(viewport={"width":w,"height":h}); pg.set_content(src); pg.wait_for_timeout(300); pg.screenshot(path=path); pg.close()
if __name__=="__main__":
    items=json.load(open(sys.argv[2])); out=sys.argv[3]; os.makedirs(out,exist_ok=True); css=fonts_css()
    with sync_playwright() as p:
        b=p.chromium.launch()
        for k,it in enumerate(items):
            shot(b,page(it,k,1280,720,False,css),1280,720,f"{out}/{it['id']}-yt-thumb-1280x720.png")
            shot(b,page(it,k,1080,1920,True,css),1080,1920,f"{out}/{it['id']}-reel-cover-1080x1920.png")
        b.close()
