import React from 'react';
import { ArrowLeft, Compass, Eye, Volume2, VolumeX, Zap, Radio, Shield, Navigation } from 'lucide-react';
import { PLANETS_META, PlanetMeta } from '../data/planetData';

interface SpaceshipCockpitHUDProps {
  currentPlanetIndex: number;
  targetedPlanet: PlanetMeta;
  speed: number;
  isBoosting: boolean;
  distanceToTarget: number;
  achievementNotification: { title: string; subtitle: string } | null;
  isSoundMuted: boolean;
  onToggleSound: () => void;
  onSelectPlanet: (index: number) => void;
  onToggleCodex: () => void;
  isCodexOpen: boolean;
  onExitFlight: () => void;
}

export const SpaceshipCockpitHUD: React.FC<SpaceshipCockpitHUDProps> = ({
  currentPlanetIndex,
  targetedPlanet,
  speed,
  isBoosting,
  distanceToTarget,
  achievementNotification,
  isSoundMuted,
  onToggleSound,
  onSelectPlanet,
  onToggleCodex,
  isCodexOpen,
  onExitFlight
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none z-30 flex flex-col justify-between p-4 lg:p-6 overflow-hidden">
      
      {/* ------------------------------------------------------------- */}
      {/* TOP FLIGHT BAR */}
      {/* ------------------------------------------------------------- */}
      <div className="flex items-center justify-between gap-3">
        
        {/* Left: Exit Flight Simulator to 2D Editorial View */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={onExitFlight}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0b0e14]/90 hover:bg-[#151c27] text-xs font-mono text-[#eeeff2] border border-[#232d3d] shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            title="Exit Flight Simulator and return to 2D technical resume"
          >
            <ArrowLeft className="w-4 h-4 text-[#d4883b]" />
            <span className="font-semibold">Exit Flight to 2D Resume</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0b0e14]/85 border border-[#1e2634] backdrop-blur-md text-xs font-mono text-[#7a8494]">
            <Radio className="w-3.5 h-3.5 text-[#38bdf8] signal-live" />
            <span className="text-[#eeeff2] font-semibold">SHIP TELEMETRY:</span>
            <span>FLIGHT ONLINE</span>
          </div>
        </div>

        {/* Right: Sound Toggle & Open Planetary Codex */}
        <div className="pointer-events-auto flex items-center gap-2">
          
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-xl bg-[#0b0e14]/90 hover:bg-[#151c27] text-xs font-mono text-[#8c97a8] hover:text-[#eeeff2] border border-[#232d3d] shadow-lg backdrop-blur-md transition-colors"
            title={isSoundMuted ? "Unmute Flight Audio" : "Mute Flight Audio"}
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Planetary Codex Drawer Toggle */}
          <button
            onClick={onToggleCodex}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4883b] hover:bg-[#e0984d] text-[#0b0d11] text-xs font-mono font-bold shadow-2xl transition-all hover:scale-105 active:scale-95"
          >
            <Eye className="w-4 h-4" />
            <span>{isCodexOpen ? "Close Planetary Codex" : "Scan & Inspect Codex"}</span>
          </button>

        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* ACHIEVEMENT UNLOCKED NOTIFICATION BANNER */}
      {/* ------------------------------------------------------------- */}
      {achievementNotification && (
        <div className="absolute top-16 inset-x-4 flex justify-center pointer-events-none animate-in slide-in-from-top-4 duration-300">
          <div className="max-w-xl w-full p-4 rounded-2xl bg-[#0e121a]/95 border-2 border-[#d4883b] shadow-[0_0_40px_rgba(212,136,59,0.35)] backdrop-blur-xl text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#d4883b] font-bold tracking-wider mb-1">
              <span className="text-amber-400 animate-spin">★</span>
              <span>{achievementNotification.title}</span>
              <span className="text-amber-400 animate-spin">★</span>
            </div>
            <p className="text-sm font-sans text-[#eeeff2] font-semibold">
              {achievementNotification.subtitle}
            </p>
            <div className="mt-1 text-[11px] font-mono text-[#38bdf8]">
              [ Codex Updated: Press "Scan & Inspect Codex" or click right panel for architectural breakdown ]
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* CENTER FLIGHT CROSSHAIR & TARGETING RETICLE */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        
        {/* Futuristic Sci-Fi Crosshair Brackets */}
        <div className="relative w-28 h-28 flex items-center justify-center opacity-40">
          <div className="absolute inset-0 border border-[#38bdf8] rounded-full"></div>
          <div className="w-2 h-2 rounded-full bg-[#38bdf8]"></div>
          {/* Pitch Lines */}
          <div className="absolute -top-4 w-12 h-px bg-[#38bdf8]/60"></div>
          <div className="absolute -bottom-4 w-12 h-px bg-[#38bdf8]/60"></div>
          <div className="absolute -left-4 h-12 w-px bg-[#38bdf8]/60"></div>
          <div className="absolute -right-4 h-12 w-px bg-[#38bdf8]/60"></div>
        </div>

        {/* Target Lock Readout Box */}
        <div className="absolute mt-36 px-4 py-1.5 rounded-lg bg-[#080b10]/80 border border-[#232f42] text-[11px] font-mono text-[#38bdf8] flex items-center gap-2 shadow-lg backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>LOCK: {targetedPlanet.name.toUpperCase()}</span>
          <span className="text-[#566579]">|</span>
          <span className="text-[#eeeff2]">{Math.round(distanceToTarget)} AU</span>
          {isBoosting && <span className="text-[#d4883b] font-bold animate-pulse">[WARP BOOST]</span>}
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM CONTROLS & QUANTUM AUTOPILOT SCRUBBER */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col items-center gap-3">
        
        {/* Flight Hint Badge */}
        <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0a0d14]/85 border border-[#1e2634] text-[11px] font-mono text-[#7a8494] backdrop-blur-md">
          <span><strong className="text-[#eeeff2]">Mouse / WASD:</strong> Steer Spaceship</span>
          <span>•</span>
          <span><strong className="text-[#eeeff2]">Shift / Space:</strong> Warp Afterburners</span>
          <span>•</span>
          <span><strong className="text-[#d4883b]">Click Any Planet Below:</strong> Quantum Autopilot</span>
        </div>

        {/* 1-Click Quantum Autopilot Planet Buttons */}
        <div className="pointer-events-auto bg-[#0a0e16]/95 backdrop-blur-xl border border-[#232e40] p-2 rounded-2xl shadow-2xl flex flex-wrap items-center justify-center gap-1.5 max-w-full">
          
          <div className="px-2 text-[11px] font-mono text-[#7a8494] hidden xl:block">
            AUTOPILOT NAV:
          </div>

          {PLANETS_META.map((planet, idx) => {
            const isTargeted = currentPlanetIndex === idx;
            const isFlagship = planet.chapterNumber === 5;
            return (
              <button
                key={planet.id}
                onClick={() => onSelectPlanet(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                  isTargeted
                    ? 'bg-[#d4883b] text-[#0b0d11] font-bold shadow-[0_0_15px_rgba(212,136,59,0.4)] scale-105'
                    : 'bg-[#121620] text-[#8c97a8] hover:text-[#eeeff2] hover:bg-[#1a2230] border border-[#1e2636]'
                }`}
                title={planet.planetarySummary}
              >
                <span>0{planet.chapterNumber}</span>
                <span className="hidden sm:inline">{planet.name.split(':')[1]?.trim() || planet.name}</span>
                {isFlagship && <span className="text-amber-200 font-bold">★</span>}
              </button>
            );
          })}

        </div>

      </div>

    </div>
  );
};
