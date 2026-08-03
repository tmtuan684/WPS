const exercises_data = [
  {
    "id": "rects",
    "tier": "Beginner",
    "title": "1. Rectangles 101",
    "instructions": "Draw two rectangles:\n1) A filled steelblue rectangle at (50, 50), size 200×100.\n2) A stroked crimson rectangle at (300, 50), size 150×150, lineWidth 4.\n\nAPIs: fillStyle, fillRect(x, y, w, h), strokeStyle, lineWidth, strokeRect(x, y, w, h)",
    "hint": "fillRect and strokeRect both take (x, y, width, height) — set fillStyle/strokeStyle and lineWidth before calling them.",
    "starter": "// TODO 1: filled rectangle — steelblue, x=50 y=50 w=200 h=100\n\n\n// TODO 2: stroked rectangle — crimson, lineWidth=4, x=300 y=50 w=150 h=150\n",
    "solution": "ctx.fillStyle = 'steelblue';\nctx.fillRect(50, 50, 200, 100);\n\nctx.strokeStyle = 'crimson';\nctx.lineWidth = 4;\nctx.strokeRect(300, 50, 150, 150);\n"
  },
  {
    "id": "circles",
    "tier": "Beginner",
    "title": "2. Circles & Arcs",
    "instructions": "Draw:\n1) A filled orange circle, center (130, 150), radius 70.\n2) A stroked teal arc forming a dome (top half of a circle), center (380, 220),\n   radius 90, lineWidth 6.\n\nHint: arc(cx, cy, r, startAngle, endAngle). For the dome, go from Math.PI to Math.PI * 2.",
    "hint": "arc(cx, cy, r, startAngle, endAngle) sweeps clockwise from startAngle to endAngle; angle 0 is the 3 o’clock position.",
    "starter": "// TODO 1: filled circle — orange, center (130,150), radius 70\n\n\n// TODO 2: dome arc — teal, lineWidth 6, center (380,220), radius 90\n//   arc(cx, cy, r, Math.PI, Math.PI * 2)\n",
    "solution": "ctx.beginPath();\nctx.arc(130, 150, 70, 0, Math.PI * 2);\nctx.fillStyle = 'orange';\nctx.fill();\n\nctx.beginPath();\nctx.arc(380, 220, 90, Math.PI, Math.PI * 2);\nctx.strokeStyle = 'teal';\nctx.lineWidth = 6;\nctx.stroke();\n"
  },
  {
    "id": "triangle",
    "tier": "Beginner",
    "title": "3. Triangle via Path",
    "instructions": "Draw a filled seagreen triangle with vertices (150, 50), (50, 250), (250, 250)\nusing beginPath / moveTo / lineTo / closePath / fill.",
    "hint": "A path is just moveTo to the first point, lineTo for each additional point, then closePath to connect back to the start.",
    "starter": "// TODO: filled triangle, vertices (150,50) (50,250) (250,250), color seagreen\n",
    "solution": "ctx.beginPath();\nctx.moveTo(150, 50);\nctx.lineTo(50, 250);\nctx.lineTo(250, 250);\nctx.closePath();\nctx.fillStyle = 'seagreen';\nctx.fill();\n"
  },
  {
    "id": "star",
    "tier": "Beginner",
    "title": "4. Five-Pointed Star",
    "instructions": "Draw a filled gold 5-pointed star centered at (280, 180): outer radius 80,\ninner radius 32.\n\nHint: loop 5 times; each iteration place an outer point then an inner point,\nadvancing the angle by Math.PI / 5 each step, starting at angle -Math.PI / 2\n(straight up).",
    "hint": "Alternate between two radii as you sweep around the center — every other point should be pulled inward toward the middle.",
    "starter": "// TODO: 5-pointed star, center (280,180), outerR=80, innerR=32, color gold\n// hint:\n// const cx = 280, cy = 180, outerR = 80, innerR = 32, spikes = 5;\n// let rot = -Math.PI / 2;\n// const step = Math.PI / spikes;\n",
    "solution": "const cx = 280, cy = 180, outerR = 80, innerR = 32, spikes = 5;\nlet rot = -Math.PI / 2;\nconst step = Math.PI / spikes;\n\nctx.beginPath();\nctx.moveTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);\nfor (let i = 0; i < spikes; i++) {\n  rot += step;\n  ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);\n  rot += step;\n  ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);\n}\nctx.closePath();\nctx.fillStyle = 'gold';\nctx.fill();\nctx.strokeStyle = '#b8860b';\nctx.stroke();\n"
  },
  {
    "id": "checker",
    "tier": "Intermediate",
    "title": "5. Checkerboard",
    "instructions": "Draw an 8×8 checkerboard starting at (20, 20), each square 40×40.\nAlternate '#eee' and '#333' based on (row + col) % 2 using nested loops.",
    "hint": "Use (row + col) % 2 to decide which color goes in each cell — this is the classic checkerboard parity trick.",
    "starter": "// TODO: 8x8 checkerboard, top-left (20,20), square size 40\n// alternate '#eee' / '#333' based on (row + col) % 2\n",
    "solution": "const size = 40, cols = 8, rows = 8, startX = 20, startY = 20;\nfor (let row = 0; row < rows; row++) {\n  for (let col = 0; col < cols; col++) {\n    const isDark = (row + col) % 2 === 1;\n    ctx.fillStyle = isDark ? '#333' : '#eee';\n    ctx.fillRect(startX + col * size, startY + row * size, size, size);\n  }\n}\n"
  },
  {
    "id": "smiley",
    "tier": "Intermediate",
    "title": "6. Smiley Face",
    "instructions": "Compose a smiley from simple shapes:\n1) Face: filled yellow circle, center (280, 200), radius 120, dark-gold stroke.\n2) Eyes: two small filled black circles.\n3) Mouth: a stroked arc, bottom half of a circle centered at (280, 210) r=60,\n   lineWidth 8 (bottom half = angle 0 to Math.PI, clockwise).",
    "hint": "Layer three separate shapes on the same canvas — nothing stops you from calling beginPath() multiple times in one script.",
    "starter": "// TODO 1: face — filled circle, center (280,200), r=120, color '#ffd93d'\n\n\n// TODO 2: two eyes — small filled black circles, e.g. (235,170) and (325,170), r=12\n\n\n// TODO 3: mouth — stroked arc, center (280,210), r=60, angle 0 to Math.PI, lineWidth 8\n",
    "solution": "ctx.beginPath();\nctx.arc(280, 200, 120, 0, Math.PI * 2);\nctx.fillStyle = '#ffd93d';\nctx.fill();\nctx.strokeStyle = '#c9a227';\nctx.lineWidth = 4;\nctx.stroke();\n\nctx.fillStyle = '#2b2b2b';\nctx.beginPath();\nctx.arc(235, 170, 12, 0, Math.PI * 2);\nctx.fill();\nctx.beginPath();\nctx.arc(325, 170, 12, 0, Math.PI * 2);\nctx.fill();\n\nctx.beginPath();\nctx.arc(280, 210, 60, 0, Math.PI, false);\nctx.lineWidth = 8;\nctx.strokeStyle = '#2b2b2b';\nctx.stroke();\n"
  },
  {
    "id": "polygon",
    "tier": "Intermediate",
    "title": "7. Regular Polygon Generator",
    "instructions": "Write a reusable function:\n  drawPolygon(ctx, cx, cy, radius, sides, rotation)\nthat strokes a regular polygon with the given number of sides, then call it\ntwice: a hexagon at (150, 180) and an octagon at (400, 180), both radius 90.",
    "hint": "The angle between vertices of an n-sided polygon is 2π / n — loop from 0 to sides-1 and multiply.",
    "starter": "function drawPolygon(ctx, cx, cy, radius, sides, rotation = -Math.PI / 2) {\n  // TODO: loop \"sides\" times, computing points at angle\n  //   rotation + i * (2 * Math.PI / sides)\n  // and connect them into a closed path, then stroke.\n}\n\nctx.strokeStyle = 'mediumpurple';\nctx.lineWidth = 3;\ndrawPolygon(ctx, 150, 180, 90, 6);\ndrawPolygon(ctx, 400, 180, 90, 8);\n",
    "solution": "function drawPolygon(ctx, cx, cy, radius, sides, rotation = -Math.PI / 2) {\n  ctx.beginPath();\n  for (let i = 0; i < sides; i++) {\n    const angle = rotation + (i * 2 * Math.PI) / sides;\n    const x = cx + radius * Math.cos(angle);\n    const y = cy + radius * Math.sin(angle);\n    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);\n  }\n  ctx.closePath();\n  ctx.stroke();\n}\n\nctx.strokeStyle = 'mediumpurple';\nctx.lineWidth = 3;\ndrawPolygon(ctx, 150, 180, 90, 6);\ndrawPolygon(ctx, 400, 180, 90, 8);\n"
  },
  {
    "id": "house",
    "tier": "Intermediate",
    "title": "8. House Illustration",
    "instructions": "Compose a small house out of primitives:\n1) Body: filled rectangle, x=150 y=150 w=200 h=150.\n2) Roof: filled triangle sitting on top of the body, overhanging slightly on each side.\n3) Door: a smaller filled rectangle centered at the bottom of the body.\n4) Two windows: small filled squares, each with a stroked cross (two lines) for panes.",
    "hint": "Draw back-to-front: body first, then roof, then door and windows on top, so later shapes overlap earlier ones correctly.",
    "starter": "const baseX = 150, baseY = 150, w = 200, h = 150;\n\n// TODO 1: body — fillRect + strokeRect using baseX, baseY, w, h\n\n\n// TODO 2: roof — filled triangle above the body (overhang ~20px each side, apex ~90px above)\n\n\n// TODO 3: door — filled rectangle, centered horizontally, bottom-aligned to the body\n\n\n// TODO 4: windows — write a drawWindow(x, y, size) helper that fills a square\n//   and strokes a cross (vertical + horizontal line) through its middle,\n//   then call it twice\n",
    "solution": "const baseX = 150, baseY = 150, w = 200, h = 150;\n\nctx.fillStyle = '#d9a066';\nctx.fillRect(baseX, baseY, w, h);\nctx.strokeStyle = '#3a2c1a';\nctx.lineWidth = 3;\nctx.strokeRect(baseX, baseY, w, h);\n\nctx.beginPath();\nctx.moveTo(baseX - 20, baseY);\nctx.lineTo(baseX + w / 2, baseY - 90);\nctx.lineTo(baseX + w + 20, baseY);\nctx.closePath();\nctx.fillStyle = '#a83232';\nctx.fill();\nctx.stroke();\n\nconst doorW = 40, doorH = 70;\nctx.fillStyle = '#5b3a1e';\nctx.fillRect(baseX + w / 2 - doorW / 2, baseY + h - doorH, doorW, doorH);\n\nfunction drawWindow(x, y, size) {\n  ctx.fillStyle = '#bfe3f0';\n  ctx.fillRect(x, y, size, size);\n  ctx.strokeRect(x, y, size, size);\n  ctx.beginPath();\n  ctx.moveTo(x + size / 2, y);\n  ctx.lineTo(x + size / 2, y + size);\n  ctx.moveTo(x, y + size / 2);\n  ctx.lineTo(x + size, y + size / 2);\n  ctx.stroke();\n}\ndrawWindow(baseX + 20, baseY + 30, 40);\ndrawWindow(baseX + w - 60, baseY + 30, 40);\n"
  },
  {
    "id": "heart",
    "tier": "Advanced",
    "title": "9. Bezier Heart",
    "instructions": "Draw a filled crimson heart using bezierCurveTo. A heart is two symmetric\n\"lobes\" that meet at a point at the bottom — build it from 4 bezier segments\ninside a single path, then closePath and fill.",
    "hint": "Two lobes, each a pair of bezier curves, meeting at a bottom point — think of each lobe as a backwards question mark.",
    "starter": "// TODO: filled heart shape using bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)\n// Tip: translate(200, 100) first so you can work in easy local coordinates,\n// then build the path with moveTo + four bezierCurveTo calls, closePath, fill.\n\nctx.save();\nctx.translate(200, 100);\n\n// your path here\n\nctx.restore();\n",
    "solution": "ctx.save();\nctx.translate(200, 100);\n\nctx.beginPath();\nctx.moveTo(75, 40);\nctx.bezierCurveTo(75, 37, 70, 25, 50, 25);\nctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);\nctx.bezierCurveTo(20, 80, 40, 102, 75, 120);\nctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);\nctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);\nctx.bezierCurveTo(85, 25, 75, 37, 75, 40);\nctx.closePath();\nctx.fillStyle = 'crimson';\nctx.fill();\n\nctx.restore();\n"
  },
  {
    "id": "spiral",
    "tier": "Advanced",
    "title": "10. Parametric Spiral",
    "instructions": "Draw an Archimedean spiral centered at (280, 200): for theta stepping from\n0 to 8*Math.PI in increments of 0.05, compute r = a + b*theta (try a=2, b=6),\nthen x = cx + r*cos(theta), y = cy + r*sin(theta), connecting points with lineTo.",
    "hint": "Convert polar coordinates (r, theta) to Cartesian (x, y) using cos/sin, and let r grow steadily with theta.",
    "starter": "// TODO: Archimedean spiral, center (280,200), a=2, b=6, theta 0..8*Math.PI step 0.05\n// r = a + b * theta\n// x = cx + r * Math.cos(theta), y = cy + r * Math.sin(theta)\n",
    "solution": "const cx = 280, cy = 200;\nconst a = 2, b = 6;\nctx.beginPath();\nfor (let theta = 0; theta <= 8 * Math.PI; theta += 0.05) {\n  const r = a + b * theta;\n  const x = cx + r * Math.cos(theta);\n  const y = cy + r * Math.sin(theta);\n  theta === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);\n}\nctx.strokeStyle = 'deepskyblue';\nctx.lineWidth = 2;\nctx.stroke();\n"
  },
  {
    "id": "tree",
    "tier": "Advanced",
    "title": "11. Recursive Fractal Tree",
    "instructions": "Write a recursive function:\n  drawBranch(x, y, len, angle, depth)\nthat draws a line segment from (x, y) of length \"len\" at \"angle\", then\nrecursively draws two shorter branches (angle ± ~0.45 rad, len * 0.72,\ndepth - 1) from its endpoint — stopping when depth === 0.\n\nStart with: drawBranch(280, 380, 90, -Math.PI / 2, 10)",
    "hint": "Every branch is defined by an endpoint you compute with cos/sin, and that endpoint becomes the start of two smaller recursive calls.",
    "starter": "function drawBranch(x, y, len, angle, depth) {\n  // TODO: base case — if depth === 0, return\n\n  // TODO: compute endpoint (x2, y2) from x, y, len, angle\n  //   x2 = x + Math.cos(angle) * len\n  //   y2 = y + Math.sin(angle) * len\n\n  // TODO: stroke a line from (x,y) to (x2,y2)\n\n  // TODO: recurse twice from (x2,y2) with len * 0.72, depth - 1,\n  //   angle - 0.45 and angle + 0.45\n}\n\ndrawBranch(280, 380, 90, -Math.PI / 2, 10);\n",
    "solution": "function drawBranch(x, y, len, angle, depth) {\n  if (depth === 0) return;\n  const x2 = x + Math.cos(angle) * len;\n  const y2 = y + Math.sin(angle) * len;\n\n  ctx.beginPath();\n  ctx.moveTo(x, y);\n  ctx.lineTo(x2, y2);\n  ctx.strokeStyle = depth < 3 ? '#5a3921' : `hsl(${100 + depth * 10}, 50%, 40%)`;\n  ctx.lineWidth = depth;\n  ctx.stroke();\n\n  const angleStep = 0.45;\n  drawBranch(x2, y2, len * 0.72, angle - angleStep, depth - 1);\n  drawBranch(x2, y2, len * 0.72, angle + angleStep, depth - 1);\n}\n\ndrawBranch(280, 380, 90, -Math.PI / 2, 10);\n"
  },
  {
    "id": "sierpinski",
    "tier": "Advanced",
    "title": "12. Sierpinski Triangle",
    "instructions": "Write a recursive function:\n  sierpinski(p1, p2, p3, depth)\nthat fills the triangle p1-p2-p3 when depth === 0; otherwise computes the\nmidpoints of each side and recurses into the 3 corner sub-triangles\n(skipping the middle one) with depth - 1.\n\nStart with: sierpinski({x:280,y:40}, {x:60,y:380}, {x:500,y:380}, 5)",
    "hint": "The three corner sub-triangles are formed using the midpoints of the original triangle’s sides — the middle triangle is simply never drawn.",
    "starter": "function midpoint(a, b) {\n  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };\n}\n\nfunction fillTriangle(p1, p2, p3) {\n  ctx.beginPath();\n  ctx.moveTo(p1.x, p1.y);\n  ctx.lineTo(p2.x, p2.y);\n  ctx.lineTo(p3.x, p3.y);\n  ctx.closePath();\n  ctx.fillStyle = '#4fc3f7';\n  ctx.fill();\n}\n\nfunction sierpinski(p1, p2, p3, depth) {\n  // TODO: base case — if depth === 0, fillTriangle(p1, p2, p3) and return\n\n  // TODO: compute m1 = midpoint(p1,p2), m2 = midpoint(p2,p3), m3 = midpoint(p3,p1)\n\n  // TODO: recurse into the 3 corner triangles: (p1,m1,m3), (m1,p2,m2), (m3,m2,p3)\n  //   each with depth - 1\n}\n\nsierpinski({ x: 280, y: 40 }, { x: 60, y: 380 }, { x: 500, y: 380 }, 5);\n",
    "solution": "function midpoint(a, b) {\n  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };\n}\n\nfunction fillTriangle(p1, p2, p3) {\n  ctx.beginPath();\n  ctx.moveTo(p1.x, p1.y);\n  ctx.lineTo(p2.x, p2.y);\n  ctx.lineTo(p3.x, p3.y);\n  ctx.closePath();\n  ctx.fillStyle = '#4fc3f7';\n  ctx.fill();\n}\n\nfunction sierpinski(p1, p2, p3, depth) {\n  if (depth === 0) {\n    fillTriangle(p1, p2, p3);\n    return;\n  }\n  const m1 = midpoint(p1, p2);\n  const m2 = midpoint(p2, p3);\n  const m3 = midpoint(p3, p1);\n\n  sierpinski(p1, m1, m3, depth - 1);\n  sierpinski(m1, p2, m2, depth - 1);\n  sierpinski(m3, m2, p3, depth - 1);\n}\n\nsierpinski({ x: 280, y: 40 }, { x: 60, y: 380 }, { x: 500, y: 380 }, 5);\n"
  }
]