import React from 'react';
import { ArrowDown, Cpu, Layers, ShieldCheck, Zap } from 'lucide-react';

interface ArrivalHeroProps {
  onExploreChapters: () => void;
  onOpenDecisionLog: () => void;
  onToggleMode: (mode: 'skim' | '3d') => void;
  activeMode: 'skim' | '3d';
}

export const ArrivalHero: React.FC<ArrivalHeroProps> = ({
  onExploreChapters,
  onOpenDecisionLog,
  onToggleMode,
  activeMode
}) => {
  return (
    <section className="relative pt-12 pb-16 px-4 lg:px-8 border-b border-[#202735] corridor-grid">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Status & Recruiter Orientation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#12151c] border border-[#202735] text-xs font-mono text-[#d4883b]">
            <span className="w-2 h-2 rounded-full bg-[#d4883b] animate-ping"></span>
            <span>CORRIDOR LOG: 12+ YEARS CONTINUOUS ARCHITECTURAL OWNERSHIP</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#7a8494]">
            <span className="text-[#eeeff2] font-medium">Recruiter Skim Mode:</span>
            <span>Full technical depth readable in 60s without 3D requirement</span>
          </div>
        </div>

        {/* Hero Title & Lead Positioning Statement */}
        <div className="max-w-4xl">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#eeeff2] leading-[1.15] mb-5">
            Systems Architecture, Real-Time Media, and Distributed Actors at Scale.
          </h1>
          
          <p className="font-sans text-base sm:text-lg text-[#9aa4b5] leading-relaxed mb-8">
            I am <strong className="text-[#eeeff2] font-semibold">Sourabh Rustagi</strong>, a Lead Engineer and Systems Architect with 12+ years of continuous ownership across distributed backends, low-latency WebRTC infrastructure, and high-concurrency cloud platforms. Currently Chief Engineer architecting real-time classroom systems serving <strong className="text-[#d4883b] font-semibold">1,000,000+ active concurrent users</strong> with Microsoft Orleans virtual actors and zero distributed locking.
          </p>

          {/* Key Architect Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div className="p-3.5 rounded bg-[#12151c] border border-[#202735] hover:border-[#2d374a] transition-colors">
              <div className="flex items-center gap-2 text-[#d4883b] text-xs font-mono mb-1">
                <Cpu className="w-4 h-4" />
                <span>ACTOR CORE</span>
              </div>
              <div className="text-xl font-display font-bold text-[#eeeff2]">1,000,000+</div>
              <div className="text-[11px] font-mono text-[#7a8494] mt-0.5">Concurrent users with 0 locks</div>
            </div>

            <div className="p-3.5 rounded bg-[#12151c] border border-[#202735] hover:border-[#2d374a] transition-colors">
              <div className="flex items-center gap-2 text-[#38bdf8] text-xs font-mono mb-1">
                <Zap className="w-4 h-4" />
                <span>WEBRTC MEDIA</span>
              </div>
              <div className="text-xl font-display font-bold text-[#eeeff2]">&lt; 120ms</div>
              <div className="text-[11px] font-mono text-[#7a8494] mt-0.5">Global media transit latency</div>
            </div>

            <div className="p-3.5 rounded bg-[#12151c] border border-[#202735] hover:border-[#2d374a] transition-colors">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>GITOPS MESH</span>
              </div>
              <div className="text-xl font-display font-bold text-[#eeeff2]">90% Cut</div>
              <div className="text-[11px] font-mono text-[#7a8494] mt-0.5">Deployment rollbacks with Flux v2</div>
            </div>

            <div className="p-3.5 rounded bg-[#12151c] border border-[#202735] hover:border-[#2d374a] transition-colors">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-mono mb-1">
                <Layers className="w-4 h-4" />
                <span>OPEN SOURCE</span>
              </div>
              <div className="text-xl font-display font-bold text-[#eeeff2]">28,500+</div>
              <div className="text-[11px] font-mono text-[#7a8494] mt-0.5">Zero-dependency npm downloads</div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreChapters}
              className="flex items-center gap-2 px-5 py-2.5 rounded bg-[#eeeff2] text-[#0b0d11] font-mono text-xs font-semibold hover:bg-white transition-all shadow-sm"
            >
              <span>Inspect 7 Architectural Case Files</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenDecisionLog}
              className="flex items-center gap-2 px-4 py-2.5 rounded bg-[#181d26] hover:bg-[#202735] text-[#eeeff2] border border-[#2d374a] font-mono text-xs transition-colors"
            >
              <span>Open Observatory Decision Log (10 Cards)</span>
            </button>

            <button
              onClick={() => onToggleMode(activeMode === 'skim' ? '3d' : 'skim')}
              className="flex items-center gap-2 px-4 py-2.5 rounded bg-[#12151c] hover:bg-[#181d26] text-[#7a8494] hover:text-[#d4883b] border border-[#202735] font-mono text-xs transition-colors"
            >
              <span>{activeMode === 'skim' ? 'Launch 3D Signal Corridor' : 'Switch to 2D Skim Mode'}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
