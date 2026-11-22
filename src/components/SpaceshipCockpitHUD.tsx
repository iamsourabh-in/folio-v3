import React from 'react';
import { ArrowLeft, Eye, Volume2, VolumeX, Zap, Radio, ChevronLeft, ChevronRight, Compass, Award } from 'lucide-react';
import { PLANETS_META, PlanetMeta } from '../data/planetData';

interface SpaceshipCockpitHUDProps {
  currentPlanetIndex: number;
  targetedPlanet: PlanetMeta;
  speed: number;
  isBoosting: boolean;
  distanceToTarget: number;
  isOrbiting: boolean;
  clearedSectors: Set<number>;
  achievementNotification: { title: string; subtitle: string } | null;
  isSoundMuted: boolean;
  onToggleSound: () => void;
  onSelectPlanet: (index: number) => void;
  onWarpToNextSector: () => void;
  onOpenGrandFinale: () => void;
  onToggleCodex: () => void;
  isCodexOpen: boolean;
  onExitFlight: () => void;
  onSteerLeft: () => void;
  onSteerRight: () => void;
  onSteerReset: () => void;
  onStartBoost: () => void;
  onStopBoost: () => void;
}

export const SpaceshipCockpitHUD: React.FC<SpaceshipCockpitHUDProps> = ({
  currentPlanetIndex,
  targetedPlanet,
  speed,
  isBoosting,
  distanceToTarget,
  isOrbiting,
  clearedSectors,
  achievementNotification,
  isSoundMuted,
  onToggleSound,
  onSelectPlanet,
  onWarpToNextSector,
  onOpenGrandFinale,
  onToggleCodex,
  isCodexOpen,
  onExitFlight,
  onSteerLeft,
  onSteerRight,
  onSteerReset,
  onStartBoost,
  onStopBoost
}) => {
  const nextPlanetIndex = (currentPlanetIndex + 1) % PLANETS_META.length;
  const nextPlanet = PLANETS_META[nextPlanetIndex];

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-30 flex flex-col justify-between p-3 sm:p-5 overflow-hidden">
      
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

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0b0e14]/85 border border-[#1e2634] backdrop-blur-md text-xs font-mono text-[#7a8494]">
            <Radio className="w-3 h-3 text-[#38bdf8] signal-live" />
            <span className="text-[#eeeff2] font-semibold">SHIP VELOCITY:</span>
            <span>{Math.round(speed * 320)} KM/S</span>
          </div>
        </div>

        {/* Center: Mission Progress Sector Milestones */}
        <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a0e16]/85 border border-[#1e2634] text-[11px] font-mono text-[#7a8494] backdrop-blur-md shadow-lg">
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

        {/* Right: Sound Toggle & Codex Inspector */}
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-xl bg-[#0b0e14]/92 hover:bg-[#151c27] text-xs font-mono text-[#8c97a8] hover:text-[#eeeff2] border border-[#232d3d] shadow-lg backdrop-blur-md transition-colors"
            title={isSoundMuted ? "Unmute Flight Audio" : "Mute Flight Audio"}
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Planetary Codex Drawer Toggle */}
          <button
            onClick={onToggleCodex}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-mono font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 ${
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
      {/* ACHIEVEMENT UNLOCKED NOTIFICATION BANNER */}
      {/* ------------------------------------------------------------- */}
      {achievementNotification && (
        <div className="absolute top-14 sm:top-16 inset-x-2 sm:inset-x-4 flex justify-center pointer-events-none animate-in slide-in-from-top-4 duration-300">
          <div className="max-w-lg w-full p-3 sm:p-4 rounded-2xl bg-[#0e121a]/95 border-2 border-[#d4883b] shadow-[0_0_35px_rgba(212,136,59,0.4)] backdrop-blur-xl text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#d4883b] font-bold tracking-wider mb-1">
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
      {/* CENTER FLIGHT CROSSHAIR & WARP TO NEXT SECTOR PROMPT */}
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
        <div className="mt-4 px-3 py-1 rounded-lg bg-[#080b10]/85 border border-[#232f42] text-[10px] sm:text-[11px] font-mono text-[#38bdf8] flex items-center gap-2 shadow-lg backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="truncate max-w-[150px] sm:max-w-none">{targetedPlanet.name.toUpperCase()}</span>
          <span className="text-[#566579]">|</span>
          <span className="text-[#eeeff2]">{Math.round(distanceToTarget)} AU</span>
          {isBoosting && <span className="text-[#d4883b] font-bold animate-pulse">[WARP]</span>}
        </div>

        {/* Mission Progression Action: Warp to Next Sector or Grand Finale */}
        {isOrbiting && (
          <div className="pointer-events-auto mt-4 animate-in fade-in zoom-in duration-300">
            {currentPlanetIndex < 6 ? (
              <button
                onClick={onWarpToNextSector}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#d4883b] hover:bg-[#e0984d] text-[#0b0d11] font-mono text-xs font-bold shadow-[0_0_25px_rgba(212,136,59,0.5)] transition-all hover:scale-105 active:scale-95 animate-pulse"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>WARP TO SECTOR 0{currentPlanetIndex + 2}: {nextPlanet.name.split(':')[1]?.trim()} →</span>
              </button>
            ) : (
              <button
                onClick={onOpenGrandFinale}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#38bdf8] hover:bg-[#0284c7] text-[#0b0d11] font-mono text-xs font-bold shadow-[0_0_35px_rgba(56,189,248,0.6)] transition-all hover:scale-105 active:scale-95 animate-pulse"
              >
                <Award className="w-4 h-4" />
                <span>MISSION ACCOMPLISHED // REVIEW ARCHITECT DOSSIER ★</span>
              </button>
            )}
          </div>
        )}

      </div>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE TOUCH FLIGHT CONTROLS */}
      {/* ------------------------------------------------------------- */}
      <div className="pointer-events-auto flex items-end justify-between px-1 mb-2">
        
        {/* Left Thumb: Steering Bank Buttons */}
        <div className="flex items-center gap-2">
          <button
            onTouchStart={onSteerLeft}
            onTouchEnd={onSteerReset}
            onMouseDown={onSteerLeft}
            onMouseUp={onSteerReset}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0b0f17]/90 active:bg-[#1a2538] border border-[#243247] active:border-[#38bdf8] flex items-center justify-center text-[#eeeff2] shadow-xl backdrop-blur-md active:scale-90 transition-transform"
            aria-label="Steer Left"
          >
            <ChevronLeft className="w-6 h-6 text-[#38bdf8]" />
          </button>

          <button
            onTouchStart={onSteerRight}
            onTouchEnd={onSteerReset}
            onMouseDown={onSteerRight}
            onMouseUp={onSteerReset}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0b0f17]/90 active:bg-[#1a2538] border border-[#243247] active:border-[#38bdf8] flex items-center justify-center text-[#eeeff2] shadow-xl backdrop-blur-md active:scale-90 transition-transform"
            aria-label="Steer Right"
          >
            <ChevronRight className="w-6 h-6 text-[#38bdf8]" />
          </button>
        </div>

        {/* Right Thumb: Warp Boost & Next Planet Target */}
        <div className="flex items-center gap-2">
          {/* Target Next Planet */}
          <button
            onClick={() => onSelectPlanet((currentPlanetIndex + 1) % PLANETS_META.length)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0b0f17]/90 active:bg-[#1a2538] border border-[#243247] active:border-[#d4883b] flex flex-col items-center justify-center text-[10px] font-mono text-[#d4883b] shadow-xl backdrop-blur-md active:scale-90 transition-transform"
            title="Target Next Planet"
          >
            <Compass className="w-5 h-5 mb-0.5 text-[#d4883b]" />
            <span className="font-bold">NEXT</span>
          </button>

          {/* Warp Boost (Touch & Hold or Click) */}
          <button
            onTouchStart={onStartBoost}
            onTouchEnd={onStopBoost}
            onMouseDown={onStartBoost}
            onMouseUp={onStopBoost}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center font-mono font-bold shadow-2xl backdrop-blur-md active:scale-90 transition-all ${
              isBoosting
                ? 'bg-[#d4883b] text-[#0b0d11] ring-4 ring-[#d4883b]/50 shadow-[0_0_25px_rgba(212,136,59,0.6)]'
                : 'bg-[#131d2a]/95 text-[#38bdf8] border-2 border-[#38bdf8]/60 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
            }`}
            aria-label="Warp Afterburners"
          >
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 mb-0.5 fill-current" />
            <span className="text-[9px] tracking-wider">BOOST</span>
          </button>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM QUANTUM AUTOPILOT HORIZONTAL CAROUSEL (SWIPEABLE) */}
      {/* ------------------------------------------------------------- */}
      <div className="pointer-events-auto w-full max-w-4xl mx-auto">
        <div className="bg-[#080b10]/95 backdrop-blur-xl border border-[#1e2634] p-1.5 sm:p-2 rounded-2xl shadow-2xl flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
          
          <div className="px-2 text-[10px] font-mono text-[#7a8494] uppercase whitespace-nowrap hidden sm:block">
            SECTORS:
          </div>

          {PLANETS_META.map((planet, idx) => {
            const isTargeted = currentPlanetIndex === idx;
            const isCleared = clearedSectors.has(idx);
            const isFlagship = planet.chapterNumber === 5;
            return (
              <button
                key={planet.id}
                onClick={() => onSelectPlanet(idx)}
                className={`px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 min-h-[40px] ${
                  isTargeted
                    ? 'bg-[#d4883b] text-[#0b0d11] font-bold shadow-[0_0_15px_rgba(212,136,59,0.5)] scale-105'
                    : 'bg-[#10141d] text-[#8c97a8] hover:text-[#eeeff2] hover:bg-[#18202d] border border-[#1a2230]'
                }`}
                title={planet.planetarySummary}
              >
                {isCleared ? (
                  <span className="text-emerald-400 font-bold">✓</span>
                ) : (
                  <span className="font-bold">0{planet.chapterNumber}</span>
                )}
                <span>{planet.name.split(':')[1]?.trim() || planet.name}</span>
                {isFlagship && <span className="text-amber-300 font-black">★</span>}
              </button>
            );
          })}

        </div>
      </div>

    </div>
  );
};
