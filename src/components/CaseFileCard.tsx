import React, { useState } from 'react';
import { CaseFile } from '../types';
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Copy, Check, Terminal, Shield, ArrowUpRight } from 'lucide-react';

interface CaseFileCardProps {
  caseFile: CaseFile;
  isFlagship?: boolean;
}

export const CaseFileCard: React.FC<CaseFileCardProps> = ({ caseFile, isFlagship = false }) => {
  const [copied, setCopied] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState(isFlagship);

  const handleCopyArtifact = () => {
    navigator.clipboard.writeText(caseFile.artifact.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article 
      id={caseFile.id}
      className={`rounded-lg transition-all duration-200 border ${
        isFlagship 
          ? 'bg-[#12151c] border-[#d4883b]/60 shadow-[0_0_30px_rgba(212,136,59,0.08)]' 
          : 'bg-[#101319] border-[#202735] hover:border-[#2d374a]'
      } p-6 sm:p-8 mb-8 relative`}
    >
      {/* Station & Chapter Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#1c222e]">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#181d26] text-[#d4883b] border border-[#2d374a] font-semibold">
            CHAPTER 0{caseFile.chapterNumber}
          </span>
          <span className="font-mono text-xs text-[#7a8494]">{caseFile.stationCoordinates}</span>
          {isFlagship && (
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#d4883b]/20 text-[#d4883b] border border-[#d4883b]/40 font-semibold tracking-wide">
              ★ FLAGSHIP SCALE PROOF
            </span>
          )}
        </div>
        
        <div className="text-xs font-mono text-[#7a8494] flex items-center gap-2">
          <span>{caseFile.timeframe}</span>
          <span>•</span>
          <span className="text-[#9aa4b5]">{caseFile.anonymizedEmployer}</span>
        </div>
      </div>

      {/* Main Title & One-Line Hook */}
      <div className="mb-6">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#eeeff2] mb-2 leading-snug">
          {caseFile.title}
        </h3>
        <p className="font-mono text-sm text-[#d4883b] bg-[#161a22] p-2.5 rounded border border-[#232a39] flex items-start gap-2">
          <span className="font-bold select-none">Hook:</span>
          <span className="text-[#eeeff2] font-sans font-medium">{caseFile.oneLineHook}</span>
        </p>
      </div>

      {/* Beat 1 & 2: The Situation & Hard Constraints */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
        
        {/* Situation */}
        <div className="lg:col-span-7 bg-[#0d0f14] p-4 rounded border border-[#1b212c]">
          <div className="text-xs font-mono text-[#7a8494] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4883b]"></span>
            <span>1. The Situation</span>
          </div>
          <p className="text-sm text-[#9aa4b5] leading-relaxed">
            {caseFile.situation}
          </p>
        </div>

        {/* Constraints */}
        <div className="lg:col-span-5 bg-[#0d0f14] p-4 rounded border border-[#1b212c]">
          <div className="text-xs font-mono text-[#7a8494] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>2. Constraints & Invariants</span>
          </div>
          <ul className="text-xs font-mono space-y-1 text-[#9aa4b5]">
            <li><strong className="text-[#eeeff2]">Scale:</strong> {caseFile.constraints.scale}</li>
            <li><strong className="text-[#eeeff2]">Latency:</strong> {caseFile.constraints.latency}</li>
            {caseFile.constraints.compliance && (
              <li><strong className="text-[#eeeff2]">Compliance:</strong> {caseFile.constraints.compliance}</li>
            )}
            <li><strong className="text-[#eeeff2]">Legacy:</strong> {caseFile.constraints.legacy}</li>
          </ul>
        </div>

      </div>

      {/* Beat 3: The Decision (Chosen vs. Rejected & Why) */}
      <div className="bg-[#0e1117] p-5 rounded border border-[#1c2330] mb-6">
        <div className="text-xs font-mono text-[#d4883b] uppercase tracking-wider mb-2 font-semibold flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#d4883b]" />
          <span>3. The Architectural Decision</span>
        </div>
        
        <p className="text-sm text-[#eeeff2] mb-3 leading-relaxed font-medium">
          {caseFile.decision.chosen}
        </p>

        <div className="space-y-1.5 pt-2 border-t border-[#181d26]">
          <div className="text-xs font-mono text-[#7a8494]">Alternative Paths Discarded & Why:</div>
          {caseFile.decision.rejectedAndWhy.map((rejected, idx) => (
            <div key={idx} className="text-xs text-[#8b95a5] flex items-start gap-2 pl-1">
              <span className="text-red-400 font-mono select-none">✕</span>
              <span>{rejected}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Beat 4: What Broke (The Failure, Surprise & Diagnosis) */}
      <div className="bg-[#140e0e]/50 border border-red-900/40 p-5 rounded mb-6">
        <div className="text-xs font-mono text-red-400 uppercase tracking-wider mb-2 font-semibold flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span>4. What Broke: The Failure, Surprise & Resolution</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="font-mono text-[#eeeff2] block mb-1 font-semibold">The Failure & Surprise:</span>
            <p className="text-[#b39595] leading-relaxed mb-2">
              {caseFile.whatBroke.failure}
            </p>
            <p className="text-[#d8a9a9] italic">
              "{caseFile.whatBroke.surprise}"
            </p>
          </div>
          <div>
            <span className="font-mono text-[#eeeff2] block mb-1 font-semibold">Diagnosis & Exact Resolution:</span>
            <p className="text-[#99aab8] leading-relaxed mb-1.5">
              <strong className="text-[#eeeff2]">Diagnosis:</strong> {caseFile.whatBroke.diagnosis}
            </p>
            <p className="text-emerald-300/90 leading-relaxed">
              <strong className="text-emerald-400">Resolution:</strong> {caseFile.whatBroke.resolution}
            </p>
          </div>
        </div>
      </div>

      {/* Beat 5 & 6: Outcome & What I'd Do Differently */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        
        {/* Outcome */}
        <div className="md:col-span-7 bg-[#0c1214] border border-emerald-900/30 p-4 rounded">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1 font-semibold">
            5. The Measurable Outcome
          </div>
          <p className="text-sm text-[#c8d4d8] leading-relaxed">
            {caseFile.outcome}
          </p>
        </div>

        {/* What I'd do differently */}
        <div className="md:col-span-5 bg-[#14120e] border border-amber-900/30 p-4 rounded">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1 font-semibold">
            6. What I'd Do Differently
          </div>
          <p className="text-xs text-[#ccbeaf] italic leading-relaxed">
            "{caseFile.whatIdDoDifferently}"
          </p>
        </div>

      </div>

      {/* Artifact Inspector: Real Diagram, Topology, or Config */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#eeeff2]">
            <Terminal className="w-3.5 h-3.5 text-[#d4883b]" />
            <span className="font-semibold">{caseFile.artifact.title}</span>
            <span className="text-[#7a8494]">({caseFile.artifact.description})</span>
          </div>

          <button
            onClick={handleCopyArtifact}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#181d26] hover:bg-[#222a38] text-[11px] font-mono text-[#9aa4b5] hover:text-[#eeeff2] border border-[#2d374a] transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy Artifact'}</span>
          </button>
        </div>

        <pre className="ascii-artifact text-[11px] sm:text-xs">
          <code>{caseFile.artifact.code}</code>
        </pre>
      </div>

      {/* Beat 7: Stack and Keywords */}
      <div className="pt-4 border-t border-[#1c222e] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-[#7a8494] mr-1">7. Stack:</span>
          {caseFile.stackAndKeywords.map((tag) => (
            <span key={tag} className="tech-tag">
              {tag}
            </span>
          ))}
        </div>

        <a 
          href="#decision-log" 
          className="text-xs font-mono text-[#d4883b] hover:underline flex items-center gap-1"
        >
          <span>Linked in Decision Log</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>

    </article>
  );
};
