"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { useParticleText } from "@/components/ui/use-particle-text";

const EASE = [0.16, 1, 0.3, 1] as const;

// Static CSS stand-in for the WebGL aurora
const AURORA_FALLBACK =
  "bg-[radial-gradient(ellipse_at_20%_30%,rgba(255,255,255,0.07),transparent_55%),radial-gradient(ellipse_at_80%_40%,rgba(255,255,255,0.05),transparent_55%)]";

const subscribe = () => () => {};

export function ParticleNotFound() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const path = useSyncExternalStore(
    subscribe,
    () => window.location.pathname,
    () => "",
  );

  const fallback = useParticleText(sectionRef, canvasRef, slotRef, {
    lines: ["404"],
    aurora: true,
  });

  return (
    <section
      ref={sectionRef}
      data-nav-clear
      className={`relative min-h-svh w-full overflow-hidden bg-neutral-950
                 flex flex-col items-center justify-center px-6 pt-24 pb-16 ${
                   fallback ? AURORA_FALLBACK : ""
                 }`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full pointer-events-none"
      />

      <h1 className={fallback ? "relative" : "sr-only"}>
        {fallback ? (
          <span className="block text-[9rem] sm:text-[14rem] font-bold leading-none tracking-tighter text-white">
            404
          </span>
        ) : (
          "404 — Page not found"
        )}
      </h1>

      {/* The particles assemble inside this slot */}
      {!fallback && (
        <div
          ref={slotRef}
          aria-hidden="true"
          data-nav-tint
          className="w-full max-w-5xl h-[26svh] sm:h-[38svh] min-h-40"
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { delay: 1.2, duration: 0.8, ease: EASE }
        }
        className="relative z-10 mt-10 flex flex-col items-center text-center"
      >
        <p className="font-mono text-sm sm:text-base tracking-widest uppercase text-neutral-400">
          Page not found
        </p>
        <p className="mt-3 max-w-full font-mono text-sm text-white break-all">
          {path || " "}
        </p>
        <p className="mt-3 text-neutral-500">
          This path got lost in the noise.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase
                       px-8 py-4 text-white backdrop-blur-xs bg-white/10
                       hover:bg-white/60 hover:text-neutral-900
                       transition-colors duration-200"
          >
            ← Back home
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase
                       px-8 py-4 text-neutral-400 hover:text-white
                       transition-colors duration-200"
          >
            Projects
          </Link>
        </div>

        {!fallback && (
          <p className="mt-10 font-mono text-[0.65rem] tracking-widest uppercase text-neutral-600">
            <span className="pointer-coarse:hidden">
              Move your cursor · click
            </span>
            <span className="hidden pointer-coarse:inline">
              Touch the noise
            </span>
          </p>
        )}
      </motion.div>
    </section>
  );
}
