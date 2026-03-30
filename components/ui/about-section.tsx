"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section
      id="about"
      className="w-full bg-white dark:bg-neutral-950 py-28 md:py-36"
    >
      <div className="max-w-360 mx-auto px-6">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-12"
        >
          01 / About
        </motion.p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-4/5 w-full max-w-md">
              {/* Offset frame */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 border border-neutral-300 dark:border-white/20" />
              {/* Image */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/images/marcus-hartmann.jpg"
                  alt="Marcus Hartmann"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-2">
                Marcus Hartmann
              </h2>
              <p className="font-mono text-sm text-neutral-400 dark:text-neutral-500 tracking-wide">
                Frontend Developer
              </p>
            </div>

            <div className="w-10 h-px bg-neutral-200 dark:bg-neutral-800" />

            <div className="flex flex-col gap-4 text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
              <p>
                Pharmacist turned Developer. I started by automating healthcare
                workflows and stayed for the logic of clean code. Now, I focus
                on building responsive, SEO-friendly interfaces that solve
                real-world problems. Currently bridging the gap between Frontend
                precision and Full-Stack ambitions.
              </p>
              <p>
                <span className="text-neutral-900 dark:text-white font-medium">
                  What I do:
                </span>{" "}
                I translate complex mockups into pixel-perfect, logical code
                with a focus on performance and accessibility.
              </p>
              <p>
                <span className="text-neutral-900 dark:text-white font-medium">
                  My goal:
                </span>{" "}
                To evolve from a frontend specialist into a versatile Full-Stack
                Developer, building end-to-end digital solutions.
              </p>
              <p>
                <span className="text-neutral-900 dark:text-white font-medium">
                  The X-Factor:
                </span>{" "}
                I combine the analytical mindset of a Pharmacist with modern dev
                tools to create reliable, high-stakes-ready software.
              </p>
            </div>

            <div className="flex gap-4 pt-2">
              <a
                href="#contact"
                className="font-mono text-xs tracking-widest uppercase text-neutral-900 dark:text-white
                                           border border-neutral-900 dark:border-white px-5 py-2.5
                                           hover:bg-neutral-900 hover:text-white
                                           dark:hover:bg-white dark:hover:text-neutral-900
                                           transition-colors duration-200"
              >
                Contact
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
