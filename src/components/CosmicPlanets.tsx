import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PLANETS_META } from '../data/planetData';
import { planetTextures } from '../utils/proceduralPlanetTextures';
import { AsteroidBelt } from './AsteroidBelt';

interface CosmicPlanetsProps {
  shipPos: THREE.Vector3;
  targetedPlanetIndex: number | null;
  onSelectPlanet: (index: number) => void;
}

// -------------------------------------------------------------
// ULTRA-REALISTIC PLANETARY CELESTIAL BODIES
// -------------------------------------------------------------

// Atmospheric Rim Glow Component
function AtmosphereGlow({ radius, color, opacity = 0.25 }: { radius: number; color: string; opacity?: number }) {
  return (
    <mesh>
      <sphereGeometry args={[radius * 1.12, 32, 32]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={opacity} 
        side={THREE.BackSide} 
        blending={THREE.AdditiveBlending} 
      />
    </mesh>
  );
}

// Planet 01: Ingress-Prime (B2B Travel Booking & High-Throughput Aggregator)
function Planet01({ isTargeted }: { isTargeted: boolean }) {
  const ringsRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const texture = planetTextures.getPlanet01Texture();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringsRef.current) ringsRef.current.rotation.z = t * 0.2;
    if (planetRef.current) planetRef.current.rotation.y = t * 0.12;
  });

  return (
    <group>
      {/* Textured PBR Terrestrial Sphere */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2.5, 48, 48]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.7} 
          metalness={0.3} 
          emissive="#78350f"
          emissiveIntensity={isTargeted ? 0.35 : 0.15}
        />
      </mesh>

      {/* Atmospheric Scattering Glow */}
      <AtmosphereGlow radius={2.5} color="#d4883b" opacity={0.3} />

      {/* Planetary Data Rings with Orbiting Moons */}
      <group ref={ringsRef} rotation={[0.45, 0.2, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.6, 4.4, 48]} />
          <meshBasicMaterial color="#d4883b" side={THREE.DoubleSide} transparent opacity={0.55} />
        </mesh>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI * 2) / 4;
          return (
            <mesh key={i} position={[Math.cos(angle) * 4.0, 0, Math.sin(angle) * 4.0]}>
              <boxGeometry args={[0.22, 0.22, 0.22]} />
              <meshBasicMaterial color={i % 2 === 0 ? "#ffffff" : "#38bdf8"} />
            </mesh>
          );
        })}
      </group>

      {/* Orbiting Asteroid Belt */}
      <AsteroidBelt center={[0, 0, 0]} innerRadius={5.2} outerRadius={7.0} count={60} />
    </group>
  );
}

// Planet 02: Crypt-FHIR (Healthcare Serverless Interoperability)
function Planet02({ isTargeted }: { isTargeted: boolean }) {
  const shieldCage = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const texture = planetTextures.getPlanet02Texture();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (shieldCage.current) {
      shieldCage.current.rotation.y = t * 0.25;
      shieldCage.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
    if (planetRef.current) planetRef.current.rotation.y = -t * 0.1;
  });

  return (
    <group>
      {/* Textured Oceanic Teal Planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2.3, 48, 48]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.4} 
          metalness={0.6} 
          emissive="#0d9488"
          emissiveIntensity={isTargeted ? 0.35 : 0.15}
        />
      </mesh>

      {/* Atmospheric Scattering Glow */}
      <AtmosphereGlow radius={2.3} color="#2dd4bf" opacity={0.35} />

      {/* Rotating Hexagonal HIPAA Defense Shield Cage */}
      <group ref={shieldCage}>
        <mesh>
          <icosahedronGeometry args={[3.2, 1]} />
          <meshBasicMaterial color="#2dd4bf" wireframe transparent opacity={0.45} />
        </mesh>
      </group>
    </group>
  );
}

// Planet 03: Vault-9 (Dynamic Secrets & Cryptographic Relay)
function Planet03({ isTargeted }: { isTargeted: boolean }) {
  const gears = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const texture = planetTextures.getPlanet03Texture();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (gears.current) gears.current.rotation.z = t * 0.35;
    if (planetRef.current) planetRef.current.rotation.y = t * 0.08;
  });

  return (
    <group>
      {/* Obsidian Basalt Planet with Circuit Grids */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2.6, 48, 48]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.3} 
          metalness={0.85} 
          emissive="#b45309"
          emissiveIntensity={isTargeted ? 0.3 : 0.1}
        />
      </mesh>

      {/* Atmosphere Glow */}
      <AtmosphereGlow radius={2.6} color="#f59e0b" opacity={0.25} />

      {/* Interlocking Planetary Gear Rings with Notch Teeth */}
      <group ref={gears} rotation={[0.4, 0.2, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.6, 4.3, 36]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} side={THREE.DoubleSide} />
        </mesh>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI * 2) / 8;
          return (
            <mesh key={i} position={[Math.cos(angle) * 4.4, 0, Math.sin(angle) * 4.4]}>
              <boxGeometry args={[0.35, 0.18, 0.18]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.9} />
            </mesh>
          );
        })}
      </group>

      <AsteroidBelt center={[0, 0, 0]} innerRadius={5.6} outerRadius={7.8} count={70} />
    </group>
  );
}

// Planet 04: GitOps-Gateway (Binary Twin Planet System)
function Planet04({ isTargeted }: { isTargeted: boolean }) {
  const binaryGroup = useRef<THREE.Group>(null);
  const texture = planetTextures.getPlanet04Texture();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (binaryGroup.current) {
      binaryGroup.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group ref={binaryGroup}>
      {/* Primary Production 90% Planet (Emerald) */}
      <mesh position={[-2.4, 0, 0]}>
        <sphereGeometry args={[1.7, 36, 36]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.5} 
          metalness={0.5} 
          emissive="#059669" 
          emissiveIntensity={isTargeted ? 0.45 : 0.2} 
        />
      </mesh>
      <group position={[-2.4, 0, 0]}>
        <AtmosphereGlow radius={1.7} color="#10b981" opacity={0.3} />
      </group>

      {/* Canary 10% Companion Planet (Cyan) */}
      <mesh position={[2.4, 0, 0]}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial 
          color="#0284c7" 
          roughness={0.3} 
          metalness={0.7} 
          emissive="#38bdf8" 
          emissiveIntensity={isTargeted ? 0.5 : 0.25} 
        />
      </mesh>
      <group position={[2.4, 0, 0]}>
        <AtmosphereGlow radius={1.1} color="#38bdf8" opacity={0.35} />
      </group>

      {/* High-Energy Plasma Conduit Bridge */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 4.8, 8]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// Planet 05: Orleans-Prime (FLAGSHIP ★ - 1M+ Virtual Actor Silo & LiveKit WebRTC)
function Planet05({ isTargeted }: { isTargeted: boolean }) {
  const grainRing1 = useRef<THREE.Group>(null);
  const grainRing2 = useRef<THREE.Group>(null);
  const grainRing3 = useRef<THREE.Group>(null);
  const polarBeam = useRef<THREE.Mesh>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const texture = planetTextures.getPlanet05Texture();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (grainRing1.current) grainRing1.current.rotation.y = t * 0.6;
    if (grainRing2.current) grainRing2.current.rotation.y = -t * 0.45;
    if (grainRing3.current) grainRing3.current.rotation.y = t * 0.3;
    if (polarBeam.current) polarBeam.current.rotation.y = t * 0.2;
    if (planetRef.current) planetRef.current.rotation.y = t * 0.05;
  });

  return (
    <group>
      {/* Colossal Jupiter-Scale Gas Giant with Rich Cloud Bands & Storms */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[3.8, 64, 64]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.4} 
          metalness={0.4} 
          emissive="#92400e"
          emissiveIntensity={isTargeted ? 0.4 : 0.18}
        />
      </mesh>

      {/* Multi-Layered Atmospheric Rayleigh Scattering Glow */}
      <AtmosphereGlow radius={3.8} color="#f59e0b" opacity={0.4} />

      {/* Polar Hyper-Dense Photon Energy Beams */}
      <mesh ref={polarBeam} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.22, 16, 12]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.65} />
      </mesh>

      {/* Level 1 Rings: 8 Fast Orbiting Classroom Actor Grains */}
      <group ref={grainRing1}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI * 2) / 8;
          return (
            <mesh key={i} position={[Math.cos(angle) * 5.4, 0, Math.sin(angle) * 5.4]}>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial color="#fef08a" emissive="#d4883b" emissiveIntensity={2.0} />
            </mesh>
          );
        })}
      </group>

      {/* Level 2 Rings: 12 WebRTC Participant Grains (Inclined 25°) */}
      <group ref={grainRing2} rotation={[0.38, 0, 0.25]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[6.5, 7.2, 48]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          const angle = (i * Math.PI * 2) / 12;
          return (
            <mesh key={i} position={[Math.cos(angle) * 6.85, 0, Math.sin(angle) * 6.85]}>
              <octahedronGeometry args={[0.22]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.8} />
            </mesh>
          );
        })}
      </group>

      {/* Level 3 Rings: Event Coordinator Grain Monoliths */}
      <group ref={grainRing3} rotation={[-0.32, 0, -0.2]}>
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5;
          return (
            <mesh key={i} position={[Math.cos(angle) * 8.2, 0, Math.sin(angle) * 8.2]}>
              <dodecahedronGeometry args={[0.25]} />
              <meshStandardMaterial color="#ffffff" emissive="#f59e0b" emissiveIntensity={1.4} />
            </mesh>
          );
        })}
      </group>

      {/* Dense Outer Planetary Asteroid Debris Ring */}
      <AsteroidBelt center={[0, 0, 0]} innerRadius={9.2} outerRadius={12.0} count={100} />
    </group>
  );
}

// Planet 06: Nexus-Agentis (Autonomous Multi-Agent Swarm)
function Planet06({ isTargeted }: { isTargeted: boolean }) {
  const planetRef = useRef<THREE.Mesh>(null);
  const agentRing = useRef<THREE.Group>(null);
  const texture = planetTextures.getPlanet06Texture();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (planetRef.current) planetRef.current.rotation.y = t * 0.15;
    if (agentRing.current) agentRing.current.rotation.y = -t * 0.45;
  });

  return (
    <group>
      {/* Faceted Neural Synaptic Planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2.5, 48, 48]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.3} 
          metalness={0.7} 
          emissive="#4338ca"
          emissiveIntensity={isTargeted ? 0.4 : 0.18}
        />
      </mesh>

      <AtmosphereGlow radius={2.5} color="#818cf8" opacity={0.35} />

      {/* 3 Orbiting Agent Probes Exchanging Laser Triangles */}
      <group ref={agentRing}>
        {[0, 1, 2].map((i) => {
          const angle = (i * Math.PI * 2) / 3;
          const r = 4.2;
          const agentColors = ["#f59e0b", "#38bdf8", "#10b981"];
          return (
            <mesh key={i} position={[Math.cos(angle) * r, 0.4, Math.sin(angle) * r]}>
              <octahedronGeometry args={[0.3]} />
              <meshStandardMaterial color={agentColors[i]} emissive={agentColors[i]} emissiveIntensity={1.3} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Planet 07: Terminus-Zero (Zero-Bloat Maintainer Monolith)
function Planet07({ isTargeted }: { isTargeted: boolean }) {
  const crystalRef = useRef<THREE.Mesh>(null);
  const pulseRing = useRef<THREE.Mesh>(null);
  const texture = planetTextures.getPlanet07Texture();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (crystalRef.current) {
      crystalRef.current.rotation.y = t * 0.2;
      crystalRef.current.rotation.x = Math.sin(t * 0.3) * 0.08;
    }
    if (pulseRing.current) {
      const scale = 1.0 + (t % 2.5) * 0.9;
      pulseRing.current.scale.set(scale, scale, scale);
      (pulseRing.current.material as THREE.Material).opacity = Math.max(0, 1.0 - (t % 2.5) / 2.5);
    }
  });

  return (
    <group>
      {/* Pristine Diamond Crystal Planet with Prismatic Facets */}
      <mesh ref={crystalRef}>
        <octahedronGeometry args={[2.6]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.05} 
          metalness={0.95} 
          emissive="#38bdf8"
          emissiveIntensity={isTargeted ? 0.7 : 0.25}
        />
      </mesh>

      <AtmosphereGlow radius={2.6} color="#38bdf8" opacity={0.4} />

      {/* Expanding Zero-Bloat Harmonic Pulse Wave */}
      <mesh ref={pulseRing} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.4, 48]} />
        <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} transparent opacity={0.65} />
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

        return (
          <group 
            key={planet.id} 
            position={planet.coordinates}
            onClick={(e) => {
              e.stopPropagation();
              onSelectPlanet(idx);
            }}
          >
            {/* Dedicated Point Light per Planet casting realistic planetary illumination */}
            <pointLight 
              color={planet.primaryColor} 
              intensity={isTargeted ? 5.0 : 2.5} 
              distance={35} 
            />

            {/* Render High-Fidelity Planet Geometry */}
            {idx === 0 && <Planet01 isTargeted={isTargeted} />}
            {idx === 1 && <Planet02 isTargeted={isTargeted} />}
            {idx === 2 && <Planet03 isTargeted={isTargeted} />}
            {idx === 3 && <Planet04 isTargeted={isTargeted} />}
            {idx === 4 && <Planet05 isTargeted={isTargeted} />}
            {idx === 5 && <Planet06 isTargeted={isTargeted} />}
            {idx === 6 && <Planet07 isTargeted={isTargeted} />}

            {/* In-World 3D Docking Marker */}
            <Html 
              position={[0, planet.radius + 2.2, 0]} 
              center 
              distanceFactor={24}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectPlanet(idx);
                }}
                className={`group px-3 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all shadow-2xl flex items-center gap-2 cursor-pointer ${
                  isTargeted
                    ? 'bg-[#d4883b] text-[#0b0d11] font-bold ring-4 ring-[#d4883b]/40 scale-110 shadow-[0_0_25px_rgba(212,136,59,0.6)]'
                    : 'bg-[#0a0e16]/92 text-[#eeeff2] hover:bg-[#162030] border border-[#2d3a4e] hover:border-[#38bdf8] hover:scale-105 backdrop-blur-md'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isTargeted ? 'bg-[#0b0d11] animate-ping' : 'bg-emerald-400'}`}></span>
                <span className="font-semibold">{planet.name}</span>
                {idx === 4 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-300 text-amber-950 font-black">
                    FLAGSHIP ★
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
