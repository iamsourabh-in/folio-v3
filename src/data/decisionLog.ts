import { DecisionLogCard } from '../types';

export const DECISION_LOG: DecisionLogCard[] = [
  {
    id: 'decision-01',
    number: '01',
    decisionTitle: 'Virtual Actor Single-Threaded Concurrency vs. Stateless APIs with Redis Locks',
    chose: 'Microsoft Orleans Virtual Actor Grains',
    over: 'Stateless .NET Web APIs backed by distributed Redis Redlock',
    because: 'Stateless services require distributed locking during concurrent state updates (like 500 students answering a live classroom poll simultaneously). Distributed locks suffer from lock contention, network timeouts, split-brain failure modes, and catastrophic thundering herd latency spikes. Orleans assigns an in-memory Grain per classroom with single-threaded turn execution: zero locks, microsecond turn processing, and automatic lifecycle management.',
    tradeoffAcknowledged: 'Requires thinking in actor messaging semantics and accepting silo memory management overhead instead of horizontal stateless pod scale.',
    tags: ['Distributed Systems', 'Actor Model', 'High Concurrency', 'Zero Locks']
  },
  {
    id: 'decision-02',
    number: '02',
    decisionTitle: 'Server-Driven Track Subscription Authority vs. Client-Side Track Request Trust',
    chose: 'Server-Side WebRTC Track Subscription Permissions via LiveKit Webhooks',
    over: 'Client-driven WebRTC SDP negotiation and client-initiated track subscription',
    because: 'In high-compliance classroom and enterprise settings, students must NEVER be able to spoof SDP offers to subscribe to another student\'s private screen track or teacher confidential video. Delegating subscription authorization to client code is a fundamental security violation. Centralizing track subscription rules inside the backend LiveKit webhook pipeline guarantees that student clients cannot receive media frames they do not have explicit cryptographic clearance to view.',
    tradeoffAcknowledged: 'Introduces a backend authorization webhook check on every media track publication and subscription request.',
    tags: ['WebRTC', 'Media Security', 'LiveKit', 'Zero-Trust']
  },
  {
    id: 'decision-03',
    number: '03',
    decisionTitle: 'Group Room as Sole Coordination Substrate vs. Direct Agent-to-Agent Sockets',
    chose: 'A unified Group Room substrate for human-agent collaboration',
    over: 'Direct hidden point-to-point sockets between autonomous AI agents',
    because: 'Direct agent-to-agent communication creates unobservable "dark channels" where agents hallucinate invalid state transitions, enter infinite debate loops, and hide tool execution logs from human engineers. By forcing all agent communications through public group rooms with explicit task ownership, every tool execution, handoff, and output is immediately observable, auditable, and interruptible by human leads.',
    tradeoffAcknowledged: 'Higher socket event fan-out overhead compared to isolated point-to-point TCP sockets.',
    tags: ['AI Agents', 'Multi-Agent Systems', 'Observability', 'Auditability']
  },
  {
    id: 'decision-04',
    number: '04',
    decisionTitle: 'Cryptographic Hash-Chained Audit Ledger vs. Append-Only Plain Log Tables',
    chose: 'SHA-256 Hash-Chained Memory Blocks on PostgreSQL',
    over: 'Standard append-only relational audit log rows or MongoDB collections',
    because: 'Plain database log tables can be quietly altered or deleted by anyone with elevated database credentials or during an unauthorized database snapshot restoration. Hash-chaining each memory block (linking Block_N hash to Block_N-1) produces a tamper-evident cryptographic Merkle ledger. Any modification to a past interaction immediately invalidates all subsequent block signatures, providing unimpeachable audit proof.',
    tradeoffAcknowledged: 'Requires sequential block hash calculation during writes and verification passes during integrity audits.',
    tags: ['Cryptography', 'Data Integrity', 'Audit Trails', 'PostgreSQL']
  },
  {
    id: 'decision-05',
    number: '05',
    decisionTitle: 'Pull-Based GitOps via Flux v2 vs. Push-Based CI/CD Deployments',
    chose: 'In-cluster Flux v2 GitOps reconciler',
    over: 'Push-based CI/CD pipelines (Jenkins / GitLab CI runners with cluster admin kubeconfig)',
    because: 'Push-based CI/CD systems require storing cluster-admin kubeconfig credentials in external CI systems, creating a catastrophic supply-chain attack vector. Flux v2 operates entirely inside the Kubernetes cluster, pulling from cryptographically signed Git commits via read-only SSH keys. Git remains the absolute single source of truth, and unauthorized in-cluster drift is automatically overwritten within 60 seconds.',
    tradeoffAcknowledged: 'Debugging failed reconciliations requires querying in-cluster CRDs rather than reading a unified CI runner stdout log.',
    tags: ['Kubernetes', 'GitOps', 'Flux v2', 'Platform Security']
  },
  {
    id: 'decision-06',
    number: '06',
    decisionTitle: 'FoundationDB for Distributed Chat Metadata vs. Apache Cassandra',
    chose: 'FoundationDB with strict serializable ACID transactions',
    over: 'Apache Cassandra with eventual consistency and lightweight transactions (LWT)',
    because: 'Classroom chat and participant presence require atomic multi-key operations (e.g. updating student status, decrementing available seats, and appending message sequence markers simultaneously). Cassandra\'s eventual consistency leads to phantom participant counts and out-of-order message receipts during network splits. FoundationDB provides strict serializability across multiple keys with deterministic failure guarantees and rock-solid transactional integrity.',
    tradeoffAcknowledged: 'FoundationDB limits individual transactions to 5 seconds and maximum 10MB payloads, requiring strict operational discipline.',
    tags: ['Databases', 'ACID Transactions', 'FoundationDB', 'State Consistency']
  },
  {
    id: 'decision-07',
    number: '07',
    decisionTitle: 'Self-Hosted LiveKit on Kubernetes Host Networking vs. Cloud Managed WebRTC',
    chose: 'Self-hosted LiveKit instances with Kubernetes host networking and custom TURN routing',
    over: 'Commercial managed cloud WebRTC services (Twilio, Agora)',
    because: 'At 1,000,000+ active concurrent user scale, commercial WebRTC per-minute per-subscriber bandwidth fees become prohibitively expensive. Self-hosting LiveKit on AWS/Azure Kubernetes using host-networking pods, direct external IP advertising, and custom UDP mux port ranges cut bandwidth operating expenses by over 65% while keeping all classroom media within strict sovereign data boundaries.',
    tradeoffAcknowledged: 'Requires in-house mastery of ICE/STUN/TURN topologies, eBPF packet tracing, MTU tuning, and NAT traversal edge cases.',
    tags: ['WebRTC', 'LiveKit', 'Cost Optimization', 'Kubernetes Networking']
  },
  {
    id: 'decision-08',
    number: '08',
    decisionTitle: 'Zero-Bloat Native Canvas Avatar Generator vs. Heavy Third-Party Libraries',
    chose: 'Pure HTML5 Canvas 2D with zero external dependencies (`ngx-txt-img`)',
    over: 'Importing heavy third-party SVG / avatar libraries (Avatars, DiceBear)',
    because: 'Every third-party npm package is a potential supply-chain vulnerability vector and adds to client bundle download overhead. A canvas placeholder generator requires nothing more than the browser\'s native Canvas 2D API, deterministic string hashing, and mathematical color distribution. Building it with zero external dependencies achieved 28,500+ downloads with 0 security advisories and a sub-12KB bundle size.',
    tradeoffAcknowledged: 'Requires writing custom font measurement and multi-line canvas wrapping algorithms rather than relying on pre-built CSS layouts.',
    tags: ['Zero-Bloat', 'Performance', 'Web APIs', 'Open Source']
  },
  {
    id: 'decision-09',
    number: '09',
    decisionTitle: 'Stateless Global Geolocation DNS Routing vs. Centralized Monolithic Ingress',
    chose: 'Multi-region stateless API routing with geolocation DNS and Redis-first organization lookup',
    over: 'Single-region global API ingress routing backhaul traffic over public internet',
    because: 'Users joining classrooms across Europe, Asia, and the Americas cannot tolerate 400ms intercontinental backhaul round-trips for real-time SignalR command traffic. By deploying regional API tiers with local Redis replicas and routing traffic via latency-based DNS, connection handshakes occur at the nearest regional edge within 25ms, while global organization metadata is synchronized asynchronously in the background.',
    tradeoffAcknowledged: 'Requires handling multi-region replication lag and cross-region session displacement when a user roams between networks.',
    tags: ['Multi-Region', 'Global Routing', 'Edge Architecture', 'Low Latency']
  },
  {
    id: 'decision-10',
    number: '10',
    decisionTitle: 'HashiCorp Vault Dynamic Ephemeral Credentials vs. Sealed Secrets in Git',
    chose: 'HashiCorp Vault AppRole with dynamic 1-hour ephemeral database credentials',
    over: 'Sealed Secrets or encrypted SOPS files committed to Git repositories',
    because: 'Sealed secrets still represent static credentials that live indefinitely until a human decides to rotate them. If a production database user password is leaked through application logs or memory dumps, static credentials remain vulnerable indefinitely. Vault dynamic database engines generate unique, short-lived database users on the fly with a 1-hour TTL, revoking the user automatically when the lease expires.',
    tradeoffAcknowledged: 'Applications must implement graceful connection pool cycling to swap database credentials without dropping in-flight user queries.',
    tags: ['Security', 'Zero-Trust', 'HashiCorp Vault', 'Credential Governance']
  }
];
