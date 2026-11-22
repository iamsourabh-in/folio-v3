import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpaceshipModelProps {
  speed: number;
  isBoosting: boolean;
  rollAngle: number;
}

export const SpaceshipModel: React.FC<SpaceshipModelProps> = ({
  speed,
  isBoosting,
  rollAngle
}) => {
  const shipGroup = useRef<THREE.Group>(null);
  const engineFlame1 = useRef<THREE.Mesh>(null);
  const engineFlame2 = useRef<THREE.Mesh>(null);
  const strobeLight = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Engine flame pulsation based on speed and boost
    const flameScaleZ = (1.0 + Math.sin(t * 25) * 0.15) * (isBoosting ? 2.8 : 1.0 + speed * 1.2);
    const flameScaleXY = 1.0 + Math.sin(t * 30) * 0.1 * (isBoosting ? 1.5 : 1.0);

    if (engineFlame1.current) {
      engineFlame1.current.scale.set(flameScaleXY, flameScaleXY, flameScaleZ);
    }
    if (engineFlame2.current) {
      engineFlame2.current.scale.set(flameScaleXY, flameScaleXY, flameScaleZ);
    }

    // Navigation strobe
    if (strobeLight.current) {
      strobeLight.current.intensity = Math.sin(t * 4) > 0.8 ? 2.5 : 0.2;
    }

    // Subtle ship vibration & idle flight breath
    if (shipGroup.current) {
      shipGroup.current.rotation.z = rollAngle + Math.sin(t * 2) * 0.02;
      shipGroup.current.position.y = Math.sin(t * 3) * 0.03;
    }
  });

  const thrusterColor = isBoosting ? "#ffffff" : "#38bdf8";

  return (
    <group ref={shipGroup}>
      
      {/* 1. Main Aerodynamic Stealth Fuselage */}
      <mesh position={[0, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.42, 2.2, 5]} />
        <meshStandardMaterial 
          color="#12161f" 
          metalness={0.88} 
          roughness={0.2} 
        />
      </mesh>

      {/* Cockpit Canopy (Translucent Cyan Crystal) */}
      <mesh position={[0, 0.16, 0.3]} rotation={[Math.PI / 6, 0, 0]}>
        <boxGeometry args={[0.26, 0.22, 0.7]} />
        <meshStandardMaterial 
          color="#38bdf8" 
          emissive="#0284c7" 
          emissiveIntensity={0.8} 
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* 2. Swept Delta Wings */}
      {/* Left Wing */}
      <mesh position={[-0.85, 0, -0.35]} rotation={[0, -0.2, -0.05]}>
        <boxGeometry args={[1.3, 0.04, 0.9]} />
        <meshStandardMaterial color="#181e2b" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Left Winglet */}
      <mesh position={[-1.5, 0.15, -0.45]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.04, 0.35, 0.6]} />
        <meshStandardMaterial color="#d4883b" metalness={0.8} />
      </mesh>
      {/* Left Wingtip Red Nav Light */}
      <mesh position={[-1.55, 0.28, -0.6]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* Right Wing */}
      <mesh position={[0.85, 0, -0.35]} rotation={[0, 0.2, 0.05]}>
        <boxGeometry args={[1.3, 0.04, 0.9]} />
        <meshStandardMaterial color="#181e2b" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Right Winglet */}
      <mesh position={[1.5, 0.15, -0.45]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.04, 0.35, 0.6]} />
        <meshStandardMaterial color="#d4883b" metalness={0.8} />
      </mesh>
      {/* Right Wingtip Green Nav Light */}
      <mesh position={[1.55, 0.28, -0.6]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>

      {/* 3. Dorsal Tail Fin & Strobe */}
      <mesh position={[0, 0.32, -0.55]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.04, 0.55, 0.7]} />
        <meshStandardMaterial color="#141924" metalness={0.9} />
      </mesh>
      <pointLight ref={strobeLight} position={[0, 0.6, -0.7]} color="#eeeff2" distance={4} />

      {/* 4. Twin Ion Propulsion Engine Nacelles */}
      {/* Port Engine */}
      <group position={[-0.32, -0.04, -0.8]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.15, 0.6, 12]} />
          <meshStandardMaterial color="#0c0e14" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Plasma Thruster Core */}
        <mesh ref={engineFlame1} position={[0, 0, -0.45]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.12, 0.75, 12]} />
          <meshBasicMaterial color={thrusterColor} transparent opacity={0.9} />
        </mesh>
        {/* Violet Ion Halo Ring */}
        <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.16, 0.6, 12]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>

      {/* Starboard Engine */}
      <group position={[0.32, -0.04, -0.8]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.15, 0.6, 12]} />
          <meshStandardMaterial color="#0c0e14" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Plasma Thruster Core */}
        <mesh ref={engineFlame2} position={[0, 0, -0.45]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.12, 0.75, 12]} />
          <meshBasicMaterial color={thrusterColor} transparent opacity={0.9} />
        </mesh>
        {/* Violet Ion Halo Ring */}
        <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.16, 0.6, 12]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>

      {/* Thruster Dynamic Illumination Light */}
      <pointLight position={[0, -0.04, -1.2]} color={isBoosting ? "#fbbf24" : "#38bdf8"} intensity={isBoosting ? 3.5 : 1.8} distance={8} />

      {/* Subtle Ship Forward Cockpit Headlights */}
      <pointLight position={[0, 0, 1.6]} color="#ffffff" intensity={2.0} distance={15} />

    </group>
  );
};
