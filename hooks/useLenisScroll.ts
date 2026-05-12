"use client";

import { usePerformanceContext } from "@/components/PerformanceProvider";
import { useLenisRef } from "@/components/SmoothScrollProvider";

export function useLenisScroll() {
  const lenisRef = useLenisRef();
  const { useLenis, reducedMotion } = usePerformanceContext();

  function scrollToHash(hash: string, offset = -72) {
    if (!hash.startsWith("#")) return;
    if (!useLenis || reducedMotion || !lenisRef.current) {
      document.querySelector(hash)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      return;
    }
    lenisRef.current.scrollTo(hash, { offset });
  }

  return { scrollToHash, useLenis, lenisRef };
}
