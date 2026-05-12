"use client";

/* eslint-disable react-hooks/immutability -- InstancedMesh buffer updates in useFrame */

import * as F from "three";
import { useFrame } from "@react-three/fiber";
import { type MutableRefObject, useLayoutEffect, useMemo, useRef } from "react";
import { usePerformanceContext } from "@/components/PerformanceProvider";

function detRand(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

type Props = { progressRef: MutableRefObject<number> };

/** Instanced ember orbs — cheaper than updating a full Points buffer each frame on mid devices. */
export function OptimizedParticles({ progressRef }: Props) {
  const { emberCount } = usePerformanceContext();
  const meshRef = useRef<F.InstancedMesh>(null);
  const speeds = useMemo(() => {
    const s = new Float32Array(emberCount);
    for (let i = 0; i < emberCount; i++) s[i] = 0.35 + detRand(i, 4) * 1.15;
    return s;
  }, [emberCount]);

  const phase = useMemo(() => {
    const p = new Float32Array(emberCount);
    for (let i = 0; i < emberCount; i++) p[i] = detRand(i, 9) * Math.PI * 2;
    return p;
  }, [emberCount]);

  const dummy = useMemo(() => new F.Object3D(), []);
  const segs = emberCount < 120 ? 6 : emberCount < 250 ? 10 : 12;
  const geom = useMemo(() => new F.SphereGeometry(0.024, segs, segs), [segs]);
  const mat = useMemo(
    () =>
      new F.MeshBasicMaterial({
        color: new F.Color("#ff9a56"),
        transparent: true,
        opacity: 0.78,
        depthWrite: false,
        blending: F.AdditiveBlending,
      }),
    [],
  );

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < emberCount; i++) {
      dummy.position.set((detRand(i, 1) - 0.5) * 3, detRand(i, 2) * 2 - 0.5, detRand(i, 3) * 2.5 - 0.8);
      dummy.scale.setScalar(0.85 + detRand(i, 5) * 0.5);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [emberCount, dummy]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const burst = progressRef.current;
    const t = clock.elapsedTime;
    for (let i = 0; i < emberCount; i++) {
      mesh.getMatrixAt(i, dummy.matrix);
      dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
      dummy.position.y += speeds[i] * 0.0045 * (1 + burst * 2.1);
      dummy.position.x += Math.sin(t * 2 + i) * 0.001 * (1 + burst);
      if (dummy.position.y > 2.4) {
        dummy.position.y = -0.85;
        dummy.position.x = (detRand(i, 300 + Math.floor(t * 8)) - 0.5) * 3;
        dummy.position.z = detRand(i, 400 + Math.floor(t * 5)) * 2.5 - 0.8;
      }
      const flick = 1 + 0.12 * Math.sin(t * 4 + phase[i]);
      dummy.scale.setScalar((0.85 + detRand(i, 5) * 0.45) * flick);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.rotation.y = t * 0.04 * (1 + burst * 0.5);
    mat.opacity = 0.62 + burst * 0.22;
  });

  return <instancedMesh ref={meshRef} args={[geom, mat, emberCount]} />;
}
