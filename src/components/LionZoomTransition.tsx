import { useCallback, useEffect, useRef, useState } from 'react';

const INTRO_SESSION_KEY = 'albright_cinematic_intro_seen';
const INTRO_HOLD_MS = 1500;
const INTRO_ANIMATION_MS = 3000;
const PARTICLE_COUNT = 120;
const MOUSE_EASE = 0.04;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

function createParticle(): Particle {
  return {
    x: 0.3 + Math.random() * 0.4,
    y: Math.random() * 0.7,
    vx: (Math.random() - 0.5) * 0.0003,
    vy: -(Math.random() * 0.0008 + 0.0002),
    size: Math.random() * 2.5 + 0.5,
    opacity: 0,
    life: 0,
    maxLife: 200 + Math.random() * 400,
  };
}

export default function LionZoomTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const progressRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const [progress, setProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isComplete, setIsComplete] = useState(
    () => typeof window === 'undefined' || sessionStorage.getItem(INTRO_SESSION_KEY) === 'true',
  );

  const animateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mouse = mouseRef.current;
    mouse.x += (mouse.tx - mouse.x) * MOUSE_EASE;
    mouse.y += (mouse.ty - mouse.y) * MOUSE_EASE;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const particleFade = progressRef.current < 0.7
      ? 1
      : Math.max(0, 1 - (progressRef.current - 0.7) / 0.15);

    particlesRef.current.forEach((particle) => {
      particle.life += 1;
      particle.x += particle.vx + Math.sin(particle.life * 0.02) * 0.00015;
      particle.y += particle.vy;

      const lifeRatio = particle.life / particle.maxLife;
      if (lifeRatio < 0.15) particle.opacity = lifeRatio / 0.15;
      else if (lifeRatio > 0.8) particle.opacity = (1 - lifeRatio) / 0.2;
      else particle.opacity = 1;

      if (particle.life >= particle.maxLife || particle.y < -0.05 || particle.x < 0 || particle.x > 1) {
        Object.assign(particle, createParticle(), { y: 0.6 + Math.random() * 0.3 });
      }

      const x = particle.x * canvas.width + mouse.x * 8;
      const y = particle.y * canvas.height + mouse.y * 8;
      const alpha = particle.opacity * particleFade * 0.4;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, particle.size * 3);
      glow.addColorStop(0, `rgba(255, 220, 130, ${alpha})`);
      glow.addColorStop(0.4, `rgba(229, 175, 55, ${alpha * 0.5})`);
      glow.addColorStop(1, 'rgba(229, 175, 55, 0)');

      ctx.beginPath();
      ctx.fillStyle = glow;
      ctx.arc(x, y, particle.size * 3, 0, Math.PI * 2);
      ctx.fill();
    });

    frameRef.current = requestAnimationFrame(animateParticles);
  }, []);

  useEffect(() => {
    if (isComplete) return;

    let active = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const startedAt = performance.now();
    const tick = (now: number) => {
      if (!active) return;
      const nextProgress = Math.max(
        0,
        Math.min(1, (now - startedAt - INTRO_HOLD_MS) / INTRO_ANIMATION_MS),
      );
      progressRef.current = nextProgress;
      setProgress(nextProgress);

      if (nextProgress < 1) {
        requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(INTRO_SESSION_KEY, 'true');
        document.body.style.overflow = previousOverflow;
        setIsComplete(true);
      }
    };

    const progressFrame = requestAnimationFrame(tick);
    return () => {
      active = false;
      cancelAnimationFrame(progressFrame);
      document.body.style.overflow = previousOverflow;
    };
  }, [isComplete]);

  useEffect(() => {
    if (isComplete) return;
    const image = new Image();
    image.onload = () => setImageLoaded(true);
    image.src = '/pilgrims_gate.png';
  }, [isComplete]);

  useEffect(() => {
    if (isComplete) return;
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, createParticle);

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);
    frameRef.current = requestAnimationFrame(animateParticles);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [animateParticles, isComplete]);

  useEffect(() => {
    if (isComplete) return;
    const onMove = (event: MouseEvent) => {
      mouseRef.current.tx = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.ty = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isComplete]);

  if (isComplete) return null;

  const eased = progress * progress * (3 - 2 * progress);
  const scale = 1 + eased * 1.8;
  const brightness = 1 + eased * 3.5;
  const glowIntensity = Math.min(1, progress * 1.8);
  const raysOpacity = progress > 0.1 && progress < 0.85
    ? Math.min(0.25, (progress - 0.1) * 0.4)
    : 0;
  const scriptureOpacity = progress > 0.08 && progress < 0.55
    ? Math.min(1, (progress - 0.08) * 6) * Math.max(0, 1 - (progress - 0.35) / 0.2)
    : 0;
  const whiteoutOpacity = progress < 0.5 ? 0 : Math.min(1, (progress - 0.5) / 0.3);
  const handoffOpacity = progress < 0.9 ? 1 : Math.max(0, 1 - (progress - 0.9) / 0.1);
  const mouse = mouseRef.current;

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-[#050404]"
      style={{ zIndex: 100, opacity: handoffOpacity }}
      aria-label="Albright Digital Solutions LLC cinematic introduction"
    >
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: imageLoaded ? 1 : 0,
          transform: `translate(${-mouse.x * 20}px, ${-mouse.y * 20}px) scale(${scale})`,
          transformOrigin: '50% 35%',
          filter: `brightness(${brightness}) contrast(1.05) saturate(1.1)`,
          willChange: 'transform',
        }}
      >
        <img
          src="/pilgrims_gate.png"
          alt="The narrow path between two lions leading toward a gate of golden light"
          className="h-full w-full scale-[1.08] select-none object-cover"
          draggable={false}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none pilgrims-glow"
        style={{
          background: `radial-gradient(ellipse 50% 45% at 50% 30%, rgba(255,230,140,${glowIntensity * 0.18}) 0%, rgba(229,175,55,${glowIntensity * 0.08}) 40%, transparent 70%)`,
          transform: `translate(${-mouse.x * 12}px, ${-mouse.y * 12}px) scale(${scale * 0.95})`,
          transformOrigin: '50% 35%',
          mixBlendMode: 'screen',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none pilgrims-rays"
        style={{
          opacity: raysOpacity,
          background: 'conic-gradient(from 0deg at 50% 28%, transparent 0deg, rgba(255,230,140,.12) 8deg, transparent 16deg, transparent 80deg, rgba(255,220,120,.1) 88deg, transparent 96deg, transparent 160deg, rgba(255,230,140,.1) 168deg, transparent 176deg, transparent 240deg, rgba(255,220,120,.1) 248deg, transparent 256deg, transparent 320deg, rgba(255,230,140,.09) 328deg, transparent 336deg)',
          transform: `scale(${scale})`,
          transformOrigin: '50% 28%',
          mixBlendMode: 'screen',
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none mix-blend-screen" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_65%_at_50%_45%,transparent_20%,rgba(5,4,4,.5)_70%,rgba(5,4,4,.85)_100%)]" />
      <div className="absolute inset-0 pointer-events-none pilgrims-grain opacity-[.04]" />

      <div
        className="absolute bottom-[12%] left-1/2 w-full max-w-2xl -translate-x-1/2 px-6 text-center"
        style={{ opacity: scriptureOpacity }}
      >
        <p className="font-serif text-base italic leading-relaxed text-[#ffebbee6] md:text-lg [text-shadow:0_0_30px_rgba(229,175,55,.4),0_2px_10px_rgba(0,0,0,.8)]">
          “Keep in the midst of the path, and no hurt shall come unto thee.”
        </p>
        <p className="mt-3 text-[10px] uppercase tracking-[.3em] text-[#e5af3780] md:text-xs">
          — The Pilgrim’s Progress
        </p>
      </div>

      <div
        className="absolute inset-0 pointer-events-none bg-white"
        style={{ opacity: whiteoutOpacity, zIndex: 20 }}
      />
    </div>
  );
}
