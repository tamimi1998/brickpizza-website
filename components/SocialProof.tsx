"use client";

import { motion } from "framer-motion";

const lines = [
  "Hands down one of the favorite pizza stops in Kuwait.",
  "A must-try slice when you are craving something bold and crisp.",
  "The Detroit-style pies people keep coming back for.",
  "A Salmiya hidden gem for late-night pizza cravings.",
];

export function SocialProof() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-[#0b0604] px-4 py-24 sm:px-6 md:px-12 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,100,40,0.08),_transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center font-[family-name:var(--font-hero-display)] text-3xl text-white md:text-4xl"
        >
          What guests are saying
        </motion.h2>
        <div className="grid gap-5 md:grid-cols-2">
          {lines.map((text, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.55 }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 text-lg leading-relaxed text-amber-50/88 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md"
            >
              {text}
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
