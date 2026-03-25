"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { MediaItem } from "@/lib/data";

interface MediaLightboxProps {
  items: MediaItem[];
  activeIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function MediaLightbox({
  items,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}: MediaLightboxProps) {
  const activeItem = items[activeIndex];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 p-3 md:p-6">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full border border-white/30 bg-black/45 px-3 py-1.5 text-sm text-white transition-colors hover:border-white/50 hover:bg-white/20"
        aria-label="Close fullscreen gallery"
      >
        Close
      </button>

      <div className="relative mx-auto flex h-full w-full max-w-6xl items-center justify-center">
        {activeItem.type === "video" ? (
          <video
            key={activeItem.src}
            src={activeItem.src}
            poster={activeItem.poster}
            controls
            autoPlay
            className="max-h-full w-full rounded-lg border border-white/20 bg-black object-contain"
          />
        ) : (
          <div className="relative h-full w-full">
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              fill
              sizes="100vw"
              className="rounded-lg object-contain"
              priority
            />
          </div>
        )}

        <button
          type="button"
          onClick={onPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 p-3 text-white transition-colors hover:border-white/50 hover:bg-white/20 md:left-4"
          aria-label="Previous media"
        >
          <ArrowLeftIcon />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 p-3 text-white transition-colors hover:border-white/50 hover:bg-white/20 md:right-4"
          aria-label="Next media"
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="18"
      height="18"
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
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
