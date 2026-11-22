import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AsteroidBeltProps {
  center: [number, number, number];
  innerRadius: number;
  outerRadius: number;
  count?: number;
}

export const AsteroidBelt: React.FC<AsteroidBeltProps> = ({
  center,
  innerRadius,
  outerRadius,
  count = 90
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Generate deterministic asteroid transforms
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const asteroidData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.sin(i * 13) * 0.2;
      const radius = innerRadius + ((i * 37) % (outerRadius - innerRadius));
      const x = Math.cos(angle) * radius;
      const y = (Math.sin(i * 7) * 1.4);
      const z = Math.sin(angle) * radius;
      const scale = 0.12 + ((i * 17) % 10) * 0.04;
      const rotSpeedX = 0.2 + (i % 5) * 0.1;
      const rotSpeedY = 0.3 + (i % 3) * 0.15;
      data.push({ x, y, z, scale, angle, radius, rotSpeedX, rotSpeedY });
    }
    return data;
  }, [count, innerRadius, outerRadius]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    asteroidData.forEach((ast, i) => {
      // Orbital motion around the planet
      const currentAngle = ast.angle + t * 0.08;
      const curX = Math.cos(currentAngle) * ast.radius;
      const curZ = Math.sin(currentAngle) * ast.radius;

      dummy.position.set(curX, ast.y + Math.sin(t * 0.5 + i) * 0.2, curZ);
      dummy.rotation.set(t * ast.rotSpeedX, t * ast.rotSpeedY, 0);
      dummy.scale.set(ast.scale, ast.scale * 0.8, ast.scale * 1.1);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={center}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color="#334155" 
          roughness={0.9} 
          metalness={0.2} 
        />
      </instancedMesh>
    </group>
  );
};
