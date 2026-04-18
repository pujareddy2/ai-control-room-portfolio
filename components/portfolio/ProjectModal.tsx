"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/lib/portfolio";

interface ProjectModalProps {
  project: (typeof PROJECTS)[0] | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-gray-900 border border-cyan-400/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-cyan-300 transition text-2xl z-10 bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center"
              >
                ✕
              </button>

              {/* Header with project image */}
              <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-950 border-b border-cyan-400/20 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-cyan-300 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-lg font-mono">
                    {project.subtitle}
                  </p>
                </div>
                <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-cyan-500 via-transparent to-blue-500" />
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Summary */}
                <div>
                  <h4 className="text-cyan-300 text-lg font-mono mb-3">
                    📌 SUMMARY
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Detailed Description */}
                <div>
                  <h4 className="text-cyan-300 text-lg font-mono mb-3">
                    📄 DETAILS
                  </h4>
                  <div className="space-y-4">
                    {project.paragraphs.map((para, idx) => (
                      <p key={idx} className="text-gray-300 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <h4 className="text-cyan-300 text-lg font-mono mb-3">
                      ⭐ KEY HIGHLIGHTS
                    </h4>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 text-gray-300 items-start"
                        >
                          <span className="text-cyan-400 mt-1">▸</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <h4 className="text-cyan-300 text-lg font-mono mb-3">
                    🛠️ TECH STACK
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 rounded text-sm font-mono hover:bg-cyan-500/20 transition"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-6 border-t border-gray-700/50">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 rounded font-mono hover:bg-cyan-500/30 transition text-center"
                    >
                      🌐 Live Demo
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-gray-700/50 border border-gray-600/50 text-gray-300 rounded font-mono hover:bg-gray-600/50 transition text-center"
                    >
                      💻 GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
