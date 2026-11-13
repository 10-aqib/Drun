# GRAVITY — Digital Studio

> **Less noise. More gravity.**

A premium one-page website for a fictional independent digital studio, built around a full-screen, real-time WebGL **gravity field** of glossy pastel spheres. The entire experience lives in a single, dependency-free `index.html`.

![Stack](https://img.shields.io/badge/stack-HTML%20%C2%B7%20CSS%20%C2%B7%20JS-0E2AC5)
![Three.js](https://img.shields.io/badge/three.js-r160-2f69ff)
![Build](https://img.shields.io/badge/build-none-brightgreen)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## About

GRAVITY is a showcase of what a modern studio site can feel like when the 3D scene *is* the page. About 96 hyper-real spheres (glass and matte physical materials) sweep in from off-screen and settle into a floating cluster behind the hero. As the visitor scrolls, the field is driven by scroll progress through four full-height sections:

| # | Section | What the spheres do |
|---|---------|---------------------|
| 01 | **Hero** | Float as an elliptical cluster, gently drifting. |
| 02 | **Physics** | Surrender to gravity, tumble and bounce off the floor. |
| 03 | **Form** | Reassemble into a solid **heart** silhouette. |
| 04 | **Release** | Lift off and rush past the camera, fading to nothing. |

Along the way the palette morphs **cobalt blue → volt-lime → rose-pink**, and the page background eases between matching tints. The cursor repels the spheres everywhere, with a momentum boost so a fast flick throws them hard.

## Features

- **Real-time physics** — Verlet-style integration, 4 collision sub-steps, mass-weighted impulses, bouncy floor, viewport walls.
- **Real materials** — `THREE.SphereGeometry` with `MeshPhysicalMaterial` (transmissive glass + matte clearcoat). No custom GLSL, no external textures or models.
- **Scroll-driven scene** — blend factors derived from `scrollY / innerHeight` control gravity, heart attraction, fly-through and palette.
- **Cursor interaction** — repulsion radius, speed-based boost, stronger on mouse-down.
- **Lenis-style smooth scroll** — vanilla JS, lerp factor `0.09`.
- **Pre-roll loader** — calibrates while the scene warms up, then hands off to the fly-in.
- **Studio Controls drawer** — four hero palettes (Royal Blue, Rose Blush, Volt Lime, Arctic Sky); switching rebuilds the scene.
- **Scroll reveals** — `IntersectionObserver` entrance (fade, rise, de-blur).
- **Glassmorphic chrome, marquee footer, responsive layout** (54 spheres on mobile, 96 on desktop).
- **Resilient** — if WebGL or the CDN is unavailable, the loader still completes and the page remains usable.

## Tech stack

| Layer | Choice |
|-------|--------|
| Markup / styling | Plain HTML + CSS (custom properties, no framework) |
| Logic | Vanilla ES modules |
| 3D | [Three.js](https://threejs.org/) `0.160.0` via CDN import map |
| Type | Raleway, Space Grotesk, JetBrains Mono, Inter (Google Fonts) |
| Icons | Inline SVG sprite (Lucide paths) |
| Build | **None** |

## Getting started

Requirements: any modern browser with WebGL. Node.js is only needed for the optional dev server.

```bash
# 1. Clone and enter the project
git clone https://github.com/10-aqib/drun.git
cd drun/gravity-studio

# 2. Serve it locally (any static server works)
npm start            # → http://localhost:4173
```

You can also open `index.html` directly in a browser, or use `python3 -m http.server 4173`. An internet connection is required for the Three.js CDN and Google Fonts.

## Project structure

```
gravity-studio/
├── index.html          # The whole site: markup, CSS, UI logic, WebGL scene
├── docs/
│   └── ARCHITECTURE.md # Physics model, scroll mapping, constants
├── package.json        # Dev scripts (static server)
├── .editorconfig
├── .gitignore
├── LICENSE
└── README.md
```

## How it works

1. **Boot** — the loader eases toward 92% on its own; once the first WebGL frame renders it completes to 100%, fades out and sets `control.started = true`.
2. **Scroll** — `progress = scrollY / innerHeight` is written to a shared `control` object each frame; the physics loop reads it.
3. **Mode blending** — `smoothstep` windows over `progress` produce `heroF`, `dropF`, `shapeF` and `flyF`, which weight the forces on every sphere.
4. **Heart** — each sphere gets a rejection-sampled target inside the implicit heart `(x²+y²−1)³ − x²y³ ≤ 0`, recomputed on resize.
5. **Theme switch** — the scene is fully torn down (geometry, materials, renderer, WebGL context) and rebuilt with the new base colour.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full parameter tables.

## Customising

- **Palettes** — edit the `THEMES` array and `getDynamicColors()` in `index.html`.
- **Sphere count / sizes** — `ballCount` and the radius distribution in `createScene()`.
- **Scroll timing** — the `smoothstep` ranges at the top of `simulateAndRender()`.
- **Copy** — all text is plain HTML inside the four `<section>` blocks and the footer.

## Browser support

Current Chrome, Edge, Firefox and Safari. `backdrop-filter` and `inert` are used for the glass UI and the drawer. Touch devices use native scrolling (smooth-scroll hijacking is wheel-only). `prefers-reduced-motion` disables the smooth scroll and shortens reveals.

## Performance notes

- Pixel ratio is capped at 2; sphere count drops to 54 below 768px.
- A software-rendered or very low-end GPU will run the physics slowly, because the simulation is stepped per frame.

## Deployment

It is a static site — deploy the folder to GitHub Pages, Netlify, Vercel, Cloudflare Pages or any static host. No build command, publish directory is `gravity-studio/`.

## Credits

Built with [Three.js](https://threejs.org/). Icons from [Lucide](https://lucide.dev/). Fonts from Google Fonts. GRAVITY is a fictional studio; the contact details are placeholders.

## License

[MIT](LICENSE)
