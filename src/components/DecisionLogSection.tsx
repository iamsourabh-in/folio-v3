import React, { useState } from 'react';
import { DECISION_LOG } from '../data/decisionLog';
import { Compass, Filter, Check, X, AlertTriangle } from 'lucide-react';

export const DecisionLogSection: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const allTags = ['All', 'Distributed Systems', 'WebRTC', 'Security', 'GitOps', 'Databases', 'AI Agents'];

  const filteredDecisions = selectedTag === 'All' 
    ? DECISION_LOG 
    : DECISION_LOG.filter(d => d.tags.some(t => t.toLowerCase().includes(selectedTag.toLowerCase())));

  return (
    <section id="decision-log" className="py-16 px-4 lg:px-8 border-b border-[#202735] bg-[#0c0e14]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#202735]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#12161f] border border-[#232c3d] text-xs font-mono text-[#d4883b] mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>THE OBSERVATORY DECISION LOG</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#eeeff2]">
              "I chose X over Y because Z."
            </h2>
            <p className="font-sans text-sm text-[#9aa4b5] max-w-2xl mt-2">
              Architectural maturity is not a list of frameworks; it is the reasoning behind hard trade-offs, explicit failure bounds, and the conscious rejection of industry defaults.
            </p>
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-mono text-[#7a8494] mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>Filter:</span>
            </span>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-xs font-mono px-2.5 py-1 rounded transition-colors ${
                  selectedTag === tag 
                    ? 'bg-[#d4883b] text-[#0b0d11] font-bold'
                    : 'bg-[#141822] text-[#8b95a5] hover:text-[#eeeff2] border border-[#202735]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Decision Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDecisions.map((decision) => (
            <div
              key={decision.id}
              className="rounded-lg bg-[#11141b] border border-[#1f2634] p-6 hover:border-[#2d374a] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Number & Title */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#181d26] text-[#d4883b] border border-[#2a3446] font-bold">
                    DECISION #{decision.number}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {decision.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#161b24] text-[#7a8494]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="font-display text-base font-bold text-[#eeeff2] mb-4 leading-snug">
                  {decision.decisionTitle}
                </h3>

                {/* Chose X over Y Box */}
                <div className="space-y-2 mb-4 bg-[#0a0c10] p-3.5 rounded border border-[#1a202c]">
                  <div className="text-xs flex items-start gap-2">
                    <span className="text-emerald-400 font-mono font-bold flex items-center gap-1 select-none">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>CHOSE:</span>
                    </span>
                    <span className="text-[#eeeff2] font-mono font-medium">{decision.chose}</span>
                  </div>

                  <div className="text-xs flex items-start gap-2 pt-2 border-t border-[#181e2b]">
                    <span className="text-red-400 font-mono font-bold flex items-center gap-1 select-none">
                      <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <span>OVER:</span>
                    </span>
                    <span className="text-[#8c97a8] font-mono">{decision.over}</span>
                  </div>
                </div>

                {/* Rationale "Because" */}
                <div className="text-xs text-[#9aa4b5] leading-relaxed mb-4">
                  <strong className="text-[#d4883b] font-mono block mb-1">BECAUSE:</strong>
                  {decision.because}
                </div>
              </div>

              {/* Trade-off Acknowledged */}
              <div className="bg-[#161410] border border-amber-900/30 p-2.5 rounded text-[11px] text-[#ccb7a0] flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-[#d4883b] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#d4883b] font-mono uppercase">Trade-off Accepted: </strong>
                  <span>{decision.tradeoffAcknowledged}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
