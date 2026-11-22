import { PlaybookItem } from '../types';

export const PLAYBOOKS: PlaybookItem[] = [
  {
    id: 'system-design-rubric',
    title: 'Staff & Principal System Design Interview Rubric',
    targetAudience: 'Engineering Hiring Panels & Senior Architectural Candidates',
    summary: 'A rigorous 4-tier rubric for evaluating senior architectural candidates on distributed systems, failure domains, boundary trade-offs, and operational telemetry.',
    sections: [
      {
        heading: 'Tier 1: Problem Scoping & Constraint Invariants (0–15m)',
        content: [
          'Does the candidate proactively interrogate non-functional requirements (p99 latency, read/write ratios, peak burst factors, geographical distribution)?',
          'Candidate defines explicit SLA/SLO boundaries and data consistency invariants before proposing any technology names.',
          'Red Flag: Immediately jumping to drawing boxes (e.g. "We put Kafka and Redis here") without establishing traffic volumes or failure models.'
        ]
      },
      {
        heading: 'Tier 2: High-Level Architecture & Partitioning Strategy (15–30m)',
        content: [
          'Evaluates data partitioning strategy: How are partition keys chosen? Is there risk of hot partitions under skewed user activity?',
          'Examines stateful vs. stateless boundaries: Where does consensus live? How is distributed locking avoided or bounded?',
          'Considers network topology: East-West vs. North-South ingress, ingress API gateways, and asynchronous backplane fan-out.'
        ]
      },
      {
        heading: 'Tier 3: Deep Dive into Failure Domains & Edge Cases (30–45m)',
        content: [
          'What happens when downstream dependent services experience a 3-second network stall? (Timeouts, circuit breakers, backpressure, fallback queues).',
          'Data persistence failure modes: Split-brain resolution, out-of-order message compensation, idempotency keys, and reconciliation pipelines.',
          'Security & Multi-Tenancy: Cryptographic boundary enforcement, tenant isolation, and zero-trust credential distribution.'
        ]
      },
      {
        heading: 'Tier 4: Operational Readiness, Telemetry & Evolution (45–60m)',
        content: [
          'Observability strategy: OpenTelemetry distributed tracing, structured metric aggregation, and actionable alerting vs. alert fatigue.',
          'Day-2 Operations: Schema evolution strategy (expand-and-contract), canary deployment strategy, and automated rollback triggers.',
          'Staff-level leadership signal: Articulating what NOT to build and identifying the pragmatic evolutionary path.'
        ]
      }
    ],
    markdownContent: `# Staff & Principal System Design Interview Rubric

## Purpose & Scope
This rubric evaluates candidates interviewing for Staff, Principal, and Lead Architect positions. The evaluation prioritizes systems thinking, trade-off discernment, failure-domain analysis, and operational maturity.

---

### Tier 1: Problem Scoping & Constraint Invariants (Minutes 0–15)
- **Requirements Interrogation**: Clarifies read/write throughput, p99 latency targets, storage retention, and multi-region geographic distribution.
- **Invariant Definition**: Defines strict consistency vs. eventual consistency requirements and zero-data-loss boundaries before naming tools.
- **Capacity Calculations**: Performs back-of-the-envelope capacity estimations for storage growth, network bandwidth, and IOPS requirements.
*Fail Signal*: Immediately proposing specific brand-name technologies without verifying scale constraints.

### Tier 2: Core Architecture & Data Partitioning (Minutes 15–30)
- **Partitioning Model**: Selects partition keys that avoid hot spots and support linear horizontal scalability.
- **State Boundaries**: Clearly separates stateful consensus systems from stateless compute tiers.
- **Protocol Selection**: Makes deliberate protocol choices (WebSockets, gRPC, HTTP/3, WebRTC) backed by concrete technical trade-offs.

### Tier 3: Failure Domain & Disaster Scenarios (Minutes 30–45)
- **Partial Failure Resilience**: Designs graceful degradation when downstream databases or external providers fail.
- **Concurrency & Race Conditions**: Explains how concurrent distributed writes are mediated (Actor turn-based execution, optimistic locking, or conflict-free replicated data types).
- **Idempotency & Replay**: Details idempotency key handling and message deduplication at ingress boundaries.

### Tier 4: Day-2 Operations & Observability (Minutes 45–60)
- **Distributed Telemetry**: Specifies correlation IDs, distributed trace propagation, and high-cardinality metric indexing.
- **Migration & Deployability**: Details zero-downtime database schema migrations and canary traffic shifting.
- **Pragmatic Judgment**: Justifies when simpler solutions (e.g. monolithic database + read replica) outperform microservice complexity.`
  },

  {
    id: 'sev1-incident-checklist',
    title: 'SEV-1 Production Incident Response & Triage Checklist',
    targetAudience: 'On-Call Staff Engineers & Incident Commanders',
    summary: 'A battle-tested step-by-step checklist for stabilizing high-impact production outages with zero panic and disciplined stakeholder communication.',
    sections: [
      {
        heading: 'Phase 1: Immediate Triage & Containment (0–10m)',
        content: [
          'Establish Incident Commander (IC): Declare a single authoritative Incident Commander and assign a dedicated Scribe.',
          'Isolate the Bleed: If a recent deployment occurred within the last 60 minutes, immediately trigger automated GitOps rollback.',
          'Traffic Shedding & Circuit Breaking: Enable aggressive rate-limiting or shed non-essential background worker traffic to preserve core transactional paths.'
        ]
      },
      {
        heading: 'Phase 2: Diagnosis & Telemetry Correlation (10–30m)',
        content: [
          'Correlate Metrics: Check error rates, CPU/memory saturation, connection pool exhaustion, and dependent cloud provider status pages.',
          'Distributed Tracing: Inspect p99 distributed traces for abnormally slow database queries or DNS resolution timeouts.',
          'Rule Out Hypotheses Systematically: Do not make random config changes; test one hypothesis at a time and document each step in the incident channel.'
        ]
      },
      {
        heading: 'Phase 3: Stabilization & Verification (30–60m)',
        content: [
          'Verify Recovery via Health Probes: Ensure synthetic canary health checks are green and p99 latency returns within SLO limits.',
          'Drain and Reconnect: Slowly restore connection pools or re-enable worker queues with exponential backoff to avoid secondary thundering herds.',
          'Draft Stakeholder Update: Issue clear, jargon-free executive and customer status updates with timestamped mitigation milestones.'
        ]
      },
      {
        heading: 'Phase 4: Blameless Post-Mortem & Preventative Action Items',
        content: [
          'Timeline Construction: Build a minute-by-minute timeline from audit logs and deployment manifests.',
          '5 Whys Root-Cause Analysis: Identify systemic process gaps and missing architectural invariants rather than human error.',
          'Action Item Accountability: Every preventative ticket must have a designated engineering owner, deadline, and verification test.'
        ]
      }
    ],
    markdownContent: `# SEV-1 Production Incident Response & Triage Checklist

## Role Definitions
- **Incident Commander (IC)**: Leads triage, directs investigative streams, authorizes mitigations. Does NOT write code during the incident.
- **Technical Lead / Driver**: Directs deep-dive investigations and implements containment actions.
- **Scribe**: Maintains timestamped log of observations, hypotheses, and actions in the war room.

---

### Step 1: Immediate Containment (T+0 to T+10 Minutes)
1. Confirm Incident Severity: Customer-facing degradation or data loss risk = SEV-1.
2. Freeze All Non-Emergency Deployments across the infrastructure.
3. Check Recent Commits & Deployments: If a rollout happened within 60 minutes, execute immediate rollback.
4. Enable Circuit Breakers: Shed non-essential background jobs, reporting queries, and third-party webhooks.

### Step 2: Investigation & Root Isolation (T+10 to T+30 Minutes)
1. Verify Ingress & Network: Inspect ALB/NLB HTTP 5xx rates, TLS handshake failures, and DNS resolution latency.
2. Inspect Datastore Health: Query database active connection counts, lock wait times, and IOPS throttling.
3. Isolate Pod/Node Anomalies: Review Kubernetes OOMKilled events, crash loops, and kernel dmesg logs.
4. Record Every Hypothesis: Scribe logs every theory before testing to avoid thrashing.

### Step 3: Stabilization & Safe Recovery (T+30 to T+60 Minutes)
1. Controlled Traffic Ingress: Re-enable traffic gradually to prevent cold-start saturation.
2. Validate Synthetic Canaries: Confirm end-to-end user transactions succeed in production.
3. Publish Status Communication: Send clear, transparent update to internal and external status pages.

### Step 4: Blameless Post-Mortem (Within 48 Hours)
- Produce complete timeline of alerts, actions, and resolution.
- Document: 1) What went well, 2) Where we were lucky, 3) Action items to prevent recurrence.`
  },

  {
    id: 'pr-review-standards',
    title: 'Enterprise Production PR Review & Quality Standards',
    targetAudience: 'Engineering Teams, Tech Leads & Staff Reviewers',
    summary: 'A disciplined checklist for reviewing high-concurrency microservice and distributed systems code before merging into production repositories.',
    sections: [
      {
        heading: '1. Concurrency, Race Conditions & Distributed State',
        content: [
          'Are database queries protected against deadlocks under simultaneous concurrent execution?',
          'Are background thread pools bounded? (Never spawn unmanaged Task.Run or bare goroutines without rate limiting).',
          'Does code handle duplicate message delivery? Every message consumer must be explicitly idempotent.'
        ]
      },
      {
        heading: '2. Network Boundaries & Failure Domains',
        content: [
          'Are timeouts explicitly configured on all outgoing HTTP, gRPC, and database calls? (Default infinite timeouts are strictly forbidden).',
          'Is circuit breaking or exponential backoff with jitter applied to all external dependency calls?',
          'Does downstream failure bubble up as structured domain errors rather than unhandled raw exception stack traces?'
        ]
      },
      {
        heading: '3. Data Evolution & Backward Compatibility',
        content: [
          'Does this change require a database schema migration? If so, is it backward-compatible with currently running pod versions (expand-and-contract)?',
          'Are JSON / Protobuf serializations backward-compatible? Can old instances safely read payloads serialized by new instances during rolling deploys?'
        ]
      },
      {
        heading: '4. Telemetry, Security & Supply-Chain Hygiene',
        content: [
          'Does every newly introduced log statement sanitize user PII, passwords, and authorization tokens?',
          'Does every critical business operation emit high-cardinality structured metrics with correlation IDs?',
          'Were any new external dependencies added? Has the dependency been vetted for maintenance health, licensing, and vulnerability advisories?'
        ]
      }
    ],
    markdownContent: `# Enterprise Production PR Review & Quality Standards

## Guiding Rule
Code review is an architectural verification gate, not a syntax check. Linters enforce style; reviewers enforce boundary reliability, failure resilience, and backward compatibility.

---

### 1. Concurrency & State Invariants
- [ ] **No Unbounded Concurrency**: Thread pools, background tasks, and channels must have explicit size limits.
- [ ] **Idempotent Consumers**: Every Kafka / message consumer must tolerate at-least-once message delivery without state corruption.
- [ ] **Locking Avoidance**: No distributed Redis locks on hot write paths; prefer actor turns or atomic database operations.

### 2. Network & Boundary Resilience
- [ ] **Explicit Timeouts**: Every HTTP/gRPC/DB client must define explicit connect and read timeouts (never default infinite).
- [ ] **Retry Policies**: Retries must implement exponential backoff with randomized jitter to prevent thundering herds.
- [ ] **Graceful Degradation**: Clear fallback path when downstream dependencies fail or time out.

### 3. Data & Schema Evolution
- [ ] **Dual-Phase Migration**: New columns or fields must be nullable/optional to support rolling deployments where v1 and v2 coexist.
- [ ] **No Breaking Serialization**: Protobuf tag numbers and JSON contract schemas must preserve backward compatibility.

### 4. Observability & Security
- [ ] **Zero PII in Logs**: Tokens, passwords, and sensitive identifiers must never be logged.
- [ ] **Structured Telemetry**: Operations emit structured JSON events with standardized correlation IDs for distributed tracing.
- [ ] **Zero Unvetted Packages**: Any newly added package must have a documented business justification and clean security audit.`
  }
];
