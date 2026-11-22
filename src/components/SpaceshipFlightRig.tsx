import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PLANETS_META } from '../data/planetData';
import { SpaceshipModel } from './SpaceshipModel';

interface SpaceshipFlightRigProps {
  steerX: number; // -1 (left) to +1 (right)
  steerY: number; // -1 (down) to +1 (up)
  isBoosting: boolean;
  autopilotPlanetIndex: number | null;
  onReachPlanet: (index: number) => void;
  onUpdateTelemetry: (speedKm: number, targetName: string, distanceAu: number) => void;
}

export const SpaceshipFlightRig: React.FC<SpaceshipFlightRigProps> = ({
  steerX,
  steerY,
  isBoosting,
  autopilotPlanetIndex,
  onReachPlanet,
  onUpdateTelemetry
}) => {
  const { camera } = useThree();

  // Root Flight Rig Position in 3D Space
  const rigRef = useRef<THREE.Group>(null);
  const shipVisualRef = useRef<THREE.Group>(null);

  // Flight vectors
  const pos = useRef(new THREE.Vector3(0, 0, -10));
  const currentSpeed = useRef(20.0);
  const currentRoll = useRef(0);
  const currentPitch = useRef(0);
  const currentYaw = useRef(0);

  // Orbit / Autopilot state
  const orbitAngle = useRef(0);
  const hasTriggeredArrival = useRef<number | null>(null);
  const lastTelemetryUpdate = useRef(0);

  // Initialize camera position behind ship
  useEffect(() => {
    camera.position.set(0, 3, -18);
    camera.lookAt(0, 0, 5);
  }, [camera]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const clampedDelta = Math.min(delta, 0.1); // Prevent physics explosion on tab switch

    const targetSpeed = isBoosting ? 48.0 : 20.0;
    currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, targetSpeed, clampedDelta * 4.0);

    if (autopilotPlanetIndex !== null) {
      // -------------------------------------------------------------
      // AUTOPILOT NAVIGATION: WARP TO TARGET PLANET & ENTER ORBIT
      // -------------------------------------------------------------
      const targetPlanet = PLANETS_META[autopilotPlanetIndex];
      const targetPos = new THREE.Vector3(...targetPlanet.coordinates);
      const distToPlanet = pos.current.distanceTo(targetPos);

      if (distToPlanet > targetPlanet.radius + 8.5) {
        // En route: fly smoothly towards parking orbit
        const desiredX = targetPlanet.coordinates[0] > 0 
          ? targetPlanet.coordinates[0] - 8.0 
          : targetPlanet.coordinates[0] + 8.0;
        const desiredY = targetPlanet.coordinates[1] + 1.5;
        const desiredZ = targetPlanet.coordinates[2] - 8.0;

        pos.current.x = THREE.MathUtils.lerp(pos.current.x, desiredX, clampedDelta * 3.5);
        pos.current.y = THREE.MathUtils.lerp(pos.current.y, desiredY, clampedDelta * 3.5);
        pos.current.z = THREE.MathUtils.lerp(pos.current.z, desiredZ, clampedDelta * 3.5);

        // Bank towards target
        const dx = desiredX - pos.current.x;
        currentRoll.current = THREE.MathUtils.lerp(currentRoll.current, -Math.sign(dx) * 0.45, clampedDelta * 4.0);
        currentYaw.current = THREE.MathUtils.lerp(currentYaw.current, Math.sign(dx) * 0.25, clampedDelta * 4.0);
        currentPitch.current = THREE.MathUtils.lerp(currentPitch.current, 0, clampedDelta * 4.0);
      } else {
        // High Orbit: circle around the planet
        orbitAngle.current += clampedDelta * 0.5;
        const orbitR = targetPlanet.radius + 6.5;
        pos.current.x = targetPlanet.coordinates[0] + Math.sin(orbitAngle.current) * orbitR;
        pos.current.y = targetPlanet.coordinates[1] + Math.sin(orbitAngle.current * 2) * 0.8;
        pos.current.z = targetPlanet.coordinates[2] + Math.cos(orbitAngle.current) * orbitR;

        currentRoll.current = THREE.MathUtils.lerp(currentRoll.current, Math.sin(t * 0.5) * 0.2, clampedDelta * 3.0);
        currentYaw.current = THREE.MathUtils.lerp(currentYaw.current, orbitAngle.current + Math.PI / 2, clampedDelta * 3.0);
        currentPitch.current = THREE.MathUtils.lerp(currentPitch.current, 0, clampedDelta * 3.0);

        // Trigger arrival once
        if (hasTriggeredArrival.current !== autopilotPlanetIndex) {
          hasTriggeredArrival.current = autopilotPlanetIndex;
          onReachPlanet(autopilotPlanetIndex);
        }
      }
    } else {
      // -------------------------------------------------------------
      // FREE FORWARD FLIGHT DOWN THE GALACTIC HIGHWAY
      // -------------------------------------------------------------
      hasTriggeredArrival.current = null;

      // Forward flight along +Z
      pos.current.z += currentSpeed.current * clampedDelta;

      // Horizontal steering (Left / Right)
      pos.current.x += steerX * 24.0 * clampedDelta;
      pos.current.x = THREE.MathUtils.clamp(pos.current.x, -38, 38);

      // Vertical steering (Up / Down)
      pos.current.y += steerY * 18.0 * clampedDelta;
      pos.current.y = THREE.MathUtils.clamp(pos.current.y, -12, 16);

      // Banking physics: roll and yaw into turn
      const targetRoll = -steerX * 0.65;
      const targetYaw = steerX * 0.28;
      const targetPitch = -steerY * 0.45;

      currentRoll.current = THREE.MathUtils.lerp(currentRoll.current, targetRoll, clampedDelta * 5.0);
      currentYaw.current = THREE.MathUtils.lerp(currentYaw.current, targetYaw, clampedDelta * 4.0);
      currentPitch.current = THREE.MathUtils.lerp(currentPitch.current, targetPitch, clampedDelta * 4.0);

      // Loop highway seamlessly when passing Terminus
      if (pos.current.z > 335) {
        pos.current.z = -15;
      }
    }

    // Update Three.js scene graph group directly (Zero React re-render lag!)
    if (rigRef.current) {
      rigRef.current.position.copy(pos.current);
    }
    if (shipVisualRef.current) {
      shipVisualRef.current.rotation.z = currentRoll.current;
      shipVisualRef.current.rotation.y = currentYaw.current;
      shipVisualRef.current.rotation.x = currentPitch.current;
    }

    // -------------------------------------------------------------
    // CHASE CAMERA: SMOOTH SPRING DAMPING
    // -------------------------------------------------------------
    const desiredCamX = pos.current.x * 0.82;
    const desiredCamY = pos.current.y + 2.4;
    const desiredCamZ = pos.current.z - 7.6 - (isBoosting ? 1.8 : 0);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredCamX, clampedDelta * 6.0);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, desiredCamY, clampedDelta * 6.0);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredCamZ, clampedDelta * 6.0);

    camera.lookAt(pos.current.x, pos.current.y + 0.4, pos.current.z + 8.0);

    // -------------------------------------------------------------
    // THROTTLED TELEMETRY UPDATES (Every 150ms, prevents React re-render lag)
    // -------------------------------------------------------------
    if (t - lastTelemetryUpdate.current > 0.15) {
      lastTelemetryUpdate.current = t;

      // Find nearest planet
      let closestIdx = 0;
      let closestDist = Infinity;
      PLANETS_META.forEach((p, idx) => {
        const pVec = new THREE.Vector3(...p.coordinates);
        const d = pos.current.distanceTo(pVec);
        if (d < closestDist) {
          closestDist = d;
          closestIdx = idx;
        }
      });

      const speedKm = Math.round(currentSpeed.current * 32);
      onUpdateTelemetry(speedKm, PLANETS_META[closestIdx].name, Math.round(closestDist));
    }
  });

  return (
    <group ref={rigRef}>
      <group ref={shipVisualRef}>
        <SpaceshipModel 
          speed={isBoosting ? 2.5 : 1.0} 
          isBoosting={isBoosting} 
          rollAngle={0} 
        />
      </group>
    </group>
  );
};
