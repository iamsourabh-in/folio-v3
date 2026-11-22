import React from 'react';
import { Award, CheckCircle2, ChevronRight, FileText, Mail, RefreshCw, Compass, MapPin, Phone } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030508]/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="max-w-2xl w-full bg-[#0b0e14] border-2 border-[#d4883b] rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(212,136,59,0.35)] relative overflow-hidden max-h-[92vh] overflow-y-auto no-scrollbar">
        
        {/* Glow ambient background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4883b]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Victory Header Badge */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#181d26] border border-[#2d374a] text-xs font-mono text-[#d4883b] w-fit mb-4">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="font-bold tracking-wider">MISSION ACCOMPLISHED // ALL 7 COMPANY LANDING ZONES SURVEYED</span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#eeeff2] mb-1 leading-tight">
          Sourabh Rustagi
        </h2>
        <div className="text-xs sm:text-sm font-mono text-[#d4883b] font-semibold mb-4">
          Chief Systems &amp; Cloud-Native Architect | Agentic AI &amp; Platform Engineering
        </div>

        <p className="text-xs sm:text-sm text-[#9aa4b5] leading-relaxed mb-5 font-sans">
          You have successfully touched down across all 7 landing zones, surveying 13+ years of continuous architectural leadership across Samsung Research Institute, TransUnion &amp; Saksoft, Daffodil Software, and EaseMyTrip.
        </p>

        {/* Company Touchdown Trajectory Summary */}
        <div className="space-y-2 mb-6">
          <div className="p-2.5 rounded-xl bg-[#121620] border border-[#1f2838] flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-amber-400 font-bold">LZ-05 &amp; 06:</span> <strong className="text-[#eeeff2]">Samsung Research Institute</strong> (2024–Present)
              <div className="text-[11px] text-[#7a8494]">1,000,000+ Concurrent Actors, LiveKit WebRTC &lt;45ms, Memory-as-a-Service, MCP</div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">Flagship</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#121620] border border-[#1f2838] flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-emerald-400 font-bold">LZ-03 &amp; 04:</span> <strong className="text-[#eeeff2]">TransUnion &amp; Saksoft Ltd.</strong> (2021–2024)
              <div className="text-[11px] text-[#7a8494]">AWS EKS Migration, Flux v2 GitOps (90% Rollback Cut), HashiCorp Vault Secrets</div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 shrink-0">EKS Platform</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#121620] border border-[#1f2838] flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-teal-400 font-bold">LZ-02:</span> <strong className="text-[#eeeff2]">Daffodil Software Ltd.</strong> (2016–2021)
              <div className="text-[11px] text-[#7a8494]">Serverless AWS, HL7 FHIR Servers, HIPAA 99.99% SLA, .NET Core Modernization</div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">Award Winner</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#121620] border border-[#1f2838] flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-amber-300 font-bold">LZ-01:</span> <strong className="text-[#eeeff2]">Inventra Technologies &amp; EaseMyTrip</strong> (2013–2016)
              <div className="text-[11px] text-[#7a8494]">High-Volume B2B Travel Booking Engine, Amadeus APIs, 50% SQL Latency Cut</div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 shrink-0">Scale Root</span>
          </div>
        </div>

        {/* Verified Systems Proof Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6 font-mono text-xs">
          <div className="p-2.5 rounded-xl bg-[#12151c] border border-[#202735]">
            <div className="text-[10px] text-[#7a8494] mb-0.5">CONCURRENCY</div>
            <div className="text-base font-bold text-[#eeeff2]">1,000,000+</div>
            <div className="text-[10px] text-amber-300">Actors, 0 locks</div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#12151c] border border-[#202735]">
            <div className="text-[10px] text-[#7a8494] mb-0.5">WEBRTC LATENCY</div>
            <div className="text-base font-bold text-[#eeeff2]">&lt; 45ms</div>
            <div className="text-[10px] text-[#38bdf8]">LiveKit Go SFU</div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#12151c] border border-[#202735]">
            <div className="text-[10px] text-[#7a8494] mb-0.5">GITOPS STABILITY</div>
            <div className="text-base font-bold text-[#eeeff2]">90% Cut</div>
            <div className="text-[10px] text-emerald-400">Rollbacks via Flux v2</div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#12151c] border border-[#202735]">
            <div className="text-[10px] text-[#7a8494] mb-0.5">OPEN SOURCE</div>
            <div className="text-base font-bold text-[#eeeff2]">28,500+</div>
            <div className="text-[10px] text-[#d4883b]">ngx-txt-img downloads</div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#12151c] border border-[#202735]">
            <div className="text-[10px] text-[#7a8494] mb-0.5">HEALTHCARE SLA</div>
            <div className="text-base font-bold text-[#eeeff2]">99.99%</div>
            <div className="text-[10px] text-teal-400">HIPAA FHIR citadel</div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#12151c] border border-[#202735]">
            <div className="text-[10px] text-[#7a8494] mb-0.5">LEADERSHIP</div>
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
            <span>Replay</span>
          </button>
        </div>

      </div>
    </div>
  );
};
