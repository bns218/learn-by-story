// Plates-style story videos for "Learn AI by Story". 1080x1920.
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = "/home/claude/ai-ml-reels";
const TEMPLATE = "/tmp/hf-smoke/demo";
const LANG = process.env.LANG_MODE || "en";
const C = { bg: "#0A0F1F", panel: "#131A33", line: "#232C52", ink: "#F5F7FF", mute: "#8D97B8", cyan: "#22D3EE", amber: "#FBBF24", pink: "#FB7185", green: "#34D399", violet: "#A78BFA" };
const dur = (f) => parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${f}"`).toString());
const f1 = (n) => Math.round(n * 10) / 10;
const T = (D) => (f) => +(f * D).toFixed(2);
const DASH = `pathLength="1" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 1.2" stroke-dashoffset="1.1"`;

/* =============== PLATES style library (bold flat colour plates + hand-drawn character + giant numerals) =============== */
const TH = {
  blue: { bg: "#1F2D8F", ink: "#F6F0E0", a: "#FBB91F", b: "#FF6A4D", mute: "#A9B3F0" },
  yellow: { bg: "#FBB91F", ink: "#14110F", a: "#1F2D8F", b: "#D63A12", mute: "#7A5A00" },
  cream: { bg: "#F4EFE3", ink: "#14110F", a: "#D63A12", b: "#1F2D8F", mute: "#8A8372" },
  black: { bg: "#14110F", ink: "#F4EFE3", a: "#FF6A2B", b: "#FBB91F", mute: "#8A8372" },
  orange: { bg: "#E8481C", ink: "#14110F", a: "#F4EFE3", b: "#FBB91F", mute: "#5A1A08" },
};
function plate(id, th, { n = 1, total = globalThis.CURTOTAL || 9, tag = globalThis.CURTAG || "1.05", css = "", body = "", js = "" }) {
  const mk = (x, y, dx, dy) => `M${x + dx} ${y} L${x} ${y} L${x} ${y + dy}`;
  const marks = [mk(60, 236, 30, 30), mk(1020, 236, -30, 30), mk(60, 1296, 30, -30), mk(1020, 1296, -30, -30)].map((d) => `<path d="${d}" stroke="${th.ink}" stroke-width="3" opacity="0.55"/>`).join("");
  return `<template>
  <style>
    #root { position: absolute; inset: 0; font-family: 'Inter', sans-serif; color: ${th.ink}; overflow: hidden; }
    #root * { box-sizing: border-box; }
    .${id}-plate { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; background: ${th.bg}; }
    .${id}-lab { position: absolute; top: 192px; font-family: 'Space Mono', monospace; font-size: 30px; letter-spacing: .1em; color: ${th.ink}; opacity: .8; }
    .${id}-svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    .${id}-t { position: absolute; left: 80px; right: 80px; top: 262px; font-family: 'League Gothic', 'Oswald', sans-serif; font-size: 156px; line-height: .92; text-transform: uppercase; color: ${th.ink}; letter-spacing: .005em; }
    .${id}-s { position: absolute; left: 80px; right: 80px; font-family: 'Playfair Display', serif; font-style: italic; font-weight: 600; font-size: 50px; line-height: 1.1; color: ${th.a}; }
    ${css}
  </style>
  <div id="root" data-composition-id="${id}" data-width="1080" data-height="1920">
    <div class="${id}-plate"></div>
    <svg class="${id}-svg" viewBox="0 0 1080 1920" fill="none">${marks}</svg>
    <div class="${id}-lab" style="left:80px">LEARN AI BY STORY</div><div class="${id}-lab" style="right:80px">PLATE ${n}/${total} · ${tag}</div>
    ${body}
  </div>
  <script>
    (function () {
      const tl = gsap.timeline({ paused: true });
      const up = (s, t, d = 0.45) => tl.fromTo(s, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: d, ease: "power4.out" }, t);
      const pop = (s, t, d = 0.35) => tl.fromTo(s, { opacity: 0, scale: 0.5, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d, ease: "back.out(1.7)" }, t);
      const fade = (s, t, d = 0.35) => tl.fromTo(s, { opacity: 0 }, { opacity: 1, duration: d, ease: "power2.out" }, t);
      const draw = (s, t, d = 0.7) => tl.fromTo(s, { strokeDashoffset: 1.1 }, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t);
      ${js}
      window.__timelines["${id}"] = tl;
    })();
  </script>
</template>
`;
}
const pTitle = (P, t, sub, subTop) => `<div class="${P}-t" id="${P}-t" style="opacity:0">${t}</div>${sub ? `<div class="${P}-s" id="${P}-s" style="top:${subTop || 560}px;opacity:0">${sub}</div>` : ""}`;
const pTitleJs = (P, sub) => `up("#${P}-t", 0.08, 0.5);${sub ? `fade("#${P}-s", 0.3, 0.4);` : ""}`;

/* hand-drawn character */
function agent(id, x, y, s, mood = "happy") {
  const ink = "#231815", body = "#E46B49";
  const eyes = mood === "wow"
    ? `<circle cx="-34" cy="-82" r="15" fill="#fff" stroke="${ink}" stroke-width="5"/><circle cx="34" cy="-82" r="15" fill="#fff" stroke="${ink}" stroke-width="5"/><circle cx="-34" cy="-80" r="6" fill="${ink}"/><circle cx="34" cy="-80" r="6" fill="${ink}"/>`
    : mood === "think"
      ? `<circle cx="-34" cy="-80" r="7" fill="${ink}"/><circle cx="34" cy="-80" r="7" fill="${ink}"/><path d="M-52 -104 L-20 -98 M52 -104 L20 -98" stroke="${ink}" stroke-width="6" stroke-linecap="round"/>`
      : `<path d="M-50 -78 Q-34 -100 -18 -78 M18 -78 Q34 -100 50 -78" stroke="${ink}" stroke-width="7" stroke-linecap="round"/>`;
  const mouth = mood === "wow" ? `<ellipse cx="0" cy="-42" rx="13" ry="16" fill="${ink}"/>` : mood === "think" ? `<path d="M-14 -40 L14 -44" stroke="${ink}" stroke-width="6" stroke-linecap="round"/>` : `<path d="M-22 -50 Q0 -24 22 -50" stroke="${ink}" stroke-width="7" stroke-linecap="round" fill="none"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})"><g id="${id}">
    <rect x="-70" y="-22" width="22" height="26" rx="6" fill="${body}" stroke="${ink}" stroke-width="7"/><rect x="48" y="-22" width="22" height="26" rx="6" fill="${body}" stroke="${ink}" stroke-width="7"/>
    <rect x="-100" y="-146" width="200" height="130" rx="22" fill="${body}" stroke="${ink}" stroke-width="7"/>
    <rect x="-118" y="-100" width="20" height="46" rx="8" fill="${body}" stroke="${ink}" stroke-width="7"/><rect x="98" y="-100" width="20" height="46" rx="8" fill="${body}" stroke="${ink}" stroke-width="7"/>
    <circle cx="-62" cy="-56" r="9" fill="#F59A80" opacity=".8"/><circle cx="62" cy="-56" r="9" fill="#F59A80" opacity=".8"/>
    ${eyes}${mouth}
  </g></g>`;
}

/* P: hook with character and hill */
const pHook = (o) => (D, P) => {
  const th = TH[o.th], t = T(D);
  const hill = `<path id="${P}-hill" d="M60 1180 C 260 1180, 330 900, 520 940 S 760 1180, 1020 820" stroke="${th.a}" stroke-width="12" ${DASH}/>`;
  return plate(P, th, {
    n: o.n,
    css: `.${P}-q { position: absolute; left: 80px; right: 80px; top: 640px; font-family: 'Playfair Display', serif; font-style: italic; font-weight: 600; font-size: 64px; line-height: 1.1; color: ${th.a}; }`,
    body: `${pTitle(P, o.title)}<div class="${P}-q" id="${P}-q" style="opacity:0">${o.sub}</div><svg class="${P}-svg" viewBox="0 0 1080 1920" fill="none">${hill}${agent(`${P}-ag`, 300, 1085, 1.0, o.mood || "think")}</svg>`,
    js: `${pTitleJs(P)}fade("#${P}-q", ${t(0.3)}, 0.45); draw("#${P}-hill", ${t(0.25)}, 0.9); pop("#${P}-ag", ${t(0.4)}, 0.4);`,
  });
};

/* P: giant numerals / expressions (with optional dot square) */
const pBig = (o) => (D, P) => {
  const th = TH[o.th], t = T(D);
  const lines = o.lines.map((l, i) => `<div class="${P}-bl" id="${P}-bl${i}" style="top:${l.top}px;font-size:${l.fs || 200}px;color:${l.col === "a" ? th.a : l.col === "b" ? th.b : l.col === "mute" ? th.mute : th.ink};font-family:${l.serif ? "'Playfair Display', serif" : "'League Gothic', 'Oswald', sans-serif"};${l.serif ? "font-style:italic;font-weight:600;" : ""}opacity:0">${l.html}</div>`).join("");
  let dots = "", djs = "";
  if (o.dots) {
    const n = o.dots.n, g = o.dots.g || 78, x0 = o.dots.x, y0 = o.dots.y;
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) { const k = r * n + c; dots += `<g transform="translate(${x0 + c * g} ${y0 + r * g})"><g id="${P}-d${k}"><circle r="27" fill="${th.a}" stroke="${th.ink}" stroke-width="4"/></g></g>`; djs += `pop("#${P}-d${k}", ${t(o.dots.at + k * 0.03)}, 0.28);`; }
  }
  return plate(P, th, {
    n: o.n,
    css: `.${P}-bl { position: absolute; left: 40px; right: 40px; text-align: center; line-height: .95; text-transform: none; }`,
    body: `${pTitle(P, o.title)}${lines}<svg class="${P}-svg" viewBox="0 0 1080 1920" fill="none">${dots}</svg>`,
    js: `${pTitleJs(P)}${o.lines.map((l, i) => `up("#${P}-bl${i}", ${t(l.at ?? 0.2 + i * 0.2)}, 0.5);`).join("")}${djs}`,
  });
};

/* P: chart in data coordinates. extra: o.arrows = true draws arrow heads at line ends (for vectors) */
const pChart = (o) => (D, P) => {
  const th = TH[o.th], t = T(D);
  const X0 = 110, X1 = 970, Y0 = 1060, Y1 = 610;
  const [dx0, dx1] = o.domain, [dy0, dy1] = o.range;
  const px = (x) => f1(X0 + ((x - dx0) / (dx1 - dx0)) * (X1 - X0)), py = (y) => f1(Y0 - ((y - dy0) / (dy1 - dy0)) * (Y0 - Y1));
  const colOf = (c) => (c === "a" ? th.a : c === "b" ? th.b : c === "ink" ? th.ink : c || th.a);
  const ax0 = o.axisAt0 ? px(0) : X0, ay0 = o.axisAt0 ? py(0) : Y0;
  let svg = `<path d="M${X0} ${ay0} L${X1} ${ay0} M${ax0} ${Y0} L${ax0} ${Y1 - 20}" stroke="${th.ink}" stroke-width="3" stroke-linecap="round" opacity="0.7"/>`, js = "";
  if (o.f) { const pts = []; for (let k = 0; k <= 80; k++) { const x = dx0 + ((dx1 - dx0) * k) / 80; pts.push(`${k ? "L" : "M"}${px(x)} ${py(o.f(x))}`); } svg += `<path id="${P}-cv" d="${pts.join(" ")}" stroke="${colOf(o.curveCol || "ink")}" stroke-width="9" ${DASH}/>`; js += `draw("#${P}-cv", ${t(o.curveAt ?? 0.12)}, 0.9);`; }
  (o.lines || []).forEach((l, i) => {
    svg += `<path id="${P}-ln${i}" d="M${px(l.x1)} ${py(l.y1)} L${px(l.x2)} ${py(l.y2)}" stroke="${colOf(l.col)}" stroke-width="${l.w || 8}" ${l.dash ? "" : DASH} ${l.dash ? `stroke-dasharray="14 12"` : ""}/>`;
    js += l.dash ? `fade("#${P}-ln${i}", ${t(l.at)}, 0.3);` : `draw("#${P}-ln${i}", ${t(l.at)}, 0.55);`;
    if (l.arrow) {
      const X1p = px(l.x2), Y1p = py(l.y2), dxp = X1p - px(l.x1), dyp = Y1p - py(l.y1), L = Math.hypot(dxp, dyp), ux = dxp / L, uy = dyp / L, s = 34, bx = X1p - ux * s, by = Y1p - uy * s, qx = -uy, qy = ux;
      svg += `<polygon id="${P}-ah${i}" points="${f1(X1p)},${f1(Y1p)} ${f1(bx + qx * s * 0.55)},${f1(by + qy * s * 0.55)} ${f1(bx - qx * s * 0.55)},${f1(by - qy * s * 0.55)}" fill="${colOf(l.col)}" opacity="0"/>`;
      js += `fade("#${P}-ah${i}", ${t(l.at + 0.12)}, 0.2);`;
    }
  });
  (o.pts || []).forEach((p, i) => { svg += `<g transform="translate(${px(p.x)} ${py(p.y)})"><g id="${P}-pt${i}"><circle r="${p.r || 17}" fill="${colOf(p.col)}" stroke="${th.ink}" stroke-width="5"/></g></g>`; js += `pop("#${P}-pt${i}", ${t(p.at)}, 0.3);`; });
  const notes = (o.notes || []).map((n, i) => `<div class="${P}-nt" id="${P}-nt${i}" style="left:${n.px !== undefined ? n.px : px(n.x)}px;top:${n.py !== undefined ? n.py : py(n.y)}px;font-size:${n.fs || 44}px;color:${colOf(n.col || "ink")};font-family:${n.serif ? "'Playfair Display', serif" : "'League Gothic', 'Oswald', sans-serif"};${n.serif ? "font-style:italic;font-weight:600;" : ""}opacity:0">${n.html}</div>`).join("");
  (o.notes || []).forEach((n, i) => { js += `up("#${P}-nt${i}", ${t(n.at)}, 0.4);`; });
  const ch = o.char ? agent(`${P}-ag`, o.char.x, o.char.y, o.char.s || 0.6, o.char.mood) : "";
  if (o.char) js += `pop("#${P}-ag", ${t(o.char.at ?? 0.5)}, 0.35);`;
  return plate(P, th, {
    n: o.n,
    css: `.${P}-nt { position: absolute; white-space: nowrap; line-height: .95; }`,
    body: `${pTitle(P, o.title, o.sub, o.subTop)}<svg class="${P}-svg" viewBox="0 0 1080 1920" fill="none">${svg}${ch}</svg>${notes}`,
    js: `${pTitleJs(P, o.sub)}${js}`,
  });
};

/* P: table of giant numerals */
const pTable = (o) => (D, P) => {
  const th = TH[o.th], t = T(D);
  const rows = o.rows.map((r, i) => `<div class="${P}-row" id="${P}-r${i}" style="top:${600 + i * 120}px;opacity:0"><div class="${P}-g">${r.left}</div><div class="${P}-v" style="color:${i === o.rows.length - 1 ? th.a : th.ink}">${r.right}</div></div>`).join("");
  return plate(P, th, {
    n: o.n,
    css: `.${P}-row { position: absolute; left: 80px; right: 80px; height: 110px; border-bottom: 3px solid ${th.ink}; display: flex; align-items: flex-end; justify-content: space-between; padding-bottom: 8px; }
    .${P}-g { font-family: 'Space Mono', monospace; font-size: 34px; letter-spacing: .06em; }
    .${P}-v { font-family: 'League Gothic', 'Oswald', sans-serif; font-size: 100px; line-height: .9; }
    .${P}-end { position: absolute; left: 80px; right: 80px; top: ${600 + o.rows.length * 120 + 14}px; font-family: 'Playfair Display', serif; font-style: italic; font-weight: 600; font-size: 52px; color: ${th.a}; }`,
    body: `${pTitle(P, o.title)}${rows}${o.end ? `<div class="${P}-end" id="${P}-end" style="opacity:0">${o.end}</div>` : ""}`,
    js: `${pTitleJs(P)}${o.rows.map((r, i) => `up("#${P}-r${i}", ${t(r.at)}, 0.45);`).join("")}${o.end ? `fade("#${P}-end", ${t(o.endAt ?? 0.85)}, 0.4);` : ""}`,
  });
};

/* P: sign bars (up to 3-4). items:[{glyph,title,sub,bg,fg}] */
const pSigns = (o) => (D, P) => {
  const th = TH[o.th], t = T(D), n = o.items.length, h = 150, step = 170;
  const bars = o.items.map((it, i) => `<div class="${P}-b" id="${P}-b${i}" style="top:${600 + i * step}px;background:${it.bg};color:${it.fg};opacity:0"><div class="${P}-gl">${it.glyph}</div><div><div class="${P}-bt">${it.title}</div><div class="${P}-bs">${it.sub}</div></div></div>`).join("");
  return plate(P, th, {
    n: o.n,
    css: `.${P}-b { position: absolute; left: 80px; right: 80px; height: ${h}px; border-radius: 22px; border: 5px solid #14110F; display: flex; align-items: center; gap: 30px; padding: 0 34px; }
    .${P}-gl { font-family: 'League Gothic', 'Oswald', sans-serif; font-size: 110px; line-height: 1; width: 150px; text-align: center; }
    .${P}-bt { font-family: 'League Gothic', 'Oswald', sans-serif; font-size: 64px; line-height: 1; text-transform: uppercase; } .${P}-bs { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 600; font-size: 34px; margin-top: 4px; }`,
    body: `${pTitle(P, o.title)}${bars}`,
    js: `${pTitleJs(P)}${o.items.map((_, i) => `up("#${P}-b${i}", ${t(0.2 + i * 0.2)}, 0.5);`).join("")}`,
  });
};

/* P: matrix grids. mats:[{cells:[[..]], x, y, cw, ch, fs, hiRow, hiCol, cur:[r,c], label, at, col}] ; ops:[{html,x,y,at,fs}] ; lines:[{html,top,fs,col,at,serif}] */
const pGrid = (o) => (D, P) => {
  const th = TH[o.th], t = T(D);
  let cells = "", js = "";
  o.mats.forEach((m, mi) => {
    const cw = m.cw || 130, ch = m.ch || 110, g = 10, fs = m.fs || 62;
    m.cells.forEach((row, r) => row.forEach((v, c) => {
      const hi = (m.hiRow !== undefined && r === m.hiRow) || (m.hiCol !== undefined && c === m.hiCol);
      const cur = m.cur && m.cur[0] === r && m.cur[1] === c;
      const bg = cur ? th.b : hi ? th.a : "transparent";
      const col = cur ? (th.b === "#FBB91F" ? "#14110F" : "#F6F0E0") : hi ? (th.a === "#FBB91F" || th.a === "#F4EFE3" ? "#14110F" : "#F6F0E0") : th.ink;
      cells += `<div class="${P}-m${mi}" style="left:${m.x + c * (cw + g)}px;top:${m.y + r * (ch + g)}px;width:${cw}px;height:${ch}px;font-size:${fs}px;background:${bg};color:${col};opacity:0">${v}</div>`;
    }));
    if (m.label) cells += `<div class="${P}-ml ${P}-m${mi}" style="left:${m.x}px;top:${m.y - 54}px;width:${m.cells[0].length * (cw + g)}px;text-align:center;opacity:0;color:${th.a}">${m.label}</div>`;
    js += `tl.fromTo(".${P}-m${mi}", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "power4.out", stagger: 0.04 }, ${t(m.at ?? 0.15)});`;
  });
  const ops = (o.ops || []).map((p, i) => `<div class="${P}-op" id="${P}-op${i}" style="left:${p.x}px;top:${p.y}px;font-size:${p.fs || 80}px;opacity:0">${p.html}</div>`).join("");
  (o.ops || []).forEach((p, i) => { js += `fade("#${P}-op${i}", ${t(p.at ?? 0.2)}, 0.35);`; });
  const lines = (o.lines || []).map((l, i) => `<div class="${P}-ln" id="${P}-ln${i}" style="top:${l.top}px;font-size:${l.fs || 80}px;color:${l.col === "a" ? th.a : l.col === "b" ? th.b : l.col === "mute" ? th.mute : th.ink};font-family:${l.serif ? "'Playfair Display', serif" : "'League Gothic', 'Oswald', sans-serif"};${l.serif ? "font-style:italic;font-weight:600;" : ""}opacity:0">${l.html}</div>`).join("");
  (o.lines || []).forEach((l, i) => { js += `up("#${P}-ln${i}", ${t(l.at ?? 0.5)}, 0.45);`; });
  return plate(P, th, {
    n: o.n,
    css: `[class*="${P}-m"] { position: absolute; display: flex; align-items: center; justify-content: center; border: 4px solid ${th.ink}; border-radius: 14px; font-family: 'League Gothic', 'Oswald', sans-serif; line-height: 1; }
    .${P}-ml { border: none !important; font-family: 'Space Mono', monospace !important; font-size: 30px !important; letter-spacing: .06em; justify-content: center; white-space: nowrap; height: 50px; }
    .${P}-op { position: absolute; font-family: 'League Gothic', 'Oswald', sans-serif; line-height: 1; width: 90px; text-align: center; }
    .${P}-ln { position: absolute; left: 40px; right: 40px; text-align: center; line-height: .95; }`,
    body: `${pTitle(P, o.title)}${cells}${ops}${lines}`,
    js: `${pTitleJs(P)}${js}`,
  });
};

/* P: closing quote with character */
const pEnd = (o) => (D, P) => {
  const th = TH[o.th], t = T(D);
  return plate(P, th, {
    n: o.n,
    css: `.${P}-q { position: absolute; left: 80px; right: 80px; top: 600px; font-family: 'Playfair Display', serif; font-style: italic; font-weight: 600; font-size: 74px; line-height: 1.1; color: ${th.a}; }`,
    body: `${pTitle(P, o.title)}<div class="${P}-q" id="${P}-q" style="opacity:0">${o.quote}</div><svg class="${P}-svg" viewBox="0 0 1080 1920" fill="none">${agent(`${P}-ag`, 540, 1080, 1.05, "happy")}</svg>`,
    js: `${pTitleJs(P)}fade("#${P}-q", ${t(0.3)}, 0.5); pop("#${P}-ag", ${t(0.45)}, 0.45);`,
  });
};

const RM = [6.0, 5.0, 5.0, 5.25, 5.0, 5.0, 5.14, 4.75, 4.33, 4.1, 3.91, 4.08, 4.23, 4.0, 3.93, 4.0, 3.82, 3.89, 3.74, 3.7, 3.76, 3.68, 3.65, 3.58, 3.64, 3.58, 3.67, 3.64, 3.62, 3.63, 3.65, 3.66, 3.67, 3.74, 3.77, 3.81, 3.84, 3.84, 3.82, 3.88, 3.85, 3.81, 3.86, 3.8, 3.84, 3.85, 3.79, 3.73, 3.71, 3.66, 3.61, 3.62, 3.66, 3.65, 3.67, 3.71, 3.74, 3.74, 3.73, 3.73];
const rmf = (x) => { const k = Math.min(RM.length - 1, Math.max(0, x - 1)); const a = Math.floor(k), b = Math.min(RM.length - 1, a + 1); return RM[a] + (RM[b] - RM[a]) * (k - a); };
const bin = (p) => (p <= 0 || p >= 1 ? 0 : -(p * Math.log2(p) + (1 - p) * Math.log2(1 - p)));
const STORIES = [
  /* ---------- 1.12 Sampling and the law of large numbers ---------- */
  { id: "ep-1.12-law-of-large-numbers", key: "p112", n: 312, scenes: [
    pHook({ th: "yellow", n: 1, title: "Roll it<br/>again", sub: "Dev rolls a die and wonders what the average roll really is.", mood: "think" }),
    pBig({ th: "blue", n: 2, title: "One roll", lines: [{ html: "1 ROLL = 6", fs: 200, at: 0.2, top: 640 }, { html: "MEAN SO FAR: 6", fs: 140, col: "a", at: 0.4, top: 850 }, { html: "a tiny sample can mislead", fs: 58, serif: true, at: 0.7, top: 1020 }] }),
    pTable({ th: "cream", n: 3, title: "Roll more", rows: [{ left: "AFTER 10 ROLLS", right: "4.1", at: 0.15 }, { left: "AFTER 100 ROLLS", right: "3.69", at: 0.33 }, { left: "AFTER 1,000 ROLLS", right: "3.575", at: 0.5 }, { left: "AFTER 10,000 ROLLS", right: "3.497", at: 0.67 }], end: "drifting toward 3.5", endAt: 0.82 }),
    pChart({ th: "black", n: 4, title: "Settling down", domain: [1, 60], range: [2.5, 6.5], f: rmf, curveCol: "a", lines: [{ x1: 1, y1: 3.5, x2: 60, y2: 3.5, col: "b", dash: true, at: 0.5 }], notes: [{ px: 130, py: 960, html: "TRUE MEAN 3.5", col: "b", fs: 64, at: 0.55 }, { px: 560, py: 640, html: "MEAN OF FIRST n ROLLS", col: "ink", fs: 48, at: 0.3 }, { px: 560, py: 1066, html: "n = 1 … 60", col: "ink", fs: 44, at: 0.4 }] }),
    pBig({ th: "orange", n: 5, title: "Expected value", lines: [{ html: "(1+2+3+4+5+6) ÷ 6", fs: 100, at: 0.2, top: 640 }, { html: "= 3.5", fs: 280, col: "a", at: 0.4, top: 770 }, { html: "no roll shows it, many rolls do", fs: 58, serif: true, at: 0.72, top: 1040 }] }),
    pTable({ th: "blue", n: 6, title: "Error shrinks", rows: [{ left: "100 ROLLS: TYPICAL ERROR", right: "0.17", at: 0.2 }, { left: "10,000 ROLLS: ERROR", right: "0.017", at: 0.4 }, { left: "100× MORE ROLLS", right: "10× LESS", at: 0.62 }], end: "error = 1.71 ÷ √n", endAt: 0.82 }),
    pBig({ th: "yellow", n: 7, title: "Polling", lines: [{ html: "1,000 PEOPLE", fs: 160, at: 0.2, top: 640 }, { html: "± 3 %", fs: 290, col: "a", at: 0.4, top: 790 }, { html: "if the sample is truly random", fs: 58, serif: true, at: 0.72, top: 1070 }] }),
    pSigns({ th: "cream", n: 8, title: "In AI", items: [{ glyph: "32", title: "Mini-batch", sub: "a small batch estimates the full gradient", bg: "#FBB91F", fg: "#14110F" }, { glyph: "10K", title: "Test set", sub: "a sample estimates real accuracy", bg: "#F4EFE3", fg: "#14110F" }, { glyph: "MC", title: "Monte Carlo", sub: "average random draws", bg: "#1F2D8F", fg: "#F6F0E0" }] }),
    pEnd({ th: "orange", n: 9, title: "Remember", quote: "More random samples bring the sample mean closer to the true mean." }),
  ], en: [
    "Dev rolls a die and wonders what the average roll really is. His first roll is a six. Does that mean the average is six? Let's see how samples behave.",
    "One roll is a sample of size one, and it can mislead badly. Here the mean of the sample is six, far from the truth.",
    "So Dev keeps rolling. After ten rolls the mean is four point one. After a hundred, three point six nine. After a thousand, three point five seven five. After ten thousand, three point four nine seven.",
    "Plot the running mean and you can watch it settle. It starts wild, then calms down and hugs the line at three point five. This is the law of large numbers: as the sample grows, the sample mean approaches the true mean.",
    "Where does three point five come from? Add one through six to get twenty one, then divide by six. That is the expected value. No single roll shows it, but the average of many rolls does.",
    "How fast does the error shrink? A typical error is the spread of one roll, one point seven one, divided by the square root of n. That is about zero point one seven for a hundred rolls, and zero point zero one seven for ten thousand. A hundred times more data gives ten times less error.",
    "Pollsters use exactly this. Ask a thousand randomly chosen people, and the answer lands within about three percentage points, ninety five times in a hundred. But the sample must be random.",
    "A I leans on this everywhere. A mini batch of thirty two examples estimates the gradient over the whole data set. A test set estimates real world accuracy. And Monte Carlo methods average random draws.",
    "Remember: more random samples bring the sample mean closer to the true mean, and the error shrinks like one over root n. Next, entropy. Study notes are in the bio.",
  ] },
  /* ---------- 1.13 Entropy ---------- */
  { id: "ep-1.13-entropy", key: "p113", n: 313, scenes: [
    pHook({ th: "black", n: 1, title: "Measuring<br/>surprise", sub: "Isha checks tomorrow's forecast. How surprised will she be?", mood: "think" }),
    pTable({ th: "yellow", n: 2, title: "Surprise", rows: [{ left: "CHANCE 1/2", right: "1 bit", at: 0.2 }, { left: "CHANCE 1/8", right: "3 bits", at: 0.4 }, { left: "CHANCE 1/64", right: "6 bits", at: 0.6 }], end: "rarer news, bigger surprise", endAt: 0.8 }),
    pBig({ th: "blue", n: 3, title: "Count in bits", lines: [{ html: "SURPRISE = −log2 p", fs: 120, at: 0.2, top: 640 }, { html: "1/8 → 3 BITS", fs: 230, col: "a", at: 0.42, top: 780 }, { html: "three yes/no questions find it", fs: 58, serif: true, at: 0.75, top: 1020 }] }),
    pTable({ th: "cream", n: 4, title: "Entropy", rows: [{ left: "FAIR COIN", right: "1 bit", at: 0.2 }, { left: "COIN, 90% HEADS", right: "0.47 bits", at: 0.45 }, { left: "ALWAYS HEADS", right: "0 bits", at: 0.7 }], end: "entropy = average surprise", endAt: 0.85 }),
    pChart({ th: "black", n: 5, title: "Coin entropy", domain: [0, 1], range: [0, 1.15], f: bin, curveCol: "a", pts: [{ x: 0.5, y: 1, col: "b", at: 0.5 }, { x: 0.9, y: 0.469, col: "b", at: 0.75 }], notes: [{ px: 330, py: 612, html: "FAIR: 1 BIT", col: "b", fs: 62, at: 0.55 }, { px: 560, py: 920, html: "0.9 → 0.47", col: "b", fs: 62, at: 0.78 }, { px: 330, py: 1066, html: "CHANCE OF HEADS  0 → 1", col: "ink", fs: 44, at: 0.3 }] }),
    pTable({ th: "orange", n: 6, title: "Four weathers", rows: [{ left: "SUN 1/2", right: "1 bit", at: 0.15 }, { left: "CLOUD 1/4", right: "2 bits", at: 0.3 }, { left: "RAIN 1/8", right: "3 bits", at: 0.45 }, { left: "SNOW 1/8", right: "3 bits", at: 0.6 }], end: "average: 1.75 bits", endAt: 0.8 }),
    pBig({ th: "yellow", n: 7, title: "Best code", lines: [{ html: "0 · 10 · 110 · 111", fs: 130, at: 0.2, top: 640 }, { html: "1.75 BITS", fs: 270, col: "a", at: 0.4, top: 790 }, { html: "no code averages fewer", fs: 62, serif: true, at: 0.72, top: 1060 }] }),
    pSigns({ th: "cream", n: 8, title: "In AI", items: [{ glyph: "H", title: "Decision trees", sub: "split to cut entropy", bg: "#FBB91F", fg: "#14110F" }, { glyph: "?", title: "Language models", sub: "how unsure is the next word", bg: "#F4EFE3", fg: "#14110F" }, { glyph: "ZIP", title: "Compression", sub: "entropy is the floor", bg: "#1F2D8F", fg: "#F6F0E0" }] }),
    pEnd({ th: "blue", n: 9, title: "Remember", quote: "Entropy is average surprise, counted in bits." }),
  ], en: [
    "Isha checks the weather forecast. Some news barely surprises her, and some news is a shock. Can we measure surprise with a number? That is the idea behind entropy.",
    "Rare events surprise us more. An event with chance one half carries one bit of surprise. Chance one eighth carries three bits. Chance one sixty fourth carries six bits.",
    "The formula is minus log base two of the probability. Bits count yes or no questions. To find one outcome out of eight equally likely ones, you need three questions, so three bits.",
    "Entropy is the average surprise over all outcomes. A fair coin has one bit. A coin that lands heads ninety percent of the time has only zero point four seven bits, because it is usually predictable. A coin that is always heads has zero.",
    "Plot entropy against the chance of heads and you get a hill. It peaks at one bit when the coin is fair, and falls to zero at both ends. Maximum uncertainty means maximum entropy.",
    "Now four weathers. Sun has chance one half, cloud one quarter, rain one eighth, snow one eighth. Their surprises are one, two, three and three bits. Weighted by their chances, the average is one point seven five bits.",
    "That number is also a real limit. Give sun the code zero, cloud ten, rain one one zero, and snow one one one. The average message uses exactly one point seven five bits, and Shannon showed no code can average fewer.",
    "In A I, decision trees choose splits that reduce entropy. Language models are judged by how uncertain their next word is. And compression tools can never beat the entropy of the data.",
    "Remember: entropy is average surprise, measured in bits. Predictable means low, uncertain means high. Next, cross entropy and K L divergence. Study notes are in the bio.",
  ] },
  /* ---------- 1.14 Cross-entropy and KL divergence ---------- */
  { id: "ep-1.14-cross-entropy-kl", key: "p114", n: 314, scenes: [
    pHook({ th: "orange", n: 1, title: "How wrong<br/>is the model?", sub: "Omar believes a coin is 90 % heads. It is really 50-50.", mood: "think" }),
    pTable({ th: "cream", n: 2, title: "Two worlds", rows: [{ left: "TRUTH P: HEADS", right: "0.5", at: 0.15 }, { left: "TRUTH P: TAILS", right: "0.5", at: 0.3 }, { left: "BELIEF Q: HEADS", right: "0.9", at: 0.45 }, { left: "BELIEF Q: TAILS", right: "0.1", at: 0.6 }], end: "truth versus belief", endAt: 0.8 }),
    pTable({ th: "black", n: 3, title: "Cross-entropy", rows: [{ left: "HEADS: 0.5 × 0.15", right: "0.076", at: 0.2 }, { left: "TAILS: 0.5 × 3.32", right: "1.661", at: 0.42 }, { left: "ADD THEM", right: "1.737 bits", at: 0.64 }], end: "bits spent with the wrong belief", endAt: 0.84 }),
    pBig({ th: "yellow", n: 4, title: "The KL gap", lines: [{ html: "H(P) = 1 BIT", fs: 170, at: 0.15, top: 630 }, { html: "cost with the right belief", fs: 52, serif: true, at: 0.3, top: 800 }, { html: "1.737 − 1.000", fs: 130, at: 0.5, top: 870 }, { html: "= 0.737 bits", fs: 130, col: "a", at: 0.68, top: 990 }] }),
    pBig({ th: "blue", n: 5, title: "The identity", lines: [{ html: "CE = H(P) + KL", fs: 150, at: 0.2, top: 640 }, { html: "1.737 = 1 + 0.737", fs: 130, col: "a", at: 0.45, top: 800 }, { html: "the truth's entropy never changes, so cutting CE cuts the gap", fs: 50, serif: true, at: 0.7, top: 960 }] }),
    pTable({ th: "orange", n: 6, title: "Not symmetric", rows: [{ left: "KL FROM P TO Q", right: "0.737", at: 0.2 }, { left: "KL FROM Q TO P", right: "0.531", at: 0.42 }, { left: "WHEN P = Q", right: "0", at: 0.64 }], end: "a divergence, not a distance", endAt: 0.84 }),
    pChart({ th: "black", n: 7, title: "Loss curve", domain: [0, 1], range: [0, 4], f: (x) => -Math.log2(Math.max(x, 0.07)), curveCol: "a", pts: [{ x: 0.9, y: 0.152, col: "b", at: 0.4 }, { x: 0.5, y: 1, col: "b", at: 0.55 }, { x: 0.1, y: 3.322, col: "b", at: 0.7 }], notes: [{ px: 600, py: 880, html: "0.9 → 0.15 bits", col: "b", fs: 58, at: 0.42 }, { px: 540, py: 740, html: "0.5 → 1 bit", col: "b", fs: 58, at: 0.57 }, { px: 330, py: 640, html: "0.1 → 3.32 bits", col: "b", fs: 58, at: 0.72 }, { px: 250, py: 1066, html: "PROBABILITY GIVEN TO THE RIGHT ANSWER", col: "ink", fs: 40, at: 0.3 }] }),
    pSigns({ th: "cream", n: 8, title: "In AI", items: [{ glyph: "CE", title: "Classifiers", sub: "trained with cross-entropy loss", bg: "#FBB91F", fg: "#14110F" }, { glyph: "LM", title: "Language models", sub: "cross-entropy on each next word", bg: "#F4EFE3", fg: "#14110F" }, { glyph: "KL", title: "Staying close", sub: "students, V A Es, fine-tuning", bg: "#1F2D8F", fg: "#F6F0E0" }] }),
    pEnd({ th: "yellow", n: 9, title: "Remember", quote: "Cross-entropy is the cost of the wrong belief. KL is the extra cost." }),
  ], en: [
    "Omar believes a coin lands heads ninety percent of the time. In truth it is fifty fifty. Cross entropy and K L divergence answer that.",
    "Call the truth P, and the belief Q. The truth says heads zero point five, tails zero point five. The belief says heads zero point nine, tails zero point one.",
    "Cross entropy is the average surprise when events follow P but you predict with Q. Heads costs zero point five times zero point one five. Tails costs zero point five times three point three two. Together, one point seven three seven bits.",
    "The truth alone has entropy of one bit. The extra cost of the wrong belief is one point seven three seven minus one, which is zero point seven three seven bits. That gap is the K L divergence.",
    "So cross entropy equals entropy plus K L divergence. The entropy of the truth never changes during training, so pushing cross entropy down pushes the K L gap down too.",
    "K L divergence is zero only when the belief matches the truth. And it is not symmetric. From P to Q it is zero point seven three seven, from Q to P it is zero point five three one.",
    "In classification the truth is one correct label. If the model gives it probability zero point nine, the loss is only zero point one five bits. At zero point five, one bit. At zero point one, three point three two bits. Confident and wrong costs the most.",
    "That is why A I uses it. Classifiers train with cross entropy loss. Language models minimise it over every next word. And K L divergence keeps a student model, or a V A E, close to a reference.",
    "Remember: cross entropy is the cost of using the wrong belief, and K L divergence is the extra cost. Next, eigenvectors and S V D. Study notes are in the bio.",
  ] },
  /* ---------- 1.15 Eigenvectors and SVD ---------- */
  { id: "ep-1.15-eigenvectors-svd", key: "p115", n: 315, scenes: [
    pHook({ th: "yellow", n: 1, title: "The directions<br/>that matter", sub: "Pia squashes a rubber sheet. Most arrows turn. A few only stretch.", mood: "think" }),
    pChart({ th: "cream", n: 2, title: "Most arrows turn", domain: [0, 5], range: [0, 9], axisAt0: true, lines: [{ x1: 0, y1: 0, x2: 1, y2: 1, col: "b", w: 10, arrow: true, at: 0.2 }, { x1: 0, y1: 0, x2: 3, y2: 5, col: "a", w: 10, arrow: true, at: 0.5 }], notes: [{ px: 400, py: 640, html: "A × (1, 1) = (3, 5)", col: "a", fs: 80, at: 0.6 }, { px: 400, py: 730, html: "the direction changed", col: "ink", fs: 56, serif: true, at: 0.75 }, { px: 150, py: 1066, html: "A = [2 1 ; 2 3]", col: "ink", fs: 44, at: 0.3 }] }),
    pChart({ th: "black", n: 3, title: "An eigenvector", domain: [0, 5], range: [0, 9], axisAt0: true, lines: [{ x1: 0, y1: 0, x2: 4, y2: 8, col: "a", w: 10, arrow: true, at: 0.45 }, { x1: 0, y1: 0, x2: 1, y2: 2, col: "b", w: 14, arrow: true, at: 0.2 }], notes: [{ px: 520, py: 850, html: "A × (1, 2) = (4, 8)", col: "a", fs: 80, at: 0.6 }, { px: 520, py: 930, html: "= 4 × (1, 2)", col: "ink", fs: 80, at: 0.72 }, { px: 520, py: 1000, html: "λ = 4", col: "b", fs: 120, at: 0.84 }] }),
    pTable({ th: "blue", n: 4, title: "Find them", rows: [{ left: "EIGENVALUE", right: "1", at: 0.15 }, { left: "EIGENVALUE", right: "4", at: 0.3 }, { left: "EIGENVECTOR FOR 1", right: "(1, −1)", at: 0.5 }, { left: "EIGENVECTOR FOR 4", right: "(1, 2)", at: 0.65 }], end: "from λ² − 5λ + 4 = 0", endAt: 0.82 }),
    pBig({ th: "orange", n: 5, title: "Why care", lines: [{ html: "A v = λ v", fs: 240, at: 0.2, top: 650 }, { html: "a plain stretch, no turning", fs: 62, serif: true, at: 0.45, top: 900 }, { html: "BIGGEST λ = STRONGEST DIRECTION", fs: 80, col: "a", at: 0.7, top: 1000 }] }),
    pBig({ th: "yellow", n: 6, title: "Any matrix", lines: [{ html: "A = U Σ V<span style=\"font-size:.5em;vertical-align:.9em\">T</span>", fs: 220, at: 0.2, top: 640 }, { html: "ROTATE · STRETCH · ROTATE", fs: 90, col: "a", at: 0.5, top: 880 }, { html: "works for every matrix, any shape", fs: 56, serif: true, at: 0.75, top: 1000 }] }),
    pTable({ th: "black", n: 7, title: "Singular values", rows: [{ left: "BIG STRETCH σ1 = √40", right: "6.32", at: 0.2 }, { left: "SMALL STRETCH σ2 = √10", right: "3.16", at: 0.4 }, { left: "σ1² ÷ (σ1² + σ2²)", right: "40/50 = 80 %", at: 0.62 }], end: "one stretch holds 80 % of the matrix", endAt: 0.82 }),
    pSigns({ th: "cream", n: 8, title: "In AI", items: [{ glyph: "PCA", title: "Principal components", sub: "directions of most spread", bg: "#FBB91F", fg: "#14110F" }, { glyph: "ZIP", title: "Compression", sub: "keep the biggest singular values", bg: "#F4EFE3", fg: "#14110F" }, { glyph: "R", title: "Recommenders", sub: "a few hidden taste factors", bg: "#1F2D8F", fg: "#F6F0E0" }] }),
    pEnd({ th: "blue", n: 9, title: "Remember", quote: "Eigenvectors keep their direction. S V D splits any matrix into rotate, stretch, rotate." }),
  ], en: [
    "Pia presses on a rubber sheet and watches little arrows move. Most arrows turn. But a few special ones only get longer or shorter. Those are eigenvectors.",
    "Take a matrix with rows two one and two three. Multiply it by the arrow one one, and out comes three five. The arrow changed direction, so it is not special.",
    "Now try the arrow one two. Out comes four eight. That is exactly four times the original arrow. Same direction, just stretched. So one two is an eigenvector, and four is its eigenvalue.",
    "To find them, solve determinant of A minus lambda I equals zero. For this matrix it gives lambda squared minus five lambda plus four, so lambda is one or four. The eigenvectors are one minus one, and one two.",
    "The rule is A v equals lambda v. The matrix acts on that direction as a plain stretch, with no turning. The biggest eigenvalue marks the direction the matrix amplifies most.",
    "But eigenvectors need a square matrix, and some matrices lack enough of them. Singular value decomposition works for every matrix, of any shape. It writes A as a rotation, then a stretch, then another rotation.",
    "Take the matrix four zero, three minus five. Its singular values are root forty, about six point three two, and root ten, about three point one six. The first stretch holds forty out of fifty, or eighty percent, of the matrix's squared size.",
    "A I uses this everywhere. P C A finds the directions where data spreads most. Compression keeps only the biggest singular values. And recommender systems find a few hidden taste factors.",
    "Remember: an eigenvector keeps its direction under a matrix, and S V D splits any matrix into rotate, stretch, rotate. Next, loss landscapes. Study notes are in the bio.",
  ] },
  /* ---------- 1.16 Landscapes ---------- */
  { id: "ep-1.16-loss-landscapes", key: "p116", n: 316, scenes: [
    pHook({ th: "black", n: 1, title: "Which way<br/>is down?", sub: "Lena is lost in fog on a hilly landscape. She can only feel the slope.", mood: "think" }),
    pChart({ th: "cream", n: 2, title: "Convex bowl", domain: [-3, 3], range: [0, 9.5], f: (x) => x * x, curveCol: "b", pts: [{ x: -2.5, y: 6.25, col: "a", at: 0.4 }, { x: 0, y: 0, col: "a", at: 0.7, r: 20 }], notes: [{ px: 560, py: 640, html: "y = x²", col: "b", fs: 90, at: 0.2 }, { px: 400, py: 930, html: "ONE BOTTOM", col: "a", fs: 80, at: 0.7 }] }),
    pChart({ th: "blue", n: 3, title: "Two valleys", domain: [-1.6, 1.6], range: [-1.8, 2.6], f: (x) => x ** 4 - 2 * x * x + 0.5 * x, curveCol: "ink", pts: [{ x: -1.057, y: -1.515, col: "a", at: 0.45, r: 20 }, { x: 0.93, y: -0.517, col: "b", at: 0.65, r: 20 }], notes: [{ px: 140, py: 1066, html: "DEEP −1.51", col: "a", fs: 62, at: 0.5 }, { px: 620, py: 1066, html: "SHALLOW −0.52", col: "b", fs: 62, at: 0.7 }, { px: 130, py: 640, html: "NOT CONVEX", col: "ink", fs: 70, at: 0.2 }] }),
    pTable({ th: "black", n: 4, title: "Where you start", rows: [{ left: "START x = −1.5 ENDS AT", right: "−1.51", at: 0.2 }, { left: "START x = +1.5 ENDS AT", right: "−0.52", at: 0.42 }, { left: "WORSE BY", right: "1.0", at: 0.64 }], end: "same rule, different valley", endAt: 0.84 }),
    pBig({ th: "orange", n: 5, title: "Saddle point", lines: [{ html: "f = x² − y²", fs: 190, at: 0.2, top: 640 }, { html: "SLOPE = 0", fs: 170, col: "a", at: 0.42, top: 830 }, { html: "min along x, max along y: a pass", fs: 54, serif: true, at: 0.7, top: 1000 }] }),
    pTable({ th: "yellow", n: 6, title: "Stuck or not?", rows: [{ left: "START (x, y)", right: "1, 0.010", at: 0.2 }, { left: "AFTER 1 STEP", right: "0.80, 0.012", at: 0.4 }, { left: "AFTER 5 STEPS", right: "0.33, 0.025", at: 0.6 }], end: "x × 0.8, y × 1.2 each step", endAt: 0.82 }),
    pBig({ th: "blue", n: 7, title: "In practice", lines: [{ html: "SADDLES", fs: 210, col: "a", at: 0.2, top: 640 }, { html: "OUTNUMBER BAD TRAPS", fs: 100, at: 0.42, top: 850 }, { html: "big nets: most valleys are already low", fs: 56, serif: true, at: 0.7, top: 990 }] }),
    pSigns({ th: "cream", n: 8, title: "Helpers", items: [{ glyph: "RND", title: "Random start", sub: "breaks symmetry", bg: "#FBB91F", fg: "#14110F" }, { glyph: "MOM", title: "Momentum", sub: "rolls through flat patches", bg: "#F4EFE3", fg: "#14110F" }, { glyph: "SGD", title: "Mini-batches", sub: "noise shakes you loose", bg: "#1F2D8F", fg: "#F6F0E0" }] }),
    pEnd({ th: "orange", n: 9, title: "Remember", quote: "Convex means one bottom. Neural networks have many valleys, yet descent usually finds a good one." }),
  ], en: [
    "Lena is lost on a hilly landscape in thick fog, feeling only the slope under her feet. Training a neural network is the same: the landscape is the loss, and we want the lowest point.",
    "The friendly case is a convex bowl, like y equals x squared. It has exactly one bottom, so any path downhill ends at the global minimum.",
    "Neural networks are not convex. Here is a curve with two valleys. The deeper one dips to minus one point five one, the shallower one only to minus zero point five two. A walker can end up in either.",
    "Where you start matters. Gradient descent from minus one point five ends in the deep valley, at minus one point five one. From plus one point five, it settles in the shallow one, at minus zero point five two. Same rule, different valley.",
    "Higher dimensions add a new feature, the saddle point. Take f equals x squared minus y squared. The slope is zero at the centre, yet it is a minimum along x and a maximum along y. Like a mountain pass.",
    "Does descent get stuck? Start near the pass, at x equals one and y equals zero point zero one. Each step shrinks x by a factor of zero point eight, but grows y by one point two. Slow at first, then y takes off, about a hundredfold in twenty five steps.",
    "Practice is kinder than the fear. Researchers believe that in large networks saddle points are far more common than bad local minima, and most local minima are already low. The real troublemakers are wide flat plateaus.",
    "Training tricks help. A random start breaks symmetry. Momentum rolls through flat patches. And the noise in mini batches can shake the walker loose from saddles.",
    "Remember: convex means one bottom. Neural networks have many valleys, saddles and plateaus, yet gradient descent usually finds a good one. Next, vector norms. Study notes are in the bio.",
  ] },
];
if (process.env.MODE === "scripts") {
  fs.writeFileSync(path.join(ROOT, "scripts.json"), JSON.stringify(STORIES.map((s) => ({ key: s.key, lines: s.en })), null, 1));
  process.exit(0);
}

function captionsHtml(groups) {
  const divs = groups.map((g, gi) => `<div class="cg" id="cg${gi}">${g.words.map((w, wi) => `<span id="cg${gi}w${wi}">${w.text}</span>`).join(" ")}</div>`).join("\n    ");
  const js = groups.map((g, gi) => {
    const next = groups[gi + 1];
    const startT = Math.max(0.1, g.start - 0.04);
    const kill = Math.max(startT + 0.3, Math.min(g.end + 0.08, next ? next.start - 0.05 : 1e9));
    const start = startT.toFixed(2), end = kill.toFixed(2), fadeAt = (kill - 0.1).toFixed(2);
    return `tl.set("#cg${gi}", { visibility: "visible" }, ${start});
      tl.fromTo("#cg${gi}", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" }, ${start});
      ${g.words.map((w, wi) => `tl.to("#cg${gi}w${wi}", { color: "${C.amber}", duration: 0.05 }, ${w.start.toFixed(2)}); tl.to("#cg${gi}w${wi}", { color: "#FFFFFF", duration: 0.05 }, ${w.end.toFixed(2)});`).join("\n      ")}
      tl.to("#cg${gi}", { opacity: 0, duration: 0.1, ease: "power2.in" }, ${fadeAt});
      tl.set("#cg${gi}", { opacity: 0, visibility: "hidden" }, ${end});`;
  }).join("\n      ");
  return `<template>
  <style>
    #root { position: absolute; inset: 0; font-family: 'Inter', sans-serif; }
    .cg { position: absolute; left: 90px; width: 900px; top: 1130px; height: 180px; display: flex; flex-wrap: wrap; align-content: flex-end; justify-content: center; gap: 10px 10px; text-align: center; font-size: 62px; font-weight: 800; line-height: 1.14; color: #FFFFFF; text-shadow: 0 4px 18px rgba(0,0,0,.85), 0 0 3px rgba(0,0,0,.9); visibility: hidden; opacity: 0; overflow: visible; }
    .cg span { background: rgba(20,17,15,.92); padding: 0 14px; border-radius: 12px; }
  </style>
  <div id="root" data-composition-id="captions" data-width="1080" data-height="1920">
    ${divs}
  </div>
  <script>
    (function () {
      const tl = gsap.timeline({ paused: true });
      ${js}
      window.__timelines["captions"] = tl;
    })();
  </script>
</template>
`;
}
function makeGroups(timed) {
  const groups = []; let cur = [];
  const flush = () => { if (cur.length) { groups.push({ words: cur, start: cur[0].start, end: cur[cur.length - 1].end }); cur = []; } };
  timed.forEach((w) => { cur.push(w); if (cur.length >= 4 || /[.!?:]$/.test(w.text)) flush(); else if (/,$/.test(w.text) && cur.length >= 2) flush(); });
  flush();
  return groups;
}

for (const V of STORIES) {
  const audioFor = (i) => path.join(ROOT, "en_story", `${V.key}_s${i}.wav`);
  if (!fs.existsSync(audioFor(1))) { console.log("skip (no audio)", V.id, LANG); continue; }
  globalThis.CURTAG = V.id.match(/ep-(\d+\.\d+)/)[1]; globalThis.CURTOTAL = V.scenes.length;
  const dir = path.join(ROOT, `${V.id}-${LANG}`);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(path.join(dir, "compositions"), { recursive: true });
  fs.mkdirSync(path.join(dir, "assets"), { recursive: true });
  for (const f of ["gsap.min.js", "hyperframes.json", "meta.json", "package.json", "AGENTS.md", "CLAUDE.md"]) if (fs.existsSync(path.join(TEMPLATE, f))) fs.copyFileSync(path.join(TEMPLATE, f), path.join(dir, f));
  const pj = JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8")); pj.name = `${V.id}-${LANG}`; fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify(pj, null, 2));

  let tt = 0, hosts = "", audios = "", allWords = [], seams = [];
  V.scenes.forEach((fn, i) => {
    const n = i + 1, wav = audioFor(n), text = V[LANG][i];
    fs.copyFileSync(wav, path.join(dir, "assets", `${V.key}_s${n}.wav`));
    const D = dur(wav), lead = i === 0 ? 0.2 : 0.12, tail = i === V.scenes.length - 1 ? 3.2 : 0.3;
    const sd = +(lead + D + tail).toFixed(2), sid = `${V.key}s${n}`;
    let sh = fn(sd, sid);
    const wopen = `data-composition-id="${sid}" data-width="1080" data-height="1920">`;
    if (!sh.includes(wopen)) throw new Error("root tag not found " + sid);
    sh = sh.replace(wopen, wopen + `<div id="${sid}-w" style="position:absolute;left:0;top:0;width:1080px;height:1920px">`);
    sh = sh.replace("\n  </div>\n  <script>", "</div>\n  </div>\n  <script>");
    const seam = (i > 0 ? `tl.fromTo("#${sid}-w", { x: 130, opacity: 0.35 }, { x: 0, opacity: 1, duration: 0.3, ease: "power4.out" }, 0);` : "") + (i < V.scenes.length - 1 ? `tl.to("#${sid}-w", { x: -130, duration: 0.3, ease: "power4.in" }, ${(sd - 0.3).toFixed(2)}); tl.to("#${sid}-w", { opacity: 0, duration: 0.2, ease: "power2.in" }, ${(sd - 0.22).toFixed(2)});` : "");
    sh = sh.replace(`window.__timelines["${sid}"] = tl;`, seam + `window.__timelines["${sid}"] = tl;`);
    fs.writeFileSync(path.join(dir, "compositions", `${sid}.html`), sh);
    hosts += `<div id="${sid}" class="clip" data-composition-id="${sid}" data-composition-src="compositions/${sid}.html" data-start="${tt.toFixed(2)}" data-duration="${sd}" data-track-index="1" data-track-kind="graphics" data-width="1080" data-height="1920"></div>\n      `;
    audios += `<audio id="${V.key}-a${n}" class="clip" data-start="${(tt + lead).toFixed(2)}" data-duration="${D.toFixed(3)}" data-track-index="2" data-volume="1" src="assets/${V.key}_s${n}.wav"></audio>\n      `;
    const ws = text.split(/\s+/), weights = ws.map((w) => w.replace(/[^\w']/g, "").length + (/[.,:!?]$/.test(w) ? 3 : 0));
    const sum = weights.reduce((a, b) => a + b, 0), a0 = tt + lead + 0.06, span = D - 0.12;
    let acc = 0;
    ws.forEach((w, k) => { const s = a0 + (acc / sum) * span; acc += weights[k]; const e = a0 + (acc / sum) * span; allWords.push({ text: w, start: s, end: e }); });
    if (i > 0) seams.push(tt);
    tt += sd;
  });
  const T_ = +tt.toFixed(2);
  fs.writeFileSync(path.join(dir, "compositions", "captions.html"), captionsHtml(makeGroups(allWords)));
  execSync(`ffmpeg -y -loglevel error -f lavfi -i "aevalsrc='0.5*sin(2*PI*110*t)+0.4*sin(2*PI*164.81*t)+0.3*sin(2*PI*220*t)+0.22*sin(2*PI*277.18*t)+0.18*sin(2*PI*329.63*t)*(0.6+0.4*sin(2*PI*0.07*t))':s=44100:d=${(T_ + 1).toFixed(2)}" -af "lowpass=f=900,tremolo=f=0.2:d=0.3,volume=0.10,afade=t=in:d=2,afade=t=out:st=${(T_ - 2).toFixed(2)}:d=2" "${path.join(dir, "assets", "bgm.wav")}"`);
  {
    const ev = seams.map((x) => Math.max(0, x - 0.12)); const n = ev.length + 1;
    const dly = ev.map((x) => Math.round(x * 1000)).concat([Math.round((T_ - 3.0) * 1000)]);
    const wh = path.join(dir, "assets", "whoosh.wav"), dg = path.join(dir, "assets", "ding.wav");
    execSync(`ffmpeg -y -loglevel error -f lavfi -i "anoisesrc=d=0.5:c=pink:a=0.6:r=44100" -af "highpass=f=500,lowpass=f=3500,afade=t=in:d=0.22,afade=t=out:st=0.22:d=0.28,volume=0.5" "${wh}"`);
    execSync(`ffmpeg -y -loglevel error -f lavfi -i "sine=f=1046:d=0.9:r=44100" -af "afade=t=out:st=0.05:d=0.85,volume=0.18" "${dg}"`);
    const labels = []; const K = n - 1; let fc = `[0]asplit=${K}${Array.from({ length: K }, (_, k) => `[w${k}]`).join("")};`;
    dly.forEach((ms, k) => { const src = k < K ? `[w${k}]` : "[1]"; fc += `${src}adelay=${ms}|${ms},apad=whole_dur=${(T_ + 1).toFixed(2)}[x${k}];`; labels.push(`[x${k}]`); });
    execSync(`ffmpeg -y -loglevel error -i "${wh}" -i "${dg}" -filter_complex "${fc}${labels.join("")}amix=inputs=${n}:normalize=0,atrim=0:${(T_ + 1).toFixed(2)}[o]" -map "[o]" "${path.join(dir, "assets", "sfx.wav")}"`);
  }
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: ${C.bg}; }
      #root { position: relative; width: 1080px; height: 1920px; font-family: 'Inter', sans-serif; background: ${C.bg}; }
      #bg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; background: radial-gradient(ellipse at 50% 30%, #18224A 0%, ${C.bg} 62%); }
      #progbg { position: absolute; left: 90px; top: 1400px; width: 900px; height: 10px; border-radius: 5px; background: #1B2447; }
      #prog { position: absolute; left: 90px; top: 1400px; width: 900px; height: 10px; border-radius: 5px; background: linear-gradient(90deg, ${C.cyan}, ${C.violet}); }
      #endcard { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; background: rgba(10,15,31,.96); opacity: 0; }
      #ec1 { position: absolute; left: 60px; right: 60px; top: 640px; text-align: center; font-size: 84px; font-weight: 900; line-height: 1.08; color: #F5F7FF; opacity: 0; }
      #ec2 { position: absolute; left: 60px; right: 60px; top: 880px; text-align: center; font-size: 64px; font-weight: 900; color: #FBBF24; opacity: 0; }
      #ec3 { position: absolute; left: 60px; right: 60px; top: 1010px; text-align: center; font-size: 42px; font-weight: 800; letter-spacing: .08em; color: #22D3EE; opacity: 0; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${T_}" data-width="1080" data-height="1920">
      <div id="bg"></div>
      <div id="progbg"></div>
      <div id="prog"></div>
      ${hosts}<div id="captions" class="clip" data-composition-id="captions" data-composition-src="compositions/captions.html" data-start="0" data-duration="${T_}" data-track-index="5" data-track-kind="captions" data-width="1080" data-height="1920"></div>
      <div id="endcard" data-layout-allow-overlap></div><div id="ec1" data-layout-allow-overlap>Free study notes<br/>for this concept</div><div id="ec2" data-layout-allow-overlap>Check the bio</div><div id="ec3" data-layout-allow-overlap>LEARN AI BY STORY</div>
      ${audios}<audio id="bgm" class="clip" data-start="0" data-duration="${T_}" data-track-index="3" data-volume="1" src="assets/bgm.wav"></audio><audio id="sfx" class="clip" data-start="0" data-duration="${T_}" data-track-index="4" data-volume="1" src="assets/sfx.wav"></audio>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      tl.fromTo("#prog", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: ${T_}, ease: "none" }, 0);
      tl.fromTo("#endcard", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, ${T_ - 3.0});
      tl.fromTo("#ec1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "power4.out" }, ${T_ - 2.85});
      tl.fromTo("#ec2", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: "power4.out" }, ${T_ - 2.6});
      tl.fromTo("#ec3", { opacity: 0 }, { opacity: 1, duration: 0.4 }, ${T_ - 2.35});
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`;
  fs.writeFileSync(path.join(dir, "index.html"), html);
  console.log(V.id, LANG, "duration", T_);
}
