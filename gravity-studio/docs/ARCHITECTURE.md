# Architecture

Everything ships in `index.html`. This document maps its internals.

## 1. Page layers (back to front)

| z-index | Layer | Notes |
|---------|-------|-------|
| -10 | Background gradient | Three stacked layers cross-faded over 1.2s (hero / lime / pink) |
| 0 | WebGL canvas | `position: fixed`, `pointer-events: none` |
| 10 | Four sections + footer | Sections are `pointer-events: none`; text blocks re-enable them |
| 30 | Header | Fixed, glassmorphic controls |
| 40 / 50 | Drawer scrim / drawer | Studio Controls |
| 100 | Loader | Removed after the reveal |

## 2. Shared state

```js
control  = { progress: 0, started: false }   // written by the page, read by the scene
mousePos = { x: 99, y: 99, isDown: false }   // normalised cursor, starts off-screen
```

- `progress = scrollY / innerHeight` (0 = hero, 1 = drop, 2 = shape, 3 = release)
- Background stage: `progress > 1.55 → pink`, `> 0.7 → lime`, otherwise hero

## 3. Mode blend factors

| Factor | Formula |
|--------|---------|
| `heroF` | `1 − smoothstep(0.30, 0.80, p)` |
| `dropRaw` | `smoothstep(0.40, 0.95, p)` |
| `dropF` | `dropRaw · (1 − smoothstep(1.25, 1.75, p))` |
| `shapeF` | `smoothstep(1.40, 2.05, p) · (1 − smoothstep(2.55, 3.0, p))` |
| `flyF` | `smoothstep(2.7, 3.45, p)` |
| lime blend | `smoothstep(0.55, 1.05, p)` |
| pink blend | `smoothstep(1.40, 1.95, p)` |

## 4. Per-frame simulation

1. **Accelerations** — hero drift, cluster attraction (boosted ×7.5 on entrance, easing to ×1 over 2.2s), gravity (`0.011 · dropF`), heart spring (`0.06 · shapeF`), fly-through (`+z` with staggered start), cursor repulsion.
2. **Damping** — `0.91`, lerped to `0.992` (drop), `0.90` (shape), `0.985` (fly).
3. **Collisions** — 4 sub-steps; positional correction scaled by `0.28 · (1 − 0.93·shapeF) · (1 − flyF)`; mass-weighted impulse with bounciness `0.02`.
4. **Bounds** — x walls and top release at `flyF ≥ 0.5`, z walls at `flyF ≥ 0.02`; floor restitution `0.30 + 0.35·dropF`.
5. **Rolling** — spheres rotate about the world axis perpendicular to their motion.

## 5. Parameters

| Parameter | Value |
|-----------|-------|
| Camera | FOV 38, near 0.1, far 100, position `(0, 0, 11)` |
| Renderer | ACES Filmic, exposure 1.15, PCF soft shadows, DPR ≤ 2 |
| Sphere count | 96 desktop / 54 mobile (< 768px) |
| Radius mix | 30% `0.27–0.39`, 50% `0.42–0.60`, 20% `0.66–0.87`; mass = `r³` |
| Glass probability | 0.22 (transmission 0.95, IOR 1.485, thickness 2.2) |
| Matte split | 25% pastel, 30% light, 30% medium, 15% deep |
| Cursor | force 0.05, radius 4.4, ×1.7 force / ×1.4 radius on press, speed boost `1 + 3.2·speed` |
| Smooth scroll | lerp 0.09 |

## 6. Lifecycle

```
load ─▶ loader eases to 92% ─▶ first WebGL frame ─▶ onReady()
     ─▶ bar → 100% ─▶ loader fades (140ms + 520ms) ─▶ onDone()
     ─▶ control.started = true ─▶ scatterFar(true) ─▶ spheres fly in
```

A palette change calls `mountScene()`: dispose the old renderer (geometry, materials, context), create a fresh canvas, rebuild the scene with the new base colour. Because `control.started` is already true, the fly-in plays again.

## 7. Failure handling

- Three.js import failure or WebGL error → logged, loader completes, page stays readable.
- `localStorage` is not used.
