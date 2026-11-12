"use client";

import { useEffect, useRef } from "react";

/**
 * Hero mark. Builds the HACODE logo, holds, then plays the same
 * construction backward to the hexagon outline and repeats.
 *
 * Forward, from the drawn hexagon outline:
 * 1 isometric cube (edges from the center to the top, lower-left, lower-right)
 * 2 three rounded slabs draw in along the stack
 * 3 cube wire falls away
 * 4 slabs fill: back #5EC2FF, middle #FFFFFF, front #7448FF
 * 5 a colorless glass cube closes around them
 *
 * The outer cube has no hue. Faces are faint white-to-gray highlights.
 * Edges are white and gray. Only the three slabs carry the logo colors
 * from public/brand/logo-cyan-white-purple.svg.
 *
 * Slab geometry is that file's path (viewBox 0 0 777 897.2). Cube vertices
 * are its construction planes. Nothing is drawn around the cube.
 *
 * Playback speed eases to a stop at each end so the turnaround does not
 * pop. Reduced motion shows the finished mark and does not loop.
 * Off-screen and hidden tabs pause the clock.
 */

const BG = "#0A0A0B";
const CYAN = "#5EC2FF";
const WHITE = "#FFFFFF";
const PURPLE = "#7448FF";
const INK = "#F4F6FF";

// Neutral glass. Equal channels only, so the cube cannot pick up a tint.
const GLASS_LO: RGB = [196, 196, 196];

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

// Construction clock. 1.65 is the drawn hexagon outline, before the spokes.
// 8.7 is the finished glass mark. The loop rests on that outline so the
// reverse does not wipe the stroke down to a blank frame.
const HEX_AT = 1.65;
const MARK_AT = 8.7;
const BUILD_SPAN = MARK_AT - HEX_AT;
const EASE_WINDOW = 0.75;
const PLAY = BUILD_SPAN + EASE_WINDOW;
const HOLD_MARK = 1.8;
const HOLD_HEX = 0.9;
const LOOP = PLAY + HOLD_MARK + PLAY + HOLD_HEX;

type Pt = readonly [number, number];
type RGB = readonly [number, number, number];
type Segment = "forward" | "hold" | "reverse" | "hexagon";

interface LoopSample {
  t: number;
  segment: Segment;
}

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
  const master = 1;
  const wire = 1 - span(t, 4.95, 5.75, easeInOut);
  const fillAvg = (fill[0] + fill[1] + fill[2]) / 3;

  let phase = "hexagon";
  if (t > HEX_AT) phase = "cube";
  if (t >= 4.95) phase = "slabs";
  if (t >= 5.9) phase = "mark";
  if (t >= 7.2) phase = "glass";
  if (t >= MARK_AT) phase = "idle";

  return {
    hex: span(t, 0.06, 1.12, easeOutCubic),
    edge: span(t, 1.65, 2.7, easeOutCubic),
    wire,
    wireScale: 1 + 0.035 * (1 - wire),
    appear,
    fill,
    glass,
    tint,
    floatY: 0,
    glow: (0.08 + fillAvg * 0.16 + glass * 0.1) * master,
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
    glow: 0.34,
    master: 1,
    phase: "final",
  };
}

// Distance along the construction for wall-clock `local` in [0, PLAY].
// Speed is 0 at both ends and 1 through the middle, so a hold can freeze
// the pose without a velocity pop. The ramp is symmetric, which makes
// PLAY - local the exact reverse of local.
function buildDistance(local: number): number {
  const w = EASE_WINDOW;
  if (local <= 0) return 0;
  if (local >= PLAY) return BUILD_SPAN;
  if (local < w) {
    const x = local / w;
    return w * (x * x * x * (1 - 0.5 * x));
  }
  if (local > PLAY - w) {
    const x = (local - (PLAY - w)) / w;
    const ramp = w * (x - x * x * x * (1 - 0.5 * x));
    return w * 0.5 + (PLAY - 2 * w) + ramp;
  }
  return w * 0.5 + (local - w);
}

function sampleLoop(elapsed: number): LoopSample {
  let local = elapsed % LOOP;
  if (local < 0) local += LOOP;
  if (local < PLAY) {
    return { t: HEX_AT + buildDistance(local), segment: "forward" };
  }
  local -= PLAY;
  if (local < HOLD_MARK) {
    return { t: MARK_AT, segment: "hold" };
  }
  local -= HOLD_MARK;
  if (local < PLAY) {
    return { t: MARK_AT - buildDistance(local), segment: "reverse" };
  }
  return { t: HEX_AT, segment: "hexagon" };
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

function fillNeutralFace(
  ctx: CanvasRenderingContext2D,
  pts: readonly Pt[],
  from: Pt,
  to: Pt,
  hiAlpha: number,
  loAlpha: number,
) {
  const grad = ctx.createLinearGradient(from[0], from[1], to[0], to[1]);
  grad.addColorStop(0, rgba(255, 255, 255, hiAlpha));
  grad.addColorStop(1, rgba(GLASS_LO[0], GLASS_LO[1], GLASS_LO[2], loAlpha));
  ctx.fillStyle = grad;
  fillPoly(ctx, pts);
}

function makeGlow() {
  const c = document.createElement("canvas");
  c.width = 384;
  c.height = 384;
  const g = c.getContext("2d");
  if (!g) return c;
  const halo = g.createRadialGradient(192, 200, 12, 192, 200, 176);
  halo.addColorStop(0, "rgba(255,255,255,0.22)");
  halo.addColorStop(0.46, "rgba(255,255,255,0.06)");
  halo.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = halo;
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
      // Colorless glass. The right face carries the faint highlight,
      // the left face is quieter, and the bottom face is barely there.
      ctx.globalAlpha = veil;
      fillNeutralFace(
        ctx,
        FACE_LEFT,
        TOP,
        BOT_L,
        mix(0.03, 0.09, tint),
        mix(0.012, 0.035, tint),
      );
      fillNeutralFace(
        ctx,
        FACE_RIGHT,
        TOP,
        BOT_R,
        mix(0.05, 0.16, tint),
        mix(0.018, 0.055, tint),
      );
      fillNeutralFace(
        ctx,
        FACE_BOTTOM,
        MID_PT,
        BOT,
        mix(0.016, 0.05, tint),
        mix(0.006, 0.018, tint),
      );
      ctx.globalAlpha = veil * 0.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "miter";
      ctx.miterLimit = 2;
      ctx.lineWidth = 3.4;
      ctx.strokeStyle = "rgba(255,255,255,0.28)";
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
      ctx.lineWidth = 11;
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      strokePoly(ctx, HEX);
      ctx.lineWidth = 5.2;
      ctx.strokeStyle = "rgba(214,214,214,0.55)";
      strokePoly(ctx, HEX);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "rgba(255,255,255,0.78)";
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
      let segment = "final";
      let pose: Pose;
      if (reduced) {
        pose = finalPose();
      } else {
        const sampled = sampleLoop(elapsed);
        segment = sampled.segment;
        pose = poseAt(sampled.t);
        if (segment === "hold") pose.phase = "hold";
        else if (segment === "hexagon") pose.phase = "hexagon";
      }
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
          stage.dataset.segment = segment;
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
      if (elapsed > LOOP * 4) elapsed -= LOOP * 4;

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
