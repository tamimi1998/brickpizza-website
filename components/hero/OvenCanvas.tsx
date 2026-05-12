"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, type MutableRefObject } from "react";
import { OvenScene } from "./OvenScene";

type MouseRef = MutableRefObject<{ x: number; y: number }>;

export type OvenCanvasProps = {
  progressRef: MutableRefObject<number>;
  mouseRef: MouseRef;
};

export function OvenCanvas({ progressRef, mouseRef }: OvenCanvasProps) {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        gl={{
          alpha: false,
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        className="h-full w-full touch-none"
        dpr={[1, 2]}
        shadows
        camera={{ position: [0, 0.38, 4.35], fov: 38, near: 0.1, far: 80 }}
      >
        <color attach="background" args={["#0c0704"]} />
        <fog attach="fog" args={["#1a0c08", 4, 22]} />
        <Suspense fallback={null}>
          <OvenScene progressRef={progressRef} mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
