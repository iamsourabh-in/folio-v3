export interface CaseFile {
  id: string;
  chapterNumber: number;
  stationName: string;
  stationCoordinates: string;
  title: string;
  oneLineHook: string;
  timeframe: string;
  role: string;
  anonymizedEmployer: string;
  
  // Storytelling format (every case file)
  situation: string;
  constraints: {
    scale?: string;
    latency?: string;
    team?: string;
    legacy?: string;
    compliance?: string;
    budget?: string;
    concurrency?: string;
    coordination?: string;
    dependencies?: string;
    dataIntegrity?: string;
    rendering?: string;
    throughput?: string;
    [key: string]: string | undefined;
  };
  decision: {
    chosen: string;
    rejectedAndWhy: string[];
    coreRationale: string;
  };
  whatBroke: {
    failure: string;
    surprise: string;
    diagnosis: string;
    resolution: string;
  };
  outcome: string;
  whatIdDoDifferently: string;
  stackAndKeywords: string[];
  
  // Artifacts that only someone who did the work would have
  artifact: {
    type: 'topology' | 'grain-scheme' | 'incident-timeline' | 'config-excerpt' | 'decision-memo';
    title: string;
    description: string;
    code: string;
  };
}

export interface DecisionLogCard {
  id: string;
  number: string;
  decisionTitle: string;
  chose: string;
  over: string;
  because: string;
  tradeoffAcknowledged: string;
  tags: string[];
}

export interface PlaybookItem {
  id: string;
  title: string;
  targetAudience: string;
  summary: string;
  sections: {
    heading: string;
    content: string[];
  }[];
  markdownContent: string;
}

export interface OpenSourceArtifact {
  name: string;
  platform: string;
  metric: string;
  description: string;
  architectureHighlights: string[];
  link: string;
  linkLabel: string;
}

export interface CareerRole {
  period: string;
  title: string;
  organizationAnonymized: string;
  organizationRaw: string;
  category: string;
  summary: string;
  bullets: string[];
  tags: string[];
}
