"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Navigation, Camera, ShoppingBag } from "lucide-react";
import { BRICK_SITE, BUSINESS_HOURS } from "@/lib/site";

export function Location() {
  return (
    <section id="location" className="scroll-mt-6 bg-gradient-to-b from-[#100805] to-[#070404] px-4 py-24 sm:px-6 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:text-left"
        >
          <h2 className="font-[family-name:var(--font-hero-display)] text-4xl font-bold text-white md:text-5xl">
            Visit us in Salmiya
          </h2>
          <p className="mt-3 text-amber-100/70">Brick Pizza Kuwait · Dine in · Pickup · Delivery</p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-6 backdrop-blur-xl">
              <div className="flex gap-4">
                <MapPin className="mt-0.5 size-6 shrink-0 text-orange-400" strokeWidth={1.5} />
                <div>
                  <p className="font-[family-name:var(--font-hero-display)] text-2xl text-white">Brick Pizza</p>
                  <p className="mt-2 text-amber-100/75">Salmiya, Kuwait</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4 rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-md">
              <Clock className="mt-0.5 size-6 shrink-0 text-orange-400" strokeWidth={1.5} />
              <div>
                <p className="font-semibold text-white">Hours</p>
                <p className="mt-2 text-sm leading-relaxed text-amber-100/72">
                  Open {BUSINESS_HOURS.open} – {BUSINESS_HOURS.close}
                  <br />
                  Closed {BUSINESS_HOURS.closedDay}
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/25 p-6 text-sm text-amber-100/65">
              Instagram{" "}
              <a
                href={BRICK_SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-orange-200 hover:text-orange-100"
              >
                {BRICK_SITE.instagramHandle}
              </a>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={BRICK_SITE.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-semibold text-[#1a0a04] shadow-[0_0_28px_rgba(255,140,66,0.35)] transition-transform hover:scale-[1.02]"
              >
                <Navigation className="size-4" strokeWidth={2} />
                Get directions
              </a>
              <a
                href={BRICK_SITE.orderOnlineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-400/45 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-amber-50 backdrop-blur-md hover:border-orange-300/70"
              >
                <ShoppingBag className="size-4" strokeWidth={1.5} />
                Order online
              </a>
              <a
                href={BRICK_SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:border-amber-400/40"
              >
                <Camera className="size-4" strokeWidth={1.5} />
                Follow Instagram
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative min-h-[300px] overflow-hidden rounded-3xl border border-white/10 bg-[#120a07] lg:min-h-[380px]"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
              <p className="text-sm text-amber-200/55">Embed Google Maps here</p>
              <a
                href={BRICK_SITE.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium uppercase tracking-[0.2em] text-orange-300/80 hover:text-orange-200"
              >
                Open in maps →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
