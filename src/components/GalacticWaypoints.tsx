import React, { useMemo } from 'react';
import * as THREE from 'three';

export const GalacticWaypoints: React.FC = () => {
  const gateZPositions = useMemo(() => {
    const arr: number[] = [];
    for (let z = 0; z <= 320; z += 30) {
      arr.push(z);
    }
    return arr;
  }, []);

  return (
    <group>
      {gateZPositions.map((z, idx) => (
        <group key={z} position={[0, 0, z]}>
          {/* Hexagonal Outer Navigation Gate */}
          <mesh rotation={[0, 0, Math.PI / 6]}>
            <ringGeometry args={[6.2, 6.45, 6]} />
            <meshBasicMaterial 
              color={idx % 2 === 0 ? "#38bdf8" : "#d4883b"} 
              side={THREE.DoubleSide} 
              transparent 
              opacity={0.35} 
            />
          </mesh>

          {/* Corner Beacon Markers */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i * Math.PI * 2) / 6 + Math.PI / 6;
            return (
              <mesh key={i} position={[Math.cos(angle) * 6.35, Math.sin(angle) * 6.35, 0]}>
                <sphereGeometry args={[0.08, 6, 6]} />
                <meshBasicMaterial color="#eeeff2" />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Central Corridor Navigational Optical Cable Line */}
      <mesh position={[0, -2.5, 160]}>
        <boxGeometry args={[0.08, 0.08, 360]} />
        <meshBasicMaterial color="#d4883b" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};
