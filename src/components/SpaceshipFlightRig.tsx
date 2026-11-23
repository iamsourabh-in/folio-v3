import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PLANETS_META } from '../data/planetData';
import { SpaceshipModel } from './SpaceshipModel';

interface SpaceshipFlightRigProps {
  steerX: number; // -1 (left) to +1 (right)
  steerY: number; // -1 to +1
  isThrusting: boolean;
  isBraking: boolean;
  isBoosting: boolean;
  cruiseSpeedSetting: number; // 0 = stopped when unpropelled; >0 = cruise speed
  autopilotPlanetIndex: number | null;
  onReachPlanet: (index: number) => void;
  onUpdateTelemetry: (
    speedKm: number, 
    targetName: string, 
    distanceAu: number, 
    isStopped: boolean,
    isNearPlanet: boolean,
    nearPlanetIdx: number
  ) => void;
}

export const SpaceshipFlightRig: React.FC<SpaceshipFlightRigProps> = ({
  steerX,
  steerY,
  isThrusting,
  isBraking,
  isBoosting,
  cruiseSpeedSetting,
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
  const currentSpeed = useRef(0.0); // Starts at 0 (stopped until propelled!)
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

    if (autopilotPlanetIndex !== null) {
      // -------------------------------------------------------------
      // AUTOPILOT NAVIGATION: DOCK & ENTER ORBIT AT TARGET LANDING ZONE
      // -------------------------------------------------------------
      const targetPlanet = PLANETS_META[autopilotPlanetIndex];
      const targetPos = new THREE.Vector3(...targetPlanet.coordinates);
      const distToPlanet = pos.current.distanceTo(targetPos);

      // Smoothly fly towards landing pad orbital vector
      if (distToPlanet > targetPlanet.radius + 8.5) {
        const desiredX = targetPlanet.coordinates[0] > 0 
          ? targetPlanet.coordinates[0] - 7.5 
          : targetPlanet.coordinates[0] + 7.5;
        const desiredY = targetPlanet.coordinates[1] + 1.2;
        const desiredZ = targetPlanet.coordinates[2] - 7.5;

        pos.current.x = THREE.MathUtils.lerp(pos.current.x, desiredX, clampedDelta * 3.5);
        pos.current.y = THREE.MathUtils.lerp(pos.current.y, desiredY, clampedDelta * 3.5);
        pos.current.z = THREE.MathUtils.lerp(pos.current.z, desiredZ, clampedDelta * 3.5);

        currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, 28.0, clampedDelta * 3.0);

        // Bank towards target
        const dx = desiredX - pos.current.x;
        currentRoll.current = THREE.MathUtils.lerp(currentRoll.current, -Math.sign(dx) * 0.45, clampedDelta * 4.0);
        currentYaw.current = THREE.MathUtils.lerp(currentYaw.current, Math.sign(dx) * 0.25, clampedDelta * 4.0);
        currentPitch.current = THREE.MathUtils.lerp(currentPitch.current, 0, clampedDelta * 4.0);
      } else {
        // High Parking Orbit around the company landing zone
        orbitAngle.current += clampedDelta * 0.45;
        const orbitR = targetPlanet.radius + 6.0;
        pos.current.x = targetPlanet.coordinates[0] + Math.sin(orbitAngle.current) * orbitR;
        pos.current.y = targetPlanet.coordinates[1] + Math.sin(orbitAngle.current * 2) * 0.7;
        pos.current.z = targetPlanet.coordinates[2] + Math.cos(orbitAngle.current) * orbitR;

        currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, 12.0, clampedDelta * 3.0);
        currentRoll.current = THREE.MathUtils.lerp(currentRoll.current, Math.sin(t * 0.5) * 0.15, clampedDelta * 3.0);
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
      // FREE GAME FLIGHT WITH FULL THROTTLE & STOPPING MECHANICS
      // -------------------------------------------------------------
      hasTriggeredArrival.current = null;

      // 1. Calculate Target Speed based on propulsion & throttle
      let targetSpeed = 0.0;
      let accelRate = 3.5;

      if (isBraking) {
        // Active brake / reverse
        targetSpeed = currentSpeed.current > 0.5 ? 0.0 : -3.5;
        accelRate = 8.0;
      } else if (isBoosting) {
        // Warp Afterburner
        targetSpeed = 48.0;
        accelRate = 5.0;
      } else if (isThrusting) {
        // Active forward propulsion
        targetSpeed = Math.max(22.0, cruiseSpeedSetting > 0 ? cruiseSpeedSetting : 22.0);
        accelRate = 4.5;
      } else {
        // Not propelled: if user configured a cruise speed > 0, cruise at that speed;
        // otherwise, decelerate to a complete stop!
        targetSpeed = cruiseSpeedSetting;
        accelRate = cruiseSpeedSetting === 0 ? 3.0 : 2.5;
      }

      currentSpeed.current = THREE.MathUtils.lerp(currentSpeed.current, targetSpeed, clampedDelta * accelRate);
      if (Math.abs(currentSpeed.current) < 0.08 && targetSpeed === 0) {
        currentSpeed.current = 0;
      }

      // 2. Position updates (only moves along Z when speed != 0!)
      pos.current.z += currentSpeed.current * clampedDelta;

      // Lateral and vertical steering
      pos.current.x += steerX * 22.0 * clampedDelta;
      pos.current.x = THREE.MathUtils.clamp(pos.current.x, -38, 38);

      pos.current.y += steerY * 18.0 * clampedDelta;
      pos.current.y = THREE.MathUtils.clamp(pos.current.y, -12, 16);

      // Banking physics: roll and yaw into turn
      const targetRoll = -steerX * 0.65;
      const targetYaw = steerX * 0.28;
      const targetPitch = -steerY * 0.45;

      currentRoll.current = THREE.MathUtils.lerp(currentRoll.current, targetRoll, clampedDelta * 5.0);
      currentYaw.current = THREE.MathUtils.lerp(currentYaw.current, targetYaw, clampedDelta * 4.0);
      currentPitch.current = THREE.MathUtils.lerp(currentPitch.current, targetPitch, clampedDelta * 4.0);

      // Seamless corridor wrap
      if (pos.current.z > 340) {
        pos.current.z = -15;
      } else if (pos.current.z < -25) {
        pos.current.z = -25;
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
    // THROTTLED TELEMETRY UPDATES (Every 150ms)
    // -------------------------------------------------------------
    if (t - lastTelemetryUpdate.current > 0.15) {
      lastTelemetryUpdate.current = t;

      // Find nearest planet
      let closestIdx = 0;
      let minDistance = Infinity;

      PLANETS_META.forEach((planet, idx) => {
        const d = pos.current.distanceTo(new THREE.Vector3(...planet.coordinates));
        if (d < minDistance) {
          minDistance = d;
          closestIdx = idx;
        }
      });

      const isStopped = Math.abs(currentSpeed.current) < 0.2;
      const isNearPlanet = minDistance < 22.0;

      onUpdateTelemetry(
        Math.round(Math.abs(currentSpeed.current) * 16),
        PLANETS_META[closestIdx].name,
        parseFloat(minDistance.toFixed(1)),
        isStopped,
        isNearPlanet,
        closestIdx
      );
    }
  });

  return (
    <group ref={rigRef}>
      <group ref={shipVisualRef}>
        <SpaceshipModel 
          speed={Math.abs(currentSpeed.current) / 20.0} 
          isBoosting={isBoosting} 
          rollAngle={currentRoll.current} 
        />
      </group>
    </group>
  );
};
