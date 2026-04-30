"use client";

import Image from "next/image";
import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import { mainGame, type ImageAsset, type MediaItem } from "@/lib/data";
import MediaLightbox from "./MediaLightbox";

export default function CurrentProject({
  carouselMedia,
  thumbnailImage,
}: {
  carouselMedia: MediaItem[];
  thumbnailImage: ImageAsset;
}) {
  return (
    <section id="current-project" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(192,57,43,0.02)] to-transparent" />

      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <AnimateOnScroll>
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-accent">
            Now in Development
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-[55px]">
            Our Current Game
          </h2>
        </AnimateOnScroll>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
          <AnimateOnScroll delay={0.1}>
            <ProjectMediaCarousel
              carouselMedia={carouselMedia}
              thumbnailFallback={thumbnailImage}
            />
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2}>
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold md:text-3xl">
                {mainGame.title}
              </h3>
              <p className="leading-relaxed text-secondary">
                {mainGame.description}
              </p>
              <a
                href={mainGame.steamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-accent-light hover:shadow-[0_0_30px_rgba(192,57,43,0.3)]"
              >
                <SteamIcon />
                View on Steam
              </a>

              <div className="mt-6 w-full overflow-hidden rounded-lg">
                <iframe
                  src={`https://store.steampowered.com/widget/${mainGame.steamWidgetId}/`}
                  width="646"
                  height="190"
                  className="w-full border border-border"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

function ProjectMediaCarousel({
  carouselMedia,
  thumbnailFallback,
}: {
  carouselMedia: MediaItem[];
  thumbnailFallback: ImageAsset;
}) {
  const mediaItems =
    carouselMedia.length > 0
      ? carouselMedia
      : [
          {
            type: "image" as const,
            src: thumbnailFallback.src,
            alt: thumbnailFallback.alt,
          },
        ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const activeMedia = mediaItems[activeIndex];

  const showPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const showNext = () => {
    setActiveIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const isLightboxOpen = lightboxIndex !== null;
  const activeLightboxIndex = lightboxIndex ?? 0;

  return (
    <div className="space-y-3">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-surface">
        {activeMedia.type === "video" ? (
          <video
            key={activeMedia.src}
            src={activeMedia.src}
            poster={activeMedia.poster}
            controls
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={activeMedia.src}
            alt={activeMedia.alt}
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover"
            priority
          />
        )}

        <button
          type="button"
          onClick={showPrevious}
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-black/55 p-2 text-white transition-colors hover:border-white/40 hover:bg-white/20"
          aria-label="Previous media"
        >
          <ArrowLeftIcon />
        </button>
        <button
          type="button"
          onClick={showNext}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-black/55 p-2 text-white transition-colors hover:border-white/40 hover:bg-white/20"
          aria-label="Next media"
        >
          <ArrowRightIcon />
        </button>

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {mediaItems.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open media ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                index === activeIndex
                  ? "bg-white"
                  : "bg-white/35 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setLightboxIndex(activeIndex)}
          className="absolute inset-0 z-10"
          aria-label="Open media fullscreen"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {mediaItems.map((item, index) => (
          <button
            key={`${item.src}-thumb-${index}`}
            type="button"
            onClick={() => {
              setActiveIndex(index);
              setLightboxIndex(index);
            }}
            className={`relative aspect-video overflow-hidden rounded-lg border ${
              activeIndex === index ? "border-accent" : "border-border"
            }`}
            aria-label={`Show ${item.alt}`}
          >
            {item.type === "video" ? (
              <>
                {item.poster ? (
                  <Image
                    src={item.poster}
                    alt={item.alt}
                    fill
                    sizes="120px"
                    className="object-cover"
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
                sizes="120px"
                className="object-cover"
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
              (prev) =>
                ((prev ?? 0) - 1 + mediaItems.length) % mediaItems.length,
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

function SteamIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.49 1.013 2.445-.397.957-1.488 1.41-2.445 1.012l.002.003-.016.007zm8.407-8.37c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  );
}
