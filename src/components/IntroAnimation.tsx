import { useState, useEffect, useRef, useCallback } from 'react';

// ─── The Rickroll, formatted as code ──────────────────────────────────
const CODE_LINES = [
  `<!DOCTYPE html>`,
  `<html style="font-size: 10px;font-family: Roboto, Arial, sans-serif;" lang="en">`,
  `  <head>`,
  `    <script data-id="_gd" nonce="6wrE99xQvJf1K1MnYWx9Ig">`,
  `      window.WIZ_global_data = {"AfY8Hf":false,"FL1an":false,"HiPsbb":0,"MUE6Ne":"youtube_web","MuJWjd":false,"UUFaWc":"%.@.null,1000,2]","cfb2h":"youtube.web-front-end-critical_20260512.08_p0"};`,
  `    </script>`,
  `    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>`,
  `    <meta http-equiv="origin-trial" content="ApvK67ociHgr2egd6c2ZjrfPuRs8BHcvSggogIOPQNH7GJ3cVlyJ1NOq/COCdj0+zxskqHt9HgLLETc8qqD+vwsAAABteyJvcmlnaW4iOiJodHRwczovL3lvdXR1YmUuY29tOjQ0MyIsImZlYXR1cmUiOiJQcml2YWN5U2FuZGJveEFkc0FQSXMiLCJleHBpcnkiOjE2OTUxNjc5OTksImlzU3ViZG9tYWluIjp0cnVlfQ=="/>`,
  `    <script nonce="6wrE99xQvJf1K1MnYWx9Ig">`,
  `      var ytcfg={d:function(){return window.yt&&yt.config_||ytcfg.data_||(ytcfg.data_={})},get:function(k,o){return k in ytcfg.d()?ytcfg.d()[k]:o},set:function(){var a=arguments;if(a.length>1)ytcfg.d()[a[0]]=a[1];else{var k;for(k in a[0])ytcfg.d()[k]=a[0][k]}}};`,
  `      window.ytcfg.set('EMERGENCY_BASE_URL', '\\/error_204?t\\x3djserror\\x26level\\x3dERROR\\x26client.name\\x3d1\\x26client.version\\x3d2.20260515.01.00');`,
  `    </script>`,
  `    <title>Rick Roll Link - YouTube</title>`,
  `    <meta name="title" content="Rick Roll Link">`,
  `    <meta name="description" content="Git Rick RolledI do not own these videos or images, the all belong to Rick Astley.Rick Astley's Youtube channel: https://www.youtube.com/watch?v=dQw4w9WgXcQT...">`,
  `    <link rel="canonical" href="https://www.youtube.com/watch?v=Aq5WXmQQooo">`,
  `    <meta property="og:site_name" content="YouTube">`,
  `    <meta property="og:url" content="https://www.youtube.com/watch?v=Aq5WXmQQooo">`,
  `    <meta property="og:title" content="Rick Roll Link">`,
  `    <meta property="og:image" content="https://i.ytimg.com/vi/Aq5WXmQQooo/hqdefault.jpg">`,
  `    <meta property="og:description" content="Git Rick RolledI do not own these videos or images, the all belong to Rick Astley.Rick Astley's Youtube channel: https://www.youtube.com/watch?v=dQw4w9WgXcQT...">`,
  `    <meta property="og:type" content="video.other">`,
  `    <meta property="og:video:url" content="https://www.youtube.com/embed/Aq5WXmQQooo">`,
  `    <meta property="og:video:secure_url" content="https://www.youtube.com/embed/Aq5WXmQQooo">`,
  `    <meta property="og:video:type" content="text/html">`,
  `    <meta property="og:video:width" content="1280">`,
  `    <meta property="og:video:height" content="720">`,
  `    <meta property="al:ios:app_store_id" content="544007664">`,
  `    <meta property="al:ios:app_name" content="YouTube">`,
  `    <meta property="al:ios:url" content="vnd.youtube://www.youtube.com/watch?v=Aq5WXmQQooo&amp;feature=applinks">`,
  `    <meta property="al:android:url" content="vnd.youtube://www.youtube.com/watch?v=Aq5WXmQQooo&amp;feature=applinks">`,
  `    <meta property="al:android:app_name" content="YouTube">`,
  `    <meta property="al:android:package" content="com.google.android.youtube">`,
  `    <meta property="al:web:url" content="https://www.youtube.com/watch?v=Aq5WXmQQooo&amp;feature=applinks">`,
  `    <meta name="twitter:card" content="player">`,
  `    <meta name="twitter:site" content="@youtube">`,
  `    <meta name="twitter:url" content="https://www.youtube.com/watch?v=Aq5WXmQQooo">`,
  `    <meta name="twitter:title" content="Rick Roll Link">`,
  `    <meta name="twitter:description" content="Git Rick RolledI do not own these videos or images, the all belong to Rick Astley.Rick Astley's Youtube channel: https://www.youtube.com/watch?v=dQw4w9WgXcQT...">`,
  `    <meta name="twitter:image" content="https://i.ytimg.com/vi/Aq5WXmQQooo/hqdefault.jpg">`,
  `    <meta name="twitter:app:name:iphone" content="YouTube">`,
  `    <meta name="twitter:app:id:iphone" content="544007664">`,
  `    <meta name="twitter:app:name:ipad" content="YouTube">`,
  `    <meta name="twitter:app:id:ipad" content="544007664">`,
  `    <meta name="twitter:app:url:iphone" content="vnd.youtube://www.youtube.com/watch?v=Aq5WXmQQooo&amp;feature=applinks">`,
  `    <meta name="twitter:app:url:ipad" content="vnd.youtube://www.youtube.com/watch?v=Aq5WXmQQooo&amp;feature=applinks">`,
  `    <meta name="twitter:app:name:googleplay" content="YouTube">`,
  `    <meta name="twitter:app:id:googleplay" content="com.google.android.youtube">`,
  `    <meta name="twitter:app:url:googleplay" content="https://www.youtube.com/watch?v=Aq5WXmQQooo">`,
  `    <meta name="twitter:player" content="https://www.youtube.com/embed/Aq5WXmQQooo">`,
  `    <meta name="twitter:player:width" content="1280">`,
  `    <meta name="twitter:player:height" content="720">`,
  `    <meta name="theme-color" content="#ffffff">`,
  `    <link rel="shortcut icon" href="https://www.youtube.com/s/desktop/1c450372/img/favicon.ico" type="image/x-icon">`,
  `    <link rel="icon" href="https://www.youtube.com/s/desktop/1c450372/img/favicon_32.png" sizes="32x32">`,
  `    <link rel="icon" href="https://www.youtube.com/s/desktop/1c450372/img/favicon_48.png" sizes="48x48">`,
  `    <link rel="icon" href="https://www.youtube.com/s/desktop/1c450372/img/favicon_96.png" sizes="96x96">`,
  `    <link rel="icon" href="https://www.youtube.com/s/desktop/1c450372/img/favicon_144.png" sizes="144x144">`,
  `  </head>`,
  `  <body dir="ltr">`,
  `    <div id="body-container">`,
  `      <div id="a11y-announcer" aria-live="assertive"></div>`,
  `      <div id="page-container">`,
  `        <ytd-app>`,
  `          <ytd-masthead>`,
  `            <div id="container" class="style-scope ytd-masthead">`,
  `              <div id="start" class="style-scope ytd-masthead">`,
  `                <!-- Hamburger Menu -->`,
  `                <yt-icon-button id="guide-button" class="style-scope ytd-masthead"></yt-icon-button>`,
  `                <!-- YouTube Logo -->`,
  `                <ytd-topbar-logo-renderer class="style-scope ytd-masthead"></ytd-topbar-logo-renderer>`,
  `              </div>`,
  `              <div id="center" class="style-scope ytd-masthead">`,
  `                <!-- Search Box -->`,
  `                <ytd-searchbox class="style-scope ytd-masthead"></ytd-searchbox>`,
  `              </div>`,
  `              <div id="end" class="style-scope ytd-masthead">`,
  `                <!-- Right Actions -->`,
  `                <div id="buttons" class="style-scope ytd-masthead"></div>`,
  `              </div>`,
  `            </div>`,
  `          </ytd-masthead>`,
  `          <!-- Main Content -->`,
  `          <div id="content" class="style-scope ytd-app">`,
  `            <ytd-page-manager id="page-manager" class="style-scope ytd-app">`,
  `              <ytd-watch-flexy class="style-scope ytd-page-manager">`,
  `                <div id="columns" class="style-scope ytd-watch-flexy">`,
  `                  <div id="primary" class="style-scope ytd-watch-flexy">`,
  `                    <div id="primary-inner" class="style-scope ytd-watch-flexy">`,
  `                      <!-- Video Player Container -->`,
  `                      <div id="player" class="style-scope ytd-watch-flexy">`,
  `                        <div id="player-container" class="style-scope ytd-watch-flexy">`,
  `                          <div class="html5-video-player">`,
  `                            <!-- ACTUAL VIDEO ELEMENT -->`,
  `                            <video tabindex="-1" class="video-stream html5-main-video" controlslist="nodownload" style="width: 1280px; height: 720px;" src="blob:https://www.youtube.com/a4c95f15-8162-4293-8bc6-67500350d757"></video>`,
  `                          </div>`,
  `                        </div>`,
  `                      </div>`,
  `                      <!-- Video Info & Comments -->`,
  `                      <div id="below" class="style-scope ytd-watch-flexy">`,
  `                        <ytd-watch-metadata class="style-scope ytd-watch-flexy"></ytd-watch-metadata>`,
  `                        <ytd-comments id="comments" class="style-scope ytd-watch-flexy"></ytd-comments>`,
  `                      </div>`,
  `                    </div>`,
  `                  </div>`,
  `                  <!-- Recommended Videos Sidebar -->`,
  `                  <div id="secondary" class="style-scope ytd-watch-flexy">`,
  `                    <div id="secondary-inner" class="style-scope ytd-watch-flexy">`,
  `                      <ytd-watch-next-secondary-results-renderer class="style-scope ytd-watch-flexy"></ytd-watch-next-secondary-results-renderer>`,
  `                    </div>`,
  `                  </div>`,
  `                </div>`,
  `              </ytd-watch-flexy>`,
  `            </ytd-page-manager>`,
  `          </div>`,
  `        </ytd-app>`,
  `      </div>`,
  `    </div>`,
  `  </body>`,
  `</html>`,
  `// ██████████████████████████████████████████████████████`,
  `// █                                                  █`,
  `// █   HTML Payload Executed.                         █`,
  `// █   — Albright Digital Solutions, Austin TX         █`,
  `// █                                                  █`,
  `// ██████████████████████████████████████████████████████`,
  ``,
  `// Initializing awesomeness...`,
  `await AlbrightDigital.boot();`,
  `// ████████████████████████████ 100%`,
];

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'code' | 'glow' | 'flash' | 'zoom' | 'done'>('code');
  const [codeLines, setCodeLines] = useState<string[]>([]);
  const [currentChar, setCurrentChar] = useState('');
  const [brightness, setBrightness] = useState(0);
  const codeRef = useRef<HTMLDivElement>(null);
  const lineIndex = useRef(0);
  const charIndex = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // ─── Phase 1: Type out code ─────────────────────────────────────
  const typeCode = useCallback(() => {
    if (phase !== 'code') return;

    const line = CODE_LINES[lineIndex.current];
    if (!line && lineIndex.current >= CODE_LINES.length) {
      setPhase('glow');
      return;
    }

    if (charIndex.current <= (line?.length ?? 0)) {
      setCurrentChar(line?.substring(0, charIndex.current) ?? '');
      charIndex.current++;

      if (codeRef.current) {
        codeRef.current.scrollTop = codeRef.current.scrollHeight;
      }

      const delay = line?.[charIndex.current - 1] === ' ' ? 8 : Math.random() * 18 + 5;
      setTimeout(() => {
        animFrameRef.current = requestAnimationFrame(typeCode);
      }, delay);
    } else {
      setCodeLines(prev => [...prev, line ?? '']);
      setCurrentChar('');
      lineIndex.current++;
      charIndex.current = 0;

      setTimeout(() => {
        animFrameRef.current = requestAnimationFrame(typeCode);
      }, 25);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'code') {
      const timer = setTimeout(() => {
        animFrameRef.current = requestAnimationFrame(typeCode);
      }, 300);

      // Auto-advance to glow after 5s
      const autoAdvance = setTimeout(() => {
        setPhase('glow');
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearTimeout(autoAdvance);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      };
    }
  }, [phase, typeCode]);

  // ─── Phase 2: Logo glow brightens ──────────────────────────────
  useEffect(() => {
    if (phase !== 'glow') return;

    let frame = 0;
    const maxFrames = 90;

    const animate = () => {
      frame++;
      const progress = frame / maxFrames;
      setBrightness(progress);

      if (frame < maxFrames) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setPhase('flash');
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [phase]);

  // ─── Phase 3: Lightning flash ──────────────────────────────────
  useEffect(() => {
    if (phase !== 'flash') return;
    const timer = setTimeout(() => setPhase('zoom'), 350);
    return () => clearTimeout(timer);
  }, [phase]);

  // ─── Phase 4: Logo zooms to navbar ─────────────────────────────
  useEffect(() => {
    if (phase !== 'zoom') return;
    const timer = setTimeout(() => {
      setPhase('done');
      setTimeout(onComplete, 200);
    }, 1000);
    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  const handleSkip = () => {
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
      {/* ─── Full-page code layer ─── */}
      <div
        ref={codeRef}
        className="absolute inset-0 overflow-hidden px-4 py-6 sm:px-8 sm:py-8 md:px-16 md:py-12 font-mono text-[10px] sm:text-xs md:text-sm leading-relaxed transition-opacity duration-700"
        style={{
          opacity: phase === 'code' ? 1 : Math.max(0, 1 - brightness * 3),
        }}
      >
        <div className="max-w-4xl mx-auto">
          {codeLines.map((line, i) => (
            <div key={i} className="whitespace-pre">
              <span className="inline-block w-8 text-right mr-4 select-none" style={{ color: '#2a2a2a' }}>{i + 1}</span>
              <span style={{ color: getColor(line) }}>{line}</span>
            </div>
          ))}
          {currentChar !== undefined && phase === 'code' && (
            <div className="whitespace-pre">
              <span className="inline-block w-8 text-right mr-4 select-none" style={{ color: '#2a2a2a' }}>{codeLines.length + 1}</span>
              <span style={{ color: getColor(currentChar) }}>{currentChar}</span>
              <span className="animate-pulse" style={{ color: '#E59F2B' }}>&#9608;</span>
            </div>
          )}
        </div>
      </div>

      {/* ─── Logo center + glow ─── */}
      <div
        className="relative z-10 flex items-center justify-center"
        style={{
          transform: phase === 'zoom'
            ? 'translate(-42vw, -42vh) scale(0.12)'
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
            width: phase === 'code' ? '140px' : `${140 + brightness * 40}px`,
            height: phase === 'code' ? '140px' : `${140 + brightness * 40}px`,
            objectFit: 'contain',
            opacity: phase === 'code' ? Math.min(1, codeLines.length / 6) : 1,
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
      {phase === 'code' && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-zinc-700 text-[10px] tracking-[0.25em] uppercase animate-pulse select-none">
          Click to skip
        </div>
      )}
    </div>
  );
}

function getColor(line: string): string {
  const t = line.trim();
  if (t.startsWith('<!--') || t.startsWith('-->')) return '#4a7a4a';
  if (t.startsWith('<html') || t.startsWith('</html') || t.startsWith('<!DOCTYPE')) return '#c9a05c';
  if (t.startsWith('<script') || t.startsWith('</script')) return '#E59F2B';
  if (t.startsWith('<meta') || t.startsWith('<link')) return '#5c9e5c';
  if (t.startsWith('<body') || t.startsWith('</body') || t.startsWith('<head') || t.startsWith('</head')) return '#c9a05c';
  if (t.startsWith('<div') || t.startsWith('</div')) return '#5cae5c';
  if (t.startsWith('<ytd-') || t.startsWith('</ytd-') || t.startsWith('<yt-') || t.startsWith('</yt-')) return '#8ac47a';
  if (t.startsWith('//') && t.includes('█')) return '#E59F2B';
  if (t.includes('█')) return '#E59F2B';
  if (t === '') return 'transparent';
  return '#4a9a4a';
}
