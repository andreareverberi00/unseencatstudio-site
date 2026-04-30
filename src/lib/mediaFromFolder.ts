import fs from "node:fs";
import path from "node:path";
import type { ImageAsset, MediaItem } from "@/lib/data";

const IMAGE_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
  ".svg",
]);

function sanitizePublicSubfolder(input: string): string | null {
  const n = input.trim().replace(/\\/g, "/").replace(/^\/+/, "");
  if (!n || n.includes("..")) return null;
  return n;
}

export function loadImagesFromPublicFolder(folderPathUnderPublic: string): MediaItem[] {
  const rel = sanitizePublicSubfolder(folderPathUnderPublic);
  if (!rel) return [];

  const absDir = path.join(process.cwd(), "public", rel);
  if (!fs.existsSync(absDir) || !fs.statSync(absDir).isDirectory()) return [];

  return fs
    .readdirSync(absDir)
    .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => {
      const slug = file.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
      return {
        type: "image" as const,
        src: `/${rel}/${file}`,
        alt: slug || file,
      };
    });
}

export function resolveGalleryMedia(
  mediaFolder: string | undefined,
  fallback: MediaItem[],
): MediaItem[] {
  if (!mediaFolder?.trim()) return fallback;
  const fromFolder = loadImagesFromPublicFolder(mediaFolder);
  return fromFolder.length > 0 ? fromFolder : fallback;
}

export function resolveThumbnailFromFolder(
  mediaFolder: string | undefined,
  fallback: ImageAsset,
): ImageAsset {
  if (!mediaFolder?.trim()) return fallback;
  const fromFolder = loadImagesFromPublicFolder(mediaFolder);
  if (fromFolder.length === 0) return fallback;
  return { src: fromFolder[0].src, alt: fallback.alt };
}
