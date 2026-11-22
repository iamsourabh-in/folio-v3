import * as THREE from 'three';

// Procedural Canvas-based High-Res Planetary Textures (Zero external image dependencies)
class ProceduralPlanetTextures {
  private cache: Map<string, THREE.CanvasTexture> = new Map();

  // Helper to create a 1024x512 canvas
  private createCanvas(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    return { canvas, ctx };
  }

  // Planet 01: Ingress-Prime (Warm molten gold & continental fissures)
  public getPlanet01Texture(): THREE.CanvasTexture {
    if (this.cache.has('p1')) return this.cache.get('p1')!;
    const { canvas, ctx } = this.createCanvas();

    // Base magma background
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#451a03');
    grad.addColorStop(0.5, '#78350f');
    grad.addColorStop(1, '#2d1102');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Continental landmasses & glowing amber data veins
    ctx.fillStyle = '#b45309';
    for (let i = 0; i < 45; i++) {
      const cx = (i * 87) % 1024;
      const cy = (i * 53) % 512;
      const r = 40 + (i * 7) % 80;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glowing golden fissure veins
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      let x = (i * 123) % 1024;
      let y = (i * 97) % 512;
      ctx.moveTo(x, y);
      for (let j = 0; j < 6; j++) {
        x += (Math.sin(i + j) * 80);
        y += (Math.cos(i + j) * 60);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    this.cache.set('p1', tex);
    return tex;
  }

  // Planet 02: Crypt-FHIR (Icy cyan/teal oceans & frosty polar vortex)
  public getPlanet02Texture(): THREE.CanvasTexture {
    if (this.cache.has('p2')) return this.cache.get('p2')!;
    const { canvas, ctx } = this.createCanvas();

    // Deep oceanic teal base
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#0f766e');
    grad.addColorStop(0.5, '#115e59');
    grad.addColorStop(1, '#042f2e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Crystalline continental ice shelves
    ctx.fillStyle = '#2dd4bf';
    for (let i = 0; i < 35; i++) {
      const cx = (i * 95) % 1024;
      const cy = 60 + (i * 45) % 390;
      const r = 35 + (i * 9) % 70;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Polar caps & atmospheric frost bands
    ctx.fillStyle = 'rgba(240, 253, 250, 0.45)';
    ctx.fillRect(0, 0, 1024, 60);
    ctx.fillRect(0, 452, 1024, 60);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    this.cache.set('p2', tex);
    return tex;
  }

  // Planet 03: Vault-9 (Obsidian basalt with metallic circuit grooves)
  public getPlanet03Texture(): THREE.CanvasTexture {
    if (this.cache.has('p3')) return this.cache.get('p3')!;
    const { canvas, ctx } = this.createCanvas();

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 1024, 512);

    // Geometric hexagonal vault grids
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1.5;
    const size = 32;
    for (let x = 0; x < 1024; x += size * 1.5) {
      for (let y = 0; y < 512; y += size * 1.732) {
        ctx.strokeRect(x, y, size, size);
      }
    }

    // Amber vault lock indicators
    ctx.fillStyle = '#fbbf24';
    for (let i = 0; i < 30; i++) {
      ctx.fillRect((i * 137) % 1024, (i * 83) % 512, 12, 12);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    this.cache.set('p3', tex);
    return tex;
  }

  // Planet 04: GitOps-Gateway (Canary Split binary textures)
  public getPlanet04Texture(): THREE.CanvasTexture {
    if (this.cache.has('p4')) return this.cache.get('p4')!;
    const { canvas, ctx } = this.createCanvas();

    // Dual gradient (Emerald to Cyan)
    const grad = ctx.createLinearGradient(0, 0, 1024, 0);
    grad.addColorStop(0, '#064e3b');
    grad.addColorStop(0.5, '#047857');
    grad.addColorStop(1, '#0369a1');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Service mesh network traces
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2;
    for (let i = 0; i < 25; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (i * 22) % 512);
      ctx.bezierCurveTo(300, (i * 40) % 512, 700, (i * 15) % 512, 1024, (i * 30) % 512);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    this.cache.set('p4', tex);
    return tex;
  }

  // Planet 05: Orleans-Prime (FLAGSHIP ★ - Massive Jupiter-style solar gas giant with storms)
  public getPlanet05Texture(): THREE.CanvasTexture {
    if (this.cache.has('p5')) return this.cache.get('p5')!;
    const { canvas, ctx } = this.createCanvas();

    // Rich horizontal gas cloud bands
    const bands = [
      '#78350f', '#92400e', '#b45309', '#d97706', '#f59e0b',
      '#fbbf24', '#d97706', '#b45309', '#78350f', '#451a03'
    ];

    bands.forEach((color, idx) => {
      ctx.fillStyle = color;
      const y = (idx * 512) / bands.length;
      const h = 512 / bands.length + 4;
      ctx.fillRect(0, y, 1024, h);
    });

    // Great Orleans Storm Vortex (The 1M Concurrent Users Core)
    const stormGrad = ctx.createRadialGradient(640, 240, 10, 640, 240, 90);
    stormGrad.addColorStop(0, '#ffffff');
    stormGrad.addColorStop(0.3, '#fde047');
    stormGrad.addColorStop(0.7, '#ea580c');
    stormGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = stormGrad;
    ctx.beginPath();
    ctx.ellipse(640, 240, 100, 55, 0, 0, Math.PI * 2);
    ctx.fill();

    // Turbulent cloud whorls & turbulence ripples
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 3;
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (i * 31) % 512);
      ctx.bezierCurveTo(400, (i * 31 + 25) % 512, 600, (i * 31 - 25) % 512, 1024, (i * 31) % 512);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    this.cache.set('p5', tex);
    return tex;
  }

  // Planet 06: Nexus-Agentis (Indigo neural synaptic networks)
  public getPlanet06Texture(): THREE.CanvasTexture {
    if (this.cache.has('p6')) return this.cache.get('p6')!;
    const { canvas, ctx } = this.createCanvas();

    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(0, 0, 1024, 512);

    // Synaptic neural network lines
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 1.8;
    for (let i = 0; i < 35; i++) {
      const x1 = (i * 97) % 1024;
      const y1 = (i * 61) % 512;
      const x2 = ((i + 1) * 97 + 80) % 1024;
      const y2 = ((i + 1) * 61 + 50) % 512;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Synapse node dots
      ctx.fillStyle = '#c7d2fe';
      ctx.beginPath();
      ctx.arc(x1, y1, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    this.cache.set('p6', tex);
    return tex;
  }

  // Planet 07: Terminus-Zero (Pure crystalline facets)
  public getPlanet07Texture(): THREE.CanvasTexture {
    if (this.cache.has('p7')) return this.cache.get('p7')!;
    const { canvas, ctx } = this.createCanvas();

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 1024, 512);

    // Prismatic diamond light reflections
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    for (let i = 0; i < 24; i++) {
      ctx.beginPath();
      ctx.moveTo((i * 45) % 1024, 0);
      ctx.lineTo(((i * 45) + 300) % 1024, 512);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    this.cache.set('p7', tex);
    return tex;
  }
}

export const planetTextures = new ProceduralPlanetTextures();
