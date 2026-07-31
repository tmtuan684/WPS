const exercises_data = [
      {
        id: 'rects', tier: 'Beginner', title: '1. Rectangles 101',
        instructions: `Draw two rectangles:
1) A filled steelblue rectangle at (50, 50), size 200×100.
2) A stroked crimson rectangle at (300, 50), size 150×150, lineWidth 4.

APIs: fillStyle, fillRect(x, y, w, h), strokeStyle, lineWidth, strokeRect(x, y, w, h)`,
        hint: 'fillRect and strokeRect both take (x, y, width, height) — set fillStyle/strokeStyle and lineWidth before calling them.',
        starter: `// TODO 1: filled rectangle — steelblue, x=50 y=50 w=200 h=100


// TODO 2: stroked rectangle — crimson, lineWidth=4, x=300 y=50 w=150 h=150
`,
        solution: `ctx.fillStyle = 'steelblue';
ctx.fillRect(50, 50, 200, 100);

ctx.strokeStyle = 'crimson';
ctx.lineWidth = 4;
ctx.strokeRect(300, 50, 150, 150);
`
      },
      {
        id: 'circles', tier: 'Beginner', title: '2. Circles & Arcs',
        instructions: `Draw:
1) A filled orange circle, center (130, 150), radius 70.
2) A stroked teal arc forming a dome (top half of a circle), center (380, 220),
   radius 90, lineWidth 6.

Hint: arc(cx, cy, r, startAngle, endAngle). For the dome, go from Math.PI to Math.PI * 2.`,
        hint: 'arc(cx, cy, r, startAngle, endAngle) sweeps clockwise from startAngle to endAngle; angle 0 is the 3 o’clock position.',
        starter: `// TODO 1: filled circle — orange, center (130,150), radius 70


// TODO 2: dome arc — teal, lineWidth 6, center (380,220), radius 90
//   arc(cx, cy, r, Math.PI, Math.PI * 2)
`,
        solution: `ctx.beginPath();
ctx.arc(130, 150, 70, 0, Math.PI * 2);
ctx.fillStyle = 'orange';
ctx.fill();

ctx.beginPath();
ctx.arc(380, 220, 90, Math.PI, Math.PI * 2);
ctx.strokeStyle = 'teal';
ctx.lineWidth = 6;
ctx.stroke();
`
      },
      {
        id: 'triangle', tier: 'Beginner', title: '3. Triangle via Path',
        instructions: `Draw a filled seagreen triangle with vertices (150, 50), (50, 250), (250, 250)
using beginPath / moveTo / lineTo / closePath / fill.`,
        hint: 'A path is just moveTo to the first point, lineTo for each additional point, then closePath to connect back to the start.',
        starter: `// TODO: filled triangle, vertices (150,50) (50,250) (250,250), color seagreen
`,
        solution: `ctx.beginPath();
ctx.moveTo(150, 50);
ctx.lineTo(50, 250);
ctx.lineTo(250, 250);
ctx.closePath();
ctx.fillStyle = 'seagreen';
ctx.fill();
`
      },
      {
        id: 'star', tier: 'Beginner', title: '4. Five-Pointed Star',
        instructions: `Draw a filled gold 5-pointed star centered at (280, 180): outer radius 80,
inner radius 32.

Hint: loop 5 times; each iteration place an outer point then an inner point,
advancing the angle by Math.PI / 5 each step, starting at angle -Math.PI / 2
(straight up).`,
        hint: 'Alternate between two radii as you sweep around the center — every other point should be pulled inward toward the middle.',
        starter: `// TODO: 5-pointed star, center (280,180), outerR=80, innerR=32, color gold
// hint:
// const cx = 280, cy = 180, outerR = 80, innerR = 32, spikes = 5;
// let rot = -Math.PI / 2;
// const step = Math.PI / spikes;
`,
        solution: `const cx = 280, cy = 180, outerR = 80, innerR = 32, spikes = 5;
let rot = -Math.PI / 2;
const step = Math.PI / spikes;

ctx.beginPath();
ctx.moveTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
for (let i = 0; i < spikes; i++) {
  rot += step;
  ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
  rot += step;
  ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
}
ctx.closePath();
ctx.fillStyle = 'gold';
ctx.fill();
ctx.strokeStyle = '#b8860b';
ctx.stroke();
`
      },
      {
        id: 'checker', tier: 'Intermediate', title: '5. Checkerboard',
        instructions: `Draw an 8×8 checkerboard starting at (20, 20), each square 40×40.
Alternate '#eee' and '#333' based on (row + col) % 2 using nested loops.`,
        hint: 'Use (row + col) % 2 to decide which color goes in each cell — this is the classic checkerboard parity trick.',
        starter: `// TODO: 8x8 checkerboard, top-left (20,20), square size 40
// alternate '#eee' / '#333' based on (row + col) % 2
`,
        solution: `const size = 40, cols = 8, rows = 8, startX = 20, startY = 20;
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const isDark = (row + col) % 2 === 1;
    ctx.fillStyle = isDark ? '#333' : '#eee';
    ctx.fillRect(startX + col * size, startY + row * size, size, size);
  }
}
`
      },
      {
        id: 'smiley', tier: 'Intermediate', title: '6. Smiley Face',
        instructions: `Compose a smiley from simple shapes:
1) Face: filled yellow circle, center (280, 200), radius 120, dark-gold stroke.
2) Eyes: two small filled black circles.
3) Mouth: a stroked arc, bottom half of a circle centered at (280, 210) r=60,
   lineWidth 8 (bottom half = angle 0 to Math.PI, clockwise).`,
        hint: 'Layer three separate shapes on the same canvas — nothing stops you from calling beginPath() multiple times in one script.',
        starter: `// TODO 1: face — filled circle, center (280,200), r=120, color '#ffd93d'


// TODO 2: two eyes — small filled black circles, e.g. (235,170) and (325,170), r=12


// TODO 3: mouth — stroked arc, center (280,210), r=60, angle 0 to Math.PI, lineWidth 8
`,
        solution: `ctx.beginPath();
ctx.arc(280, 200, 120, 0, Math.PI * 2);
ctx.fillStyle = '#ffd93d';
ctx.fill();
ctx.strokeStyle = '#c9a227';
ctx.lineWidth = 4;
ctx.stroke();

ctx.fillStyle = '#2b2b2b';
ctx.beginPath();
ctx.arc(235, 170, 12, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(325, 170, 12, 0, Math.PI * 2);
ctx.fill();

ctx.beginPath();
ctx.arc(280, 210, 60, 0, Math.PI, false);
ctx.lineWidth = 8;
ctx.strokeStyle = '#2b2b2b';
ctx.stroke();
`
      },
      {
        id: 'polygon', tier: 'Intermediate', title: '7. Regular Polygon Generator',
        instructions: `Write a reusable function:
  drawPolygon(ctx, cx, cy, radius, sides, rotation)
that strokes a regular polygon with the given number of sides, then call it
twice: a hexagon at (150, 180) and an octagon at (400, 180), both radius 90.`,
        hint: 'The angle between vertices of an n-sided polygon is 2π / n — loop from 0 to sides-1 and multiply.',
        starter: `function drawPolygon(ctx, cx, cy, radius, sides, rotation = -Math.PI / 2) {
  // TODO: loop "sides" times, computing points at angle
  //   rotation + i * (2 * Math.PI / sides)
  // and connect them into a closed path, then stroke.
}

ctx.strokeStyle = 'mediumpurple';
ctx.lineWidth = 3;
drawPolygon(ctx, 150, 180, 90, 6);
drawPolygon(ctx, 400, 180, 90, 8);
`,
        solution: `function drawPolygon(ctx, cx, cy, radius, sides, rotation = -Math.PI / 2) {
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const angle = rotation + (i * 2 * Math.PI) / sides;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

ctx.strokeStyle = 'mediumpurple';
ctx.lineWidth = 3;
drawPolygon(ctx, 150, 180, 90, 6);
drawPolygon(ctx, 400, 180, 90, 8);
`
      },
      {
        id: 'house', tier: 'Intermediate', title: '8. House Illustration',
        instructions: `Compose a small house out of primitives:
1) Body: filled rectangle, x=150 y=150 w=200 h=150.
2) Roof: filled triangle sitting on top of the body, overhanging slightly on each side.
3) Door: a smaller filled rectangle centered at the bottom of the body.
4) Two windows: small filled squares, each with a stroked cross (two lines) for panes.`,
        hint: 'Draw back-to-front: body first, then roof, then door and windows on top, so later shapes overlap earlier ones correctly.',
        starter: `const baseX = 150, baseY = 150, w = 200, h = 150;

// TODO 1: body — fillRect + strokeRect using baseX, baseY, w, h


// TODO 2: roof — filled triangle above the body (overhang ~20px each side, apex ~90px above)


// TODO 3: door — filled rectangle, centered horizontally, bottom-aligned to the body


// TODO 4: windows — write a drawWindow(x, y, size) helper that fills a square
//   and strokes a cross (vertical + horizontal line) through its middle,
//   then call it twice
`,
        solution: `const baseX = 150, baseY = 150, w = 200, h = 150;

ctx.fillStyle = '#d9a066';
ctx.fillRect(baseX, baseY, w, h);
ctx.strokeStyle = '#3a2c1a';
ctx.lineWidth = 3;
ctx.strokeRect(baseX, baseY, w, h);

ctx.beginPath();
ctx.moveTo(baseX - 20, baseY);
ctx.lineTo(baseX + w / 2, baseY - 90);
ctx.lineTo(baseX + w + 20, baseY);
ctx.closePath();
ctx.fillStyle = '#a83232';
ctx.fill();
ctx.stroke();

const doorW = 40, doorH = 70;
ctx.fillStyle = '#5b3a1e';
ctx.fillRect(baseX + w / 2 - doorW / 2, baseY + h - doorH, doorW, doorH);

function drawWindow(x, y, size) {
  ctx.fillStyle = '#bfe3f0';
  ctx.fillRect(x, y, size, size);
  ctx.strokeRect(x, y, size, size);
  ctx.beginPath();
  ctx.moveTo(x + size / 2, y);
  ctx.lineTo(x + size / 2, y + size);
  ctx.moveTo(x, y + size / 2);
  ctx.lineTo(x + size, y + size / 2);
  ctx.stroke();
}
drawWindow(baseX + 20, baseY + 30, 40);
drawWindow(baseX + w - 60, baseY + 30, 40);
`
      },
      {
        id: 'heart', tier: 'Advanced', title: '9. Bezier Heart',
        instructions: `Draw a filled crimson heart using bezierCurveTo. A heart is two symmetric
"lobes" that meet at a point at the bottom — build it from 4 bezier segments
inside a single path, then closePath and fill.`,
        hint: 'Two lobes, each a pair of bezier curves, meeting at a bottom point — think of each lobe as a backwards question mark.',
        starter: `// TODO: filled heart shape using bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
// Tip: translate(200, 100) first so you can work in easy local coordinates,
// then build the path with moveTo + four bezierCurveTo calls, closePath, fill.

ctx.save();
ctx.translate(200, 100);

// your path here

ctx.restore();
`,
        solution: `ctx.save();
ctx.translate(200, 100);

ctx.beginPath();
ctx.moveTo(75, 40);
ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
ctx.closePath();
ctx.fillStyle = 'crimson';
ctx.fill();

ctx.restore();
`
      },
      {
        id: 'spiral', tier: 'Advanced', title: '10. Parametric Spiral',
        instructions: `Draw an Archimedean spiral centered at (280, 200): for theta stepping from
0 to 8*Math.PI in increments of 0.05, compute r = a + b*theta (try a=2, b=6),
then x = cx + r*cos(theta), y = cy + r*sin(theta), connecting points with lineTo.`,
        hint: 'Convert polar coordinates (r, theta) to Cartesian (x, y) using cos/sin, and let r grow steadily with theta.',
        starter: `// TODO: Archimedean spiral, center (280,200), a=2, b=6, theta 0..8*Math.PI step 0.05
// r = a + b * theta
// x = cx + r * Math.cos(theta), y = cy + r * Math.sin(theta)
`,
        solution: `const cx = 280, cy = 200;
const a = 2, b = 6;
ctx.beginPath();
for (let theta = 0; theta <= 8 * Math.PI; theta += 0.05) {
  const r = a + b * theta;
  const x = cx + r * Math.cos(theta);
  const y = cy + r * Math.sin(theta);
  theta === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
}
ctx.strokeStyle = 'deepskyblue';
ctx.lineWidth = 2;
ctx.stroke();
`
      },
      {
        id: 'tree', tier: 'Advanced', title: '11. Recursive Fractal Tree',
        instructions: `Write a recursive function:
  drawBranch(x, y, len, angle, depth)
that draws a line segment from (x, y) of length "len" at "angle", then
recursively draws two shorter branches (angle ± ~0.45 rad, len * 0.72,
depth - 1) from its endpoint — stopping when depth === 0.

Start with: drawBranch(280, 380, 90, -Math.PI / 2, 10)`,
        hint: 'Every branch is defined by an endpoint you compute with cos/sin, and that endpoint becomes the start of two smaller recursive calls.',
        starter: `function drawBranch(x, y, len, angle, depth) {
  // TODO: base case — if depth === 0, return

  // TODO: compute endpoint (x2, y2) from x, y, len, angle
  //   x2 = x + Math.cos(angle) * len
  //   y2 = y + Math.sin(angle) * len

  // TODO: stroke a line from (x,y) to (x2,y2)

  // TODO: recurse twice from (x2,y2) with len * 0.72, depth - 1,
  //   angle - 0.45 and angle + 0.45
}

drawBranch(280, 380, 90, -Math.PI / 2, 10);
`,
        solution: `function drawBranch(x, y, len, angle, depth) {
  if (depth === 0) return;
  const x2 = x + Math.cos(angle) * len;
  const y2 = y + Math.sin(angle) * len;

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = depth < 3 ? '#5a3921' : \`hsl(\${100 + depth * 10}, 50%, 40%)\`;
  ctx.lineWidth = depth;
  ctx.stroke();

  const angleStep = 0.45;
  drawBranch(x2, y2, len * 0.72, angle - angleStep, depth - 1);
  drawBranch(x2, y2, len * 0.72, angle + angleStep, depth - 1);
}

drawBranch(280, 380, 90, -Math.PI / 2, 10);
`
      },
      {
        id: 'sierpinski', tier: 'Advanced', title: '12. Sierpinski Triangle',
        instructions: `Write a recursive function:
  sierpinski(p1, p2, p3, depth)
that fills the triangle p1-p2-p3 when depth === 0; otherwise computes the
midpoints of each side and recurses into the 3 corner sub-triangles
(skipping the middle one) with depth - 1.

Start with: sierpinski({x:280,y:40}, {x:60,y:380}, {x:500,y:380}, 5)`,
        hint: 'The three corner sub-triangles are formed using the midpoints of the original triangle’s sides — the middle triangle is simply never drawn.',
        starter: `function midpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function fillTriangle(p1, p2, p3) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.closePath();
  ctx.fillStyle = '#4fc3f7';
  ctx.fill();
}

function sierpinski(p1, p2, p3, depth) {
  // TODO: base case — if depth === 0, fillTriangle(p1, p2, p3) and return

  // TODO: compute m1 = midpoint(p1,p2), m2 = midpoint(p2,p3), m3 = midpoint(p3,p1)

  // TODO: recurse into the 3 corner triangles: (p1,m1,m3), (m1,p2,m2), (m3,m2,p3)
  //   each with depth - 1
}

sierpinski({ x: 280, y: 40 }, { x: 60, y: 380 }, { x: 500, y: 380 }, 5);
`,
        solution: `function midpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function fillTriangle(p1, p2, p3) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineTo(p3.x, p3.y);
  ctx.closePath();
  ctx.fillStyle = '#4fc3f7';
  ctx.fill();
}

function sierpinski(p1, p2, p3, depth) {
  if (depth === 0) {
    fillTriangle(p1, p2, p3);
    return;
  }
  const m1 = midpoint(p1, p2);
  const m2 = midpoint(p2, p3);
  const m3 = midpoint(p3, p1);

  sierpinski(p1, m1, m3, depth - 1);
  sierpinski(m1, p2, m2, depth - 1);
  sierpinski(m3, m2, p3, depth - 1);
}

sierpinski({ x: 280, y: 40 }, { x: 60, y: 380 }, { x: 500, y: 380 }, 5);
`
      },
    ];