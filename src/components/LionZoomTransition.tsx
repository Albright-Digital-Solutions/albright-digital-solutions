import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * LionZoomTransition — Pilgrim's Progress Cinematic Scene
 *
 * A 2.5D parallax hero built on high-quality generated artwork,
 * layered with live atmospheric effects:
 *
 * - Cinematic scene artwork as base layer
 * - Mouse-driven parallax depth (subtle camera sway)
 * - Animated volumetric god rays (CSS conic gradient, rotating)
 * - Pulsing golden divine glow (radial gradient)
 * - Canvas particle system (golden dust motes)
 * - Scroll-driven zoom into the light → golden flash → reveal
 * - Scripture quote overlay
 * - Film grain + vignette for cinematic feel
 */

// ─── Constants ──────────────────────────────────────────────────────
const PARTICLE_COUNT = 120;
const MOUSE_EASE = 0.04;
const PARALLAX_BG = 20;       // px shift for background
const PARALLAX_GLOW = 12;     // px shift for glow layer
const PARALLAX_PARTICLES = 8; // px shift for particles

export default function LionZoomTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const scrollRef = useRef(0);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    size: number; opacity: number; life: number; maxLife: number;
  }>>([]);
  const [progress, setProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // ─── Initialize particles ──────────────────────────────────────
  const initParticles = useCallback(() => {
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
    particlesRef.current = particles;
  }, []);

  function createParticle() {
    return {
      // Concentrate particles in the center/upper area (near the gate light)
      x: 0.3 + Math.random() * 0.4,
      y: Math.random() * 0.7,
      vx: (Math.random() - 0.5) * 0.0003,
      vy: -(Math.random() * 0.0008 + 0.0002), // float upward
      size: Math.random() * 2.5 + 0.5,
      opacity: 0,
      life: 0,
      maxLife: 200 + Math.random() * 400,
    };
  }

  // ─── Animation loop (particles + parallax) ─────────────────────
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      frameRef.current = requestAnimationFrame(animate);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      frameRef.current = requestAnimationFrame(animate);
      return;
    }

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Smooth mouse
    const mouse = mouseRef.current;
    mouse.x += (mouse.tx - mouse.x) * MOUSE_EASE;
    mouse.y += (mouse.ty - mouse.y) * MOUSE_EASE;

    const scroll = scrollRef.current;
    const particleFade = scroll < 0.7 ? 1 : Math.max(0, 1 - (scroll - 0.7) / 0.15);

    // ─── Draw particles ──────────────────────────────────────────
    particlesRef.current.forEach((p) => {
      p.life++;
      p.x += p.vx + Math.sin(p.life * 0.02) * 0.00015;
      p.y += p.vy;

      // Fade in, sustain, fade out lifecycle
      const lifeRatio = p.life / p.maxLife;
      if (lifeRatio < 0.15) {
        p.opacity = lifeRatio / 0.15;
      } else if (lifeRatio > 0.8) {
        p.opacity = (1 - lifeRatio) / 0.2;
      } else {
        p.opacity = 1;
      }

      // Reset if dead or out of bounds
      if (p.life >= p.maxLife || p.y < -0.05 || p.x < 0 || p.x > 1) {
        Object.assign(p, createParticle());
        p.y = 0.6 + Math.random() * 0.3;
      }

      // Parallax offset for particles
      const px = p.x * w + mouse.x * PARALLAX_PARTICLES;
      const py = p.y * h + mouse.y * PARALLAX_PARTICLES;
      const alpha = p.opacity * particleFade * (0.3 + Math.random() * 0.15);

      // Golden glow
      const gradient = ctx.createRadialGradient(px, py, 0, px, py, p.size * 3);
      gradient.addColorStop(0, `rgba(255, 220, 130, ${alpha})`);
      gradient.addColorStop(0.4, `rgba(229, 175, 55, ${alpha * 0.5})`);
      gradient.addColorStop(1, 'rgba(229, 175, 55, 0)');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Bright core
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 240, ${alpha * 0.9})`;
      ctx.arc(px, py, p.size * 0.6, 0, Math.PI * 2);
      ctx.fill();
    });

    frameRef.current = requestAnimationFrame(animate);
  }, []);

  // ─── Setup & teardown ──────────────────────────────────────────
  useEffect(() => {
    initParticles();

    // Size canvas to viewport
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      // Reset canvas dimensions for particle coordinate system
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [initParticles, animate]);

  // ─── Preload image ─────────────────────────────────────────────
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = '/pilgrims_gate.png';
  }, []);

  // ─── Mouse tracking ────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // ─── Scroll tracking ──────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const range = container.offsetHeight - window.innerHeight;
        if (range <= 0) { ticking = false; return; }
        const p = Math.max(0, Math.min(1, -rect.top / range));
        setProgress(p);
        scrollRef.current = p;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── Derived animation values ──────────────────────────────────
  const mouse = mouseRef.current;

  // Scroll-driven zoom (1x → 2.8x) — zooming into the gate
  const zoomProgress = Math.min(progress / 0.85, 1);
  const eased = zoomProgress * zoomProgress * (3 - 2 * zoomProgress); // smoothstep
  const scale = 1 + eased * 1.8;

  // Brightness ramp — gets blinding as we approach the divine light
  const brightnessBoost = 1 + eased * 3.5;

  // Glow intensity grows with scroll
  const glowIntensity = Math.min(1, progress * 1.8);

  // God rays opacity
  const raysOpacity = progress > 0.1 && progress < 0.85
    ? Math.min(0.25, (progress - 0.1) * 0.4)
    : 0;

  // Scripture fade
  const scriptureOpacity = progress > 0.08 && progress < 0.55
    ? Math.min(1, (progress - 0.08) * 6) * Math.max(0, 1 - (progress - 0.35) / 0.2)
    : 0;

  // Scroll hint fade
  const hintOpacity = progress < 0.04 ? 1 : Math.max(0, 1 - progress * 15);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: '350vh' }}
    >
      {/* ═══ Sticky viewport ═══ */}
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100vh', zIndex: 10 }}>

        {/* Layer 0: Deep black base */}
        <div className="absolute inset-0" style={{ background: '#050404' }} />

        {/* Layer 1: Scene artwork (parallax + zoom) */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: imageLoaded ? 1 : 0,
            transform: `translate(${-mouse.x * PARALLAX_BG}px, ${-mouse.y * PARALLAX_BG}px) scale(${scale})`,
            transformOrigin: '50% 35%', // Zoom toward the gate (upper center)
            willChange: 'transform',
            filter: `brightness(${brightnessBoost}) contrast(1.05) saturate(1.1)`,
          }}
        >
          <img
            src="/pilgrims_gate.png"
            alt="The narrow path — chained lions guard the way to the gate of glorious light"
            className="w-full h-full object-cover select-none pointer-events-none"
            style={{
              // Slight overscan so parallax doesn't show edges
              transform: 'scale(1.08)',
            }}
            draggable={false}
          />
        </div>

        {/* Layer 2: Golden divine glow (pulsing) */}
        <div
          className="absolute inset-0 pointer-events-none pilgrims-glow"
          style={{
            background: `radial-gradient(ellipse 50% 45% at 50% 30%,
              rgba(255, 230, 140, ${glowIntensity * 0.18}) 0%,
              rgba(229, 175, 55, ${glowIntensity * 0.08}) 40%,
              transparent 70%)`,
            transform: `translate(${-mouse.x * PARALLAX_GLOW}px, ${-mouse.y * PARALLAX_GLOW}px) scale(${scale * 0.95})`,
            transformOrigin: '50% 35%',
            mixBlendMode: 'screen',
          }}
        />

        {/* Layer 3: Volumetric god rays (rotating subtly) */}
        <div
          className="absolute inset-0 pointer-events-none pilgrims-rays"
          style={{
            opacity: raysOpacity,
            background: `conic-gradient(from 0deg at 50% 28%,
              transparent 0deg,
              rgba(255, 230, 140, 0.12) 8deg,
              transparent 16deg,
              transparent 40deg,
              rgba(255, 220, 120, 0.08) 48deg,
              transparent 56deg,
              transparent 80deg,
              rgba(255, 230, 140, 0.1) 88deg,
              transparent 96deg,
              transparent 120deg,
              rgba(255, 220, 120, 0.07) 128deg,
              transparent 136deg,
              transparent 160deg,
              rgba(255, 230, 140, 0.1) 168deg,
              transparent 176deg,
              transparent 200deg,
              rgba(255, 220, 120, 0.08) 208deg,
              transparent 216deg,
              transparent 240deg,
              rgba(255, 230, 140, 0.1) 248deg,
              transparent 256deg,
              transparent 280deg,
              rgba(255, 220, 120, 0.07) 288deg,
              transparent 296deg,
              transparent 320deg,
              rgba(255, 230, 140, 0.09) 328deg,
              transparent 336deg,
              transparent 360deg)`,
            transform: `scale(${scale})`,
            transformOrigin: '50% 28%',
            mixBlendMode: 'screen',
          }}
        />

        {/* Layer 4: Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 3, mixBlendMode: 'screen' }}
        />

        {/* Layer 5: Cinematic vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 65% at 50% 45%, transparent 20%, rgba(5,4,4,0.5) 70%, rgba(5,4,4,0.85) 100%)`,
            zIndex: 4,
          }}
        />

        {/* Layer 6: Film grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none pilgrims-grain"
          style={{ zIndex: 5, opacity: 0.04 }}
        />

        {/* Layer 7: Top edge shadow (frames the scene) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 15%, transparent 90%, rgba(0,0,0,0.3) 100%)',
            zIndex: 5,
          }}
        />

        {/* ─── Scripture quote ─── */}
        <div
          className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none px-6"
          style={{
            opacity: scriptureOpacity,
            zIndex: 6,
            bottom: '12%',
            maxWidth: '640px',
            transform: `translateX(-50%) translateY(${(1 - scriptureOpacity) * 20}px)`,
          }}
        >
          <p className="text-base md:text-lg font-serif italic leading-relaxed"
            style={{
              color: 'rgba(255, 235, 190, 0.9)',
              textShadow: '0 0 30px rgba(229,175,55,0.4), 0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            "Keep in the midst of the path, and no hurt shall come unto thee."
          </p>
          <p
            className="text-[10px] md:text-xs uppercase tracking-[0.3em] mt-3"
            style={{
              color: 'rgba(229, 175, 55, 0.5)',
              textShadow: '0 1px 5px rgba(0,0,0,0.9)',
            }}
          >
            — The Pilgrim's Progress
          </p>
        </div>

        {/* ─── Scroll hint ─── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-700"
          style={{ opacity: hintOpacity, zIndex: 6 }}
        >
          <span
            className="text-[10px] uppercase tracking-[0.35em] font-medium"
            style={{
              color: 'rgba(200, 190, 170, 0.5)',
              textShadow: '0 1px 4px rgba(0,0,0,0.9)',
            }}
          >
            Walk the narrow path
          </span>
          <div className="w-5 h-8 rounded-full border border-zinc-700/50 flex items-start justify-center p-1.5"
            style={{ boxShadow: '0 0 15px rgba(229,175,55,0.1)' }}
          >
            <div className="w-0.5 h-2 bg-[var(--color-brand-accent)]/60 rounded-full animate-bounce" />
          </div>
        </div>

        {/* ── Whiteout overlay INSIDE the sticky viewport (covers everything) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: '#ffffff',
            opacity: progress < 0.5 ? 0 : Math.min(1, (progress - 0.5) / 0.3),
            zIndex: 20,
          }}
        />
      </div>

      {/* ═══ Overlay: dark → pure white → fades out for hero handoff ═══ */}
      {(() => {
        // Phase 1 (0–0.6): solid dark behind the viewport
        // Phase 2 (0.6–0.85): ramps from dark to pure white
        // Phase 3 (0.85–0.95): stays pure white
        // Phase 4 (0.95–1.0): fades out — hero section takes over
        const whiteBlend = progress < 0.6 ? 0 : Math.min(1, (progress - 0.6) / 0.25);
        const overlayFade = progress < 0.95 ? 1 : Math.max(0, 1 - (progress - 0.95) / 0.05);

        const r = Math.round(5 + (255 - 5) * whiteBlend);
        const g = Math.round(4 + (255 - 4) * whiteBlend);
        const b = Math.round(4 + (255 - 4) * whiteBlend);

        return (
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              background: `rgb(${r},${g},${b})`,
              opacity: overlayFade,
              zIndex: 5,
            }}
          />
        );
      })()}
    </div>
  );
}
