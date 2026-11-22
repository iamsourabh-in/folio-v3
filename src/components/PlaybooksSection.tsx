import React, { useState } from 'react';
import { PLAYBOOKS } from '../data/playbooks';
import { PlaybookItem } from '../types';
import { PlaybookModal } from './PlaybookModal';
import { BookOpen, UserCheck, ShieldAlert, CheckSquare, ArrowRight } from 'lucide-react';

export const PlaybooksSection: React.FC = () => {
  const [activePlaybook, setActivePlaybook] = useState<PlaybookItem | null>(null);

  const getPlaybookIcon = (id: string) => {
    switch (id) {
      case 'system-design-rubric': return <UserCheck className="w-5 h-5 text-[#d4883b]" />;
      case 'sev1-incident-checklist': return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'pr-review-standards': return <CheckSquare className="w-5 h-5 text-emerald-400" />;
      default: return <BookOpen className="w-5 h-5 text-[#d4883b]" />;
    }
  };

  return (
    <section id="playbooks" className="py-16 px-4 lg:px-8 border-b border-[#202735] bg-[#0c0f15]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 pb-6 border-b border-[#202735]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#12161f] border border-[#232c3d] text-xs font-mono text-[#d4883b] mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ENGINEERING LEADERSHIP & MENTORSHIP PLAYBOOKS</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#eeeff2]">
            Battle-Tested Templates, Rubrics & Incident Checklists
          </h2>
          <p className="font-sans text-sm text-[#9aa4b5] max-w-2xl mt-2">
            Artifacts refined across 13+ years of engineering leadership, staff mentorship, and high-concurrency production operations.
          </p>
        </div>

        {/* 3 Playbook Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLAYBOOKS.map((playbook) => (
            <div
              key={playbook.id}
              className="rounded-lg bg-[#11141c] border border-[#1e2533] p-6 hover:border-[#2d374a] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#161a24] border border-[#263042] flex items-center justify-center mb-4">
                  {getPlaybookIcon(playbook.id)}
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181d26] text-[#d4883b] font-semibold mb-2 inline-block">
                  PLAYBOOK • 1-CLICK READ
                </span>

                <h3 className="font-display text-lg font-bold text-[#eeeff2] mb-1.5 leading-snug">
                  {playbook.title}
                </h3>

                <p className="text-xs font-mono text-[#38bdf8] mb-3">
                  {playbook.targetAudience}
                </p>

                <p className="text-xs text-[#9aa4b5] leading-relaxed mb-6">
                  {playbook.summary}
                </p>
              </div>

              <button
                onClick={() => setActivePlaybook(playbook)}
                className="flex items-center justify-between w-full px-4 py-2.5 rounded bg-[#161b24] hover:bg-[#1e2533] text-xs font-mono text-[#eeeff2] border border-[#263042] hover:border-[#3b475d] transition-colors"
              >
                <span>Inspect Full Rubric & Copy Markdown</span>
                <ArrowRight className="w-4 h-4 text-[#d4883b]" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Modal */}
      <PlaybookModal 
        playbook={activePlaybook} 
        onClose={() => setActivePlaybook(null)} 
      />
    </section>
  );
};
