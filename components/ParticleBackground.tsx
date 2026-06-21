"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Animated network of points (nodes) slowly rotating in 3D. Evokes a
 * threat-graph / network-traffic visual behind the hero.
 */
function ParticleField({ count = 900 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Build a fixed random cloud once. We avoid Math.random in render paths
  // by generating it inside useMemo (runs client-side, post-hydration).
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14; // x
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14; // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14; // z
    }
    return arr;
  }, [count]);

  // Gentle continuous rotation; subtle parallax with elapsed time.
  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00d4ff"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** A few larger "hub" nodes in neon green for depth. */
function HubNodes() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={60} />
      </bufferGeometry>
      <pointsMaterial
        size={0.13}
        color="#00ff9f"
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ParticleBackground() {
  return (
    <div className="absolute inset-0 -z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
        <HubNodes />
      </Canvas>
    </div>
  );
}
