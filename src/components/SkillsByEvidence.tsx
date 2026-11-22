import React, { useState } from 'react';
import { Layers, ArrowRight, ShieldCheck, CheckCircle2, Terminal } from 'lucide-react';

interface SkillEvidenceItem {
  skill: string;
  category: 'Distributed Systems' | 'Cloud & GitOps' | 'Security & Protocols' | 'Databases & Storage' | 'Frontend & Web APIs';
  experienceYears: string;
  provenByCaseFileId: string;
  provenByCaseFileTitle: string;
  chapterNumber: number;
  provingDetail: string;
}

export const SKILLS_BY_EVIDENCE: SkillEvidenceItem[] = [
  {
    skill: 'Microsoft Orleans & Actor Models',
    category: 'Distributed Systems',
    experienceYears: '4+ Years',
    provenByCaseFileId: 'multi-region-classroom-platform',
    provenByCaseFileTitle: 'Multi-Region Real-Time Platform',
    chapterNumber: 5,
    provingDetail: 'Architected single-threaded turn execution across ClassroomGrain and ParticipantGrain, sustaining 1,000,000+ concurrent users with zero distributed locks.'
  },
  {
    skill: 'LiveKit WebRTC & Media Servers',
    category: 'Distributed Systems',
    experienceYears: '3+ Years',
    provenByCaseFileId: 'multi-region-classroom-platform',
    provenByCaseFileTitle: 'Multi-Region Real-Time Platform',
    chapterNumber: 5,
    provingDetail: 'Self-hosted LiveKit clusters on Kubernetes with host networking, custom TURN domain advertisement, and sub-120ms global audio/video latency.'
  },
  {
    skill: 'Kubernetes (EKS/AKS) & Istio Mesh',
    category: 'Cloud & GitOps',
    experienceYears: '6+ Years',
    provenByCaseFileId: 'financial-cloud-gitops',
    provenByCaseFileTitle: 'Financial Services Cloud Migration',
    chapterNumber: 4,
    provingDetail: 'Migrated mission-critical financial workloads to AWS EKS with Istio STRICT mTLS enforcement and canary traffic routing.'
  },
  {
    skill: 'Flux v2 Declarative GitOps',
    category: 'Cloud & GitOps',
    experienceYears: '3+ Years',
    provenByCaseFileId: 'financial-cloud-gitops',
    provenByCaseFileTitle: 'Financial Services Cloud Migration',
    chapterNumber: 4,
    provingDetail: 'Eliminated external cluster-admin kubeconfig access; in-cluster reconcilers reduced production deployment rollbacks by 90%.'
  },
  {
    skill: 'HashiCorp Vault Dynamic Secret Governance',
    category: 'Security & Protocols',
    experienceYears: '4+ Years',
    provenByCaseFileId: 'auth-vault-microservices',
    provenByCaseFileTitle: 'Enterprise OAuth2 & Vault Dynamic Secrets',
    chapterNumber: 3,
    provingDetail: 'Replaced static credentials with Vault AppRole dynamic 1-hour ephemeral database users and automated connection pool recycling.'
  },
  {
    skill: 'FoundationDB & Multi-Key ACID',
    category: 'Databases & Storage',
    experienceYears: '2+ Years',
    provenByCaseFileId: 'multi-region-classroom-platform',
    provenByCaseFileTitle: 'Multi-Region Real-Time Platform',
    chapterNumber: 5,
    provingDetail: 'Employed FoundationDB as the serializable transactional metadata store, eliminating chat state corruption during multi-region network partitions.'
  },
  {
    skill: 'Apache Kafka Partitioning & Streaming',
    category: 'Distributed Systems',
    experienceYears: '5+ Years',
    provenByCaseFileId: 'open-source-side-products',
    provenByCaseFileTitle: 'Orleans-to-Kafka Stream Provider',
    chapterNumber: 7,
    provingDetail: 'Authored high-throughput stream connector mapping actor identities deterministically to Kafka topic partitions with zero byte-allocation buffers.'
  },
  {
    skill: 'HL7 FHIR Standards & HIPAA Security',
    category: 'Security & Protocols',
    experienceYears: '5+ Years',
    provenByCaseFileId: 'fhir-healthcare-platform',
    provenByCaseFileTitle: 'Serverless Healthcare Platform (FHIR)',
    chapterNumber: 2,
    provingDetail: 'Built custom FHIR observation servers on AWS Lambda, achieving 99.99% SLA and 100% HIPAA audit compliance with field-level KMS encryption.'
  },
  {
    skill: 'Zero-Dependency Native Canvas 2D',
    category: 'Frontend & Web APIs',
    experienceYears: '8+ Years',
    provenByCaseFileId: 'open-source-side-products',
    provenByCaseFileTitle: 'ngx-txt-img Open Source Package',
    chapterNumber: 7,
    provingDetail: 'Published zero-dependency placeholder package with 28,500+ npm downloads, sub-12KB bundle size, and zero security vulnerability advisories.'
  },
  {
    skill: 'Multi-Agent Autonomous Systems (A2A)',
    category: 'Distributed Systems',
    experienceYears: '2+ Years',
    provenByCaseFileId: 'agent-native-systems',
    provenByCaseFileTitle: 'Agent-Native Round-Table & Memory Ledger',
    chapterNumber: 6,
    provingDetail: 'Designed group chat substrate where humans and AI agents are peers; implemented append-only SHA-256 hash-chained memory ledger.'
  }
];

export const SkillsByEvidence: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Distributed Systems', 'Cloud & GitOps', 'Security & Protocols', 'Databases & Storage', 'Frontend & Web APIs'];

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS_BY_EVIDENCE
    : SKILLS_BY_EVIDENCE.filter(s => s.category === selectedCategory);

  const handleScrollToCaseFile = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="skills-by-evidence" className="py-16 px-4 lg:px-8 border-b border-[#202735] bg-[#0c0e14]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#202735]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#12161f] border border-[#232c3d] text-xs font-mono text-[#d4883b] mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SKILLS BY EVIDENCE</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#eeeff2]">
              Every Skill Backed by a Verified Case File
            </h2>
            <p className="font-sans text-sm text-[#9aa4b5] max-w-2xl mt-2">
              No ungrounded buzzword lists. Each technical competency links directly to the architectural case file, failure post-mortem, and production metric that proves it.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-mono px-2.5 py-1 rounded transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#d4883b] text-[#0b0d11] font-bold'
                    : 'bg-[#141822] text-[#8c97a8] hover:text-[#eeeff2] border border-[#202735]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((item) => (
            <div
              key={item.skill}
              className="p-5 rounded-lg bg-[#11141b] border border-[#1f2634] hover:border-[#2d374a] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#161b24] text-[#38bdf8] border border-[#242e40]">
                    {item.category}
                  </span>
                  <span className="font-mono text-xs text-[#7a8494]">
                    {item.experienceYears}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-[#eeeff2] mb-1.5">
                  {item.skill}
                </h3>

                <p className="text-xs text-[#9aa4b5] leading-relaxed mb-4">
                  {item.provingDetail}
                </p>
              </div>

              {/* Link to Case File */}
              <button
                onClick={() => handleScrollToCaseFile(item.provenByCaseFileId)}
                className="flex items-center justify-between pt-3 border-t border-[#1a212e] text-xs font-mono text-[#d4883b] hover:text-white transition-colors group text-left"
              >
                <span>Proved in Chapter 0{item.chapterNumber}: {item.provenByCaseFileTitle}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
