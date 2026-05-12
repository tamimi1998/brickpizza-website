"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { detectGPUQuality, type QualityPreset } from "@/lib/performance";

export type PerformanceSettings = {
  quality: QualityPreset;
  reducedMotion: boolean;
  /** Lenis + ScrollTrigger scroller proxy */
  useLenis: boolean;
  shadows: boolean;
  /** Full post stack (DOF + bloom + vignette) */
  usePostProcessing: boolean;
  /** Custom shader planes (fire glow, smoke, heat) */
  useShaderLayers: boolean;
  /** Fallback MeshDistort / CSS only */
  useHeatFallback: boolean;
  emberCount: number;
  sparklesCount: readonly [number, number];
  contactShadowBlur: number;
  spotShadowMap: [number, number];
  antialias: boolean;
};

const defaultPerf: PerformanceSettings = {
  quality: "medium",
  reducedMotion: false,
  useLenis: true,
  shadows: true,
  usePostProcessing: false,
  useShaderLayers: true,
  useHeatFallback: false,
  emberCount: 220,
  sparklesCount: [90, 50],
  contactShadowBlur: 2.2,
  spotShadowMap: [2048, 2048],
  antialias: true,
};

const PerformanceContext = createContext<PerformanceSettings>(defaultPerf);

export function usePerformanceContext() {
  return useContext(PerformanceContext);
}

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [quality, setQuality] = useState<QualityPreset>("medium");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const forcedRaw = typeof window !== "undefined" ? localStorage.getItem("brick-quality") : null;
    const forced =
      forcedRaw === "low" || forcedRaw === "medium" || forcedRaw === "high" ? forcedRaw : null;
    // One-shot client read after mount (localStorage + GPU heuristic); intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync tier once hydrated
    setQuality(forced ?? detectGPUQuality());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const value = useMemo<PerformanceSettings>(() => {
    const rm = reducedMotion;
    const q = quality;

    const useLenis = !rm && q !== "low";
    const shadows = q !== "low" && !rm;
    const usePostProcessing = q === "high" && !rm;
    const useShaderLayers = (q === "high" || q === "medium") && !rm;
    const useHeatFallback = q === "low" || rm;

    const emberCount = q === "low" ? 72 : q === "medium" ? 200 : 340;
    const sparklesCount =
      q === "low"
        ? ([32, 20] as const)
        : q === "medium"
          ? ([70, 40] as const)
          : ([120, 72] as const);

    const contactShadowBlur = q === "low" ? 1.6 : 2.2;
    const spotShadowMap = (q === "low" ? [1024, 1024] : [2048, 2048]) as [number, number];
    const antialias = q !== "low";

    return {
      quality: q,
      reducedMotion: rm,
      useLenis,
      shadows,
      usePostProcessing,
      useShaderLayers,
      useHeatFallback,
      emberCount,
      sparklesCount,
      contactShadowBlur,
      spotShadowMap,
      antialias,
    };
  }, [quality, reducedMotion]);

  return (
    <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>
  );
}
