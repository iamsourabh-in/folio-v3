import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Html, OrbitControls, Sparkles } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { CASE_FILES } from '../data/caseFiles';
import { CaseFileOverlayPanel } from './CaseFileOverlayPanel';
import { CorridorHUD } from './CorridorHUD';
import { ArrowLeft, Compass, Eye, Maximize2, Radio } from 'lucide-react';

interface SignalCorridor3DProps {
  onSelectStation?: (caseFileId: string) => void;
  onExitToSkim: () => void;
}

// 7 3D Coordinates along the surveyed underwater signal line
const STATION_POSITIONS: [number, number, number][] = [
  [-24, 0.5, 12],   // 01: Travel Booking Ingress
  [-16, 1.2, 5],    // 02: Healthcare FHIR Data Lattice
  [-8, 0.8, -2],    // 03: Cryptographic Vault Ring
  [0, 1.5, -6],     // 04: Financial GitOps Mesh Gate
  [9, 2.4, -1],     // 05: Flagship Orleans Actor Silo & WebRTC Core
  [18, 1.6, 6],     // 06: Agent-Native Round-Table Ledger
  [27, 1.0, 11]     // 07: Zero-Bloat Maintainer Terminus
];

// Optimal camera offsets when inspecting a station
const STATION_CAMERA_OFFSETS: [number, number, number][] = [
  [0, 2.5, 6.5],
  [0, 2.8, 6.2],
  [0, 2.6, 6.5],
  [0, 2.9, 7.0],
  [0, 3.8, 9.2], // Flagship wider cinematic frame
  [0, 2.8, 6.8],
  [0, 2.6, 6.5]
];

// ----------------------------------------------------------------------
// 1. BESPOKE PROCEDURAL STATION 3D MOTIFS
// ----------------------------------------------------------------------

// Station 01: High-Frequency Data Ingress (Concentric Pulsing Torque Rings)
function Station013D({ position, isActive }: { position: [number, number, number]; isActive: boolean }) {
  const outerRing = useRef<THREE.Mesh>(null);
  const innerRing = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (outerRing.current) outerRing.current.rotation.z = t * 0.7;
    if (innerRing.current) innerRing.current.rotation.x = -t * 0.9;
    if (coreRef.current) coreRef.current.rotation.y = t * 1.5;
  });

  return (
    <group position={[position[0], position[1] + 1.2, position[2]]}>
      {/* Outer Gyro Ring */}
      <mesh ref={outerRing}>
        <torusGeometry args={[1.3, 0.035, 12, 48]} />
        <meshStandardMaterial color={isActive ? "#d4883b" : "#445065"} emissive={isActive ? "#d4883b" : "#000"} emissiveIntensity={0.6} />
      </mesh>
      {/* Inner Ingress Ring */}
      <mesh ref={innerRing} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.95, 0.03, 12, 36]} />
        <meshStandardMaterial color={isActive ? "#38bdf8" : "#323c4d"} emissive={isActive ? "#38bdf8" : "#000"} emissiveIntensity={0.4} />
      </mesh>
      {/* Core Seed Octahedron */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.35]} />
        <meshStandardMaterial color="#eeeff2" wireframe={!isActive} />
      </mesh>
    </group>
  );
}

// Station 02: FHIR Interoperability Crypt (Isometric Standard Schemas)
function Station023D({ position, isActive }: { position: [number, number, number]; isActive: boolean }) {
  const boxGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (boxGroup.current) {
      boxGroup.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      boxGroup.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.15;
    }
  });

  return (
    <group ref={boxGroup} position={[position[0], position[1] + 1.2, position[2]]}>
      {/* Outer Boundary Cage */}
      <mesh>
        <boxGeometry args={[1.3, 1.3, 1.3]} />
        <meshBasicMaterial color={isActive ? "#38bdf8" : "#2a3648"} wireframe={true} />
      </mesh>
      {/* Inner Nested HIPAA Shield Cube */}
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial color={isActive ? "#2dd4bf" : "#202a36"} emissive={isActive ? "#2dd4bf" : "#000"} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// Station 03: Cryptographic Vault Relay (Perpendicular Dynamic Token Rings)
function Station033D({ position, isActive }: { position: [number, number, number]; isActive: boolean }) {
  const g1 = useRef<THREE.Mesh>(null);
  const g2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (g1.current) g1.current.rotation.y = t * 1.1;
    if (g2.current) g2.current.rotation.x = t * 0.8;
  });

  return (
    <group position={[position[0], position[1] + 1.2, position[2]]}>
      <mesh ref={g1}>
        <torusGeometry args={[1.2, 0.04, 12, 40]} />
        <meshStandardMaterial color={isActive ? "#d4883b" : "#455062"} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={g2}>
        <torusGeometry args={[1.45, 0.04, 12, 40]} />
        <meshStandardMaterial color={isActive ? "#f59e0b" : "#323b49"} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Central Key Cylinder */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.2, 0.6, 8]} />
        <meshStandardMaterial color="#eeeff2" emissive={isActive ? "#d4883b" : "#000"} emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

// Station 04: Financial GitOps Mesh Gate (Ingress Arch & Canary Splitting)
function Station043D({ position, isActive }: { position: [number, number, number]; isActive: boolean }) {
  const archRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (archRef.current) {
      archRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.05;
    }
  });

  return (
    <group ref={archRef} position={[position[0], position[1] + 1.2, position[2]]}>
      {/* Archway Portal */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.08, 8, 32, Math.PI]} />
        <meshStandardMaterial color={isActive ? "#10b981" : "#2d3748"} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Canary Traffic Beams */}
      <mesh position={[-0.4, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.2, 8]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
      <mesh position={[0.4, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 1.2, 8]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
    </group>
  );
}

// Station 05: The Orleans Actor Silo & LiveKit WebRTC Core (Flagship)
function Station053D({ position, isActive }: { position: [number, number, number]; isActive: boolean }) {
  const actorOrbitRef = useRef<THREE.Group>(null);
  const mediaRingRef = useRef<THREE.Mesh>(null);
  const coreMonolith = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (actorOrbitRef.current) {
      actorOrbitRef.current.rotation.y = t * 0.9;
    }
    if (mediaRingRef.current) {
      mediaRingRef.current.rotation.x = t * 0.4;
      mediaRingRef.current.rotation.z = t * 0.3;
    }
    if (coreMonolith.current) {
      coreMonolith.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group position={[position[0], position[1] + 1.4, position[2]]}>
      {/* Central Orleans Silo Monolith */}
      <mesh ref={coreMonolith} position={[0, 0, 0]}>
        <dodecahedronGeometry args={[0.85]} />
        <meshStandardMaterial 
          color={isActive ? "#f59e0b" : "#b45309"} 
          emissive={isActive ? "#d4883b" : "#78350f"} 
          emissiveIntensity={isActive ? 1.6 : 0.8}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Orbiting Actor Grains (ClassroomGrain, ParticipantGrain, EventCoordinatorGrain) */}
      <group ref={actorOrbitRef}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI * 2) / 6;
          const r = 2.0;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle * 2) * 0.35, Math.sin(angle) * r]}>
              <boxGeometry args={[0.26, 0.26, 0.26]} />
              <meshStandardMaterial 
                color="#fcd34d" 
                emissive="#d4883b" 
                emissiveIntensity={isActive ? 2.0 : 1.0} 
              />
            </mesh>
          );
        })}
      </group>

      {/* WebRTC Audio/Video Media Ring */}
      <mesh ref={mediaRingRef}>
        <torusGeometry args={[2.5, 0.035, 12, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} />
      </mesh>

      {/* FoundationDB Transactional Base */}
      <mesh position={[0, -0.9, 0]}>
        <boxGeometry args={[1.0, 0.4, 1.0]} />
        <meshStandardMaterial color="#1a2332" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Station 06: Autonomous Agent Frontier & Memory Ledger
function Station063D({ position, isActive }: { position: [number, number, number]; isActive: boolean }) {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.45;
    }
  });

  return (
    <group ref={ringRef} position={[position[0], position[1] + 1.2, position[2]]}>
      {/* Round-Table Hexagonal Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.4, 1.4, 0.05, 6]} />
        <meshStandardMaterial color={isActive ? "#1d2636" : "#121721"} metalness={0.7} />
      </mesh>
      {/* Three Peer Agent Monoliths */}
      {[0, 1, 2].map((i) => {
        const angle = (i * Math.PI * 2) / 3;
        const r = 1.0;
        return (
          <mesh key={i} position={[Math.cos(angle) * r, 0.4, Math.sin(angle) * r]}>
            <octahedronGeometry args={[0.25]} />
            <meshStandardMaterial color={i === 0 ? "#eeeff2" : "#d4883b"} emissive={isActive ? "#d4883b" : "#000"} emissiveIntensity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}

// Station 07: Zero-Bloat Terminus (Pure Crystal Monolith)
function Station073D({ position, isActive }: { position: [number, number, number]; isActive: boolean }) {
  const prismRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (prismRef.current) {
      prismRef.current.rotation.y = state.clock.getElapsedTime() * 0.35;
    }
  });

  return (
    <group position={[position[0], position[1] + 1.2, position[2]]}>
      <mesh ref={prismRef}>
        <coneGeometry args={[0.7, 1.8, 4]} />
        <meshStandardMaterial 
          color={isActive ? "#d4883b" : "#394456"} 
          wireframe={!isActive} 
          emissive={isActive ? "#d4883b" : "#000"}
          emissiveIntensity={0.8}
        />
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
    const geo = new THREE.TubeGeometry(c, 160, 0.1, 12, false);
    return { curve: c, tubeGeometry: geo };
  }, []);

  const photon1 = useRef<THREE.Mesh>(null);
  const photon2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (photon1.current) {
      const p1 = (t * 0.14) % 1;
      photon1.current.position.copy(curve.getPointAt(p1));
    }
    if (photon2.current) {
      const p2 = (t * 0.14 + 0.5) % 1;
      photon2.current.position.copy(curve.getPointAt(p2));
    }
  });

  return (
    <group>
      {/* Luminous Orange Core Cable */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial color="#d4883b" transparent opacity={0.85} />
      </mesh>

      {/* Traveling Data Photons */}
      <mesh ref={photon1}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
        <pointLight color="#d4883b" intensity={4} distance={8} />
      </mesh>

      <mesh ref={photon2}>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshBasicMaterial color="#38bdf8" />
        <pointLight color="#38bdf8" intensity={3} distance={6} />
      </mesh>
    </group>
  );
}

function BathymetricTerrain() {
  const terrainGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(120, 80, 60, 60);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Realistic ocean floor ridges & trenches
      const z = Math.sin(x * 0.09) * Math.cos(y * 0.09) * 2.2 + Math.sin(x * 0.22) * 0.7;
      pos.setZ(i, z - 2.5);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={terrainGeo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]}>
      <meshStandardMaterial 
        color="#0a0d13" 
        wireframe={true} 
        transparent 
        opacity={0.35} 
        roughness={0.98}
      />
    </mesh>
  );
}

// ----------------------------------------------------------------------
// 3. CAMERA FLIGHT CONTROLLER & STATION INTERACTION
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

  const renderMotif = () => {
    switch (index) {
      case 0: return <Station013D position={[0, 0, 0]} isActive={isActive} />;
      case 1: return <Station023D position={[0, 0, 0]} isActive={isActive} />;
      case 2: return <Station033D position={[0, 0, 0]} isActive={isActive} />;
      case 3: return <Station043D position={[0, 0, 0]} isActive={isActive} />;
      case 4: return <Station053D position={[0, 0, 0]} isActive={isActive} />;
      case 5: return <Station063D position={[0, 0, 0]} isActive={isActive} />;
      case 6: return <Station073D position={[0, 0, 0]} isActive={isActive} />;
      default: return null;
    }
  };

  return (
    <group position={[pos[0], 0, pos[2]]}>
      {/* Heavy Marine Concrete Pedestal */}
      <mesh position={[0, pos[1] / 2, 0]} onClick={(e) => { e.stopPropagation(); onSelect(); }}>
        <cylinderGeometry args={[0.9, 1.2, pos[1] + 0.4, 6]} />
        <meshStandardMaterial 
          color={isActive ? '#253042' : '#141822'} 
          roughness={0.6} 
          metalness={0.4} 
        />
      </mesh>

      {/* Clickable Ground Target Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} onClick={(e) => { e.stopPropagation(); onSelect(); }}>
        <ringGeometry args={[1.3, 1.6, 32]} />
        <meshBasicMaterial color={isActive ? "#d4883b" : "#242e3f"} side={THREE.DoubleSide} />
      </mesh>

      {/* Render Bespoke Motif */}
      {renderMotif()}

      {/* Interactive Floating HTML Badge */}
      <Html position={[0, pos[1] + (isFlagship ? 3.3 : 2.5), 0]} center distanceFactor={13}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all shadow-2xl flex items-center gap-1.5 cursor-pointer ${
            isActive
              ? 'bg-[#d4883b] text-[#0b0d11] font-bold ring-4 ring-[#d4883b]/40 scale-110'
              : 'bg-[#0f1218]/95 text-[#eeeff2] hover:bg-[#1a212f] border border-[#2d374a] hover:scale-105'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>CH0{caseFile.chapterNumber}: {caseFile.title.split(':')[0]}</span>
          {isFlagship && <span className="text-amber-950 font-black px-1 rounded bg-amber-300">FLAGSHIP</span>}
        </button>
      </Html>
    </group>
  );
}

// Camera Flight Engine
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
    targetLookAt.current.set(sPos[0], sPos[1] + 1.0, sPos[2]);

    if (controlsRef.current) {
      controlsRef.current.target.copy(targetLookAt.current);
    }
  }, [activeStationIndex, controlsRef]);

  useFrame((_, delta) => {
    const lerpRate = Math.min(1.0, delta * 3.2);
    camera.position.lerp(targetPos.current, lerpRate);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt.current, lerpRate);
      controlsRef.current.update();
    }
  });

  return null;
}

// ----------------------------------------------------------------------
// 4. MAIN FULL-SCREEN 3D CORRIDOR VIEWPORT
// ----------------------------------------------------------------------

export const SignalCorridor3D: React.FC<SignalCorridor3DProps> = ({
  onSelectStation,
  onExitToSkim
}) => {
  const [activeStationIndex, setActiveStationIndex] = useState(4); // Default to Flagship (Ch 05)
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
    }, 7000);
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
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f1218]/90 hover:bg-[#1a212f] text-xs font-mono text-[#eeeff2] border border-[#2d374a] shadow-2xl backdrop-blur-md transition-all hover:scale-105"
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

        {/* Right: Toggle Overlay Details & Status */}
        <div className="pointer-events-auto flex items-center gap-2">
          {!isOverlayOpen && (
            <button
              onClick={() => setIsOverlayOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4883b] hover:bg-[#e0984d] text-[#0b0d11] text-xs font-mono font-bold shadow-2xl transition-all hover:scale-105"
            >
              <Eye className="w-4 h-4" />
              <span>Inspect Case File</span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0f1218]/85 border border-[#232c3d] text-[11px] font-mono text-[#7a8494]">
            <Compass className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Drag to Orbit • Scroll to Zoom</span>
          </div>
        </div>

      </div>

      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [9, 5, 10], fov: 45 }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.FogExp2('#07090d', 0.024);
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[20, 30, 25]} intensity={1.5} color="#f8fafc" />
        <pointLight position={[9, 4, -1]} intensity={3.5} color="#d4883b" distance={25} />

        {/* Sparse Deep Sediment Drift Motes */}
        <Sparkles count={80} scale={60} size={2.5} speed={0.2} color="#7a8494" opacity={0.3} />

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
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2.05}
          minDistance={3.5}
          maxDistance={35}
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

      {/* Sliding Case File Overlay Panel */}
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
