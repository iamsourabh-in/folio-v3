import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { CASE_FILES } from '../data/caseFiles';
import { CaseFileOverlayPanel } from './CaseFileOverlayPanel';
import { CorridorHUD } from './CorridorHUD';

interface SignalCorridor3DProps {
  onSelectStation?: (caseFileId: string) => void;
  onExitToSkim: () => void;
}

// 7 exact 3D coordinates along the surveyed seabed telecommunications corridor
const STATION_POSITIONS: [number, number, number][] = [
  [-22, 0.4, 10],   // 01: Travel Booking
  [-15, 1.1, 4],    // 02: Healthcare FHIR
  [-8, 0.8, -2],    // 03: Auth & Vault
  [0, 1.4, -5],     // 04: Financial GitOps Mesh
  [8, 2.2, -1],     // 05: Orleans Virtual Actors & WebRTC (Flagship)
  [16, 1.5, 5],     // 06: Agent-Native Systems & Ledger
  [24, 0.9, 9]      // 07: Open Source & Maintainer Terminus
];

// Camera offsets relative to the active station
const CAMERA_OFFSETS: [number, number, number][] = [
  [0, 3.2, 8.5],
  [0, 3.4, 8.0],
  [0, 3.2, 8.5],
  [0, 3.5, 9.0],
  [0, 4.2, 10.5], // Flagship wider shot
  [0, 3.4, 8.5],
  [0, 3.2, 8.5]
];

// The Luminous Optical Cable: smooth CatmullRom spline through the corridor
function OpticalCorridorCable() {
  const { curve, tubeGeometry } = useMemo(() => {
    const points = STATION_POSITIONS.map(p => new THREE.Vector3(p[0], p[1], p[2]));
    const c = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.25);
    const geo = new THREE.TubeGeometry(c, 120, 0.09, 8, false);
    return { curve: c, tubeGeometry: geo };
  }, []);

  const signalPhotonRef = useRef<THREE.Mesh>(null);

  // Traveling optical signal photon packet
  useFrame((state) => {
    if (signalPhotonRef.current) {
      const t = (state.clock.getElapsedTime() * 0.12) % 1;
      const pos = curve.getPointAt(t);
      signalPhotonRef.current.position.copy(pos);
    }
  });

  return (
    <group>
      {/* Outer cable envelope */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial color="#d4883b" transparent opacity={0.75} />
      </mesh>

      {/* Traveling photon signal packet along the fiber */}
      <mesh ref={signalPhotonRef}>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
        <pointLight color="#d4883b" intensity={3} distance={5} />
      </mesh>
    </group>
  );
}

// Procedural seabed relief terrain with wireframe bathymetry
function SeabedTerrain() {
  const terrainGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(90, 60, 52, 52);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = Math.sin(x * 0.12) * Math.cos(y * 0.12) * 1.5 + Math.sin(x * 0.25) * 0.5;
      pos.setZ(i, z - 2.0);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={terrainGeo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
      <meshStandardMaterial 
        color="#0d1118" 
        wireframe={true} 
        transparent 
        opacity={0.3} 
        roughness={0.95}
      />
    </mesh>
  );
}

// Orbiting Actor Grain representations around Station 05 (Flagship)
function FlagshipActorMesh({ position }: { position: [number, number, number] }) {
  const grainGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (grainGroupRef.current) {
      grainGroupRef.current.rotation.y = state.clock.getElapsedTime() * 0.8;
    }
  });

  return (
    <group position={[position[0], position[1] + 1.8, position[2]]}>
      {/* Orbiting Actor Grains */}
      <group ref={grainGroupRef}>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI) / 2;
          const r = 1.4;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle * 2) * 0.2, Math.sin(angle) * r]}>
              <boxGeometry args={[0.2, 0.2, 0.2]} />
              <meshStandardMaterial color="#f59e0b" emissive="#d4883b" emissiveIntensity={1.2} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Station Terminal Tower along the corridor
function StationTerminal({
  position,
  index,
  caseFile,
  isActive,
  onSelect
}: {
  position: [number, number, number];
  index: number;
  caseFile: typeof CASE_FILES[0];
  isActive: boolean;
  onSelect: () => void;
}) {
  const beaconRef = useRef<THREE.Mesh>(null);
  const isFlagship = caseFile.chapterNumber === 5;

  useFrame((state) => {
    if (beaconRef.current) {
      const t = state.clock.getElapsedTime();
      beaconRef.current.position.y = position[1] + 1.2 + Math.sin(t * 2 + index) * 0.08;
      beaconRef.current.rotation.y = t * 1.2;
    }
  });

  return (
    <group position={[position[0], 0, position[2]]}>
      {/* Concrete & Brushed Steel Pedestal */}
      <mesh position={[0, position[1] / 2, 0]}>
        <cylinderGeometry args={[0.75, 1.0, position[1] + 0.4, 6]} />
        <meshStandardMaterial 
          color={isActive ? '#1e2533' : '#12161f'} 
          roughness={0.6} 
          metalness={0.4} 
        />
      </mesh>

      {/* Floating Optical Core Beacon */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
        <mesh 
          ref={beaconRef} 
          position={[0, position[1] + 1.2, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          {isFlagship ? (
            <dodecahedronGeometry args={[0.65]} />
          ) : (
            <octahedronGeometry args={[0.45]} />
          )}
          <meshStandardMaterial 
            color={isFlagship ? '#f59e0b' : '#d4883b'} 
            emissive={isFlagship ? '#d4883b' : '#92400e'}
            emissiveIntensity={isActive ? 2.0 : 0.8}
            wireframe={!isActive}
          />
        </mesh>
      </Float>

      {/* Special flagship actor orbital visualization */}
      {isFlagship && <FlagshipActorMesh position={position} />}

      {/* In-world Station Billboard Tag */}
      <Html position={[0, position[1] + (isFlagship ? 2.8 : 2.2), 0]} center distanceFactor={14}>
        <button
          onClick={onSelect}
          className={`px-3 py-1 rounded text-[11px] font-mono whitespace-nowrap transition-all shadow-xl ${
            isActive
              ? 'bg-[#d4883b] text-[#0b0d11] font-bold ring-2 ring-white scale-110'
              : 'bg-[#0f1218]/90 text-[#eeeff2] hover:bg-[#1a212f] border border-[#2d374a]'
          }`}
        >
          <span>CH0{caseFile.chapterNumber}: {caseFile.title.split(':')[0]}</span>
          {isFlagship && <span className="ml-1 text-amber-200">★</span>}
        </button>
      </Html>
    </group>
  );
}

// Camera Flight Controller along the Corridor
function CorridorCameraController({
  activeStationIndex,
  isDrifting,
  onStationPassed
}: {
  activeStationIndex: number;
  isDrifting: boolean;
  onStationPassed: (index: number) => void;
}) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3());

  // Initialize camera position
  useEffect(() => {
    const sPos = STATION_POSITIONS[activeStationIndex];
    const offset = CAMERA_OFFSETS[activeStationIndex];
    currentPos.current.set(sPos[0] + offset[0], sPos[1] + offset[1], sPos[2] + offset[2]);
    currentLookAt.current.set(sPos[0], sPos[1] + 0.8, sPos[2]);
    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  }, []);

  useFrame((state, delta) => {
    // If auto-drifting, slowly increment position towards the next station
    if (isDrifting) {
      const t = (state.clock.getElapsedTime() * 0.08) % 1;
      const stationIdx = Math.min(6, Math.floor(t * 7));
      if (stationIdx !== activeStationIndex) {
        onStationPassed(stationIdx);
      }
    }

    // Target position for current station
    const sPos = STATION_POSITIONS[activeStationIndex];
    const offset = CAMERA_OFFSETS[activeStationIndex];
    const targetX = sPos[0] + offset[0];
    const targetY = sPos[1] + offset[1];
    const targetZ = sPos[2] + offset[2];

    // Smooth physical damping lerp
    const lerpSpeed = Math.min(1.0, delta * 2.8);
    camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), lerpSpeed);
    
    // Smooth lookAt interpolation
    currentLookAt.current.lerp(new THREE.Vector3(sPos[0], sPos[1] + 0.8, sPos[2]), lerpSpeed);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

export const SignalCorridor3D: React.FC<SignalCorridor3DProps> = ({
  onSelectStation,
  onExitToSkim
}) => {
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const [isDrifting, setIsDrifting] = useState(false);

  const activeCaseFile = CASE_FILES[activeStationIndex];

  // Handle station selection
  const handleSelectStationIndex = (idx: number) => {
    setActiveStationIndex(idx);
    setIsOverlayOpen(true);
    setIsDrifting(false);
    if (onSelectStation) {
      onSelectStation(CASE_FILES[idx].id);
    }
  };

  // Keyboard navigation (Arrow keys / Esc)
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

  return (
    <div className="relative w-full h-[750px] lg:h-[820px] bg-[#08090d] border-b border-[#202735] overflow-hidden select-none">
      
      {/* 3D Canvas Scene */}
      <Canvas
        camera={{ position: [-22, 4, 18], fov: 46 }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.FogExp2('#08090d', 0.026);
        }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[15, 25, 20]} intensity={1.3} color="#f8fafc" />
        <pointLight position={[8, 4, -1]} intensity={2.5} color="#d4883b" distance={20} />

        {/* Camera Flight Motion Engine */}
        <CorridorCameraController
          activeStationIndex={activeStationIndex}
          isDrifting={isDrifting}
          onStationPassed={(idx) => {
            setActiveStationIndex(idx);
          }}
        />

        {/* Bathymetric Bedrock Terrain & Optical Spline Cable */}
        <SeabedTerrain />
        <OpticalCorridorCable />

        {/* 7 Repeater Station Terminals */}
        {CASE_FILES.map((caseFile, idx) => (
          <StationTerminal
            key={caseFile.id}
            index={idx}
            position={STATION_POSITIONS[idx]}
            caseFile={caseFile}
            isActive={activeStationIndex === idx}
            onSelect={() => handleSelectStationIndex(idx)}
          />
        ))}
      </Canvas>

      {/* Floating In-World Controls HUD */}
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

      {/* Top Left Compass Status Banner */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0b0d11]/80 backdrop-blur-md border border-[#202735] text-xs font-mono text-[#d4883b]">
        <span className="w-2 h-2 rounded-full bg-[#d4883b] animate-ping"></span>
        <span>SURVEYED OPTICAL CORRIDOR // CHAPTER 0{activeCaseFile.chapterNumber} LOCKED</span>
      </div>

    </div>
  );
};
