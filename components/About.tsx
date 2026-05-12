"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export function About() {
  return (
    <section id="about" className="scroll-mt-6 bg-[#0e0805] px-4 py-24 sm:px-6 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-orange-900/35 via-[#1a0f0a] to-[#060302]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(255,140,70,0.35),transparent_50%)]" />
          <div className="absolute inset-0 flex items-center justify-center p-8 text-center md:p-10">
            <p className="font-[family-name:var(--font-hero-display)] text-2xl leading-tight text-white/92 md:text-3xl">
              Upload hero photography here — brick oven, cheese lace, Salmiya nights.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-orange-300/80">
            <Flame className="size-4 text-orange-400" strokeWidth={1.5} />
            About Brick Pizza Kuwait
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-hero-display)] text-4xl font-bold text-white md:text-5xl">
            Fire, dough & obsession
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-amber-100/75">
            Brick Pizza Kuwait brings Detroit-style edges and New York-style swagger to Salmiya—served with the heat,
            smoke, and glow you expect from a real brick oven. We care about the cheese line, the ferment, and the moment
            your first slice cracks.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-amber-100/75">
            Dine in, pickup, or delivery. Join us Monday through Saturday in Salmiya—closed Sundays. Sauces, dessert, and cold drinks complete the spread.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
