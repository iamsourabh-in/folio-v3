import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetMeta } from '../data/planetData';

interface LandingZonePadProps {
  planet: PlanetMeta;
  isTargeted: boolean;
  onLand: () => void;
}

export const LandingZonePad: React.FC<LandingZonePadProps> = ({
  planet,
  isTargeted,
  onLand
}) => {
  const padGroupRef = useRef<THREE.Group>(null);
  const holoRingRef = useRef<THREE.Mesh>(null);
  const beaconLightsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (holoRingRef.current) {
      holoRingRef.current.rotation.z = t * 0.4;
      const pulseScale = 1.0 + Math.sin(t * 3) * 0.08;
      holoRingRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }
    if (beaconLightsRef.current) {
      beaconLightsRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group 
      ref={padGroupRef} 
      position={planet.landingPadOffset}
      onClick={(e) => {
        e.stopPropagation();
        onLand();
      }}
    >
      {/* 1. Main Octagonal Docking Base */}
      <mesh rotation={[0, Math.PI / 8, 0]}>
        <cylinderGeometry args={[2.4, 2.7, 0.35, 8]} />
        <meshStandardMaterial 
          color="#12161f" 
          metalness={0.9} 
          roughness={0.25} 
        />
      </mesh>

      {/* 2. Outer Illuminated Runway Perimeter Ring */}
      <mesh position={[0, 0.19, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.0, 2.25, 32]} />
        <meshBasicMaterial 
          color={planet.primaryColor} 
          side={THREE.DoubleSide} 
          transparent 
          opacity={isTargeted ? 0.95 : 0.6} 
        />
      </mesh>

      {/* 3. Concentric Inner Touchdown Circle with Crosshair */}
      <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.0, 1.15, 24]} />
        <meshBasicMaterial 
          color="#ffffff" 
          side={THREE.DoubleSide} 
          transparent 
          opacity={isTargeted ? 0.9 : 0.5} 
        />
      </mesh>

      {/* Central Landing "H" / Touchdown Cross */}
      <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 0.9]} />
        <meshBasicMaterial color={planet.accentGlow} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[0.3, 0.9]} />
        <meshBasicMaterial color={planet.accentGlow} transparent opacity={0.85} />
      </mesh>

      {/* 4. Rotating Holographic Docking Reticle floating above pad */}
      <mesh ref={holoRingRef} position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.7, 24]} />
        <meshBasicMaterial 
          color={planet.accentGlow} 
          side={THREE.DoubleSide} 
          transparent 
          opacity={isTargeted ? 0.75 : 0.35} 
        />
      </mesh>

      {/* 5. 4 Corner Runway Guidance Beacons with Vertical Laser Beams */}
      <group ref={beaconLightsRef}>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI * 2) / 4 + Math.PI / 4;
          const x = Math.cos(angle) * 2.3;
          const z = Math.sin(angle) * 2.3;
          return (
            <group key={i} position={[x, 0, z]}>
              {/* Beacon Pylon Base */}
              <mesh position={[0, 0.25, 0]}>
                <cylinderGeometry args={[0.08, 0.1, 0.5, 8]} />
                <meshStandardMaterial color="#2d374a" metalness={0.8} />
              </mesh>
              {/* Beacon Glowing Tip */}
              <mesh position={[0, 0.55, 0]}>
                <sphereGeometry args={[0.09, 8, 8]} />
                <meshBasicMaterial color={planet.primaryColor} />
              </mesh>
              {/* Vertical Laser Guidance Beam pointing up into space */}
              <mesh position={[0, 2.0, 0]}>
                <cylinderGeometry args={[0.015, 0.03, 3.0, 6]} />
                <meshBasicMaterial 
                  color={planet.primaryColor} 
                  transparent 
                  opacity={isTargeted ? 0.65 : 0.25} 
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* 6. In-World 3D Floating Company Landing Zone Sign */}
      <Html 
        position={[0, -0.6, 0]} 
        center 
        distanceFactor={22}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLand();
          }}
          className={`group px-3 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all shadow-2xl flex flex-col items-center gap-0.5 cursor-pointer select-none backdrop-blur-md border ${
            isTargeted
              ? 'bg-[#0f141d]/95 text-[#eeeff2] border-[#f59e0b] shadow-[0_0_25px_rgba(245,158,11,0.5)] scale-110'
              : 'bg-[#090c12]/90 text-[#9aa4b5] border-[#1e2634] hover:border-[#38bdf8] hover:text-[#eeeff2] hover:scale-105'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span 
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: planet.primaryColor }}
            ></span>
            <span className="font-bold tracking-wider text-[11px]" style={{ color: planet.accentGlow }}>
              {planet.landingZoneId}: {planet.companyName}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[9px] text-[#7a8494] font-mono">
            <span className="text-[#cbd5e1]">{planet.roleTitle}</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">{planet.keyMetric}</span>
          </div>

          {planet.award && (
            <div className="text-[8px] text-amber-300 font-bold tracking-wide">
              ★ {planet.award}
            </div>
          )}
        </button>
      </Html>
    </group>
  );
};
