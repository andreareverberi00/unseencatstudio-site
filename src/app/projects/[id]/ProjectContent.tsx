"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/data";

export default function ProjectContent({ project }: { project: Project }) {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-surface p-6 md:p-10"
        >
          <h2 className="font-display text-xl font-bold md:text-2xl">Overview</h2>
          <p className="mt-4 leading-relaxed text-secondary">{project.overview}</p>
        </motion.div>

        {/* Sections */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {project.sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className="rounded-2xl border border-border bg-surface p-6 md:p-8"
            >
              <h3
                className="font-display text-lg font-bold"
                style={{ color: project.color }}
              >
                {section.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Play CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href={project.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl px-8 py-4 font-display text-lg font-bold text-white transition-all duration-300 hover:shadow-[0_0_40px_var(--glow)]"
            style={
              {
                backgroundColor: project.color,
                "--glow": `${project.color}40`,
              } as React.CSSProperties
            }
          >
            <PlayIcon />
            {project.playLabel}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}
