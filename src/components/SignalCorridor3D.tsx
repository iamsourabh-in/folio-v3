import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { CASE_FILES } from '../data/caseFiles';
import { PLANETS_META } from '../data/planetData';
import { SpaceshipFlightRig } from './SpaceshipFlightRig';
import { CosmicPlanets } from './CosmicPlanets';
import { GalacticWaypoints } from './GalacticWaypoints';
import { SpaceshipCockpitHUD } from './SpaceshipCockpitHUD';
import { CaseFileOverlayPanel } from './CaseFileOverlayPanel';
import { flightAudio } from '../utils/flightAudio';

interface SignalCorridor3DProps {
  initialStationIndex?: number;
  onSelectStation?: (caseFileId: string) => void;
  onExitToSkim: () => void;
}

export const SignalCorridor3D: React.FC<SignalCorridor3DProps> = ({
  initialStationIndex = null,
  onSelectStation,
  onExitToSkim
}) => {
  // Flight steering state
  const [steerX, setSteerX] = useState(0);
  const [steerY, setSteerY] = useState(0);
  const [isBoosting, setIsBoosting] = useState(false);
  const [autopilotPlanetIndex, setAutopilotPlanetIndex] = useState<number | null>(initialStationIndex);

  // Codex & HUD state
  const [activePlanetIndex, setActivePlanetIndex] = useState<number>(initialStationIndex ?? 4);
  const [isCodexOpen, setIsCodexOpen] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 1024 : false;
  });
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Telemetry (throttled from FlightRig)
  const [telemetry, setTelemetry] = useState({
    speedKm: 640,
    targetName: PLANETS_META[initialStationIndex ?? 4].name,
    distanceAu: 15
  });

  // Achievement unlock notification banner
  const [achievementNotification, setAchievementNotification] = useState<{
    title: string;
    subtitle: string;
  } | null>(null);

  // Touch gesture state
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const activePlanet = PLANETS_META[activePlanetIndex];
  const activeCaseFile = CASE_FILES[activePlanetIndex];

  // Called when user clicks a planet on the HUD or in 3D
  const handleSelectPlanet = (idx: number) => {
    setActivePlanetIndex(idx);
    setAutopilotPlanetIndex(idx);
    setSteerX(0);
    setSteerY(0);

    flightAudio.playWarpWhoosh();
    flightAudio.playTargetLock();

    if (onSelectStation) {
      onSelectStation(CASE_FILES[idx].id);
    }
  };

  // Called when spaceship enters proximity of a planet
  const handleReachPlanet = (idx: number) => {
    setActivePlanetIndex(idx);
    const planet = PLANETS_META[idx];
    setAchievementNotification({
      title: planet.achievementTitle,
      subtitle: planet.achievementSubtitle
    });
    flightAudio.playAchievementChime();

    // Auto-open codex only on desktop viewports
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setIsCodexOpen(true);
    }

    setTimeout(() => {
      setAchievementNotification(null);
    }, 6000);
  };

  // Keyboard flight controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift' || e.key === ' ' || e.key.toLowerCase() === 'w') {
        setIsBoosting(true);
        flightAudio.playWarpWhoosh();
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        setSteerX(1.0);
        setAutopilotPlanetIndex(null);
      } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        setSteerX(-1.0);
        setAutopilotPlanetIndex(null);
      } else if (e.key === 'ArrowUp') {
        setSteerY(1.0);
        setAutopilotPlanetIndex(null);
      } else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
        setSteerY(-1.0);
        setAutopilotPlanetIndex(null);
      } else if (e.key.toLowerCase() === 'f') {
        setIsCodexOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsCodexOpen(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift' || e.key === ' ' || e.key.toLowerCase() === 'w') {
        setIsBoosting(false);
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd' || e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        setSteerX(0);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
        setSteerY(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleToggleSound = () => {
    flightAudio.isMuted = !isSoundMuted;
    setIsSoundMuted(!isSoundMuted);
  };

  return (
    <div 
      className="fixed inset-0 z-50 w-screen h-screen bg-[#030508] overflow-hidden select-none"
      style={{ touchAction: 'none' }}
      onTouchStart={(e) => {
        if ((e.target as HTMLElement).tagName !== 'BUTTON') {
          touchStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
          };
        }
      }}
      onTouchMove={(e) => {
        if (touchStartRef.current !== null) {
          const deltaX = (e.touches[0].clientX - touchStartRef.current.x) / (window.innerWidth * 0.25);
          const deltaY = (touchStartRef.current.y - e.touches[0].clientY) / (window.innerHeight * 0.25);
          setSteerX(Math.max(-1, Math.min(1, deltaX * 1.5)));
          setSteerY(Math.max(-1, Math.min(1, deltaY * 1.5)));
          setAutopilotPlanetIndex(null);
        }
      }}
      onTouchEnd={() => {
        touchStartRef.current = null;
        setSteerX(0);
        setSteerY(0);
      }}
    >
      
      {/* 3D WebGL Flight Canvas */}
      <Canvas
        camera={{ position: [0, 3, -18], fov: 48, near: 0.1, far: 900 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance', antialias: true }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.FogExp2('#030508', 0.004);
        }}
      >
        {/* Cosmic Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[100, 100, 100]} intensity={2.5} color="#fff4dd" />
        <directionalLight position={[-100, -50, -50]} intensity={0.7} color="#38bdf8" />

        {/* 5000 Deep Cosmic Stars */}
        <Stars radius={180} depth={90} count={5000} factor={4} saturation={0} fade speed={1.2} />

        {/* Cosmic Plasma Motes */}
        <Sparkles count={100} scale={140} size={2.5} speed={0.4} color="#38bdf8" opacity={0.35} />

        {/* Galactic Waypoints & Space Gates along Corridor */}
        <GalacticWaypoints />

        {/* 7 Majestic Celestial Megastructure Planets to the Sides */}
        <CosmicPlanets
          shipPos={new THREE.Vector3(0, 0, 0)}
          targetedPlanetIndex={activePlanetIndex}
          onSelectPlanet={handleSelectPlanet}
        />

        {/* Real-Time Spaceship Flight Rig & Chase Camera */}
        <SpaceshipFlightRig
          steerX={steerX}
          steerY={steerY}
          isBoosting={isBoosting}
          autopilotPlanetIndex={autopilotPlanetIndex}
          onReachPlanet={handleReachPlanet}
          onUpdateTelemetry={(speedKm, targetName, distanceAu) => {
            setTelemetry({ speedKm, targetName, distanceAu });
          }}
        />
      </Canvas>

      {/* Cockpit HUD & Touch Controls */}
      <SpaceshipCockpitHUD
        currentPlanetIndex={activePlanetIndex}
        targetedPlanet={activePlanet}
        speed={telemetry.speedKm / 320}
        isBoosting={isBoosting}
        distanceToTarget={telemetry.distanceAu}
        achievementNotification={achievementNotification}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
        onSelectPlanet={handleSelectPlanet}
        onToggleCodex={() => setIsCodexOpen(prev => !prev)}
        isCodexOpen={isCodexOpen}
        onExitFlight={onExitToSkim}
        onSteerLeft={() => {
          setSteerX(-1.0);
          setAutopilotPlanetIndex(null);
        }}
        onSteerRight={() => {
          setSteerX(1.0);
          setAutopilotPlanetIndex(null);
        }}
        onSteerReset={() => {
          setSteerX(0);
          setSteerY(0);
        }}
        onStartBoost={() => {
          setIsBoosting(true);
          flightAudio.playWarpWhoosh();
        }}
        onStopBoost={() => {
          setIsBoosting(false);
        }}
      />

      {/* Planetary Architectural Codex Drawer */}
      {isCodexOpen && (
        <CaseFileOverlayPanel
          caseFile={activeCaseFile}
          onClose={() => setIsCodexOpen(false)}
          onNavigateStation={(dir) => {
            if (dir === 'next') {
              handleSelectPlanet(Math.min(PLANETS_META.length - 1, activePlanetIndex + 1));
            } else {
              handleSelectPlanet(Math.max(0, activePlanetIndex - 1));
            }
          }}
          totalStations={PLANETS_META.length}
        />
      )}

    </div>
  );
};
