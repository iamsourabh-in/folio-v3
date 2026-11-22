import React from 'react';
import { Award, CheckCircle2, ChevronRight, FileText, Mail, RefreshCw, Compass } from 'lucide-react';

interface MissionFinaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReplay: () => void;
  onOpenContact: () => void;
  onExitTo2D: () => void;
}

export const MissionFinaleModal: React.FC<MissionFinaleModalProps> = ({
  isOpen,
  onClose,
  onReplay,
  onOpenContact,
  onExitTo2D
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030508]/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="max-w-2xl w-full bg-[#0b0e14] border-2 border-[#d4883b] rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(212,136,59,0.35)] relative overflow-hidden">
        
        {/* Glow ambient background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4883b]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Victory Header Badge */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#181d26] border border-[#2d374a] text-xs font-mono text-[#d4883b] w-fit mb-4">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="font-bold tracking-wider">MISSION ACCOMPLISHED // ALL 7 SECTORS CLEARED</span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#eeeff2] mb-3 leading-tight">
          Distributed Systems Mastery Proven.
        </h2>

        <p className="text-sm text-[#9aa4b5] leading-relaxed mb-6 font-sans">
          You have successfully navigated through all 7 cosmic sectors, surveying 13+ years of continuous architectural ownership across distributed actor runtimes, low-latency WebRTC pipelines, and enterprise cloud migrations.
        </p>

        {/* Verified Systems Proof Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 font-mono text-xs">
          <div className="p-3 rounded-xl bg-[#12151c] border border-[#202735]">
            <div className="text-[10px] text-[#7a8494] mb-1">CONCURRENCY</div>
            <div className="text-base font-bold text-[#eeeff2]">1,000,000+</div>
            <div className="text-[10px] text-amber-300">Actors, 0 locks</div>
          </div>

          <div className="p-3 rounded-xl bg-[#12151c] border border-[#202735]">
            <div className="text-[10px] text-[#7a8494] mb-1">WEBRTC LATENCY</div>
            <div className="text-base font-bold text-[#eeeff2]">&lt; 120ms</div>
            <div className="text-[10px] text-[#38bdf8]">LiveKit media core</div>
          </div>

          <div className="p-3 rounded-xl bg-[#12151c] border border-[#202735]">
            <div className="text-[10px] text-[#7a8494] mb-1">GITOPS STABILITY</div>
            <div className="text-base font-bold text-[#eeeff2]">90% Cut</div>
            <div className="text-[10px] text-emerald-400">Rollbacks via Flux v2</div>
          </div>

          <div className="p-3 rounded-xl bg-[#12151c] border border-[#202735]">
            <div className="text-[10px] text-[#7a8494] mb-1">OPEN SOURCE</div>
            <div className="text-base font-bold text-[#eeeff2]">28,500+</div>
            <div className="text-[10px] text-[#d4883b]">Zero-bloat npm pkgs</div>
          </div>

          <div className="p-3 rounded-xl bg-[#12151c] border border-[#202735]">
            <div className="text-[10px] text-[#7a8494] mb-1">HEALTHCARE SLA</div>
            <div className="text-base font-bold text-[#eeeff2]">99.99%</div>
            <div className="text-[10px] text-teal-400">HIPAA FHIR citadel</div>
          </div>

          <div className="p-3 rounded-xl bg-[#12151c] border border-[#202735]">
            <div className="text-[10px] text-[#7a8494] mb-1">LEADERSHIP</div>
            <div className="text-base font-bold text-[#eeeff2]">13+ Years</div>
            <div className="text-[10px] text-purple-300">Staff &amp; Principal</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onOpenContact}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#d4883b] hover:bg-[#e0984d] text-[#0b0d11] font-mono text-xs font-bold shadow-lg transition-transform active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span>Schedule Architectural Interview</span>
          </button>

          <button
            onClick={onExitTo2D}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#141923] hover:bg-[#1e2534] text-[#eeeff2] border border-[#263346] font-mono text-xs transition-colors"
          >
            <FileText className="w-4 h-4 text-[#38bdf8]" />
            <span>Review Full 2D Resume</span>
          </button>

          <button
            onClick={onReplay}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#141923] hover:bg-[#1e2534] text-[#9aa4b5] hover:text-[#eeeff2] border border-[#263346] font-mono text-xs transition-colors"
            title="Replay from Sector 01"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Replay Journey</span>
          </button>
        </div>

      </div>
    </div>
  );
};
