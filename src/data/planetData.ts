export interface PlanetMeta {
  id: string;
  chapterNumber: number;
  name: string;
  sector: string;
  coordinates: [number, number, number];
  radius: number;
  primaryColor: string;
  secondaryColor: string;
  achievementTitle: string;
  achievementSubtitle: string;
  planetarySummary: string;
}

export const PLANETS_META: PlanetMeta[] = [
  {
    id: "case-01-travel-search-scale",
    chapterNumber: 1,
    name: "Planet 01: Ingress-Prime",
    sector: "Sector Alpha-Ingress // B2B Travel Gateway",
    coordinates: [-38, 4, 18],
    radius: 2.2,
    primaryColor: "#d4883b",
    secondaryColor: "#38bdf8",
    achievementTitle: "ACHIEVEMENT UNLOCKED: TRAFFIC CONVERGENCE",
    achievementSubtitle: "Handled 100,000+ concurrent users with sub-second MongoDB/SQL aggregation.",
    planetarySummary: "Terrestrial golden world with molten data fissures and twin orbital packet rings syncing live flight APIs."
  },
  {
    id: "case-02-healthcare-fhir-serverless",
    chapterNumber: 2,
    name: "Planet 02: Crypt-FHIR",
    sector: "Sector Med-Lattice // Serverless Citadel",
    coordinates: [-24, -3, -14],
    radius: 2.0,
    primaryColor: "#2dd4bf",
    secondaryColor: "#38bdf8",
    achievementTitle: "ACHIEVEMENT UNLOCKED: REGULATORY FORTRESS",
    achievementSubtitle: "Maintained 99.99% healthcare SLA handling 10k req/s with zero HIPAA breaches.",
    planetarySummary: "Icy crystalline teal world enveloped in a rotating hexagonal security shield and medical telemetry satellites."
  },
  {
    id: "case-03-vault-dynamic-secrets",
    chapterNumber: 3,
    name: "Planet 03: Vault-9",
    sector: "Sector Cipher-Ring // Dynamic Governance",
    coordinates: [-10, 5, 20],
    radius: 2.4,
    primaryColor: "#f59e0b",
    secondaryColor: "#d4883b",
    achievementTitle: "ACHIEVEMENT UNLOCKED: ZERO-TRUST HORIZON",
    achievementSubtitle: "Automated dynamic credential rotation across high-compliance banking services.",
    planetarySummary: "Obsidian planet encased in colossal interlocking planetary gear rings rotating like a mechanical vault lock."
  },
  {
    id: "case-04-k8s-flux-gitops-mesh",
    chapterNumber: 4,
    name: "Planet 04: GitOps-Gateway",
    sector: "Sector Mesh-Binary // Dual Istio Gateways",
    coordinates: [6, -4, -18],
    radius: 2.1,
    primaryColor: "#10b981",
    secondaryColor: "#38bdf8",
    achievementTitle: "ACHIEVEMENT UNLOCKED: CANARY STABILITY",
    achievementSubtitle: "Reduced deployment rollbacks by 90% across 10+ teams using Flux v2 & Istio.",
    planetarySummary: "Dual binary planet system linked by an electric plasma bridge carrying 90% production and 10% canary flows."
  },
  {
    id: "case-05-orleans-webrtc-scale",
    chapterNumber: 5,
    name: "Planet 05: Orleans-Prime ★",
    sector: "Sector Sovereign-Core // 1M+ Actor Silo",
    coordinates: [22, 6, 24],
    radius: 3.6,
    primaryColor: "#fbbf24",
    secondaryColor: "#d4883b",
    achievementTitle: "ACHIEVEMENT UNLOCKED: MEGA-SCALE CONCURRENCY",
    achievementSubtitle: "1,000,000+ active concurrent users with Microsoft Orleans & zero distributed locking.",
    planetarySummary: "Colossal solar-amber megastructure planet ringed by thousands of virtual actor grains and polar WebRTC media ribbons."
  },
  {
    id: "case-06-autonomous-agent-roundtable",
    chapterNumber: 6,
    name: "Planet 06: Nexus-Agentis",
    sector: "Sector Neural-Swarm // Multi-Model Roundtable",
    coordinates: [40, -5, -12],
    radius: 2.3,
    primaryColor: "#818cf8",
    secondaryColor: "#38bdf8",
    achievementTitle: "ACHIEVEMENT UNLOCKED: AUTONOMOUS COGNITION",
    achievementSubtitle: "Multi-agent consensus architecture with persistent transactional memory ledgers.",
    planetarySummary: "Geometric icosahedral world orbited by three agent satellite probes exchanging visible laser triangles."
  },
  {
    id: "case-07-zero-bloat-maintainer-philosophy",
    chapterNumber: 7,
    name: "Planet 07: Terminus-Zero",
    sector: "Sector Terminus-Monolith // Zero-Bloat Citadel",
    coordinates: [58, 4, 18],
    radius: 2.2,
    primaryColor: "#eeeff2",
    secondaryColor: "#38bdf8",
    achievementTitle: "ACHIEVEMENT UNLOCKED: ZERO-BLOAT CULTURE",
    achievementSubtitle: "28,500+ downloads with zero external runtime dependencies and native Web APIs.",
    planetarySummary: "Pristine faceted diamond crystal planet floating in silent equilibrium, radiating calm expanding harmonic waves."
  }
];
