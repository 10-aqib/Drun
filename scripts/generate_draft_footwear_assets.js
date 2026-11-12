/**
 * Generates the illustrated stand-in images for catalogue designs that are
 * still awaiting studio photography (status "draft").
 *
 * Output: public/products/<slug>.png, <slug>-side.png, <slug>-top.png
 * (1200 x 900, transparent background, no baked-in text).
 *
 * Usage (needs Playwright's Chromium):  node scripts/generate_draft_footwear_assets.js
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const OUT = path.join(__dirname, "..", "public", "products");
const W = 1200;
const H = 900;

// Mirrors the draft entries in src/data/products.ts
const DESIGNS = require("./draft_designs.json");

// ---------- colour helpers ----------
const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));
const hexToRgb = (h) => {
  const v = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16));
};
const rgbToHex = ([r, g, b]) => "#" + [r, g, b].map((n) => clamp(n).toString(16).padStart(2, "0")).join("");
const shade = (hex, amt) => {
  const rgb = hexToRgb(hex);
  return rgbToHex(rgb.map((c) => (amt >= 0 ? c + (255 - c) * amt : c * (1 + amt))));
};

// ---------- per-style construction ----------
const STYLES = {
  classic: { soleH: 40, toe: "round", lugs: false, cross: false, wing: false, welt: 1 },
  kaptaan: { soleH: 54, toe: "square", lugs: true, cross: false, wing: true, welt: 1 },
  norozi: { soleH: 66, toe: "spring", lugs: true, cross: true, wing: false, welt: 2 },
  modern: { soleH: 34, toe: "round", lugs: false, cross: false, wing: true, welt: 1 },
};

// Per-design material overrides
const MATERIAL = {
  "dual-tone-cognac-charcoal": { strap: "#34363a" },
  "signature-gala-velvet-calf": { strap: "#0b0c10", sole: "#0b0c10", glossStrap: true },
  "norozi-ceremonial-brass": { brass: "#e0b04a" },
  "kaptaan-imperial-stitched": { stitch: "#e8c9a0" },
};

function isMatte(d) {
  return /suede|nubuck|velour|velvet/i.test(d.leather);
}

// Side profile of one shoe, facing right. Ground line y = 690, x spans ~210..1020.
function sideShoe(d, uid) {
  const st = STYLES[d.style] || STYLES.classic;
  const mat = MATERIAL[d.slug] || {};
  const B = 690;
  const T = B - st.soleH;
  const xh = 210;
  const xt = 1018;
  const base = d.color;
  const light = shade(base, 0.22);
  const dark = shade(base, -0.38);
  const strap = mat.strap || base;
  const strapLight = shade(strap, 0.2);
  const strapDark = shade(strap, -0.4);
  const sole = mat.sole || (d.style === "modern" && hexToRgb(base)[0] > 150 ? "#2b2622" : "#171615");
  const brass = mat.brass || "#d9a63c";
  const stitch = mat.stitch || shade(base, 0.62);
  const matte = isMatte(d);
  const toeLift = st.toe === "spring" ? 18 : 0;

  const solePath =
    st.toe === "square"
      ? `M ${xh + 4} ${T + 12} Q ${xh} ${T} ${xh + 16} ${T} L ${xt - 12} ${T} Q ${xt} ${T} ${xt} ${T + 12} L ${xt} ${B - 10} Q ${xt} ${B} ${xt - 12} ${B} L ${xh + 26} ${B} Q ${xh} ${B} ${xh} ${B - 14} Z`
      : `M ${xh + 4} ${T + 12} Q ${xh} ${T} ${xh + 16} ${T} L ${xt - 40 } ${T - toeLift / 2} Q ${xt} ${T - toeLift} ${xt} ${T - toeLift + 20} L ${xt} ${B - 26 - toeLift} Q ${xt - 6} ${B - toeLift * 0.7} ${xt - 60} ${B - toeLift * 0.35} L ${xh + 70} ${B} Q ${xh} ${B} ${xh} ${B - 16} Z`;

  const lugs = st.lugs
    ? Array.from({ length: 18 }, (_, i) => {
        const x = xh + 40 + i * 44;
        return `<rect x="${x}" y="${B - 10}" width="28" height="12" rx="4" fill="#2c2a28"/>`;
      }).join("")
    : "";

  const weltBands = Array.from({ length: st.welt }, (_, i) => {
    const y = T + 2 + i * 12;
    return `<rect x="${xh + 6}" y="${y}" width="${xt - xh - 12}" height="9" fill="${i === 0 ? shade(base, -0.05) : shade(base, -0.25)}" opacity="0.95"/>
            <line x1="${xh + 12}" y1="${y + 4.5}" x2="${xt - 8}" y2="${y + 4.5}" stroke="${stitch}" stroke-width="2.2" stroke-dasharray="9 7" opacity="0.9"/>`;
  }).join("");

  // Heel strap (arc from the heel up to the buckle)
  const heelStrap = `M 268 ${T + 2} C 252 ${T - 110} 300 ${T - 178} 430 ${T - 184} S 540 ${T - 178} 590 ${T - 168}`;
  // Vamp: toe cap + bridge over the foot, with a window cut-out
  const vamp =
    st.toe === "square"
      ? `M ${xt - 8} ${T} L ${xt - 8} ${T - 52} C ${xt - 8} ${T - 74} ${xt - 40} ${T - 86} ${xt - 100} ${T - 96} L 700 ${T - 156} C 660 ${T - 168} 616 ${T - 170} 590 ${T - 152} L 596 ${T - 98} C 660 ${T - 84} 750 ${T - 74} 818 ${T - 72} L 818 ${T} Z`
      : `M ${xt - 8} ${T - toeLift} C ${xt - 4} ${T - 60 - toeLift} ${xt - 70} ${T - 100 - toeLift} ${xt - 150} ${T - 118} C 900 ${T - 138} 790 ${T - 160} 700 ${T - 166} C 656 ${T - 170} 616 ${T - 168} 590 ${T - 150} L 596 ${T - 98} C 660 ${T - 84} 750 ${T - 76} 822 ${T - 70} L 830 ${T - 6 - toeLift / 2} Z`;
  const wing = st.wing
    ? `<path d="M 600 ${T - 160} C 700 ${T - 176} 800 ${T - 150} 860 ${T - 104} C 800 ${T - 112} 700 ${T - 100} 612 ${T - 96} Z" fill="url(#lg${uid})" opacity="0.92"/>
       <path d="M 612 ${T - 150} C 700 ${T - 162} 790 ${T - 138} 846 ${T - 108}" fill="none" stroke="${stitch}" stroke-width="2" stroke-dasharray="8 6" opacity="0.8"/>`
    : "";
  const cross = st.cross
    ? `<path d="M 640 ${T - 94} C 720 ${T - 70} 790 ${T - 40} 852 ${T - 6} L 880 ${T - 8} C 800 ${T - 52} 730 ${T - 84} 668 ${T - 100} Z" fill="url(#sg${uid})"/>
       <path d="M 646 ${T - 92} C 722 ${T - 66} 788 ${T - 36} 852 ${T - 4}" fill="none" stroke="${stitch}" stroke-width="2" stroke-dasharray="8 6" opacity="0.75"/>`
    : "";

  const gloss = mat.glossStrap || (!matte && d.style !== "kaptaan")
    ? `<path d="M 440 ${T - 176} C 500 ${T - 176} 548 ${T - 172} 584 ${T - 164}" fill="none" stroke="#fff" stroke-opacity="0.22" stroke-width="5" stroke-linecap="round"/>
       <path d="M 700 ${T - 158} C 800 ${T - 142} 900 ${T - 120} 960 ${T - 104}" fill="none" stroke="#fff" stroke-opacity="0.18" stroke-width="6" stroke-linecap="round"/>`
    : "";

  return `
  <g>
    <defs>
      <linearGradient id="lg${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${light}"/><stop offset="0.55" stop-color="${base}"/><stop offset="1" stop-color="${dark}"/>
      </linearGradient>
      <linearGradient id="sg${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${strapLight}"/><stop offset="0.6" stop-color="${strap}"/><stop offset="1" stop-color="${strapDark}"/>
      </linearGradient>
      <linearGradient id="fb${uid}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#8a6a48"/><stop offset="1" stop-color="#c8a47c"/>
      </linearGradient>
      <linearGradient id="so${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${shade(sole, 0.16)}"/><stop offset="1" stop-color="${shade(sole, -0.3)}"/>
      </linearGradient>
      <filter id="nz${uid}" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n"/>
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 -0.12" result="a"/>
        <feComposite in="a" in2="SourceAlpha" operator="in"/>
      </filter>
      <clipPath id="vc${uid}"><path d="${vamp}"/></clipPath>
      <clipPath id="sc${uid}"><path d="${solePath}"/></clipPath>
    </defs>

    <!-- sole -->
    <path d="${solePath}" fill="url(#so${uid})"/>
    <g clip-path="url(#sc${uid})">${lugs}${weltBands}
      <rect x="${xh}" y="${B - 5}" width="${xt - xh}" height="5" fill="#000" opacity="0.25"/></g>

    <!-- far-side interior seen through the window -->
    <path d="M 268 ${T} C 252 ${T - 110} 300 ${T - 178} 430 ${T - 184} S 540 ${T - 178} 590 ${T - 168} L 596 ${T - 98} C 660 ${T - 84} 750 ${T - 76} 822 ${T - 70} L 830 ${T} Z" fill="${shade(base, -0.72)}"/>
    <path d="M 268 ${T} C 262 ${T - 90} 306 ${T - 150} 430 ${T - 158} S 536 ${T - 152} 592 ${T - 140} L 594 ${T - 104} C 660 ${T - 92} 750 ${T - 84} 818 ${T - 78} L 826 ${T} Z" fill="${shade(base, -0.55)}" opacity="0.7"/>

    <!-- footbed + shadow inside the window -->
    <path d="M 290 ${T} L 300 ${T - 20} Q 330 ${T - 28} 400 ${T - 24} L 820 ${T - 22} L 830 ${T} Z" fill="url(#fb${uid})"/>
    <path d="M 300 ${T - 20} Q 330 ${T - 28} 400 ${T - 24} L 820 ${T - 22}" fill="none" stroke="#000" stroke-opacity="0.25" stroke-width="3"/>

    <!-- heel strap -->
    <path d="${heelStrap}" fill="none" stroke="${strapDark}" stroke-width="38" stroke-linecap="butt"/>
    <path d="${heelStrap}" fill="none" stroke="url(#sg${uid})" stroke-width="32" stroke-linecap="butt"/>
    <path d="${heelStrap}" fill="none" stroke="${stitch}" stroke-width="2" stroke-dasharray="8 6" transform="translate(0,-9)" opacity="0.7"/>

    <!-- vamp -->
    <path d="${vamp}" fill="url(#lg${uid})"/>
    ${matte ? `<g clip-path="url(#vc${uid})"><rect x="560" y="${T - 190}" width="520" height="220" filter="url(#nz${uid})" opacity="0.55"/></g>` : ""}
    <path d="${vamp}" fill="none" stroke="${dark}" stroke-width="3" stroke-linejoin="round"/>
    <path d="${vamp}" fill="none" stroke="${stitch}" stroke-width="2" stroke-dasharray="8 6" transform="translate(-4,-1) scale(0.994 0.99)" opacity="0.7" style="transform-origin: 800px ${T - 90}px"/>
    ${wing}
    ${cross}
    <g clip-path="url(#vc${uid})">${gloss}</g>

    <!-- buckle -->
    <g>
      <rect x="566" y="${T - 196}" width="44" height="58" rx="9" fill="none" stroke="${brass}" stroke-width="8"/>
      <rect x="566" y="${T - 196}" width="44" height="58" rx="9" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="2" transform="translate(-1.5,-1.5)"/>
      <rect x="584" y="${T - 170}" width="40" height="8" rx="4" fill="${brass}"/>
    </g>
  </g>`;
}

// Top-down view of one shoe, toe pointing up, centred on (0,0)
function topShoe(d, uid) {
  const st = STYLES[d.style] || STYLES.classic;
  const mat = MATERIAL[d.slug] || {};
  const base = d.color;
  const strap = mat.strap || base;
  const sole = mat.sole || "#171615";
  const brass = mat.brass || "#d9a63c";
  const stitch = mat.stitch || shade(base, 0.62);
  const toeY = st.toe === "square" ? -296 : -308;
  const outline =
    st.toe === "square"
      ? `M -78 -296 L 78 -296 Q 116 -296 118 -252 C 122 -150 112 0 92 140 C 84 232 58 304 0 306 C -58 304 -84 232 -92 140 C -112 0 -122 -150 -118 -252 Q -116 -296 -78 -296 Z`
      : `M 0 ${toeY} C 80 ${toeY} 122 -210 118 -110 C 114 0 100 130 90 230 C 84 290 52 312 0 312 C -52 312 -84 290 -90 230 C -100 130 -114 0 -118 -110 C -122 -210 -80 ${toeY} 0 ${toeY} Z`;
  const vamp = `M -104 -90 C -112 -200 -84 -${st.toe === "square" ? 280 : 292} 0 -${st.toe === "square" ? 280 : 292} C 84 -${st.toe === "square" ? 280 : 292} 112 -200 104 -90 C 60 -70 -60 -70 -104 -90 Z`;
  return `
  <defs>
    <linearGradient id="tv${uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${shade(base, 0.2)}"/><stop offset="1" stop-color="${shade(base, -0.3)}"/>
    </linearGradient>
    <linearGradient id="ts${uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${shade(strap, 0.2)}"/><stop offset="1" stop-color="${shade(strap, -0.35)}"/>
    </linearGradient>
    <clipPath id="to${uid}"><path d="${outline}"/></clipPath>
  </defs>
  <path d="${outline}" fill="${sole}"/>
  <path d="${outline}" fill="none" stroke="${shade(base, -0.1)}" stroke-width="8" transform="scale(0.97)"/>
  <path d="${outline}" fill="none" stroke="${stitch}" stroke-width="2" stroke-dasharray="9 7" transform="scale(0.935)" opacity="0.85"/>
  <path d="${outline}" fill="#bd9468" transform="scale(0.9)"/>
  <path d="${outline}" fill="#000" opacity="0.12" transform="scale(0.9) translate(10 14)"/>
  <ellipse cx="0" cy="180" rx="52" ry="54" fill="#a47c54" opacity="0.8"/>
  <path d="${vamp}" fill="url(#tv${uid})" stroke="${shade(base, -0.4)}" stroke-width="3"/>
  <path d="M -92 -96 C -96 -196 -74 -264 0 -264 C 74 -264 96 -196 92 -96" fill="none" stroke="${stitch}" stroke-width="2" stroke-dasharray="8 6" opacity="0.75"/>
  ${st.cross ? `<path d="M -98 -86 L 98 -150 L 98 -128 L -98 -64 Z" fill="url(#ts${uid})" opacity="0.95"/>` : `<path d="M -104 -70 C -50 -120 50 -150 104 -128 L 104 -96 C 50 -112 -50 -80 -104 -42 Z" fill="url(#ts${uid})" opacity="0.95"/>`}
  <path d="M -100 -38 C -128 80 -96 214 0 222 C 96 214 128 80 100 -38" fill="none" stroke="${shade(strap, -0.4)}" stroke-width="40"/>
  <path d="M -100 -38 C -128 80 -96 214 0 222 C 96 214 128 80 100 -38" fill="none" stroke="url(#ts${uid})" stroke-width="32"/>
  <path d="M -100 -38 C -128 80 -96 214 0 222 C 96 214 128 80 100 -38" fill="none" stroke="${stitch}" stroke-width="2" stroke-dasharray="8 6" transform="scale(0.93 0.97)" opacity="0.6"/>
  <rect x="84" y="-62" width="40" height="46" rx="8" fill="none" stroke="${brass}" stroke-width="7"/>`;
}

function wrapSvg(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <filter id="blur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="16"/></filter>
  </defs>
  ${inner}
</svg>`;
}

const shadow = (cx, cy, rx, ry, op = 0.5) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${op}" filter="url(#blur)"/>`;

function mainSvg(d) {
  // Pair view: rear shoe slightly smaller and offset, front shoe larger.
  return wrapSvg(`
    ${shadow(600, 712, 440, 22, 0.55)}
    <g transform="translate(150 -34) scale(0.82)" opacity="0.92">${sideShoe(d, "b")}</g>
    ${shadow(560, 780, 420, 20, 0.6)}
    <g transform="translate(-40 70) scale(0.95)">${sideShoe(d, "a")}</g>`);
}
function sideSvg(d) {
  return wrapSvg(`
    ${shadow(620, 700, 450, 22, 0.55)}
    <g transform="translate(-10 0)">${sideShoe(d, "s")}</g>`);
}
function topSvg(d) {
  return wrapSvg(`
    ${shadow(600, 790, 380, 24, 0.4)}
    <g transform="translate(400 470) scale(0.9) rotate(-4)">${topShoe(d, "l")}</g>
    <g transform="translate(790 450) scale(0.9) rotate(4)">${topShoe(d, "r")}</g>`);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const only = process.argv[2];
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  let n = 0;
  for (const d of DESIGNS) {
    if (only && d.slug !== only) continue;
    for (const [suffix, svg] of [["", mainSvg(d)], ["-side", sideSvg(d)], ["-top", topSvg(d)]]) {
      await page.setContent(`<html><body style="margin:0;background:transparent">${svg}</body></html>`);
      await page.screenshot({ path: path.join(OUT, `${d.slug}${suffix}.png`), omitBackground: true, clip: { x: 0, y: 0, width: W, height: H } });
      n++;
    }
  }
  await browser.close();
  console.log(`Generated ${n} images for ${only ? 1 : DESIGNS.length} designs.`);
})();
