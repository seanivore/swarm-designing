import { createRoot } from 'react-dom/client';
import { useState, useEffect, useRef, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import './index.css';

/**
 * AGENT-02 - Phase 4: Polish
 *
 * Light Concept: Volumetric atmospheric light with subtle breathing pulse
 * Material Concept: Frosted translucent glass with cast shadow
 * The Unexpected: Card casts a soft shadow when light passes behind it
 *
 * Polish details:
 * - Breathing pulse animation on light core
 * - Cast shadow creates depth perception
 * - Custom easing curves for organic movement
 * - Enhanced micro-interactions
 * - Full accessibility support
 * - Touch device fallback
 * - Performance optimizations
 */

function LoginApp() {
  const [lastName, setLastName] = useState('');
  const [projectKeyword, setProjectKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Light position state - eased position for smooth movement
  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  // Button flash effect on submit
  const [buttonFlash, setButtonFlash] = useState(false);

  // Card reference for proximity calculations
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardBounds, setCardBounds] = useState<DOMRect | null>(null);

  // Detect touch device
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Update card bounds on mount and resize
  useEffect(() => {
    const updateBounds = () => {
      if (cardRef.current) {
        setCardBounds(cardRef.current.getBoundingClientRect());
      }
    };
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  // Calculate light interaction with card - memoized for performance
  const getLightInteraction = useMemo(() => {
    if (!cardBounds) return {
      distanceToCard: 1000,
      isNearCard: false,
      isBehindCard: false,
      lightAngle: 0,
      normalizedX: 0.5,
      normalizedY: 0.5,
      shadowOffsetX: 0,
      shadowOffsetY: 0
    };

    const cardCenterX = cardBounds.left + cardBounds.width / 2;
    const cardCenterY = cardBounds.top + cardBounds.height / 2;

    const dx = lightPos.x - cardCenterX;
    const dy = lightPos.y - cardCenterY;
    const distanceToCard = Math.sqrt(dx * dx + dy * dy);

    // Calculate angle of light relative to card
    const lightAngle = Math.atan2(dy, dx);

    // Normalize light position relative to card (0-1 range)
    const normalizedX = (lightPos.x - cardBounds.left) / cardBounds.width;
    const normalizedY = (lightPos.y - cardBounds.top) / cardBounds.height;

    // Check if light is "behind" the card (creates shadow effect)
    const isBehindCard = normalizedX > -0.3 && normalizedX < 1.3 &&
                          normalizedY > -0.3 && normalizedY < 1.3 &&
                          distanceToCard < 500;

    // Calculate shadow offset based on light position
    const shadowOffsetX = (cardCenterX - lightPos.x) * 0.02;
    const shadowOffsetY = (cardCenterY - lightPos.y) * 0.02;

    return {
      distanceToCard,
      isNearCard: distanceToCard < 400,
      isBehindCard,
      lightAngle,
      normalizedX: Math.max(0, Math.min(1, normalizedX)),
      normalizedY: Math.max(0, Math.min(1, normalizedY)),
      shadowOffsetX,
      shadowOffsetY
    };
  }, [lightPos, cardBounds]);

  // Calculate light scattering based on proximity to card
  const scatterFactor = getLightInteraction.isNearCard
    ? 1 - Math.min(1, getLightInteraction.distanceToCard / 400)
    : 0;

  // Track mouse/touch position and animate light toward it
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    // Eased animation loop - light follows cursor with slight delay
    const animate = () => {
      setLightPos(prev => {
        const dx = targetPos.current.x - prev.x;
        const dy = targetPos.current.y - prev.y;

        // Use custom easing for more organic movement
        const ease = prefersReducedMotion ? 1 : 0.08;
        const easedDx = dx * ease;
        const easedDy = dy * ease;

        return {
          x: prev.x + easedDx,
          y: prev.y + easedDy
        };
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize position - center on card if touch device, otherwise center of screen
    if (isTouchDevice && cardBounds) {
      targetPos.current = {
        x: cardBounds.left + cardBounds.width / 2,
        y: cardBounds.top + cardBounds.height / 2
      };
      setLightPos({
        x: cardBounds.left + cardBounds.width / 2,
        y: cardBounds.top + cardBounds.height / 2
      });
    } else {
      targetPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      setLightPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (!prefersReducedMotion) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isTouchDevice, cardBounds, prefersReducedMotion]);

  // Mock submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Button flash effect
    setButtonFlash(true);
    setTimeout(() => setButtonFlash(false), 300);

    setTimeout(() => {
      if (!lastName || !projectKeyword) {
        setError('Please fill in all fields.');
      } else {
        setError('Login successful! (Design preview mode)');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background atmosphere - layered gradients for depth */}
      <div className="fixed inset-0 bg-[#0f0f0f]" />

      {/* Subtle environmental glow - terracotta warmth in bottom left */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 1200px 800px at 10% 90%, rgba(201, 166, 138, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse 1000px 1000px at 90% 10%, rgba(143, 169, 179, 0.02) 0%, transparent 50%)
          `
        }}
      />

      {/* Background art - very subtle */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'url(/assets/media/pdf-viewer-bg-art-1.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'screen'
        }}
      />

      {/* VOLUMETRIC LIGHT - Enhanced with breathing pulse */}

      {/* Far haze - atmospheric depth layer */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: lightPos.x,
          top: lightPos.y,
          width: 900,
          height: 900,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle,
            rgba(201, 156, 173, ${0.03 + scatterFactor * 0.02}) 0%,
            transparent 70%)`,
          filter: 'blur(80px)',
          opacity: prefersReducedMotion ? 0.7 : undefined,
          animation: prefersReducedMotion ? 'none' : 'breathe 4s ease-in-out infinite',
          willChange: 'transform',
          zIndex: 1
        }}
      />

      {/* Outer bloom - diffuse layer */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: lightPos.x,
          top: lightPos.y,
          width: 600 + (scatterFactor * 200),
          height: 600 + (scatterFactor * 200),
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle,
            rgba(${scatterFactor > 0.3 ? '143, 169, 179' : '201, 156, 173'}, ${0.12 + scatterFactor * 0.05}) 0%,
            rgba(${scatterFactor > 0.3 ? '143, 169, 179' : '201, 156, 173'}, ${0.04 + scatterFactor * 0.03}) 40%,
            transparent 70%)`,
          filter: `blur(${40 + scatterFactor * 30}px)`,
          opacity: 0.85 + scatterFactor * 0.15 + (buttonFlash ? 0.3 : 0),
          willChange: 'transform, opacity',
          zIndex: 2,
          transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease-out'
        }}
      />

      {/* Mid bloom - body of light */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: lightPos.x,
          top: lightPos.y,
          width: 350 + (scatterFactor * 150),
          height: 350 + (scatterFactor * 150),
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle,
            rgba(${scatterFactor > 0.3 ? '143, 169, 179' : '201, 156, 173'}, ${0.22 + scatterFactor * 0.1}) 0%,
            rgba(${scatterFactor > 0.3 ? '143, 169, 179' : '201, 156, 173'}, ${0.08 + scatterFactor * 0.04}) 50%,
            transparent 70%)`,
          filter: `blur(${20 + scatterFactor * 25}px)`,
          opacity: 1 + (buttonFlash ? 0.4 : 0),
          willChange: 'transform, opacity',
          zIndex: 3,
          transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease-out'
        }}
      />

      {/* Inner glow - transition to core */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: lightPos.x,
          top: lightPos.y,
          width: 180 + (scatterFactor * 60),
          height: 180 + (scatterFactor * 60),
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle,
            rgba(${scatterFactor > 0.4 ? '143, 169, 179' : '201, 156, 173'}, ${0.3 + scatterFactor * 0.08}) 0%,
            rgba(156, 82, 139, ${0.15 + scatterFactor * 0.05}) 40%,
            transparent 70%)`,
          filter: `blur(${12 + scatterFactor * 15}px)`,
          opacity: 1 + (buttonFlash ? 0.5 : 0),
          animation: prefersReducedMotion ? 'none' : 'breathe 4s ease-in-out infinite 0.5s',
          willChange: 'transform, opacity',
          zIndex: 4,
          transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease-out'
        }}
      />

      {/* Core light - brightest center with breathing pulse */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: lightPos.x,
          top: lightPos.y,
          width: 120 + (scatterFactor * 40),
          height: 120 + (scatterFactor * 40),
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle,
            rgba(255, 255, 255, ${0.15 - scatterFactor * 0.05 + (buttonFlash ? 0.3 : 0)}) 0%,
            rgba(156, 82, 139, ${0.25 + scatterFactor * 0.08 + (buttonFlash ? 0.2 : 0)}) 25%,
            rgba(${scatterFactor > 0.3 ? '143, 169, 179' : '201, 156, 173'}, ${0.2 + scatterFactor * 0.06}) 50%,
            transparent 70%)`,
          filter: `blur(${6 + scatterFactor * 10}px)`,
          animation: prefersReducedMotion ? 'none' : 'breathe 4s ease-in-out infinite 1s',
          willChange: 'transform, opacity',
          zIndex: 5,
          transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />

      {/* Login Card - Frosted glass material with cast shadow */}
      <div className="w-full max-w-md relative z-10" ref={cardRef}>
        {/* THE UNEXPECTED: Soft shadow cast when light passes behind card */}
        {getLightInteraction.isBehindCard && !prefersReducedMotion && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: `translate(${getLightInteraction.shadowOffsetX}px, ${getLightInteraction.shadowOffsetY}px)`,
              opacity: Math.min(0.4, scatterFactor * 0.6),
              filter: 'blur(40px)',
              background: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '1rem',
              zIndex: -1,
              transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        )}

        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            // Layered shadows for depth
            boxShadow: `
              0 0 0 1px rgba(255, 255, 255, 0.08),
              0 8px 32px rgba(0, 0, 0, 0.4),
              0 2px 8px rgba(0, 0, 0, 0.3),
              inset 0 0 0 1px rgba(255, 255, 255, 0.05)
            `
          }}
        >
          {/* Frosted glass backdrop */}
          <div
            className="absolute inset-0 bg-[#1a1a1a]/60"
            style={{
              backdropFilter: 'blur(20px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(20px) saturate(1.2)'
            }}
          />

          {/* Subtle noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px'
            }}
          />

          {/* Surface light reflection - localized gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: cardBounds ? `
                radial-gradient(
                  700px circle at ${getLightInteraction.normalizedX * 100}% ${getLightInteraction.normalizedY * 100}%,
                  rgba(201, 156, 173, ${0.12 * scatterFactor}) 0%,
                  rgba(143, 169, 179, ${0.06 * scatterFactor}) 25%,
                  rgba(156, 82, 139, ${0.03 * scatterFactor}) 40%,
                  transparent 65%
                )
              ` : 'transparent',
              transition: 'background 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />

          {/* Edge light catching - enhanced with smooth transitions */}
          {cardBounds && scatterFactor > 0.2 && (
            <>
              {/* Top edge */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
                style={{
                  background: `linear-gradient(90deg,
                    transparent 0%,
                    rgba(201, 156, 173, ${0.5 * scatterFactor * (1 - Math.abs(getLightInteraction.normalizedX - 0.5) * 2)}) ${(getLightInteraction.normalizedX * 100) - 5}%,
                    rgba(255, 255, 255, ${0.4 * scatterFactor * (1 - Math.abs(getLightInteraction.normalizedX - 0.5) * 2)}) ${getLightInteraction.normalizedX * 100}%,
                    rgba(201, 156, 173, ${0.5 * scatterFactor * (1 - Math.abs(getLightInteraction.normalizedX - 0.5) * 2)}) ${(getLightInteraction.normalizedX * 100) + 5}%,
                    transparent 100%)`,
                  opacity: getLightInteraction.normalizedY < 0.5 ? scatterFactor : scatterFactor * 0.3,
                  boxShadow: `0 0 8px rgba(201, 156, 173, ${0.3 * scatterFactor})`,
                  transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />

              {/* Bottom edge */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none"
                style={{
                  background: `linear-gradient(90deg,
                    transparent 0%,
                    rgba(201, 156, 173, ${0.5 * scatterFactor * (1 - Math.abs(getLightInteraction.normalizedX - 0.5) * 2)}) ${(getLightInteraction.normalizedX * 100) - 5}%,
                    rgba(255, 255, 255, ${0.4 * scatterFactor * (1 - Math.abs(getLightInteraction.normalizedX - 0.5) * 2)}) ${getLightInteraction.normalizedX * 100}%,
                    rgba(201, 156, 173, ${0.5 * scatterFactor * (1 - Math.abs(getLightInteraction.normalizedX - 0.5) * 2)}) ${(getLightInteraction.normalizedX * 100) + 5}%,
                    transparent 100%)`,
                  opacity: getLightInteraction.normalizedY > 0.5 ? scatterFactor : scatterFactor * 0.3,
                  boxShadow: `0 0 8px rgba(201, 156, 173, ${0.3 * scatterFactor})`,
                  transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />

              {/* Left edge */}
              <div
                className="absolute top-0 bottom-0 left-0 w-[1px] pointer-events-none"
                style={{
                  background: `linear-gradient(180deg,
                    transparent 0%,
                    rgba(201, 156, 173, ${0.5 * scatterFactor * (1 - Math.abs(getLightInteraction.normalizedY - 0.5) * 2)}) ${(getLightInteraction.normalizedY * 100) - 5}%,
                    rgba(255, 255, 255, ${0.4 * scatterFactor * (1 - Math.abs(getLightInteraction.normalizedY - 0.5) * 2)}) ${getLightInteraction.normalizedY * 100}%,
                    rgba(201, 156, 173, ${0.5 * scatterFactor * (1 - Math.abs(getLightInteraction.normalizedY - 0.5) * 2)}) ${(getLightInteraction.normalizedY * 100) + 5}%,
                    transparent 100%)`,
                  opacity: getLightInteraction.normalizedX < 0.5 ? scatterFactor : scatterFactor * 0.3,
                  boxShadow: `0 0 8px rgba(201, 156, 173, ${0.3 * scatterFactor})`,
                  transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />

              {/* Right edge */}
              <div
                className="absolute top-0 bottom-0 right-0 w-[1px] pointer-events-none"
                style={{
                  background: `linear-gradient(180deg,
                    transparent 0%,
                    rgba(201, 156, 173, ${0.5 * scatterFactor * (1 - Math.abs(getLightInteraction.normalizedY - 0.5) * 2)}) ${(getLightInteraction.normalizedY * 100) - 5}%,
                    rgba(255, 255, 255, ${0.4 * scatterFactor * (1 - Math.abs(getLightInteraction.normalizedY - 0.5) * 2)}) ${getLightInteraction.normalizedY * 100}%,
                    rgba(201, 156, 173, ${0.5 * scatterFactor * (1 - Math.abs(getLightInteraction.normalizedY - 0.5) * 2)}) ${(getLightInteraction.normalizedY * 100) + 5}%,
                    transparent 100%)`,
                  opacity: getLightInteraction.normalizedX > 0.5 ? scatterFactor : scatterFactor * 0.3,
                  boxShadow: `0 0 8px rgba(201, 156, 173, ${0.3 * scatterFactor})`,
                  transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            </>
          )}

          {/* Card content */}
          <div className="relative p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-agency text-4xl font-bold text-white mb-2 tracking-wider drop-shadow-sm">
                Horvath Payments
              </h1>
              <p className="text-white/70 text-sm">
                Login to access your contract and invoices.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="lastName" className="sr-only">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40
                    hover:border-white/15 hover:bg-black/35
                    focus:outline-none focus:border-[#C99CAD]/60 focus:ring-2 focus:ring-[#C99CAD]/30 focus:bg-black/40
                    transition-all duration-300 ease-out backdrop-blur-sm"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  disabled={loading}
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="projectKeyword" className="sr-only">Project Keyword</label>
                <input
                  id="projectKeyword"
                  type="text"
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40
                    hover:border-white/15 hover:bg-black/35
                    focus:outline-none focus:border-[#C99CAD]/60 focus:ring-2 focus:ring-[#C99CAD]/30 focus:bg-black/40
                    transition-all duration-300 ease-out backdrop-blur-sm"
                  placeholder="Project Keyword"
                  value={projectKeyword}
                  onChange={e => setProjectKeyword(e.target.value)}
                  disabled={loading}
                  aria-required="true"
                  aria-describedby="keyword-help"
                />
                <p id="keyword-help" className="text-xs text-white/50 mt-2 text-center">
                  Use the keyword from your notification email.
                </p>
              </div>

              {error && (
                <div
                  className={`p-3 rounded-lg text-sm text-center backdrop-blur-sm transition-all duration-300 ease-out ${
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
                className="w-full bg-[#C99CAD] hover:bg-[#9C528B] active:scale-[0.98] text-[#0f0f0f] font-semibold py-3 rounded-lg
                  transition-all duration-300 ease-out
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex justify-center items-center gap-2
                  focus:outline-none focus:ring-2 focus:ring-[#C99CAD]/60 focus:ring-offset-2 focus:ring-offset-transparent
                  shadow-lg hover:shadow-xl hover:shadow-[#C99CAD]/20"
                aria-label="Access Portal"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Access Portal'}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-white/50 mt-8">
          Need help? Contact{' '}
          <a
            href="mailto:sean@august.style"
            className="text-[#C99CAD] hover:text-[#9C528B] transition-colors duration-200 focus:outline-none focus:underline focus:text-[#9C528B]"
          >
            sean@august.style
          </a>
        </p>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<LoginApp />);
}
