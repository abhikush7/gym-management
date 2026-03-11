'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';

interface RotatingDumbbellProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

export default function RotatingDumbbell({
  position = [0, 0, 0],
  scale = 1,
  color = '#ef4444',
}: RotatingDumbbellProps) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
      groupRef.current.rotation.x += delta * 0.2;
    }
  });

  const plateMaterial = { color, metalness: 0.9, roughness: 0.1 };
  const barMaterial = { color: '#888888', metalness: 0.8, roughness: 0.2 };

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Left weight plates */}
      <mesh position={[-1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 0.15, 16]} />
        <meshStandardMaterial {...plateMaterial} />
      </mesh>
      <mesh position={[-1.0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.12, 16]} />
        <meshStandardMaterial {...plateMaterial} />
      </mesh>

      {/* Center bar */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 2.6, 8]} />
        <meshStandardMaterial {...barMaterial} />
      </mesh>

      {/* Grip rings */}
      {[-0.3, 0, 0.3].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.1, 0.02, 8, 16]} />
          <meshStandardMaterial color="#555555" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Right weight plates */}
      <mesh position={[1.0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.12, 16]} />
        <meshStandardMaterial {...plateMaterial} />
      </mesh>
      <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 0.15, 16]} />
        <meshStandardMaterial {...plateMaterial} />
      </mesh>
    </group>
  );
}
