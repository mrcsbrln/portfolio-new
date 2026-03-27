"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutSection() {
    return (
        <section
            id="about"
            className="w-full bg-white dark:bg-neutral-950 py-28 md:py-36"
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
                        <div className="relative aspect-[4/5] w-full max-w-md">
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
                                Software Engineer & Designer
                            </p>
                        </div>

                        <div className="w-10 h-px bg-neutral-200 dark:bg-neutral-800" />

                        <div className="flex flex-col gap-4 text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
                            <p>
                                I build thoughtful digital products at the intersection of engineering and design.
                                My work focuses on clean interfaces, precise interactions, and code that scales.
                            </p>
                            <p>
                                With a background spanning frontend architecture and visual design,
                                I care deeply about the details that make software feel intentional —
                                from animation timing to component APIs.
                            </p>
                            <p>
                                Currently open to new opportunities and interesting projects.
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
