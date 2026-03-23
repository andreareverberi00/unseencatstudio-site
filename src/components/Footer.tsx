import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted md:flex-row md:px-10">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.studioName}. All rights
          reserved.
        </p>
        <p>Made with sleepless nights in {siteConfig.location}.</p>
      </div>
    </footer>
  );
}
