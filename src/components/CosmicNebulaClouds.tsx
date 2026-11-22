import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural soft glowing circular particle texture
function createGlowSpriteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.7)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

interface NebulaCloudProps {
  position: [number, number, number];
  color: string;
  size: number;
  particleCount?: number;
  radius?: number;
  speed?: number;
}

function NebulaCluster({
  position,
  color,
  size,
  particleCount = 35,
  radius = 18,
  speed = 0.05
}: NebulaCloudProps) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useMemo(() => createGlowSpriteTexture(), []);

  const particles = useMemo(() => {
    const pts: { pos: [number, number, number]; scale: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * radius;
      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta) * 0.6; // Slightly flattened like a cosmic dust disc
      const z = r * Math.cos(phi);
      pts.push({
        pos: [x, y, z],
        scale: size * (0.6 + Math.random() * 0.8)
      });
    }
    return pts;
  }, [particleCount, radius, size]);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = t * speed * 0.2;
      groupRef.current.rotation.z = Math.sin(t * speed * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {particles.map((p, idx) => (
        <sprite key={idx} position={p.pos} scale={[p.scale, p.scale, 1]}>
          <spriteMaterial 
            map={texture} 
            color={color} 
            transparent 
            opacity={0.35} 
            blending={THREE.AdditiveBlending} 
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
}

export const CosmicNebulaClouds: React.FC = () => {
  return (
    <group>
      {/* 1. Violet & Magenta Nebula (Sector 06 / Agentic AI horizon) */}
      <NebulaCluster 
        position={[38, 20, 260]} 
        color="#a855f7" 
        size={24} 
        particleCount={30} 
        radius={22}
      />
      <NebulaCluster 
        position={[45, 12, 280]} 
        color="#ec4899" 
        size={20} 
        particleCount={25} 
        radius={18}
      />

      {/* 2. Electric Cyan & Turquoise Lagoon (Sector 02 / Daffodil Healthcare) */}
      <NebulaCluster 
        position={[35, -15, 80]} 
        color="#06b6d4" 
        size={22} 
        particleCount={30} 
        radius={20}
      />
      <NebulaCluster 
        position={[42, -5, 110]} 
        color="#10b981" 
        size={18} 
        particleCount={20} 
        radius={16}
      />

      {/* 3. Warm Solar Amber & Gold Corona (Sector 01 / EaseMyTrip & Travel) */}
      <NebulaCluster 
        position={[-35, 15, 40]} 
        color="#f59e0b" 
        size={22} 
        particleCount={28} 
        radius={19}
      />
      <NebulaCluster 
        position={[-42, -8, 65]} 
        color="#fbbf24" 
        size={18} 
        particleCount={22} 
        radius={15}
      />

      {/* 4. Regal Royal Blue & Gold Cloud (Sector 05 / Samsung Knox Flagship) */}
      <NebulaCluster 
        position={[-45, 22, 220]} 
        color="#3b82f6" 
        size={28} 
        particleCount={35} 
        radius={25}
      />
      <NebulaCluster 
        position={[-32, -18, 235]} 
        color="#fbbf24" 
        size={20} 
        particleCount={24} 
        radius={18}
      />

      {/* 5. Prismatic Aurora Finale Cloud (Sector 07 / Terminus & Open Source) */}
      <NebulaCluster 
        position={[0, 25, 315]} 
        color="#f43f5e" 
        size={26} 
        particleCount={30} 
        radius={22}
      />
      <NebulaCluster 
        position={[-15, -15, 330]} 
        color="#38bdf8" 
        size={22} 
        particleCount={25} 
        radius={20}
      />
    </group>
  );
};
