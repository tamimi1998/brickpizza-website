"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode, type RefObject } from "react";
import Lenis from "lenis";
import { registerGsapPlugins, gsap, ScrollTrigger } from "@/lib/gsap";
import { usePerformanceContext } from "@/components/PerformanceProvider";

const LenisRefContext = createContext<RefObject<Lenis | null> | null>(null);

/** Ref is populated after mount; read `.current` in event handlers for the live Lenis instance. */
export function useLenisRef() {
  const ref = useContext(LenisRefContext);
  if (!ref) {
    throw new Error("useLenisRef must be used within SmoothScrollProvider");
  }
  return ref;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const { useLenis, reducedMotion } = usePerformanceContext();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    registerGsapPlugins();
    document.documentElement.style.scrollBehavior = reducedMotion ? "auto" : "";

    if (!useLenis) {
      lenisRef.current = null;
      ScrollTrigger.refresh();
      return () => {
        ScrollTrigger.refresh();
      };
    }

    const lenisInstance = new Lenis({
      duration: reducedMotion ? 0 : 1.12,
      smoothWheel: !reducedMotion,
      touchMultiplier: 1.12,
      autoRaf: false,
    });
    lenisRef.current = lenisInstance;

    lenisInstance.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenisInstance.scrollTo(value, { immediate: true });
        }
        return lenisInstance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const ticker = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(ticker);
      lenisInstance.destroy();
      lenisRef.current = null;
      ScrollTrigger.refresh();
    };
  }, [useLenis, reducedMotion]);

  return <LenisRefContext.Provider value={lenisRef}>{children}</LenisRefContext.Provider>;
}
