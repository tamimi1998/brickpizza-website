"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const tiles = [
  { src: "/gallery/placeholder-1.svg", label: "Detroit lace edge" },
  { src: "/gallery/placeholder-2.svg", label: "From the deck" },
  { src: "/gallery/placeholder-3.svg", label: "NY fold" },
  { src: "/gallery/placeholder-4.svg", label: "Salmiya nights" },
  { src: "/gallery/placeholder-1.svg", label: "Add your shoot" },
  { src: "/gallery/placeholder-2.svg", label: "Add your shoot" },
];

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-6 bg-[#0a0503] px-4 py-24 sm:px-6 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-2xl"
        >
          <h2 className="font-[family-name:var(--font-hero-display)] text-4xl font-bold text-white md:text-5xl">
            Gallery
          </h2>
          <p className="mt-3 text-amber-100/65">
            Cinematic food photography placeholders—swap for on-brand assets from @brickpizzakw when licensed.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {tiles.map((t, i) => (
            <motion.div
              key={`${t.src}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.05, duration: 0.5 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#140a07] ${
                i === 0 ? "col-span-2 aspect-[2/1] md:col-span-2 md:row-span-1" : "aspect-square"
              }`}
            >
              <Image
                unoptimized
                src={t.src}
                alt=""
                fill
                className="object-cover opacity-85 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                sizes="(max-width: 768px) 45vw, 33vw"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-3 text-xs font-medium uppercase tracking-[0.12em] text-white/85">
                {t.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
