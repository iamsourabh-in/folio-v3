import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, Sparkles } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { CASE_FILES } from '../data/caseFiles';
import { CaseFileOverlayPanel } from './CaseFileOverlayPanel';
import { CorridorHUD } from './CorridorHUD';
import { ArrowLeft, Compass, Eye, Radio, Sparkle } from 'lucide-react';

interface SignalCorridor3DProps {
  initialStationIndex?: number;
  onSelectStation?: (caseFileId: string) => void;
  onExitToSkim: () => void;
}

// 7 3D Coordinates along the surveyed underwater signal line
const STATION_POSITIONS: [number, number, number][] = [
  [-26, 0.6, 12],   // 01: Travel Booking Ingress & High-Throughput Aggregator
  [-17, 1.2, 5],    // 02: Healthcare FHIR & Serverless Interoperability Crypt
  [-8, 0.9, -2],    // 03: Cryptographic Vault & HashiCorp Dynamic Secrets
  [0, 1.5, -6],     // 04: Financial GitOps & Istio Service Mesh Gate
  [10, 2.4, -1],    // 05: Flagship Orleans Actor Silo & WebRTC Media Core
  [20, 1.6, 6],     // 06: Autonomous Multi-Agent Round-Table & Memory Ledger
  [29, 1.0, 12]     // 07: Zero-Bloat Maintainer Terminus
];

// Optimal camera offsets when inspecting a station
const STATION_CAMERA_OFFSETS: [number, number, number][] = [
  [0, 2.4, 6.2],
  [0, 2.6, 6.2],
  [0, 2.5, 6.4],
  [0, 2.8, 6.8],
  [0, 3.8, 9.5], // Flagship wider cinematic frame for towering silo
  [0, 2.7, 6.6],
  [0, 2.5, 6.4]
];

// ----------------------------------------------------------------------
// 1. BESPOKE PROCEDURAL STATION 3D MOTIFS
// ----------------------------------------------------------------------

// Station 01: Travel Booking Ingress & High-Throughput Aggregator
function Station013D({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const outerRing = useRef<THREE.Mesh>(null);
  const midRing = useRef<THREE.Mesh>(null);
  const innerRing = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const packetOrbitRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerRing.current) outerRing.current.rotation.z = t * 0.7;
    if (midRing.current) midRing.current.rotation.x = -t * 0.85;
    if (innerRing.current) innerRing.current.rotation.y = t * 1.2;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 1.6;
      coreRef.current.rotation.x = Math.sin(t * 1.2) * 0.2;
    }
    if (packetOrbitRef.current) packetOrbitRef.current.rotation.y = -t * 2.2;
  });

  const activeColor = isActive ? "#d4883b" : isHovered ? "#f59e0b" : "#445065";
  const glowIntensity = isActive ? 0.9 : isHovered ? 0.6 : 0.1;

  return (
    <group position={[0, 1.3, 0]}>
      {/* Outer Gyro Ring (Gold/Amber) */}
      <mesh ref={outerRing}>
        <torusGeometry args={[1.35, 0.04, 16, 48]} />
        <meshStandardMaterial color={activeColor} emissive={activeColor} emissiveIntensity={glowIntensity} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Middle Gyro Ring (Cyan/Steel) */}
      <mesh ref={midRing} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.05, 0.035, 16, 40]} />
        <meshStandardMaterial color={isActive ? "#38bdf8" : "#323c4d"} emissive={isActive ? "#38bdf8" : "#000"} emissiveIntensity={isActive ? 0.5 : 0.1} metalness={0.7} />
      </mesh>
      {/* Inner Ingress Ring */}
      <mesh ref={innerRing} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[0.78, 0.03, 16, 32]} />
        <meshStandardMaterial color={isActive ? "#d4883b" : "#283344"} emissive={isActive ? "#d4883b" : "#000"} emissiveIntensity={glowIntensity} />
      </mesh>
      {/* Core Octahedron Database Ingress Point */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.38]} />
        <meshStandardMaterial color="#eeeff2" emissive={activeColor} emissiveIntensity={glowIntensity * 1.2} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* High-speed orbiting travel booking packet motes */}
      <group ref={packetOrbitRef}>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI * 2) / 4;
          return (
            <mesh key={i} position={[Math.cos(angle) * 1.2, Math.sin(angle * 2) * 0.15, Math.sin(angle) * 1.2]}>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshBasicMaterial color={i % 2 === 0 ? "#d4883b" : "#38bdf8"} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Station 02: Healthcare FHIR & Serverless Interoperability Crypt
function Station023D({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const outerCage = useRef<THREE.Group>(null);
  const innerCube = useRef<THREE.Mesh>(null);
  const shieldCross = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerCage.current) {
      outerCage.current.rotation.y = t * 0.45;
      outerCage.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    if (innerCube.current) {
      innerCube.current.rotation.y = -t * 0.7;
      innerCube.current.rotation.z = t * 0.5;
    }
    if (shieldCross.current) {
      shieldCross.current.position.y = Math.sin(t * 1.8) * 0.08;
    }
  });

  const activeColor = isActive ? "#2dd4bf" : isHovered ? "#38bdf8" : "#263548";

  return (
    <group position={[0, 1.3, 0]}>
      {/* Rotating 3D Hypercube Wireframe Cage */}
      <group ref={outerCage}>
        <mesh>
          <boxGeometry args={[1.35, 1.35, 1.35]} />
          <meshBasicMaterial color={activeColor} wireframe={true} />
        </mesh>
        {/* 8 Glowing Corner Schema Vertices */}
        {[
          [-0.67, -0.67, -0.67], [0.67, -0.67, -0.67], [-0.67, 0.67, -0.67], [0.67, 0.67, -0.67],
          [-0.67, -0.67, 0.67], [0.67, -0.67, 0.67], [-0.67, 0.67, 0.67], [0.67, 0.67, 0.67]
        ].map((pos, idx) => (
          <mesh key={idx} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color={isActive ? "#38bdf8" : "#2dd4bf"} />
          </mesh>
        ))}
      </group>

      {/* Inner Nested Translucent HIPAA Shield Cube */}
      <mesh ref={innerCube} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <boxGeometry args={[0.75, 0.75, 0.75]} />
        <meshStandardMaterial 
          color={isActive ? "#2dd4bf" : "#1a2530"} 
          emissive={isActive ? "#2dd4bf" : "#000"} 
          emissiveIntensity={isActive ? 0.6 : 0.1}
          metalness={0.7} 
          roughness={0.3}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Floating 3D Medical Interoperability Cross */}
      <group ref={shieldCross}>
        <mesh>
          <boxGeometry args={[0.42, 0.12, 0.12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh>
          <boxGeometry args={[0.12, 0.42, 0.12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}

// Station 03: Cryptographic Vault & HashiCorp Dynamic Secrets
function Station033D({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const gear1 = useRef<THREE.Group>(null);
  const gear2 = useRef<THREE.Group>(null);
  const dialRef = useRef<THREE.Mesh>(null);
  const keyCore = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (gear1.current) gear1.current.rotation.z = t * 0.9;
    if (gear2.current) gear2.current.rotation.z = -t * 0.9;
    if (dialRef.current) dialRef.current.rotation.y = t * 1.3;
    if (keyCore.current) {
      keyCore.current.rotation.y = t * 1.8;
      keyCore.current.position.y = Math.sin(t * 2.0) * 0.06;
    }
  });

  const activeColor = isActive ? "#d4883b" : isHovered ? "#f59e0b" : "#3b4759";

  return (
    <group position={[0, 1.3, 0]}>
      {/* Outer Thick Vault Gear Ring */}
      <group ref={gear1}>
        <mesh>
          <torusGeometry args={[1.25, 0.06, 16, 32]} />
          <meshStandardMaterial color={activeColor} metalness={0.8} roughness={0.2} emissive={activeColor} emissiveIntensity={isActive ? 0.5 : 0.1} />
        </mesh>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI * 2) / 6;
          return (
            <mesh key={i} position={[Math.cos(angle) * 1.3, Math.sin(angle) * 1.3, 0]}>
              <boxGeometry args={[0.12, 0.12, 0.08]} />
              <meshStandardMaterial color={activeColor} metalness={0.9} />
            </mesh>
          );
        })}
      </group>

      {/* Perpendicular Interlocking Security Hoop */}
      <group ref={gear2} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <torusGeometry args={[1.4, 0.04, 16, 36]} />
          <meshStandardMaterial color={isActive ? "#f59e0b" : "#283444"} metalness={0.85} roughness={0.15} />
        </mesh>
      </group>

      {/* Horizontal Cryptographic Dial */}
      <mesh ref={dialRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 0.9, 24]} />
        <meshStandardMaterial color={isActive ? "#d4883b" : "#1a2230"} side={THREE.DoubleSide} wireframe />
      </mesh>

      {/* Floating Central Encrypted Key Core */}
      <mesh ref={keyCore}>
        <cylinderGeometry args={[0.18, 0.18, 0.65, 8]} />
        <meshStandardMaterial 
          color="#eeeff2" 
          emissive={isActive ? "#d4883b" : "#000"} 
          emissiveIntensity={isActive ? 0.9 : 0.2}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

// Station 04: Financial GitOps & Istio Service Mesh Gate
function Station043D({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const gateRef = useRef<THREE.Group>(null);
  const scanLaser = useRef<THREE.Mesh>(null);
  const stream1 = useRef<THREE.Mesh>(null);
  const stream2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (gateRef.current) {
      gateRef.current.position.y = Math.sin(t * 1.2) * 0.04;
    }
    if (scanLaser.current) {
      scanLaser.current.position.y = Math.sin(t * 2.5) * 0.65;
    }
    if (stream1.current) {
      stream1.current.rotation.z = t * 1.5;
    }
    if (stream2.current) {
      stream2.current.rotation.z = -t * 1.5;
    }
  });

  const activeColor = isActive ? "#10b981" : isHovered ? "#34d399" : "#2f3c4e";

  return (
    <group ref={gateRef} position={[0, 1.3, 0]}>
      {/* Dual Columnar Ingress Pillars */}
      <mesh position={[-0.8, 0, 0]}>
        <boxGeometry args={[0.16, 1.5, 0.25]} />
        <meshStandardMaterial color={activeColor} metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0.8, 0, 0]}>
        <boxGeometry args={[0.16, 1.5, 0.25]} />
        <meshStandardMaterial color={activeColor} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Arched Lintel Overhead */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[1.8, 0.16, 0.3]} />
        <meshStandardMaterial color={activeColor} metalness={0.8} roughness={0.3} emissive={activeColor} emissiveIntensity={isActive ? 0.4 : 0.05} />
      </mesh>

      {/* Animated Vertical Laser Scan Bar */}
      <mesh ref={scanLaser} position={[0, 0, 0]}>
        <boxGeometry args={[1.45, 0.02, 0.02]} />
        <meshBasicMaterial color={isActive ? "#10b981" : "#38bdf8"} />
      </mesh>

      {/* Dual Traffic Flow Streams: Production 90% (Green) vs Canary 10% (Cyan) */}
      <mesh ref={stream1} position={[-0.3, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 1.1, 8]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={isActive ? 1.0 : 0.4} />
      </mesh>
      <mesh ref={stream2} position={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.1, 8]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={isActive ? 0.9 : 0.3} />
      </mesh>
    </group>
  );
}

// Station 05: The Orleans Actor Silo & LiveKit WebRTC Core (FLAGSHIP!)
function Station053D({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const actorOrbitInner = useRef<THREE.Group>(null);
  const actorOrbitMid = useRef<THREE.Group>(null);
  const actorOrbitOuter = useRef<THREE.Group>(null);
  const mediaRing1 = useRef<THREE.Mesh>(null);
  const mediaRing2 = useRef<THREE.Mesh>(null);
  const coreMonolith = useRef<THREE.Mesh>(null);
  const verticalBeam = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (actorOrbitInner.current) actorOrbitInner.current.rotation.y = t * 1.1;
    if (actorOrbitMid.current) actorOrbitMid.current.rotation.y = -t * 0.75;
    if (actorOrbitOuter.current) actorOrbitOuter.current.rotation.y = t * 0.5;

    if (mediaRing1.current) {
      mediaRing1.current.rotation.x = t * 0.45;
      mediaRing1.current.rotation.z = t * 0.35;
    }
    if (mediaRing2.current) {
      mediaRing2.current.rotation.x = -t * 0.45;
      mediaRing2.current.rotation.y = t * 0.4;
    }
    if (coreMonolith.current) {
      coreMonolith.current.rotation.y = t * 0.4;
    }
    if (verticalBeam.current) {
      verticalBeam.current.rotation.y = t * 0.2;
    }
  });

  const activeColor = isActive ? "#f59e0b" : isHovered ? "#fbbf24" : "#b45309";
  const glowIntensity = isActive ? 1.8 : isHovered ? 1.2 : 0.6;

  return (
    <group position={[0, 1.5, 0]}>
      
      {/* Central Orleans Silo Monolith (Hexagonal Reactor Core) */}
      <mesh ref={coreMonolith} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.75, 0.9, 1.8, 6]} />
        <meshStandardMaterial 
          color={activeColor} 
          emissive="#d4883b" 
          emissiveIntensity={glowIntensity} 
          metalness={0.7} 
          roughness={0.2} 
        />
      </mesh>

      {/* Top Reactor Crown */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.5, 0.75, 0.4, 6]} />
        <meshStandardMaterial color="#eeeff2" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Oceanic Upward Photon Light Beam */}
      <mesh ref={verticalBeam} position={[0, 3.5, 0]}>
        <cylinderGeometry args={[0.06, 0.15, 5, 8]} />
        <meshBasicMaterial color="#d4883b" transparent opacity={isActive ? 0.7 : 0.3} />
      </mesh>

      {/* Level 1: Inner Fast-Spinning Classroom Actor Grains */}
      <group ref={actorOrbitInner}>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI * 2) / 4;
          const r = 1.7;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle * 3) * 0.25, Math.sin(angle) * r]}>
              <boxGeometry args={[0.26, 0.26, 0.26]} />
              <meshStandardMaterial color="#fef08a" emissive="#d4883b" emissiveIntensity={isActive ? 2.2 : 1.2} />
            </mesh>
          );
        })}
      </group>

      {/* Level 2: Middle Inclined Participant Grains (WebRTC Connected) */}
      <group ref={actorOrbitMid} rotation={[0.4, 0, 0.3]}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI * 2) / 6;
          const r = 2.4;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}>
              <octahedronGeometry args={[0.18]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={isActive ? 1.8 : 0.8} />
            </mesh>
          );
        })}
      </group>

      {/* Level 3: Outer Planetary Ring of Event Coordinator Grains */}
      <group ref={actorOrbitOuter} rotation={[-0.35, 0, -0.2]}>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI * 2) / 4;
          const r = 3.1;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}>
              <dodecahedronGeometry args={[0.16]} />
              <meshStandardMaterial color="#ffffff" emissive="#d4883b" emissiveIntensity={1.0} />
            </mesh>
          );
        })}
      </group>

      {/* LiveKit WebRTC Dual Media Ribbons */}
      <mesh ref={mediaRing1}>
        <torusGeometry args={[2.7, 0.03, 12, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.65} />
      </mesh>
      <mesh ref={mediaRing2}>
        <torusGeometry args={[3.2, 0.025, 12, 64]} />
        <meshBasicMaterial color="#d4883b" transparent opacity={0.5} />
      </mesh>

      {/* Heavy FoundationDB Plinth Base */}
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.45, 8]} />
        <meshStandardMaterial color="#171d27" metalness={0.9} roughness={0.2} />
      </mesh>

    </group>
  );
}

// Station 06: Autonomous Multi-Agent Round-Table & Memory Ledger
function Station063D({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const tableRef = useRef<THREE.Group>(null);
  const memoryCore = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (tableRef.current) {
      tableRef.current.rotation.y = t * 0.45;
    }
    if (memoryCore.current) {
      memoryCore.current.rotation.y = -t * 0.9;
      memoryCore.current.position.y = 0.5 + Math.sin(t * 1.8) * 0.08;
    }
  });

  const activeColor = isActive ? "#d4883b" : isHovered ? "#38bdf8" : "#2d384a";

  return (
    <group position={[0, 1.2, 0]}>
      {/* Round-Table Dais */}
      <group ref={tableRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.08, 6]} />
          <meshStandardMaterial color={isActive ? "#1d2534" : "#121721"} metalness={0.8} roughness={0.3} />
        </mesh>
        
        {/* Tabletop circuit perimeter line */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <ringGeometry args={[1.2, 1.35, 6]} />
          <meshBasicMaterial color={activeColor} wireframe />
        </mesh>

        {/* Three Peer Agent Monoliths (Coordinator, Researcher, Synthesizer) */}
        {[0, 1, 2].map((i) => {
          const angle = (i * Math.PI * 2) / 3;
          const r = 1.05;
          const agentColors = ["#d4883b", "#38bdf8", "#10b981"];
          return (
            <mesh key={i} position={[Math.cos(angle) * r, 0.45, Math.sin(angle) * r]} rotation={[0, -angle, 0]}>
              <octahedronGeometry args={[0.26]} />
              <meshStandardMaterial 
                color={agentColors[i]} 
                emissive={agentColors[i]} 
                emissiveIntensity={isActive ? 1.0 : 0.4} 
                metalness={0.9} 
              />
            </mesh>
          );
        })}
      </group>

      {/* Floating Central Shared Memory Sphere */}
      <mesh ref={memoryCore}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color="#eeeff2" 
          emissive={isActive ? "#d4883b" : "#38bdf8"} 
          emissiveIntensity={isActive ? 1.5 : 0.6}
          wireframe
        />
      </mesh>
    </group>
  );
}

// Station 07: Zero-Bloat Maintainer Terminus
function Station073D({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) {
  const spireRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (spireRef.current) {
      spireRef.current.rotation.y = t * 0.4;
      spireRef.current.position.y = 1.4 + Math.sin(t * 1.5) * 0.07;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.6;
    }
  });

  const activeColor = isActive ? "#d4883b" : isHovered ? "#fbbf24" : "#394558";

  return (
    <group position={[0, 0, 0]}>
      {/* Floating Monolithic Crystal Spire */}
      <mesh ref={spireRef}>
        <coneGeometry args={[0.65, 2.0, 4]} />
        <meshStandardMaterial 
          color={activeColor} 
          wireframe={!isActive && !isHovered} 
          emissive={activeColor}
          emissiveIntensity={isActive ? 0.9 : 0.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Inverted lower crystal facet */}
      <mesh position={[0, 0.5, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.65, 0.8, 4]} />
        <meshStandardMaterial color={activeColor} metalness={0.8} wireframe />
      </mesh>

      {/* Expanding Zero-Bloat Aura Ring */}
      <mesh ref={ringRef} position={[0, 1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 12, 36]} />
        <meshBasicMaterial color={activeColor} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// ----------------------------------------------------------------------
// 2. CORRIDOR OPTICAL FIBER & SEABED BATHYMETRY
// ----------------------------------------------------------------------

function OpticalCorridorCable() {
  const { curve, tubeGeometry } = useMemo(() => {
    const points = STATION_POSITIONS.map(p => new THREE.Vector3(p[0], p[1], p[2]));
    const c = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.25);
    const geo = new THREE.TubeGeometry(c, 180, 0.12, 12, false);
    return { curve: c, tubeGeometry: geo };
  }, []);

  const photon1 = useRef<THREE.Mesh>(null);
  const photon2 = useRef<THREE.Mesh>(null);
  const photon3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (photon1.current) {
      const p1 = (t * 0.12) % 1;
      photon1.current.position.copy(curve.getPointAt(p1));
    }
    if (photon2.current) {
      const p2 = (t * 0.12 + 0.33) % 1;
      photon2.current.position.copy(curve.getPointAt(p2));
    }
    if (photon3.current) {
      const p3 = (t * 0.12 + 0.66) % 1;
      photon3.current.position.copy(curve.getPointAt(p3));
    }
  });

  return (
    <group>
      {/* Luminous Orange Core Cable */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial color="#d4883b" transparent opacity={0.88} />
      </mesh>

      {/* Traveling Data Photons with Dynamic Illumination */}
      <mesh ref={photon1}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
        <pointLight color="#d4883b" intensity={4.5} distance={10} />
      </mesh>

      <mesh ref={photon2}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshBasicMaterial color="#38bdf8" />
        <pointLight color="#38bdf8" intensity={3.5} distance={8} />
      </mesh>

      <mesh ref={photon3}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshBasicMaterial color="#10b981" />
        <pointLight color="#10b981" intensity={3.5} distance={8} />
      </mesh>
    </group>
  );
}

function BathymetricTerrain() {
  const terrainGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(140, 90, 70, 70);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Realistic ocean floor ridges, continental shelves & trenches
      const z = Math.sin(x * 0.08) * Math.cos(y * 0.08) * 2.5 + Math.sin(x * 0.2) * 0.8;
      pos.setZ(i, z - 2.8);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={terrainGeo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
      <meshStandardMaterial 
        color="#0a0e16" 
        wireframe={true} 
        transparent 
        opacity={0.38} 
        roughness={0.99}
      />
    </mesh>
  );
}

// ----------------------------------------------------------------------
// 3. STATION TERMINAL WRAPPER (CLICK-TO-INSPECT & 3D BILLBOARD)
// ----------------------------------------------------------------------

function StationTerminal({
  index,
  caseFile,
  isActive,
  onSelect
}: {
  index: number;
  caseFile: typeof CASE_FILES[0];
  isActive: boolean;
  onSelect: () => void;
}) {
  const pos = STATION_POSITIONS[index];
  const isFlagship = caseFile.chapterNumber === 5;
  const [isHovered, setIsHovered] = useState(false);

  const renderMotif = () => {
    switch (index) {
      case 0: return <Station013D isActive={isActive} isHovered={isHovered} />;
      case 1: return <Station023D isActive={isActive} isHovered={isHovered} />;
      case 2: return <Station033D isActive={isActive} isHovered={isHovered} />;
      case 3: return <Station043D isActive={isActive} isHovered={isHovered} />;
      case 4: return <Station053D isActive={isActive} isHovered={isHovered} />;
      case 5: return <Station063D isActive={isActive} isHovered={isHovered} />;
      case 6: return <Station073D isActive={isActive} isHovered={isHovered} />;
      default: return null;
    }
  };

  return (
    <group 
      position={[pos[0], 0, pos[2]]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setIsHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Solid Marine Concrete Foundation Plinth */}
      <mesh position={[0, pos[1] / 2, 0]}>
        <cylinderGeometry args={[1.05, 1.35, pos[1] + 0.4, 6]} />
        <meshStandardMaterial 
          color={isActive ? '#2a3547' : isHovered ? '#1e2634' : '#131720'} 
          roughness={0.5} 
          metalness={0.5} 
        />
      </mesh>

      {/* Clickable Ground Target Beacon Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[1.4, 1.8, 36]} />
        <meshBasicMaterial 
          color={isActive ? "#d4883b" : isHovered ? "#38bdf8" : "#222c3d"} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* Render Bespoke Station 3D Motif with subtle hover scaling */}
      <group scale={isHovered || isActive ? 1.08 : 1.0}>
        {renderMotif()}
      </group>

      {/* In-world Station Spot Point Light */}
      <pointLight 
        position={[0, pos[1] + 2.0, 0]} 
        color={isActive ? "#d4883b" : "#38bdf8"} 
        intensity={isActive ? 3.5 : isHovered ? 2.0 : 0.8} 
        distance={9} 
      />

      {/* Interactive 3D Billboard Badge */}
      <Html position={[0, pos[1] + (isFlagship ? 3.8 : 2.8), 0]} center distanceFactor={14}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all shadow-2xl flex items-center gap-1.5 cursor-pointer ${
            isActive
              ? 'bg-[#d4883b] text-[#0b0d11] font-bold ring-4 ring-[#d4883b]/40 scale-110'
              : isHovered
              ? 'bg-[#182335] text-[#38bdf8] border border-[#38bdf8] scale-105'
              : 'bg-[#0f1218]/95 text-[#eeeff2] hover:bg-[#1a212f] border border-[#2d374a]'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#0b0d11] animate-ping' : 'bg-emerald-400'}`}></span>
          <span>CH0{caseFile.chapterNumber}: {caseFile.title.split(':')[0]}</span>
          {isFlagship && <span className="text-amber-950 font-black px-1 rounded bg-amber-300">★ FLAGSHIP</span>}
        </button>
      </Html>
    </group>
  );
}

// ----------------------------------------------------------------------
// 4. CAMERA FLIGHT CONTROLLER
// ----------------------------------------------------------------------

function CameraFlightEngine({
  activeStationIndex,
  controlsRef
}: {
  activeStationIndex: number;
  controlsRef: React.RefObject<OrbitControlsImpl>;
}) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  // Whenever station index changes, update target coordinates
  useEffect(() => {
    const sPos = STATION_POSITIONS[activeStationIndex];
    const offset = STATION_CAMERA_OFFSETS[activeStationIndex];
    targetPos.current.set(sPos[0] + offset[0], sPos[1] + offset[1], sPos[2] + offset[2]);
    targetLookAt.current.set(sPos[0], sPos[1] + 1.2, sPos[2]);

    if (controlsRef.current) {
      controlsRef.current.target.copy(targetLookAt.current);
    }
  }, [activeStationIndex, controlsRef]);

  useFrame((_, delta) => {
    const lerpRate = Math.min(1.0, delta * 3.4);
    camera.position.lerp(targetPos.current, lerpRate);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt.current, lerpRate);
      controlsRef.current.update();
    }
  });

  return null;
}

// ----------------------------------------------------------------------
// 5. MAIN FULL-SCREEN 3D CORRIDOR VIEWPORT
// ----------------------------------------------------------------------

export const SignalCorridor3D: React.FC<SignalCorridor3DProps> = ({
  initialStationIndex = 4,
  onSelectStation,
  onExitToSkim
}) => {
  const [activeStationIndex, setActiveStationIndex] = useState(initialStationIndex);
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const [isDrifting, setIsDrifting] = useState(false);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const activeCaseFile = CASE_FILES[activeStationIndex];

  const handleSelectStationIndex = (idx: number) => {
    setActiveStationIndex(idx);
    setIsOverlayOpen(true);
    setIsDrifting(false);
    if (onSelectStation) {
      onSelectStation(CASE_FILES[idx].id);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleSelectStationIndex(Math.min(CASE_FILES.length - 1, activeStationIndex + 1));
      } else if (e.key === 'ArrowLeft') {
        handleSelectStationIndex(Math.max(0, activeStationIndex - 1));
      } else if (e.key === 'Escape') {
        setIsOverlayOpen(false);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsDrifting(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStationIndex]);

  // Periodic automatic flight when drift is active
  useEffect(() => {
    if (!isDrifting) return;
    const interval = setInterval(() => {
      setActiveStationIndex(prev => (prev + 1) % CASE_FILES.length);
    }, 7500);
    return () => clearInterval(interval);
  }, [isDrifting]);

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-[#07090d] overflow-hidden select-none">
      
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 inset-x-4 lg:inset-x-8 z-30 flex items-center justify-between pointer-events-none">
        
        {/* Left: Exit to 2D & Station Breadcrumb */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={onExitToSkim}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f1218]/92 hover:bg-[#1a212f] text-xs font-mono text-[#eeeff2] border border-[#2d374a] shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-[#d4883b]" />
            <span className="font-semibold">Exit to 2D Editorial View</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0f1218]/85 border border-[#232c3d] backdrop-blur-md text-xs font-mono text-[#7a8494]">
            <Radio className="w-3.5 h-3.5 text-[#d4883b] signal-live" />
            <span className="text-[#eeeff2] font-semibold">STATION 0{activeCaseFile.chapterNumber}:</span>
            <span className="truncate max-w-[200px]">{activeCaseFile.title.split(':')[0]}</span>
          </div>
        </div>

        {/* Right: Toggle Overlay Details & Guidance */}
        <div className="pointer-events-auto flex items-center gap-2">
          {!isOverlayOpen && (
            <button
              onClick={() => setIsOverlayOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4883b] hover:bg-[#e0984d] text-[#0b0d11] text-xs font-mono font-bold shadow-2xl transition-all hover:scale-105 active:scale-95"
            >
              <Eye className="w-4 h-4" />
              <span>Inspect Architecture Case File</span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0f1218]/85 border border-[#232c3d] text-[11px] font-mono text-[#7a8494]">
            <Compass className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Click 3D Objects • Drag to Orbit 360° • Scroll to Zoom</span>
          </div>
        </div>

      </div>

      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [10, 6, 11], fov: 45 }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.FogExp2('#07090d', 0.022);
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[20, 35, 25]} intensity={1.8} color="#f8fafc" />
        <directionalLight position={[-20, 20, -10]} intensity={0.8} color="#38bdf8" />
        
        {/* Flagship Hero Point Light */}
        <pointLight position={[10, 5, -1]} intensity={4.5} color="#d4883b" distance={30} />

        {/* Sparse Deep Sediment Drift Motes in 3D Space */}
        <Sparkles count={110} scale={70} size={2.8} speed={0.25} color="#7a8494" opacity={0.35} />

        {/* Camera Flight Motion Controller */}
        <CameraFlightEngine
          activeStationIndex={activeStationIndex}
          controlsRef={controlsRef}
        />

        {/* Free Orbit Controls (User can pan/orbit around any station!) */}
        <OrbitControls 
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.06}
          maxPolarAngle={Math.PI / 2.05}
          minDistance={3.2}
          maxDistance={38}
        />

        {/* Seabed Bathymetric Grid & Glowing Optical Corridor Spline */}
        <BathymetricTerrain />
        <OpticalCorridorCable />

        {/* 7 Repeater Station Terminals with Bespoke 3D Motifs */}
        {CASE_FILES.map((caseFile, idx) => (
          <StationTerminal
            key={caseFile.id}
            index={idx}
            caseFile={caseFile}
            isActive={activeStationIndex === idx}
            onSelect={() => handleSelectStationIndex(idx)}
          />
        ))}
      </Canvas>

      {/* Bottom Floating Console HUD */}
      <CorridorHUD
        currentStationIndex={activeStationIndex}
        onSelectStationIndex={handleSelectStationIndex}
        isDrifting={isDrifting}
        onToggleDrift={() => setIsDrifting(prev => !prev)}
        onSwitchToSkim={onExitToSkim}
      />

      {/* Sliding Case File Overlay Panel ("Show the Important Info") */}
      {isOverlayOpen && (
        <CaseFileOverlayPanel
          caseFile={activeCaseFile}
          onClose={() => setIsOverlayOpen(false)}
          onNavigateStation={(dir) => {
            if (dir === 'next') {
              handleSelectStationIndex(Math.min(CASE_FILES.length - 1, activeStationIndex + 1));
            } else {
              handleSelectStationIndex(Math.max(0, activeStationIndex - 1));
            }
          }}
          totalStations={CASE_FILES.length}
        />
      )}

    </div>
  );
};
