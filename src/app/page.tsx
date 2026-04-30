import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CurrentProject from "@/components/CurrentProject";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { mainGame, projects } from "@/lib/data";
import {
  resolveGalleryMedia,
  resolveThumbnailFromFolder,
} from "@/lib/mediaFromFolder";

export default async function Home() {
  const mainGameCarouselMedia = resolveGalleryMedia(
    mainGame.mediaFolder,
    mainGame.media,
  );
  const mainGameThumbnail = resolveThumbnailFromFolder(
    mainGame.mediaFolder,
    mainGame.thumbnailImage,
  );
  const projectsForGrid = projects.map((p) => ({
    ...p,
    thumbnailImage: resolveThumbnailFromFolder(p.mediaFolder, p.thumbnailImage),
  }));

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Divider />
        <CurrentProject
          carouselMedia={mainGameCarouselMedia}
          thumbnailImage={mainGameThumbnail}
        />
        <Divider />
        <Projects projects={projectsForGrid} />
        <Divider />
        <About />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Divider() {
  return (
    <div className="mx-auto max-w-5xl px-6 md:px-10">
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
