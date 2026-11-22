---
description: Enforce Phase 0 and Make It Feel Human-Made priority over generic design skills
trigger: always_on
---

# Human-Made Design Principles & Aesthetic Precedence Rule

> **CRITICAL PRECEDENCE INSTRUCTION:**
> **Phase 0, "Make It Feel Human-Made", and the Banned List have ABSOLUTE TOP PRIORITY over any generic design skills (including `frontend-design`, default component kits, boilerplate UI skills, or template patterns). Whenever any skill, pattern, or default library recommendation conflicts with this document, Phase 0 and the Banned List WIN unconditionally.**

## 1. Absolute Priority Order
1. **Top Priority**: **Phase 0 & "Make It Feel Human-Made" Guidelines** (Art direction, intentionality, bespoke craftsmanship).
2. **Top Priority**: **The Banned List** (Explicitly prohibited AI clichés and templated defaults).
3. **Subordinate Priority**: **Technical 3D & Motion Skills** (`threejs-*`, `3d-web-experience`, `ai-ui-ux-motion-engine`, `gsap`, etc.) — used strictly as deterministic technical implementation tools to fulfill the human-made vision.
4. **Lowest / Filtered Priority**: **Generic Design Skills** (`frontend-design`, UI presets) — any generic defaults, cookie-cutter templates, or AI layout styles from these skills are strictly superseded by Phase 0 and the Banned List.

## 2. Phase 0: Intentional Art Direction & Concept (Before Any Code)
Before writing any code or components:
1. **Commit to a Distinct Point of View**:
   - Establish the project's unique conceptual thesis, aesthetic world, and emotional resonance.
   - Do NOT start from a generic layout kit or UI template.
2. **Bespoke Palette & Typographic Identity**:
   - Define a custom 4–6 color palette specifically calibrated to the project's emotional tone.
   - Avoid generic AI color formulas (see Banned List).
   - Pair typefaces with intentional optical weights, contrast, and distinct roles.
3. **One Signature Focal Experience**:
   - Every great build has one unforgettable authored moment (e.g., scroll-driven 3D camera flight, interactive WebGL world, tactile shader interaction).
   - Keep surrounding UI quiet, disciplined, and functional to give the signature moment room to breathe.
4. **Ground in Real Context**:
   - Write genuine, context-specific copy; avoid filler buzzwords and synthetic corporate jargon.

## 3. Make It Feel Human-Made
Human-crafted digital experiences possess intentionality, rhythm, asymmetry, and restraint:
- **Asymmetry and Organic Rhythm**: Avoid repetitive equal-sized grid boxes. Vary visual weight, section cadence, and spatial pacing.
- **Purposeful Motion & Spatial Depth**:
  - Motion must feel physical and responsive to human touch or scroll, not arbitrary decorative noise.
  - Camera transitions and scroll flights should feel authored with natural inertia and damping.
  - Always respect `prefers-reduced-motion` and provide immediate, complete fallback states.
- **Physicality and Tactile Detail**:
  - High-fidelity materials, subtle depth, real-time lighting cues, and micro-interactions that confirm user action.
  - Every visual element must justify its presence.

## 4. The Banned List (Strictly Prohibited AI & Template Defaults)
NEVER produce or default to any of the following tells:
- ❌ **The SaaS-Card Kit**: Chopping every section into identical rounded cards with identical border-radii and soft grey `rgba(0,0,0,0.1)` drop shadows.
- ❌ **The Claude / AI Slop Palette**:
  - Default warm cream backgrounds (`#F4F1EA`, `#FAF8F5`) paired with high-contrast serif headlines and terracotta/warm-clay accents (`#D97757`).
  - Default near-black `#0B0B0B` / `#111111` with a single cliché acid-green, neon cyan, or vermilion accent.
- ❌ **Template Eyebrows & Chrome**:
  - Tracked-out ALL-CAPS uppercase eyebrow labels above every heading (`COMPANY OVERVIEW`).
  - Meta strings joined by middle dots (`FEATURE · SPEED · SECURITY`).
  - Em-dash label fragments (`OVERVIEW — system status`).
  - Decorative numbered markers (`01 / 02 / 03`) on non-sequential content.
  - Adding generic arrows (`→`) to every button and link.
- ❌ **Unmotivated Animations**:
  - Generic fade-and-slide-up entrances on every single card and section.
  - Arbitrary hover transitions that don't convey state change.
- ❌ **Decorative Clutter**:
  - Ornamental bento grids crammed with irrelevant widgets.
  - Glassmorphism / backdrop-blur slapped everywhere without lighting motivation.
  - Floating gradient blobs and random mesh gradients serving as background filler.
  - Fake metric counters, fabricated customer testimonial walls, and synthetic logo ticker bars.
