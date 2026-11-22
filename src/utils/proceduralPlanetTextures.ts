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

  // Planet 01: Inventra & EaseMyTrip (Vibrant molten gold, fiery amber & continental flight arteries)
  public getPlanet01Texture(): THREE.CanvasTexture {
    if (this.cache.has('p1')) return this.cache.get('p1')!;
    const { canvas, ctx } = this.createCanvas();

    // Saturated fiery magma base
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#78350f');
    grad.addColorStop(0.3, '#d97706');
    grad.addColorStop(0.7, '#b45309');
    grad.addColorStop(1, '#451a03');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Glowing golden continents
    ctx.fillStyle = '#f59e0b';
    for (let i = 0; i < 50; i++) {
      const cx = (i * 87) % 1024;
      const cy = (i * 53) % 512;
      const r = 35 + (i * 7) % 85;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // High-energy luminous solar flight veins
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3.5;
    for (let i = 0; i < 22; i++) {
      ctx.beginPath();
      let x = (i * 123) % 1024;
      let y = (i * 97) % 512;
      ctx.moveTo(x, y);
      for (let j = 0; j < 6; j++) {
        x += (Math.sin(i + j) * 85);
        y += (Math.cos(i + j) * 65);
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

  // Planet 02: Daffodil Software (Radiant emerald healthcare oceans & vivid teal biospheres)
  public getPlanet02Texture(): THREE.CanvasTexture {
    if (this.cache.has('p2')) return this.cache.get('p2')!;
    const { canvas, ctx } = this.createCanvas();

    // Vibrant deep oceanic teal & emerald gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#047857');
    grad.addColorStop(0.4, '#0d9488');
    grad.addColorStop(0.8, '#065f46');
    grad.addColorStop(1, '#022c22');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Lush emerald landmasses
    ctx.fillStyle = '#10b981';
    for (let i = 0; i < 40; i++) {
      const cx = (i * 111) % 1024;
      const cy = (i * 67) % 512;
      const r = 30 + (i * 5) % 65;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glowing cyan healthcare data rivers
    ctx.strokeStyle = '#67e8f9';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 16; i++) {
      ctx.beginPath();
      let x = (i * 145) % 1024;
      let y = (i * 83) % 512;
      ctx.moveTo(x, y);
      for (let j = 0; j < 5; j++) {
        x += Math.cos(i * 2 + j) * 75;
        y += Math.sin(i * 2 + j) * 55;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Polar ice caps (Brilliant clean white)
    ctx.fillStyle = '#f0fdfa';
    ctx.fillRect(0, 0, 1024, 45);
    ctx.fillRect(0, 467, 1024, 45);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    this.cache.set('p2', tex);
    return tex;
  }

  // Planet 03: TransUnion Vault (Deep midnight obsidian & rich golden security lattice)
  public getPlanet03Texture(): THREE.CanvasTexture {
    if (this.cache.has('p3')) return this.cache.get('p3')!;
    const { canvas, ctx } = this.createCanvas();

    // Dark obsidian base
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 1024, 512);

    // Rich golden vault plates
    ctx.fillStyle = '#b45309';
    for (let x = 0; x < 1024; x += 128) {
      for (let y = 0; y < 512; y += 128) {
        if ((x + y) % 256 === 0) {
          ctx.fillRect(x + 10, y + 10, 108, 108);
        }
      }
    }

    // High-visibility gold security lines
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2.5;
    for (let x = 0; x < 1024; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 0; y < 512; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    this.cache.set('p3', tex);
    return tex;
  }

  // Planet 04: TransUnion Platform (Vibrant lime & electric cobalt binary world)
  public getPlanet04Texture(): THREE.CanvasTexture {
    if (this.cache.has('p4')) return this.cache.get('p4')!;
    const { canvas, ctx } = this.createCanvas();

    // Deep royal blue & cobalt base
    const grad = ctx.createLinearGradient(0, 0, 1024, 512);
    grad.addColorStop(0, '#0c4a6e');
    grad.addColorStop(0.5, '#0284c7');
    grad.addColorStop(1, '#082f49');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Vivid emerald GitOps continents
    ctx.fillStyle = '#22c55e';
    for (let i = 0; i < 45; i++) {
      const cx = (i * 93) % 1024;
      const cy = (i * 59) % 512;
      const r = 25 + (i * 6) % 55;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Canary glowing pipeline streams (90% green, 10% amber)
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 3;
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (i * 42) % 512);
      ctx.bezierCurveTo(340, i * 35, 680, 512 - i * 35, 1024, (i * 42) % 512);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    this.cache.set('p4', tex);
    return tex;
  }

  // Planet 05: Samsung Knox Flagship ★ (Majestic royal cobalt & glowing solar-gold bands)
  public getPlanet05Texture(): THREE.CanvasTexture {
    if (this.cache.has('p5')) return this.cache.get('p5')!;
    const { canvas, ctx } = this.createCanvas();

    // Multi-band gas giant bands (Cobalt, Royal Blue, Gold, Amber)
    const bandColors = [
      '#1e3a8a', '#1d4ed8', '#2563eb', '#3b82f6', 
      '#b45309', '#d97706', '#f59e0b', '#fbbf24', 
      '#1e40af', '#172554', '#3b82f6', '#fef08a'
    ];

    for (let i = 0; i < 512; i += 32) {
      const c = bandColors[(i / 32) % bandColors.length];
      ctx.fillStyle = c;
      ctx.fillRect(0, i, 1024, 32);
    }

    // Great Virtual Actor Storm Vortex (Swirling Solar Gold)
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.ellipse(380, 260, 110, 50, Math.PI / 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(380, 260, 130, 65, Math.PI / 12, 0, Math.PI * 2);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    this.cache.set('p5', tex);
    return tex;
  }

  // Planet 06: Samsung AI Research Lab (Radiant cyber neon violet & vivid magenta)
  public getPlanet06Texture(): THREE.CanvasTexture {
    if (this.cache.has('p6')) return this.cache.get('p6')!;
    const { canvas, ctx } = this.createCanvas();

    // Deep cosmic violet background
    const grad = ctx.createLinearGradient(0, 0, 1024, 512);
    grad.addColorStop(0, '#3b0764');
    grad.addColorStop(0.5, '#581c87');
    grad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Neon magenta neural clusters
    ctx.fillStyle = '#ec4899';
    for (let i = 0; i < 40; i++) {
      const cx = (i * 103) % 1024;
      const cy = (i * 71) % 512;
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glowing cyan synapse lines
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 35; i++) {
      const x1 = (i * 103) % 1024;
      const y1 = (i * 71) % 512;
      const x2 = ((i + 1) * 103) % 1024;
      const y2 = ((i + 1) * 71) % 512;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    this.cache.set('p6', tex);
    return tex;
  }

  // Planet 07: Global Open Source Terminal (Prismatic rainbow diamond facets)
  public getPlanet07Texture(): THREE.CanvasTexture {
    if (this.cache.has('p7')) return this.cache.get('p7')!;
    const { canvas, ctx } = this.createCanvas();

    // Multi-spectral prism gradient (Pink, Cyan, Gold, Violet)
    const grad = ctx.createLinearGradient(0, 0, 1024, 512);
    grad.addColorStop(0, '#f43f5e');
    grad.addColorStop(0.25, '#fbbf24');
    grad.addColorStop(0.5, '#34d399');
    grad.addColorStop(0.75, '#38bdf8');
    grad.addColorStop(1, '#c084fc');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Diamond triangular facets
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2;
    for (let x = 0; x < 1024; x += 128) {
      for (let y = 0; y < 512; y += 128) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 128, y + 128);
        ctx.lineTo(x, y + 128);
        ctx.closePath();
        ctx.stroke();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    this.cache.set('p7', tex);
    return tex;
  }
}

export const planetTextures = new ProceduralPlanetTextures();
