"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { invalidate } from "@react-three/fiber";
import { registerGsapPlugins, ScrollTrigger } from "@/lib/gsap";
import { BRICK_SITE, EXTERNAL_REL } from "@/lib/site";
const OvenCanvas = dynamic(
  () =>
    import("@/components/hero/OvenCanvas").then((m) => ({
      default: m.OvenCanvas,
    })),
  { ssr: false, loading: () => <div className="h-full w-full bg-[#0c0704]" aria-hidden /> },
);

export function HeroOvenExperience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const progress = useMotionValue(0);
  const glowX = useSpring(50, { stiffness: 40, damping: 22 });
  const glowY = useSpring(45, { stiffness: 40, damping: 22 });

  const fireVeilOpacity = useTransform(progress, [0.55, 0.92], [0, 0.92]);
  const edgeBurnOpacity = useTransform(progress, [0.62, 0.98], [0, 1]);
  const canvasBlur = useTransform(progress, [0.72, 1], [0, 3.2]);
  const textLift = useTransform(progress, [0, 0.35, 0.85], [0, 0, -28]);
  const textFade = useTransform(progress, [0.65, 0.92], [1, 0]);
  const heroGradient = useMotionTemplate`radial-gradient(120% 90% at ${glowX}% ${glowY}%, rgba(255,120,48,0.45) 0%, transparent 55%)`;
  const canvasFilter = useMotionTemplate`blur(${canvasBlur}px)`;
  const glowOverlayOpacity = useTransform(progress, [0, 0.5], [0.55, 1]);
  const scrollHintOpacity = useTransform(progress, [0, 0.25], [1, 0]);
  const menuBridgeOpacity = useTransform(progress, [0.65, 1], [0.2, 1]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    registerGsapPlugins();
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scrub = prefersReduce ? 0 : 1.15;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        progress.set(self.progress);
        invalidate();
      },
    });

    return () => trigger.kill();
  }, [progress]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      mouseRef.current = { x: nx, y: ny };
      glowX.set(50 + nx * 18);
      glowY.set(45 + ny * 14);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [glowX, glowY]);

  return (
    <section ref={sectionRef} id="home" className="relative h-[420vh] w-full bg-[#0a0503]">
      <div className="hero-cinema-vignette sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="hero-cinema-grain absolute inset-0 z-0 origin-center"
          style={{
            filter: canvasFilter,
          }}
        >
          <OvenCanvas progressRef={progressRef} mouseRef={mouseRef} />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen"
          style={{
            background: heroGradient,
            opacity: glowOverlayOpacity,
          }}
        />

        <motion.div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            opacity: fireVeilOpacity,
            background:
              "radial-gradient(circle at 50% 40%, rgba(255,200,120,0.75) 0%, rgba(255,80,20,0.35) 45%, rgba(12,4,2,0.95) 100%)",
          }}
        />

        <motion.div
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            opacity: edgeBurnOpacity,
            boxShadow: "inset 0 0 120px 40px rgba(255,90,30,0.55)",
          }}
        />

        <div className="relative z-[4] flex h-full w-full flex-col items-center justify-center px-6 pt-16">
          <motion.div
            className="max-w-4xl text-center"
            style={{ y: textLift, opacity: textFade }}
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.45em] text-amber-200/75">
              Brick Pizza Kuwait · Salmiya
            </p>
            <h1 className="font-[family-name:var(--font-hero-display)] text-[clamp(2.75rem,10vw,6.5rem)] leading-[0.95] font-bold tracking-tight text-white drop-shadow-[0_12px_48px_rgba(0,0,0,0.85)]">
              Detroit Pizza,
              <br />
              <span className="bg-gradient-to-r from-amber-100 via-orange-200 to-orange-400 bg-clip-text text-transparent">
                Fired to Perfection
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-amber-50/85 md:text-xl">
              Crafted in heat. Finished with obsession.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <a
                href={BRICK_SITE.talabatUrl}
                target="_blank"
                rel={EXTERNAL_REL}
                className="cta-external rounded-full border border-orange-500/35 bg-gradient-to-r from-amber-200/95 via-orange-400 to-amber-500 px-10 py-3.5 text-sm font-bold tracking-wide text-[#1a0602] shadow-[0_0_32px_rgba(255,140,66,0.4)]"
              >
                View Full Menu
              </a>
              <a
                href={BRICK_SITE.talabatUrl}
                target="_blank"
                rel={EXTERNAL_REL}
                className="cta-external rounded-full border border-amber-400/40 bg-black/40 px-10 py-3.5 text-sm font-semibold tracking-wide text-amber-50 backdrop-blur-md hover:border-orange-300/70 hover:bg-black/55"
              >
                Order Online
              </a>
            </div>
          </motion.div>

          <motion.p
            className="absolute bottom-10 text-xs font-medium uppercase tracking-[0.35em] text-amber-200/50"
            style={{ opacity: scrollHintOpacity }}
          >
            Scroll into the oven
          </motion.p>
        </div>

        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-32 bg-gradient-to-b from-transparent to-[#120805]"
          style={{
            opacity: menuBridgeOpacity,
          }}
        />
      </div>
    </section>
  );
}
