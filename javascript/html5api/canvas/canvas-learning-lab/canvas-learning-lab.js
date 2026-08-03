(() => {
  // =====================================================================
  // Tabs
  // =====================================================================
  const tabs = [
    { id: 'coordinates', label: '1. Coordinates', innerHTML: `<div class="lead">
        Canvas uses a <strong>pixel coordinate system</strong> with its origin <strong>(0, 0)</strong> at the
        top-left corner. <strong>x</strong> increases to the right, <strong>y</strong> increases <em>downward</em>
        — the opposite of a typical math graph. Every drawing call (<code>fillRect</code>, <code>arc</code>,
        <code>lineTo</code>…) takes coordinates in this same space, unless you change it with a transform.
      </div>
      <div class="row-flex">
        <div class="card">
          <div style="font-weight:600; margin-bottom:8px;">Explore the grid</div>
          <div style="color:var(--muted); font-size:13px; margin-bottom:8px; max-width:480px;">
            Move your mouse over the canvas to read live coordinates. Click to drop a labeled point.
          </div>
          <canvas id="gridCanvas" width="560" height="360"></canvas>
          <div class="readout" id="gridReadout">x: —, y: —</div>
          <div class="btn-row"><button id="gridClear">Clear points</button></div>
        </div>
        <div class="card">
          <div style="font-weight:600; margin-bottom:8px;">Transforms compose in order</div>
          <div style="color:var(--muted); font-size:13px; margin-bottom:8px; max-width:480px;">
            <code>translate</code>, <code>rotate</code>, and <code>scale</code> don't move the shape directly —
            they move the coordinate system the shape is drawn into. Each button appends one more operation
            to the stack; watch how order changes the result.
          </div>
          <canvas id="xformCanvas" width="480" height="360"></canvas>
          <div class="btn-row">
            <button id="xTranslate">translate(60, 0)</button>
            <button id="xTranslateY">translate(0, 40)</button>
            <button id="xRotate">rotate(15°)</button>
            <button id="xScale">scale(1.15, 1.15)</button>
            <button id="xReset" class="primary">Reset</button>
          </div>
          <div class="log" id="xformLog">(no transforms applied — the square sits at its natural position)</div>
        </div>
      </div>` },
    { id: 'reference', label: '2. API Reference', innerHTML:  `
      <div class="ex-layout">
        <div class="ex-sidebar">
          <div class="progress-wrap">
            <div class="progress-bar-bg"><div class="progress-bar-fill" id="progressFill"></div></div>
            <div class="progress-label" id="progressLabel"></div>
          </div>
          <div id="exList"></div>
        </div>
        <div class="ex-main">
          <div class="title-row">
            <h2 id="exTitle"></h2>
            <span class="tier-tag" id="exTier"></span>
          </div>
          <div class="instructions" id="exInstructions"></div>
          <div class="hint-box" id="hintBox"></div>
          <div class="workspace">
            <div class="canvas-box"><canvas id="stage" width="560" height="400"></canvas></div>
            <div class="editor-box">
              <textarea id="editor" spellcheck="false"></textarea>
              <div class="btn-row">
                <button id="runBtn" class="primary">▶ Run</button>
                <button id="resetBtn">Reset starter</button>
                <button id="hintBtn">💡 Hint</button>
                <button id="solutionBtn">Show solution</button>
                <button id="clearBtn">Clear canvas</button>
              </div>
              <div class="status" id="status"></div>
              <label class="mark-complete">
                <input type="checkbox" id="completeCheck"> Mark this exercise complete
              </label>
            </div>
          </div>
        </div>
      </div>` },
    { id: 'exercises', label: '3. Exercises', innerHTML:  `
      <div class="ex-layout">
        <div class="ex-sidebar">
          <div class="progress-wrap">
            <div class="progress-bar-bg"><div class="progress-bar-fill" id="progressFill"></div></div>
            <div class="progress-label" id="progressLabel"></div>
          </div>
          <div id="exList"></div>
        </div>
        <div class="ex-main">
          <div class="title-row">
            <h2 id="exTitle"></h2>
            <span class="tier-tag" id="exTier"></span>
          </div>
          <div class="instructions" id="exInstructions"></div>
          <div class="hint-box" id="hintBox"></div>
          <div class="workspace">
            <div class="canvas-box"><canvas id="stage" width="560" height="400"></canvas></div>
            <div class="editor-box">
              <textarea id="editor" spellcheck="false"></textarea>
              <div class="btn-row">
                <button id="runBtn" class="primary">▶ Run</button>
                <button id="resetBtn">Reset starter</button>
                <button id="hintBtn">💡 Hint</button>
                <button id="solutionBtn">Show solution</button>
                <button id="clearBtn">Clear canvas</button>
              </div>
              <div class="status" id="status"></div>
              <label class="mark-complete">
                <input type="checkbox" id="completeCheck"> Mark this exercise complete
              </label>
            </div>
          </div>
        </div>
      </div>` },
  ];
  const tabsEl = document.getElementById('tabs');
  tabs.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.textContent = t.label;
    btn.addEventListener('click', () => activateTab(t.id));
    btn.dataset.tab = t.id;
    tabsEl.appendChild(btn);
  });

  function activateTab(id) {
    tabs.forEach(t => {
      document.getElementById('panel-' + t.id).classList.toggle('active', t.id === id);
      tabsEl.querySelector(`[data-tab="${t.id}"]`).classList.toggle('active', t.id === id);
    });
  }

  // =====================================================================
  // TAB 1 — Coordinates
  // =====================================================================
  (function buildCoordinatesTab() {
    const panel = document.getElementById('panel-coordinates');
    panel.innerHTML = tabs[0].innerHTML;

    // --- Grid explorer ---
    const gridCanvas = panel.querySelector('#gridCanvas');
    const gctx = gridCanvas.getContext('2d');
    const readout = panel.querySelector('#gridReadout');
    const step = 40;
    let points = [];

    function drawGrid() {
      const w = gridCanvas.width, h = gridCanvas.height;
      gctx.clearRect(0, 0, w, h);
      gctx.fillStyle = '#05070c';
      gctx.fillRect(0, 0, w, h);

      gctx.strokeStyle = 'rgba(255,255,255,0.08)';
      gctx.lineWidth = 1;
      gctx.font = '10px monospace';
      gctx.fillStyle = 'rgba(255,255,255,0.35)';

      for (let x = 0; x <= w; x += step) {
        gctx.beginPath();
        gctx.moveTo(x, 0);
        gctx.lineTo(x, h);
        gctx.stroke();
        if (x % (step * 2) === 0) gctx.fillText(x, x + 3, 12);
      }
      for (let y = 0; y <= h; y += step) {
        gctx.beginPath();
        gctx.moveTo(0, y);
        gctx.lineTo(w, y);
        gctx.stroke();
        if (y % (step * 2) === 0) gctx.fillText(y, 3, y + 11);
      }

      // origin marker
      gctx.fillStyle = '#5eb5ff';
      gctx.beginPath();
      gctx.arc(0, 0, 4, 0, Math.PI * 2);
      gctx.fill();
      gctx.fillText('(0,0) origin →', 8, 24);

      // plotted points
      for (const p of points) {
        gctx.fillStyle = '#ff6b81';
        gctx.beginPath();
        gctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        gctx.fill();
        gctx.fillStyle = '#e7e9ee';
        gctx.fillText(`(${p.x}, ${p.y})`, p.x + 8, p.y - 8);
      }
    }
    drawGrid();

    function gridPos(e) {
      const rect = gridCanvas.getBoundingClientRect();
      return { x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top) };
    }
    gridCanvas.addEventListener('mousemove', (e) => {
      const p = gridPos(e);
      readout.textContent = `x: ${p.x}, y: ${p.y}`;
    });
    gridCanvas.addEventListener('click', (e) => {
      points.push(gridPos(e));
      drawGrid();
    });
    panel.querySelector('#gridClear').addEventListener('click', () => { points = []; drawGrid(); });

    // --- Transform playground ---
    const xformCanvas = panel.querySelector('#xformCanvas');
    const xctx = xformCanvas.getContext('2d');
    const xformLog = panel.querySelector('#xformLog');
    let ops = [];

    function renderXform() {
      const w = xformCanvas.width, h = xformCanvas.height;
      xctx.setTransform(1, 0, 0, 1, 0, 0);
      xctx.clearRect(0, 0, w, h);
      xctx.fillStyle = '#05070c';
      xctx.fillRect(0, 0, w, h);

      // faint reference axes at canvas center
      xctx.strokeStyle = 'rgba(255,255,255,0.12)';
      xctx.beginPath();
      xctx.moveTo(w / 2, 0); xctx.lineTo(w / 2, h);
      xctx.moveTo(0, h / 2); xctx.lineTo(w, h / 2);
      xctx.stroke();

      xctx.save();
      xctx.translate(w / 2, h / 2); // move origin to the visual center for clarity
      for (const op of ops) {
        if (op.type === 'translate') xctx.translate(op.x, op.y);
        if (op.type === 'rotate') xctx.rotate(op.angle);
        if (op.type === 'scale') xctx.scale(op.sx, op.sy);
      }
      xctx.fillStyle = 'mediumseagreen';
      xctx.fillRect(-30, -30, 60, 60);
      xctx.strokeStyle = '#fff';
      xctx.lineWidth = 2;
      xctx.strokeRect(-30, -30, 60, 60);
      xctx.restore();

      xformLog.textContent = ops.length
        ? ops.map(o => o.label).join('\n')
        : '(no transforms applied — the square sits at its natural position)';
    }

    panel.querySelector('#xTranslate').addEventListener('click', () => {
      ops.push({ type: 'translate', x: 60, y: 0, label: 'ctx.translate(60, 0)' });
      renderXform();
    });
    panel.querySelector('#xTranslateY').addEventListener('click', () => {
      ops.push({ type: 'translate', x: 0, y: 40, label: 'ctx.translate(0, 40)' });
      renderXform();
    });
    panel.querySelector('#xRotate').addEventListener('click', () => {
      ops.push({ type: 'rotate', angle: Math.PI / 12, label: 'ctx.rotate(15° = 0.2618 rad)' });
      renderXform();
    });
    panel.querySelector('#xScale').addEventListener('click', () => {
      ops.push({ type: 'scale', sx: 1.15, sy: 1.15, label: 'ctx.scale(1.15, 1.15)' });
      renderXform();
    });
    panel.querySelector('#xReset').addEventListener('click', () => { ops = []; renderXform(); });

    renderXform();
  })();

  // =====================================================================
  // TAB 2 — API Reference
  // =====================================================================
  (function buildReferenceTab() {
    const panel = document.getElementById('panel-reference');

    // Shared helpers for building a live demo under each reference card.
    let activeStoppers = []; // cleanup for any running rAF loops
    function smallCanvas(container, w, h) {
      const canvas = document.createElement('canvas');
      canvas.width = w || 220;
      canvas.height = h || 130;
      canvas.className = 'ref-demo-canvas';
      container.appendChild(canvas);
      return canvas.getContext('2d');
    }
    function addButton(container, label, onClick) {
      const row = container.querySelector('.ref-demo-controls') || (() => {
        const r = document.createElement('div');
        r.className = 'ref-demo-controls';
        container.appendChild(r);
        return r;
      })();
      const btn = document.createElement('button');
      btn.textContent = label;
      btn.addEventListener('click', onClick);
      row.appendChild(btn);
      return btn;
    }
    function addLabel(container, text) {
      const div = document.createElement('div');
      div.className = 'ref-demo-readout';
      div.textContent = text;
      container.appendChild(div);
      return div;
    }

    const groups = [
      {
        name: 'Setup & Context',
        items: [
          { m: "canvas.getContext('2d')", d: 'Obtain the 2D drawing context from a <canvas> element — every drawing call goes through this object.', c: "const ctx = canvas.getContext('2d');",
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 90);
              ctx.fillStyle = '#1f2330';
              ctx.fillRect(0, 0, 220, 90);
              ctx.fillStyle = '#5eb5ff';
              ctx.font = '13px sans-serif';
              ctx.fillText('ctx is ready to draw', 14, 50);
            } },
          { m: 'canvas.width / canvas.height', d: 'Pixel dimensions of the drawing surface. Setting either one clears the canvas and resets its state.', c: 'canvas.width = 640;\ncanvas.height = 480;',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 120);
              const canvas = ctx.canvas;
              function drawCircle() {
                ctx.fillStyle = '#ff8a65';
                ctx.beginPath();
                ctx.arc(110, 60, 40, 0, Math.PI * 2);
                ctx.fill();
              }
              drawCircle();
              addButton(el, 'canvas.width = canvas.width (clears!)', () => { canvas.width = canvas.width; });
            } },
        ]
      },
      {
        name: 'Rectangles',
        items: [
          { m: 'fillRect(x, y, w, h)', d: 'Draw a filled rectangle using the current fillStyle.', c: "ctx.fillStyle = 'steelblue';\nctx.fillRect(20, 20, 100, 60);",
            demo: (el) => { const ctx = smallCanvas(el, 220, 100); ctx.fillStyle = 'steelblue'; ctx.fillRect(20, 20, 120, 60); } },
          { m: 'strokeRect(x, y, w, h)', d: 'Draw a rectangle outline using the current strokeStyle and lineWidth.', c: "ctx.strokeStyle = 'crimson';\nctx.strokeRect(20, 20, 100, 60);",
            demo: (el) => { const ctx = smallCanvas(el, 220, 100); ctx.strokeStyle = 'crimson'; ctx.lineWidth = 4; ctx.strokeRect(20, 20, 120, 60); } },
          { m: 'clearRect(x, y, w, h)', d: 'Erase pixels in a region back to transparent — the only built-in "eraser".', c: 'ctx.clearRect(0, 0, canvas.width, canvas.height);',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 120);
              ctx.canvas.style.background = 'repeating-conic-gradient(#2a2f3d 0% 25%, #12141b 0% 50%) 0 0/16px 16px';
              ctx.fillStyle = 'steelblue';
              ctx.fillRect(0, 0, 220, 120);
              addButton(el, 'clearRect(60, 30, 100, 60)', () => { ctx.clearRect(60, 30, 100, 60); });
            } },
        ]
      },
      {
        name: 'Paths & Lines',
        items: [
          { m: 'beginPath()', d: 'Start a new path, discarding any previously built (but not yet painted) sub-paths.', c: 'ctx.beginPath();',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 110);
              ctx.beginPath();
              ctx.arc(30, 90, 4, 0, Math.PI * 2);
              ctx.fillStyle = '#5eb5ff';
              ctx.fill();
              addLabel(el, 'A fresh path, started at (30, 90)');
            } },
          { m: 'moveTo(x, y)', d: 'Move the "pen" to a point without drawing — starts a new sub-path.', c: 'ctx.moveTo(10, 10);',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 110);
              ctx.fillStyle = '#5eb5ff';
              ctx.beginPath();
              ctx.arc(30, 90, 3, 0, Math.PI * 2);
              ctx.fill();
              addLabel(el, 'Pen moved to (30, 90) — nothing drawn by moveTo itself');
            } },
          { m: 'lineTo(x, y)', d: 'Draw a straight line from the current point to (x, y).', c: 'ctx.lineTo(100, 10);',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 110);
              ctx.beginPath();
              ctx.moveTo(30, 90);
              ctx.lineTo(170, 90);
              ctx.strokeStyle = '#5eb5ff';
              ctx.lineWidth = 3;
              ctx.stroke();
            } },
          { m: 'closePath()', d: 'Draw a straight line back to the start of the current sub-path.', c: 'ctx.closePath();',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 110);
              ctx.beginPath();
              ctx.moveTo(30, 90);
              ctx.lineTo(170, 90);
              ctx.lineTo(100, 20);
              ctx.closePath();
              ctx.strokeStyle = '#5eb5ff';
              ctx.lineWidth = 3;
              ctx.stroke();
            } },
          { m: 'fill() / stroke()', d: 'Paint the current path: fill() fills its interior, stroke() draws its outline.', c: 'ctx.fill();\nctx.stroke();',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 110);
              ctx.beginPath();
              ctx.moveTo(30, 90);
              ctx.lineTo(170, 90);
              ctx.lineTo(100, 20);
              ctx.closePath();
              ctx.fillStyle = 'seagreen';
              ctx.fill();
              ctx.strokeStyle = '#e7e9ee';
              ctx.lineWidth = 2;
              ctx.stroke();
            } },
        ]
      },
      {
        name: 'Curves & Arcs',
        items: [
          { m: 'arc(cx, cy, r, start, end, ccw)', d: 'Add a circular arc. Angle 0 is the 3 o’clock position; angles sweep clockwise by default.', c: 'ctx.arc(100, 100, 50, 0, Math.PI * 2);',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 130);
              ctx.beginPath();
              ctx.arc(110, 65, 45, 0, Math.PI * 2);
              ctx.fillStyle = 'orange';
              ctx.fill();
            } },
          { m: 'arcTo(x1, y1, x2, y2, radius)', d: 'Add an arc defined by two tangent lines and a radius — handy for rounded corners.', c: 'ctx.arcTo(50, 0, 50, 50, 10);',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 130);
              ctx.setLineDash([4, 4]);
              ctx.strokeStyle = 'rgba(255,255,255,0.3)';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(30, 100);
              ctx.lineTo(30, 30);
              ctx.lineTo(150, 30);
              ctx.stroke();
              ctx.setLineDash([]);
              ctx.strokeStyle = '#5eb5ff';
              ctx.lineWidth = 4;
              ctx.beginPath();
              ctx.moveTo(30, 100);
              ctx.lineTo(30, 60);
              ctx.arcTo(30, 30, 150, 30, 25);
              ctx.lineTo(150, 30);
              ctx.stroke();
            } },
          { m: 'quadraticCurveTo(cpx, cpy, x, y)', d: 'Add a curve with a single control point — good for simple bumps and leaves.', c: 'ctx.quadraticCurveTo(60, 0, 100, 50);',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 130);
              const p0 = [30, 100], cp = [110, 20], p1 = [190, 100];
              ctx.strokeStyle = 'rgba(255,255,255,0.35)';
              ctx.setLineDash([4, 4]);
              ctx.beginPath(); ctx.moveTo(p0[0], p0[1]); ctx.lineTo(cp[0], cp[1]); ctx.lineTo(p1[0], p1[1]); ctx.stroke();
              ctx.setLineDash([]);
              ctx.strokeStyle = '#5eb5ff';
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.moveTo(p0[0], p0[1]);
              ctx.quadraticCurveTo(cp[0], cp[1], p1[0], p1[1]);
              ctx.stroke();
              ctx.fillStyle = '#ff6b81';
              ctx.beginPath(); ctx.arc(cp[0], cp[1], 4, 0, Math.PI * 2); ctx.fill();
            } },
          { m: 'bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)', d: 'Add a cubic curve with two control points — the workhorse for organic shapes (hearts, waves, letters).', c: 'ctx.bezierCurveTo(20,0, 80,0, 100,50);',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 130);
              const p0 = [30, 100], cp1 = [50, 20], cp2 = [170, 20], p1 = [190, 100];
              ctx.strokeStyle = 'rgba(255,255,255,0.35)';
              ctx.setLineDash([4, 4]);
              ctx.beginPath();
              ctx.moveTo(p0[0], p0[1]); ctx.lineTo(cp1[0], cp1[1]);
              ctx.moveTo(p1[0], p1[1]); ctx.lineTo(cp2[0], cp2[1]);
              ctx.stroke();
              ctx.setLineDash([]);
              ctx.strokeStyle = '#5eb5ff';
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.moveTo(p0[0], p0[1]);
              ctx.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1], p1[0], p1[1]);
              ctx.stroke();
              ctx.fillStyle = '#ff6b81';
              [cp1, cp2].forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], 4, 0, Math.PI * 2); ctx.fill(); });
            } },
        ]
      },
      {
        name: 'Styles & Colors',
        items: [
          { m: 'fillStyle / strokeStyle', d: 'Accepts CSS color strings, gradients, or patterns — controls fill() and stroke() color respectively.', c: "ctx.fillStyle = 'rgba(255,0,0,0.5)';",
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 100);
              ctx.fillStyle = 'rgba(255,107,129,0.6)';
              ctx.fillRect(20, 20, 80, 60);
              ctx.strokeStyle = '#5eb5ff';
              ctx.lineWidth = 4;
              ctx.strokeRect(120, 20, 80, 60);
            } },
          { m: 'lineWidth', d: 'Thickness of stroked lines and shape outlines, in canvas pixels.', c: 'ctx.lineWidth = 4;',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 130);
              [2, 6, 12, 20].forEach((w, i) => {
                ctx.lineWidth = w;
                ctx.strokeStyle = '#5eb5ff';
                ctx.beginPath();
                ctx.moveTo(20, 20 + i * 28);
                ctx.lineTo(200, 20 + i * 28);
                ctx.stroke();
              });
            } },
          { m: 'lineCap / lineJoin', d: 'Shape of line endpoints ("butt"/"round"/"square") and corners ("miter"/"round"/"bevel").', c: "ctx.lineCap = 'round';\nctx.lineJoin = 'round';",
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 150);
              ['butt', 'round', 'square'].forEach((cap, i) => {
                ctx.lineCap = cap;
                ctx.lineWidth = 12;
                ctx.strokeStyle = '#5eb5ff';
                ctx.beginPath();
                ctx.moveTo(50, 16 + i * 24);
                ctx.lineTo(130, 16 + i * 24);
                ctx.stroke();
                ctx.fillStyle = '#9098ab';
                ctx.font = '10px sans-serif';
                ctx.fillText(cap, 140, 20 + i * 24);
              });
              ctx.lineJoin = 'round';
              ctx.lineWidth = 10;
              ctx.strokeStyle = '#ff8a65';
              ctx.beginPath();
              ctx.moveTo(30, 130);
              ctx.lineTo(55, 100);
              ctx.lineTo(80, 130);
              ctx.stroke();
              ctx.fillStyle = '#9098ab';
              ctx.fillText('round join', 90, 128);
            } },
          { m: 'globalAlpha', d: 'Opacity multiplier (0–1) applied to everything drawn afterward.', c: 'ctx.globalAlpha = 0.6;',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 130);
              ctx.fillStyle = '#5eb5ff';
              [1, 0.6, 0.3].forEach((a, i) => {
                ctx.globalAlpha = a;
                ctx.beginPath();
                ctx.arc(70 + i * 35, 65, 40, 0, Math.PI * 2);
                ctx.fill();
              });
              ctx.globalAlpha = 1;
            } },
          { m: 'createLinearGradient / createRadialGradient', d: 'Build a gradient object, add color stops, then assign it to fillStyle or strokeStyle.', c: "const g = ctx.createLinearGradient(0,0,200,0);\ng.addColorStop(0, 'red');\ng.addColorStop(1, 'blue');\nctx.fillStyle = g;",
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 120);
              const lg = ctx.createLinearGradient(10, 0, 110, 0);
              lg.addColorStop(0, '#ff6b81');
              lg.addColorStop(1, '#5eb5ff');
              ctx.fillStyle = lg;
              ctx.fillRect(10, 20, 100, 80);

              const rg = ctx.createRadialGradient(170, 60, 5, 170, 60, 45);
              rg.addColorStop(0, '#fff59d');
              rg.addColorStop(1, '#6fd08c');
              ctx.fillStyle = rg;
              ctx.beginPath();
              ctx.arc(170, 60, 45, 0, Math.PI * 2);
              ctx.fill();
            } },
        ]
      },
      {
        name: 'Text',
        items: [
          { m: 'font', d: 'CSS-style font shorthand ("bold 24px sans-serif") used by fillText/strokeText.', c: "ctx.font = 'bold 24px sans-serif';",
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 120);
              ctx.fillStyle = '#e7e9ee';
              ctx.font = '16px sans-serif';
              ctx.fillText('16px sans-serif', 10, 30);
              ctx.font = 'italic 16px serif';
              ctx.fillText('italic serif', 10, 65);
              ctx.font = 'bold 20px monospace';
              ctx.fillText('bold mono', 10, 100);
            } },
          { m: 'fillText(text, x, y) / strokeText', d: 'Draw filled or outlined text at a baseline position.', c: "ctx.fillText('Hello canvas', 20, 40);",
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 110);
              ctx.font = 'bold 28px sans-serif';
              ctx.fillStyle = '#5eb5ff';
              ctx.fillText('Canvas', 20, 50);
              ctx.strokeStyle = '#ff8a65';
              ctx.lineWidth = 1.5;
              ctx.strokeText('Canvas', 20, 90);
            } },
          { m: 'textAlign / textBaseline', d: 'Horizontal ("left"/"center"/"right") and vertical ("top"/"middle"/"alphabetic") anchor of drawn text relative to (x, y).', c: "ctx.textAlign = 'center';\nctx.textBaseline = 'middle';",
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 120);
              const x = 110, y = 60;
              ctx.strokeStyle = 'rgba(255,255,255,0.3)';
              ctx.setLineDash([3, 3]);
              ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 120); ctx.moveTo(0, y); ctx.lineTo(220, y); ctx.stroke();
              ctx.setLineDash([]);
              ctx.fillStyle = '#5eb5ff';
              ctx.font = '16px sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('centered', x, y);
            } },
        ]
      },
      {
        name: 'Transforms',
        items: [
          { m: 'translate(x, y)', d: 'Shift the coordinate system’s origin — everything drawn afterward is offset.', c: 'ctx.translate(100, 50);',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 130);
              ctx.strokeStyle = 'rgba(255,255,255,0.3)';
              ctx.strokeRect(10, 10, 40, 40);
              ctx.save();
              ctx.translate(120, 50);
              ctx.fillStyle = '#5eb5ff';
              ctx.fillRect(10, 10, 40, 40);
              ctx.restore();
            } },
          { m: 'rotate(angle)', d: 'Rotate the coordinate system around its current origin, in radians.', c: 'ctx.rotate(Math.PI / 4); // 45°',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 130);
              ctx.save();
              ctx.translate(110, 65);
              ctx.strokeStyle = 'rgba(255,255,255,0.3)';
              ctx.strokeRect(-25, -25, 50, 50);
              ctx.rotate(Math.PI / 6);
              ctx.fillStyle = '#ff8a65';
              ctx.fillRect(-25, -25, 50, 50);
              ctx.restore();
            } },
          { m: 'scale(sx, sy)', d: 'Stretch or shrink the coordinate system along each axis.', c: 'ctx.scale(2, 0.5);',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 130);
              ctx.strokeStyle = 'rgba(255,255,255,0.3)';
              ctx.strokeRect(20, 20, 40, 40);
              ctx.save();
              ctx.translate(100, 20);
              ctx.scale(2, 1.3);
              ctx.fillStyle = '#6fd08c';
              ctx.fillRect(0, 0, 40, 40);
              ctx.restore();
            } },
          { m: 'save() / restore()', d: 'Push/pop the entire drawing state (transform, styles, clip) — wrap temporary transforms in a save/restore pair.', c: 'ctx.save();\nctx.rotate(0.3);\n// draw rotated shape\nctx.restore();',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 120);
              ctx.save();
              ctx.translate(60, 60);
              ctx.rotate(Math.PI / 8);
              ctx.fillStyle = '#5eb5ff';
              ctx.fillRect(-25, -15, 50, 30);
              ctx.restore();
              ctx.fillStyle = '#ff8a65';
              ctx.fillRect(140, 45, 50, 30);
            } },
          { m: 'setTransform / resetTransform', d: 'Replace the current transform matrix directly, or reset it back to identity.', c: 'ctx.setTransform(1, 0, 0, 1, 0, 0);',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 130);
              ctx.setTransform(1, 0.2, -0.2, 1, 60, 20);
              ctx.fillStyle = '#5eb5ff';
              ctx.fillRect(0, 0, 60, 60);
              ctx.resetTransform();
              ctx.fillStyle = '#ff8a65';
              ctx.fillRect(130, 20, 60, 60);
            } },
        ]
      },
      {
        name: 'Compositing & Images',
        items: [
          { m: 'globalCompositeOperation', d: 'Controls how new pixels combine with existing ones — e.g. "lighter" for additive glow, "destination-out" for erasing.', c: "ctx.globalCompositeOperation = 'lighter';",
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 130);
              ctx.fillStyle = '#5eb5ff';
              ctx.beginPath(); ctx.arc(90, 65, 40, 0, Math.PI * 2); ctx.fill();
              ctx.globalCompositeOperation = 'lighter';
              ctx.fillStyle = '#ff8a65';
              ctx.beginPath(); ctx.arc(130, 65, 40, 0, Math.PI * 2); ctx.fill();
              ctx.globalCompositeOperation = 'source-over';
            } },
          { m: 'drawImage(img, x, y[, w, h])', d: 'Draw an image, video frame, or another canvas onto this canvas, optionally resizing it.', c: 'ctx.drawImage(myImage, 0, 0, 200, 150);',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 130);
              const off = document.createElement('canvas');
              off.width = 20; off.height = 20;
              const octx = off.getContext('2d');
              octx.fillStyle = '#1f2330'; octx.fillRect(0, 0, 20, 20);
              octx.fillStyle = '#5eb5ff'; octx.fillRect(0, 0, 10, 10); octx.fillRect(10, 10, 10, 10);
              ctx.drawImage(off, 20, 30); // 1:1, the original source image
              ctx.drawImage(off, 60, 20, 80, 80); // same source, scaled up 4x
            } },
        ]
      },
      {
        name: 'Pixel Data',
        items: [
          { m: 'getImageData(x, y, w, h)', d: 'Read raw RGBA pixel values back as a Uint8ClampedArray — the basis for custom filters.', c: 'const data = ctx.getImageData(0, 0, w, h);',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 90);
              ctx.fillStyle = '#ff6b81'; ctx.fillRect(0, 0, 60, 60);
              ctx.fillStyle = '#5eb5ff'; ctx.fillRect(60, 0, 60, 60);
              ctx.fillStyle = '#6fd08c'; ctx.fillRect(120, 0, 60, 60);
              const d1 = ctx.getImageData(30, 30, 1, 1).data;
              const d2 = ctx.getImageData(90, 30, 1, 1).data;
              const d3 = ctx.getImageData(150, 30, 1, 1).data;
              addLabel(el, `sampled → rgb(${d1[0]},${d1[1]},${d1[2]})  rgb(${d2[0]},${d2[1]},${d2[2]})  rgb(${d3[0]},${d3[1]},${d3[2]})`);
            } },
          { m: 'putImageData(imageData, x, y)', d: 'Write a previously read (and possibly modified) pixel buffer back to the canvas.', c: 'ctx.putImageData(data, 0, 0);',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 100);
              ctx.fillStyle = '#5eb5ff'; ctx.fillRect(0, 0, 110, 100);
              ctx.fillStyle = '#ff8a65'; ctx.fillRect(110, 0, 110, 100);
              const img = ctx.getImageData(0, 0, 110, 100);
              const d = img.data;
              for (let i = 0; i < d.length; i += 4) { d[i] = 255 - d[i]; d[i + 1] = 255 - d[i + 1]; d[i + 2] = 255 - d[i + 2]; }
              ctx.putImageData(img, 0, 0);
              addLabel(el, 'Left half re-written with putImageData after inverting its pixels');
            } },
        ]
      },
      {
        name: 'Animation',
        items: [
          { m: 'requestAnimationFrame(callback)', d: 'Schedule a callback to run before the next repaint — the standard way to drive a canvas animation loop.', c: 'function loop() {\n  update();\n  render();\n  requestAnimationFrame(loop);\n}\nrequestAnimationFrame(loop);',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 100);
              let x = 10, dir = 1, raf = null;
              function frame() {
                ctx.clearRect(0, 0, 220, 100);
                x += dir * 2;
                if (x > 190 || x < 10) dir *= -1;
                ctx.fillStyle = '#5eb5ff';
                ctx.beginPath(); ctx.arc(x, 50, 12, 0, Math.PI * 2); ctx.fill();
                raf = requestAnimationFrame(frame);
              }
              frame();
              activeStoppers.push(() => cancelAnimationFrame(raf));
            } },
          { m: 'cancelAnimationFrame(id)', d: 'Stop a previously scheduled animation frame using the id returned by requestAnimationFrame.', c: 'cancelAnimationFrame(rafId);',
            demo: (el) => {
              const ctx = smallCanvas(el, 220, 100);
              let angle = 0, raf = null;
              function frame() {
                ctx.clearRect(0, 0, 220, 100);
                angle += 0.06;
                ctx.save();
                ctx.translate(110, 50);
                ctx.rotate(angle);
                ctx.fillStyle = '#ff8a65';
                ctx.fillRect(-30, -6, 60, 12);
                ctx.restore();
                raf = requestAnimationFrame(frame);
              }
              frame();
              addButton(el, 'cancelAnimationFrame(id)', () => { if (raf !== null) { cancelAnimationFrame(raf); raf = null; } });
              activeStoppers.push(() => { if (raf !== null) cancelAnimationFrame(raf); });
            } },
        ]
      },
    ];

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <p style="color:var(--muted); font-size:12.5px; max-width:800px; margin:0 0 12px;">
        Each entry below has a small live canvas so you can see the actual result, not just the code.
      </p>
      <input type="text" class="ref-search" id="refSearch" placeholder="Search methods, e.g. 'gradient', 'arc', 'rotate'…">`;
    panel.appendChild(wrapper);

    const groupsContainer = document.createElement('div');
    panel.appendChild(groupsContainer);

    let demoObserver = null;

    function teardownDemos() {
      activeStoppers.forEach(stop => { try { stop(); } catch (e) { /* ignore */ } });
      activeStoppers = [];
      if (demoObserver) { demoObserver.disconnect(); demoObserver = null; }
    }

    function renderGroups(filterText) {
      teardownDemos();
      groupsContainer.innerHTML = '';
      const q = (filterText || '').toLowerCase().trim();
      let anyMatches = false;

      groups.forEach(group => {
        const matches = group.items.filter(item =>
          !q || item.m.toLowerCase().includes(q) || item.d.toLowerCase().includes(q)
        );
        if (matches.length === 0) return;
        anyMatches = true;

        const groupEl = document.createElement('div');
        groupEl.className = 'ref-group';
        const h3 = document.createElement('h3');
        h3.textContent = group.name;
        groupEl.appendChild(h3);

        const grid = document.createElement('div');
        grid.className = 'ref-grid';

        matches.forEach(item => {
          const card = document.createElement('div');
          card.className = 'ref-item';

          const h4 = document.createElement('h4');
          h4.textContent = item.m;
          const p = document.createElement('p');
          p.textContent = item.d;
          const pre = document.createElement('pre');
          const codeEl = document.createElement('code');
          codeEl.textContent = item.c;
          pre.appendChild(codeEl);

          card.appendChild(h4);
          card.appendChild(p);
          card.appendChild(pre);

          if (item.demo) {
            const demoEl = document.createElement('div');
            demoEl.className = 'ref-demo';
            demoEl.__refItem = item;
            demoEl.__built = false;
            card.appendChild(demoEl);
          }

          grid.appendChild(card);
        });

        groupEl.appendChild(grid);
        groupsContainer.appendChild(groupEl);
      });

      if (!anyMatches) {
        const p = document.createElement('p');
        p.style.color = 'var(--muted)';
        p.style.fontSize = '14px';
        p.textContent = 'No methods match that search.';
        groupsContainer.appendChild(p);
        return;
      }

      demoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.__built) {
            entry.target.__built = true;
            try {
              entry.target.__refItem.demo(entry.target);
            } catch (err) {
              entry.target.textContent = 'Demo failed to load: ' + err.message;
            }
            demoObserver.unobserve(entry.target);
          }
        });
      }, { root: null, rootMargin: '150px', threshold: 0.05 });

      groupsContainer.querySelectorAll('.ref-demo').forEach(el => demoObserver.observe(el));
    }
    renderGroups('');

    wrapper.querySelector('#refSearch').addEventListener('input', (e) => renderGroups(e.target.value));
  })();

  // =====================================================================
  // TAB 3 — Exercises (progressive figures, simple to advanced)
  // =====================================================================
  (function buildExercisesTab() {
    const panel = document.getElementById('panel-exercises');

    const exercises = exercises_data;

    // --- persisted progress (guarded — file:// or privacy modes may block storage) ---
    const STORAGE_KEY = 'canvas-learning-lab-progress';
    let completed = {};
    try {
      completed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (e) { completed = {}; }
    function saveProgress() {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(completed)); } catch (e) { /* ignore */ }
    }

    panel.innerHTML = tabs[2].innerHTML;

    const exList = panel.querySelector('#exList');
    const editor = panel.querySelector('#editor');
    const statusEl = panel.querySelector('#status');
    const canvas = panel.querySelector('#stage');
    const ctx = canvas.getContext('2d');
    const hintBox = panel.querySelector('#hintBox');
    const completeCheck = panel.querySelector('#completeCheck');

    let currentIndex = 0;
    const tiers = ['Beginner', 'Intermediate', 'Advanced'];

    function firstUncompletedIndex() {
      const idx = exercises.findIndex(ex => !completed[ex.id]);
      return idx === -1 ? null : idx;
    }

    function renderSidebar() {
      exList.innerHTML = '';
      const suggestedIdx = firstUncompletedIndex();
      tiers.forEach(tier => {
        const h = document.createElement('div');
        h.className = 'ex-tier-label';
        h.textContent = tier;
        exList.appendChild(h);
        exercises.forEach((ex, i) => {
          if (ex.tier !== tier) return;
          const btn = document.createElement('button');
          btn.className = 'ex-btn' + (i === currentIndex ? ' active' : '');
          const check = completed[ex.id] ? '✓' : '○';
          btn.innerHTML = `<span class="ex-check">${check}</span><span>${ex.title}</span>` +
            (i === suggestedIdx ? '<span class="ex-next-tag">next</span>' : '');
          btn.addEventListener('click', () => loadExercise(i));
          exList.appendChild(btn);
        });
      });
    }

    function renderProgress() {
      const total = exercises.length;
      const done = exercises.filter(ex => completed[ex.id]).length;
      panel.querySelector('#progressFill').style.width = (done / total * 100) + '%';
      panel.querySelector('#progressLabel').textContent = `${done} / ${total} exercises complete`;
    }

    function clearCanvas() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = '#05070c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function setStatus(msg, kind) {
      statusEl.textContent = msg;
      statusEl.className = 'status' + (kind ? ' ' + kind : '');
    }

    function loadExercise(i) {
      currentIndex = i;
      const ex = exercises[i];
      panel.querySelector('#exTitle').textContent = ex.title;
      panel.querySelector('#exTier').textContent = ex.tier;
      panel.querySelector('#exInstructions').textContent = ex.instructions;
      editor.value = ex.starter;
      hintBox.textContent = ex.hint;
      hintBox.classList.remove('show');
      completeCheck.checked = !!completed[ex.id];
      setStatus('');
      clearCanvas();
      renderSidebar();
    }

    function runCode() {
      clearCanvas();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      try {
        const fn = new Function('ctx', 'canvas', editor.value);
        fn(ctx, canvas);
        setStatus('Ran without errors.', 'ok');
      } catch (err) {
        setStatus('Error: ' + err.message, 'err');
      }
    }

    panel.querySelector('#runBtn').addEventListener('click', runCode);
    panel.querySelector('#resetBtn').addEventListener('click', () => {
      editor.value = exercises[currentIndex].starter;
      setStatus('');
    });
    panel.querySelector('#hintBtn').addEventListener('click', () => {
      hintBox.classList.toggle('show');
    });
    panel.querySelector('#solutionBtn').addEventListener('click', () => {
      editor.value = exercises[currentIndex].solution;
      setStatus('Solution loaded — click Run to see it.', 'ok');
    });
    panel.querySelector('#clearBtn').addEventListener('click', clearCanvas);
    completeCheck.addEventListener('change', () => {
      const ex = exercises[currentIndex];
      if (completeCheck.checked) completed[ex.id] = true;
      else delete completed[ex.id];
      saveProgress();
      renderProgress();
      renderSidebar();
    });

    renderProgress();
    loadExercise(0);
  })();

  activateTab('coordinates');
})();
