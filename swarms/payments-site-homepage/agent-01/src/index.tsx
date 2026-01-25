import { createRoot } from 'react-dom/client';
import { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import './index.css';

/**
 * HOMEPAGE LOGIN - DESIGN CANVAS
 * 
 * Read SWARM_SPEC.md for full design brief and phase instructions.
 * 
 * This file contains ONLY the form structure. 
 * Your job: Build the light experience around it.
 * 
 * QUICK REFERENCE:
 * 
 * Color Palette:
 *   Mauve: #C99CAD | Blue: #8FA9B3 | Terracotta: #C9A68A
 *   Deep Pink: #9C528B | Dark: #0f0f0f to #1f1f1f
 * 
 * Available Assets:
 *   /assets/media/pdf-viewer-bg-art-1.webp
 *   /assets/media/pdf-viewer-bg-art-2.webp
 *   /assets/media/pdf-viewer-bg-art-3.webp
 * 
 * Tailwind Classes Available:
 *   Colors: portfolio-accent-mauve, portfolio-accent-blue, etc.
 *   Fonts: font-agency
 *   Shadows: shadow-glow
 *   See tailwind.config.js for full list
 * 
 * DO NOT CHANGE:
 *   - Form field names/structure
 *   - Submit handler logic
 *   - Required form elements
 * 
 * START HERE:
 *   Phase 1 - Make light follow cursor. Make card exist.
 */

function LoginApp() {
  const [lastName, setLastName] = useState('');
  const [projectKeyword, setProjectKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock submit handler - DO NOT CHANGE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      if (!lastName || !projectKeyword) {
        setError('Please fill in all fields.');
      } else {
        setError('Login successful! (Design preview mode)');
      }
      setLoading(false);
    }, 1000);
  };

  // ============================================
  // PHASE 1: Cursor-following light
  // ============================================

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const lightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  // ============================================
  // PHASE 2: Light-card interaction
  // ============================================

  const cardRef = useRef<HTMLDivElement>(null);
  const [cardBounds, setCardBounds] = useState<DOMRect | null>(null);
  const [lightIntensity, setLightIntensity] = useState(1);
  const [cardLightPos, setCardLightPos] = useState({ x: 0, y: 0, distance: 1000 });

  // ============================================
  // PHASE 4: Polish - The Unexpected
  // ============================================

  const [isIdle, setIsIdle] = useState(false);
  const [breathPhase, setBreathPhase] = useState(0);
  const idleTimerRef = useRef<number | undefined>(undefined);
  const lastMoveTime = useRef(Date.now());
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Detect touch device on mount
  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
  }, []);

  // Update card bounds on mount and resize (debounced for performance)
  useEffect(() => {
    let resizeTimeout: number | undefined;

    const updateCardBounds = () => {
      if (cardRef.current) {
        setCardBounds(cardRef.current.getBoundingClientRect());
      }
    };

    const debouncedResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(updateCardBounds, 150);
    };

    updateCardBounds();
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);

  // PHASE 4: Breathing effect when idle
  useEffect(() => {
    if (prefersReducedMotion) return;

    let breathAnimationFrame: number;
    const startTime = Date.now();

    const animateBreath = () => {
      if (isIdle) {
        const elapsed = Date.now() - startTime;
        // Slow, gentle sine wave for breathing
        const phase = Math.sin(elapsed / 2000) * 0.5 + 0.5; // 0-1 range, 4s cycle
        setBreathPhase(phase);
      }
      breathAnimationFrame = requestAnimationFrame(animateBreath);
    };

    breathAnimationFrame = requestAnimationFrame(animateBreath);
    return () => cancelAnimationFrame(breathAnimationFrame);
  }, [isIdle, prefersReducedMotion]);

  useEffect(() => {
    // Initialize position to center (or card center for touch devices)
    const initX = window.innerWidth / 2;
    const initY = window.innerHeight / 2;
    currentPos.current = { x: initX, y: initY };
    targetPos.current = { x: initX, y: initY };

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = Date.now();
      setIsIdle(false);

      // Reset idle timer
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        setIsIdle(true);
      }, 3000); // 3 seconds of no movement
    };

    // PHASE 4: Touch support - center light on card
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        targetPos.current = { x: touch.clientX, y: touch.clientY };
        lastMoveTime.current = Date.now();
        setIsIdle(false);
      }
    };

    // Smooth animation loop for 60fps tracking
    const animate = () => {
      if (prefersReducedMotion) {
        // Instant follow for reduced motion
        currentPos.current = targetPos.current;
      } else {
        // PHASE 4: Improved easing with custom cubic-bezier feel
        const ease = isTouchDevice ? 0.12 : 0.15;
        currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
        currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;
      }

      // PHASE 4: For touch devices, center on card when no touch
      if (isTouchDevice && cardBounds && Date.now() - lastMoveTime.current > 1000) {
        const cardCenterX = cardBounds.left + cardBounds.width / 2;
        const cardCenterY = cardBounds.top + cardBounds.height / 2;
        targetPos.current = { x: cardCenterX, y: cardCenterY };
      }

      setMousePos({ x: currentPos.current.x, y: currentPos.current.y });

      // PHASE 2: Calculate distance from light to card
      if (cardBounds) {
        const cardCenterX = cardBounds.left + cardBounds.width / 2;
        const cardCenterY = cardBounds.top + cardBounds.height / 2;

        const dx = currentPos.current.x - cardCenterX;
        const dy = currentPos.current.y - cardCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Light intensifies as it gets closer to card (within 400px)
        const maxDistance = 400;
        const intensity = Math.max(0, 1 - distance / maxDistance);
        setLightIntensity(intensity);

        // Calculate relative position for card's localized lighting
        const relativeX = (currentPos.current.x - cardBounds.left) / cardBounds.width;
        const relativeY = (currentPos.current.y - cardBounds.top) / cardBounds.height;

        setCardLightPos({
          x: relativeX,
          y: relativeY,
          distance
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    // Start idle timer
    idleTimerRef.current = window.setTimeout(() => {
      setIsIdle(true);
    }, 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [prefersReducedMotion, cardBounds, isTouchDevice]);

  // PHASE 3: Color cycling for light character
  const lightHue = (mousePos.x / window.innerWidth) * 60; // Shift between palette colors

  // PHASE 4: Breathing effect when idle
  const breathIntensity = isIdle ? breathPhase * 0.15 : 0; // Subtle 15% intensity variation

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative" role="main">
      {/* PHASE 3: Background Atmosphere */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#1a1014] to-[#0f0f0f]" />

      {/* Ambient depth - subtle color field */}
      <div
        className="fixed inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(
              ellipse 1200px 800px at 40% 50%,
              rgba(156, 82, 139, 0.08),
              transparent 60%
            ),
            radial-gradient(
              ellipse 1000px 700px at 70% 40%,
              rgba(143, 169, 179, 0.06),
              transparent 60%
            )
          `
        }}
      />

      {/* Light source - PHASE 4: Optimized with breathing */}
      {/* Outer bloom - atmospheric */}
      <div
        data-light-layer="bloom"
        className="pointer-events-none fixed inset-0"
        style={{
          background: `
            radial-gradient(
              ${800 - lightIntensity * 120 + breathIntensity * 80}px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(201, 156, 173, ${0.06 + lightIntensity * 0.04 + breathIntensity}),
              transparent 50%
            )
          `,
          filter: 'blur(40px)',
          willChange: isIdle ? 'auto' : 'transform',
        }}
      />
      {/* Main light layer */}
      <div
        ref={lightRef}
        data-light-layer="main"
        className="pointer-events-none fixed inset-0"
        style={{
          background: `
            radial-gradient(
              ${600 - lightIntensity * 100 + breathIntensity * 60}px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(${201 + lightHue}, ${156 - lightHue * 0.5}, ${173 + lightHue * 0.3}, ${0.18 + lightIntensity * 0.15 + breathIntensity * 0.8}),
              rgba(201, 156, 173, ${0.08 + lightIntensity * 0.1 + breathIntensity * 0.5}) 40%,
              transparent 70%
            )
          `,
          willChange: isIdle ? 'auto' : 'transform',
        }}
      />
      {/* Inner glow - bright core with color shift */}
      <div
        data-light-layer="glow"
        className="pointer-events-none fixed inset-0"
        style={{
          background: `
            radial-gradient(
              ${200 - lightIntensity * 50 + breathIntensity * 40}px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(255, ${245 - lightHue}, ${240 + lightHue * 0.5}, ${0.12 + lightIntensity * 0.18 + breathIntensity * 0.6}),
              rgba(${201 + lightHue * 0.5}, 156, ${173 + lightHue}, ${0.06 + lightIntensity * 0.12 + breathIntensity * 0.4}) 50%,
              transparent 100%
            )
          `,
          willChange: isIdle ? 'auto' : 'transform',
        }}
      />
      {/* Specular highlight - sharp center */}
      <div
        data-light-layer="specular"
        className="pointer-events-none fixed inset-0"
        style={{
          background: `
            radial-gradient(
              ${60 + lightIntensity * 40 + breathIntensity * 20}px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(255, 255, 255, ${lightIntensity * 0.25 + breathIntensity * 0.4}),
              transparent 60%
            )
          `,
          willChange: isIdle ? 'auto' : 'transform',
        }}
      />

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        {/* PHASE 4: Card glow halo with breathing */}
        <div
          className="absolute inset-0 rounded-2xl blur-3xl opacity-40 transition-opacity duration-1000"
          style={{
            background: `
              radial-gradient(
                ${600 + breathIntensity * 100}px circle at ${cardLightPos.x * 100}% ${cardLightPos.y * 100}%,
                rgba(156, 82, 139, ${lightIntensity * 0.3 + breathIntensity * 0.2}),
                transparent 70%
              )
            `,
            willChange: isIdle ? 'auto' : 'transform',
          }}
        />

        <div
          ref={cardRef}
          data-card
          className="relative overflow-hidden rounded-2xl"
          style={{
            boxShadow: `
              ${(cardLightPos.x - 0.5) * -20}px
              ${(cardLightPos.y - 0.5) * -20}px
              80px
              rgba(0, 0, 0, ${0.5 + lightIntensity * 0.3}),
              inset 0 1px 2px rgba(255, 255, 255, 0.03)
            `,
          }}
        >
          {/* PHASE 3: Material - frosted glass with depth */}
          {/* Base material layer - semi-transparent with blur */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1f1f1f]/95 via-[#1a1a1a]/90 to-[#1f1f1f]/95 backdrop-blur-xl" />

          {/* Noise texture for material depth */}
          <div
            className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            }}
          />

          {/* Edge rim light - always visible, subtle */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `
                linear-gradient(135deg,
                  rgba(143, 169, 179, 0.12) 0%,
                  transparent 30%,
                  transparent 70%,
                  rgba(156, 82, 139, 0.08) 100%
                )
              `,
            }}
          />

          {/* Border with gradient */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/5">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `
                  linear-gradient(
                    ${Math.atan2(cardLightPos.y - 0.5, cardLightPos.x - 0.5) * (180 / Math.PI) + 90}deg,
                    rgba(201, 156, 173, ${lightIntensity * 0.4}),
                    transparent 40%
                  )
                `,
                WebkitMaskImage: 'linear-gradient(white, white)',
                maskImage: 'linear-gradient(white, white)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
          </div>

          {/* Localized edge lighting - follows cursor position */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `
                radial-gradient(
                  450px circle at ${cardLightPos.x * 100}% ${cardLightPos.y * 100}%,
                  rgba(${201 + lightHue}, ${156 - lightHue * 0.5}, ${173 + lightHue * 0.3}, ${lightIntensity * 0.35}),
                  rgba(201, 156, 173, ${lightIntensity * 0.12}) 30%,
                  transparent 60%
                )
              `,
            }}
          />

          {/* Surface reflection - bright spot where light hits */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `
                radial-gradient(
                  180px circle at ${cardLightPos.x * 100}% ${cardLightPos.y * 100}%,
                  rgba(255, 255, 255, ${lightIntensity * 0.18}),
                  rgba(255, 255, 255, ${lightIntensity * 0.06}) 40%,
                  transparent 60%
                )
              `,
              filter: 'blur(1px)',
            }}
          />

          {/* Specular highlight - sharp reflection */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `
                radial-gradient(
                  60px circle at ${cardLightPos.x * 100}% ${cardLightPos.y * 100}%,
                  rgba(255, 255, 255, ${lightIntensity * 0.25}),
                  transparent 50%
                )
              `,
            }}
          />
          {/* Content wrapper - above all material layers */}
          <div className="relative z-10 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-agency text-4xl font-bold text-white mb-2 tracking-wider drop-shadow-lg">
                Horvath Payments
              </h1>
              <p className="text-white/70 text-sm">
                Login to access your contract and invoices.
              </p>
            </div>

            {/* Form - Keep structure, style freely */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <input
                  type="text"
                  className="w-full bg-[#0f0f0f]/80 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 transition-all duration-300 ease-out focus:outline-none focus:border-[#C99CAD]/60 focus:ring-2 focus:ring-[#C99CAD]/30 focus:bg-[#0f0f0f]/95 focus:shadow-lg focus:shadow-[#C99CAD]/10 hover:border-white/20 hover:bg-[#0f0f0f]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  disabled={loading}
                  aria-label="Last Name"
                  autoComplete="family-name"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="w-full bg-[#0f0f0f]/80 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 transition-all duration-300 ease-out focus:outline-none focus:border-[#C99CAD]/60 focus:ring-2 focus:ring-[#C99CAD]/30 focus:bg-[#0f0f0f]/95 focus:shadow-lg focus:shadow-[#C99CAD]/10 hover:border-white/20 hover:bg-[#0f0f0f]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Project Keyword"
                  value={projectKeyword}
                  onChange={e => setProjectKeyword(e.target.value)}
                  disabled={loading}
                  aria-label="Project Keyword"
                  autoComplete="off"
                />
                <p className="text-xs text-white/50 mt-2 text-center" id="keyword-hint">
                  Use the keyword from your notification email.
                </p>
              </div>

              {error && (
                <div
                  className={`p-3 rounded-lg text-sm text-center animate-fade-in-up ${
                    error.includes('successful')
                      ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border border-red-500/30 text-red-400'
                  }`}
                  role="alert"
                  aria-live="polite"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#C99CAD] to-[#9C528B] hover:from-[#C99CAD]/90 hover:to-[#9C528B]/90 text-[#0f0f0f] font-semibold py-3 rounded-lg transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg shadow-[#C99CAD]/20 hover:shadow-xl hover:shadow-[#C99CAD]/30 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#C99CAD]/50 focus:ring-offset-2 focus:ring-offset-[#1f1f1f] hover:scale-[1.01] active:shadow-md"
                aria-label={loading ? 'Loading...' : 'Access Portal'}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" aria-hidden="true" />
                    <span className="sr-only">Loading...</span>
                  </>
                ) : (
                  'Access Portal'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-white/50 mt-8 relative z-10">
          Need help? Contact{' '}
          <a
            href="mailto:sean@august.style"
            className="text-[#C99CAD] hover:text-[#C99CAD]/80 transition-all duration-200 ease-out underline decoration-[#C99CAD]/30 hover:decoration-[#C99CAD]/60 focus:outline-none focus:ring-2 focus:ring-[#C99CAD]/40 focus:rounded px-1 -mx-1"
          >
            sean@august.style
          </a>
        </p>
      </div>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<LoginApp />);
}
