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
    <div
      className="fixed inset-0 z-[10050] flex flex-col bg-black/95 pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen gallery"
    >
      <div className="flex shrink-0 justify-end px-3 pt-2 md:px-6 md:pt-3">
        <button
          type="button"
          onClick={onClose}
          className="flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full border border-white/35 bg-black/60 text-white transition-colors hover:border-white/55 hover:bg-white/15 active:bg-white/25"
          aria-label="Close fullscreen gallery"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="relative mx-auto flex min-h-0 w-full max-w-6xl flex-1 items-center justify-center px-3 pb-3 md:px-6 md:pb-6">
        {activeItem.type === "video" ? (
          <video
            key={activeItem.src}
            src={activeItem.src}
            poster={activeItem.poster}
            controls
            playsInline
            autoPlay
            className="max-h-full w-full rounded-lg border border-white/20 bg-black object-contain"
          />
        ) : (
          <div className="relative h-full w-full min-h-0">
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
          className="absolute left-1 top-1/2 z-20 flex min-h-11 min-w-11 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-white/35 bg-black/60 text-white transition-colors hover:border-white/55 hover:bg-white/15 active:bg-white/25 md:left-3"
          aria-label="Previous media"
        >
          <ArrowLeftIcon />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="absolute right-1 top-1/2 z-20 flex min-h-11 min-w-11 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full border border-white/35 bg-black/60 text-white transition-colors hover:border-white/55 hover:bg-white/15 active:bg-white/25 md:right-3"
          aria-label="Next media"
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
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
