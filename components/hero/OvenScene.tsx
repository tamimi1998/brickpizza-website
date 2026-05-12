"use client";

/* R3F/Three scenes update cameras, post-processing, and particle buffers imperatively in useFrame. */
/* eslint-disable react-hooks/immutability -- imperative WebGL animation */

import * as F from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Sparkles, MeshDistortMaterial, Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import {
  BloomEffect,
  BlendFunction,
  DepthOfFieldEffect,
  VignetteEffect,
  MaskFunction,
} from "postprocessing";
import { type MutableRefObject, useMemo, useRef, useState } from "react";
import { usePerformanceContext } from "@/components/PerformanceProvider";
import { OptimizedParticles } from "@/components/OptimizedParticles";
import { FireGlowShader } from "@/components/shaders/FireGlowShader";
import { SmokeShader } from "@/components/shaders/SmokeShader";
import { HeatDistortionShader } from "@/components/shaders/HeatDistortionShader";

type MouseRef = MutableRefObject<{ x: number; y: number }>;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function FireSheets({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const group = useRef<F.Group>(null);
  const planeGeo = useMemo(() => new F.PlaneGeometry(1, 1, 1, 1), []);
  const mats = useMemo(() => {
    return [0, 1, 2].map((i) => {
      return new F.MeshBasicMaterial({
        color: new F.Color().setHSL(0.06 + i * 0.015, 1, 0.52 - i * 0.06),
        transparent: true,
        opacity: 0.28 + i * 0.06,
        depthWrite: false,
        blending: F.AdditiveBlending,
        side: F.DoubleSide,
      });
    });
  }, []);

  useFrame(({ clock }) => {
    const intensity = progressRef.current;
    const t = clock.elapsedTime;
    if (!group.current) return;
    group.current.children.forEach((ch, i) => {
      const plane = ch as F.Mesh;
      plane.rotation.z = Math.sin(t * 2.2 + i) * 0.12 + t * 0.08 * (i + 1);
      const s = 1 + 0.08 * Math.sin(t * 3 + i * 1.7) + intensity * 0.05;
      const sx = (2.4 + i * 0.4) * s;
      const sy = (3.2 + i * 0.2) * s;
      plane.scale.set(sx, sy, 1);
    });
    mats.forEach((m, i) => {
      m.opacity = (0.18 + i * 0.07 + intensity * 0.35) * (0.85 + 0.15 * intensity);
    });
  });

  return (
    <group ref={group} position={[0, -0.15, 0.6]}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          rotation={[0, 0, i * 0.35]}
          position={[0.02 * i, 0.04 * i, -0.12 * i]}
          scale={[2.4 + i * 0.4, 3.2 + i * 0.2, 1]}
        >
          <primitive object={planeGeo} attach="geometry" />
          <primitive object={mats[i]} attach="material" />
        </mesh>
      ))}
    </group>
  );
}

function ScrollSparkles({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const g = useRef<F.Group>(null);
  const { sparklesCount } = usePerformanceContext();
  useFrame(({ clock }) => {
    const p = progressRef.current;
    if (!g.current) return;
    g.current.rotation.y = clock.elapsedTime * (0.12 + p * 0.35);
    g.current.rotation.z = Math.sin(clock.elapsedTime * 0.35) * (0.03 + p * 0.06);
  });
  return (
    <group ref={g} position={[0, -0.05, 0.25]}>
      <Sparkles
        count={sparklesCount[0]}
        scale={[3.2, 2.4, 2.2]}
        size={3.5}
        speed={1.15}
        opacity={0.55}
        color="#ffb46b"
      />
      <Sparkles
        count={sparklesCount[1]}
        position={[0, 0.3, 0.2]}
        scale={[0.8, 0.15, 0.8]}
        size={1.6}
        speed={0.45}
        color="#ebebeb"
      />
    </group>
  );
}

function PizzaPeel({
  progressRef,
  mouseRef,
  hovered,
  setHovered,
}: {
  progressRef: MutableRefObject<number>;
  mouseRef: MouseRef;
  hovered: boolean;
  setHovered: (v: boolean) => void;
}) {
  const { quality, shadows } = usePerformanceContext();
  const group = useRef<F.Group>(null);
  const crust = useRef<F.Mesh>(null);
  const cheese = useRef<F.Mesh>(null);
  const bubbles = useRef<F.Group>(null);
  const pepRef = useRef<(F.Mesh | null)[]>([]);

  const castOrNot = shadows;

  useFrame((state) => {
    if (!group.current) return;
    const progress = progressRef.current;
    const into = easeInOutCubic(progress);
    const peelZ = F.MathUtils.lerp(-0.55, 1.15, into);
    const swayX = mouseRef.current.x * 0.09 * (1 - into * 0.6);
    const swayY = mouseRef.current.y * 0.05 * (1 - into * 0.6);
    group.current.position.set(swayX, -0.02 + swayY * 0.5, peelZ);

    const tilt = Math.sin(state.clock.elapsedTime * 1.2) * 0.02 * (0.4 + into);
    group.current.rotation.set(
      -0.12 + tilt,
      -0.05 + mouseRef.current.x * 0.04,
      0.06,
    );

    if (crust.current) {
      const mat = crust.current.material as F.MeshStandardMaterial;
      mat.emissiveIntensity = 0.15 + (hovered ? 0.35 : 0) + into * 0.5;
    }
    if (cheese.current) {
      const ch = cheese.current;
      const stretch = hovered ? 1.035 : 1;
      ch.scale.setScalar(F.MathUtils.lerp(1, stretch, 0.12));
      const mat = ch.material as F.MeshPhysicalMaterial;
      const pulse = Math.sin(state.clock.elapsedTime * 5) * 0.05;
      mat.emissiveIntensity = 0.25 + into * (quality === "high" ? 1.15 : 0.9) + pulse;
    }
    if (bubbles.current) {
      bubbles.current.children.forEach((b, i) => {
        const m = b as F.Mesh;
        const phase = i * 0.7 + state.clock.elapsedTime * 3.5;
        const sc = 1 + 0.18 * Math.sin(phase) + into * 0.12;
        m.scale.setScalar(sc);
      });
    }

    const t = state.clock.elapsedTime;
    pepRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const crisp = hovered ? 1.06 + 0.02 * Math.sin(t * 2.8 + i) : 1;
      mesh.scale.setScalar(crisp);
    });
  });

  const pepperonis = useMemo(
    () =>
      [
        [-0.14, 0.152, -0.06],
        [0.1, 0.152, 0.08],
        [0.02, 0.152, 0.18],
        [-0.08, 0.152, 0.12],
      ] as const,
    [],
  );

  return (
    <group ref={group}>
      <mesh receiveShadow={castOrNot} castShadow={castOrNot} position={[0, -0.08, -0.1]} rotation={[0.04, 0, 0]}>
        <boxGeometry args={[0.52, 0.025, 0.95]} />
        <meshStandardMaterial color="#6b4423" roughness={0.88} metalness={0.05} />
      </mesh>
      <group onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
        <mesh ref={crust} castShadow={castOrNot} rotation={[0.02, 0, 0]} position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.28, 0.3, 0.05, 48]} />
          <meshStandardMaterial
            color="#a0632b"
            roughness={0.82}
            metalness={0.02}
            emissive="#5c3010"
            emissiveIntensity={0.15}
          />
        </mesh>
        <mesh ref={cheese} castShadow={castOrNot} position={[0, 0.12, 0]} rotation={[0.02, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.27, 0.045, 48]} />
          <meshPhysicalMaterial
            color="#f6d68f"
            roughness={quality === "high" ? 0.26 : quality === "medium" ? 0.38 : 0.48}
            metalness={quality === "high" ? 0.14 : 0.08}
            emissive="#f0a64a"
            emissiveIntensity={0.25}
            envMapIntensity={1}
            clearcoat={quality === "high" ? 0.42 : quality === "medium" ? 0.18 : 0}
            clearcoatRoughness={0.4}
          />
        </mesh>
        <group ref={bubbles} position={[0, 0.14, 0]}>
          {Array.from({ length: 14 }).map((_, i) => {
            const a = (i / 14) * Math.PI * 2 + i * 0.2;
            const r = 0.08 + (i % 3) * 0.04;
            return (
              <mesh
                key={i}
                position={[Math.cos(a) * r, 0, Math.sin(a) * r * 0.9]}
                castShadow={castOrNot}
              >
                <sphereGeometry args={[0.022 + (i % 4) * 0.004, 12, 12]} />
                <meshStandardMaterial
                  color="#ffe6a8"
                  emissive="#ffbd67"
                  emissiveIntensity={0.6}
                  roughness={0.35}
                />
              </mesh>
            );
          })}
        </group>
        {pepperonis.map((p, i) => (
          <mesh
            key={i}
            ref={(el) => {
              pepRef.current[i] = el;
            }}
            position={p}
            castShadow={castOrNot}
          >
            <cylinderGeometry args={[0.045, 0.045, 0.012, 16]} />
            <meshStandardMaterial
              color="#8c2a18"
              emissive="#3d0c06"
              emissiveIntensity={0.2}
              roughness={0.55}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function OvenInterior() {
  const { shadows } = usePerformanceContext();
  const recv = shadows;
  return (
    <group position={[0, 0.1, 0.45]}>
      <mesh receiveShadow={recv} position={[0, 0.9, -0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[3.2, 2.4, 0.35]} />
        <meshStandardMaterial color="#3d2920" roughness={0.95} metalness={0.02} />
      </mesh>
      <mesh receiveShadow={recv} position={[0, -0.2, -0.45]}>
        <boxGeometry args={[3.2, 1.2, 0.2]} />
        <meshStandardMaterial color="#4a3428" roughness={0.92} />
      </mesh>
      <mesh receiveShadow={recv} position={[-1.35, 0.35, 0.15]}>
        <boxGeometry args={[0.35, 1.8, 1.6]} />
        <meshStandardMaterial color="#5c4032" roughness={0.9} />
      </mesh>
      <mesh receiveShadow={recv} position={[1.35, 0.35, 0.15]}>
        <boxGeometry args={[0.35, 1.8, 1.6]} />
        <meshStandardMaterial color="#5c4032" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.25, -0.12]} rotation={[0.45, 0, 0]}>
        <torusGeometry args={[0.95, 0.06, 12, 48, Math.PI]} />
        <meshStandardMaterial
          color="#6a4836"
          roughness={0.88}
          emissive="#2a1810"
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh position={[0, 0.05, 0.05]}>
        <ringGeometry args={[0.55, 1.25, 48]} />
        <meshStandardMaterial
          color="#2a150c"
          roughness={0.75}
          metalness={0.1}
          emissive="#ff5a1a"
          emissiveIntensity={0.35}
          side={F.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function DemandInvalidate() {
  const { invalidate } = useThree();
  const { reducedMotion } = usePerformanceContext();
  useFrame(() => {
    if (reducedMotion) invalidate();
  });
  return null;
}

function ScrollCameraRig({
  progressRef,
  mouseRef,
}: {
  progressRef: MutableRefObject<number>;
  mouseRef: MouseRef;
}) {
  const { camera } = useThree();
  const vec = useRef(new F.Vector3());
  const look = useRef(new F.Vector3());

  useFrame(() => {
    const p = progressRef.current;
    const e = easeInOutCubic(p);
    const mx = mouseRef.current.x * (0.14 * (1 - e * 0.85));
    const my = mouseRef.current.y * (0.1 * (1 - e * 0.85));

    vec.current.set(mx, 0.38 + my * 0.2 + e * -0.22, F.MathUtils.lerp(4.35, 0.72, e));
    camera.position.lerp(vec.current, 0.08);

    const lx = mx * 0.5;
    const ly = F.MathUtils.lerp(0.08, -0.05, e);
    const lz = F.MathUtils.lerp(-0.35, 0.85, e);
    look.current.set(lx, ly, lz);
    camera.lookAt(look.current);

    const cam = camera as F.PerspectiveCamera;
    cam.fov = F.MathUtils.lerp(38, 48, e * e * 0.85);
    cam.updateProjectionMatrix();
  });

  return null;
}

function HeatHaze({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const meshRef = useRef<F.Mesh>(null);
  useFrame(() => {
    const strength = progressRef.current ** 2;
    if (!meshRef.current) return;
    meshRef.current.visible = strength > 0.02;
    meshRef.current.scale.set(strength * 3.2 + 0.5, strength * 2.4 + 0.4, 1);
  });
  return (
    <mesh ref={meshRef} position={[0, 0.2, 2.8]} visible={false}>
      <planeGeometry args={[1, 1, 32, 24]} />
      <MeshDistortMaterial
        speed={3.2}
        distort={0.48}
        radius={0.7}
        transparent
        opacity={0.09}
        color="#ffbd8a"
      />
    </mesh>
  );
}

function WarmLights({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const { shadows, spotShadowMap } = usePerformanceContext();
  const spot = useRef<F.SpotLight>(null);
  const oven = useRef<F.PointLight>(null);
  useFrame(() => {
    const p = progressRef.current;
    if (spot.current) spot.current.intensity = 2.4 + p * 2.8;
    if (oven.current) oven.current.intensity = 1.2 + p * 7.5;
  });
  return (
    <>
      <spotLight
        ref={spot}
        castShadow={shadows}
        position={[1.4, 2.2, 2.8]}
        angle={0.45}
        penumbra={1}
        intensity={2.4}
        color="#ffd8b0"
        shadow-mapSize-width={spotShadowMap[0]}
        shadow-mapSize-height={spotShadowMap[1]}
      />
      <pointLight
        ref={oven}
        position={[0.15, 0.55, 0.35]}
        intensity={1.2}
        color="#ff8033"
        distance={6}
        decay={2}
      />
      <pointLight position={[-0.8, 0.3, 1.2]} intensity={0.6} color="#ffae66" />
    </>
  );
}

function CinematicComposer({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const { camera } = useThree();
  const effects = useMemo(() => {
    const dof = new DepthOfFieldEffect(camera, {
      focusDistance: 0.012,
      focalLength: 0.024,
      bokehScale: 2.2,
      height: 480,
    });
    dof.maskFunction = MaskFunction.MULTIPLY_RGB_SET_ALPHA;
    const bloom = new BloomEffect({
      blendFunction: BlendFunction.ADD,
      luminanceThreshold: 0.35,
      intensity: 0.85,
      mipmapBlur: true,
    });
    const vignette = new VignetteEffect({
      eskil: false,
      offset: 0.08,
      darkness: 0.65,
    });
    return { dof, bloom, vignette };
  }, [camera]);

  useFrame(() => {
    const p = progressRef.current;
    const e = easeInOutCubic(p);
    effects.bloom.intensity = F.MathUtils.lerp(0.85, 2.45, p * p);
    effects.dof.bokehScale = F.MathUtils.lerp(2.2, 5.8, p * p * p);
    effects.dof.cocMaterial.focusDistance = F.MathUtils.lerp(0.012, 0.004, e);
    effects.vignette.darkness = 0.65 + p * 0.22;
  });

  return (
    <EffectComposer multisampling={0}>
      <primitive object={effects.dof} dispose={null} />
      <primitive object={effects.bloom} dispose={null} />
      <primitive object={effects.vignette} dispose={null} />
    </EffectComposer>
  );
}

export function OvenScene({
  progressRef,
  mouseRef,
}: {
  progressRef: MutableRefObject<number>;
  mouseRef: MouseRef;
}) {
  const [hoveredPizza, setHoveredPizza] = useState(false);
  const {
    shadows,
    usePostProcessing,
    useShaderLayers,
    useHeatFallback,
    contactShadowBlur,
  } = usePerformanceContext();

  return (
    <>
      <DemandInvalidate />
      <ScrollCameraRig progressRef={progressRef} mouseRef={mouseRef} />

      <ambientLight intensity={0.06} />
      <hemisphereLight intensity={0.2} groundColor="#2a1810" color="#ffcf9d" />
      <WarmLights progressRef={progressRef} />

      <Environment preset="night" environmentIntensity={0.35} />

      <OvenInterior />
      <PizzaPeel
        progressRef={progressRef}
        mouseRef={mouseRef}
        hovered={hoveredPizza}
        setHovered={setHoveredPizza}
      />

      {useShaderLayers ? <FireGlowShader progressRef={progressRef} /> : null}
      <FireSheets progressRef={progressRef} />
      <ScrollSparkles progressRef={progressRef} />
      <OptimizedParticles progressRef={progressRef} />
      {useShaderLayers && !useHeatFallback ? (
        <HeatDistortionShader progressRef={progressRef} />
      ) : null}
      {useHeatFallback ? <HeatHaze progressRef={progressRef} /> : null}
      {useShaderLayers ? (
        <>
          <SmokeShader progressRef={progressRef} offset={[0.2, 0.32, 0.78]} />
          <SmokeShader progressRef={progressRef} offset={[-0.12, 0.18, 0.92]} />
        </>
      ) : null}

      {shadows ? (
        <ContactShadows
          position={[0, -0.36, 0.6]}
          opacity={0.45}
          scale={8}
          blur={contactShadowBlur}
          far={4}
        />
      ) : null}

      {usePostProcessing ? <CinematicComposer progressRef={progressRef} /> : null}
    </>
  );
}
