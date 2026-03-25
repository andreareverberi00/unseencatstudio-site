"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { MediaItem, Project } from "@/lib/data";
import MediaLightbox from "@/components/MediaLightbox";

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

        {project.media.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 rounded-2xl border border-border bg-surface p-4 md:p-6"
          >
            <h3 className="font-display text-lg font-bold md:text-xl">Media Gallery</h3>
            <ProjectMediaCarousel mediaItems={project.media} />
          </motion.div>
        ) : null}

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
            className="pressable inline-flex items-center gap-3 rounded-xl px-8 py-4 font-display text-lg font-bold text-white transition-all duration-300 hover:shadow-[0_0_40px_var(--glow)]"
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

function ProjectMediaCarousel({ mediaItems }: { mediaItems: MediaItem[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;
    const step = container.clientWidth / 3;
    container.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  const isLightboxOpen = lightboxIndex !== null;
  const activeLightboxIndex = lightboxIndex ?? 0;

  return (
    <div className="mt-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          Click a media to open fullscreen
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCard("left")}
            className="rounded-full border border-border bg-elevated p-2 text-secondary transition-colors hover:border-border-light hover:bg-white/10 hover:text-foreground"
            aria-label="Scroll gallery left"
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard("right")}
            className="rounded-full border border-border bg-elevated p-2 text-secondary transition-colors hover:border-border-light hover:bg-white/10 hover:text-foreground"
            aria-label="Scroll gallery right"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2"
      >
        {mediaItems.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-video w-[85%] shrink-0 snap-start overflow-hidden rounded-xl border border-border sm:w-[48%] lg:w-[31.8%]"
            aria-label={`Open media ${index + 1} in fullscreen`}
          >
            {item.type === "video" ? (
              <>
                {item.poster ? (
                  <Image
                    src={item.poster}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 32vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-surface to-[#1a0000]" />
                )}
                <div className="absolute inset-0 grid place-items-center bg-black/30">
                  <PlayIcon />
                </div>
              </>
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 32vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </button>
        ))}
      </div>

      {isLightboxOpen ? (
        <MediaLightbox
          items={mediaItems}
          activeIndex={activeLightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrevious={() =>
            setLightboxIndex(
              (prev) => ((prev ?? 0) - 1 + mediaItems.length) % mediaItems.length,
            )
          }
          onNext={() =>
            setLightboxIndex(
              (prev) => ((prev ?? 0) + 1) % mediaItems.length,
            )
          }
        />
      ) : null}
    </div>
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

function ArrowLeftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
