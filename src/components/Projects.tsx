"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimateOnScroll from "./AnimateOnScroll";
import type { Project } from "@/lib/data";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <AnimateOnScroll>
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-accent">
            Portfolio
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-5xl">
            Our Games
          </h2>
          <p className="mt-4 max-w-xl text-secondary">
            A few games we&apos;ve shipped along the way. Each one taught us
            something new about making things people love (and fear).
          </p>
        </AnimateOnScroll>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <AnimateOnScroll key={project.id} delay={i * 0.12}>
              <ProjectCard project={project} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
      <Link
        href={`/projects/${project.id}`}
        className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 hover:border-border-light hover:shadow-[0_0_40px_rgba(0,0,0,0.3)]"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {project.thumbnailImage.src ? (
            <Image
              src={project.thumbnailImage.src}
              alt={project.thumbnailImage.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 320px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : null}
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${project.color}20, ${project.color}10, #111111)`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display text-5xl font-black opacity-10 transition-opacity duration-500 group-hover:opacity-20"
              style={{ color: project.color }}
            >
              {project.title.charAt(0)}
            </span>
          </div>
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at center, ${project.color}10, transparent 70%)`,
            }}
          />
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold md:text-[25px]">{project.title}</h3>
            <span className="text-xs text-muted">{project.date}</span>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-secondary">
            {project.tagline}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
