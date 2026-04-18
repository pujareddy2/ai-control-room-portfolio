"use client";

import { motion } from "framer-motion";
import { ABOUT } from "../../lib/portfolio";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-block px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-sm">
            <span className="text-sm font-mono text-cyan-300">Applied AI Developer</span>
          </div>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
            {ABOUT.name}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4 font-mono">
          {ABOUT.title}
        </p>

        <p className="text-base md:text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          {ABOUT.summary}
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 bg-cyan-500/20 border border-cyan-400/50 rounded-lg text-cyan-300 font-mono text-sm hover:bg-cyan-500/30 transition"
          >
            Explore Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            className="px-8 py-3 bg-transparent border border-gray-400/30 rounded-lg text-gray-300 font-mono text-sm hover:border-gray-300 transition"
          >
            Get in Touch
          </motion.a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center pt-8 border-t border-gray-700/50">
          <div>
            <div className="text-3xl font-bold text-cyan-300">6+</div>
            <div className="text-sm text-gray-400 mt-1">Internships</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-300">2×</div>
            <div className="text-sm text-gray-400 mt-1">Hackathon Winner</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-cyan-300">8.8/10</div>
            <div className="text-sm text-gray-400 mt-1">CGPA</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
