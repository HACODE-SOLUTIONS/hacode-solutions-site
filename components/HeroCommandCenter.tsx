"use client";

import { useEffect, useRef } from "react";

/**
 * Hero mark. Plays the official HACODE construction, then rests on the
 * glass cube.
 *
 * 1 hexagon outline
 * 2 isometric cube (edges from the center to the top, lower-left, lower-right)
 * 3 three rounded slabs draw in along the stack
 * 4 cube wire falls away
 * 5 slabs fill in the dark-site logo colors: back cyan, middle white, front purple
 * 6–9 the glass cube returns: soft cyan on the left, a white-tinted top,
 *    soft purple on the remaining face
 *
 * Slab geometry is the path from public/brand/logo-cyan-white-purple.svg
 * (viewBox 0 0 777 897.2). Cube vertices are that file's construction planes.
 * Nothing is drawn around the cube.
 */

const BG = "#0A0A0B";
const CYAN = "#5EC2FF";
const WHITE = "#FFFFFF";
const PURPLE = "#7448FF";
const INK = "#F4F6FF";

// Glass stops are only white mixed into #5EC2FF or #7448FF.
const GLASS_LEFT_HI: RGB = [175, 225, 255];
const GLASS_LEFT_LO: RGB = [94, 194, 255];
const GLASS_TOP_HI: RGB = [255, 255, 255];
const GLASS_TOP_LO: RGB = [247, 252, 255];
const GLASS_REST_HI: RGB = [186, 164, 255];
const GLASS_REST_LO: RGB = [116, 72, 255];

const VB_W = 777;
const VB_H = 897.2;

const TOP: Pt = [388.5, 0];
const TOP_R: Pt = [777, 224.3];
const BOT_R: Pt = [777, 672.9];
const BOT: Pt = [388.5, 897.2];
const BOT_L: Pt = [0, 672.9];
const TOP_L: Pt = [0, 224.3];
const MID_PT: Pt = [388.5, 448.6];

const HEX: Pt[] = [TOP, TOP_R, BOT_R, BOT, BOT_L, TOP_L];
const FACE_LEFT: Pt[] = [TOP_L, TOP, MID_PT, BOT_L];
const FACE_RIGHT: Pt[] = [TOP, TOP_R, BOT_R, MID_PT];
const FACE_BOTTOM: Pt[] = [BOT_L, MID_PT, BOT_R, BOT];
const SPOKES: Pt[] = [TOP, BOT_R, BOT_L];

// Same rounded slab, shifted along the isometric stack.
// Offsets are the M differences in the official SVG paths.
const SLAB_D =
  "M360.11,693.31l-169.89-98.09c-17.54-10.13-28.35-28.84-28.35-49.1v-196.17c0-43.64,47.25-70.92,85.04-49.1l169.89,98.09c17.54,10.13,28.35,28.84,28.35,49.1v196.17c0,43.64-47.25,70.92-85.04,49.1Z";

const SLAB_STEP: Pt = [84.99, -48.55];
const SLAB_COLORS = [CYAN, WHITE, PURPLE];
const SPREAD = 58;

const CYCLE = 15.4;

type Pt = readonly [number, number];
type RGB = readonly [number, number, number];

interface Pose {
  hex: number;
  edge: number;
  wire: number;
  wireScale: number;
  appear: number[];
  fill: number[];
  glass: number;
  tint: number;
  floatY: number;
  glow: number;
  master: number;
  phase: string;
}

function clamp01(t: number) {
  if (t < 0) return 0;
  if (t > 1) return 1;
  return t;
}

function easeOutCubic(t: number) {
  const x = clamp01(t);
  return 1 - (1 - x) ** 3;
}

function easeOutQuart(t: number) {
  const x = clamp01(t);
  return 1 - (1 - x) ** 4;
}

function easeInOut(t: number) {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
}

function span(t: number, a: number, b: number, ease: (n: number) => number) {
  if (t <= a) return 0;
  if (t >= b) return 1;
  return ease((t - a) / (b - a));
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function rgba(r: number, g: number, b: number, a: number) {
  return "rgba(" + (r | 0) + "," + (g | 0) + "," + (b | 0) + "," + a.toFixed(3) + ")";
}

function poseAt(t: number): Pose {
  const appear = [0, 1, 2].map((i) =>
    span(t, 3.0 + i * 0.32, 3.75 + i * 0.32, easeOutQuart),
  );
  const fill = [0, 1, 2].map((i) =>
    span(t, 5.9 + i * 0.1, 7.05 + i * 0.08, easeInOut),
  );
  const glass = span(t, 7.2, 8.55, easeInOut);
  const tint = span(t, 7.45, 8.7, easeInOut);
  const master = 1 - span(t, 13.75, 15.15, easeInOut);
  const idle = span(t, 8.4, 9.1, easeInOut) * (1 - span(t, 13.5, 14.5, easeInOut));
  const wire = 1 - span(t, 4.95, 5.75, easeInOut);
  const fillAvg = (fill[0] + fill[1] + fill[2]) / 3;
  const breathe = 1 + Math.sin(t * 1.15) * 0.04 * idle;

  let phase = "hexagon";
  if (t >= 13.75) phase = "recede";
  else if (t >= 8.7) phase = "idle";
  else if (t >= 7.2) phase = "glass";
  else if (t >= 5.9) phase = "mark";
  else if (t >= 4.95) phase = "slabs";
  else if (t >= 1.65) phase = "cube";

  return {
    hex: span(t, 0.06, 1.12, easeOutCubic),
    edge: span(t, 1.65, 2.7, easeOutCubic),
    wire,
    wireScale: 1 + 0.035 * (1 - wire),
    appear,
    fill,
    glass,
    tint,
    floatY: Math.sin(t * 0.78) * 6.5 * idle,
    glow: (0.14 + fillAvg * 0.38 + glass * 0.26) * breathe * master,
    master,
    phase,
  };
}

function finalPose(): Pose {
  return {
    hex: 1,
    edge: 1,
    wire: 0,
    wireScale: 1,
    appear: [1, 1, 1],
    fill: [1, 1, 1],
    glass: 1,
    tint: 1,
    floatY: 0,
    glow: 0.72,
    master: 1,
    phase: "final",
  };
}

function strokeChain(
  ctx: CanvasRenderingContext2D,
  pts: readonly Pt[],
  amount: number,
  closed: boolean,
) {
  if (amount <= 0.004) return;
  const n = pts.length;
  const segCount = closed ? n : n - 1;
  let total = 0;
  const lens = new Array<number>(segCount);
  for (let i = 0; i < segCount; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % n];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    lens[i] = len;
    total += len;
  }
  const goal = total * clamp01(amount);
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  let walked = 0;
  for (let i = 0; i < segCount; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % n];
    const len = lens[i];
    if (walked + len <= goal + 0.2) {
      ctx.lineTo(b[0], b[1]);
      walked += len;
    } else {
      const f = len > 0 ? (goal - walked) / len : 0;
      ctx.lineTo(a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f);
      break;
    }
  }
  if (closed && amount >= 0.999) ctx.closePath();
  ctx.stroke();
}

function fillPoly(ctx: CanvasRenderingContext2D, pts: readonly Pt[]) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
  ctx.fill();
}

function strokePoly(ctx: CanvasRenderingContext2D, pts: readonly Pt[]) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
  ctx.stroke();
}

function faceGradient(
  ctx: CanvasRenderingContext2D,
  from: Pt,
  to: Pt,
  hi: readonly [number, number, number],
  lo: readonly [number, number, number],
  tint: number,
) {
  const grad = ctx.createLinearGradient(from[0], from[1], to[0], to[1]);
  const stop = (c: readonly [number, number, number]) =>
    rgba(mix(255, c[0], tint), mix(255, c[1], tint), mix(255, c[2], tint), 1);
  grad.addColorStop(0, stop(hi));
  grad.addColorStop(1, stop(lo));
  return grad;
}

function makeGlow() {
  const c = document.createElement("canvas");
  c.width = 384;
  c.height = 384;
  const g = c.getContext("2d");
  if (!g) return c;
  const purple = g.createRadialGradient(214, 188, 8, 200, 196, 188);
  purple.addColorStop(0, "rgba(116,72,255,0.50)");
  purple.addColorStop(0.42, "rgba(116,72,255,0.16)");
  purple.addColorStop(1, "rgba(116,72,255,0)");
  g.fillStyle = purple;
  g.fillRect(0, 0, 384, 384);
  const cyan = g.createRadialGradient(142, 236, 4, 150, 230, 140);
  cyan.addColorStop(0, "rgba(94,194,255,0.40)");
  cyan.addColorStop(1, "rgba(94,194,255,0)");
  g.fillStyle = cyan;
  g.fillRect(0, 0, 384, 384);
  return c;
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
    ctx.imageSmoothingEnabled = true;

    const slab = new Path2D(SLAB_D);
    const glow = makeGlow();

    let disposed = false;
    let looping = false;
    let raf = 0;
    let onScreen = true;
    let hidden = document.hidden;
    let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cssW = 0;
    let cssH = 0;
    let dpr = 1;
    let scale = 1;
    let originX = 0;
    let originY = 0;
    let viewDirty = true;
    let built = false;
    let elapsed = 0;
    let lastNow = 0;
    let frameIndex = 0;

    const workRing = new Float64Array(90);
    let workCount = 0;
    let workIdx = 0;
    let workSum = 0;

    function layout() {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const nextDpr = Math.min(2, window.devicePixelRatio || 1);
      if (w < 2 || h < 2) return;
      const pad = Math.max(8, Math.min(w, h) * 0.035);
      const nextScale = Math.min((w - pad * 2) / VB_W, (h - pad * 2) / VB_H);
      scale = nextScale > 0 ? nextScale : 0.2;
      originX = (w - VB_W * scale) * 0.5;
      originY = (h - VB_H * scale) * 0.5;
      const bw = Math.max(1, Math.round(w * nextDpr));
      const bh = Math.max(1, Math.round(h * nextDpr));
      if (surface.width !== bw || surface.height !== bh) {
        surface.width = bw;
        surface.height = bh;
      }
      cssW = w;
      cssH = h;
      dpr = nextDpr;
      viewDirty = false;
      built = true;
    }

    function drawFaces(pose: Pose) {
      if (pose.glass <= 0.004 || pose.master <= 0.004) return;
      const tint = pose.tint;
      const veil = pose.glass * pose.master;
      // Dark field, logo hues only. Left is soft cyan, the upper face is
      // white, and the remaining face is soft purple.
      const faces: {
        pts: readonly Pt[];
        from: Pt;
        to: Pt;
        hi: RGB;
        lo: RGB;
        alpha: number;
      }[] = [
        {
          pts: FACE_LEFT,
          from: TOP,
          to: BOT_L,
          hi: GLASS_LEFT_HI,
          lo: GLASS_LEFT_LO,
          alpha: mix(0.2, 0.62, tint),
        },
        {
          pts: FACE_RIGHT,
          from: TOP,
          to: BOT_R,
          hi: GLASS_TOP_HI,
          lo: GLASS_TOP_LO,
          alpha: mix(0.22, 0.58, tint),
        },
        {
          pts: FACE_BOTTOM,
          from: MID_PT,
          to: BOT,
          hi: GLASS_REST_HI,
          lo: GLASS_REST_LO,
          alpha: mix(0.18, 0.52, tint),
        },
      ];
      for (let i = 0; i < faces.length; i++) {
        const face = faces[i];
        ctx.globalAlpha = veil * face.alpha;
        ctx.fillStyle = faceGradient(ctx, face.from, face.to, face.hi, face.lo, tint);
        fillPoly(ctx, face.pts);
      }
      ctx.globalAlpha = veil * 0.34;
      ctx.lineCap = "round";
      ctx.lineJoin = "miter";
      ctx.miterLimit = 2;
      ctx.lineWidth = 4.5;
      ctx.strokeStyle = "rgba(255,255,255,0.32)";
      for (let i = 0; i < SPOKES.length; i++) {
        ctx.beginPath();
        ctx.moveTo(MID_PT[0], MID_PT[1]);
        ctx.lineTo(SPOKES[i][0], SPOKES[i][1]);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    function drawGlassEdge(pose: Pose) {
      if (pose.glass <= 0.004 || pose.master <= 0.004) return;
      ctx.globalAlpha = pose.glass * pose.master;
      ctx.lineCap = "round";
      ctx.lineJoin = "miter";
      ctx.miterLimit = 2;
      ctx.lineWidth = 7;
      ctx.strokeStyle = "rgba(255,255,255,0.78)";
      strokePoly(ctx, HEX);
      ctx.lineWidth = 3.2;
      ctx.strokeStyle = "rgba(255,255,255,0.95)";
      ctx.beginPath();
      ctx.moveTo(TOP_L[0], TOP_L[1]);
      ctx.lineTo(TOP[0], TOP[1]);
      ctx.lineTo(TOP_R[0], TOP_R[1]);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function drawWire(pose: Pose) {
      const alpha = pose.wire * pose.master;
      if (alpha <= 0.004) return;
      ctx.save();
      ctx.translate(MID_PT[0], MID_PT[1]);
      ctx.scale(pose.wireScale, pose.wireScale);
      ctx.translate(-MID_PT[0], -MID_PT[1]);
      ctx.globalAlpha = alpha;
      ctx.lineCap = "round";
      ctx.lineJoin = "miter";
      ctx.miterLimit = 2;
      ctx.strokeStyle = INK;
      ctx.lineWidth = 7.5;
      strokeChain(ctx, HEX, pose.hex, true);
      ctx.lineWidth = 7;
      const edgeAmt = pose.edge;
      for (let i = 0; i < SPOKES.length; i++) {
        const tip = SPOKES[i];
        const x = MID_PT[0] + (tip[0] - MID_PT[0]) * edgeAmt;
        const y = MID_PT[1] + (tip[1] - MID_PT[1]) * edgeAmt;
        ctx.beginPath();
        ctx.moveTo(MID_PT[0], MID_PT[1]);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    function drawSlabs(pose: Pose) {
      const axis = Math.hypot(SLAB_STEP[0], SLAB_STEP[1]) || 1;
      const ux = SLAB_STEP[0] / axis;
      const uy = SLAB_STEP[1] / axis;
      for (let i = 0; i < 3; i++) {
        const shown = pose.appear[i];
        if (shown <= 0.004) continue;
        const fill = pose.fill[i];
        const slide = (1 - shown) * SPREAD * (i - 1);
        const ox = SLAB_STEP[0] * i + ux * slide;
        const oy = SLAB_STEP[1] * i + uy * slide;
        ctx.save();
        ctx.translate(ox, oy);
        const strokeA = shown * (1 - fill) * pose.master;
        if (strokeA > 0.004) {
          ctx.globalAlpha = strokeA;
          ctx.lineWidth = 7;
          ctx.lineJoin = "round";
          ctx.lineCap = "round";
          ctx.strokeStyle = INK;
          ctx.stroke(slab);
        }
        const fillA = shown * fill * pose.master;
        if (fillA > 0.004) {
          ctx.globalAlpha = fillA;
          ctx.fillStyle = SLAB_COLORS[i];
          ctx.fill(slab);
        }
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    }

    function paint() {
      if (!built) return;
      const pose = reduced ? finalPose() : poseAt(elapsed % CYCLE);
      const t0 = performance.now();

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, cssW, cssH);

      if (pose.glow > 0.004) {
        const glowSize = Math.min(cssW, cssH) * 0.92;
        const cx = originX + MID_PT[0] * scale;
        const cy = originY + MID_PT[1] * scale + pose.floatY;
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = pose.glow;
        ctx.drawImage(
          glow,
          cx - glowSize * 0.5,
          cy - glowSize * 0.48,
          glowSize,
          glowSize,
        );
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      }

      ctx.setTransform(
        dpr * scale,
        0,
        0,
        dpr * scale,
        dpr * originX,
        dpr * (originY + pose.floatY),
      );

      drawFaces(pose);
      drawWire(pose);
      drawSlabs(pose);
      drawGlassEdge(pose);

      const elapsedMs = performance.now() - t0;
      if (frameIndex > 20 && !viewDirty) {
        if (workCount < workRing.length) {
          workRing[workCount] = elapsedMs;
          workSum += elapsedMs;
          workCount++;
        } else {
          workSum -= workRing[workIdx];
          workRing[workIdx] = elapsedMs;
          workSum += elapsedMs;
          workIdx = (workIdx + 1) % workRing.length;
        }
        if ((frameIndex & 15) === 0) {
          const meter = stage as HTMLDivElement & { frameMs?: number };
          meter.frameMs =
            workSum / (workCount < workRing.length ? workCount : workRing.length);
          stage.dataset.phase = pose.phase;
        }
      }
    }

    function frame(now: number) {
      if (!looping || disposed) return;
      frameIndex++;
      if (!lastNow) lastNow = now;
      let dt = (now - lastNow) / 1000;
      lastNow = now;
      if (dt < 0) dt = 0;
      if (dt > 0.05) dt = 0.05;
      elapsed += dt;
      if (elapsed > CYCLE * 4) elapsed -= CYCLE * 4;

      if (viewDirty || (frameIndex & 31) === 0) {
        const rw = stage.clientWidth;
        const rh = stage.clientHeight;
        const rd = Math.min(2, window.devicePixelRatio || 1);
        if (viewDirty || rw !== cssW || rh !== cssH || Math.abs(rd - dpr) > 0.01) {
          layout();
        }
      }
      paint();
      if (looping && !disposed) raf = requestAnimationFrame(frame);
    }

    function paintStill() {
      if (viewDirty || !built) layout();
      paint();
    }

    function syncLoop() {
      const should = onScreen && !hidden && !disposed && !reduced;
      if (should && !looping) {
        looping = true;
        lastNow = 0;
        raf = requestAnimationFrame(frame);
      } else if (!should && looping) {
        looping = false;
        cancelAnimationFrame(raf);
        raf = 0;
        lastNow = 0;
      }
      if (!should && !disposed) paintStill();
    }

    function onVis() {
      hidden = document.hidden;
      syncLoop();
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    function onMotion() {
      reduced = motionQuery.matches;
      if (!reduced) {
        elapsed = 0;
        lastNow = 0;
      }
      syncLoop();
    }

    layout();
    paintStill();

    const rect = stage.getBoundingClientRect();
    onScreen = rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0;
    hidden = document.hidden;

    const ro = new ResizeObserver(() => {
      viewDirty = true;
      if (!looping) paintStill();
    });
    ro.observe(stage);
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        onScreen = !!entry && entry.isIntersecting;
        syncLoop();
      },
      { threshold: 0 },
    );
    io.observe(stage);
    document.addEventListener("visibilitychange", onVis);
    motionQuery.addEventListener("change", onMotion);
    syncLoop();

    return () => {
      disposed = true;
      looping = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      motionQuery.removeEventListener("change", onMotion);
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
