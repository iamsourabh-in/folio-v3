import React, { useState } from 'react';
import { CaseFile } from '../types';
import { X, Copy, Check, ChevronLeft, ChevronRight, Terminal, Shield, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface CaseFileOverlayPanelProps {
  caseFile: CaseFile | null;
  onClose: () => void;
  onNavigateStation: (direction: 'next' | 'prev') => void;
  totalStations: number;
}

export const CaseFileOverlayPanel: React.FC<CaseFileOverlayPanelProps> = ({
  caseFile,
  onClose,
  onNavigateStation,
  totalStations
}) => {
  const [copied, setCopied] = useState(false);

  if (!caseFile) return null;

  const handleCopyArtifact = () => {
    navigator.clipboard.writeText(caseFile.artifact.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFlagship = caseFile.chapterNumber === 5;

  return (
    <aside 
      className="fixed inset-y-0 right-0 z-50 w-full sm:w-[580px] lg:w-[680px] bg-[#0c0e14]/95 backdrop-blur-xl border-l border-[#232c3d] shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
      aria-label={`Case File: ${caseFile.title}`}
    >
      {/* Top Header Bar */}
      <div className="p-5 border-b border-[#1c222e] bg-[#0f1218]/90 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#181d26] text-[#d4883b] border border-[#2d374a] font-bold">
            STATION 0{caseFile.chapterNumber} OF 0{totalStations}
          </span>
          {isFlagship && (
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#d4883b]/20 text-[#d4883b] border border-[#d4883b]/40 font-bold">
              ★ FLAGSHIP
            </span>
          )}
          <span className="text-xs font-mono text-[#7a8494] hidden sm:inline">
            {caseFile.timeframe}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Station Steppers */}
          <button
            onClick={() => onNavigateStation('prev')}
            className="p-2 sm:p-1.5 rounded bg-[#161a22] hover:bg-[#202735] text-[#9aa4b5] hover:text-[#eeeff2] border border-[#263040] transition-colors"
            title="Previous Station (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigateStation('next')}
            className="p-2 sm:p-1.5 rounded bg-[#161a22] hover:bg-[#202735] text-[#9aa4b5] hover:text-[#eeeff2] border border-[#263040] transition-colors"
            title="Next Station (Right Arrow)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-1.5 ml-1 rounded-lg bg-[#d4883b] hover:bg-[#e0984d] text-[#0b0d11] font-bold text-xs font-mono shadow transition-transform active:scale-95"
            title="Close Panel and resume flight"
          >
            <X className="w-4 h-4" />
            <span className="hidden xs:inline sm:inline">Back to Flight</span>
          </button>
        </div>
      </div>

      {/* Scrollable Storytelling Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
        
        {/* Title & Hook */}
        <div>
          <span className="text-xs font-mono text-[#7a8494] block mb-1">
            {caseFile.anonymizedEmployer} • {caseFile.role}
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#eeeff2] leading-snug mb-3">
            {caseFile.title}
          </h2>
          <div className="p-3 rounded bg-[#141822] border border-[#202735] text-xs font-mono text-[#d4883b]">
            <span className="font-bold uppercase tracking-wider block mb-0.5 text-[#7a8494]">Architectural Thesis / Hook:</span>
            <span className="text-[#eeeff2] font-sans font-medium">{caseFile.oneLineHook}</span>
          </div>
        </div>

        {/* 1. Situation */}
        <div className="p-4 rounded-lg bg-[#0e1117] border border-[#1b212c]">
          <div className="text-xs font-mono text-[#d4883b] uppercase tracking-wider font-semibold mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4883b]"></span>
            <span>1. The Situation</span>
          </div>
          <p className="text-xs sm:text-sm text-[#9aa4b5] leading-relaxed">
            {caseFile.situation}
          </p>
        </div>

        {/* 2. Hard Constraints */}
        <div className="p-4 rounded-lg bg-[#0e1117] border border-[#1b212c]">
          <div className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>2. Constraints & Invariants</span>
          </div>
          <ul className="text-xs font-mono space-y-1.5 text-[#9aa4b5]">
            {caseFile.constraints.scale && (
              <li><strong className="text-[#eeeff2]">Scale:</strong> {caseFile.constraints.scale}</li>
            )}
            {caseFile.constraints.latency && (
              <li><strong className="text-[#eeeff2]">Latency:</strong> {caseFile.constraints.latency}</li>
            )}
            {caseFile.constraints.compliance && (
              <li><strong className="text-[#eeeff2]">Compliance:</strong> {caseFile.constraints.compliance}</li>
            )}
            {caseFile.constraints.legacy && (
              <li><strong className="text-[#eeeff2]">Legacy:</strong> {caseFile.constraints.legacy}</li>
            )}
          </ul>
        </div>

        {/* 3. The Decision */}
        <div className="p-4 rounded-lg bg-[#0e1117] border border-[#1b212c]">
          <div className="text-xs font-mono text-[#d4883b] uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#d4883b]" />
            <span>3. The Architectural Decision</span>
          </div>
          <p className="text-xs sm:text-sm text-[#eeeff2] mb-3 leading-relaxed font-medium">
            {caseFile.decision.chosen}
          </p>
          <div className="space-y-1.5 pt-2 border-t border-[#181d26]">
            <div className="text-[11px] font-mono text-[#7a8494]">Alternative Paths Discarded:</div>
            {caseFile.decision.rejectedAndWhy.map((rej, idx) => (
              <div key={idx} className="text-xs text-[#8c97a8] flex items-start gap-2">
                <span className="text-red-400 font-mono select-none">✕</span>
                <span>{rej}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. What Broke */}
        <div className="p-4 rounded-lg bg-[#140e0e]/50 border border-red-900/40">
          <div className="text-xs font-mono text-red-400 uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span>4. What Broke: Failure & Diagnosis</span>
          </div>
          <div className="space-y-2 text-xs">
            <p className="text-[#c7a9a9]">
              <strong className="text-[#eeeff2]">Failure:</strong> {caseFile.whatBroke.failure}
            </p>
            <p className="text-[#d8a9a9] italic">
              "{caseFile.whatBroke.surprise}"
            </p>
            <p className="text-[#a8b8c5]">
              <strong className="text-[#eeeff2]">Diagnosis:</strong> {caseFile.whatBroke.diagnosis}
            </p>
            <p className="text-emerald-300">
              <strong className="text-emerald-400">Resolution:</strong> {caseFile.whatBroke.resolution}
            </p>
          </div>
        </div>

        {/* 5 & 6. Outcome & What I'd Do Differently */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded bg-[#0c1214] border border-emerald-900/30">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold block mb-1">
              5. The Outcome
            </span>
            <p className="text-xs text-[#c8d4d8] leading-relaxed">
              {caseFile.outcome}
            </p>
          </div>

          <div className="p-3.5 rounded bg-[#14120e] border border-amber-900/30">
            <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold block mb-1">
              6. What I'd Do Differently
            </span>
            <p className="text-xs text-[#ccbeaf] italic leading-relaxed">
              "{caseFile.whatIdDoDifferently}"
            </p>
          </div>
        </div>

        {/* Artifact Inspector */}
        <div className="p-4 rounded-lg bg-[#08090d] border border-[#1c222e]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#eeeff2]">
              <Terminal className="w-3.5 h-3.5 text-[#d4883b]" />
              <span className="font-semibold">{caseFile.artifact.title}</span>
            </div>
            <button
              onClick={handleCopyArtifact}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#141822] hover:bg-[#1e2533] text-[10px] font-mono text-[#9aa4b5] hover:text-[#eeeff2] border border-[#283244] transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="ascii-artifact text-[11px] max-h-48 overflow-y-auto">
            <code>{caseFile.artifact.code}</code>
          </pre>
        </div>

        {/* Stack Tags */}
        <div className="pt-2">
          <span className="text-[11px] font-mono text-[#7a8494] block mb-1.5">7. Technologies & ATS Keywords:</span>
          <div className="flex flex-wrap gap-1">
            {caseFile.stackAndKeywords.map((tag) => (
              <span key={tag} className="tech-tag text-[10px]">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Footer Actions */}
      <div className="p-4 border-t border-[#1c222e] bg-[#0f1218]/90 flex items-center justify-between text-xs font-mono gap-3">
        <span className="text-[#7a8494] hidden sm:inline">Use ← / → to switch planets</span>
        <button
          onClick={onClose}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#d4883b] hover:bg-[#e0984d] text-[#0b0d11] font-bold text-center transition-all active:scale-95 shadow-lg"
        >
          Resume 3D Flight
        </button>
      </div>

    </aside>
  );
};
