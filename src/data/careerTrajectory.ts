import { CareerRole } from '../types';

export const CAREER_TRAJECTORY: CareerRole[] = [
  {
    period: 'May 2024 – Present',
    title: 'Chief Engineer',
    organizationAnonymized: 'Global Consumer-Electronics & Software R&D Institute',
    organizationRaw: 'Samsung R&D Institute India',
    category: 'Current Leadership',
    summary: 'Leading distributed systems architecture and real-time infrastructure engineering for multi-region classroom and collaboration platforms across multi-cloud environments.',
    bullets: [
      'Architected and deployed a distributed chat and state engine using .NET Core and Microsoft Orleans, supporting 1,000,000+ active concurrent users with zero distributed locking.',
      'Integrated Apache Kafka for streaming and event-driven architecture, ensuring high-throughput, fault-tolerant message ordering between 10+ core microservices.',
      'Designed and implemented custom LiveKit Manager service in Golang to orchestrate WebRTC media servers powering low-latency video/audio classroom interactions.',
      'Constructed end-to-end multi-region GitOps deployment pipelines using Terraform, GitHub Actions, and ArgoCD on AWS/Azure Kubernetes (EKS/AKS).',
      'Implemented FoundationDB as an ultra-scalable transactional data store for chat metadata with zero data loss during offline queueing.',
      'Spearheaded confidential computing workload deployments and AI/MLOps pipelines in Azure.',
      'Mentored senior engineering staff, established architectural standards, and chaired technical hiring panels.'
    ],
    tags: ['Microsoft Orleans', 'Golang', '.NET Core', 'LiveKit WebRTC', 'Apache Kafka', 'FoundationDB', 'Kubernetes EKS', 'ArgoCD', 'Terraform', 'Azure MLOps']
  },
  {
    period: 'May 2023 – May 2024',
    title: 'Lead Engineer / Senior Consultant',
    organizationAnonymized: 'Global Financial Information & Credit Analytics Bureau',
    organizationRaw: 'TransUnion',
    category: 'Enterprise Modernization',
    summary: 'Drove cloud migration, Kubernetes containerization, and GitOps automation for mission-critical financial information services.',
    bullets: [
      'Devised and executed the Kubernetes (EKS) migration strategy incorporating Istio service mesh and Flux v2 GitOps, reducing deployment rollbacks by 90%.',
      'Authored reusable Terraform modules adopted by 10+ cross-functional teams, reducing cloud infrastructure provisioning time by 80%.',
      'Built secure, enterprise-grade OAuth2 and OpenID Connect (OIDC) authentication NuGet packages and REST APIs in .NET Core 6 using CQRS and Clean Architecture.',
      'Architected HashiCorp Vault dynamic secret governance, establishing automated credential rotation across high-compliance banking services.'
    ],
    tags: ['AWS EKS', 'Flux v2', 'Terraform', 'HashiCorp Vault', 'Istio', '.NET Core 6', 'OAuth2 / OIDC', 'CQRS', 'Azure DevOps']
  },
  {
    period: 'Apr 2021 – May 2023',
    title: 'Lead Consultant',
    organizationAnonymized: 'International Digital Enterprise Consultancy',
    organizationRaw: 'Saksoft Ltd.',
    category: 'Cloud Architecture',
    summary: 'Engineered high-security authorization engines and microservices for international enterprise clients.',
    bullets: [
      'Engineered centralized OAuth2 and OpenID Connect authentication frameworks packaged as enterprise NuGet modules.',
      'Developed scalable REST APIs adhering strictly to SOLID, Clean Architecture, Dependency Injection, and CQRS patterns.',
      'Configured HashiCorp Vault secret integration and customized auth workflows to meet stringent financial compliance regulations.'
    ],
    tags: ['.NET Core', 'C#', 'HashiCorp Vault', 'OAuth2', 'OIDC', 'Microservices', 'SQL Server']
  },
  {
    period: 'Apr 2016 – Apr 2021 (5 Years)',
    title: 'Senior Associate IT',
    organizationAnonymized: 'Enterprise Healthcare Systems & Medical Interoperability Provider',
    organizationRaw: 'Daffodil Software Ltd.',
    category: 'Award Winner (Project of Year)',
    summary: 'Designed serverless healthcare platforms and microservice architectures handling 10,000+ concurrent requests.',
    bullets: [
      'Designed and implemented serverless healthcare architecture using AWS Lambda, Cognito, API Gateway, CloudWatch, and S3, maintaining 99.99% SLA.',
      'Built custom FHIR (Fast Healthcare Interoperability Resources) servers compliant with strict healthcare regulatory standards.',
      'Migrated enterprise standalone services to modern .NET Core, delivering a 40% performance improvement and 50% reduction in maintenance overhead.',
      'Awarded \'Project of the Year\' (2017) and \'Process Oriented Award\' (2018) for outstanding engineering standards and CI/CD automation.'
    ],
    tags: ['AWS Lambda', 'AWS Cognito', 'API Gateway', 'HL7 FHIR', '.NET Core', 'Docker', 'AWS S3', 'CloudWatch']
  },
  {
    period: 'Aug 2013 – Mar 2016',
    title: 'Software Developer & Web Engineer',
    organizationAnonymized: 'National Travel & Flight Booking Aggregator',
    organizationRaw: 'Inventra Technologies & EaseMyTrip',
    category: 'Foundational Scale',
    summary: 'Developed high-traffic B2B/B2C travel booking engines and optimized database throughput for 100,000+ concurrent users.',
    bullets: [
      'Developed B2B travel booking engine integrated with Amadeus and white-label flight APIs, boosting conversion rates by 20%.',
      'Architected MongoDB document schemas across 100+ collections and tuned SQL queries/stored procedures, decreasing data retrieval latency by 40-50%.',
      'Honored as \'Employee of the Year\' (2015) at Inventra Technologies.'
    ],
    tags: ['C#', 'ASP.NET', 'MongoDB', 'SQL Server', 'Amadeus API', 'High-Volume Travel Systems']
  }
];
