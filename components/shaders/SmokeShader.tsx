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

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.35;
  float n = noise(uv * 4.0 + vec2(t, -t * 1.2));
  float puff = smoothstep(0.15, 0.75, uv.x) * smoothstep(0.15, 0.75, 1.0 - uv.x);
  puff *= smoothstep(0.0, 0.4, uv.y) * smoothstep(1.0, 0.55, uv.y);
  float a = puff * (0.07 + 0.06 * n) * (0.7 + uProgress * 0.45);
  vec3 col = vec3(0.35, 0.32, 0.3);
  gl_FragColor = vec4(col, a);
}
`;

type Props = { progressRef: MutableRefObject<number>; offset?: [number, number, number] };

export function SmokeShader({ progressRef, offset = [0.15, 0.25, 0.85] }: Props) {
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
    <mesh position={offset} rotation={[0.15, -0.08, 0]} renderOrder={3}>
      <planeGeometry args={[1.8, 2.2, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
        transparent
        depthWrite={false}
        blending={F.NormalBlending}
        toneMapped={false}
      />
    </mesh>
  );
}
