import React, { useMemo } from 'react';
import * as THREE from 'three';

const GATE_DATA = [
  { z: 0, color: "#f59e0b", label: "APPROACH: SECTOR 01" },
  { z: 30, color: "#f59e0b", label: "LZ-01: EASEMYTRIP & INVENTRA" },
  { z: 60, color: "#10b981", label: "APPROACH: SECTOR 02" },
  { z: 90, color: "#10b981", label: "LZ-02: DAFFODIL HEALTHCARE" },
  { z: 120, color: "#eab308", label: "LZ-03: TRANSUNION VAULT" },
  { z: 150, color: "#22c55e", label: "APPROACH: SECTOR 04" },
  { z: 180, color: "#22c55e", label: "LZ-04: TRANSUNION EKS GITOPS" },
  { z: 210, color: "#3b82f6", label: "LZ-05: SAMSUNG KNOX 1M+ ★" },
  { z: 240, color: "#3b82f6", label: "SAMSUNG HYPER-SCALE CORRIDOR" },
  { z: 270, color: "#a855f7", label: "LZ-06: SAMSUNG AGENTIC AI LAB" },
  { z: 300, color: "#f43f5e", label: "APPROACH: GRAND TERMINUS" },
  { z: 330, color: "#38bdf8", label: "LZ-07: OPEN SOURCE CITADEL" }
];

export const GalacticWaypoints: React.FC = () => {
  return (
    <group>
      {GATE_DATA.map((gate, idx) => (
        <group key={gate.z} position={[0, 0, gate.z]}>
          
          {/* Hexagonal Outer Navigation Gate */}
          <mesh rotation={[0, 0, Math.PI / 6]}>
            <ringGeometry args={[6.2, 6.55, 6]} />
            <meshBasicMaterial 
              color={gate.color} 
              side={THREE.DoubleSide} 
              transparent 
              opacity={0.45} 
            />
          </mesh>

          {/* Inner Guidance Light Ring */}
          <mesh rotation={[0, 0, 0]}>
            <ringGeometry args={[5.6, 5.75, 24]} />
            <meshBasicMaterial 
              color="#ffffff" 
              side={THREE.DoubleSide} 
              transparent 
              opacity={0.2} 
            />
          </mesh>

          {/* 6 Corner Navigation Strobe Nodes */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i * Math.PI * 2) / 6 + Math.PI / 6;
            return (
              <mesh key={i} position={[Math.cos(angle) * 6.4, Math.sin(angle) * 6.4, 0]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshBasicMaterial color={gate.color} />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Central Corridor Navigational Optical Cable Line */}
      <mesh position={[0, -2.5, 165]}>
        <boxGeometry args={[0.1, 0.1, 380]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} />
      </mesh>
    </group>
  );
};
