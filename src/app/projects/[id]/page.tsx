import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProjectById } from "@/lib/data";
import ProjectContent from "./ProjectContent";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Unseen Cat Studio`,
    description: project.overview,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 md:px-10">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 text-sm text-secondary transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon />
            <span>Back to all projects</span>
          </Link>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at top, ${project.color}08 0%, transparent 60%)`,
            }}
          />
          <div className="relative mx-auto max-w-5xl px-6 md:px-10">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="rounded-full border border-border px-3 py-1">
                {project.engine}
              </span>
              <span className="rounded-full border border-border px-3 py-1">
                {project.date}
              </span>
              <span className="rounded-full border border-border px-3 py-1">
                {project.duration}
              </span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-black tracking-tight md:text-7xl">
              <span style={{ color: project.color }}>{project.title}</span>
            </h1>

            <p className="mt-3 font-display text-lg text-secondary md:text-xl">
              {project.tagline}
            </p>

            <p className="mt-2 text-sm text-muted">{project.context}</p>
          </div>
        </section>

        {/* Content */}
        <ProjectContent project={project} />

        {/* Footer */}
        <div className="border-t border-border py-12">
          <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
            <Link
              href="/#projects"
              className="text-sm text-secondary transition-colors hover:text-foreground"
            >
              &larr; Back to all projects
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:-translate-x-1"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
