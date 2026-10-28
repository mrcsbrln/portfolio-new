"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useParticleText } from "@/components/ui/use-particle-text";

const EASE = [0.16, 1, 0.3, 1] as const;

// Static CSS stand-in for the WebGL aurora
const AURORA_FALLBACK =
  "bg-[radial-gradient(ellipse_at_20%_30%,rgba(255,255,255,0.07),transparent_55%),radial-gradient(ellipse_at_80%_40%,rgba(255,255,255,0.05),transparent_55%)]";

export function ParticleHero({
  title = "Marcus Hartmann",
  shockwave = false,
}: {
  title?: string;
  shockwave?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const fallback = useParticleText(sectionRef, canvasRef, slotRef, {
    lines: [title],
    mobileLines: title.split(" "),
    budget: { mobile: 10000, desktop: 30000 },
    // The name has to be readable almost immediately
    introSpread: 0.35,
    introRamp: 0.4,
    spawnRadius: 140,
    pointScale: 0.85,
    aurora: true,
    shockwave,
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

      <h1
        className={
          fallback
            ? "relative text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white text-center"
            : "sr-only"
        }
      >
        {title}
      </h1>

      {/* The particles assemble inside this slot */}
      {!fallback && (
        <div
          ref={slotRef}
          aria-hidden="true"
          data-nav-tint
          className="w-[calc(100%+2rem)] -mx-4 sm:mx-0 sm:w-full max-w-[96rem] h-[30svh] sm:h-[22svh] min-h-32"
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { delay: 0.6, duration: 0.5, ease: EASE }
        }
        className="relative z-10 mt-6 flex flex-col items-center text-center"
      >
        <p className="font-mono text-xl sm:text-3xl tracking-widest uppercase text-neutral-400 mb-6">
          Frontend Developer
        </p>

        <a
          href="#contact"
          className="inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase
                     px-8 py-4 text-white backdrop-blur-xs bg-white/10
                     hover:bg-white/60 hover:text-neutral-900
                     transition-colors duration-200"
        >
          Contact me
          <span>→</span>
        </a>
      </motion.div>
    </section>
  );
}
