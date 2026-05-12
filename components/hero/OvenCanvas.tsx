"use client";

import { Suspense, type MutableRefObject } from "react";
import { AdaptiveCanvas } from "@/components/AdaptiveCanvas";
import { OvenScene } from "./OvenScene";

type MouseRef = MutableRefObject<{ x: number; y: number }>;

export type OvenCanvasProps = {
  progressRef: MutableRefObject<number>;
  mouseRef: MouseRef;
};

export function OvenCanvas({ progressRef, mouseRef }: OvenCanvasProps) {
  return (
    <div className="absolute inset-0 h-full w-full">
      <AdaptiveCanvas
        className="h-full w-full touch-none"
        camera={{ position: [0, 0.38, 4.35], fov: 38, near: 0.1, far: 80 }}
      >
        <color attach="background" args={["#0c0704"]} />
        <fog attach="fog" args={["#1a0c08", 4, 22]} />
        <Suspense fallback={null}>
          <OvenScene progressRef={progressRef} mouseRef={mouseRef} />
        </Suspense>
      </AdaptiveCanvas>
    </div>
  );
}
