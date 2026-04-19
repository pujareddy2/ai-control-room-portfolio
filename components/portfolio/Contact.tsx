"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { GitHub, LinkedIn } from "../ui/icons";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Contact form will submit to API route
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        alert("Message sent! I'll get back to you soon.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section id="contact" className="relative border-t border-gray-700/30 bg-gradient-to-b from-black via-slate-950/45 to-black px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex justify-center gap-2 font-mono text-lg font-bold tracking-[0.08em] text-amber-100/95 md:text-xl">
            <span>📨</span>
            <span>CONTACT ME</span>
          </div>
          <p className="mt-5 mx-auto max-w-2xl text-base font-semibold text-gray-300 md:text-lg">
            Open to opportunities and collaborations in Applied Ai.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl border border-white/15 bg-slate-950/65 p-8 backdrop-blur">
              <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-gray-400 text-sm mb-6">I&apos;ll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-mono text-amber-100/90">YOUR NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-white/15 bg-black/45 px-4 py-3 text-white placeholder-gray-500 transition focus:border-amber-200/50 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-mono text-amber-100/90">YOUR EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-white/15 bg-black/45 px-4 py-3 text-white placeholder-gray-500 transition focus:border-amber-200/50 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-mono text-amber-100/90">YOUR MESSAGE</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full resize-none rounded-xl border border-white/15 bg-black/45 px-4 py-3 text-white placeholder-gray-500 transition focus:border-amber-200/50 focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-200/45 bg-amber-100/10 py-3 font-mono text-amber-100 transition hover:bg-amber-100/18"
                >
                  <span>SEND MESSAGE</span>
                  <span>→</span>
                </button>
              </form>
            </div>
          </motion.div>

          {/* Direct Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="mb-6 flex gap-2 font-mono text-sm text-amber-100/90">
              <span>🔗</span>
              <span>DIRECT CONTACT</span>
            </div>

            <a
              href="mailto:middepuja1005@gmail.com"
              className="group block rounded-2xl border border-white/15 bg-slate-950/65 p-6 transition hover:border-amber-200/40 hover:bg-slate-950/80"
            >
              <div className="mb-2 text-2xl text-amber-200">📧</div>
              <div className="text-gray-400 text-sm font-mono mb-1">EMAIL</div>
              <div className="font-mono text-white transition group-hover:text-amber-100">
                middepuja1005@gmail.com
              </div>
            </a>

            <a
              href="tel:+919121290915"
              className="group block rounded-2xl border border-white/15 bg-slate-950/65 p-6 transition hover:border-amber-200/40 hover:bg-slate-950/80"
            >
              <div className="mb-2 text-2xl text-amber-200">📱</div>
              <div className="text-gray-400 text-sm font-mono mb-1">PHONE</div>
              <div className="font-mono text-white transition group-hover:text-amber-100">
                +91 9121290915
              </div>
            </a>

            <div className="rounded-2xl border border-white/15 bg-slate-950/65 p-6">
              <div className="mb-2 text-2xl text-amber-200">📍</div>
              <div className="text-gray-400 text-sm font-mono mb-1">LOCATION</div>
              <div className="text-white font-mono">Hyderabad, India</div>
            </div>

            <div className="pt-6 border-t border-gray-700/50">
              <div className="text-gray-400 text-sm font-mono mb-4">SOCIAL PRESENCE</div>
              <div className="flex gap-4">
                <a
                  href="https://github.com/pujareddy2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-black/45 text-gray-300 transition hover:border-amber-200/45 hover:text-amber-100"
                  title="GitHub"
                >
                  <GitHub className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/puja-midde3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-black/45 text-gray-300 transition hover:border-amber-200/45 hover:text-amber-100"
                  title="LinkedIn"
                >
                  <LinkedIn className="h-5 w-5" />
                </a>
                <a
                  href="https://puja-portfolio-lime.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-black/45 text-gray-300 transition hover:border-amber-200/45 hover:text-amber-100"
                  title="Portfolio"
                >
                  <span>🌐</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
