"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const skills = [
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "Next.js",    icon: "/icons/nextjs.svg" },
  { name: "Firebase",   icon: "/icons/firebase.svg" },
  { name: "Angular",    icon: "/icons/angular.svg" },
  { name: "Claude Code",icon: "/icons/claude-color.svg" },
  { name: "n8n",        icon: "/icons/n8n.svg" },
  { name: "Git",        icon: "/icons/git.svg" },
  { name: "REST API",   icon: "/icons/rest-api.svg" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function SkillCard({ skill }: { skill: { name: string; icon: string } }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group flex flex-col items-center gap-3 cursor-default select-none"
    >
      <div className="relative w-14 h-14">
        <Image
          src={skill.icon}
          alt={skill.name}
          fill
          sizes="56px"
          className="object-contain brightness-0 invert"
        />
      </div>
      <span className="font-mono text-[10px] tracking-wide text-center text-white/50 group-hover:text-white/90 transition-colors duration-150">
        {skill.name}
      </span>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full min-h-dvh bg-neutral-900 py-28 md:py-36 flex flex-col justify-center"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-500 mb-12"
        >
          02 / Skills
        </motion.p>

        {/* Two-column layout: ~40% text card + ~60% grid */}
        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">

          {/* Left: text card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:w-[38%] shrink-0 rounded-2xl border border-white/10 p-8 md:p-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">
              What I work with
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              Placeholder text. I build modern web applications with a focus on
              performance, developer experience, and clean interfaces.
            </p>
          </motion.div>

          {/* Right: skills grid */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={containerVariants}
              className="grid grid-cols-4 gap-10"
            >
              {skills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
