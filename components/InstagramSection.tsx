"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BRICK_SITE } from "@/lib/site";
import { Camera } from "lucide-react";

const placeholders = [
  { alt: "Detroit pizza — upload official photo", src: "/gallery/placeholder-1.svg" },
  { alt: "Brick oven slice — upload official photo", src: "/gallery/placeholder-2.svg" },
  { alt: "NY-style pie — upload official photo", src: "/gallery/placeholder-3.svg" },
  { alt: "Interior vibe — upload official photo", src: "/gallery/placeholder-4.svg" },
];

export function InstagramSection() {
  return (
    <section className="overflow-hidden border-y border-white/10 bg-[#0e0805] px-4 py-24 sm:px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-orange-300/80">
              <Camera className="size-4 text-orange-400" strokeWidth={1.5} />
              On Instagram
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-hero-display)] text-4xl font-bold text-white md:text-5xl">
              @brickpizzakw
            </h2>
            <p className="mt-4 max-w-lg text-amber-100/70">
              Visual inspiration only — we don’t scrape protected media. Follow for the real flames, cheese pulls, and
              nightly energy in Salmiya. Replace placeholders below with your licensed photography or Reels stills.
            </p>
          </div>
          <a
            href={BRICK_SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center justify-center rounded-full border border-amber-400/45 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-amber-50 backdrop-blur-md transition-all hover:border-orange-300/70 hover:bg-white/10"
          >
            Follow Brick Pizza Kuwait
          </a>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {placeholders.map((p, i) => (
            <motion.figure
              key={p.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.55 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#2a1810] to-[#0a0503]"
            >
              <Image
                unoptimized
                src={p.src}
                alt={p.alt}
                fill
                className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
                sizes="(max-width: 640px) 100vw, 25vw"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-center text-[10px] uppercase tracking-[0.15em] text-white/70">
                Placeholder
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
