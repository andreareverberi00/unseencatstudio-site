import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CurrentProject from "@/components/CurrentProject";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Divider />
        <CurrentProject />
        <Divider />
        <Projects />
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
