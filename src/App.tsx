import React, { useState, useEffect, Suspense, lazy } from 'react';
import { CASE_FILES } from './data/caseFiles';
import { Navigation } from './components/Navigation';
import { ArrivalHero } from './components/ArrivalHero';
import { CaseFileCard } from './components/CaseFileCard';
import { DecisionLogSection } from './components/DecisionLogSection';
import { SkillsByEvidence } from './components/SkillsByEvidence';
import { OpenSourceSection } from './components/OpenSourceSection';
import { PlaybooksSection } from './components/PlaybooksSection';
import { FullStackProofSection } from './components/FullStackProofSection';
import { CareerTimeline } from './components/CareerTimeline';
import { ContactModal } from './components/ContactModal';
import { ArrowUp, Radio, Compass, Layers, Terminal, BookOpen, ShieldCheck, Activity, Briefcase } from 'lucide-react';

// Lazy load 3D world so 2D mode downloads zero WebGL code unless requested
const SignalCorridor3D = lazy(() => import('./components/SignalCorridor3D').then(m => ({ default: m.SignalCorridor3D })));

export function App() {
  const [activeMode, setActiveMode] = useState<'skim' | '3d'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === '3d' || window.location.hash === '#3d') {
        return '3d';
      }
    }
    return 'skim';
  });
  const [target3DStationIndex, setTarget3DStationIndex] = useState<number>(4);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [latencyMs, setLatencyMs] = useState(42);
  const [activeChapterFilter, setActiveChapterFilter] = useState<string>('all');

  // Simulated latency variance
  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyMs(40 + Math.floor(Math.random() * 8));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToChapter = (id: string) => {
    setActiveChapterFilter('all');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredCaseFiles = activeChapterFilter === 'all'
    ? CASE_FILES
    : CASE_FILES.filter(c => c.id === activeChapterFilter);

  // If in 3D Mode, render the full-screen immersive 3D Signal Corridor
  if (activeMode === '3d') {
    return (
      <div className="w-screen h-screen overflow-hidden bg-[#07090d]">
        <Suspense fallback={
          <div className="w-screen h-screen bg-[#07090d] flex flex-col items-center justify-center font-mono text-sm text-[#d4883b] gap-3">
            <div className="w-10 h-10 border-2 border-[#d4883b] border-t-transparent rounded-full animate-spin"></div>
            <span className="tracking-wider">INITIALIZING 3D SIGNAL CORRIDOR FLIGHT...</span>
          </div>
        }>
          <SignalCorridor3D
            initialStationIndex={target3DStationIndex}
            onExitToSkim={() => setActiveMode('skim')}
          />
        </Suspense>
      </div>
    );
  }

  // Otherwise, render the complete, clean 2D Editorial Website
  return (
    <div className="min-h-screen bg-[#0b0d11] text-[#eeeff2] selection:bg-[#d4883b]/30 selection:text-white pb-20">
      
      {/* Top Header Navigation */}
      <Navigation
        activeMode={activeMode}
        onToggleMode={setActiveMode}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenResume={() => setIsContactOpen(true)}
        latencyMs={latencyMs}
      />

      {/* Arrival Hero: Positioning Statement, Quick Stats & Launch 3D Banner */}
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

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        
        {/* Chapters 1 to 7: Architectural Case Files */}
        <section id="chapters" className="mb-20">
          <div className="mb-8 pb-4 border-b border-[#202735] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#12161f] border border-[#232c3d] text-xs font-mono text-[#d4883b] mb-2">
                <Radio className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL CASE FILES (STATIONS 01 – 07)</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#eeeff2]">
                Decisions, Hard Constraints &amp; Failure Post-Mortems
              </h2>
            </div>

            <div className="text-xs font-mono text-[#7a8494]">
              Readable in ~90s per case file • 100% Anonymized
            </div>
          </div>

          {/* Chapter Quick-Jump Bar */}
          <div className="mb-8 p-3 rounded-xl bg-[#10131b] border border-[#1e2533] flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#7a8494] mr-1">Direct Station Jump:</span>
            <button
              onClick={() => setActiveChapterFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeChapterFilter === 'all'
                  ? 'bg-[#d4883b] text-[#0b0d11] shadow'
                  : 'bg-[#161a24] text-[#8c97a8] hover:text-[#eeeff2] border border-[#242e40]'
              }`}
            >
              All 7 Chapters
            </button>
            {CASE_FILES.map((c) => (
              <button
                key={c.id}
                onClick={() => handleJumpToChapter(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                  activeChapterFilter === c.id
                    ? 'bg-[#d4883b] text-[#0b0d11] font-bold shadow'
                    : 'bg-[#141822] text-[#8c97a8] hover:text-[#eeeff2] hover:bg-[#1a212f] border border-[#202735]'
                }`}
              >
                <span>CH 0{c.chapterNumber}: {c.title.split(':')[0]}</span>
                {c.chapterNumber === 5 && <span className="text-amber-300 font-bold">★</span>}
              </button>
            ))}
          </div>

          {/* Render Case Files */}
          <div className="space-y-6">
            {filteredCaseFiles.map((caseFile) => (
              <CaseFileCard
                key={caseFile.id}
                caseFile={caseFile}
                isFlagship={caseFile.chapterNumber === 5}
                onInspectIn3D={(idx) => {
                  setTarget3DStationIndex(idx);
                  setActiveMode('3d');
                }}
              />
            ))}
          </div>
        </section>

        {/* The Observatory: Decision Log */}
        <DecisionLogSection />

        {/* Skills by Evidence Matrix */}
        <SkillsByEvidence />

        {/* Open Source Artifacts & Maintainer Philosophy */}
        <OpenSourceSection />

        {/* Engineering Leadership & Mentorship Playbooks */}
        <PlaybooksSection />

        {/* The Full-Stack Proof: Over-Engineered for Fun */}
        <FullStackProofSection />

        {/* Chronological Career Trajectory */}
        <CareerTimeline />

      </main>

      {/* Floating Quick-Jump Mini Dock (Effortless Navigation) */}
      <div className="fixed bottom-5 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
        <div className="pointer-events-auto bg-[#0f1218]/90 backdrop-blur-xl border border-[#273244] p-1.5 rounded-2xl shadow-2xl flex flex-wrap items-center justify-center gap-1 max-w-full">
          <a
            href="#chapters"
            className="px-3 py-1.5 rounded-xl text-xs font-mono text-[#8c97a8] hover:text-[#eeeff2] hover:bg-[#1b2230] transition-colors flex items-center gap-1"
          >
            <Radio className="w-3.5 h-3.5 text-[#d4883b]" />
            <span>Stories</span>
          </a>

          <a
            href="#decision-log"
            className="px-3 py-1.5 rounded-xl text-xs font-mono text-[#8c97a8] hover:text-[#eeeff2] hover:bg-[#1b2230] transition-colors flex items-center gap-1"
          >
            <Compass className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Decisions</span>
          </a>

          <a
            href="#skills-by-evidence"
            className="px-3 py-1.5 rounded-xl text-xs font-mono text-[#8c97a8] hover:text-[#eeeff2] hover:bg-[#1b2230] transition-colors flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Skills</span>
          </a>

          <a
            href="#open-source"
            className="px-3 py-1.5 rounded-xl text-xs font-mono text-[#8c97a8] hover:text-[#eeeff2] hover:bg-[#1b2230] transition-colors flex items-center gap-1"
          >
            <Terminal className="w-3.5 h-3.5 text-amber-300" />
            <span>OSS</span>
          </a>

          <a
            href="#playbooks"
            className="px-3 py-1.5 rounded-xl text-xs font-mono text-[#8c97a8] hover:text-[#eeeff2] hover:bg-[#1b2230] transition-colors flex items-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#d4883b]" />
            <span>Playbooks</span>
          </a>

          <a
            href="#trajectory"
            className="px-3 py-1.5 rounded-xl text-xs font-mono text-[#8c97a8] hover:text-[#eeeff2] hover:bg-[#1b2230] transition-colors flex items-center gap-1"
          >
            <Briefcase className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>History</span>
          </a>

          <div className="h-4 w-px bg-[#263144] mx-1 hidden sm:block"></div>

          {/* 1-Click Launch 3D World */}
          <button
            onClick={() => setActiveMode('3d')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#d4883b] hover:bg-[#e0984d] text-[#0b0d11] shadow transition-all hover:scale-105"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Launch 3D World</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#1f2636] bg-[#08090d] py-12 px-4 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[#7a8494]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#d4883b]"></span>
            <span className="text-[#eeeff2] font-semibold">Sourabh Rustagi</span>
            <span>—</span>
            <span>Lead Engineer &amp; Distributed Systems Architect</span>
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
          Zero-Bloat Systems Architecture • Strict Invariants • Signal Corridor Point of View
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
