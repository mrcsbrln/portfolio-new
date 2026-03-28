"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    name: "E-Commerce",
    description:
      "Fullstack E-commerce application built with NextJS, Typescript and Prisma ORM.",
    tags: ["Next.js", "TypeScript", "Prisma"],
    github: "https://github.com/mrcsbrln/next-ecommerce",
    live: "https://next-ecommerce-three-weld.vercel.app/",
    image: "/images/projects/ecommerce.png",
  },
  {
    name: "CoinPulse",
    description:
      "A cryptocurrency dashboard built with NextJS, Typescript, Tradingview, Shadcn UI and coingecko demo API.",
    tags: ["Next.js", "TypeScript"],
    github: "https://github.com/mrcsbrln/coinpulse",
    live: "https://coinpulse-lime.vercel.app/",
    image: "/images/projects/coinpulse.png",
  },
  {
    name: "DA Bubble",
    description:
      "A Slack Clone for team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.",
    tags: ["Angular", "TypeScript", "Firebase"],
    github: "https://github.com/DanieleDona1/DABubble",
    live: "https://dabubble.marcus-hartmann.net/",
    image: "/images/projects/da-bubble.png",
  },
  {
    name: "Join",
    description:
      "Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.",
    tags: ["JavaScript", "HTML", "CSS", "Firebase"],
    github: "https://github.com/KevinPerret/Join",
    live: "https://join.marcus-hartmann.net/",
    image: "/images/projects/join.png",
  },
  {
    name: "El Pollo Loco",
    description:
      "Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.",
    tags: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/mrcsbrln/el_pollo_loco",
    live: "https://elpolloloco.marcus-hartmann.net/",
    image: "/images/projects/el-pollo-loco.png",
  },
  {
    name: "NgMovie",
    description:
      "An Angular-based webpage that retrieves movie data via The Movie Database (TMDB) API.",
    tags: ["Angular", "TypeScript", "REST API"],
    github: "https://github.com/mrcsbrln/ng-movie",
    live: "https://ngmovie.marcus-hartmann.net/",
    image: "/images/projects/ngmovie.png",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <motion.article
      variants={itemVariants}
      className="group flex flex-col border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-50 dark:bg-neutral-900"
    >
      {/* Screenshot */}
      <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-800/60 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-400 dark:text-neutral-600">
              Screenshot
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="flex-1 space-y-2">
          <h3 className="font-bold tracking-tight text-neutral-900 dark:text-white">
            {project.name}
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-widest uppercase px-2 py-1
                         border border-neutral-200 dark:border-neutral-700
                         text-neutral-500 dark:text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-widest uppercase
                         text-neutral-500 dark:text-neutral-400
                         hover:text-neutral-900 dark:hover:text-white
                         transition-colors duration-200 flex items-center gap-1.5"
            >
              GitHub ↗
            </a>
          )}
          <a
            href={project.live || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-widest uppercase
                       text-neutral-500 dark:text-neutral-400
                       hover:text-neutral-900 dark:hover:text-white
                       transition-colors duration-200 flex items-center gap-1.5"
          >
            Live ↗
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="w-full min-h-dvh bg-white dark:bg-neutral-950 py-20 md:py-28 flex flex-col justify-center"
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
          03 / Projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-12"
        >
          Selected work
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
