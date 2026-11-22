import React from 'react';
import { Radio, FileText, Mail, Activity, Eye, Compass } from 'lucide-react';

interface NavigationProps {
  activeMode: 'skim' | '3d';
  onToggleMode: (mode: 'skim' | '3d') => void;
  onOpenContact: () => void;
  onOpenResume: () => void;
  latencyMs: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeMode,
  onToggleMode,
  onOpenContact,
  onOpenResume,
  latencyMs
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0b0d11]/85 border-b border-[#202735] px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand / Title & Station Status */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#181d26] border border-[#2d374a] flex items-center justify-center text-[#d4883b]">
            <Radio className="w-4 h-4 signal-live" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-sm tracking-wide text-[#eeeff2]">Sourabh Rustagi</span>
              <span className="hidden sm:inline-block text-[11px] font-mono px-1.5 py-0.5 rounded bg-[#181d26] border border-[#202735] text-[#d4883b]">
                LEAD / ARCHITECT
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#7a8494]">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>CORRIDOR ONLINE</span>
              </span>
              <span className="hidden md:inline text-[#2d374a]">|</span>
              <span className="hidden md:flex items-center gap-1">
                <Activity className="w-3 h-3 text-[#d4883b]" />
                <span>{latencyMs}ms RTT</span>
              </span>
            </div>
          </div>
        </div>

        {/* Section Jump Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono text-[#9aa4b5]">
          <a href="#chapters" className="hover:text-[#d4883b] transition-colors">01-07 Case Files</a>
          <a href="#decision-log" className="hover:text-[#d4883b] transition-colors">Decision Log</a>
          <a href="#skills-by-evidence" className="hover:text-[#d4883b] transition-colors">Skills by Evidence</a>
          <a href="#open-source" className="hover:text-[#d4883b] transition-colors">Open Source</a>
          <a href="#playbooks" className="hover:text-[#d4883b] transition-colors">Playbooks</a>
          <a href="#telemetry-proof" className="hover:text-[#d4883b] transition-colors">Full-Stack Proof</a>
          <a href="#trajectory" className="hover:text-[#d4883b] transition-colors">Trajectory</a>
        </nav>

        {/* Actions & Mode Toggle */}
        <div className="flex items-center gap-2.5">
          
          {/* Mode Switcher */}
          <div className="flex items-center bg-[#12151c] p-0.5 rounded border border-[#202735]">
            <button
              onClick={() => onToggleMode('skim')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                activeMode === 'skim'
                  ? 'bg-[#1e2533] text-[#eeeff2] font-semibold border border-[#3b475d]'
                  : 'text-[#7a8494] hover:text-[#eeeff2]'
              }`}
              title="Fast, accessible 2D editorial layout designed for recruiters"
            >
              <Eye className="w-3.5 h-3.5 text-[#d4883b]" />
              <span>Skim Mode</span>
            </button>
            <button
              onClick={() => onToggleMode('3d')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                activeMode === '3d'
                  ? 'bg-[#1e2533] text-[#eeeff2] font-semibold border border-[#3b475d]'
                  : 'text-[#7a8494] hover:text-[#eeeff2]'
              }`}
              title="Interactive 3D Signal Corridor Journey"
            >
              <Compass className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>3D World</span>
            </button>
          </div>

          {/* Resume Button */}
          <button
            onClick={onOpenResume}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[#181d26] hover:bg-[#202735] text-[#eeeff2] border border-[#2d374a] transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#d4883b]" />
            <span>Resume</span>
          </button>

          {/* Contact Button */}
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono bg-[#d4883b] hover:bg-[#e0984d] text-[#0b0d11] font-semibold transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>

        </div>
      </div>
    </header>
  );
};
