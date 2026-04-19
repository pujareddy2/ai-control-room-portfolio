import ControlRoom from "../components/scene/ControlRoom";
import { Starfield } from "../components/portfolio/StarField";
import About from "../components/portfolio/About";
import Experience from "../components/portfolio/Experience";
import SkillsCarousel from "../components/portfolio/SkillsCarousel";
import Projects from "../components/portfolio/Projects";
import Certifications from "../components/portfolio/Certifications";
import Contact from "../components/portfolio/Contact";
import PortfolioSoundscape from "../components/ui/PortfolioSoundscape";

function Footer() {
  return (
    <footer className="border-t border-gray-700/30 bg-gray-950/50 py-8 px-4">
      <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm font-mono">
        <p>
          Designed & Built by{" "}
          <span className="text-cyan-300">Puja Midde</span>
          {" • "}
          <span className="text-gray-400">Crafted with React, Three.js & Framer Motion</span>
        </p>
        <p className="mt-4 text-gray-600">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden text-white">
      <PortfolioSoundscape />
      <Starfield />

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_20%_8%,rgba(96,165,250,0.13),transparent_42%),radial-gradient(circle_at_85%_18%,rgba(56,189,248,0.1),transparent_38%),linear-gradient(to_bottom,rgba(2,6,23,0.5),rgba(0,0,0,0.82))]" />

      {/* Hero + 3D Control Room */}
      <div className="relative z-10 h-[80vh] min-h-135 max-h-185 w-screen overflow-hidden md:h-[84vh]">
        <div className="absolute inset-0">
          <ControlRoom />
        </div>
      </div>

      <div className="relative z-20 h-12 bg-linear-to-b from-transparent via-black/60 to-black/80 md:h-16" />

      {/* Scrollable Content Sections */}
      <div className="relative z-30 bg-linear-to-b from-black/72 via-black/88 to-black/95 pt-8 md:pt-10">
        <section id="about">
          <About />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="skills">
          <SkillsCarousel />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="certifications">
          <Certifications />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </div>

      <Footer />
    </main>
  );
}
