"use client";

import { Canvas } from "@react-three/fiber";
import type { ComponentProps, ReactNode } from "react";
import { useMemo } from "react";
import { usePerformanceContext } from "@/components/PerformanceProvider";

type AdaptiveCanvasProps = Omit<
  ComponentProps<typeof Canvas>,
  "children" | "dpr" | "shadows" | "frameloop"
> & {
  children: ReactNode;
};

export function AdaptiveCanvas({ children, className, gl, camera, ...rest }: AdaptiveCanvasProps) {
  const { quality, reducedMotion, shadows, antialias } = usePerformanceContext();

  const dpr = useMemo<[number, number]>(() => {
    const device = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    let cap = 2;
    if (quality === "low") cap = 1.15;
    else if (quality === "medium") cap = 1.5;
    cap = Math.min(device, cap);
    return [1, cap];
  }, [quality]);

  const frameloop = reducedMotion ? "demand" : "always";

  return (
    <Canvas
      className={className}
      dpr={dpr}
      shadows={shadows}
      frameloop={frameloop}
      gl={{
        alpha: false,
        antialias,
        powerPreference: quality === "low" ? "default" : "high-performance",
        stencil: false,
        depth: true,
        ...gl,
      }}
      camera={camera}
      {...rest}
    >
      {children}
    </Canvas>
  );
}
