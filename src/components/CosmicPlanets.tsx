import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PLANETS_META, PlanetMeta } from '../data/planetData';

interface CosmicPlanetsProps {
  shipPos: THREE.Vector3;
  targetedPlanetIndex: number | null;
  onSelectPlanet: (index: number) => void;
}

// -------------------------------------------------------------
// INDIVIDUAL PLANETARY CELESTIAL BODIES
// -------------------------------------------------------------

// Planet 01: Ingress-Prime (B2B Travel Booking & High-Throughput Aggregator)
function Planet01({ isTargeted, isNearby }: { isTargeted: boolean; isNearby: boolean }) {
  const ringsRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringsRef.current) ringsRef.current.rotation.z = t * 0.4;
    if (planetRef.current) planetRef.current.rotation.y = t * 0.15;
  });

  return (
    <group>
      {/* Molten Terrestrial Sphere */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshStandardMaterial 
          color="#92400e" 
          emissive="#d4883b" 
          emissiveIntensity={isTargeted ? 0.7 : 0.3} 
          roughness={0.6} 
          metalness={0.4} 
        />
      </mesh>

      {/* Dual Planetary Data Rings with Orbiting Booking Packet Moons */}
      <group ref={ringsRef} rotation={[0.4, 0.2, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.2, 3.8, 36]} />
          <meshBasicMaterial color="#d4883b" side={THREE.DoubleSide} transparent opacity={0.65} />
        </mesh>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI * 2) / 4;
          return (
            <mesh key={i} position={[Math.cos(angle) * 3.5, 0, Math.sin(angle) * 3.5]}>
              <boxGeometry args={[0.24, 0.24, 0.24]} />
              <meshBasicMaterial color={i % 2 === 0 ? "#ffffff" : "#38bdf8"} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Planet 02: Crypt-FHIR (Healthcare Serverless Interoperability)
function Planet02({ isTargeted, isNearby }: { isTargeted: boolean; isNearby: boolean }) {
  const shieldCage = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const beaconSat = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (shieldCage.current) {
      shieldCage.current.rotation.y = t * 0.3;
      shieldCage.current.rotation.x = Math.sin(t * 0.2) * 0.2;
    }
    if (planetRef.current) planetRef.current.rotation.y = -t * 0.1;
    if (beaconSat.current) beaconSat.current.rotation.y = t * 0.8;
  });

  return (
    <group>
      {/* Icy Teal Planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2.0, 32, 32]} />
        <meshStandardMaterial 
          color="#0d9488" 
          emissive="#14b8a6" 
          emissiveIntensity={isTargeted ? 0.6 : 0.25} 
          roughness={0.2} 
          metalness={0.8} 
        />
      </mesh>

      {/* Rotating Hexagonal HIPAA Defense Shield Cage */}
      <group ref={shieldCage}>
        <mesh>
          <icosahedronGeometry args={[3.0, 1]} />
          <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Orbiting Healthcare Telemetry Satellite with 3D Cross */}
      <group ref={beaconSat}>
        <group position={[3.6, 0.5, 0]}>
          <mesh>
            <boxGeometry args={[0.3, 0.1, 0.1]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh>
            <boxGeometry args={[0.1, 0.3, 0.1]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// Planet 03: Vault-9 (Dynamic Secrets & Cryptographic Relay)
function Planet03({ isTargeted, isNearby }: { isTargeted: boolean; isNearby: boolean }) {
  const gears = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (gears.current) gears.current.rotation.z = t * 0.5;
    if (planetRef.current) planetRef.current.rotation.y = t * 0.08;
  });

  return (
    <group>
      {/* Dark Obsidian Planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2.4, 32, 32]} />
        <meshStandardMaterial 
          color="#1e1b18" 
          emissive="#f59e0b" 
          emissiveIntensity={isTargeted ? 0.5 : 0.15} 
          roughness={0.3} 
          metalness={0.9} 
        />
      </mesh>

      {/* Interlocking Planetary Gear Rings */}
      <group ref={gears} rotation={[0.5, 0, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.4, 4.0, 32]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
        </mesh>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI * 2) / 6;
          return (
            <mesh key={i} position={[Math.cos(angle) * 4.1, 0, Math.sin(angle) * 4.1]}>
              <boxGeometry args={[0.35, 0.2, 0.2]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.9} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Planet 04: GitOps-Gateway (Binary Twin Planet System)
function Planet04({ isTargeted, isNearby }: { isTargeted: boolean; isNearby: boolean }) {
  const binaryGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (binaryGroup.current) {
      binaryGroup.current.rotation.y = t * 0.6;
    }
  });

  return (
    <group ref={binaryGroup}>
      {/* Primary Production 90% Planet (Emerald) */}
      <mesh position={[-2.2, 0, 0]}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshStandardMaterial 
          color="#065f46" 
          emissive="#10b981" 
          emissiveIntensity={isTargeted ? 0.8 : 0.3} 
          roughness={0.4} 
        />
      </mesh>

      {/* Canary 10% Companion Planet (Cyan) */}
      <mesh position={[2.2, 0, 0]}>
        <sphereGeometry args={[1.0, 24, 24]} />
        <meshStandardMaterial 
          color="#0284c7" 
          emissive="#38bdf8" 
          emissiveIntensity={isTargeted ? 0.9 : 0.4} 
          roughness={0.4} 
        />
      </mesh>

      {/* Plasma Energy Conduit Bridge between Binary Twins */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 4.4, 8]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// Planet 05: Orleans-Prime (FLAGSHIP ★ - 1M+ Virtual Actor Silo & LiveKit WebRTC)
function Planet05({ isTargeted, isNearby }: { isTargeted: boolean; isNearby: boolean }) {
  const grainRing1 = useRef<THREE.Group>(null);
  const grainRing2 = useRef<THREE.Group>(null);
  const grainRing3 = useRef<THREE.Group>(null);
  const polarBeam = useRef<THREE.Mesh>(null);
  const planetRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (grainRing1.current) grainRing1.current.rotation.y = t * 0.7;
    if (grainRing2.current) grainRing2.current.rotation.y = -t * 0.5;
    if (grainRing3.current) grainRing3.current.rotation.y = t * 0.35;
    if (polarBeam.current) polarBeam.current.rotation.y = t * 0.2;
    if (planetRef.current) planetRef.current.rotation.y = t * 0.06;
  });

  return (
    <group>
      {/* Colossal Gas Giant Megastructure Core */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[3.6, 40, 40]} />
        <meshStandardMaterial 
          color="#b45309" 
          emissive="#f59e0b" 
          emissiveIntensity={isTargeted ? 1.0 : 0.4} 
          roughness={0.3} 
          metalness={0.7} 
        />
      </mesh>

      {/* Atmospheric Luminous Halo */}
      <mesh>
        <sphereGeometry args={[3.85, 32, 32]} />
        <meshBasicMaterial color="#fcd34d" transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>

      {/* Polar Hyper-Dense Photon Beams (Vertical Axis) */}
      <mesh ref={polarBeam} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.25, 14, 12]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.5} />
      </mesh>

      {/* Level 1 Rings: 8 Fast Orbiting Classroom Actor Grains */}
      <group ref={grainRing1}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI * 2) / 8;
          return (
            <mesh key={i} position={[Math.cos(angle) * 5.0, 0, Math.sin(angle) * 5.0]}>
              <boxGeometry args={[0.32, 0.32, 0.32]} />
              <meshStandardMaterial color="#fef08a" emissive="#d4883b" emissiveIntensity={1.8} />
            </mesh>
          );
        })}
      </group>

      {/* Level 2 Rings: 12 WebRTC Participant Grains (Inclined 25°) */}
      <group ref={grainRing2} rotation={[0.4, 0, 0.3]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[6.0, 6.6, 40]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          const angle = (i * Math.PI * 2) / 12;
          return (
            <mesh key={i} position={[Math.cos(angle) * 6.3, 0, Math.sin(angle) * 6.3]}>
              <octahedronGeometry args={[0.22]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.6} />
            </mesh>
          );
        })}
      </group>

      {/* Level 3 Rings: Event Coordinator Grain Monoliths */}
      <group ref={grainRing3} rotation={[-0.35, 0, -0.2]}>
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5;
          return (
            <mesh key={i} position={[Math.cos(angle) * 7.6, 0, Math.sin(angle) * 7.6]}>
              <dodecahedronGeometry args={[0.24]} />
              <meshStandardMaterial color="#ffffff" emissive="#f59e0b" emissiveIntensity={1.2} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Planet 06: Nexus-Agentis (Autonomous Multi-Agent Swarm)
function Planet06({ isTargeted, isNearby }: { isTargeted: boolean; isNearby: boolean }) {
  const planetRef = useRef<THREE.Mesh>(null);
  const agentRing = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (planetRef.current) planetRef.current.rotation.y = t * 0.2;
    if (agentRing.current) agentRing.current.rotation.y = -t * 0.5;
  });

  return (
    <group>
      {/* Faceted Icosahedral World */}
      <mesh ref={planetRef}>
        <icosahedronGeometry args={[2.3, 1]} />
        <meshStandardMaterial 
          color="#312e81" 
          emissive="#6366f1" 
          emissiveIntensity={isTargeted ? 0.7 : 0.25} 
          roughness={0.2} 
          metalness={0.8} 
        />
      </mesh>

      {/* 3 Orbiting Agent Satellite Probes Exchanging Laser Triangles */}
      <group ref={agentRing}>
        {[0, 1, 2].map((i) => {
          const angle = (i * Math.PI * 2) / 3;
          const r = 3.8;
          const agentColors = ["#f59e0b", "#38bdf8", "#10b981"];
          return (
            <mesh key={i} position={[Math.cos(angle) * r, 0.4, Math.sin(angle) * r]}>
              <octahedronGeometry args={[0.32]} />
              <meshStandardMaterial color={agentColors[i]} emissive={agentColors[i]} emissiveIntensity={1.2} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Planet 07: Terminus-Zero (Zero-Bloat Maintainer Monolith)
function Planet07({ isTargeted, isNearby }: { isTargeted: boolean; isNearby: boolean }) {
  const crystalRef = useRef<THREE.Mesh>(null);
  const pulseRing = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (crystalRef.current) {
      crystalRef.current.rotation.y = t * 0.25;
      crystalRef.current.rotation.x = Math.sin(t * 0.4) * 0.1;
    }
    if (pulseRing.current) {
      const scale = 1.0 + (t % 3.0) * 0.8;
      pulseRing.current.scale.set(scale, scale, scale);
      (pulseRing.current.material as THREE.Material).opacity = Math.max(0, 1.0 - (t % 3.0) / 3.0);
    }
  });

  return (
    <group>
      {/* Pristine Diamond Crystal Planet */}
      <mesh ref={crystalRef}>
        <octahedronGeometry args={[2.2]} />
        <meshStandardMaterial 
          color="#eeeff2" 
          emissive="#d4883b" 
          emissiveIntensity={isTargeted ? 0.9 : 0.3} 
          roughness={0.05} 
          metalness={0.95} 
        />
      </mesh>

      {/* Expanding Zero-Bloat Harmonic Pulse Wave */}
      <mesh ref={pulseRing} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 3.0, 36]} />
        <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// PLANETARY SYSTEM CONTAINER
// -------------------------------------------------------------

export const CosmicPlanets: React.FC<CosmicPlanetsProps> = ({
  shipPos,
  targetedPlanetIndex,
  onSelectPlanet
}) => {
  return (
    <group>
      {PLANETS_META.map((planet, idx) => {
        const isTargeted = targetedPlanetIndex === idx;
        const planetPos = new THREE.Vector3(...planet.coordinates);
        const distance = shipPos.distanceTo(planetPos);
        const isNearby = distance < 16;

        return (
          <group 
            key={planet.id} 
            position={planet.coordinates}
            onClick={(e) => {
              e.stopPropagation();
              onSelectPlanet(idx);
            }}
          >
            {/* Dedicated Point Light per Planet */}
            <pointLight 
              color={planet.primaryColor} 
              intensity={isTargeted ? 4.5 : 2.0} 
              distance={25} 
            />

            {/* Render Specific Planet Geometry */}
            {idx === 0 && <Planet01 isTargeted={isTargeted} isNearby={isNearby} />}
            {idx === 1 && <Planet02 isTargeted={isTargeted} isNearby={isNearby} />}
            {idx === 2 && <Planet03 isTargeted={isTargeted} isNearby={isNearby} />}
            {idx === 3 && <Planet04 isTargeted={isTargeted} isNearby={isNearby} />}
            {idx === 4 && <Planet05 isTargeted={isTargeted} isNearby={isNearby} />}
            {idx === 5 && <Planet06 isTargeted={isTargeted} isNearby={isNearby} />}
            {idx === 6 && <Planet07 isTargeted={isTargeted} isNearby={isNearby} />}

            {/* In-World 3D Targeting Reticle & Planet Badge */}
            <Html 
              position={[0, planet.radius + 1.8, 0]} 
              center 
              distanceFactor={22}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPlanet(idx);
                }}
                className={`group px-3 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all shadow-2xl flex items-center gap-2 cursor-pointer ${
                  isTargeted
                    ? 'bg-[#d4883b] text-[#0b0d11] font-bold ring-4 ring-[#d4883b]/40 scale-110 shadow-[0_0_25px_rgba(212,136,59,0.5)]'
                    : 'bg-[#0f1218]/90 text-[#eeeff2] hover:bg-[#1a2230] border border-[#2d3a4e] hover:border-[#38bdf8] hover:scale-105'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isTargeted ? 'bg-[#0b0d11] animate-ping' : 'bg-emerald-400'}`}></span>
                <span className="font-semibold">{planet.name}</span>
                <span className="text-[10px] opacity-75 font-mono">
                  {Math.round(distance)} AU
                </span>
                {idx === 4 && (
                  <span className="text-[10px] px-1 py-0.2 rounded bg-amber-300 text-amber-950 font-black">
                    FLAGSHIP
                  </span>
                )}
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
