"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { BRICK_SITE } from "@/lib/site";

export function MobileFloatingCtas() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="pointer-events-auto mx-auto flex max-w-lg items-end justify-between gap-3 px-4 pb-5 pt-2">
        <motion.a
          href={BRICK_SITE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Instagram @brickpizzakw"
          className="relative flex size-14 items-center justify-center rounded-2xl border border-white/20 bg-[#0a0503]/90 text-amber-100 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md transition-transform hover:scale-105 active:scale-[0.98]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <span
            className="absolute inset-0 rounded-2xl opacity-70"
            style={{
              boxShadow: "0 0 28px rgba(255, 120, 70, 0.5), inset 0 0 20px rgba(255, 160, 90, 0.15)",
            }}
          />
          <svg
            className="relative z-[1] size-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="3.8" />
            <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
          </svg>
        </motion.a>

        <motion.a
          href={BRICK_SITE.talabatUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-orange-400/50 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 px-6 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#1a0602] shadow-[0_0_40px_rgba(255,120,50,0.55)]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.55), transparent 45%)",
              animation: "ember-pulse 2.8s ease-in-out infinite",
            }}
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:animate-pulse" />
          <ShoppingBag className="relative z-[1] size-5 shrink-0" strokeWidth={2} />
          <span className="relative z-[1]">Order Now</span>
        </motion.a>
      </div>
    </div>
  );
}
