import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * IntroAnimation — Elvish Matrix Rain → Logo Assembly
 *
 * Golden runes rain down the screen in Matrix-style columns.
 * As they fall through positions that correspond to the logo's pixels,
 * they "lock" in place — gradually assembling the full logo from
 * ancient characters. Once formed, the logo glows, flashes, and
 * zooms to the navbar.
 */

// ─── Elvish / Runic character set ───────────────────────────────────
const ELVISH =
  'ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓ';

function randomChar() {
  return ELVISH[Math.floor(Math.random() * ELVISH.length)];
}

// ─── Constants ──────────────────────────────────────────────────────
const CELL_W = 16;
const CELL_H = 22;
const RAIN_START_DELAY = 200;   // ms before rain starts
const LOCK_START = 900;         // ms — when chars begin locking
const LOCK_END = 3800;          // ms — when all should be locked
const GLOW_TRIGGER = 4200;     // ms — switch to glow phase
const FLICKER_CHANCE = 0.003;  // per locked char per frame

// Gold palette
const RAIN_COLOR = [229, 175, 55];   // brand gold
const HEAD_COLOR = [255, 255, 240];  // bright white-gold
const LOCK_COLOR = [229, 159, 43];   // locked char gold
const GLOW_COLOR = [255, 210, 117];  // glow around locked chars

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'rain' | 'glow' | 'flash' | 'zoom' | 'done'>('rain');
  const [brightness, setBrightness] = useState(0);
  const phaseRef = useRef<string>('rain');
  const startTimeRef = useRef(0);
  const frameRef = useRef<number>(0);
  const logoGridRef = useRef<boolean[][]>([]);
  const lockedRef = useRef<Map<string, { char: string; time: number }>>(new Map());
  const columnsRef = useRef<Array<{
    x: number;
    y: number;
    speed: number;
    trail: number;
    chars: string[];
  }>>([]);
  const totalLogoRef = useRef(0);

  // ─── Load logo and create pixel grid ────────────────────────────
  const setupLogoGrid = useCallback((w: number, h: number) => {
    const cols = Math.floor(w / CELL_W);
    const rows = Math.floor(h / CELL_H);

    const img = new Image();
    img.onload = () => {
      // Draw logo to offscreen canvas at grid resolution
      const oc = document.createElement('canvas');
      oc.width = cols;
      oc.height = rows;
      const octx = oc.getContext('2d')!;

      // Scale logo to fill ~65% of viewport, centered
      const logoScale = 0.65;
      const targetW = cols * logoScale;
      const aspect = img.naturalWidth / img.naturalHeight;
      const targetH = targetW / aspect;
      const offX = (cols - targetW) / 2;
      const offY = (rows - targetH) / 2;

      octx.drawImage(img, offX, offY, targetW, targetH);
      const data = octx.getImageData(0, 0, cols, rows).data;

      // Build grid: true where logo pixels are non-transparent
      const grid: boolean[][] = [];
      let total = 0;
      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
          const alpha = data[(r * cols + c) * 4 + 3];
          grid[r][c] = alpha > 60;
          if (grid[r][c]) total++;
        }
      }

      logoGridRef.current = grid;
      totalLogoRef.current = total;
    };
    img.src = '/Albright_Digital_Solutions_Logo.png';
  }, []);

  // ─── Initialize rain columns ───────────────────────────────────
  const setupColumns = useCallback((w: number) => {
    const numCols = Math.floor(w / CELL_W);
    const columns = [];

    for (let i = 0; i < numCols; i++) {
      columns.push({
        x: i,
        y: -Math.floor(Math.random() * 30) - 5,
        speed: 0.3 + Math.random() * 0.6,
        trail: 8 + Math.floor(Math.random() * 18),
        chars: Array.from({ length: 35 }, () => randomChar()),
      });
    }

    columnsRef.current = columns;
  }, []);

  // ─── Main animation loop ───────────────────────────────────────
  const animate = useCallback(() => {
    if (phaseRef.current !== 'rain') return;

    const canvas = canvasRef.current;
    if (!canvas) { frameRef.current = requestAnimationFrame(animate); return; }
    const ctx = canvas.getContext('2d');
    if (!ctx) { frameRef.current = requestAnimationFrame(animate); return; }

    const w = canvas.width;
    const h = canvas.height;
    const elapsed = performance.now() - startTimeRef.current;
    const grid = logoGridRef.current;
    const locked = lockedRef.current;
    const cols = Math.floor(w / CELL_W);
    const rows = Math.floor(h / CELL_H);

    // ── Fade effect (semi-transparent black overlay) ──
    ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
    ctx.fillRect(0, 0, w, h);

    // ── Lock probability ramps up over time ──
    let lockProb = 0;
    if (elapsed > LOCK_START && elapsed < LOCK_END) {
      lockProb = ((elapsed - LOCK_START) / (LOCK_END - LOCK_START)) ** 1.5;
    } else if (elapsed >= LOCK_END) {
      lockProb = 1;
    }

    ctx.font = `${CELL_W - 2}px monospace`;
    ctx.textAlign = 'center';

    // ── Draw rain columns ──
    columnsRef.current.forEach((col) => {
      // Advance head
      col.y += col.speed;
      const headRow = Math.floor(col.y);

      // Draw trail
      for (let t = 0; t < col.trail; t++) {
        const row = headRow - t;
        if (row < 0 || row >= rows) continue;

        const key = `${row},${col.x}`;
        if (locked.has(key)) continue; // skip locked positions

        const px = col.x * CELL_W + CELL_W / 2;
        const py = row * CELL_H + CELL_H * 0.8;

        if (t === 0) {
          // Head character — bright white-gold
          ctx.fillStyle = `rgba(${HEAD_COLOR[0]}, ${HEAD_COLOR[1]}, ${HEAD_COLOR[2]}, 0.95)`;
          ctx.shadowColor = `rgba(255, 220, 130, 0.6)`;
          ctx.shadowBlur = 8;
        } else {
          // Trail — fading gold
          const fade = 1 - t / col.trail;
          ctx.fillStyle = `rgba(${RAIN_COLOR[0]}, ${RAIN_COLOR[1]}, ${RAIN_COLOR[2]}, ${fade * 0.7})`;
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }

        // Occasionally mutate trail characters
        if (Math.random() < 0.02) {
          col.chars[t % col.chars.length] = randomChar();
        }

        ctx.fillText(col.chars[t % col.chars.length], px, py);

        // ── Try to lock character at logo positions ──
        if (t === 0 && lockProb > 0 && grid[row]?.[col.x]) {
          if (!locked.has(key) && Math.random() < lockProb) {
            locked.set(key, {
              char: randomChar(),
              time: elapsed,
            });
          }
        }
      }

      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Reset column when it goes off screen
      if (headRow - col.trail > rows) {
        col.y = -Math.floor(Math.random() * 8) - 3;
        col.speed = 0.3 + Math.random() * 0.6;
        col.trail = 8 + Math.floor(Math.random() * 18);
      }
    });

    // ── Draw locked characters (the assembling logo) ──
    const lockGlow = Math.min(1, locked.size / Math.max(1, totalLogoRef.current));

    locked.forEach((val, key) => {
      const [rStr, cStr] = key.split(',');
      const r = parseInt(rStr);
      const c = parseInt(cStr);

      const px = c * CELL_W + CELL_W / 2;
      const py = r * CELL_H + CELL_H * 0.8;

      const age = elapsed - val.time;
      const fadeIn = Math.min(1, age / 500);

      // Flicker effect — occasionally change character
      if (Math.random() < FLICKER_CHANCE) {
        val.char = randomChar();
      }

      // Glow behind locked characters (gets stronger as logo completes)
      const glowAlpha = fadeIn * lockGlow * 0.4;
      ctx.shadowColor = `rgba(${GLOW_COLOR[0]}, ${GLOW_COLOR[1]}, ${GLOW_COLOR[2]}, ${glowAlpha})`;
      ctx.shadowBlur = 6 + lockGlow * 12;

      // Character color — bright gold
      ctx.fillStyle = `rgba(${LOCK_COLOR[0]}, ${LOCK_COLOR[1]}, ${LOCK_COLOR[2]}, ${fadeIn * (0.8 + lockGlow * 0.2)})`;
      ctx.fillText(val.char, px, py);
    });

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // ── Check if logo is fully formed → transition to glow ──
    if (elapsed > GLOW_TRIGGER && locked.size >= totalLogoRef.current * 0.92) {
      phaseRef.current = 'glow';
      setPhase('glow');
      return;
    }

    // Force-fill remaining cells after LOCK_END + buffer
    if (elapsed > LOCK_END + 300 && grid.length > 0) {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (grid[r]?.[c]) {
            const key = `${r},${c}`;
            if (!locked.has(key)) {
              locked.set(key, { char: randomChar(), time: elapsed });
            }
          }
        }
      }
    }

    frameRef.current = requestAnimationFrame(animate);
  }, []);

  // ─── Setup ─────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setupLogoGrid(canvas.width, canvas.height);
      setupColumns(canvas.width);
    };

    resize();
    startTimeRef.current = performance.now();

    const timer = setTimeout(() => {
      frameRef.current = requestAnimationFrame(animate);
    }, RAIN_START_DELAY);

    // Auto-advance safety net
    const autoAdvance = setTimeout(() => {
      if (phaseRef.current === 'rain') {
        phaseRef.current = 'glow';
        setPhase('glow');
      }
    }, 5500);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoAdvance);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [setupLogoGrid, setupColumns, animate]);

  // ─── Phase 2: Glow — logo brightens ────────────────────────────
  useEffect(() => {
    if (phase !== 'glow') return;

    let frame = 0;
    const maxFrames = 70;

    const glowAnimate = () => {
      frame++;
      const progress = frame / maxFrames;
      setBrightness(progress);

      if (frame < maxFrames) {
        frameRef.current = requestAnimationFrame(glowAnimate);
      } else {
        setPhase('flash');
      }
    };

    frameRef.current = requestAnimationFrame(glowAnimate);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [phase]);

  // ─── Phase 3: Flash ────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'flash') return;
    const timer = setTimeout(() => setPhase('zoom'), 350);
    return () => clearTimeout(timer);
  }, [phase]);

  // ─── Phase 4: Zoom to navbar ───────────────────────────────────
  useEffect(() => {
    if (phase !== 'zoom') return;
    const timer = setTimeout(() => {
      setPhase('done');
      setTimeout(onComplete, 200);
    }, 1000);
    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  const handleSkip = () => {
    phaseRef.current = 'done';
    setPhase('done');
    setTimeout(onComplete, 100);
  };

  if (phase === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer"
      onClick={handleSkip}
      style={{ background: '#000' }}
    >
      {/* ─── Rain canvas (visible during rain phase) ─── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          opacity: phase === 'rain' ? 1 : Math.max(0, 1 - brightness * 2),
        }}
      />

      {/* ─── Logo image (fades in during glow, zooms during zoom) ─── */}
      <div
        className="relative z-10 flex items-center justify-center"
        style={{
          transform: phase === 'zoom'
            ? 'translate(-42vw, -42vh) scale(0.08)'
            : 'translate(0, 0) scale(1)',
          transition: phase === 'zoom' ? 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        }}
      >
        {/* Outer glow */}
        {(phase === 'glow' || phase === 'flash') && (
          <>
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${200 + brightness * 800}px`,
                height: `${200 + brightness * 800}px`,
                background: `radial-gradient(circle, rgba(229,159,43,${brightness * 0.35}) 0%, transparent 70%)`,
              }}
            />
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${100 + brightness * 500}px`,
                height: `${100 + brightness * 500}px`,
                background: `radial-gradient(circle, rgba(255,255,255,${brightness * 0.15}) 0%, transparent 50%)`,
              }}
            />
          </>
        )}

        {/* Logo */}
        <img
          src="/Albright_Digital_Solutions_Logo.png"
          alt=""
          className="relative z-10 pointer-events-none"
          style={{
            width: '1120px',
            height: '1120px',
            objectFit: 'contain',
            opacity: phase === 'rain' ? 0 : Math.min(1, brightness * 2.5),
            filter: `brightness(${1 + brightness * 5}) drop-shadow(0 0 ${brightness * 80}px rgba(229,159,43,${brightness}))`,
            transition: phase === 'zoom' ? 'width 0.9s, height 0.9s' : 'opacity 0.3s',
          }}
        />
      </div>

      {/* ─── Lightning flash ─── */}
      {phase === 'flash' && (
        <div className="absolute inset-0 z-20 intro-flash pointer-events-none" />
      )}

      {/* ─── Skip hint ─── */}
      {phase === 'rain' && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-zinc-700 text-[10px] tracking-[0.25em] uppercase animate-pulse select-none">
          Click to skip
        </div>
      )}
    </div>
  );
}
