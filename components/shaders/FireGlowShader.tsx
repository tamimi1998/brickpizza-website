"use client";

import * as F from "three";
import { useFrame } from "@react-three/fiber";
import { type MutableRefObject, useMemo, useRef } from "react";

const vert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const frag = /* glsl */ `
uniform float uTime;
uniform float uProgress;
varying vec2 vUv;
void main() {
  vec2 c = vUv - 0.5;
  float d = length(c);
  float core = smoothstep(0.55, 0.0, d);
  float rim = smoothstep(0.2, 0.48, d) * smoothstep(0.62, 0.35, d);
  float flicker = 0.85 + 0.15 * sin(uTime * 3.2 + d * 6.0);
  float p = uProgress;
  vec3 warm = mix(vec3(1.0, 0.35, 0.08), vec3(1.0, 0.7, 0.25), vUv.y + 0.2);
  float a = (core * 0.55 + rim * 0.25) * flicker * (0.85 + p * 0.4);
  gl_FragColor = vec4(warm, a);
}
`;

type Props = {
  progressRef: MutableRefObject<number>;
};

/** Additive oven bloom plate behind fire sheets. */
export function FireGlowShader({ progressRef }: Props) {
  const matRef = useRef<F.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
    }),
    [],
  );

  useFrame(({ clock }) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value = clock.elapsedTime;
    m.uniforms.uProgress.value = progressRef.current;
  });

  return (
    <mesh position={[0, -0.05, 0.35]} rotation={[0, 0, 0]} renderOrder={-2}>
      <planeGeometry args={[4.2, 3.2, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
        transparent
        depthWrite={false}
        blending={F.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}
