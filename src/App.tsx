import React, { useState, useEffect, Suspense, lazy } from 'react';
import { CASE_FILES } from './data/caseFiles';
import { Navigation } from './components/Navigation';
import { ArrivalHero } from './components/ArrivalHero';
import { CaseFileCard } from './components/CaseFileCard';
import { DecisionLogSection } from './components/DecisionLogSection';
import { OpenSourceSection } from './components/OpenSourceSection';
import { PlaybooksSection } from './components/PlaybooksSection';
import { FullStackProofSection } from './components/FullStackProofSection';
import { CareerTimeline } from './components/CareerTimeline';
import { ContactModal } from './components/ContactModal';
import { ArrowUp, Radio } from 'lucide-react';

// Lazy load Three.js 3D world so 2D Skim Mode loads with zero WebGL overhead
const SignalCorridor3D = lazy(() => import('./components/SignalCorridor3D').then(m => ({ default: m.SignalCorridor3D })));

export function App() {
  const [activeMode, setActiveMode] = useState<'skim' | '3d'>('skim');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [latencyMs, setLatencyMs] = useState(42);

  // Simulated latency variance
  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyMs(prev => Math.floor(40 + Math.random() * 8));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectStation = (id: string) => {
    setSelectedStationId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0d11] text-[#eeeff2] selection:bg-[#d4883b]/30 selection:text-white">
      
      {/* Top Header & Navigation */}
      <Navigation
        activeMode={activeMode}
        onToggleMode={setActiveMode}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenResume={() => setIsContactOpen(true)}
        latencyMs={latencyMs}
      />

      {/* Arrival Hero: Positioning Statement, Pillars, and Recruiter Quick Stats */}
      <ArrivalHero
        activeMode={activeMode}
        onToggleMode={setActiveMode}
        onExploreChapters={() => {
          document.getElementById('chapters')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenDecisionLog={() => {
          document.getElementById('decision-log')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Optional Interactive 3D World (The Signal Corridor) */}
      {activeMode === '3d' && (
        <section className="relative">
          <Suspense fallback={
            <div className="w-full h-[750px] bg-[#08090d] border-b border-[#202735] flex items-center justify-center font-mono text-xs text-[#d4883b]">
              <span className="animate-pulse">INITIALIZING 3D SIGNAL CORRIDOR FLIGHT...</span>
            </div>
          }>
            <SignalCorridor3D
              onSelectStation={handleSelectStation}
              onExitToSkim={() => setActiveMode('skim')}
            />
          </Suspense>
        </section>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        
        {/* Chapters 1 to 7: Architectural Case Files */}
        <section id="chapters" className="mb-16">
          <div className="mb-10 pb-4 border-b border-[#202735] flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#12161f] border border-[#232c3d] text-xs font-mono text-[#d4883b] mb-2">
                <Radio className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL CASE FILES (STATIONS 01 – 07)</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#eeeff2]">
                Decisions, Hard Constraints & Failure Post-Mortems
              </h2>
            </div>

            <div className="text-xs font-mono text-[#7a8494]">
              Readable in ~90s per case file • 100% Anonymized
            </div>
          </div>

          {/* Render All 7 Case Files */}
          <div className="space-y-4">
            {CASE_FILES.map((caseFile) => (
              <CaseFileCard
                key={caseFile.id}
                caseFile={caseFile}
                isFlagship={caseFile.chapterNumber === 5}
              />
            ))}
          </div>
        </section>

        {/* The Observatory: Decision Log */}
        <DecisionLogSection />

        {/* Open Source Artifacts & Maintainer Philosophy */}
        <OpenSourceSection />

        {/* Engineering Leadership & Mentorship Playbooks */}
        <PlaybooksSection />

        {/* The Full-Stack Proof: Over-Engineered for Fun */}
        <FullStackProofSection />

        {/* Chronological Career Trajectory */}
        <CareerTimeline />

      </main>

      {/* Footer */}
      <footer className="border-t border-[#1f2636] bg-[#08090d] py-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[#7a8494]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#d4883b]"></span>
            <span className="text-[#eeeff2] font-semibold">Sourabh Rustagi</span>
            <span>—</span>
            <span>Lead Engineer & Distributed Systems Architect</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#chapters" className="hover:text-[#d4883b] transition-colors">Case Files</a>
            <a href="#decision-log" className="hover:text-[#d4883b] transition-colors">Decision Log</a>
            <a href="#open-source" className="hover:text-[#d4883b] transition-colors">Open Source</a>
            <a href="#playbooks" className="hover:text-[#d4883b] transition-colors">Playbooks</a>
            <button 
              onClick={handleScrollToTop}
              className="flex items-center gap-1 text-[#eeeff2] hover:text-[#d4883b] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-[#151922] text-[11px] font-mono text-[#525b6c] text-center">
          Zero-Bloat Systems Architecture • Strict Invariants • Signal Corridor Point of View • Phase 1
        </div>
      </footer>

      {/* Contact & Resume Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}

export default App;
