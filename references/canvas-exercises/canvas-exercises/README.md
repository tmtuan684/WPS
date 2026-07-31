# Canvas API Exercises

A progressive set of HTML Canvas exercises, each with a **starter** file (TODOs to fill in)
and a **solution** file (working reference). Every file is a standalone HTML page — just
open it directly in a browser, no build step or server required.

## How to use

1. Open a `*-starter.html` file in your editor and in your browser side by side.
2. Fill in the `// TODO` comments.
3. Refresh the browser to check your work.
4. Compare against the matching `*-solution.html` if you get stuck.

## Structure

### Level 1 — Basics: Shapes & Coordinates
- `1.1-grid-drawer` — draw a 3x3 grid with `strokeRect` and nested loops
- `1.2-bullseye` — concentric circles with `arc()`
- `1.3-traffic-light` — rounded rects + circles, layout practice

### Level 2 — Coordinates & Transformations
- `2.1-clock-face` — `save()` / `translate()` / `rotate()` / `restore()`
- `2.2-rotating-square` — animating a rotation around a shape's own center
- `2.3-zoom-pan` — `scale()` + `translate()` driven by mouse wheel and drag

### Level 3 — Interactivity (mouse/keyboard)
- `3.1-click-to-fill` — mapping mouse coordinates to grid indices (ties into your
  `isAdjacent` index math)
- `3.2-draggable-circle` — mousedown/mousemove/mouseup drag logic
- `3.3-freehand-drawing` — simple sketch pad using paths

### Level 4 — Animation & Game Loop
- `4.1-bouncing-ball` — velocity, edge collision, `requestAnimationFrame`
- `4.2-particle-system` — spawning, updating, and pruning an array of particles with fade-out
- `4.3-slider-puzzle` — renders your 3x3 slider puzzle on canvas, reusing your
  `isAdjacent()` / `isSolvable()` functions, with an animated tile-slide on click

### Level 5 — Images & Compositing
- `5.1-image-slicer` — load a local image (file picker, no network needed) and slice it
  into a 3x3 grid of tile canvases using the 9-argument `drawImage()`
- `5.2-sprite-animation` — generates a sprite sheet programmatically (no external asset
  needed) and cycles through its frames

## Notes

- All exercises are self-contained — no external images, network requests, or
  dependencies. `5.1` uses a local file picker instead of an image URL so it works
  offline and avoids CORS issues.
- `4.3` is a good one to revisit after your slider puzzle logic work — it wires your
  `isAdjacent`/`isSolvable` functions directly into a rendered, clickable board.
- `ctx.roundRect()` (used in a few files) is supported in all current browsers; if you
  ever need to support very old browsers, swap it for a manual path with `arcTo()`.
