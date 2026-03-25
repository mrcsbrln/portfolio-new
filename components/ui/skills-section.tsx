"use client";

import { motion } from "framer-motion";

const skills = [
    {
        category: "Frontend",
        items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    },
    {
        category: "Backend",
        items: ["Node.js", "PostgreSQL", "REST APIs"],
    },
    {
        category: "Tools",
        items: ["Git", "Figma", "Docker"],
    },
];

export function SkillsSection() {
    return (
        <section
            id="skills"
            className="w-full bg-neutral-50 dark:bg-neutral-900 py-28 md:py-36"
        >
            <div className="max-w-[1440px] mx-auto px-6">
                {/* Section label */}
                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="font-mono text-xs tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-12"
                >
                    02 / Skills
                </motion.p>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-16"
                >
                    What I work with
                </motion.h2>

                {/* Categories */}
                <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
                    {skills.map((group, i) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: 0.1 + i * 0.08,
                                ease: "easeOut",
                            }}
                            className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-12 py-7"
                        >
                            {/* Category label */}
                            <span className="font-mono text-xs tracking-[0.15em] uppercase text-neutral-400 dark:text-neutral-500 w-24 shrink-0">
                                {group.category}
                            </span>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {group.items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="font-mono text-xs px-3 py-1.5
                                                   border border-neutral-200 dark:border-neutral-700
                                                   text-neutral-700 dark:text-neutral-300
                                                   hover:border-neutral-900 dark:hover:border-white
                                                   hover:text-neutral-900 dark:hover:text-white
                                                   transition-colors duration-150 cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
