import React from 'react';
import { 
  ArrowLeft, 
  Eye, 
  Volume2, 
  VolumeX, 
  Zap, 
  Radio, 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  Award, 
  CheckCircle2, 
  Sliders, 
  Square, 
  Play, 
  RotateCcw,
  Gauge
} from 'lucide-react';
import { PLANETS_META, PlanetMeta } from '../data/planetData';

interface SpaceshipCockpitHUDProps {
  currentPlanetIndex: number;
  targetedPlanet: PlanetMeta;
  speed: number;
  speedKm: number;
  isBoosting: boolean;
  isThrusting: boolean;
  isBraking: boolean;
  isStopped: boolean;
  distanceToTarget: number;
  isOrbiting: boolean;
  isNearPlanet: boolean;
  nearPlanetIdx: number;
  clearedSectors: Set<number>;
  achievementNotification: { title: string; subtitle: string } | null;
  isSoundMuted: boolean;
  cruiseSpeedSetting: number;
  invertPitch: boolean;
  onChangeCruiseSpeed: (speed: number) => void;
  onToggleInvertPitch: () => void;
  onStartThrust: () => void;
  onStopThrust: () => void;
  onStartBrake: () => void;
  onStopBrake: () => void;
  onToggleSound: () => void;
  onSelectPlanet: (index: number) => void;
  onDockAtPlanet: (index: number) => void;
  onWarpToNextSector: () => void;
  onOpenGrandFinale: () => void;
  onToggleCodex: () => void;
  isCodexOpen: boolean;
  onExitFlight: () => void;
  onSteerLeft: () => void;
  onSteerRight: () => void;
  onSteerPitchDown: () => void;
  onSteerPitchUp: () => void;
  onSteerReset: () => void;
  onStartBoost: () => void;
  onStopBoost: () => void;
}

export const SpaceshipCockpitHUD: React.FC<SpaceshipCockpitHUDProps> = ({
  currentPlanetIndex,
  targetedPlanet,
  speed,
  speedKm,
  isBoosting,
  isThrusting,
  isBraking,
  isStopped,
  distanceToTarget,
  isOrbiting,
  isNearPlanet,
  nearPlanetIdx,
  clearedSectors,
  achievementNotification,
  isSoundMuted,
  cruiseSpeedSetting,
  invertPitch,
  onChangeCruiseSpeed,
  onToggleInvertPitch,
  onStartThrust,
  onStopThrust,
  onStartBrake,
  onStopBrake,
  onToggleSound,
  onSelectPlanet,
  onDockAtPlanet,
  onWarpToNextSector,
  onOpenGrandFinale,
  onToggleCodex,
  isCodexOpen,
  onExitFlight,
  onSteerLeft,
  onSteerRight,
  onSteerPitchDown,
  onSteerPitchUp,
  onSteerReset,
  onStartBoost,
  onStopBoost
}) => {
  const nextPlanetIndex = (currentPlanetIndex + 1) % PLANETS_META.length;
  const nextPlanet = PLANETS_META[nextPlanetIndex];
  const nearPlanet = PLANETS_META[nearPlanetIdx];

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-30 flex flex-col justify-between p-2.5 sm:p-5 overflow-hidden font-mono">
      
      {/* ------------------------------------------------------------- */}
      {/* TOP FLIGHT BAR */}
      {/* ------------------------------------------------------------- */}
      <div className="flex items-center justify-between gap-2">
        
        {/* Left: Exit Flight Simulator to 2D Resume */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={onExitFlight}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#0b0e14]/92 hover:bg-[#151c27] text-xs font-mono text-[#eeeff2] border border-[#232d3d] shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            title="Exit Flight Simulator and return to 2D technical dossier"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#d4883b]" />
            <span className="font-semibold hidden xs:inline sm:inline">Exit to 2D Resume</span>
            <span className="font-semibold xs:hidden sm:hidden">2D</span>
          </button>

          {/* Live Speedometer Readout */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0b0e14]/85 border border-[#1e2634] backdrop-blur-md text-xs text-[#7a8494]">
            <Gauge className={`w-3.5 h-3.5 ${isStopped ? 'text-rose-400' : 'text-emerald-400'}`} />
            <span className="text-[#eeeff2] font-bold">{speedKm} KM/S</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
              isStopped 
                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' 
                : isBoosting 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse' 
                : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
            }`}>
              {isStopped ? 'STOPPED' : isBoosting ? 'WARP' : 'PROPELLED'}
            </span>
          </div>
        </div>

        {/* Center: Mission Progress Sector Milestones */}
        <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a0e16]/85 border border-[#1e2634] text-[11px] text-[#7a8494] backdrop-blur-md shadow-lg">
          <span className="text-[#eeeff2] font-semibold hidden sm:inline">MISSION:</span>
          <div className="flex items-center gap-1">
            {PLANETS_META.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  clearedSectors.has(idx)
                    ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                    : idx === currentPlanetIndex
                    ? 'bg-[#d4883b] animate-ping'
                    : 'bg-[#232d3d]'
                }`}
                title={`Sector 0${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-[#eeeff2] font-bold ml-1">{clearedSectors.size}/7 CLEARED</span>
        </div>

        {/* Right: Pitch Invert, Sound Toggle & Codex Inspector */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          
          {/* Pitch Invert Toggle */}
          <button
            onClick={onToggleInvertPitch}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs border backdrop-blur-md transition-all ${
              invertPitch 
                ? 'bg-[#18202d] text-[#38bdf8] border-[#2b3e58]' 
                : 'bg-[#0f131a] text-[#7a8494] border-[#1e2634]'
            }`}
            title="Toggle Flight Pitch (Inverted vs Standard)"
          >
            <span>🕹️ PITCH:</span>
            <span className="font-bold">{invertPitch ? 'INVERTED (▲=DOWN)' : 'STANDARD (▲=UP)'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-xl bg-[#0b0e14]/92 hover:bg-[#151c27] text-xs text-[#8c97a8] hover:text-[#eeeff2] border border-[#232d3d] shadow-lg backdrop-blur-md transition-colors"
            title={isSoundMuted ? "Unmute Flight Audio" : "Mute Flight Audio"}
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Planetary Codex Drawer Toggle */}
          <button
            onClick={onToggleCodex}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 ${
              isCodexOpen
                ? 'bg-[#1a2332] text-[#eeeff2] border border-[#2d3e58]'
                : 'bg-[#d4883b] hover:bg-[#e0984d] text-[#0b0d11]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isCodexOpen ? "Close Codex" : "Scan Codex"}</span>
            <span className="sm:hidden">{isCodexOpen ? "Close" : "Codex"}</span>
          </button>

        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* CONFIGURABLE SPEED & THROTTLE BAR (LEFT SIDE OF SCREEN) */}
      {/* ------------------------------------------------------------- */}
      <div className="pointer-events-auto absolute top-16 left-3 sm:left-5 z-20 flex flex-col gap-1.5 p-2 rounded-2xl bg-[#080b11]/90 border border-[#1e2634] shadow-2xl backdrop-blur-xl max-w-[210px] sm:max-w-xs animate-in fade-in duration-300">
        
        <div className="flex items-center justify-between text-[10px] text-[#7a8494] px-1">
          <span className="flex items-center gap-1 text-[#cbd5e1] font-bold">
            <Sliders className="w-3 h-3 text-[#38bdf8]" />
            THROTTLE CONFIG
          </span>
          <span className="text-amber-400 font-bold">{cruiseSpeedSetting === 0 ? "MANUAL" : `${cruiseSpeedSetting} km/s`}</span>
        </div>

        {/* Speed Presets */}
        <div className="grid grid-cols-4 gap-1">
          <button
            onClick={() => onChangeCruiseSpeed(0)}
            className={`px-1.5 py-1 rounded-lg text-[9px] sm:text-[10px] font-bold transition-all ${
              cruiseSpeedSetting === 0 
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.3)]' 
                : 'bg-[#121620] text-[#7a8494] hover:text-[#eeeff2]'
            }`}
            title="Auto-Stop: Ship halts completely when thrust is released"
          >
            ⏹ STOP
          </button>

          <button
            onClick={() => onChangeCruiseSpeed(10)}
            className={`px-1.5 py-1 rounded-lg text-[9px] sm:text-[10px] font-bold transition-all ${
              cruiseSpeedSetting === 10 
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-[0_0_10px_rgba(56,189,248,0.3)]' 
                : 'bg-[#121620] text-[#7a8494] hover:text-[#eeeff2]'
            }`}
            title="Slow 10 km/s cruise"
          >
            🛸 SLOW
          </button>

          <button
            onClick={() => onChangeCruiseSpeed(22)}
            className={`px-1.5 py-1 rounded-lg text-[9px] sm:text-[10px] font-bold transition-all ${
              cruiseSpeedSetting === 22 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                : 'bg-[#121620] text-[#7a8494] hover:text-[#eeeff2]'
            }`}
            title="Normal 22 km/s cruise"
          >
            🚀 CRUISE
          </button>

          <button
            onClick={() => onChangeCruiseSpeed(40)}
            className={`px-1.5 py-1 rounded-lg text-[9px] sm:text-[10px] font-bold transition-all ${
              cruiseSpeedSetting === 40 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.3)]' 
                : 'bg-[#121620] text-[#7a8494] hover:text-[#eeeff2]'
            }`}
            title="Fast 40 km/s cruise"
          >
            ⚡ FAST
          </button>
        </div>

        {/* Speed Slider */}
        <div className="flex items-center gap-2 px-1 pt-1">
          <input
            type="range"
            min="0"
            max="45"
            value={cruiseSpeedSetting}
            onChange={(e) => onChangeCruiseSpeed(Number(e.target.value))}
            className="w-full h-1.5 bg-[#1a2230] rounded-lg appearance-none cursor-pointer accent-[#38bdf8]"
          />
        </div>

        <div className="text-[9px] text-[#556377] px-1 hidden sm:block">
          {cruiseSpeedSetting === 0 
            ? "Hold [SPACE]/[W]/[THRUST] to fly. Releases to stop." 
            : `Cruising locked at ${cruiseSpeedSetting} km/s. Tap [STOP] to halt.`}
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* ACHIEVEMENT UNLOCKED NOTIFICATION BANNER */}
      {/* ------------------------------------------------------------- */}
      {achievementNotification && (
        <div className="absolute top-14 sm:top-16 inset-x-2 sm:inset-x-4 flex justify-center pointer-events-none animate-in slide-in-from-top-4 duration-300">
          <div className="max-w-lg w-full p-3 sm:p-4 rounded-2xl bg-[#0e121a]/95 border-2 border-[#d4883b] shadow-[0_0_35px_rgba(212,136,59,0.4)] backdrop-blur-xl text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-[#d4883b] font-bold tracking-wider mb-1">
              <span className="text-amber-400">★</span>
              <span className="truncate">{achievementNotification.title}</span>
              <span className="text-amber-400">★</span>
            </div>
            <p className="text-xs sm:text-sm font-sans text-[#eeeff2] font-semibold line-clamp-2">
              {achievementNotification.subtitle}
            </p>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* CENTER FLIGHT CROSSHAIR & PROXIMITY TOUCHDOWN ACTION */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        
        {/* Reticle */}
        <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center opacity-40">
          <div className="absolute inset-0 border border-[#38bdf8] rounded-full"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></div>
          <div className="absolute -top-3 w-8 sm:w-12 h-px bg-[#38bdf8]/60"></div>
          <div className="absolute -bottom-3 w-8 sm:w-12 h-px bg-[#38bdf8]/60"></div>
          <div className="absolute -left-3 h-8 sm:h-12 w-px bg-[#38bdf8]/60"></div>
          <div className="absolute -right-3 h-8 sm:h-12 w-px bg-[#38bdf8]/60"></div>
        </div>

        {/* Target Lock Readout Box */}
        <div className="mt-4 px-3 py-1.5 rounded-xl bg-[#080b10]/90 border border-[#232f42] text-[10px] sm:text-[11px] text-[#38bdf8] flex items-center gap-2 shadow-lg backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="truncate max-w-[150px] sm:max-w-none font-bold" style={{ color: targetedPlanet.accentGlow }}>
            {targetedPlanet.landingZoneId}: {targetedPlanet.companyName.toUpperCase()}
          </span>
          <span className="text-[#566579]">|</span>
          <span className="text-[#eeeff2]">{Math.round(distanceToTarget)} AU</span>
          {isBoosting && <span className="text-[#d4883b] font-bold animate-pulse">[WARP]</span>}
        </div>

        {/* PROXIMITY DOCKING ALERT: WHEN NEAR PLANET BUT NOT DOCKED */}
        {isNearPlanet && !isOrbiting && (
          <div className="pointer-events-auto mt-4 animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => onDockAtPlanet(nearPlanetIdx)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#050811] font-bold text-xs shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all hover:scale-105 active:scale-95 animate-pulse"
            >
              <Compass className="w-4 h-4 fill-current" />
              <span>[E] TOUCHDOWN AT {nearPlanet.landingZoneId}: {nearPlanet.companyName.split(' ')[0].toUpperCase()}</span>
            </button>
          </div>
        )}

        {/* Mission Progression Action: Touchdown at Company Landing Zone */}
        {isOrbiting && (
          <div className="pointer-events-auto mt-4 max-w-md w-full px-3 text-center animate-in fade-in zoom-in duration-300">
            <div className="p-3.5 rounded-2xl bg-[#0a0e16]/95 border border-[#2d3a4e] shadow-2xl backdrop-blur-xl mb-3">
              <div className="flex items-center justify-center gap-2 text-xs font-bold mb-1" style={{ color: targetedPlanet.accentGlow }}>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>TOUCHDOWN CONFIRMED: {targetedPlanet.landingZoneId}</span>
              </div>
              <div className="text-sm font-display font-bold text-[#eeeff2]">
                {targetedPlanet.companyName}
              </div>
              <div className="text-[11px] text-[#94a3b8] mt-0.5">
                {targetedPlanet.roleTitle} ({targetedPlanet.tenure}) • <span className="text-emerald-400 font-bold">{targetedPlanet.keyMetric}</span>
              </div>
              {targetedPlanet.award && (
                <div className="text-[10px] text-amber-300 font-semibold mt-1">
                  ★ {targetedPlanet.award}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={onToggleCodex}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141c2b] hover:bg-[#1e293b] text-[#38bdf8] border border-[#2b394f] text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                <Eye className="w-4 h-4" />
                <span>Inspect Company Proofs</span>
              </button>

              {currentPlanetIndex < 6 ? (
                <button
                  onClick={onWarpToNextSector}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d4883b] hover:bg-[#e0984d] text-[#0b0d11] text-xs font-bold shadow-[0_0_25px_rgba(212,136,59,0.5)] transition-all hover:scale-105 active:scale-95 animate-pulse"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>WARP TO LZ-0{currentPlanetIndex + 2} →</span>
                </button>
              ) : (
                <button
                  onClick={onOpenGrandFinale}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#38bdf8] hover:bg-[#0284c7] text-[#0b0d11] text-xs font-bold shadow-[0_0_35px_rgba(56,189,248,0.6)] transition-all hover:scale-105 active:scale-95 animate-pulse"
                >
                  <Award className="w-4 h-4" />
                  <span>MISSION COMPLETE // ARCHITECT DOSSIER ★</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ------------------------------------------------------------- */}
      {/* GAME ON-SCREEN TOUCH & KEYBOARD CONTROLS (FULL DUAL-STICK FEEL) */}
      {/* ------------------------------------------------------------- */}
      <div className="pointer-events-auto flex items-end justify-between px-1 mb-2">
        
        {/* Left Stick: Bank (Left / Right) & Pitch (Dive / Climb) */}
        <div className="flex flex-col items-center gap-1.5 bg-[#080b11]/80 p-2 rounded-2xl border border-[#1e2634] backdrop-blur-md">
          {/* Pitch Dive (Up key mapped to Down) */}
          <button
            onTouchStart={onSteerPitchDown}
            onTouchEnd={onSteerReset}
            onMouseDown={onSteerPitchDown}
            onMouseUp={onSteerReset}
            className="w-11 h-9 rounded-xl bg-[#121620] active:bg-[#1a2538] border border-[#243247] flex items-center justify-center text-[10px] text-[#38bdf8] font-bold shadow active:scale-90 transition-transform"
            title="Dive / Pitch Down"
          >
            ▲ DIVE
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onTouchStart={onSteerLeft}
              onTouchEnd={onSteerReset}
              onMouseDown={onSteerLeft}
              onMouseUp={onSteerReset}
              className="w-12 h-11 rounded-xl bg-[#121620] active:bg-[#1a2538] border border-[#243247] flex items-center justify-center text-[#38bdf8] shadow active:scale-90 transition-transform"
              title="Bank Left (A / Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onTouchStart={onSteerRight}
              onTouchEnd={onSteerReset}
              onMouseDown={onSteerRight}
              onMouseUp={onSteerReset}
              className="w-12 h-11 rounded-xl bg-[#121620] active:bg-[#1a2538] border border-[#243247] flex items-center justify-center text-[#38bdf8] shadow active:scale-90 transition-transform"
              title="Bank Right (D / Right Arrow)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Pitch Climb (Down key mapped to Up) */}
          <button
            onTouchStart={onSteerPitchUp}
            onTouchEnd={onSteerReset}
            onMouseDown={onSteerPitchUp}
            onMouseUp={onSteerReset}
            className="w-11 h-9 rounded-xl bg-[#121620] active:bg-[#1a2538] border border-[#243247] flex items-center justify-center text-[10px] text-[#38bdf8] font-bold shadow active:scale-90 transition-transform"
            title="Climb / Pitch Up"
          >
            ▼ CLIMB
          </button>
        </div>

        {/* Right Stick: Throttle [THRUST], [BRAKE / STOP], & [BOOST] */}
        <div className="flex items-center gap-2 bg-[#080b11]/80 p-2 rounded-2xl border border-[#1e2634] backdrop-blur-md">
          
          {/* Brake / Full Stop */}
          <button
            onTouchStart={onStartBrake}
            onTouchEnd={onStopBrake}
            onMouseDown={onStartBrake}
            onMouseUp={onStopBrake}
            className="w-12 h-14 sm:w-14 sm:h-16 rounded-2xl bg-rose-950/40 active:bg-rose-900/70 border border-rose-500/40 active:border-rose-400 flex flex-col items-center justify-center text-rose-300 font-bold shadow-xl active:scale-95 transition-all"
            title="Hold to Brake & Stop"
          >
            <Square className="w-4 h-4 fill-current mb-0.5 text-rose-400" />
            <span className="text-[9px]">BRAKE</span>
          </button>

          {/* Forward Propulsion Thrust (Hold to Fly Forward!) */}
          <button
            onTouchStart={onStartThrust}
            onTouchEnd={onStopThrust}
            onMouseDown={onStartThrust}
            onMouseUp={onStopThrust}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border flex flex-col items-center justify-center font-bold shadow-2xl active:scale-95 transition-all ${
              isThrusting 
                ? 'bg-emerald-500 text-[#050811] border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.7)]' 
                : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border-emerald-500/50'
            }`}
            title="Hold [SPACE] or [W] to Propel Forward"
          >
            <Play className="w-5 h-5 fill-current mb-0.5" />
            <span className="text-[10px]">THRUST</span>
          </button>

          {/* Warp Booster */}
          <button
            onTouchStart={onStartBoost}
            onTouchEnd={onStopBoost}
            onMouseDown={onStartBoost}
            onMouseUp={onStopBoost}
            className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border flex flex-col items-center justify-center font-bold shadow-xl active:scale-95 transition-all ${
              isBoosting
                ? 'bg-[#d4883b] text-[#0b0d11] border-[#f59e0b] shadow-[0_0_25px_rgba(212,136,59,0.7)]'
                : 'bg-[#18120b]/70 hover:bg-[#251b0f] text-[#d4883b] border-[#d4883b]/40'
            }`}
            title="Hold [SHIFT] for Warp Boost"
          >
            <Zap className="w-5 h-5 fill-current mb-0.5" />
            <span className="text-[9px]">WARP</span>
          </button>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM QUANTUM AUTOPILOT HORIZONTAL CAROUSEL (SWIPEABLE) */}
      {/* ------------------------------------------------------------- */}
      <div className="pointer-events-auto w-full max-w-4xl mx-auto">
        <div className="bg-[#080b10]/95 backdrop-blur-xl border border-[#1e2634] p-1.5 sm:p-2 rounded-2xl shadow-2xl flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          
          <div className="px-2 text-[10px] text-[#7a8494] uppercase whitespace-nowrap hidden sm:block">
            LANDING ZONES:
          </div>

          {PLANETS_META.map((planet, idx) => {
            const isTargeted = currentPlanetIndex === idx;
            const isCleared = clearedSectors.has(idx);
            const isFlagship = planet.chapterNumber === 5;
            return (
              <button
                key={planet.id}
                onClick={() => onSelectPlanet(idx)}
                className={`px-3 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 min-h-[40px] ${
                  isTargeted
                    ? 'bg-[#d4883b] text-[#0b0d11] font-bold shadow-[0_0_15px_rgba(212,136,59,0.5)] scale-105'
                    : 'bg-[#10141d] text-[#8c97a8] hover:text-[#eeeff2] hover:bg-[#18202d] border border-[#1a2230]'
                }`}
                title={planet.planetarySummary}
              >
                {isCleared ? (
                  <span className="text-emerald-400 font-bold">✓</span>
                ) : (
                  <span className="font-bold">{planet.landingZoneId}</span>
                )}
                <span>
                  {idx === 0 && 'EaseMyTrip'}
                  {idx === 1 && 'Daffodil'}
                  {idx === 2 && 'TransUnion Vault'}
                  {idx === 3 && 'TransUnion Platform'}
                  {idx === 4 && 'Samsung Knox'}
                  {idx === 5 && 'Samsung AI Lab'}
                  {idx === 6 && 'Open Source'}
                </span>
                {isFlagship && <span className="text-amber-300 font-black">★</span>}
              </button>
            );
          })}

        </div>
      </div>

    </div>
  );
};
