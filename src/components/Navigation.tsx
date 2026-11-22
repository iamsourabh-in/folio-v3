import React, { useState } from 'react';
import { Radio, FileText, Mail, Activity, Compass, Menu, X, Terminal, BookOpen, ShieldCheck, Briefcase } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0b0d11]/92 border-b border-[#202735] px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Live Corridor Status */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#141923] border border-[#2d374a] flex items-center justify-center text-[#d4883b] shadow-md">
            <Radio className="w-4 h-4 signal-live" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <a href="#" className="font-display font-bold text-sm tracking-wide text-[#eeeff2] hover:text-[#d4883b] transition-colors">
                Sourabh Rustagi
              </a>
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
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-xs font-mono text-[#9aa4b5]">
          <a href="#chapters" className="hover:text-[#d4883b] transition-colors py-1">01–07 Stories</a>
          <a href="#decision-log" className="hover:text-[#d4883b] transition-colors py-1">Decision Log</a>
          <a href="#skills-by-evidence" className="hover:text-[#d4883b] transition-colors py-1">Skills Matrix</a>
          <a href="#open-source" className="hover:text-[#d4883b] transition-colors py-1">Open Source</a>
          <a href="#playbooks" className="hover:text-[#d4883b] transition-colors py-1">Playbooks</a>
          <a href="#telemetry-proof" className="hover:text-[#d4883b] transition-colors py-1">Full-Stack Proof</a>
          <a href="#trajectory" className="hover:text-[#d4883b] transition-colors py-1">Trajectory</a>
        </nav>

        {/* Actions & Prominent 3D Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Prominent 3D World Launch Button */}
          <button
            onClick={() => onToggleMode('3d')}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#141d2b] hover:bg-[#1d2b3e] text-[#38bdf8] border border-[#274063] shadow-lg transition-all hover:scale-105 active:scale-95"
            title="Launch Full-Screen Interactive 3D Signal Corridor"
          >
            <Compass className="w-4 h-4 text-[#38bdf8] animate-spin" style={{ animationDuration: '10s' }} />
            <span className="hidden xs:inline sm:inline">3D World</span>
            <span className="xs:hidden sm:hidden">3D</span>
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
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#d4883b] hover:bg-[#e0984d] text-[#0b0d11] font-bold shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#141923] border border-[#263142] text-[#eeeff2] hover:bg-[#1c2331] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 pb-2 border-t border-[#1c2331] bg-[#0c0f16]/95 backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <a
              href="#chapters"
              onClick={handleNavClick}
              className="p-2.5 rounded-lg bg-[#121620] hover:bg-[#1b2230] border border-[#1e2736] text-[#eeeff2] flex items-center gap-2"
            >
              <Radio className="w-3.5 h-3.5 text-[#d4883b]" />
              <span>01–07 Stories</span>
            </a>
            <a
              href="#decision-log"
              onClick={handleNavClick}
              className="p-2.5 rounded-lg bg-[#121620] hover:bg-[#1b2230] border border-[#1e2736] text-[#eeeff2] flex items-center gap-2"
            >
              <Compass className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Decision Log</span>
            </a>
            <a
              href="#skills-by-evidence"
              onClick={handleNavClick}
              className="p-2.5 rounded-lg bg-[#121620] hover:bg-[#1b2230] border border-[#1e2736] text-[#eeeff2] flex items-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Skills Matrix</span>
            </a>
            <a
              href="#open-source"
              onClick={handleNavClick}
              className="p-2.5 rounded-lg bg-[#121620] hover:bg-[#1b2230] border border-[#1e2736] text-[#eeeff2] flex items-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5 text-amber-300" />
              <span>Open Source</span>
            </a>
            <a
              href="#playbooks"
              onClick={handleNavClick}
              className="p-2.5 rounded-lg bg-[#121620] hover:bg-[#1b2230] border border-[#1e2736] text-[#eeeff2] flex items-center gap-2"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#d4883b]" />
              <span>Playbooks</span>
            </a>
            <a
              href="#telemetry-proof"
              onClick={handleNavClick}
              className="p-2.5 rounded-lg bg-[#121620] hover:bg-[#1b2230] border border-[#1e2736] text-[#eeeff2] flex items-center gap-2"
            >
              <Activity className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Full-Stack Proof</span>
            </a>
            <a
              href="#trajectory"
              onClick={handleNavClick}
              className="col-span-2 p-2.5 rounded-lg bg-[#121620] hover:bg-[#1b2230] border border-[#1e2736] text-[#eeeff2] flex items-center gap-2"
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>Career Trajectory (13+ Years Continuous Timeline)</span>
            </a>
          </div>

          <div className="mt-3 pt-2 border-t border-[#1a212e] flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[#141822] text-[#eeeff2] border border-[#232c3d]"
            >
              <FileText className="w-3.5 h-3.5 text-[#d4883b]" />
              <span>View Resume</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleMode('3d');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#141d2b] text-[#38bdf8] border border-[#274063]"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Enter 3D Corridor</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
