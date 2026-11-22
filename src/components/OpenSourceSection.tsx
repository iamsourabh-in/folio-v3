import React from 'react';
import { OPEN_SOURCE_ARTIFACTS, SIDE_PRODUCTS } from '../data/openSource';
import { MAINTAINER_PHILOSOPHY } from '../data/maintainerPhilosophy';
import { Package, ExternalLink, ShieldCheck, FileCheck, BookOpen, Layers, Terminal } from 'lucide-react';

export const OpenSourceSection: React.FC = () => {
  return (
    <section id="open-source" className="py-16 px-4 lg:px-8 border-b border-[#202735]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 pb-6 border-b border-[#202735]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#12161f] border border-[#232c3d] text-xs font-mono text-[#d4883b] mb-3">
            <Package className="w-3.5 h-3.5" />
            <span>OPEN SOURCE ARTIFACTS & MAINTAINER PHILOSOPHY</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#eeeff2]">
            Real-World Community Packages, Tooling & Strict Standards
          </h2>
          <p className="font-sans text-sm text-[#9aa4b5] max-w-2xl mt-2">
            Engineering credibility is proven through public code, resilient zero-dependency architecture, and uncompromising code review discipline.
          </p>
        </div>

        {/* 3 Core OSS Packages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
          {OPEN_SOURCE_ARTIFACTS.map((artifact) => (
            <div 
              key={artifact.name}
              className="rounded-lg bg-[#11141b] border border-[#1f2634] p-6 hover:border-[#2d374a] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#181d26] text-[#38bdf8] border border-[#232c3c]">
                    {artifact.platform}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#d4883b] bg-[#1a1712] px-2 py-0.5 rounded border border-amber-900/40">
                    {artifact.metric}
                  </span>
                </div>

                <h3 className="font-mono text-base font-bold text-[#eeeff2] mb-2 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-[#d4883b]" />
                  <span>{artifact.name}</span>
                </h3>

                <p className="text-xs text-[#9aa4b5] mb-4 leading-relaxed">
                  {artifact.description}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-[#1a202b] mb-6">
                  <div className="text-[11px] font-mono text-[#7a8494] uppercase tracking-wider mb-1">
                    Architectural Invariants:
                  </div>
                  {artifact.architectureHighlights.map((highlight, idx) => (
                    <div key={idx} className="text-xs text-[#8c97a8] flex items-start gap-2">
                      <span className="text-[#d4883b] font-mono select-none">▸</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={artifact.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 rounded bg-[#181d26] hover:bg-[#202735] text-xs font-mono text-[#eeeff2] border border-[#2d374a] transition-colors"
              >
                <span>{artifact.linkLabel}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#d4883b]" />
              </a>
            </div>
          ))}
        </div>

        {/* Maintainer Philosophy Pillars */}
        <div className="mb-14">
          <div className="mb-6">
            <span className="text-xs font-mono text-[#d4883b] uppercase tracking-wider block mb-1">CULTURE & PRINCIPLES</span>
            <h3 className="font-display text-xl font-bold text-[#eeeff2]">Maintainer Philosophy</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MAINTAINER_PHILOSOPHY.map((pillar) => (
              <div 
                key={pillar.title}
                className="p-6 rounded-lg bg-[#0e1117] border border-[#1b222f]"
              >
                <div className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-[#161a22] text-[#d4883b] border border-[#242b38] mb-3 font-semibold">
                  {pillar.badge}
                </div>
                
                <h4 className="font-display text-base font-bold text-[#eeeff2] mb-1.5">
                  {pillar.title}
                </h4>
                
                <p className="text-xs font-mono text-[#38bdf8] mb-3">
                  {pillar.tagline}
                </p>

                <p className="text-xs text-[#8c96a8] leading-relaxed mb-4">
                  {pillar.description}
                </p>

                <ul className="space-y-1.5 pt-3 border-t border-[#181d26] text-xs text-[#9aa4b5]">
                  {pillar.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#d4883b] font-mono select-none">✓</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Side Products: MailZero & Meridian */}
        <div className="bg-[#0e1117] p-6 rounded-lg border border-[#1c222e]">
          <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#d4883b]">
            <Layers className="w-4 h-4" />
            <span className="font-bold">INDEPENDENT PRODUCT LABS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SIDE_PRODUCTS.map((product) => (
              <div key={product.name} className="p-4 rounded bg-[#12161f] border border-[#1f2634]">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="font-display text-base font-bold text-[#eeeff2]">{product.name}</h4>
                  <span className="text-[11px] font-mono text-[#38bdf8]">{product.tagline}</span>
                </div>
                <p className="text-xs text-[#8c97a8] mb-3 leading-relaxed">{product.description}</p>
                <div className="flex flex-wrap gap-1">
                  {product.stack.map(s => (
                    <span key={s} className="tech-tag text-[10px]">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
