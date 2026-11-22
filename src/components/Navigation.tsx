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
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0b0d11]/90 border-b border-[#202735] px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Live Corridor Status */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#141923] border border-[#2d374a] flex items-center justify-center text-[#d4883b] shadow-md">
            <Radio className="w-4 h-4 signal-live" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm tracking-wide text-[#eeeff2]">Sourabh Rustagi</span>
              <span className="hidden sm:inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#181d26] border border-[#283244] text-[#d4883b]">
                LEAD ENGINEER &amp; ARCHITECT
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#7a8494]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>CORRIDOR ONLINE</span>
              </span>
              <span className="text-[#323c4d]">|</span>
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-[#d4883b]" />
                <span>{latencyMs}ms RTT</span>
              </span>
            </div>
          </div>
        </div>

        {/* Section Jump Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-mono text-[#9aa4b5]">
          <a href="#chapters" className="hover:text-[#d4883b] transition-colors">01–07 Stories</a>
          <a href="#decision-log" className="hover:text-[#d4883b] transition-colors">Decision Log</a>
          <a href="#skills-by-evidence" className="hover:text-[#d4883b] transition-colors">Skills by Evidence</a>
          <a href="#open-source" className="hover:text-[#d4883b] transition-colors">Open Source</a>
          <a href="#playbooks" className="hover:text-[#d4883b] transition-colors">Playbooks</a>
          <a href="#telemetry-proof" className="hover:text-[#d4883b] transition-colors">Full-Stack Proof</a>
          <a href="#trajectory" className="hover:text-[#d4883b] transition-colors">Trajectory</a>
        </nav>

        {/* Actions & Prominent 3D Toggle */}
        <div className="flex items-center gap-3">
          
          {/* Prominent 3D World Launch Button */}
          <button
            onClick={() => onToggleMode('3d')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#141d2b] hover:bg-[#1c293d] text-[#38bdf8] border border-[#274063] shadow-lg transition-all hover:scale-105"
            title="Launch Full-Screen Interactive 3D Signal Corridor"
          >
            <Compass className="w-4 h-4 text-[#38bdf8] animate-spin" style={{ animationDuration: '12s' }} />
            <span>Launch 3D World</span>
          </button>

          {/* Resume Button */}
          <button
            onClick={onOpenResume}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[#161a22] hover:bg-[#1e2532] text-[#eeeff2] border border-[#263142] transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#d4883b]" />
            <span>Resume</span>
          </button>

          {/* Contact Button */}
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#d4883b] hover:bg-[#e0984d] text-[#0b0d11] font-bold shadow-md transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>

        </div>
      </div>
    </header>
  );
};
