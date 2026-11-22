import React, { useState } from 'react';
import { CAREER_TRAJECTORY } from '../data/careerTrajectory';
import { Briefcase, Eye, ShieldCheck, ChevronRight } from 'lucide-react';

export const CareerTimeline: React.FC = () => {
  const [showRawEntities, setShowRawEntities] = useState(false);

  return (
    <section id="trajectory" className="py-16 px-4 lg:px-8 border-b border-[#202735]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-6 border-b border-[#202735]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#12161f] border border-[#232c3d] text-xs font-mono text-[#d4883b] mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>CHRONOLOGICAL CAREER TRAJECTORY</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#eeeff2]">
              13+ Years of Continuous Architectural Leadership
            </h2>
            <p className="font-sans text-sm text-[#9aa4b5] max-w-2xl mt-2">
              From early high-volume travel transaction engines to multi-region real-time WebRTC and distributed virtual actor platforms.
            </p>
          </div>

          {/* Anonymization Toggle */}
          <div className="flex items-center gap-2 bg-[#101319] p-1 rounded border border-[#202735]">
            <button
              onClick={() => setShowRawEntities(false)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                !showRawEntities
                  ? 'bg-[#1b2230] text-[#eeeff2] font-semibold'
                  : 'text-[#7a8494] hover:text-[#eeeff2]'
              }`}
            >
              Anonymized View
            </button>
            <button
              onClick={() => setShowRawEntities(true)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                showRawEntities
                  ? 'bg-[#1b2230] text-[#eeeff2] font-semibold'
                  : 'text-[#7a8494] hover:text-[#eeeff2]'
              }`}
            >
              Raw Entity Names
            </button>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-8 relative corridor-line pl-6 sm:pl-10">
          {CAREER_TRAJECTORY.map((role, idx) => (
            <div 
              key={idx}
              className="relative rounded-lg bg-[#11141b] border border-[#1e2534] p-6 hover:border-[#2d374a] transition-all"
            >
              {/* Timeline marker on the left line */}
              <div className="absolute -left-[30px] sm:-left-[46px] top-7 w-3.5 h-3.5 rounded-full bg-[#10131a] border-2 border-[#d4883b] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4883b]"></div>
              </div>

              {/* Role Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-display font-bold text-lg text-[#eeeff2]">
                    {role.title}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#161a24] text-[#d4883b] border border-[#263144]">
                    {role.category}
                  </span>
                </div>

                <span className="text-xs font-mono text-[#7a8494]">
                  {role.period}
                </span>
              </div>

              {/* Organization Display */}
              <div className="text-sm font-mono text-[#38bdf8] mb-3 flex items-center gap-1.5">
                <span>{showRawEntities ? role.organizationRaw : role.organizationAnonymized}</span>
                {showRawEntities && (
                  <span className="text-[10px] text-[#7a8494]">(Public Verification View)</span>
                )}
              </div>

              {/* Summary */}
              <p className="text-xs text-[#9aa4b5] mb-4 leading-relaxed font-sans">
                {role.summary}
              </p>

              {/* Accomplishment Bullets */}
              <ul className="space-y-2 mb-5 text-xs text-[#c0cad6]">
                {role.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <ChevronRight className="w-3.5 h-3.5 text-[#d4883b] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Tags */}
              <div className="pt-3 border-t border-[#1a212e] flex flex-wrap gap-1.5">
                {role.tags.map(tag => (
                  <span key={tag} className="tech-tag text-[10px]">
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
