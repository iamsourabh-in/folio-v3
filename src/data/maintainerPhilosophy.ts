export interface PhilosophyPillar {
  title: string;
  tagline: string;
  badge: string;
  description: string;
  rules: string[];
}

export const MAINTAINER_PHILOSOPHY: PhilosophyPillar[] = [
  {
    title: 'Zero-Bloat Core Dependencies',
    tagline: 'Prefer zero-dependency native Web APIs, Canvas, and standard libraries.',
    badge: 'SUPPLY-CHAIN RESILIENCE',
    description: 'Every external npm or NuGet package introduced into an enterprise codebase is an unvetted security vector, a source of bundle bloat, and a long-term maintenance liability.',
    rules: [
      'Evaluate whether the problem can be solved with native language/runtime standard libraries before adding an external package.',
      'Treat client-side bundle size as an unbending architectural constraint (every 100KB costs mobile conversion).',
      'Pin transitive dependencies strictly and mandate automated vulnerability auditing in CI before merges.'
    ]
  },
  {
    title: 'Strict PR Review Rubric',
    tagline: 'A PR is never merged without failure-domain analysis and backward compatibility.',
    badge: 'OPERATIONAL EXCELLENCE',
    description: 'Code review is not formatting verification (linters do that). Real review analyzes runtime boundary behaviors, connection pool limits, and telemetry emission.',
    rules: [
      '1) Failure-Domain Analysis: Explicit documentation of what happens when downstream network sockets hang or time out.',
      '2) Backward-Compatible Schema Migration: Dual-write or expand-and-contract database migration validation.',
      '3) Structured JSON Telemetry: Every critical business operation must emit structured telemetry with correlation IDs.'
    ]
  },
  {
    title: 'Blameless RFC Culture',
    tagline: 'Major architectural shifts require a written 2-page RFC document.',
    badge: 'ARCHITECTURAL INTENT',
    description: 'Architectural decisions must be made in the open with explicit trade-off analyses, discarded alternative options, and verifiable rollback triggers.',
    rules: [
      'Constraint Definition: Pinning hard SLA, concurrency, and latency bounds before writing any implementation code.',
      'Discarded Paths: Documenting exactly why alternative designs were considered and rejected.',
      'Explicit Rollback Triggers: Quantifiable metrics (e.g. error rate > 0.5% for 60s) that trigger immediate deployment rollback.'
    ]
  }
];
