"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Floating wireframe "threat nodes" drifting in the void — icosahedrons and
 * octahedrons in electric-violet / cyber-red at 35% opacity, slowly rotating
 * in 3D. Replaces the old point-cloud network.
 */

type ShapeKind = "ico" | "octa";

interface Node {
  kind: ShapeKind;
  position: [number, number, number];
  scale: number;
  color: string;
  rotSpeed: [number, number];
}

function ThreatNode({ node }: { node: Node }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * node.rotSpeed[0];
    ref.current.rotation.y += delta * node.rotSpeed[1];
  });

  return (
    <mesh ref={ref} position={node.position} scale={node.scale}>
      {node.kind === "ico" ? (
        <icosahedronGeometry args={[1, 0]} />
      ) : (
        <octahedronGeometry args={[1, 0]} />
      )}
      <meshBasicMaterial
        color={node.color}
        wireframe
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

function ThreatField({ count = 14 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);

  // Build a stable set of nodes once (client-side, post-hydration).
  const nodes = useMemo<Node[]>(() => {
    const arr: Node[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        kind: i % 2 === 0 ? "ico" : "octa",
        position: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8 - 2,
        ],
        scale: 0.5 + Math.random() * 1.1,
        color: i % 3 === 0 ? "#ff003c" : "#9d00ff",
        rotSpeed: [
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
        ],
      });
    }
    return arr;
  }, [count]);

  // Whole field drifts very slowly for parallax depth.
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.02;
  });

  return (
    <group ref={group}>
      {nodes.map((node, i) => (
        <ThreatNode key={i} node={node} />
      ))}
    </group>
  );
}

export function ParticleBackground() {
  return (
    <div className="absolute inset-0 -z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 11], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ThreatField />
      </Canvas>
    </div>
  );
}
