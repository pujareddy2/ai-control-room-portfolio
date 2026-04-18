"use client";

import Navigation from "./Navigation";
import { Starfield } from "./StarField";
import Hero from "./Hero";
import About from "./About";
import Experience from "./Experience";
import SkillsCarousel from "./SkillsCarousel";
import Projects from "./Projects";
import Certifications from "./Certifications";
import Contact from "./Contact";

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

export default function PortfolioPage() {
  return (
    <div className="w-full min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <Starfield />
      <Navigation />

      <main className="relative z-10">
        <section id="about">
          <Hero />
        </section>

        <section id="experience">
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
      </main>

      <Footer />
    </div>
  );
}
