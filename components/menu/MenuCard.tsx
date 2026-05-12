"use client";

import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import type { MenuItem } from "@/lib/menu-data";

const spring = { stiffness: 320, damping: 28 };

function formatKd(n: number) {
  return `KD ${n.toFixed(3)}`;
}

function Steam() {
  return (
    <div className="pointer-events-none absolute -top-3 left-1/2 flex w-24 -translate-x-1/2 justify-center gap-1 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="steam-wisp block h-8 w-2 rounded-full bg-gradient-to-t from-white/0 via-white/25 to-white/0"
          style={{
            animation: `steam-rise 2.2s ease-in-out ${i * 0.35}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function MenuCard({ item }: { item: MenuItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useSpring(0, spring);
  const rotY = useSpring(0, spring);

  const onMove = (e: PointerEvent<Element>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rotY.set((px - 0.5) * 12);
    rotX.set((0.5 - py) * 10);
  };

  const onLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareBg = useMotionTemplate`radial-gradient(60% 50% at ${glareX}% ${glareY}%, rgba(255,200,140,0.14), transparent 70%)`;

  const onMoveGlare = (e: PointerEvent<Element>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    glareX.set(((e.clientX - r.left) / r.width) * 100);
    glareY.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={(e) => {
        onMove(e);
        onMoveGlare(e);
      }}
      onPointerLeave={() => {
        onLeave();
        glareX.set(50);
        glareY.set(50);
      }}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className="group/card relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.08] via-black/35 to-black/60 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-shadow duration-500 group-hover/card:shadow-[0_32px_100px_rgba(255,100,40,0.12)]">
        <Steam />
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{ background: glareBg }}
        />
        {item.bestSeller ? (
          <span className="relative z-[1] mb-3 inline-block rounded-full border border-amber-400/50 bg-amber-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-100">
            Best seller
          </span>
        ) : null}
        <div className="relative z-[1] flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <h3 className="font-[family-name:var(--font-hero-display)] text-xl leading-tight text-white md:text-2xl">
            {item.name}
          </h3>
          <span className="shrink-0 font-mono text-sm font-semibold tracking-wide text-orange-200 md:text-base">
            {formatKd(item.priceKd)}
          </span>
        </div>
        {item.description ? (
          <p className="relative z-[1] mt-4 text-sm leading-relaxed text-amber-100/68">{item.description}</p>
        ) : null}
        <div
          className="pointer-events-none absolute -bottom-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-orange-400/35 to-transparent opacity-0 transition-opacity group-hover/card:opacity-100"
          aria-hidden
        />
      </div>
    </motion.article>
  );
}
