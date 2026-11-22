# Sourabh Rustagi — Lead Engineer & Distributed Systems Architect

> **Live Deployment:** [https://iamsourabh-in.github.io/folio-v3/](https://iamsourabh-in.github.io/folio-v3/)  
> **Target Audience:** Hiring managers, CTOs, and Staff/Principal Engineering committees evaluating distributed systems leadership, real-time infrastructure, and architectural decision-making.

---

## 3D Cosmic Flight Simulator & Systems Architecture Portfolio

![Sourabh Rustagi — 3D Cosmic Flight Simulator](./public/screenshot-3d.png)

A dual-mode systems engineering portfolio engineered with zero bloat:
1. **Spaceship Cosmic Flight Simulator (3D Mode):** Pilot an aerospace scout ship through an authored 7-sector galactic corridor with hexagonal space gates, procedural PBR planet surfaces, Rayleigh atmospheric scattering, and GPU-instanced asteroid belts. Clear each sector sequentially with milestone achievements and warp triggers, culminating in the **Grand Finale Architect Dossier**.
2. **Executive Skim Mode (2D Mode):** A clean, high-contrast editorial architecture dossier readable in under 60 seconds with 100% technical substance, zero fluff, and an initial bundle under **87 kB gzip**.

---

## Key Architectural Proofs & Case Studies

| Chapter | Planetary Destination | Core Challenge & Architecture | Measurable Outcome |
| :--- | :--- | :--- | :--- |
| **Ch 01** | **Ingress-Prime** | B2B Travel Search Aggregator & Database Throughput | 100k+ concurrent users, 45% DB latency reduction |
| **Ch 02** | **Crypt-FHIR** | Serverless Healthcare & HIPAA Interoperability | 99.99% SLA, 10k req/s, zero compliance breaches |
| **Ch 03** | **Vault-9** | Dynamic Secret Governance & Automated Rotation | 100% credential rotation, zero hardcoded secrets |
| **Ch 04** | **GitOps-Gateway** | Financial Kubernetes (EKS), Istio Mesh & Flux v2 | 90% deployment rollback reduction across 10+ teams |
| **Ch 05 ★** | **Orleans-Prime (Flagship)** | Distributed Virtual Actors & LiveKit WebRTC Core | **1,000,000+ active concurrent users** with 0 distributed locks |
| **Ch 06** | **Nexus-Agentis** | Autonomous Multi-Agent Consensus & Memory Ledger | Multi-model round-table with transactional ledger |
| **Ch 07** | **Terminus-Zero** | Zero-Bloat Open Source & Maintainer Culture | 28,500+ downloads (`ngx-txt-img`), zero runtime bloat |

---

## 3D Spaceship Flight Mechanics & Mission Progression

- **Authored Narrative Flow:** 7 sequential sectors connected by hexagonal guidance gates. Approaching each planet automatically clears the sector, awards achievements, and displays a prominent **"WARP TO NEXT SECTOR →"** guidance prompt.
- **Grand Finale Modal:** Reaching the final sector (Terminus-Zero) triggers a mission accomplishment modal featuring verified 13+ year architectural metrics, 1-click interview scheduling, and instant access to the full 2D resume.
- **Real-Time Flight Engine:** Delta-wing aerospace scout with dual ion propulsion engines, dynamic roll/banking physics, and camera inertia follow.
- **Desktop & Mobile Controls:**
  - `Mouse` or `Touch Drag`: Steer spaceship pitch and yaw through 3D space with zero state lag.
  - `W` / `Shift` / `Space` / `[⚡ BOOST]`: Fire warp afterburners (increases speed, flares thruster plasma, expands camera FOV).
  - `A` / `D` or `[◄] [►]`: Bank and roll wings.
  - `F` / Reticle Click: Toggle Planetary Codex scanner.
- **Quantum Autopilot:** Bottom HUD scrubber with clear completion checkmarks (`✓`) and 1-click warp navigation to any of the 7 planets.
- **Photorealistic PBR Visuals:** Procedural canvas-based 1024x512 PBR textures, atmospheric limb glow, GPU-instanced tumbling asteroid belts, and ACES Filmic tone mapping.
- **Native Web Audio:** Zero-dependency procedural Web Audio API synthesizer for warp whooshes, radar target locks, and achievement fanfare.
- **Instant Skim Exit:** 1-click button to exit 3D flight and return to the 2D technical dossier at any time.

---

## Technology Stack

- **Frontend Core:** React 18, TypeScript, Tailwind CSS, Vite
- **3D Graphics & Shaders:** Three.js, React Three Fiber (`@react-three/fiber`), React Three Drei (`@react-three/drei`)
- **Audio Synthesizer:** Native Web Audio API (zero external runtime dependencies)
- **Icons & Telemetry:** Lucide React
- **CI/CD & Hosting:** GitHub Actions (`actions/deploy-pages@v4`) deploying to GitHub Pages

---

## Getting Started Locally

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
# Clone the repository
git clone https://github.com/iamsourabh-in/folio-v3.git
cd folio-v3

# Install dependencies
npm ci

# Start local development server
npm run dev
```

### Production Build & Preview
```bash
# Compile TypeScript and bundle with Vite
npm run build

# Preview production build locally on http://localhost:4173/
npm run preview
```

---

## License

MIT License © 2026 [Sourabh Rustagi](https://github.com/iamsourabh-in).
