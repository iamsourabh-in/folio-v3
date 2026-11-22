import React, { useState } from 'react';
import { PlaybookItem } from '../types';
import { X, Copy, Check, BookOpen, UserCheck, ShieldAlert, Code } from 'lucide-react';

interface PlaybookModalProps {
  playbook: PlaybookItem | null;
  onClose: () => void;
}

export const PlaybookModal: React.FC<PlaybookModalProps> = ({ playbook, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!playbook) return null;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(playbook.markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0f1218] border border-[#232c3d] rounded-xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1f2635] bg-[#12161f]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#181d26] border border-[#2d374a] flex items-center justify-center text-[#d4883b]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1c222e] text-[#d4883b] font-semibold">
                LEADERSHIP PLAYBOOK
              </span>
              <h3 className="font-display text-lg font-bold text-[#eeeff2] mt-0.5">
                {playbook.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#181d26] hover:bg-[#202735] text-xs font-mono text-[#eeeff2] border border-[#2d374a] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Markdown Copied!' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded bg-[#181d26] hover:bg-[#202735] text-[#9aa4b5] hover:text-[#eeeff2] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Target Audience Banner */}
          <div className="p-3 rounded bg-[#141822] border border-[#202735] flex items-center justify-between text-xs font-mono">
            <span className="text-[#7a8494]">Target Audience:</span>
            <span className="text-[#38bdf8] font-medium">{playbook.targetAudience}</span>
          </div>

          {/* Structured Sections */}
          <div className="space-y-6">
            {playbook.sections.map((section, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-[#12151c] border border-[#1b212c]">
                <h4 className="font-mono text-xs font-bold text-[#d4883b] uppercase tracking-wider mb-2.5">
                  {section.heading}
                </h4>
                <ul className="space-y-2 text-xs text-[#9aa4b5]">
                  {section.content.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <span className="text-[#38bdf8] font-mono select-none">▸</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Raw Markdown Source View */}
          <div className="pt-4 border-t border-[#1f2635]">
            <div className="text-xs font-mono text-[#7a8494] mb-2 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-[#d4883b]" />
              <span>Full Raw Markdown Source</span>
            </div>
            <pre className="ascii-artifact text-[11px] max-h-48 overflow-y-auto">
              <code>{playbook.markdownContent}</code>
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
};
