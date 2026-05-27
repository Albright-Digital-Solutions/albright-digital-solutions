import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * LionZoomTransition
 *
 * Uses Canvas to process the lion silhouette image at load time:
 * - White/light pixels → fully transparent
 * - Black/dark pixels → brand gold with proper alpha
 * This gives us a truly background-free golden lion — no borders.
 */

const FOCAL_X = 48; // % — centered in the gap between front legs
const FOCAL_Y = 78; // % — low between the front legs

export default function LionZoomTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // ─── Load image, process pixels, draw gold lion ─────────────────
  const processImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.onload = () => {
      const dpr = window.devicePixelRatio || 1;

      // ── Step 1: Draw full image to a temp canvas to find the lion bounds ──
      const tmpCanvas = document.createElement('canvas');
      tmpCanvas.width = img.naturalWidth;
      tmpCanvas.height = img.naturalHeight;
      const tmpCtx = tmpCanvas.getContext('2d');
      if (!tmpCtx) return;
      tmpCtx.drawImage(img, 0, 0);
      const tmpData = tmpCtx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height);
      const td = tmpData.data;

      // Find bounding box of dark pixels (the lion)
      let minX = tmpCanvas.width, minY = tmpCanvas.height, maxX = 0, maxY = 0;
      for (let y = 0; y < tmpCanvas.height; y++) {
        for (let x = 0; x < tmpCanvas.width; x++) {
          const i = (y * tmpCanvas.width + x) * 4;
          const lum = (td[i] * 0.299 + td[i + 1] * 0.587 + td[i + 2] * 0.114) / 255;
          if (lum < 0.55) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      // Add tiny padding (2%)
      const pad = Math.round(tmpCanvas.width * 0.02);
      minX = Math.max(0, minX - pad);
      minY = Math.max(0, minY - pad);
      maxX = Math.min(tmpCanvas.width - 1, maxX + pad);
      maxY = Math.min(tmpCanvas.height - 1, maxY + pad);

      const cropW = maxX - minX + 1;
      const cropH = maxY - minY + 1;
      const cropAspect = cropW / cropH;

      // ── Step 2: Size the output to fill the viewport ──
      // Fill from just below navbar (~60px) to just above scroll hint (~60px)
      const targetH = window.innerHeight - 120;
      const targetW = targetH * cropAspect;

      canvas.width = targetW * dpr;
      canvas.height = targetH * dpr;
      canvas.style.width = `${targetW}px`;
      canvas.style.height = `${targetH}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.scale(dpr, dpr);
      // Draw only the cropped lion region, scaled to fill the canvas
      ctx.drawImage(img, minX, minY, cropW, cropH, 0, 0, targetW, targetH);

      // ── Step 3: Recolor pixels ──
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2];
        const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

        if (lum > 0.55) {
          d[i + 3] = 0; // transparent
        } else {
          const darkness = 1 - lum;
          d[i]     = 229;
          d[i + 1] = 175;
          d[i + 2] = 55;
          d[i + 3] = Math.min(255, Math.round(darkness * 350));
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setReady(true);
    };
    img.src = '/lion_silhouette.png';
  }, []);

  useEffect(() => {
    processImage();
    const onResize = () => processImage();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [processImage]);

  // ─── Scroll tracking ───────────────────────────────────────────
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
        setProgress(Math.max(0, Math.min(1, -rect.top / range)));
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── Animation values ──────────────────────────────────────────
  const scale = 1 + progress * progress * 50;
  const lionOpacity = progress < 0.35 ? 1 : Math.max(0, 1 - (progress - 0.35) / 0.25);
  const glowStrength = Math.min(1, progress * 2.5);
  const glowRadius = 150 + progress * 600;
  const brightness = 1 + glowStrength * 2.5;

  const portalActive = progress > 0.4;
  const portalOpacity = portalActive ? Math.min(1, (progress - 0.4) / 0.25) : 0;
  const portalSize = portalActive ? ((progress - 0.4) / 0.6) * 140 : 0;

  const flash = progress > 0.78 ? Math.min(1, (progress - 0.78) / 0.12) : 0;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: '350vh' }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100vh', zIndex: 10 }}>

        {/* Dark bg */}
        <div className="absolute inset-0 bg-[var(--color-brand-dark)]" />

        {/* Golden glow behind lion */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: `${glowRadius}px`,
            height: `${glowRadius}px`,
            background: `radial-gradient(circle,
              rgba(229,159,43,${glowStrength * 0.35}) 0%,
              rgba(255,210,117,${glowStrength * 0.15}) 35%,
              transparent 70%)`,
          }}
        />

        {/* ─── The lion (canvas with true transparency) ─── */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformOrigin: `${FOCAL_X}% ${FOCAL_Y}%`,
            transform: `scale(${scale})`,
            willChange: 'transform',
          }}
        >
          <canvas
            ref={canvasRef}
            className="pointer-events-none select-none"
            style={{
              opacity: ready ? lionOpacity : 0,
              filter: `
                brightness(${brightness})
                drop-shadow(0 0 ${10 + glowStrength * 40}px rgba(229,159,43,${0.4 + glowStrength * 0.5}))
                drop-shadow(0 0 ${glowStrength * 80}px rgba(255,210,117,${glowStrength * 0.35}))
              `.trim(),
              transition: ready ? 'none' : 'opacity 0.5s ease',
            }}
          />
        </div>

        {/* Conic light rays */}
        {progress > 0.15 && progress < 0.85 && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: Math.min(1, (progress - 0.15) * 2.5),
              background: `conic-gradient(from 0deg at 50% 50%,
                transparent 0deg,
                rgba(229,159,43,${(progress - 0.15) * 0.1}) 12deg,
                transparent 24deg,
                rgba(255,210,117,${(progress - 0.15) * 0.07}) 72deg,
                transparent 84deg,
                rgba(229,159,43,${(progress - 0.15) * 0.1}) 132deg,
                transparent 144deg,
                rgba(255,210,117,${(progress - 0.15) * 0.07}) 192deg,
                transparent 204deg,
                rgba(229,159,43,${(progress - 0.15) * 0.1}) 252deg,
                transparent 264deg,
                rgba(255,210,117,${(progress - 0.15) * 0.07}) 312deg,
                transparent 324deg,
                transparent 360deg)`,
            }}
          />
        )}

        {/* Light portal */}
        {portalActive && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: `${portalSize}vmax`,
              height: `${portalSize}vmax`,
              background: `radial-gradient(circle,
                rgba(255,255,255,${portalOpacity * 0.9}) 0%,
                rgba(255,210,117,${portalOpacity * 0.5}) 25%,
                rgba(229,159,43,${portalOpacity * 0.25}) 50%,
                transparent 75%)`,
            }}
          />
        )}

        {/* Scroll hint */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 transition-opacity duration-500"
          style={{ opacity: progress < 0.08 ? 1 : 0 }}
        >
          <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-zinc-500">
            Scroll to explore
          </span>
          <div className="w-5 h-8 rounded-full border border-zinc-600 flex items-start justify-center p-1.5">
            <div className="w-0.5 h-2 bg-[var(--color-brand-accent)] rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* ─── Overlay: dark → white → transparent ─── 
           Phase 1 (0–0.75): solid dark — hides hero during zoom
           Phase 2 (0.75–0.88): transitions to white — the flash
           Phase 3 (0.88–1.0): white fades out — reveals the hero
      */}
      {progress < 1 && (() => {
        // How white vs dark is the overlay
        const whiteBlend = progress < 0.75 ? 0 : Math.min(1, (progress - 0.75) / 0.13);
        // Overall opacity
        const overlayAlpha = progress < 0.88 ? 1 : Math.max(0, 1 - (progress - 0.88) / 0.12);

        // Interpolate from dark (#0A0A09) to white (#FFFFFF)
        const r = Math.round(10 + (255 - 10) * whiteBlend);
        const g = Math.round(10 + (255 - 10) * whiteBlend);
        const b = Math.round(9 + (255 - 9) * whiteBlend);

        return (
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              background: `rgb(${r},${g},${b})`,
              opacity: overlayAlpha,
              zIndex: 5,
            }}
          />
        );
      })()}
    </div>
  );
}
