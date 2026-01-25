import { createRoot } from 'react-dom/client';
import { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import './index.css';

/**
 * PHASE 4: Polish
 * The 10% that makes it 100%.
 *
 * Polish:
 * - Refined easing curves and micro-transitions
 * - Enhanced focus states with light emission
 * - Subtle idle pulse animation
 * - Touch device fallback
 * - Performance optimizations
 * - "Oh!" moment: Focused inputs emit light that interacts with main light
 */

function LoginApp() {
  const [lastName, setLastName] = useState('');
  const [projectKeyword, setProjectKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Light position state
  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  // Card interaction state
  const cardRef = useRef<HTMLDivElement>(null);
  const [lightIntensity, setLightIntensity] = useState(1);
  const [cardEdgeLight, setCardEdgeLight] = useState({ x: 50, y: 50, intensity: 0 });

  // PHASE 4: Focus state tracking for input light emission
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [idlePulse, setIdlePulse] = useState(0);
  const lastMoveTime = useRef(Date.now());
  const isTouchDevice = useRef(false);

  // PHASE 4: Detect touch device on mount
  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Touch fallback - center light on card
    if (isTouchDevice.current && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      targetRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
      currentRef.current = { ...targetRef.current };
      setIsActive(true);
    }
  }, []);

  // Smooth cursor tracking with lerp for 60fps performance
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = Date.now();
      if (!isActive) setIsActive(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        lastMoveTime.current = Date.now();
        if (!isActive) setIsActive(true);
      }
    };

    const handleMouseLeave = () => {
      if (!isTouchDevice.current) setIsActive(false);
    };

    // Animation loop with linear interpolation
    const animate = () => {
      const lerp = 0.15; // Smoothing factor
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;

      // PHASE 4: Idle pulse - subtle breathing when cursor hasn't moved
      const timeSinceMove = Date.now() - lastMoveTime.current;
      if (timeSinceMove > 2000) {
        const pulse = Math.sin(Date.now() / 2000) * 0.5 + 0.5; // 0 to 1
        setIdlePulse(pulse * 0.15); // Max 0.15 intensity boost
      } else {
        setIdlePulse(0);
      }

      setLightPos({
        x: currentRef.current.x,
        y: currentRef.current.y
      });

      // Calculate light-card interaction
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;

        // Distance from light to card center
        const dx = currentRef.current.x - cardCenterX;
        const dy = currentRef.current.y - cardCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Proximity threshold (light starts interacting within 300px)
        const maxDistance = 300;
        const proximity = Math.max(0, 1 - distance / maxDistance);

        // Light intensifies when near card (1.0 to 1.8) + idle pulse
        setLightIntensity(1 + proximity * 0.8 + idlePulse);

        // Card edge lighting - position relative to card
        const relativeX = ((currentRef.current.x - rect.left) / rect.width) * 100;
        const relativeY = ((currentRef.current.y - rect.top) / rect.height) * 100;

        setCardEdgeLight({
          x: Math.max(0, Math.min(100, relativeX)),
          y: Math.max(0, Math.min(100, relativeY)),
          intensity: proximity
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, idlePulse]);

  // Reduced motion support
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      {/* PHASE 3: Background atmosphere */}
      <div className="atmospheric-background" aria-hidden="true">
        <div className="bg-gradient" />
        <div className="bg-art" />
      </div>

      {/* PHASE 3: Cursor-following light with mauve-pink character */}
      {!prefersReducedMotion && (
        <div
          className="light-source"
          style={{
            transform: `translate(${lightPos.x}px, ${lightPos.y}px)`,
            opacity: isActive ? 1 : 0,
            '--light-intensity': lightIntensity
          } as React.CSSProperties}
          aria-hidden="true"
        >
          {/* Wide outer bloom - mauve atmospheric glow */}
          <div className="light-bloom" />
          {/* Mid bloom - pink undertone */}
          <div className="light-mid" />
          {/* Inner core - bright center */}
          <div className="light-core" />
        </div>
      )}

      {/* Login Card - with light interaction */}
      <div className="w-full max-w-md relative z-10">
        <div
          ref={cardRef}
          className="card-with-light p-8 rounded-2xl border border-white/10 bg-[#1f1f1f]"
          style={{
            '--edge-x': `${cardEdgeLight.x}%`,
            '--edge-y': `${cardEdgeLight.y}%`,
            '--edge-intensity': cardEdgeLight.intensity
          } as React.CSSProperties}
        >
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              {/* PHASE 4: Input light emission when focused */}
              {focusedInput === 'lastName' && !prefersReducedMotion && (
                <div className="input-light-emission" aria-hidden="true" />
              )}
              <input
                type="text"
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                onFocus={() => setFocusedInput('lastName')}
                onBlur={() => setFocusedInput(null)}
                disabled={loading}
              />
            </div>
            <div className="relative">
              {/* PHASE 4: Input light emission when focused */}
              {focusedInput === 'projectKeyword' && !prefersReducedMotion && (
                <div className="input-light-emission" aria-hidden="true" />
              )}
              <input
                type="text"
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30"
                placeholder="Project Keyword"
                value={projectKeyword}
                onChange={e => setProjectKeyword(e.target.value)}
                onFocus={() => setFocusedInput('projectKeyword')}
                onBlur={() => setFocusedInput(null)}
                disabled={loading}
              />
              <p className="text-xs text-white/40 mt-2 text-center">
                Use the keyword from your notification email.
              </p>
            </div>

            {error && (
              <div className={`p-3 rounded-lg text-sm text-center ${
                error.includes('successful')
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400 success-message'
                  : 'bg-red-500/10 border border-red-500/30 text-red-400 error-message'
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
