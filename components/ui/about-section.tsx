"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="w-full bg-neutral-950 py-28 md:py-36">
      <div className="max-w-360 mx-auto px-6">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-500 mb-12"
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
              <div className="absolute inset-0 translate-x-3 translate-y-3 border border-white/20" />
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
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">
                Marcus Hartmann
              </h2>
              <p className="font-mono text-sm text-neutral-500 tracking-wide">
                Frontend Developer
              </p>
            </div>

            <div className="w-10 h-px bg-neutral-800" />

            <div className="flex flex-col gap-4 text-neutral-400 text-base leading-relaxed">
              <p>
                Pharmacist turned developer. Working in oncology, I kept running
                into the limits of digitalization in healthcare: for
                data-protection reasons, a lot still ran on fax machines,
                printouts and binders. I started building my first small apps
                with Microsoft Power Apps to move those processes into the
                digital world — and found out how much I enjoy writing software.
                So I trained as a frontend developer.
              </p>
              <p>
                <span className="text-white font-medium">What I do: </span>Today
                I work exclusively on digital and tech topics: websites, a
                headless CMS migration with Sanity and Next.js, AI integrations
                and n8n automations, and small custom tools that take real work
                off people&apos;s plates.
              </p>
              <p>
                <span className="text-white font-medium">How I work:</span>{" "}
                Close to the people who use what I build — clarifying
                requirements directly and improving step by step, from the first
                idea to deployment. Claude Code is my daily pair programmer;
                architecture and code quality stay my call.
              </p>
              <p>
                <span className="text-white font-medium">The X-Factor: </span>I
                speak both languages — the domain side and the tech side.
                Combined with a pharmacist&apos;s analytical, careful mindset,
                that turns everyday friction into reliable software.
              </p>
            </div>

            <div className="flex gap-4 pt-2">
              <a
                href="#contact"
                className="font-mono text-xs tracking-widest uppercase text-white
                                           border border-white px-5 py-2.5
                                           hover:bg-white hover:text-neutral-900
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
