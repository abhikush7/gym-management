'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import RotatingDumbbell from './RotatingDumbbell';
import ParticleField from './ParticleField';

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#00d4ff" intensity={2} />
      <pointLight position={[-5, -5, -5]} color="#ef4444" intensity={1.5} />
      <spotLight position={[0, 10, 0]} intensity={1} color="#ffffff" />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <RotatingDumbbell position={[0, 0, 0]} scale={1} color="#ef4444" />
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <RotatingDumbbell position={[3, 1.5, -2]} scale={0.5} color="#00d4ff" />
      </Float>

      <Float speed={2.5} rotationIntensity={0.7} floatIntensity={1.2}>
        <RotatingDumbbell position={[-3, -1.5, -2]} scale={0.6} color="#888888" />
      </Float>

      <ParticleField />

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}
