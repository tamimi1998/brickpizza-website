"use client";

import * as F from "three";
import { useFrame } from "@react-three/fiber";
import { type MutableRefObject, useMemo, useRef } from "react";

const vert = /* glsl */ `
uniform float uTime;
uniform float uStrength;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 p = position;
  p.x += sin(uv.y * 10.0 + uTime * 2.5) * 0.04 * uStrength;
  p.y += cos(uv.x * 8.0 + uTime * 1.8) * 0.035 * uStrength;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const frag = /* glsl */ `
uniform float uStrength;
varying vec2 vUv;
void main() {
  float a = (0.04 + uStrength * 0.12) * smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x);
  vec3 col = vec3(1.0, 0.78, 0.55);
  gl_FragColor = vec4(col, a);
}
`;

type Props = { progressRef: MutableRefObject<number> };

/** Subtle heat shimmer quad in front of camera path. */
export function HeatDistortionShader({ progressRef }: Props) {
  const matRef = useRef<F.ShaderMaterial>(null);
  const meshRef = useRef<F.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uStrength: { value: 0 },
    }),
    [],
  );

  useFrame(({ clock }) => {
    const m = matRef.current;
    const mesh = meshRef.current;
    const p = progressRef.current;
    const s = p * p;
    if (mesh) {
      mesh.visible = s > 0.02;
      mesh.scale.set(s * 3.2 + 0.5, s * 2.4 + 0.4, 1);
    }
    if (!m) return;
    m.uniforms.uTime.value = clock.elapsedTime;
    m.uniforms.uStrength.value = s;
  });

  return (
    <mesh ref={meshRef} position={[0, 0.2, 2.8]} visible={false} renderOrder={15}>
      <planeGeometry args={[1, 1, 48, 36]} />
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
