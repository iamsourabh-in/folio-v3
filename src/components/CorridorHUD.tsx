import React from 'react';
import { CASE_FILES } from '../data/caseFiles';
import { Play, Pause, ChevronLeft, ChevronRight, Eye, Radio, Compass } from 'lucide-react';

interface CorridorHUDProps {
  currentStationIndex: number;
  onSelectStationIndex: (index: number) => void;
  isDrifting: boolean;
  onToggleDrift: () => void;
  onSwitchToSkim: () => void;
}

export const CorridorHUD: React.FC<CorridorHUDProps> = ({
  currentStationIndex,
  onSelectStationIndex,
  isDrifting,
  onToggleDrift,
  onSwitchToSkim
}) => {
  const currentStation = CASE_FILES[currentStationIndex];

  return (
    <div className="absolute bottom-6 inset-x-4 lg:inset-x-8 z-30 pointer-events-none flex flex-col items-center gap-3">
      
      {/* Station Coordinates & Status Pill */}
      <div className="pointer-events-auto px-4 py-1.5 rounded-full bg-[#0b0d11]/85 backdrop-blur-md border border-[#232c3d] text-xs font-mono text-[#eeeff2] shadow-xl flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-[#d4883b]">
          <Radio className="w-3.5 h-3.5 signal-live" />
          <span className="font-bold">STATION 0{currentStation.chapterNumber}:</span>
        </div>
        <span className="text-[#eeeff2] font-semibold truncate max-w-[200px] sm:max-w-xs">
          {currentStation.title.split(':')[0]}
        </span>
        <span className="hidden md:inline text-[#556070]">|</span>
        <span className="hidden md:inline text-[11px] text-[#7a8494]">
          {currentStation.stationCoordinates}
        </span>
      </div>

      {/* Main Controls Console */}
      <div className="pointer-events-auto bg-[#0f1218]/90 backdrop-blur-xl border border-[#263144] p-2 rounded-xl shadow-2xl flex flex-wrap items-center justify-center gap-2 max-w-full">
        
        {/* Play/Pause Drift */}
        <button
          onClick={onToggleDrift}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
            isDrifting 
              ? 'bg-[#d4883b] text-[#0b0d11] font-bold'
              : 'bg-[#181d26] text-[#eeeff2] hover:bg-[#202735] border border-[#2d374a]'
          }`}
          title={isDrifting ? 'Pause automatic corridor flight' : 'Resume automatic slow drift flight'}
        >
          {isDrifting ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isDrifting ? 'Drifting' : 'Auto Drift'}</span>
        </button>

        <div className="h-5 w-px bg-[#263144] hidden sm:block"></div>

        {/* Stepper Buttons */}
        <button
          onClick={() => onSelectStationIndex(Math.max(0, currentStationIndex - 1))}
          disabled={currentStationIndex === 0}
          className="p-1.5 rounded-lg bg-[#141822] hover:bg-[#1c2230] text-[#eeeff2] disabled:opacity-30 disabled:pointer-events-none border border-[#222a3a] transition-colors"
          title="Previous Station"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Station Navigation Pills (01 to 07) */}
        <div className="flex items-center gap-1">
          {CASE_FILES.map((station, idx) => {
            const isActive = currentStationIndex === idx;
            const isFlagship = station.chapterNumber === 5;
            return (
              <button
                key={station.id}
                onClick={() => onSelectStationIndex(idx)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-[#d4883b] text-[#0b0d11] font-bold shadow-md scale-105'
                    : 'bg-[#141822] text-[#7a8494] hover:text-[#eeeff2] hover:bg-[#1c2230] border border-[#202735]'
                }`}
                title={station.title}
              >
                <span>0{station.chapterNumber}</span>
                {isFlagship && <span className="ml-0.5 text-amber-200">★</span>}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onSelectStationIndex(Math.min(CASE_FILES.length - 1, currentStationIndex + 1))}
          disabled={currentStationIndex === CASE_FILES.length - 1}
          className="p-1.5 rounded-lg bg-[#141822] hover:bg-[#1c2230] text-[#eeeff2] disabled:opacity-30 disabled:pointer-events-none border border-[#222a3a] transition-colors"
          title="Next Station"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-[#263144] hidden sm:block"></div>

        {/* Recruiter Skim Mode Shortcut */}
        <button
          onClick={onSwitchToSkim}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181d26] hover:bg-[#202735] text-xs font-mono text-[#38bdf8] border border-[#263548] transition-colors"
          title="Switch to clean 2D editorial Skim Mode"
        >
          <Eye className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>Exit to Skim Mode</span>
        </button>

      </div>

    </div>
  );
};
