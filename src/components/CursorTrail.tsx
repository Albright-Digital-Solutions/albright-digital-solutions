import { useEffect, useRef, useCallback } from 'react';

// ─── Color palette (matching brand tokens) ───────────────────────────
const GOLD_BASE = { r: 229, g: 159, b: 43 };      // --color-brand-accent
const GOLD_LIGHT = { r: 255, g: 210, b: 117 };     // --color-brand-accent-light
const WHITE = { r: 255, g: 255, b: 255 };

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  speed: number; // the cursor speed when this particle was spawned
}

interface Lightning {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  branches: { points: { x: number; y: number }[] }[];
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(1, Math.max(0, t));
}

function getTrailColor(speed: number, alpha: number): string {
  // speed 0-400: gold base
  // speed 400-1200: gold → bright gold/light
  // speed 1200+: bright gold → white
  const t1 = Math.min(1, Math.max(0, (speed - 100) / 800));
  const t2 = Math.min(1, Math.max(0, (speed - 800) / 600));

  const r = Math.round(lerp(lerp(GOLD_BASE.r, GOLD_LIGHT.r, t1), WHITE.r, t2));
  const g = Math.round(lerp(lerp(GOLD_BASE.g, GOLD_LIGHT.g, t1), WHITE.g, t2));
  const b = Math.round(lerp(lerp(GOLD_BASE.b, GOLD_LIGHT.b, t1), WHITE.b, t2));

  return `rgba(${r},${g},${b},${alpha})`;
}

function generateLightning(x: number, y: number): Lightning {
  const branchCount = 3 + Math.floor(Math.random() * 4);
  const branches: Lightning['branches'] = [];

  for (let b = 0; b < branchCount; b++) {
    const points: { x: number; y: number }[] = [{ x, y }];
    const angle = Math.random() * Math.PI * 2;
    const length = 40 + Math.random() * 80;
    const segments = 4 + Math.floor(Math.random() * 5);

    let cx = x;
    let cy = y;

    for (let s = 1; s <= segments; s++) {
      const progress = s / segments;
      const jitter = (1 - progress) * 25;
      cx += (Math.cos(angle) * length) / segments + (Math.random() - 0.5) * jitter;
      cy += (Math.sin(angle) * length) / segments + (Math.random() - 0.5) * jitter;
      points.push({ x: cx, y: cy });
    }
    branches.push({ points });
  }

  return { x, y, life: 1, maxLife: 1, branches };
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const lightnings = useRef<Lightning[]>([]);
  const mouse = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const speed = useRef(0);
  const animRef = useRef<number>(0);
  const lastTime = useRef(0);
  const flashOpacity = useRef(0);
  const isTouchDevice = useRef(false);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
  }, []);

  useEffect(() => {
    // Skip on touch-only devices
    isTouchDevice.current = 'ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches;
    if (isTouchDevice.current) return;

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.prevX = mouse.current.x;
      mouse.current.prevY = mouse.current.y;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const dx = mouse.current.x - mouse.current.prevX;
      const dy = mouse.current.y - mouse.current.prevY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Smooth speed calculation
      speed.current = speed.current * 0.7 + dist * 0.3 * 60; // scale to ~px/sec

      // Spawn particles based on speed
      const spawnCount = Math.min(8, Math.max(1, Math.floor(speed.current / 100)));
      for (let i = 0; i < spawnCount; i++) {
        const t = i / spawnCount;
        const px = mouse.current.prevX + dx * t;
        const py = mouse.current.prevY + dy * t;

        const spread = Math.min(12, speed.current / 80);
        const sizeBase = 2 + Math.min(6, speed.current / 200);
        const lifeBase = 0.4 + Math.min(1.0, speed.current / 600);

        particles.current.push({
          x: px + (Math.random() - 0.5) * spread,
          y: py + (Math.random() - 0.5) * spread,
          vx: (Math.random() - 0.5) * 1.5 + dx * 0.1,
          vy: (Math.random() - 0.5) * 1.5 + dy * 0.1 - 0.5,
          life: lifeBase,
          maxLife: lifeBase,
          size: sizeBase * (0.5 + Math.random() * 0.5),
          speed: speed.current,
        });
      }

      // Lightning at very high speeds (threshold ~1400)
      if (speed.current > 1400 && Math.random() > 0.5) {
        lightnings.current.push(generateLightning(mouse.current.x, mouse.current.y));
        flashOpacity.current = Math.min(0.35, flashOpacity.current + 0.15);
      }

      // Keep particle count sane
      if (particles.current.length > 500) {
        particles.current = particles.current.slice(-500);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = (time: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      const dt = lastTime.current ? Math.min(0.05, (time - lastTime.current) / 1000) : 0.016;
      lastTime.current = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ─── Draw full-screen flash ──────────────────────────────
      if (flashOpacity.current > 0.01) {
        ctx.fillStyle = `rgba(255,255,255,${flashOpacity.current})`;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        flashOpacity.current *= 0.85; // fast decay
      }

      // ─── Decay speed when mouse stops ────────────────────────
      speed.current *= 0.95;

      // ─── Update & draw particles ─────────────────────────────
      const alive: Particle[] = [];
      for (const p of particles.current) {
        p.life -= dt;
        if (p.life <= 0) continue;

        p.x += p.vx * dt * 60;
        p.y += p.vy * dt * 60;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy -= 0.02; // slight upward drift

        const lifeRatio = p.life / p.maxLife;
        const alpha = lifeRatio * Math.min(1, p.speed / 200) * 0.8;
        const size = p.size * (0.3 + lifeRatio * 0.7);

        // Main particle glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2.5);
        gradient.addColorStop(0, getTrailColor(p.speed, alpha));
        gradient.addColorStop(0.4, getTrailColor(p.speed, alpha * 0.5));
        gradient.addColorStop(1, getTrailColor(p.speed, 0));

        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core bright dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = getTrailColor(p.speed, alpha * 1.2);
        ctx.fill();

        alive.push(p);
      }
      particles.current = alive;

      // ─── Draw cursor glow (ambient halo) ─────────────────────
      if (speed.current > 30) {
        const glowSize = 30 + Math.min(60, speed.current / 10);
        const glowAlpha = Math.min(0.25, speed.current / 2000);
        const cursorGlow = ctx.createRadialGradient(
          mouse.current.x, mouse.current.y, 0,
          mouse.current.x, mouse.current.y, glowSize
        );
        cursorGlow.addColorStop(0, getTrailColor(speed.current, glowAlpha));
        cursorGlow.addColorStop(1, getTrailColor(speed.current, 0));

        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = cursorGlow;
        ctx.fill();
      }

      // ─── Draw lightning bolts ────────────────────────────────
      const aliveLightning: Lightning[] = [];
      for (const l of lightnings.current) {
        l.life -= dt * 3.5; // fast decay
        if (l.life <= 0) continue;

        const alpha = l.life * 0.9;

        for (const branch of l.branches) {
          ctx.beginPath();
          ctx.moveTo(branch.points[0].x, branch.points[0].y);
          for (let i = 1; i < branch.points.length; i++) {
            ctx.lineTo(branch.points[i].x, branch.points[i].y);
          }

          // Outer glow
          ctx.strokeStyle = `rgba(229,159,43,${alpha * 0.3})`;
          ctx.lineWidth = 6;
          ctx.shadowColor = `rgba(255,210,117,${alpha * 0.5})`;
          ctx.shadowBlur = 20;
          ctx.stroke();

          // Inner bright line
          ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.8})`;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = `rgba(255,255,255,${alpha})`;
          ctx.shadowBlur = 10;
          ctx.stroke();

          ctx.shadowBlur = 0;
        }

        aliveLightning.push(l);
      }
      lightnings.current = aliveLightning;

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, [resize]);

  // Don't render on touch-only devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9998] pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
}
