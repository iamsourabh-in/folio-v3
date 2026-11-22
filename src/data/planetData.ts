export interface PlanetMeta {
  id: string;
  chapterNumber: number;
  landingZoneId: string;
  companyName: string;
  roleTitle: string;
  tenure: string;
  name: string;
  sector: string;
  coordinates: [number, number, number];
  landingPadOffset: [number, number, number];
  radius: number;
  primaryColor: string;
  secondaryColor: string;
  accentGlow: string;
  achievementTitle: string;
  achievementSubtitle: string;
  planetarySummary: string;
  keyMetric: string;
  award?: string;
}

export const PLANETS_META: PlanetMeta[] = [
  {
    id: "case-01-travel-search-scale",
    chapterNumber: 1,
    landingZoneId: "LZ-01",
    companyName: "Inventra Technologies & EaseMyTrip",
    roleTitle: "Software Developer / Web Engineer",
    tenure: "2013 – 2016",
    name: "Landing Zone 01: EaseMyTrip & Inventra",
    sector: "Sector 01 // B2B Travel Gateway & SQL Scale",
    coordinates: [-26, 3, 35],
    landingPadOffset: [0, -3.8, 0],
    radius: 2.5,
    primaryColor: "#f59e0b",
    secondaryColor: "#38bdf8",
    accentGlow: "#fbbf24",
    keyMetric: "100k+ Monthly Txns",
    award: "Employee of the Year (2015)",
    achievementTitle: "TOUCHDOWN: EASEMYTRIP & INVENTRA BASE",
    achievementSubtitle: "Supported 100,000+ monthly transactions with Amadeus APIs & 50% SQL latency cut.",
    planetarySummary: "Vibrant solar-gold planet ringed by live airline booking data streams and an illuminated high-throughput docking port."
  },
  {
    id: "case-02-healthcare-fhir-serverless",
    chapterNumber: 2,
    landingZoneId: "LZ-02",
    companyName: "Daffodil Software Ltd.",
    roleTitle: "Senior Associate IT (Tech Lead)",
    tenure: "2016 – 2021",
    name: "Landing Zone 02: Daffodil Healthcare Citadel",
    sector: "Sector 02 // Healthcare Serverless & FHIR Citadel",
    coordinates: [26, -3, 80],
    landingPadOffset: [0, -3.6, 0],
    radius: 2.3,
    primaryColor: "#10b981",
    secondaryColor: "#06b6d4",
    accentGlow: "#34d399",
    keyMetric: "99.99% Healthcare SLA",
    award: "Innovation Award (AI Chatbot) + Project of Year",
    achievementTitle: "TOUCHDOWN: DAFFODIL HEALTHCARE CITADEL",
    achievementSubtitle: "Maintained 99.99% SLA handling 10k req/s with zero HIPAA breaches on AWS Serverless.",
    planetarySummary: "Luminous emerald crystalline biosphere shielded by a rotating security grid with medical telemetry landing towers."
  },
  {
    id: "case-03-vault-dynamic-secrets",
    chapterNumber: 3,
    landingZoneId: "LZ-03",
    companyName: "TransUnion & Saksoft Ltd.",
    roleTitle: "Lead Platform Engineer / Senior Consultant",
    tenure: "2021 – 2024",
    name: "Landing Zone 03: TransUnion Vault Station",
    sector: "Sector 03 // Dynamic Secret Governance & Vault",
    coordinates: [-28, 4, 125],
    landingPadOffset: [0, -3.9, 0],
    radius: 2.6,
    primaryColor: "#eab308",
    secondaryColor: "#f97316",
    accentGlow: "#fde047",
    keyMetric: "Zero Hardcoded Secrets",
    achievementTitle: "TOUCHDOWN: TRANSUNION VAULT HORIZON",
    achievementSubtitle: "Automated dynamic credential rotation across high-compliance banking services with HashiCorp Vault.",
    planetarySummary: "Deep obsidian world encased in colossal interlocking planetary gear rings rotating like a mechanical vault lock."
  },
  {
    id: "case-04-k8s-flux-gitops-mesh",
    chapterNumber: 4,
    landingZoneId: "LZ-04",
    companyName: "TransUnion & Saksoft Ltd.",
    roleTitle: "Lead Platform Engineer / Senior Consultant",
    tenure: "2021 – 2024",
    name: "Landing Zone 04: TransUnion EKS Platform",
    sector: "Sector 04 // Enterprise AWS EKS & Flux v2 GitOps",
    coordinates: [26, -2, 170],
    landingPadOffset: [0, -3.7, 0],
    radius: 2.4,
    primaryColor: "#22c55e",
    secondaryColor: "#0ea5e9",
    accentGlow: "#4ade80",
    keyMetric: "90% Rollback Reduction",
    achievementTitle: "TOUCHDOWN: TRANSUNION GITOPS PLATFORM",
    achievementSubtitle: "Reduced deployment rollbacks by 90% across 10+ teams using Flux v2 GitOps & Terraform IaC.",
    planetarySummary: "Dual binary planet system linked by an electric plasma bridge carrying 90% production and 10% canary traffic."
  },
  {
    id: "case-05-orleans-webrtc-scale",
    chapterNumber: 5,
    landingZoneId: "LZ-05",
    companyName: "Samsung Research Institute",
    roleTitle: "Chief Systems Engineer / Tech Lead",
    tenure: "2024 – Present",
    name: "Landing Zone 05: Samsung Knox Classroom ★",
    sector: "Sector 05 // Hyper-Scale Virtual Actors & WebRTC Core ★",
    coordinates: [-32, 5, 220],
    landingPadOffset: [0, -5.2, 0],
    radius: 3.8,
    primaryColor: "#3b82f6",
    secondaryColor: "#fbbf24",
    accentGlow: "#60a5fa",
    keyMetric: "1,000,000+ Concurrent Actors",
    award: "Incredible Title Award (2 Quarters)",
    achievementTitle: "TOUCHDOWN: SAMSUNG KNOX FLAGSHIP STARPORT ★",
    achievementSubtitle: "1,000,000+ active concurrent users with zero distributed locks and <45ms LiveKit WebRTC.",
    planetarySummary: "Colossal royal cobalt & solar-gold megastructure planet ringed by virtual actor grains and WebRTC polar ribbons."
  },
  {
    id: "case-06-autonomous-agent-roundtable",
    chapterNumber: 6,
    landingZoneId: "LZ-06",
    companyName: "Samsung Research Institute",
    roleTitle: "Chief Systems Engineer / Tech Lead",
    tenure: "2024 – Present",
    name: "Landing Zone 06: Samsung AI Research Lab",
    sector: "Sector 06 // Agentic AI & Memory-as-a-Service Lab",
    coordinates: [28, -3, 265],
    landingPadOffset: [0, -3.8, 0],
    radius: 2.5,
    primaryColor: "#a855f7",
    secondaryColor: "#06b6d4",
    accentGlow: "#c084fc",
    keyMetric: "Memory-as-a-Service + MCP",
    achievementTitle: "TOUCHDOWN: SAMSUNG AGENTIC AI LAB",
    achievementSubtitle: "Memory-as-a-Service with hybrid Knowledge Graph + Temporal persistence and Model Context Protocol (MCP).",
    planetarySummary: "Radiant neon-violet icosahedral world orbited by three agent probes communicating with synchronous laser beams."
  },
  {
    id: "case-07-zero-bloat-maintainer-philosophy",
    chapterNumber: 7,
    landingZoneId: "LZ-07",
    companyName: "Open Source & Global Architecture",
    roleTitle: "Open Source Creator & Principal Architect",
    tenure: "13+ Years Ownership",
    name: "Landing Zone 07: Global Open Source Terminal",
    sector: "Sector 07 // Zero-Bloat Open Source & Principal Leadership",
    coordinates: [0, 4, 315],
    landingPadOffset: [0, -3.9, 0],
    radius: 2.6,
    primaryColor: "#f43f5e",
    secondaryColor: "#38bdf8",
    accentGlow: "#fb7185",
    keyMetric: "28,500+ Downloads (ngx-txt-img)",
    achievementTitle: "TOUCHDOWN: OPEN SOURCE CITADEL // MISSION COMPLETE",
    achievementSubtitle: "Creator of ngx-txt-img on npm with zero external runtime dependencies and 13+ years architecture leadership.",
    planetarySummary: "Prismatic rainbow diamond crystal refracting spectral beams with an expanding harmonic resonance wave."
  }
];
