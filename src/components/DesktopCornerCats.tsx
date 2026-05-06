import Image from "next/image";

/**
 * Decorative peeking cats — fixed to viewport corners, wide desktop only.
 * `2xl` (1536px): roomy desktop; hidden on smaller breakpoints.
 * z-[45]: above page sections, below Navigation (50) and modals/lightbox.
 *
 * In dev, `unoptimized` skips `/_next/image` so edits under `public/` match what you see.
 */
const devNoImageOpt = process.env.NODE_ENV === "development";

/**
 * Same layout box for both sides. With `object-contain`, tall art usually hits the height
 * limit first — so shrinking only `max-width` barely changes the drawn size. Keep vw/vh
 * and px caps in proportion (here vs the 700px-wide step): 550/700 → 33vw & 55vh.
 */
const cornerBoxClass =
  "h-[min(55vh,660px)] w-[min(33vw,550px)]";

const imgClass = "h-full w-full object-contain";

export default function DesktopCornerCats() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[45] hidden 2xl:block"
      aria-hidden
    >
      <div className={`absolute bottom-0 left-0 ${cornerBoxClass}`}>
        <Image
          src="/images/decor/white-cat.png"
          alt=""
          width={3260}
          height={5783}
          sizes="550px"
          unoptimized={devNoImageOpt}
          loading="lazy"
          fetchPriority="low"
          className={`${imgClass} object-left-bottom`}
        />
      </div>
      <div className={`absolute bottom-0 right-0 ${cornerBoxClass}`}>
        <Image
          src="/images/decor/grey-cat.png"
          alt=""
          width={3236}
          height={5806}
          sizes="550px"
          unoptimized={devNoImageOpt}
          loading="lazy"
          fetchPriority="low"
          className={`${imgClass} object-right-bottom`}
        />
      </div>
    </div>
  );
}
