"use client";

import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import { projects, type Project, type Tech } from "@/lib/projects";
import { LayoutGrid, type LayoutGridCard } from "@/components/ui/layout-grid";
import {
  IconAngular,
  IconCSS,
  IconFirebase,
  IconHTML,
  IconJavaScript,
  IconMistral,
  IconN8n,
  IconNextjs,
  IconPrisma,
  IconRestAPI,
  IconSQLite,
  IconSupabase,
  IconTailwind,
  IconTypeScript,
} from "@/components/ui/skill-icons";

const techIcons: Record<Tech, ComponentType<SVGProps<SVGSVGElement>>> = {
  "Next.js": IconNextjs,
  TypeScript: IconTypeScript,
  Supabase: IconSupabase,
  n8n: IconN8n,
  "Mistral AI": IconMistral,
  SQLite: IconSQLite,
  Tailwind: IconTailwind,
  Prisma: IconPrisma,
  Angular: IconAngular,
  Firebase: IconFirebase,
  JavaScript: IconJavaScript,
  HTML: IconHTML,
  CSS: IconCSS,
  "REST API": IconRestAPI,
};

// Bento layout for 3 columns: 2+1 / 1+1+1 / 1+2
const tileSpans = ["md:col-span-2", "", "", "", "", "", "lg:col-span-2"];

const linkClassName =
  "font-mono text-[0.625rem] tracking-widest uppercase text-neutral-300 hover:text-white transition-colors duration-200";

function TechStack({ tags }: { tags: Tech[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-3" aria-label="Tech stack">
      {tags.map((tech) => {
        const Icon = techIcons[tech];
        return (
          <li key={tech} title={tech}>
            <Icon
              aria-hidden
              className="h-5 w-5 brightness-0 invert opacity-70 transition-opacity duration-200 group-hover:opacity-100"
            />
            <span className="sr-only">{tech}</span>
          </li>
        );
      })}
    </ul>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <h3 className="font-bold tracking-tight text-white">{project.name}</h3>
      <TechStack tags={project.tags} />
    </div>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="max-w-xl space-y-4">
      <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-white">
        {project.name}
      </h3>
      <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
        {project.description}
      </p>
      <TechStack tags={project.tags} />
      <div className="flex items-center gap-6 pt-3 border-t border-neutral-800">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            GitHub ↗
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            Live ↗
          </a>
        )}
      </div>
    </div>
  );
}

const cards: LayoutGridCard[] = projects.map((project, i) => ({
  id: i,
  title: project.name,
  className: tileSpans[i] ?? "",
  thumbnail: project.image,
  preview: <ProjectPreview project={project} />,
  content: <ProjectDetails project={project} />,
}));

export function ProjectsSection() {
  return (
    <section id="projects" className="w-full bg-neutral-950 py-28 md:py-36">
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
          className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-12"
        >
          Selected work
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <LayoutGrid cards={cards} />
        </motion.div>
      </div>
    </section>
  );
}
