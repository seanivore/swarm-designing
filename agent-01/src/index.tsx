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

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Update card bounds on mount and resize
  useEffect(() => {
    const updateCardBounds = () => {
      if (cardRef.current) {
        setCardBounds(cardRef.current.getBoundingClientRect());
      }
    };

    updateCardBounds();
    window.addEventListener('resize', updateCardBounds);
    return () => window.removeEventListener('resize', updateCardBounds);
  }, []);

  useEffect(() => {
    // Initialize position to center
    currentPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    targetPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    // Smooth animation loop for 60fps tracking
    const animate = () => {
      if (prefersReducedMotion) {
        // Instant follow for reduced motion
        currentPos.current = targetPos.current;
      } else {
        // Smooth interpolation - light has slight lag like it has mass
        const ease = 0.15;
        currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
        currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;
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
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion, cardBounds]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Light source - responds to card proximity */}
      <div
        ref={lightRef}
        className="pointer-events-none fixed inset-0"
        style={{
          background: `
            radial-gradient(
              ${600 - lightIntensity * 100}px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(201, 156, 173, ${0.15 + lightIntensity * 0.12}),
              rgba(201, 156, 173, ${0.05 + lightIntensity * 0.08}) 40%,
              transparent 70%
            )
          `,
        }}
      />
      {/* Inner glow - intensifies near card */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: `
            radial-gradient(
              ${200 - lightIntensity * 50}px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(255, 255, 255, ${0.08 + lightIntensity * 0.15}),
              rgba(201, 156, 173, ${0.04 + lightIntensity * 0.08}) 50%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div
          ref={cardRef}
          className="p-8 rounded-2xl border border-white/10 bg-[#1f1f1f] relative overflow-hidden"
          style={{
            boxShadow: `
              ${(cardLightPos.x - 0.5) * -20}px
              ${(cardLightPos.y - 0.5) * -20}px
              60px
              rgba(0, 0, 0, ${0.3 + lightIntensity * 0.4})
            `
          }}
        >
          {/* Localized edge lighting - follows cursor position */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `
                radial-gradient(
                  400px circle at ${cardLightPos.x * 100}% ${cardLightPos.y * 100}%,
                  rgba(201, 156, 173, ${lightIntensity * 0.3}),
                  rgba(201, 156, 173, ${lightIntensity * 0.1}) 30%,
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
                  150px circle at ${cardLightPos.x * 100}% ${cardLightPos.y * 100}%,
                  rgba(255, 255, 255, ${lightIntensity * 0.15}),
                  transparent 50%
                )
              `,
            }}
          />
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-agency text-4xl font-bold text-white mb-2 tracking-wider">
              Horvath Payments
            </h1>
            <p className="text-white/60 text-sm">
              Login to access your contract and invoices.
            </p>
          </div>

          {/* Form - Keep structure, style freely */}
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div>
              <input
                type="text"
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 transition-all duration-200 focus:outline-none focus:border-[#C99CAD]/50 focus:ring-2 focus:ring-[#C99CAD]/20"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 transition-all duration-200 focus:outline-none focus:border-[#C99CAD]/50 focus:ring-2 focus:ring-[#C99CAD]/20"
                placeholder="Project Keyword"
                value={projectKeyword}
                onChange={e => setProjectKeyword(e.target.value)}
                disabled={loading}
              />
              <p className="text-xs text-white/40 mt-2 text-center">
                Use the keyword from your notification email.
              </p>
            </div>

            {error && (
              <div className={`p-3 rounded-lg text-sm text-center ${
                error.includes('successful') 
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#C99CAD] hover:bg-[#C99CAD]/80 text-[#0f0f0f] font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Access Portal'}
            </button>
          </form>
        </div>
        
        {/* Footer */}
        <p className="text-center text-sm text-white/40 mt-8">
          Need help? Contact{' '}
          <a 
            href="mailto:sean@august.style" 
            className="text-[#C99CAD] hover:text-[#C99CAD]/80 transition-colors"
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
