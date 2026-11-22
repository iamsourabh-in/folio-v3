import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { CASE_FILES } from '../data/caseFiles';
import { PLANETS_META, PlanetMeta } from '../data/planetData';
import { SpaceshipModel } from './SpaceshipModel';
import { CosmicPlanets } from './CosmicPlanets';
import { SpaceshipCockpitHUD } from './SpaceshipCockpitHUD';
import { CaseFileOverlayPanel } from './CaseFileOverlayPanel';
import { flightAudio } from '../utils/flightAudio';

interface SignalCorridor3DProps {
  initialStationIndex?: number;
  onSelectStation?: (caseFileId: string) => void;
  onExitToSkim: () => void;
}

// -------------------------------------------------------------
// SPACESHIP FLIGHT & CHASE CAMERA SIMULATOR ENGINE
// -------------------------------------------------------------

function SpaceshipFlightEngine({
  targetPlanetIndex,
  isAutopilot,
  isBoosting,
  onUpdateTelemetry,
  onReachPlanet
}: {
  targetPlanetIndex: number;
  isAutopilot: boolean;
  isBoosting: boolean;
  onUpdateTelemetry: (pos: THREE.Vector3, speed: number, dist: number, roll: number) => void;
  onReachPlanet: (index: number) => void;
}) {
  const { camera } = useThree();

  // Ship position & orientation in cosmic space
  const shipPos = useRef(new THREE.Vector3(12, 5, 36));
  const shipRot = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const shipQuat = useRef(new THREE.Quaternion());
  const shipSpeed = useRef(0.5);
  const currentRoll = useRef(0);
  const hasTriggeredArrival = useRef<number | null>(null);

  // Flight vectors
  const forwardVec = useRef(new THREE.Vector3());
  const targetOrbitPos = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const targetPlanet = PLANETS_META[targetPlanetIndex];
    const targetCenter = new THREE.Vector3(...targetPlanet.coordinates);

    // Compute optimal orbital parking position for current target planet
    targetOrbitPos.current.set(
      targetCenter.x + Math.sin(t * 0.25) * (targetPlanet.radius + 6.5),
      targetCenter.y + 1.8 + Math.cos(t * 0.25) * 1.5,
      targetCenter.z + Math.cos(t * 0.25) * (targetPlanet.radius + 6.5)
    );

    const distanceToTarget = shipPos.current.distanceTo(targetCenter);

    if (isAutopilot) {
      // ---------------------------------------------------------
      // AUTOPILOT WARP & ORBIT CRUISE
      // ---------------------------------------------------------
      const distToOrbit = shipPos.current.distanceTo(targetOrbitPos.current);
      
      // Speed scales up for long journeys, smoothly throttles down upon orbital entry
      const desiredSpeed = distToOrbit > 18 ? 3.5 : distToOrbit > 6 ? 1.6 : 0.45;
      shipSpeed.current = THREE.MathUtils.lerp(shipSpeed.current, desiredSpeed, delta * 2.5);

      // Interpolate ship position toward orbital destination
      const moveRate = Math.min(1.0, (shipSpeed.current * delta * 5.0) / Math.max(1.0, distToOrbit));
      shipPos.current.lerp(targetOrbitPos.current, moveRate);

      // Orient ship forward along its flight trajectory
      const lookTarget = distToOrbit > 4 ? targetOrbitPos.current : targetCenter;
      const m = new THREE.Matrix4().lookAt(shipPos.current, lookTarget, new THREE.Vector3(0, 1, 0));
      shipQuat.current.setFromRotationMatrix(m);

      // Subtle atmospheric banking in orbit
      currentRoll.current = THREE.MathUtils.lerp(currentRoll.current, Math.sin(t * 0.5) * 0.2, delta * 2.0);

      // Check arrival condition
      if (distToOrbit < 8 && hasTriggeredArrival.current !== targetPlanetIndex) {
        hasTriggeredArrival.current = targetPlanetIndex;
        onReachPlanet(targetPlanetIndex);
      }

    } else {
      // ---------------------------------------------------------
      // MANUAL PILOTING (MOUSE & WASD)
      // ---------------------------------------------------------
      const pointer = state.pointer;
      const targetPitch = -pointer.y * 0.8;
      const targetYaw = -pointer.x * 1.5;
      const targetRoll = -pointer.x * 0.65;

      shipRot.current.x = THREE.MathUtils.lerp(shipRot.current.x, targetPitch, delta * 3.0);
      shipRot.current.y = THREE.MathUtils.lerp(shipRot.current.y, targetYaw, delta * 3.0);
      currentRoll.current = THREE.MathUtils.lerp(currentRoll.current, targetRoll, delta * 4.0);
      shipQuat.current.setFromEuler(shipRot.current);

      const targetSpeed = isBoosting ? 2.5 : 0.65;
      shipSpeed.current = THREE.MathUtils.lerp(shipSpeed.current, targetSpeed, delta * 3.0);

      // Move ship forward in direction of its orientation
      forwardVec.current.set(0, 0, 1).applyQuaternion(shipQuat.current);
      shipPos.current.addScaledVector(forwardVec.current, shipSpeed.current * delta * 8.0);
    }

    // Telemetry update to parent HUD
    onUpdateTelemetry(shipPos.current, shipSpeed.current, distanceToTarget, currentRoll.current);

    // ---------------------------------------------------------
    // CHASE CAMERA DYNAMICS (SMOOTH INERTIA & WARP FOV)
    // ---------------------------------------------------------
    const camOffset = new THREE.Vector3(0, 2.2, -6.8).applyQuaternion(shipQuat.current);
    const desiredCamPos = shipPos.current.clone().add(camOffset);
    
    camera.position.lerp(desiredCamPos, Math.min(1.0, delta * 5.0));

    const aimAhead = new THREE.Vector3(0, 0.4, 8.0).applyQuaternion(shipQuat.current);
    const camLookTarget = shipPos.current.clone().add(aimAhead);
    camera.lookAt(camLookTarget);
  });

  return (
    <group position={shipPos.current} quaternion={shipQuat.current}>
      <SpaceshipModel 
        speed={shipSpeed.current} 
        isBoosting={isBoosting} 
        rollAngle={currentRoll.current} 
      />
    </group>
  );
}

// -------------------------------------------------------------
// MAIN FULL-SCREEN COSMIC FLIGHT PORTFOLIO VIEWPORT
// -------------------------------------------------------------

export const SignalCorridor3D: React.FC<SignalCorridor3DProps> = ({
  initialStationIndex = 4,
  onSelectStation,
  onExitToSkim
}) => {
  const [activePlanetIndex, setActivePlanetIndex] = useState(initialStationIndex);
  const [isAutopilot, setIsAutopilot] = useState(true);
  const [isBoosting, setIsBoosting] = useState(false);
  const [isCodexOpen, setIsCodexOpen] = useState(true);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Live telemetry state
  const [shipPosition, setShipPosition] = useState(new THREE.Vector3(12, 5, 36));
  const [flightSpeed, setFlightSpeed] = useState(0.5);
  const [distanceToTarget, setDistanceToTarget] = useState(12);

  // Achievement unlock notification banner
  const [achievementNotification, setAchievementNotification] = useState<{
    title: string;
    subtitle: string;
  } | null>(null);

  const activePlanet = PLANETS_META[activePlanetIndex];
  const activeCaseFile = CASE_FILES[activePlanetIndex];

  // Planet selection handler (Engages Quantum Autopilot to that planet!)
  const handleSelectPlanet = (idx: number) => {
    setActivePlanetIndex(idx);
    setIsAutopilot(true);
    flightAudio.playWarpWhoosh();
    flightAudio.playTargetLock();

    if (onSelectStation) {
      onSelectStation(CASE_FILES[idx].id);
    }
  };

  // Called when the spaceship enters the planet's orbit
  const handleReachPlanet = (idx: number) => {
    const planet = PLANETS_META[idx];
    setAchievementNotification({
      title: planet.achievementTitle,
      subtitle: planet.achievementSubtitle
    });
    flightAudio.playAchievementChime();
    setIsCodexOpen(true);

    // Auto-dismiss achievement toast after 6 seconds
    setTimeout(() => {
      setAchievementNotification(null);
    }, 6000);
  };

  // Keyboard navigation & flight controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift' || e.key === ' ' || e.key.toLowerCase() === 'w') {
        setIsBoosting(true);
      } else if (e.key === 'ArrowRight') {
        handleSelectPlanet(Math.min(PLANETS_META.length - 1, activePlanetIndex + 1));
      } else if (e.key === 'ArrowLeft') {
        handleSelectPlanet(Math.max(0, activePlanetIndex - 1));
      } else if (e.key.toLowerCase() === 'f') {
        setIsCodexOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsCodexOpen(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift' || e.key === ' ' || e.key.toLowerCase() === 'w') {
        setIsBoosting(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activePlanetIndex]);

  const handleToggleSound = () => {
    flightAudio.isMuted = !isSoundMuted;
    setIsSoundMuted(!isSoundMuted);
  };

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-[#040609] overflow-hidden select-none">
      
      {/* 3D Cosmic Space Flight Canvas */}
      <Canvas
        camera={{ position: [12, 7, 42], fov: 48, near: 0.1, far: 800 }}
        onCreated={({ scene }) => {
          scene.fog = new THREE.FogExp2('#040609', 0.005);
        }}
      >
        {/* Cosmic Starlight Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[100, 80, 50]} intensity={2.2} color="#fdf4dc" />
        <directionalLight position={[-80, -40, -50]} intensity={0.6} color="#38bdf8" />

        {/* Dense Galactic Starfield (6000 stars) */}
        <Stars radius={160} depth={80} count={6000} factor={4} saturation={0} fade speed={1.2} />

        {/* Cosmic Plasma Dust Motes */}
        <Sparkles count={140} scale={120} size={2.6} speed={0.3} color="#38bdf8" opacity={0.35} />

        {/* 7 Celestial Megastructure Destination Planets situated to the sides */}
        <CosmicPlanets
          shipPos={shipPosition}
          targetedPlanetIndex={activePlanetIndex}
          onSelectPlanet={handleSelectPlanet}
        />

        {/* Real-time Spaceship Flight & Chase Camera Engine */}
        <SpaceshipFlightEngine
          targetPlanetIndex={activePlanetIndex}
          isAutopilot={isAutopilot}
          isBoosting={isBoosting}
          onUpdateTelemetry={(pos, spd, dist) => {
            setShipPosition(pos);
            setFlightSpeed(spd);
            setDistanceToTarget(dist);
          }}
          onReachPlanet={handleReachPlanet}
        />
      </Canvas>

      {/* Futuristic Cockpit HUD, Target Lock & Autopilot Scrubber */}
      <SpaceshipCockpitHUD
        currentPlanetIndex={activePlanetIndex}
        targetedPlanet={activePlanet}
        speed={flightSpeed}
        isBoosting={isBoosting}
        distanceToTarget={distanceToTarget}
        achievementNotification={achievementNotification}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
        onSelectPlanet={handleSelectPlanet}
        onToggleCodex={() => setIsCodexOpen(prev => !prev)}
        isCodexOpen={isCodexOpen}
        onExitFlight={onExitToSkim}
      />

      {/* Planetary Architectural Codex Drawer ("The 3D Planet Will Tell Me Info of This") */}
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
