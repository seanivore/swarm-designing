import { createRoot } from 'react-dom/client';
import { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import './index.css';

/**
 * AGENT-02 - Phase 2: Interaction
 *
 * Light Concept: Atmospheric lantern light that scatters when hitting surfaces
 * - Light gets diffused/cooler when near the card (like hitting frosted glass)
 * - Card edges catch the light (localized edge highlights)
 * - Card surface shows subtle reflection following light position
 * - Physical interaction, not hover states
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

  // Card reference for proximity calculations
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardBounds, setCardBounds] = useState<DOMRect | null>(null);

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

  // Calculate light interaction with card
  const getLightInteraction = () => {
    if (!cardBounds) return {
      distanceToCard: 1000,
      isNearCard: false,
      lightAngle: 0,
      normalizedX: 0.5,
      normalizedY: 0.5
    };

    const cardCenterX = cardBounds.left + cardBounds.width / 2;
    const cardCenterY = cardBounds.top + cardBounds.height / 2;

    const dx = lightPos.x - cardCenterX;
    const dy = lightPos.y - cardCenterY;
    const distanceToCard = Math.sqrt(dx * dx + dy * dy);

    // Calculate angle of light relative to card (for directional effects)
    const lightAngle = Math.atan2(dy, dx);

    // Normalize light position relative to card (0-1 range)
    const normalizedX = (lightPos.x - cardBounds.left) / cardBounds.width;
    const normalizedY = (lightPos.y - cardBounds.top) / cardBounds.height;

    return {
      distanceToCard,
      isNearCard: distanceToCard < 400,
      lightAngle,
      normalizedX: Math.max(0, Math.min(1, normalizedX)),
      normalizedY: Math.max(0, Math.min(1, normalizedY))
    };
  };

  const interaction = getLightInteraction();

  // Calculate light scattering based on proximity to card
  const scatterFactor = interaction.isNearCard
    ? 1 - Math.min(1, interaction.distanceToCard / 400)
    : 0;

  // Track mouse position and animate light toward it
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    // Eased animation loop - light follows cursor with slight delay
    const animate = () => {
      setLightPos(prev => {
        const dx = targetPos.current.x - prev.x;
        const dy = targetPos.current.y - prev.y;
        // Easing factor - lower = slower/smoother following
        const ease = 0.08;
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease
        };
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize position to center
    targetPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    setLightPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    window.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

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

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4 overflow-hidden">
      {/*
        LIGHT EFFECT - Responds to card proximity
        When near card: scatters (more blur, cooler color, larger spread)
        Like light hitting a frosted glass surface
      */}

      {/* Outer haze - gets more diffuse near card */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: lightPos.x,
          top: lightPos.y,
          width: 600 + (scatterFactor * 200),
          height: 600 + (scatterFactor * 200),
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle,
            rgba(${scatterFactor > 0.3 ? '143, 169, 179' : '201, 156, 173'}, ${0.08 + scatterFactor * 0.04}) 0%,
            rgba(${scatterFactor > 0.3 ? '143, 169, 179' : '201, 156, 173'}, ${0.02 + scatterFactor * 0.02}) 40%,
            transparent 70%)`,
          filter: `blur(${40 + scatterFactor * 30}px)`,
          opacity: 0.8 + scatterFactor * 0.2,
          zIndex: 1,
          transition: 'width 0.3s ease, height 0.3s ease'
        }}
      />

      {/* Mid glow - scatters and shifts cooler */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: lightPos.x,
          top: lightPos.y,
          width: 350 + (scatterFactor * 150),
          height: 350 + (scatterFactor * 150),
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle,
            rgba(${scatterFactor > 0.3 ? '143, 169, 179' : '201, 156, 173'}, ${0.15 + scatterFactor * 0.08}) 0%,
            rgba(${scatterFactor > 0.3 ? '143, 169, 179' : '201, 156, 173'}, ${0.05 + scatterFactor * 0.03}) 50%,
            transparent 70%)`,
          filter: `blur(${20 + scatterFactor * 25}px)`,
          zIndex: 2,
          transition: 'width 0.3s ease, height 0.3s ease'
        }}
      />

      {/* Core light - dims slightly when scattered */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: lightPos.x,
          top: lightPos.y,
          width: 150 + (scatterFactor * 50),
          height: 150 + (scatterFactor * 50),
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle,
            rgba(255, 255, 255, ${0.12 - scatterFactor * 0.04}) 0%,
            rgba(${scatterFactor > 0.3 ? '143, 169, 179' : '201, 156, 173'}, ${0.2 + scatterFactor * 0.05}) 30%,
            transparent 70%)`,
          filter: `blur(${8 + scatterFactor * 12}px)`,
          zIndex: 3,
          transition: 'width 0.3s ease, height 0.3s ease'
        }}
      />

      {/* Login Card - Responds to light position */}
      <div className="w-full max-w-md relative z-10" ref={cardRef}>
        <div
          className="p-8 rounded-2xl border border-white/10 bg-[#1a1a1a] relative overflow-hidden"
          style={{
            // Surface reflection following light - localized gradient
            background: cardBounds ? `
              radial-gradient(
                600px circle at ${interaction.normalizedX * 100}% ${interaction.normalizedY * 100}%,
                rgba(201, 156, 173, ${0.08 * scatterFactor}) 0%,
                rgba(143, 169, 179, ${0.04 * scatterFactor}) 30%,
                transparent 60%
              ),
              #1a1a1a
            ` : '#1a1a1a'
          }}
        >
          {/* Edge highlights - catch light on illuminated edges */}
          {cardBounds && scatterFactor > 0.2 && (
            <>
              {/* Top edge highlight */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
                style={{
                  background: `linear-gradient(90deg,
                    transparent 0%,
                    rgba(201, 156, 173, ${0.3 * scatterFactor * (1 - Math.abs(interaction.normalizedX - 0.5) * 2)}) ${interaction.normalizedX * 100}%,
                    transparent 100%)`,
                  opacity: interaction.normalizedY < 0.5 ? scatterFactor : scatterFactor * 0.3
                }}
              />

              {/* Bottom edge highlight */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
                style={{
                  background: `linear-gradient(90deg,
                    transparent 0%,
                    rgba(201, 156, 173, ${0.3 * scatterFactor * (1 - Math.abs(interaction.normalizedX - 0.5) * 2)}) ${interaction.normalizedX * 100}%,
                    transparent 100%)`,
                  opacity: interaction.normalizedY > 0.5 ? scatterFactor : scatterFactor * 0.3
                }}
              />

              {/* Left edge highlight */}
              <div
                className="absolute top-0 bottom-0 left-0 w-[2px] pointer-events-none"
                style={{
                  background: `linear-gradient(180deg,
                    transparent 0%,
                    rgba(201, 156, 173, ${0.3 * scatterFactor * (1 - Math.abs(interaction.normalizedY - 0.5) * 2)}) ${interaction.normalizedY * 100}%,
                    transparent 100%)`,
                  opacity: interaction.normalizedX < 0.5 ? scatterFactor : scatterFactor * 0.3
                }}
              />

              {/* Right edge highlight */}
              <div
                className="absolute top-0 bottom-0 right-0 w-[2px] pointer-events-none"
                style={{
                  background: `linear-gradient(180deg,
                    transparent 0%,
                    rgba(201, 156, 173, ${0.3 * scatterFactor * (1 - Math.abs(interaction.normalizedY - 0.5) * 2)}) ${interaction.normalizedY * 100}%,
                    transparent 100%)`,
                  opacity: interaction.normalizedX > 0.5 ? scatterFactor : scatterFactor * 0.3
                }}
              />
            </>
          )}

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <h1 className="font-agency text-4xl font-bold text-white mb-2 tracking-wider">
              Horvath Payments
            </h1>
            <p className="text-white/60 text-sm">
              Login to access your contract and invoices.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div>
              <input
                type="text"
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C99CAD]/50 focus:ring-1 focus:ring-[#C99CAD]/30 transition-all"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C99CAD]/50 focus:ring-1 focus:ring-[#C99CAD]/30 transition-all"
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
              className="w-full bg-[#C99CAD] hover:bg-[#C99CAD]/80 text-[#0f0f0f] font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#C99CAD]/50 focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
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
            className="text-[#C99CAD] hover:text-[#C99CAD]/80 transition-colors focus:outline-none focus:underline"
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
