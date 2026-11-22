import { OpenSourceArtifact } from '../types';

export const OPEN_SOURCE_ARTIFACTS: OpenSourceArtifact[] = [
  {
    name: 'ngx-txt-img',
    platform: 'npm registry',
    metric: '28,500+ Total Downloads',
    description: 'Lightweight canvas-based text-to-avatar placeholder generator with absolute zero external runtime dependencies.',
    architectureHighlights: [
      'Pure native HTML5 Canvas 2D rendering with zero transitive dependencies',
      'Deterministic string hashing for consistent, stable avatar color generation across user sessions',
      'Ultra-compact < 12KB bundle footprint ensuring 100/100 Lighthouse performance metrics',
      'Battle-tested in enterprise production applications across thousands of daily sessions'
    ],
    link: 'https://www.npmjs.com/package/ngx-txt-img',
    linkLabel: 'Inspect Package on npm'
  },
  {
    name: 'orleans-kafka-stream-bridge',
    platform: 'GitHub / OSS',
    metric: 'Production Used',
    description: 'High-throughput stream provider connector bridging Microsoft Orleans Virtual Actors with Apache Kafka partitions.',
    architectureHighlights: [
      'Strict grain-key partition affinity mapping actor IDs deterministically to Kafka topic partitions',
      'Zero-allocation memory buffer pooling during high-velocity message serialization passes',
      'Automatic batching and backpressure throttling to prevent silo memory exhaustion under heavy ingress',
      'Production proven in multi-region classroom message streaming infrastructure'
    ],
    link: 'https://github.com/iamsourabh-in',
    linkLabel: 'Inspect Repository on GitHub'
  },
  {
    name: 'reusable-k8s-gitops-modules',
    platform: 'Terraform Registry / GitHub',
    metric: 'Adopted by 10+ Teams',
    description: 'Hardened Terraform modules for AWS EKS provisioning with Flux v2 GitOps and HashiCorp Vault integration.',
    architectureHighlights: [
      'Automated bootstrapping of in-cluster Flux v2 GitOps controllers with read-only deploy keys',
      'Integrated Istio service mesh configuration with default STRICT mTLS enforcement',
      'Pre-configured HashiCorp Vault CSI driver hooks for zero-touch dynamic secret injection',
      'Adopted across 10+ enterprise financial squads, reducing cloud infrastructure rollout time by 80%'
    ],
    link: 'https://github.com/iamsourabh-in',
    linkLabel: 'Inspect Modules on GitHub'
  }
];

export const SIDE_PRODUCTS = [
  {
    name: 'MailZero',
    tagline: 'High-Performance Zero-Bloat Gmail Management',
    description: 'Clean, full-stack email triage and productivity application architected for instant keyboard-driven search and offline resilience.',
    stack: ['TypeScript', 'React', 'Tailwind', 'OAuth2', 'Web Workers', 'IndexedDB']
  },
  {
    name: 'Meridian',
    tagline: 'Global Interactive Social Graph Engine',
    description: 'Real-time geographic social connectivity visualization rendering tens of thousands of distributed connection nodes and geodesic arcs at 60 FPS.',
    stack: ['WebGL', 'Instanced Geometry', 'Three.js', 'WebSockets', 'Go Microservices']
  }
];
