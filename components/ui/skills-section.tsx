"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "Next.js", icon: "/icons/nextjs.svg" },
  { name: "Angular", icon: "/icons/angular.svg" },
  { name: "HTML", icon: "/icons/html.svg" },
  { name: "CSS", icon: "/icons/css.svg" },
  { name: "Firebase", icon: "/icons/firebase.svg" },
  { name: "Git", icon: "/icons/git.svg" },
  { name: "REST API", icon: "/icons/rest-api.svg" },
  { name: "Claude Code", icon: "/icons/claude-color.svg" },
  { name: "n8n", icon: "/icons/n8n.svg" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function SkillCard({ skill }: { skill: { name: string; icon: string } }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group flex flex-col items-center gap-2.5 cursor-default select-none"
    >
      <div className="w-14 h-14 flex items-center justify-center">
        <img
          src={skill.icon}
          alt={skill.name}
          width={56}
          height={56}
          className="object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>
      <span className="font-mono text-[9px] tracking-widest uppercase text-center text-white/30 group-hover:text-white/70 transition-colors duration-200">
        {skill.name}
      </span>
    </motion.div>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full min-h-dvh bg-neutral-900 py-20 md:py-28 flex flex-col justify-center"
    >
      <div className="w-full max-w-360 mx-auto px-6">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-500 mb-10"
        >
          02 / Skills
        </motion.p>

        {/* Main layout: left text + vertical rule + right icons */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-0 md:gap-0">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="pr-0 md:pr-16 lg:pr-32 pb-12 md:pb-0"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-8">
              What I work with
            </h2>

            <div className="space-y-8">
              {/* Block 1 */}
              <div className="border-t border-white/10 pt-6">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-neutral-500 mb-3">
                  Core Stack & Frameworks
                </p>
                <div className="space-y-2.5 text-sm text-neutral-400 leading-relaxed">
                  <p>
                    Frontend Mastery: Deep expertise in TypeScript and
                    JavaScript (ES6+).
                  </p>
                  <p>
                    Frameworks: Extensive experience building production-ready
                    applications using Next.js (React) and Angular.
                  </p>
                  <p>
                    Performance & SEO: I don't just build interfaces; I optimize
                    them. My solid understanding of SEO best practices ensures
                    that performance and discoverability are baked into the code
                    from day one.
                  </p>
                </div>
              </div>

              {/* Block 2 */}
              <div className="border-t border-white/10 pt-6">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-neutral-500 mb-3">
                  AI & Automation Workflow
                </p>
                <div className="space-y-2.5 text-sm text-neutral-400 leading-relaxed">
                  <p>
                    I believe in staying ahead of the curve by integrating the
                    latest AI developments into my development cycle. I'm not
                    just watching the AI space—I'm actively using it to build
                    better software, faster.
                  </p>
                  <p>
                    AI-Driven Development: Proficient in using tools like Claude
                    Code to accelerate coding and refactoring.
                  </p>
                  <p>
                    Workflow Automation: Experience with n8n to build custom
                    automations and bridge the gap between different APIs and
                    services.
                  </p>
                  <p>
                    Continuous Learning: I keep a sharp eye on the rapidly
                    evolving AI landscape to implement the most efficient tools
                    and LLM integrations in my projects.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vertical divider */}
          <div className="hidden md:block bg-white/10" />

          {/* Right: icon grid */}
          <div className="pl-0 md:pl-16 lg:pl-32 flex items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={containerVariants}
              className="grid grid-cols-3 gap-12"
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
