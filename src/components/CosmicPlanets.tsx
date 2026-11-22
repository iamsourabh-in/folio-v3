import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PLANETS_META } from '../data/planetData';
import { planetTextures } from '../utils/proceduralPlanetTextures';
import { AsteroidBelt } from './AsteroidBelt';
import { LandingZonePad } from './LandingZonePad';

interface CosmicPlanetsProps {
  shipPos: THREE.Vector3;
  targetedPlanetIndex: number | null;
  onSelectPlanet: (index: number) => void;
}

// -------------------------------------------------------------
// ULTRA-REALISTIC & VIBRANT PLANETARY CELESTIAL BODIES
// -------------------------------------------------------------

// Atmospheric Rim Glow Component
function AtmosphereGlow({ radius, color, opacity = 0.35 }: { radius: number; color: string; opacity?: number }) {
  return (
    <mesh>
      <sphereGeometry args={[radius * 1.14, 32, 32]} />
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

// Planet 01: Inventra & EaseMyTrip (B2B Travel Booking & High-Throughput Aggregator)
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
          roughness={0.65} 
          metalness={0.35} 
          emissive="#b45309"
          emissiveIntensity={isTargeted ? 0.45 : 0.2}
        />
      </mesh>

      {/* Atmospheric Scattering Glow */}
      <AtmosphereGlow radius={2.5} color="#f59e0b" opacity={0.4} />

      {/* Planetary Data Rings with Orbiting Booking Flight Moons */}
      <group ref={ringsRef} rotation={[0.45, 0.2, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.6, 4.4, 48]} />
          <meshBasicMaterial color="#f59e0b" side={THREE.DoubleSide} transparent opacity={0.6} />
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

// Planet 02: Daffodil Software (Healthcare Serverless Interoperability & FHIR)
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
      <mesh ref={planetRef}>
        <sphereGeometry args={[2.3, 48, 48]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.45} 
          metalness={0.5} 
          emissive="#0d9488"
          emissiveIntensity={isTargeted ? 0.45 : 0.2}
        />
      </mesh>

      <AtmosphereGlow radius={2.3} color="#10b981" opacity={0.45} />

      {/* Revolving Hexagonal Security Shield Cage */}
      <group ref={shieldCage}>
        <mesh>
          <icosahedronGeometry args={[3.2, 1]} />
          <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.5} />
        </mesh>
        {[0, 1, 2].map((i) => {
          const a = (i * Math.PI * 2) / 3;
          return (
            <mesh key={i} position={[Math.cos(a) * 3.4, Math.sin(a) * 1.5, Math.sin(a) * 3.4]}>
              <octahedronGeometry args={[0.18]} />
              <meshBasicMaterial color="#67e8f9" />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Planet 03: TransUnion Vault (Dynamic Secret Governance & Mechanical Locking Rings)
function Planet03({ isTargeted }: { isTargeted: boolean }) {
  const gear1 = useRef<THREE.Group>(null);
  const gear2 = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const texture = planetTextures.getPlanet03Texture();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (gear1.current) gear1.current.rotation.z = t * 0.35;
    if (gear2.current) gear2.current.rotation.x = -t * 0.25;
    if (planetRef.current) planetRef.current.rotation.y = t * 0.08;
  });

  return (
    <group>
      {/* Obsidian Sphere */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2.6, 48, 48]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.3} 
          metalness={0.9} 
          emissive="#ca8a04"
          emissiveIntensity={isTargeted ? 0.4 : 0.15}
        />
      </mesh>

      <AtmosphereGlow radius={2.6} color="#eab308" opacity={0.4} />

      {/* Outer Gear Ring 1 */}
      <group ref={gear1} rotation={[0.3, 0.4, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.6, 4.3, 16]} />
          <meshStandardMaterial color="#eab308" metalness={0.9} roughness={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Orthogonal Gear Ring 2 */}
      <group ref={gear2} rotation={[-0.4, 0.2, 0]}>
        <mesh>
          <ringGeometry args={[4.5, 5.0, 16]} />
          <meshStandardMaterial color="#f97316" metalness={0.85} roughness={0.3} side={THREE.DoubleSide} transparent opacity={0.75} />
        </mesh>
      </group>

      <AsteroidBelt center={[0, 0, 0]} innerRadius={5.8} outerRadius={7.5} count={50} />
    </group>
  );
}

// Planet 04: TransUnion Platform (AWS EKS & Flux v2 Dual Binary Worlds)
function Planet04({ isTargeted }: { isTargeted: boolean }) {
  const binaryPair = useRef<THREE.Group>(null);
  const plasmaBridge = useRef<THREE.Mesh>(null);
  const texture = planetTextures.getPlanet04Texture();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (binaryPair.current) binaryPair.current.rotation.y = t * 0.3;
    if (plasmaBridge.current) {
      plasmaBridge.current.rotation.z = t * 2.0;
    }
  });

  return (
    <group>
      {/* Binary Orbit Group */}
      <group ref={binaryPair}>
        {/* World A: 90% Production Stable (Emerald) */}
        <mesh position={[-2.4, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial 
            map={texture}
            roughness={0.4} 
            metalness={0.6} 
            emissive="#15803d"
            emissiveIntensity={isTargeted ? 0.5 : 0.25}
          />
        </mesh>
        <AtmosphereGlow radius={1.5} color="#22c55e" opacity={0.4} />

        {/* World B: 10% Canary Istio Testbed (Cobalt Azure) */}
        <mesh position={[2.4, 0, 0]}>
          <sphereGeometry args={[1.1, 32, 32]} />
          <meshStandardMaterial 
            color="#0ea5e9" 
            emissive="#0284c7" 
            emissiveIntensity={isTargeted ? 0.6 : 0.3} 
            roughness={0.4} 
            metalness={0.6} 
          />
        </mesh>
        <AtmosphereGlow radius={1.1} color="#38bdf8" opacity={0.4} />

        {/* Dynamic Plasma Traffic Bridge linking the two worlds */}
        <mesh ref={plasmaBridge} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 4.8, 12]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// Planet 05: Samsung Knox Flagship ★ (Hyper-Scale Virtual Actors & WebRTC Core)
function Planet05({ isTargeted }: { isTargeted: boolean }) {
  const actorCloudRef = useRef<THREE.Group>(null);
  const auroraNorth = useRef<THREE.Mesh>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const texture = planetTextures.getPlanet05Texture();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (planetRef.current) planetRef.current.rotation.y = t * 0.15;
    if (actorCloudRef.current) actorCloudRef.current.rotation.y = -t * 0.25;
    if (auroraNorth.current) {
      auroraNorth.current.rotation.z = t * 0.6;
      auroraNorth.current.scale.set(
        1.0 + Math.sin(t * 2) * 0.05,
        1.0 + Math.cos(t * 2) * 0.05,
        1.0
      );
    }
  });

  return (
    <group>
      {/* Colossal Gas Giant Sphere with Jupiter Storm Bands */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[3.8, 64, 64]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.35} 
          metalness={0.5} 
          emissive="#1d4ed8"
          emissiveIntensity={isTargeted ? 0.45 : 0.2}
        />
      </mesh>

      <AtmosphereGlow radius={3.8} color="#3b82f6" opacity={0.45} />

      {/* Swirling WebRTC North Polar Aurora Ribbon */}
      <mesh ref={auroraNorth} position={[0, 3.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.15, 16, 48]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Ring of 1,000,000+ Virtual Actor Grain Satellites */}
      <group ref={actorCloudRef} rotation={[0.3, 0.1, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[5.2, 6.4, 48]} />
          <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} transparent opacity={0.65} />
        </mesh>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI * 2) / 8;
          return (
            <mesh key={i} position={[Math.cos(angle) * 5.8, Math.sin(angle * 2) * 0.3, Math.sin(angle) * 5.8]}>
              <sphereGeometry args={[0.2, 12, 12]} />
              <meshBasicMaterial color={i % 2 === 0 ? "#ffffff" : "#fbbf24"} />
            </mesh>
          );
        })}
      </group>

      <AsteroidBelt center={[0, 0, 0]} innerRadius={7.2} outerRadius={9.5} count={80} />
    </group>
  );
}

// Planet 06: Samsung AI Research Lab (Agentic AI, Memory-as-a-Service & MCP)
function Planet06({ isTargeted }: { isTargeted: boolean }) {
  const probes = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const texture = planetTextures.getPlanet06Texture();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.15;
      coreRef.current.rotation.y = t * 0.2;
    }
    if (probes.current) {
      probes.current.rotation.y = -t * 0.3;
    }
  });

  return (
    <group>
      {/* Geometric Icosahedron Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial 
          map={texture}
          roughness={0.25} 
          metalness={0.8} 
          emissive="#7e22ce"
          emissiveIntensity={isTargeted ? 0.6 : 0.25}
        />
      </mesh>

      <AtmosphereGlow radius={2.5} color="#a855f7" opacity={0.45} />

      {/* 3 Autonomous Agent Satellite Probes Exchanging Laser Triangles */}
      <group ref={probes}>
        {[0, 1, 2].map((i) => {
          const a = (i * Math.PI * 2) / 3;
          const px = Math.cos(a) * 4.2;
          const pz = Math.sin(a) * 4.2;
          return (
            <group key={i} position={[px, 0, pz]}>
              <mesh>
                <dodecahedronGeometry args={[0.28]} />
                <meshBasicMaterial color="#ec4899" />
              </mesh>
              {/* Laser line to core */}
              <mesh position={[-px / 2, 0, -pz / 2]} rotation={[0, -a, 0]}>
                <boxGeometry args={[4.2, 0.03, 0.03]} />
                <meshBasicMaterial color="#38bdf8" transparent opacity={0.75} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

// Planet 07: Global Open Source Terminal (Prismatic Rainbow Diamond & Resonance Waves)
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
          emissive="#f43f5e"
          emissiveIntensity={isTargeted ? 0.7 : 0.25}
        />
      </mesh>

      <AtmosphereGlow radius={2.6} color="#38bdf8" opacity={0.45} />

      {/* Expanding Zero-Bloat Harmonic Pulse Wave */}
      <mesh ref={pulseRing} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.4, 48]} />
        <meshBasicMaterial color="#f43f5e" side={THREE.DoubleSide} transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

// -------------------------------------------------------------
// PLANETARY SYSTEM CONTAINER WITH DEDICATED LANDING ZONES
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
          >
            {/* Dedicated Point Light per Planet casting vibrant planetary illumination */}
            <pointLight 
              color={planet.primaryColor} 
              intensity={isTargeted ? 5.5 : 3.0} 
              distance={40} 
            />

            {/* Render High-Fidelity Planet Geometry */}
            {idx === 0 && <Planet01 isTargeted={isTargeted} />}
            {idx === 1 && <Planet02 isTargeted={isTargeted} />}
            {idx === 2 && <Planet03 isTargeted={isTargeted} />}
            {idx === 3 && <Planet04 isTargeted={isTargeted} />}
            {idx === 4 && <Planet05 isTargeted={isTargeted} />}
            {idx === 5 && <Planet06 isTargeted={isTargeted} />}
            {idx === 6 && <Planet07 isTargeted={isTargeted} />}

            {/* In-World 3D Company Landing Zone Pad */}
            <LandingZonePad
              planet={planet}
              isTargeted={isTargeted}
              onLand={() => onSelectPlanet(idx)}
            />

            {/* Upper Orbit Beacon Label */}
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
