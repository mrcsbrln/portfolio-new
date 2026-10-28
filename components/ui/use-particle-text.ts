"use client";

import { Geometry, Mesh, Program, Renderer, Transform, Triangle } from "ogl";
import { type RefObject, useEffect, useRef, useState } from "react";

const vertex = /* glsl */ `
  attribute vec2 position;
  attribute float random;
  attribute float speed;
  uniform vec2 uResolution;
  uniform float uDpr;
  uniform float uSize;
  varying float vAlpha;

  void main() {
    vec2 clip = (position / uResolution) * 2.0 - 1.0;
    gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
    // Fast particles grow a little and light up
    float boost = min(speed * 0.06, 0.6);
    gl_PointSize = (1.6 + random * 1.8 + boost * 1.5) * uSize * uDpr;
    vAlpha = 0.55 + random * 0.45 + boost;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    gl_FragColor = vec4(vec3(1.0), a);
  }
`;

const auroraVertex = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Very dark, slowly drifting graphite glows on neutral-950 with film grain
const auroraFragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float glow(vec2 p, vec2 center, float spread) {
    vec2 d = p - center;
    return exp(-dot(d, d) * spread);
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 p = vec2(vUv.x * aspect, vUv.y);
    float t = uTime;

    vec2 c1 = vec2((0.25 + 0.12 * sin(t * 0.045)) * aspect, 0.72 + 0.10 * cos(t * 0.037));
    vec2 c2 = vec2((0.75 + 0.10 * cos(t * 0.032)) * aspect, 0.60 + 0.12 * sin(t * 0.051));
    vec2 c3 = vec2((0.50 + 0.18 * sin(t * 0.026 + 1.7)) * aspect, 0.88 + 0.06 * sin(t * 0.041));

    // Neutral graphite tones only, no hue
    vec3 color = vec3(10.0 / 255.0);
    float light = glow(p, c1, 3.2) * 0.06
                + glow(p, c2, 3.6) * 0.048
                + glow(p, c3, 5.0) * 0.036;

    // Fade out towards the bottom so the next section joins seamlessly
    color += light * smoothstep(0.0, 0.35, vUv.y);

    // Grain hides banding in the dark gradients
    float grain = hash(gl_FragCoord.xy + fract(t * 7.0) * 100.0) - 0.5;
    color += grain * (3.0 / 255.0);

    gl_FragColor = vec4(color, 1.0);
  }
`;

type Wave = { x: number; y: number; t0: number };

export type ParticleTextOptions = {
  /** Lines of text to rasterize; `mobileLines` is used below 640px */
  lines: string[];
  mobileLines?: string[];
  /** Approximate particle count */
  budget?: { mobile: number; desktop: number };
  /** Seconds over which particle springs are staggered in */
  introSpread?: number;
  /** Seconds a single particle's spring takes to reach full strength */
  introRamp?: number;
  /** Max distance (px) particles start from their target; default: anywhere */
  spawnRadius?: number;
  /** Point size multiplier */
  pointScale?: number;
  /** Slowly drifting dark graphite glows behind the particles */
  aurora?: boolean;
  /** Click/tap shockwave; read live, so it can be toggled without a rebuild */
  shockwave?: boolean;
};

// Rasterizes the lines into the slot rect and returns jittered target points
// in canvas (CSS pixel) coordinates.
function sampleTargets(
  slot: DOMRect,
  origin: DOMRect,
  lines: string[],
  fontFamily: string,
  targetCount: number,
) {
  const w = Math.max(1, Math.floor(slot.width));
  const h = Math.max(1, Math.floor(slot.height));
  const ctx = document.createElement("canvas").getContext("2d", {
    willReadFrequently: true,
  });
  if (!ctx || lines.length === 0) return new Float32Array();
  ctx.canvas.width = w;
  ctx.canvas.height = h;

  // Fit the text to the slot: cap height ≈ 0.72 × font size, lines at 0.95em
  const lineHeight = 0.95;
  let size = Math.min(h / (0.8 + (lines.length - 1) * lineHeight), w);
  ctx.font = `700 ${size}px ${fontFamily}`;
  const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
  if (widest > w * 0.94) size *= (w * 0.94) / widest;
  ctx.font = `700 ${size}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  const firstY = h / 2 - ((lines.length - 1) * lineHeight * size) / 2;
  lines.forEach((line, i) =>
    ctx.fillText(line, w / 2, firstY + i * lineHeight * size),
  );

  const data = ctx.getImageData(0, 0, w, h).data;
  const filled = (x: number, y: number) => data[(y * w + x) * 4 + 3] > 128;

  // Coarse pass to estimate glyph area, then pick a grid step for the budget
  let coarse = 0;
  for (let y = 0; y < h; y += 2)
    for (let x = 0; x < w; x += 2) if (filled(x, y)) coarse++;
  const step = Math.max(1.2, Math.sqrt((coarse * 4) / targetCount));

  const points: number[] = [];
  const offsetX = slot.left - origin.left;
  const offsetY = slot.top - origin.top;
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (!filled(Math.floor(x), Math.floor(y))) continue;
      points.push(
        offsetX + x + (Math.random() - 0.5) * step,
        offsetY + y + (Math.random() - 0.5) * step,
      );
    }
  }
  return new Float32Array(points);
}

/**
 * Renders text as interactive WebGL particles: they assemble inside `slotRef`,
 * scatter around the pointer and spring back. The canvas should cover
 * `sectionRef`. Returns true when WebGL is unavailable.
 */
export function useParticleText(
  sectionRef: RefObject<HTMLElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  slotRef: RefObject<HTMLDivElement | null>,
  {
    lines,
    mobileLines = lines,
    budget = { mobile: 5000, desktop: 14000 },
    introSpread = 0.9,
    introRamp = 0.6,
    spawnRadius,
    pointScale = 1,
    aurora = false,
    shockwave = true,
  }: ParticleTextOptions,
) {
  const [fallback, setFallback] = useState(false);
  const shockwaveRef = useRef(shockwave);
  useEffect(() => {
    shockwaveRef.current = shockwave;
  }, [shockwave]);

  // Rebuild only when the text itself changes, not on every render
  const linesKey = JSON.stringify([lines, mobileLines]);
  const { mobile: mobileBudget, desktop: desktopBudget } = budget;

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const slot = slotRef.current;
    if (!section || !canvas || !slot) return;

    const [desktopLines, phoneLines] = JSON.parse(linesKey) as [
      string[],
      string[],
    ];
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let disposed = false;
    let cleanup = () => {};

    const fontFamily =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-geist-sans")
        .trim() || "sans-serif";

    document.fonts
      .load(`700 100px ${fontFamily}`)
      .catch(() => undefined)
      .then(() => {
        if (disposed) return;

        let renderer: Renderer;
        try {
          renderer = new Renderer({
            canvas,
            dpr: Math.min(window.devicePixelRatio, 2),
            alpha: true,
            depth: false,
          });
        } catch {
          setFallback(true);
          return;
        }
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);

        const program = new Program(gl, {
          vertex,
          fragment,
          uniforms: {
            uResolution: { value: [1, 1] },
            uDpr: { value: renderer.dpr },
            uSize: { value: pointScale },
          },
          transparent: true,
          depthTest: false,
          depthWrite: false,
        });
        program.setBlendFunc(gl.SRC_ALPHA, gl.ONE);

        // Background first, particles on top (render list keeps child order)
        const scene = new Transform();
        let auroraProgram: Program | null = null;
        let auroraGeometry: Triangle | null = null;
        if (aurora) {
          auroraProgram = new Program(gl, {
            vertex: auroraVertex,
            fragment: auroraFragment,
            uniforms: {
              uTime: { value: reducedMotion ? 12 : 0 },
              uResolution: { value: [1, 1] },
            },
            depthTest: false,
            depthWrite: false,
          });
          auroraGeometry = new Triangle(gl);
          new Mesh(gl, {
            geometry: auroraGeometry,
            program: auroraProgram,
          }).setParent(scene);
        }

        let count = 0;
        let pos = new Float32Array();
        let vel = new Float32Array();
        let target = new Float32Array();
        let rand = new Float32Array();
        let speed = new Float32Array();
        let geometry: Geometry | null = null;
        let mesh: Mesh | null = null;
        let width = 0;
        let height = 0;

        const pointer = { x: -1e5, y: -1e5 };
        const waves: Wave[] = [];
        const start = performance.now();

        const build = () => {
          const rect = section.getBoundingClientRect();
          width = rect.width;
          height = rect.height;
          renderer.setSize(width, height);
          program.uniforms.uResolution.value = [width, height];
          if (auroraProgram)
            auroraProgram.uniforms.uResolution.value = [width, height];

          const mobile = width < 640;
          target = sampleTargets(
            slot.getBoundingClientRect(),
            rect,
            mobile ? phoneLines : desktopLines,
            fontFamily,
            mobile ? mobileBudget : desktopBudget,
          );
          const next = target.length / 2;
          const prevPos = pos;
          const prevCount = count;

          pos = new Float32Array(next * 2);
          vel = new Float32Array(next * 2);
          rand = new Float32Array(next);
          speed = new Float32Array(next);
          for (let i = 0; i < next; i++) {
            rand[i] = Math.random();
            if (reducedMotion) {
              pos[i * 2] = target[i * 2];
              pos[i * 2 + 1] = target[i * 2 + 1];
            } else if (i < prevCount) {
              // Keep existing particles where they are so they glide over
              pos[i * 2] = prevPos[i * 2];
              pos[i * 2 + 1] = prevPos[i * 2 + 1];
            } else if (spawnRadius) {
              const angle = Math.random() * Math.PI * 2;
              const r = Math.sqrt(Math.random()) * spawnRadius;
              pos[i * 2] = target[i * 2] + Math.cos(angle) * r;
              pos[i * 2 + 1] = target[i * 2 + 1] + Math.sin(angle) * r;
            } else {
              pos[i * 2] = Math.random() * width;
              pos[i * 2 + 1] = Math.random() * height;
            }
          }
          count = next;

          mesh?.setParent(null);
          geometry?.remove();
          geometry = new Geometry(gl, {
            position: { size: 2, data: pos },
            random: { size: 1, data: rand },
            speed: { size: 1, data: speed },
          });
          mesh = new Mesh(gl, { geometry, program, mode: gl.POINTS });
          mesh.setParent(scene);
        };

        const render = () => {
          if (mesh) renderer.render({ scene, sort: false });
        };

        let raf = 0;
        let last = performance.now();
        const tick = (now: number) => {
          raf = requestAnimationFrame(tick);
          const dt = Math.min((now - last) / 16.667, 3);
          last = now;
          const t = (now - start) / 1000;
          if (auroraProgram) auroraProgram.uniforms.uTime.value = t;
          const radius = width < 640 ? 70 : 120;
          const r2 = radius * radius;
          const damping = Math.pow(0.88, dt);

          for (let w = waves.length - 1; w >= 0; w--)
            if (now - waves[w].t0 > 900) waves.splice(w, 1);

          for (let i = 0; i < count; i++) {
            const ix = i * 2;
            const iy = ix + 1;
            const x = pos[ix];
            const y = pos[iy];

            // Staggered intro: each particle's spring fades in over time
            const ramp = Math.min(
              Math.max((t - rand[i] * introSpread) / introRamp, 0),
              1,
            );
            const k = 0.018 * ramp * ramp;
            const shimmer = 0.6 * Math.sin(t * 1.6 + rand[i] * 40);
            vel[ix] += (target[ix] + shimmer - x) * k * dt;
            vel[iy] += (target[iy] - shimmer - y) * k * dt;

            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < r2 && d2 > 0.01) {
              const d = Math.sqrt(d2);
              const f = (1 - d / radius) * 3.2 * dt;
              vel[ix] += (dx / d) * f;
              vel[iy] += (dy / d) * f;
            }

            for (const wave of waves) {
              const age = (now - wave.t0) / 1000;
              const ring = age * 1100;
              const wx = x - wave.x;
              const wy = y - wave.y;
              const wd = Math.sqrt(wx * wx + wy * wy) || 1;
              const band = Math.abs(wd - ring);
              if (band < 50) {
                const f = (1 - band / 50) * 6 * (1 - age / 0.9) * dt;
                vel[ix] += (wx / wd) * f;
                vel[iy] += (wy / wd) * f;
              }
            }

            vel[ix] *= damping;
            vel[iy] *= damping;
            pos[ix] += vel[ix] * dt;
            pos[iy] += vel[iy] * dt;
            speed[i] = Math.sqrt(vel[ix] * vel[ix] + vel[iy] * vel[iy]);
          }

          if (geometry) {
            geometry.attributes.position.needsUpdate = true;
            geometry.attributes.speed.needsUpdate = true;
          }
          render();
        };

        const toLocal = (e: PointerEvent) => {
          const rect = canvas.getBoundingClientRect();
          return { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const onMove = (e: PointerEvent) => Object.assign(pointer, toLocal(e));
        const onLeave = () => Object.assign(pointer, { x: -1e5, y: -1e5 });
        const onDown = (e: PointerEvent) => {
          if (shockwaveRef.current)
            waves.push({ ...toLocal(e), t0: performance.now() });
        };

        // Only animate while the tab is visible and the section is on screen
        let onScreen = true;
        const sync = () => {
          cancelAnimationFrame(raf);
          if (document.hidden || !onScreen) return;
          last = performance.now();
          raf = requestAnimationFrame(tick);
        };
        const intersection = new IntersectionObserver(([entry]) => {
          onScreen = entry.isIntersecting;
          sync();
        });

        build();
        const resize = new ResizeObserver(() => {
          build();
          if (reducedMotion) render();
        });
        resize.observe(section);

        if (reducedMotion) {
          render();
        } else {
          window.addEventListener("pointermove", onMove, { passive: true });
          window.addEventListener("pointerdown", onDown, { passive: true });
          document.documentElement.addEventListener("pointerleave", onLeave);
          document.addEventListener("visibilitychange", sync);
          intersection.observe(section);
          sync();
        }

        cleanup = () => {
          cancelAnimationFrame(raf);
          resize.disconnect();
          intersection.disconnect();
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerdown", onDown);
          document.documentElement.removeEventListener("pointerleave", onLeave);
          document.removeEventListener("visibilitychange", sync);
          geometry?.remove();
          program.remove();
          auroraGeometry?.remove();
          auroraProgram?.remove();
        };
      });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [
    sectionRef,
    canvasRef,
    slotRef,
    linesKey,
    mobileBudget,
    desktopBudget,
    introSpread,
    introRamp,
    spawnRadius,
    pointScale,
    aurora,
  ]);

  return fallback;
}
