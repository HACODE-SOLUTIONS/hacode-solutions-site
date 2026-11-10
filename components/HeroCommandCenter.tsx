"use client";

import { useEffect, useRef } from "react";

/**
 * Hero portrait of the pipeline.
 * Three glass cubes sit on an isometric triangle: Intake, AI processing, Delivery.
 * Belts run the triangle edges. A document appears at intake, is processed at AI,
 * lands in the green tray, fades, and the loop starts again.
 * Cube tops stay blank. Labels sit above the cubes. There are no people.
 */

const ARRIVE = 480;
const DELIVER = 700;
const FADE = 420;
const STEP_MS = new Float32Array([440, 1000, 1160, 1000]);
const COS = Math.cos(Math.PI / 6);
const SIN = Math.sin(Math.PI / 6);
const PATH_N = 96;
const TAU = Math.PI * 2;
const ST_N = 3;
const ST_WIDE = ["Intake", "AI processing", "Delivery"];
const ST_TALL = ["Intake", "AI", "Delivery"];
const GLOW_COLORS = ["#8B5CF6", "#F5C16C", "#7DDCB0"];
const DOC_COLORS = ["#8a8478", "#7c6bb5", "#2f9d6b"];
const BG = "#0A0A0B";

interface Doc {
  dead: boolean;
  phase: "arrive" | "run" | "deliver" | "fade";
  step: number;
  left: number;
  dur: number;
  u: number;
  u0: number;
  u1: number;
  visual: number;
}

interface Station {
  sx: number;
  sy: number;
  lx: number;
  ly: number;
  heat: number;
  want: number;
  mode: number;
  wantMode: number;
}

function createDoc(): Doc {
  return {
    dead: true,
    phase: "run",
    step: 0,
    left: 1,
    dur: 1,
    u: 0,
    u0: 0,
    u1: 0,
    visual: 0,
  };
}

function createStation(): Station {
  return {
    sx: 0,
    sy: 0,
    lx: 0,
    ly: 0,
    heat: 0,
    want: 0,
    mode: 0,
    wantMode: 0,
  };
}

export default function HeroCommandCenter() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const stage: HTMLDivElement = host;
    const surface: HTMLCanvasElement = canvas;
    const ctxOrNull = surface.getContext("2d", { alpha: false });
    if (!ctxOrNull) return;
    const ctx = ctxOrNull;

    let disposed = false;
    let looping = false;
    let raf = 0;
    let onScreen = true;
    let hidden = document.hidden;
    let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const stations: Station[] = [createStation(), createStation(), createStation()];
    const pool: Doc[] = [];
    for (let i = 0; i < 6; i++) pool.push(createDoc());
    const docs: Doc[] = new Array(6);
    let docCount = 0;

    let cssW = 0;
    let cssH = 0;
    let dpr = 1;
    let unit = 40;
    let originX = 0;
    let originY = 0;
    let short = false;
    let viewDirty = true;
    let builtCache = false;
    let layoutThisFrame = false;
    let fontLabel = "600 13px Inter, sans-serif";
    const fontFamily =
      getComputedStyle(document.body).fontFamily || "Inter, sans-serif";

    const stationU = new Float32Array(ST_N);
    const PATH = new Float32Array(PATH_N * 2);
    const beltGx = new Float32Array(ST_N);
    const beltGy = new Float32Array(ST_N);
    const stGx = new Float32Array(ST_N);
    const stGy = new Float32Array(ST_N);
    const inX = new Float32Array(ST_N);
    const inY = new Float32Array(ST_N);
    const outX = new Float32Array(ST_N);
    const outY = new Float32Array(ST_N);
    const px3 = new Float32Array(ST_N);
    const py3 = new Float32Array(ST_N);
    const pl3 = new Float32Array(ST_N);
    const C = new Float32Array(16);
    const TOP = new Float32Array(ST_N * 8);
    const EX = new Float32Array(6);
    const EY = new Float32Array(6);
    const EID = new Int8Array(6);
    const order = new Int8Array(6);
    const cubeOrder = new Int8Array([1, 0, 2]);

    let lipX = 0;
    let lipY = 0;
    let lipW = 1.08;
    let lipD = 0.9;
    let trayX = 0;
    let trayY = 0;
    let trayW = 1.08;
    let trayD = 0.9;
    const slabH = 0.09;
    let trayScrX = 0;
    let trayScrY = 0;
    let spawnLeft = 0.2;
    let BOX = 1.24;
    let BOXH = 1.04;
    let scrX = 0;
    let scrY = 0;
    let dashPhase = 0;
    let lastNow = 0;
    let frameIndex = 0;

    const workRing = new Float64Array(120);
    let workCount = 0;
    let workIdx = 0;
    let workSum = 0;
    let workAvg = 0;
    let workMax = 0;

    let floorCache: HTMLCanvasElement | null = null;
    let floorCtx: CanvasRenderingContext2D | null = null;
    const docSprites: HTMLCanvasElement[] = new Array(3);
    const glowSprites: HTMLCanvasElement[] = new Array(3);

    function project(
      gx: number,
      gy: number,
      gz: number,
      into: Float32Array,
      i: number,
    ) {
      into[i] = originX + (gx - gy) * COS * unit;
      into[i + 1] = originY + (gx + gy) * SIN * unit - gz * unit;
    }

    function projectXY(gx: number, gy: number, gz: number) {
      scrX = originX + (gx - gy) * COS * unit;
      scrY = originY + (gx + gy) * SIN * unit - gz * unit;
    }

    function gridX(sx: number, sy: number) {
      return (sy / SIN + sx / COS) * 0.5;
    }

    function gridY(sx: number, sy: number) {
      return (sy / SIN - sx / COS) * 0.5;
    }

    function pathPoint(u: number) {
      let t = u;
      if (t < 0) t = 0;
      else if (t > 1) t = 1;
      let f = t * (PATH_N - 1);
      let i = f | 0;
      let frac = f - i;
      if (i >= PATH_N - 1) {
        i = PATH_N - 2;
        frac = 1;
      }
      const j = i * 2;
      const k = j + 2;
      scrX = PATH[j] + (PATH[k] - PATH[j]) * frac;
      scrY = PATH[j + 1] + (PATH[k + 1] - PATH[j + 1]) * frac;
    }

    function clamp01(t: number) {
      if (t < 0) return 0;
      if (t > 1) return 1;
      return t;
    }

    function smooth(t: number) {
      const x = clamp01(t);
      return x * x * (3 - 2 * x);
    }

    function trace(g: CanvasRenderingContext2D, o: number) {
      g.beginPath();
      g.moveTo(C[o], C[o + 1]);
      g.lineTo(C[o + 2], C[o + 3]);
      g.lineTo(C[o + 4], C[o + 5]);
      g.lineTo(C[o + 6], C[o + 7]);
      g.closePath();
    }

    function roundRect(
      g: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number,
    ) {
      g.beginPath();
      g.moveTo(x + r, y);
      g.arcTo(x + w, y, x + w, y + h, r);
      g.arcTo(x + w, y + h, x, y + h, r);
      g.arcTo(x, y + h, x, y, r);
      g.arcTo(x, y, x + w, y, r);
      g.closePath();
    }

    function fillGrid() {
      BOX = 1.24;
      BOXH = 1.04;
      const side = 4.7;
      const h = side * Math.sqrt(3) * 0.5;
      const nsx = [-side * 0.5, 0, side * 0.5];
      const nsy = [h, 0, h];
      for (let i = 0; i < ST_N; i++) {
        beltGx[i] = gridX(nsx[i], nsy[i]);
        beltGy[i] = gridY(nsx[i], nsy[i]);
      }

      const csy = h * (2 / 3);
      const lift = 1.02;
      const nudge = 0.14;
      for (let i = 0; i < ST_N; i++) {
        const dx = nsx[i];
        const dy = nsy[i] - csy;
        const len = Math.hypot(dx, dy) || 1;
        const ox = dx / len;
        const up = i === 1 ? lift + 0.16 : lift;
        const csx = nsx[i] + ox * nudge;
        const cubeSy = nsy[i] - up;
        stGx[i] = gridX(csx, cubeSy) - BOX * 0.5;
        stGy[i] = gridY(csx, cubeSy) - BOX * 0.5;
      }

      const extend = 0.92;
      const backX = -0.5;
      const backY = Math.sqrt(3) * 0.5;
      lipW = 1.12;
      lipD = 0.94;
      trayW = 1.12;
      trayD = 0.94;
      const lipAt = placeOrigin(
        nsx[0] + backX * extend,
        nsy[0] + backY * extend,
        lipW,
        lipD,
      );
      lipX = lipAt[0];
      lipY = lipAt[1];
      const trayAt = placeOrigin(
        nsx[2] - backX * extend,
        nsy[2] + backY * extend,
        trayW,
        trayD,
      );
      trayX = trayAt[0];
      trayY = trayAt[1];

      const hw = 0.38;
      const cap = hw * 1.85;
      for (let i = 0; i < ST_N; i++) {
        const i0 = (i + ST_N - 1) % ST_N;
        const i2 = (i + 1) % ST_N;
        const d1x = beltGx[i] - beltGx[i0];
        const d1y = beltGy[i] - beltGy[i0];
        const d2x = beltGx[i2] - beltGx[i];
        const d2y = beltGy[i2] - beltGy[i];
        const l1 = Math.hypot(d1x, d1y) || 1;
        const l2 = Math.hypot(d2x, d2y) || 1;
        const n1x = -d1y / l1;
        const n1y = d1x / l1;
        const n2x = -d2y / l2;
        const n2y = d2x / l2;
        let bx = n1x + n2x;
        let by = n1y + n2y;
        let bl = Math.hypot(bx, by);
        if (bl < 1e-4) {
          bx = n1x;
          by = n1y;
          bl = 1;
        }
        bx /= bl;
        by /= bl;
        const denom = bx * n1x + by * n1y;
        let m = hw / (Math.abs(denom) < 0.22 ? (denom < 0 ? -0.22 : 0.22) : denom);
        if (m > cap) m = cap;
        else if (m < -cap) m = -cap;
        inX[i] = beltGx[i] + bx * m;
        inY[i] = beltGy[i] + by * m;
        outX[i] = beltGx[i] - bx * m;
        outY[i] = beltGy[i] - by * m;
      }
    }

    function placeOrigin(sx: number, sy: number, w: number, d: number) {
      const gx = gridX(sx, sy);
      const gy = gridY(sx, sy);
      return [gx - w * 0.5, gy - d * 0.5];
    }

    function paintStation(g: CanvasRenderingContext2D, s: number) {
      const x = stGx[s];
      const y = stGy[s];
      const w = BOX;
      const d = BOX;
      const h = BOXH;
      project(x, y, 0, C, 0);
      project(x + w, y, 0, C, 2);
      project(x + w, y + d, 0, C, 4);
      project(x, y + d, 0, C, 6);
      project(x, y, h, C, 8);
      project(x + w, y, h, C, 10);
      project(x + w, y + d, h, C, 12);
      project(x, y + d, h, C, 14);
      const base = s * 8;
      TOP[base] = C[8];
      TOP[base + 1] = C[9];
      TOP[base + 2] = C[10];
      TOP[base + 3] = C[11];
      TOP[base + 4] = C[12];
      TOP[base + 5] = C[13];
      TOP[base + 6] = C[14];
      TOP[base + 7] = C[15];
      stations[s].sx = (C[8] + C[10] + C[12] + C[14]) * 0.25;
      stations[s].sy = (C[9] + C[11] + C[13] + C[15]) * 0.25;
      g.fillStyle = "rgba(42,32,68,0.96)";
      g.beginPath();
      g.moveTo(C[2], C[3]);
      g.lineTo(C[4], C[5]);
      g.lineTo(C[12], C[13]);
      g.lineTo(C[10], C[11]);
      g.closePath();
      g.fill();
      g.fillStyle = "rgba(64,48,108,0.94)";
      g.beginPath();
      g.moveTo(C[4], C[5]);
      g.lineTo(C[6], C[7]);
      g.lineTo(C[14], C[15]);
      g.lineTo(C[12], C[13]);
      g.closePath();
      g.fill();
      const grad = g.createLinearGradient(C[8], C[9], C[12], C[13]);
      grad.addColorStop(0, "rgba(255,255,255,0.38)");
      grad.addColorStop(0.28, "rgba(198,184,255,0.2)");
      grad.addColorStop(1, "rgba(70,52,120,0.18)");
      g.fillStyle = grad;
      g.beginPath();
      g.moveTo(C[8], C[9]);
      g.lineTo(C[10], C[11]);
      g.lineTo(C[12], C[13]);
      g.lineTo(C[14], C[15]);
      g.closePath();
      g.fill();
      g.strokeStyle = "rgba(232,224,255,0.62)";
      g.lineWidth = 1.35;
      g.stroke();
      g.beginPath();
      g.moveTo(C[2], C[3]);
      g.lineTo(C[4], C[5]);
      g.lineTo(C[12], C[13]);
      g.lineTo(C[10], C[11]);
      g.closePath();
      g.moveTo(C[4], C[5]);
      g.lineTo(C[6], C[7]);
      g.lineTo(C[14], C[15]);
      g.lineTo(C[12], C[13]);
      g.closePath();
      g.strokeStyle = "rgba(214,204,255,0.35)";
      g.stroke();
    }

    function paintSlab(
      g: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      d: number,
      h: number,
      top: string,
    ) {
      project(x, y, 0, C, 0);
      project(x + w, y, 0, C, 2);
      project(x + w, y + d, 0, C, 4);
      project(x, y + d, 0, C, 6);
      project(x, y, h, C, 8);
      project(x + w, y, h, C, 10);
      project(x + w, y + d, h, C, 12);
      project(x, y + d, h, C, 14);
      g.fillStyle = "rgba(32,26,52,0.96)";
      g.beginPath();
      g.moveTo(C[2], C[3]);
      g.lineTo(C[4], C[5]);
      g.lineTo(C[12], C[13]);
      g.lineTo(C[10], C[11]);
      g.closePath();
      g.fill();
      g.fillStyle = "rgba(54,42,88,0.94)";
      g.beginPath();
      g.moveTo(C[4], C[5]);
      g.lineTo(C[6], C[7]);
      g.lineTo(C[14], C[15]);
      g.lineTo(C[12], C[13]);
      g.closePath();
      g.fill();
      g.fillStyle = top;
      g.beginPath();
      g.moveTo(C[8], C[9]);
      g.lineTo(C[10], C[11]);
      g.lineTo(C[12], C[13]);
      g.lineTo(C[14], C[15]);
      g.closePath();
      g.fill();
      g.strokeStyle = "rgba(226,214,255,0.48)";
      g.lineWidth = 1.25;
      g.stroke();
    }

    function paintPadGlow(
      g: CanvasRenderingContext2D,
      gx: number,
      gy: number,
      rgb: string,
    ) {
      projectXY(gx, gy, slabH);
      const glow = g.createRadialGradient(
        scrX,
        scrY,
        unit * 0.08,
        scrX,
        scrY,
        unit * 1.35,
      );
      glow.addColorStop(0, "rgba(" + rgb + ",0.4)");
      glow.addColorStop(1, "rgba(" + rgb + ",0)");
      g.fillStyle = glow;
      g.beginPath();
      g.arc(scrX, scrY, unit * 1.35, 0, TAU);
      g.fill();
    }

    function paintBelt(g: CanvasRenderingContext2D, i: number, j: number) {
      project(outX[i], outY[i], 0.03, C, 0);
      project(outX[j], outY[j], 0.03, C, 2);
      project(inX[j], inY[j], 0.03, C, 4);
      project(inX[i], inY[i], 0.03, C, 6);
      g.fillStyle = "#1a1526";
      trace(g, 0);
      g.fill();
      g.strokeStyle = "rgba(196,181,253,0.28)";
      g.lineWidth = 1;
      g.stroke();
      project(outX[i], outY[i], 0.11, C, 0);
      project(outX[j], outY[j], 0.11, C, 2);
      project(inX[j], inY[j], 0.11, C, 4);
      project(inX[i], inY[i], 0.11, C, 6);
      g.fillStyle = "#241c33";
      trace(g, 0);
      g.fill();
      g.strokeStyle = "rgba(226,214,255,0.35)";
      g.lineWidth = 1.25;
      g.stroke();
    }

    function tileNear(px: number, py: number) {
      const x0 = beltGx[0];
      const y0 = beltGy[0];
      const x1 = beltGx[1];
      const y1 = beltGy[1];
      const x2 = beltGx[2];
      const y2 = beltGy[2];
      const d = (y1 - y2) * (x0 - x2) + (x2 - x1) * (y0 - y2);
      const inv = 1 / (d || 1);
      const a = ((y1 - y2) * (px - x2) + (x2 - x1) * (py - y2)) * inv;
      const b = ((y2 - y0) * (px - x2) + (x0 - x2) * (py - y2)) * inv;
      const c = 1 - a - b;
      if (a >= -0.04 && b >= -0.04 && c >= -0.04) return true;
      if (segNear(px, py, x0, y0, x1, y1)) return true;
      if (segNear(px, py, x1, y1, x2, y2)) return true;
      return segNear(px, py, x2, y2, x0, y0);
    }

    function segNear(
      px: number,
      py: number,
      ax: number,
      ay: number,
      bx: number,
      by: number,
    ) {
      const dx = bx - ax;
      const dy = by - ay;
      const l2 = dx * dx + dy * dy || 1;
      let t = ((px - ax) * dx + (py - ay) * dy) / l2;
      if (t < 0) t = 0;
      else if (t > 1) t = 1;
      const qx = ax + dx * t;
      const qy = ay + dy * t;
      return (px - qx) * (px - qx) + (py - qy) * (py - qy) < 1.6;
    }

    function bake(w: number, h: number, ratio: number) {
      const bw = Math.max(1, Math.round(w * ratio));
      const bh = Math.max(1, Math.round(h * ratio));
      if (!floorCache) {
        floorCache = document.createElement("canvas");
        floorCtx = floorCache.getContext("2d");
      }
      if (!floorCtx || !floorCache) return;
      if (floorCache.width !== bw || floorCache.height !== bh) {
        floorCache.width = bw;
        floorCache.height = bh;
        floorCtx = floorCache.getContext("2d");
      }
      if (!floorCtx) return;
      const g = floorCtx;
      g.setTransform(ratio, 0, 0, ratio, 0, 0);
      g.fillStyle = BG;
      g.fillRect(0, 0, w, h);
      const glowGx = (beltGx[0] + beltGx[1] + beltGx[2]) / 3;
      const glowGy = (beltGy[0] + beltGy[1] + beltGy[2]) / 3;
      projectXY(glowGx, glowGy, 0);
      const glow = g.createRadialGradient(
        scrX,
        scrY,
        unit * 0.4,
        scrX,
        scrY,
        unit * 6.8,
      );
      glow.addColorStop(0, "rgba(139,92,246,0.18)");
      glow.addColorStop(1, "rgba(139,92,246,0)");
      g.fillStyle = glow;
      g.fillRect(0, 0, w, h);
      g.lineWidth = 1;
      for (let gy = -6; gy <= 14; gy++) {
        for (let gx = -6; gx <= 14; gx++) {
          project(gx, gy, 0, C, 0);
          project(gx + 1, gy, 0, C, 2);
          project(gx + 1, gy + 1, 0, C, 4);
          project(gx, gy + 1, 0, C, 6);
          if (
            C[0] < -unit ||
            C[1] < -unit ||
            C[0] > w + unit ||
            C[1] > h + unit * 2
          ) {
            continue;
          }
          const near = tileNear(gx + 0.5, gy + 0.5);
          const alt = (gx + gy) & 1;
          g.fillStyle = near
            ? alt
              ? "#14121c"
              : "#121018"
            : alt
              ? "#101014"
              : "#0d0d11";
          trace(g, 0);
          g.fill();
          g.strokeStyle = near
            ? "rgba(167,139,250,0.16)"
            : "rgba(255,255,255,0.035)";
          g.stroke();
        }
      }
      fadeEdges(g, w, h);

      g.lineJoin = "round";
      paintBelt(g, 0, 1);
      paintBelt(g, 1, 2);
      paintBelt(g, 2, 0);
      paintSlab(g, lipX, lipY, lipW, lipD, slabH, "rgba(167,139,250,0.36)");
      for (let s = 0; s < ST_N; s++) paintStation(g, cubeOrder[s]);
      paintSlab(g, trayX, trayY, trayW, trayD, slabH, "rgba(125,220,176,0.3)");
      paintPadGlow(g, lipX + lipW * 0.5, lipY + lipD * 0.5, "139,92,246");
      paintPadGlow(g, trayX + trayW * 0.5, trayY + trayD * 0.5, "125,220,176");

      for (let s = 0; s < ST_N; s++) {
        const base = s * 8;
        let topY = TOP[base + 1];
        let cx = 0;
        for (let k = 0; k < 8; k += 2) {
          cx += TOP[base + k];
          if (TOP[base + k + 1] < topY) topY = TOP[base + k + 1];
        }
        stations[s].lx = cx * 0.25;
        stations[s].ly = topY - Math.max(4, unit * 0.08);
      }
    }

    function fadeEdges(g: CanvasRenderingContext2D, w: number, h: number) {
      const m = Math.max(22, Math.min(48, Math.min(w, h) * 0.07));
      const solid = "rgba(10,10,11,1)";
      const clear = "rgba(10,10,11,0)";
      const left = g.createLinearGradient(0, 0, m, 0);
      left.addColorStop(0, solid);
      left.addColorStop(1, clear);
      g.fillStyle = left;
      g.fillRect(0, 0, m, h);
      const right = g.createLinearGradient(w, 0, w - m, 0);
      right.addColorStop(0, solid);
      right.addColorStop(1, clear);
      g.fillStyle = right;
      g.fillRect(w - m, 0, m, h);
      const top = g.createLinearGradient(0, 0, 0, m);
      top.addColorStop(0, solid);
      top.addColorStop(1, clear);
      g.fillStyle = top;
      g.fillRect(0, 0, w, m);
      const bottom = g.createLinearGradient(0, h, 0, h - m);
      bottom.addColorStop(0, solid);
      bottom.addColorStop(1, clear);
      g.fillStyle = bottom;
      g.fillRect(0, h - m, w, m);
    }

    function layout() {
      layoutThisFrame = true;
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const nextDpr = Math.min(2, window.devicePixelRatio || 1);
      if (w < 2 || h < 2) return;
      short = w < 520;
      fillGrid();
      let minX = 1e9;
      let minY = 1e9;
      let maxX = -1e9;
      let maxY = -1e9;
      function consider(gx: number, gy: number) {
        const x = (gx - gy) * COS;
        const y = (gx + gy) * SIN;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
      for (let i = 0; i < ST_N; i++) {
        consider(beltGx[i], beltGy[i]);
        consider(inX[i], inY[i]);
        consider(outX[i], outY[i]);
        consider(stGx[i], stGy[i]);
        consider(stGx[i] + BOX, stGy[i]);
        consider(stGx[i], stGy[i] + BOX);
        consider(stGx[i] + BOX, stGy[i] + BOX);
      }
      consider(lipX, lipY);
      consider(lipX + lipW, lipY);
      consider(lipX, lipY + lipD);
      consider(lipX + lipW, lipY + lipD);
      consider(trayX, trayY);
      consider(trayX + trayW, trayY);
      consider(trayX, trayY + trayD);
      consider(trayX + trayW, trayY + trayD);
      const bw = maxX - minX;
      const bh = maxY - minY;
      const padX = short ? 18 : 32;
      const padTop = short ? 16 : 18;
      const padBot = short ? 16 : 20;
      const head = BOXH + 0.72;
      unit = Math.min((w - padX * 2) / bw, (h - padTop - padBot) / (bh + head));
      const unitCap = short ? 54 : 64;
      if (unit > unitCap) unit = unitCap;
      if (unit < 16) unit = 16;
      originX = padX + (w - padX * 2 - bw * unit) / 2 - minX * unit;
      originY =
        padTop +
        head * unit +
        ((h - padTop - padBot) - (bh + head) * unit) / 2 -
        minY * unit;
      for (let b = 0; b < ST_N; b++) {
        projectXY(beltGx[b], beltGy[b], 0.12);
        px3[b] = scrX;
        py3[b] = scrY;
      }
      pl3[0] = 0;
      const d01 = Math.hypot(px3[1] - px3[0], py3[1] - py3[0]);
      const d12 = Math.hypot(px3[2] - px3[1], py3[2] - py3[1]);
      pl3[1] = d01;
      pl3[2] = d01 + d12;
      const total = pl3[2] || 1;
      for (let n = 0; n < PATH_N; n++) {
        const dist = (n / (PATH_N - 1)) * total;
        const seg = dist <= pl3[1] ? 1 : 2;
        const span = pl3[seg] - pl3[seg - 1] || 1;
        const t = (dist - pl3[seg - 1]) / span;
        PATH[n * 2] = px3[seg - 1] + (px3[seg] - px3[seg - 1]) * t;
        PATH[n * 2 + 1] = py3[seg - 1] + (py3[seg] - py3[seg - 1]) * t;
      }
      stationU[0] = 0;
      stationU[1] = pl3[1] / total;
      stationU[2] = 1;
      projectXY(trayX + trayW * 0.5, trayY + trayD * 0.5, slabH + 0.04);
      trayScrX = scrX;
      trayScrY = scrY;
      const labelPx = Math.max(11, Math.min(14, unit * 0.24));
      fontLabel = "600 " + Math.round(labelPx) + "px " + fontFamily;
      const bwPx = Math.max(1, Math.round(w * nextDpr));
      const bhPx = Math.max(1, Math.round(h * nextDpr));
      if (surface.width !== bwPx || surface.height !== bhPx) {
        surface.width = bwPx;
        surface.height = bhPx;
      }
      bake(w, h, nextDpr);
      cssW = w;
      cssH = h;
      dpr = nextDpr;
      viewDirty = false;
      builtCache = true;
    }

    function makeGlow(r: number, g: number, b: number) {
      const c = document.createElement("canvas");
      c.width = 128;
      c.height = 128;
      const x = c.getContext("2d");
      if (!x) return c;
      const rad = x.createRadialGradient(64, 64, 6, 64, 64, 62);
      rad.addColorStop(0, "rgba(" + r + "," + g + "," + b + ",0.95)");
      rad.addColorStop(1, "rgba(" + r + "," + g + "," + b + ",0)");
      x.fillStyle = rad;
      x.fillRect(0, 0, 128, 128);
      return c;
    }

    function makeDocSprites() {
      for (let v = 0; v < 3; v++) {
        const c = document.createElement("canvas");
        c.width = 180;
        c.height = 220;
        const g = c.getContext("2d");
        if (!g) {
          docSprites[v] = c;
          continue;
        }
        g.translate(90, 128);
        g.transform(1, 0.14, -0.32, 1, 0, 0);
        g.fillStyle = "rgba(0,0,0,0.28)";
        g.beginPath();
        g.ellipse(6, 42, 36, 12, 0, 0, TAU);
        g.fill();
        roundRect(g, -40, -58, 80, 104, 8);
        g.fillStyle = "#f4f0e6";
        g.fill();
        g.strokeStyle = "rgba(40,32,24,0.25)";
        g.lineWidth = 2;
        g.stroke();
        g.strokeStyle = "rgba(70,62,52,0.45)";
        g.lineWidth = 3;
        g.beginPath();
        for (let line = 0; line < 4; line++) {
          g.moveTo(-24, -30 + line * 16);
          g.lineTo(line === 3 ? 4 : 26, -30 + line * 16);
        }
        g.stroke();
        g.fillStyle = DOC_COLORS[v];
        roundRect(g, 16, -58, 24, 18, 4);
        g.fill();
        docSprites[v] = c;
      }
    }

    function canSpawn() {
      let flowing = 0;
      for (let i = 0; i < docCount; i++) {
        const d = docs[i];
        if (d.dead || d.phase === "fade") continue;
        flowing++;
        if (d.phase === "arrive" || (d.phase === "run" && d.step < 2)) return false;
      }
      return flowing < 2;
    }

    function updateVisual(doc: Doc) {
      if (doc.phase === "deliver" || doc.phase === "fade" || doc.step >= 3) {
        doc.visual = 2;
        return;
      }
      doc.visual = doc.step === 2 ? 1 : 0;
    }

    function beginStep(doc: Doc) {
      const step = doc.step;
      const move = step === 1 || step === 3;
      const base = STEP_MS[step];
      doc.dur = base;
      doc.left = base;
      if (move) {
        const from = step === 1 ? 0 : 1;
        const to = step === 1 ? 1 : 2;
        doc.u0 = stationU[from];
        doc.u1 = stationU[to];
      } else {
        const at = step === 0 ? 0 : 1;
        doc.u0 = stationU[at];
        doc.u1 = doc.u0;
        doc.u = doc.u0;
      }
      updateVisual(doc);
    }

    function spawnAuto() {
      if (docCount >= 6) return;
      const doc = pool.pop();
      if (!doc) return;
      doc.dead = false;
      doc.phase = "arrive";
      doc.step = 0;
      doc.visual = 0;
      doc.u = 0;
      doc.u0 = 0;
      doc.u1 = 0;
      doc.dur = ARRIVE;
      doc.left = ARRIVE;
      docs[docCount++] = doc;
    }

    function advance(doc: Doc) {
      if (doc.phase === "arrive") {
        doc.phase = "run";
        doc.step = 0;
        beginStep(doc);
        return;
      }
      if (doc.phase === "run") {
        if (doc.step < 3) {
          doc.step += 1;
          beginStep(doc);
          return;
        }
        doc.phase = "deliver";
        doc.dur = DELIVER;
        doc.left = DELIVER;
        doc.u = stationU[2];
        updateVisual(doc);
        return;
      }
      if (doc.phase === "deliver") {
        doc.phase = "fade";
        doc.dur = FADE;
        doc.left = FADE;
        return;
      }
      doc.dead = true;
    }

    function consume(doc: Doc, stepDt: number, motion: number) {
      const chunk = stepDt * 1000 * motion;
      const used = chunk > doc.left ? doc.left : chunk;
      doc.left -= used;
      if (doc.phase === "run") {
        const dur = doc.dur > 0 ? doc.dur : 1;
        const p = smooth(1 - doc.left / dur);
        doc.u = doc.u0 + (doc.u1 - doc.u0) * p;
      }
      if (doc.left <= 0) advance(doc);
    }

    function updateSpawn(stepDt: number, motion: number) {
      spawnLeft -= stepDt * motion;
      if (spawnLeft > 0) return;
      if (!canSpawn()) {
        spawnLeft = 0.2;
        return;
      }
      spawnAuto();
      spawnLeft = 0.55;
    }

    function affect(doc: Doc) {
      if (doc.dead) return;
      let idx = 0;
      let amount = 0.45;
      let mode = 0;
      if (doc.phase === "arrive") {
        idx = 0;
        amount = 0.75;
        mode = 0;
      } else if (doc.phase === "deliver" || doc.phase === "fade") {
        idx = 2;
        amount = 1;
        mode = 2;
      } else if (doc.step <= 0) {
        idx = 0;
        amount = 0.9;
        mode = 0;
      } else if (doc.step === 1) {
        idx = 1;
        amount = 0.6;
        mode = 1;
      } else if (doc.step === 2) {
        idx = 1;
        amount = 1;
        mode = 1;
      } else {
        idx = 2;
        amount = 0.72;
        mode = 2;
      }
      const st = stations[idx];
      if (amount > st.want) st.want = amount;
      if (mode > st.wantMode) st.wantMode = mode;
    }

    function update(now: number) {
      let raw = lastNow ? (now - lastNow) / 1000 : 0.016;
      lastNow = now;
      if (raw > 0.05) raw = 0.05;
      if (raw < 0) raw = 0;
      const motion = reduced ? 0.18 : 1;
      updateSpawn(raw, motion);
      for (let i = 0; i < docCount; i++) {
        const d = docs[i];
        if (d.dead) continue;
        consume(d, raw, motion);
      }
      let w = 0;
      for (let j = 0; j < docCount; j++) {
        const doc = docs[j];
        if (doc.dead) pool.push(doc);
        else docs[w++] = doc;
      }
      docCount = w;
      for (let s = 0; s < ST_N; s++) {
        stations[s].want = 0;
        stations[s].wantMode = 0;
      }
      for (let k = 0; k < docCount; k++) affect(docs[k]);
      const light = Math.min(1, raw * 7);
      for (let n = 0; n < ST_N; n++) {
        const st = stations[n];
        st.heat += (st.want - st.heat) * light;
        if (st.want > 0.2) st.mode = st.wantMode;
      }
      if (!reduced) {
        dashPhase += raw * 14;
        if (dashPhase > 800) dashPhase -= 800;
      }
    }

    function docPosition(doc: Doc) {
      if (doc.phase === "arrive") {
        pathPoint(0);
        const dur = doc.dur > 0 ? doc.dur : 1;
        const t = smooth(1 - doc.left / dur);
        scrY -= (1 - t) * unit * 0.42;
        return;
      }
      if (doc.phase === "deliver" || doc.phase === "fade") {
        pathPoint(1);
        const ax = scrX;
        const ay = scrY;
        const dur = doc.dur > 0 ? doc.dur : 1;
        const t = doc.phase === "fade" ? 1 : smooth(1 - doc.left / dur);
        const arc = Math.sin(t * Math.PI) * unit * 0.16;
        scrX = ax + (trayScrX - ax) * t;
        scrY = ay + (trayScrY - ay) * t - arc;
        return;
      }
      pathPoint(doc.u);
    }

    function drawDashes() {
      ctx.strokeStyle = "rgba(214,204,255,0.75)";
      ctx.lineWidth = Math.max(1.4, unit * 0.035);
      ctx.lineCap = "round";
      ctx.beginPath();
      const shift = dashPhase % 8;
      for (let i = shift; i < PATH_N - 1; i += 8) {
        const j = (i | 0) * 2;
        ctx.moveTo(PATH[j], PATH[j + 1]);
        ctx.lineTo(PATH[j + 2], PATH[j + 3]);
      }
      ctx.stroke();
    }

    function drawStationsLive() {
      const names = short ? ST_TALL : ST_WIDE;
      for (let s = 0; s < ST_N; s++) {
        const st = stations[s];
        if (st.heat > 0.03) {
          const sprite = glowSprites[st.mode] || glowSprites[0];
          const size = unit * (2.2 + st.heat * 0.85);
          ctx.globalAlpha = 0.28 + st.heat * 0.45;
          ctx.drawImage(sprite, st.sx - size * 0.5, st.sy - size * 0.5, size, size);
          ctx.globalAlpha = 0.18 + st.heat * 0.28;
          ctx.fillStyle = GLOW_COLORS[st.mode];
          const o = s * 8;
          ctx.beginPath();
          ctx.moveTo(TOP[o], TOP[o + 1]);
          ctx.lineTo(TOP[o + 2], TOP[o + 3]);
          ctx.lineTo(TOP[o + 4], TOP[o + 5]);
          ctx.lineTo(TOP[o + 6], TOP[o + 7]);
          ctx.closePath();
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      ctx.font = fontLabel;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = "#ddd6fe";
      for (let n = 0; n < ST_N; n++) {
        ctx.fillText(names[n], stations[n].lx, stations[n].ly);
      }
    }

    function drawPaper(x: number, y: number, dw: number, visual: number, alpha: number) {
      const sprite = docSprites[visual] || docSprites[0];
      const dh = dw * (220 / 180);
      ctx.globalAlpha = alpha;
      ctx.drawImage(sprite, x - dw * 0.5, y - dh * 0.86, dw, dh);
      ctx.globalAlpha = 1;
    }

    function drawDoc(doc: Doc, x: number, y: number) {
      let alpha = 1;
      let scale = 1;
      let glowA = 0;
      let glowMode = 0;
      if (doc.phase === "arrive") {
        const dur = doc.dur > 0 ? doc.dur : 1;
        const t = smooth(1 - doc.left / dur);
        alpha = 0.2 + 0.8 * t;
        scale = 0.82 + 0.18 * t;
        glowA = 0.62 * (1 - t) + 0.16;
        glowMode = 0;
      } else if (doc.phase === "deliver") {
        const dur = doc.dur > 0 ? doc.dur : 1;
        const t = smooth(1 - doc.left / dur);
        glowA = 0.2 + t * 0.42;
        glowMode = 2;
      } else if (doc.phase === "fade") {
        alpha = doc.left > 0 ? doc.left / doc.dur : 0;
        glowA = 0.5 * alpha;
        glowMode = 2;
      } else if (doc.step === 2) {
        glowA = 0.28;
        glowMode = 1;
      }
      if (glowA > 0.02) {
        const sprite = glowSprites[glowMode] || glowSprites[0];
        const size = unit * (doc.phase === "arrive" ? 1.65 : 1.85);
        ctx.globalAlpha = glowA;
        ctx.drawImage(sprite, x - size * 0.5, y - size * 0.62, size, size);
        ctx.globalAlpha = 1;
      }
      drawPaper(x, y, unit * 0.9 * scale, doc.visual, alpha);
    }

    function drawEntities() {
      let n = 0;
      for (let i = 0; i < docCount; i++) {
        const d = docs[i];
        if (d.dead) continue;
        docPosition(d);
        EX[n] = scrX;
        EY[n] = scrY;
        EID[n] = i;
        n++;
      }
      for (let a = 0; a < n; a++) order[a] = a;
      for (let p = 1; p < n; p++) {
        const key = order[p];
        let q = p - 1;
        while (q >= 0 && EY[order[q]] > EY[key]) {
          order[q + 1] = order[q];
          q--;
        }
        order[q + 1] = key;
      }
      for (let e = 0; e < n; e++) {
        const id = order[e];
        drawDoc(docs[EID[id]], EX[id], EY[id]);
      }
    }

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, cssW, cssH);
      if (floorCache) ctx.drawImage(floorCache, 0, 0, cssW, cssH);
      drawDashes();
      drawStationsLive();
      drawEntities();
    }

    function record(elapsed: number) {
      if (workCount < workRing.length) {
        workRing[workCount] = elapsed;
        workSum += elapsed;
        workCount++;
      } else {
        workSum -= workRing[workIdx];
        workRing[workIdx] = elapsed;
        workSum += elapsed;
        workIdx = (workIdx + 1) % workRing.length;
      }
      workAvg = workSum / (workCount < workRing.length ? workCount : workRing.length);
      if (elapsed > workMax) workMax = elapsed;
      if ((frameIndex & 63) === 0) {
        const meter = stage as HTMLDivElement & { frameMs?: number; frameMax?: number };
        meter.frameMs = workAvg;
        meter.frameMax = workMax;
      }
    }

    function frame(now: number) {
      if (!looping || disposed) return;
      frameIndex++;
      layoutThisFrame = false;
      if (viewDirty || (frameIndex & 63) === 0) {
        const rw = stage.clientWidth;
        const rh = stage.clientHeight;
        const rd = Math.min(2, window.devicePixelRatio || 1);
        if (viewDirty || rw !== cssW || rh !== cssH || Math.abs(rd - dpr) > 0.01) {
          layout();
        }
      }
      if (builtCache) {
        const t0 = performance.now();
        update(now);
        draw();
        const elapsed = performance.now() - t0;
        if (frameIndex > 25 && !layoutThisFrame) record(elapsed);
      }
      if (looping && !disposed) raf = requestAnimationFrame(frame);
    }

    function syncLoop() {
      const should = onScreen && !hidden && !disposed;
      if (should && !looping) {
        looping = true;
        lastNow = 0;
        raf = requestAnimationFrame(frame);
      } else if (!should && looping) {
        looping = false;
        cancelAnimationFrame(raf);
        raf = 0;
      }
    }

    function onVis() {
      hidden = document.hidden;
      syncLoop();
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    function onMotion() {
      reduced = motionQuery.matches;
    }

    glowSprites[0] = makeGlow(139, 92, 246);
    glowSprites[1] = makeGlow(245, 193, 108);
    glowSprites[2] = makeGlow(125, 220, 176);
    makeDocSprites();
    layout();
    if (builtCache) draw();

    const rect = host.getBoundingClientRect();
    onScreen = rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0;
    hidden = document.hidden;

    const ro = new ResizeObserver(() => {
      viewDirty = true;
    });
    ro.observe(host);
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        onScreen = !!entry && entry.isIntersecting;
        syncLoop();
      },
      { threshold: 0 },
    );
    io.observe(host);
    document.addEventListener("visibilitychange", onVis);
    if (motionQuery.addEventListener) motionQuery.addEventListener("change", onMotion);
    syncLoop();

    return () => {
      disposed = true;
      looping = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener("change", onMotion);
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="relative h-[420px] w-full min-w-0 max-w-full overflow-hidden bg-brand-black sm:h-[480px] lg:h-[560px]"
    >
      <canvas ref={canvasRef} className="pointer-events-none block h-full w-full" />
    </div>
  );
}
