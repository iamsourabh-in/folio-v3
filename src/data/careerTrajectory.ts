import { CareerRole } from '../types';

export const CAREER_TRAJECTORY: CareerRole[] = [
  {
    period: 'May 2024 – Present',
    title: 'Chief Systems Engineer / Tech Lead',
    organizationAnonymized: 'Global Consumer-Electronics & Software R&D Institute',
    organizationRaw: 'Samsung Research Institute',
    category: 'Current Leadership',
    summary: 'Spearheading hyper-scale distributed systems, multi-region real-time media meshes, and production agentic AI architectures.',
    bullets: [
      'Architected in-house Memory-as-a-Service for multi-agent workflows, featuring hybrid persistence (Knowledge Graph + Temporal memory), RBAC access controls, and active memory defense mechanisms.',
      'Engineered agent execution runtimes using OpenClaw and Hermes frameworks, optimizing dynamic context engineering, agent state management, and tool integration.',
      'Benchmarked local LLM inference via Ollama; built autonomous prototype agents integrated with local system tools, file environments, and the Model Context Protocol (MCP).',
      'Spearheaded end-to-end architecture of a multi-region real-time communication platform supporting 1,000,000+ active concurrent users with zero distributed lock contention (Microsoft Orleans & .NET Core).',
      'Developed custom LiveKit orchestration services in Go, validating and deploying containerized LiveKit Agents on Kubernetes (EKS) for low-latency WebRTC media routing (<45ms).',
      'Engineered automated multi-region GitOps infrastructure with Terraform, GitHub Actions, and ArgoCD, eliminating manual provisioning overhead and configuration drift.',
      'Honored with the "Incredible Title Award" (2 Quarters) for exceptional engineering delivery on mission-critical real-time systems.'
    ],
    tags: [
      'Agentic AI',
      'Memory-as-a-Service',
      'MCP',
      'Ollama',
      'Hermes / OpenClaw',
      'Microsoft Orleans',
      'Golang',
      'LiveKit WebRTC',
      '.NET Core',
      'Kubernetes EKS',
      'ArgoCD',
      'Terraform'
    ]
  },
  {
    period: 'April 2021 – May 2024 (3 yrs 2 mos)',
    title: 'Lead Platform Engineer / Senior Consultant',
    organizationAnonymized: 'Global Financial Information & Credit Analytics Bureau',
    organizationRaw: 'TransUnion & Saksoft Ltd.',
    category: 'Enterprise Modernization',
    summary: 'Led enterprise cloud migration to AWS EKS with Flux v2 GitOps, HashiCorp Vault dynamic secret governance, and modular Terraform infrastructure.',
    bullets: [
      'Orchestrated enterprise migration to AWS EKS using Flux v2 GitOps and HashiCorp Vault for dynamic secret governance, slashing deployment rollbacks by 90%.',
      'Authored modular Terraform IaC blueprints adopted by 10+ cross-functional teams, cutting cloud infrastructure spin-up time by 80% (from 3 days to <4 hours).',
      'Architected enterprise OIDC/OAuth2 authentication microservices and shared NuGet libraries, standardizing secure identity federation across regulated financial systems.',
      'Built mission-critical REST APIs in .NET Core 6 adhering to CQRS, SOLID principles, and Clean Architecture for high-maintainability financial services.'
    ],
    tags: [
      'AWS EKS',
      'Flux v2',
      'Terraform',
      'HashiCorp Vault',
      'Istio Mesh',
      '.NET Core 6',
      'OAuth2 / OIDC',
      'CQRS',
      'Clean Architecture'
    ]
  },
  {
    period: 'April 2016 – April 2021 (5 yrs)',
    title: 'Senior Associate IT (Tech Lead)',
    organizationAnonymized: 'Enterprise Healthcare Systems & Medical Interoperability Provider',
    organizationRaw: 'Daffodil Software Ltd.',
    category: 'Healthcare Cloud Architecture',
    summary: 'Architected serverless healthcare platforms on AWS and engineered custom FHIR servers maintaining 99.99% SLA.',
    bullets: [
      'Modernized legacy monolithic services to .NET Core, boosting overall throughput and reducing ongoing maintenance overhead by 50%.',
      'Architected serverless AWS solutions (Lambda, API Gateway, S3, Cognito, CloudWatch), achieving 99.99% uptime SLA for mission-critical electronic health record (EHR) platforms.',
      'Engineered custom FHIR-compliant API servers, ensuring strict HIPAA healthcare data interoperability and regulatory compliance.',
      'Received Innovation Award (Q2 2018) for developing an enterprise AI chatbot with Dialogflow, alongside Project of the Year and Process Oriented Award (2017, 2018).'
    ],
    tags: [
      'AWS Lambda',
      'AWS Cognito',
      'API Gateway',
      'HL7 FHIR',
      'HIPAA Compliance',
      '.NET Core',
      'Docker',
      'CloudWatch',
      'Dialogflow AI'
    ]
  },
  {
    period: 'August 2013 – March 2016 (2 yrs 7 mos)',
    title: 'Software Developer / Web Engineer',
    organizationAnonymized: 'National Travel & Flight Booking Aggregator',
    organizationRaw: 'Inventra Technologies & EaseMyTrip',
    category: 'Foundational Scale',
    summary: 'Built high-volume B2B travel booking engines and optimized database throughput for 100,000+ monthly transactions.',
    bullets: [
      'Built high-volume B2B travel booking engines (MongoDB, SQL Server, WCF), supporting 100,000+ monthly transactions and driving a 20% increase in active user engagement.',
      'Tuned complex SQL queries, stored procedures, and schema indexing, reducing database query execution latency by 40–50%.',
      'Integrated third-party airline reservation APIs (Amadeus, Air Costa) into automated booking and ticketing workflows.',
      'Honored as "Employee of the Year" (2015) for high-impact contributions to core booking infrastructure.'
    ],
    tags: [
      'C#',
      'ASP.NET',
      'MongoDB',
      'SQL Server',
      'Amadeus Flight API',
      'Air Costa API',
      'WCF',
      'High-Volume Travel'
    ]
  }
];
