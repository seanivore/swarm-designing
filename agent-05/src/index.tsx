import { createRoot } from 'react-dom/client';
import { useState, useRef, useEffect } from 'react';
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lightTrail, setLightTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [cardBounds, setCardBounds] = useState<DOMRect | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const lastTrailTime = useRef<number>(0);

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

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
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

  // Clean up light trail periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setLightTrail(prev => prev.slice(-8)); // Keep only last 8 trail points
    }, 100);
    return () => {
      clearInterval(interval);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Track cursor position for light effect (optimized with RAF)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePosition({ x, y });

      // Add light trail point (only if not reduced motion and not touch)
      if (!prefersReducedMotion && !isTouchDevice) {
        const now = Date.now();
        if (now - lastTrailTime.current > 50) { // Throttle trail creation
          setLightTrail(prev => [...prev, { x, y, id: now }]);
          lastTrailTime.current = now;
        }
      }
    });
  };

  // Calculate light-card interaction
  const getLightCardInteraction = () => {
    if (!cardBounds) return { distance: 1000, lightIntensity: 0.6, cardHighlight: { x: 50, y: 50, opacity: 0 } };

    const cardCenterX = cardBounds.left + cardBounds.width / 2;
    const cardCenterY = cardBounds.top + cardBounds.height / 2;

    // Distance from cursor to card center
    const dx = mousePosition.x - cardCenterX;
    const dy = mousePosition.y - cardCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate position relative to card (0-100%)
    const relativeX = ((mousePosition.x - cardBounds.left) / cardBounds.width) * 100;
    const relativeY = ((mousePosition.y - cardBounds.top) / cardBounds.height) * 100;

    // Light intensity increases when near card
    const proximityFactor = Math.max(0, 1 - distance / 400);
    const lightIntensity = 0.6 + (proximityFactor * 0.4); // 0.6 to 1.0

    // Card highlight calculation - only visible when light is close
    const highlightOpacity = Math.max(0, 1 - distance / 300);

    return {
      distance,
      lightIntensity,
      cardHighlight: {
        x: Math.max(0, Math.min(100, relativeX)),
        y: Math.max(0, Math.min(100, relativeY)),
        opacity: highlightOpacity,
      },
    };
  };

  const interaction = getLightCardInteraction();

  // ============================================
  // YOUR DESIGN STARTS HERE
  // ============================================

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onTouchStart={(e) => {
        if (isTouchDevice && e.touches[0]) {
          const touch = e.touches[0];
          setMousePosition({ x: touch.clientX, y: touch.clientY });
        }
      }}
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #1a1a1a 0%, #0f0f0f 50%, #0a0a0a 100%)',
      }}
    >
      {/* Background atmospheric gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(156, 82, 139, 0.03) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(143, 169, 179, 0.03) 0%, transparent 50%)',
        }}
      />

      {/* Light trail - The Unexpected Detail */}
      {!prefersReducedMotion && !isTouchDevice && lightTrail.map((point, index) => {
        const age = lightTrail.length - index;
        const opacity = (1 - age / lightTrail.length) * 0.3;
        const size = 150 + (1 - age / lightTrail.length) * 100;

        return (
          <div
            key={point.id}
            className="fixed pointer-events-none"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
              transform: 'translate(-50%, -50%)',
              width: `${size}px`,
              height: `${size}px`,
              background: 'radial-gradient(circle, rgba(201, 156, 173, 0.4) 0%, rgba(143, 169, 179, 0.2) 40%, transparent 70%)',
              filter: 'blur(40px)',
              opacity,
              transition: 'opacity 200ms ease-out',
              willChange: 'opacity',
            }}
          />
        );
      })}

      {/* Primary light source - core beam */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(201, 156, 173, 0.6) 0%, rgba(156, 82, 139, 0.3) 20%, transparent 60%)',
          filter: 'blur(40px)',
          opacity: interaction.lightIntensity * 0.8,
          transition: prefersReducedMotion ? 'none' : 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Secondary light - bloom effect */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(143, 169, 179, 0.3) 0%, rgba(201, 156, 173, 0.15) 30%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: interaction.lightIntensity * 0.5,
          transition: prefersReducedMotion ? 'none' : 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Outer glow - atmospheric diffusion */}
      <div
        className="fixed pointer-events-none z-0"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '1000px',
          background: 'radial-gradient(circle, rgba(156, 82, 139, 0.15) 0%, transparent 60%)',
          filter: 'blur(120px)',
          opacity: interaction.lightIntensity * 0.3,
          transition: prefersReducedMotion ? 'none' : 'opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Login Card - Style this, but keep the structure */}
      <div className="w-full max-w-md relative z-10">
        {/* Card shadow - responds to light position */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            transform: `translate(${(interaction.cardHighlight.x - 50) * -0.15}px, ${(interaction.cardHighlight.y - 50) * -0.15}px)`,
            background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.6) 0%, transparent 70%)',
            filter: 'blur(30px)',
            opacity: 0.8,
            transition: prefersReducedMotion ? 'none' : 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform',
          }}
        />

        <div
          ref={cardRef}
          className="p-8 rounded-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(31, 31, 31, 0.95) 0%, rgba(25, 25, 25, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Frosted glass inner glow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 60%)',
            }}
          />

          {/* Localized light reflection on card surface */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              opacity: interaction.cardHighlight.opacity * 0.6,
              background: `radial-gradient(circle 400px at ${interaction.cardHighlight.x}% ${interaction.cardHighlight.y}%, rgba(201, 156, 173, 0.25) 0%, rgba(156, 82, 139, 0.1) 30%, transparent 60%)`,
              transition: prefersReducedMotion ? 'none' : 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'opacity',
            }}
          />

          {/* Edge highlight - follows light position with refraction */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              opacity: interaction.cardHighlight.opacity * 0.9,
              background: `radial-gradient(circle 250px at ${interaction.cardHighlight.x}% ${interaction.cardHighlight.y}%, rgba(143, 169, 179, 0.4) 0%, rgba(201, 156, 173, 0.2) 40%, transparent 70%)`,
              mixBlendMode: 'screen',
              transition: prefersReducedMotion ? 'none' : 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'opacity',
            }}
          />

          {/* Specular highlight - sharp reflection */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              opacity: interaction.cardHighlight.opacity * 0.4,
              background: `radial-gradient(circle 100px at ${interaction.cardHighlight.x}% ${interaction.cardHighlight.y}%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
              mixBlendMode: 'overlay',
              transition: prefersReducedMotion ? 'none' : 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'opacity',
            }}
          />
          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <h1
              className="font-agency text-4xl font-bold text-white mb-2 tracking-wider drop-shadow-lg"
              style={{
                animation: prefersReducedMotion ? 'none' : 'fadeInUp 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              Horvath Payments
            </h1>
            <p
              className="text-white/70 text-sm"
              style={{
                animation: prefersReducedMotion ? 'none' : 'fadeInUp 600ms cubic-bezier(0.34, 1.56, 0.64, 1) 100ms backwards',
              }}
            >
              Login to access your contract and invoices.
            </p>
          </div>

          {/* Form - Keep structure, style freely */}
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div>
              <input
                type="text"
                aria-label="Last Name"
                className="w-full rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none"
                style={{
                  background: 'rgba(15, 15, 15, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.03)',
                  transition: prefersReducedMotion ? 'none' : 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  if (!loading && !prefersReducedMotion) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (document.activeElement !== e.currentTarget) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(201, 156, 173, 0.4)';
                  e.target.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.3), 0 0 0 3px rgba(201, 156, 173, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.target.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.03)';
                }}
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <input
                type="text"
                aria-label="Project Keyword"
                className="w-full rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none"
                style={{
                  background: 'rgba(15, 15, 15, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.03)',
                  transition: prefersReducedMotion ? 'none' : 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  if (!loading && !prefersReducedMotion) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (document.activeElement !== e.currentTarget) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(201, 156, 173, 0.4)';
                  e.target.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.3), 0 0 0 3px rgba(201, 156, 173, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.target.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.03)';
                }}
                placeholder="Project Keyword"
                value={projectKeyword}
                onChange={e => setProjectKeyword(e.target.value)}
                disabled={loading}
              />
              <p className="text-xs text-white/50 mt-2 text-center">
                Use the keyword from your notification email.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                aria-live="polite"
                className={`p-3 rounded-lg text-sm text-center relative overflow-hidden ${
                  error.includes('successful')
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
                style={{
                  background: error.includes('successful')
                    ? 'rgba(34, 197, 94, 0.1)'
                    : 'rgba(239, 68, 68, 0.1)',
                  border: error.includes('successful')
                    ? '1px solid rgba(34, 197, 94, 0.3)'
                    : '1px solid rgba(239, 68, 68, 0.3)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: error.includes('successful')
                    ? '0 0 20px rgba(34, 197, 94, 0.15), inset 0 1px 0 rgba(34, 197, 94, 0.1)'
                    : '0 0 20px rgba(239, 68, 68, 0.15), inset 0 1px 0 rgba(239, 68, 68, 0.1)',
                  animation: prefersReducedMotion ? 'none' : 'slideInUp 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {/* Shimmer effect on success */}
                {error.includes('successful') && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                      animation: prefersReducedMotion ? 'none' : 'shimmer 2s ease-in-out infinite',
                    }}
                  />
                )}
                <span className="relative z-10">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 focus:outline-none relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #C99CAD 0%, #B88A9D 100%)',
                color: '#0f0f0f',
                boxShadow: '0 4px 12px rgba(201, 156, 173, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                transition: prefersReducedMotion
                  ? 'none'
                  : 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                if (!loading && !prefersReducedMotion) {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(201, 156, 173, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 156, 173, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
              onMouseDown={(e) => {
                if (!loading && !prefersReducedMotion) {
                  e.currentTarget.style.transform = 'translateY(0) scale(0.98)';
                }
              }}
              onMouseUp={(e) => {
                if (!loading && !prefersReducedMotion) {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
                }
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 156, 173, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 0 4px rgba(201, 156, 173, 0.4)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 156, 173, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
              }}
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Access Portal'}
            </button>
          </form>
        </div>
        
        {/* Footer */}
        <p className="text-center text-sm text-white/50 mt-8 relative z-10">
          Need help? Contact{' '}
          <a
            href="mailto:sean@august.style"
            className="text-[#C99CAD] transition-all inline-block"
            style={{
              textShadow: '0 0 10px rgba(201, 156, 173, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#B88A9D';
              e.currentTarget.style.textShadow = '0 0 15px rgba(201, 156, 173, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#C99CAD';
              e.currentTarget.style.textShadow = '0 0 10px rgba(201, 156, 173, 0.3)';
            }}
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
