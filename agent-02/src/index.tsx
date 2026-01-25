import { createRoot } from 'react-dom/client';
import { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import './index.css';

/**
 * AGENT-02 - Phase 1: Foundation
 *
 * Light Concept: Atmospheric lantern light
 * - Soft, diffuse glow with natural falloff
 * - Layered gradients for depth
 * - Smooth eased movement (not locked to cursor)
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
        LIGHT EFFECT - Layered atmospheric glow
        Three layers create depth:
        1. Core: bright, small, sharp
        2. Mid: medium brightness, larger spread
        3. Outer: dim, very large, atmospheric haze
      */}

      {/* Outer haze - largest, dimmest, creates atmosphere */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: lightPos.x,
          top: lightPos.y,
          width: 600,
          height: 600,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(201, 156, 173, 0.08) 0%, rgba(201, 156, 173, 0.02) 40%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 1
        }}
      />

      {/* Mid glow - medium layer */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: lightPos.x,
          top: lightPos.y,
          width: 350,
          height: 350,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(201, 156, 173, 0.15) 0%, rgba(201, 156, 173, 0.05) 50%, transparent 70%)',
          filter: 'blur(20px)',
          zIndex: 2
        }}
      />

      {/* Core light - brightest, smallest, sharpest */}
      <div
        className="fixed pointer-events-none"
        style={{
          left: lightPos.x,
          top: lightPos.y,
          width: 150,
          height: 150,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(201, 156, 173, 0.2) 30%, transparent 70%)',
          filter: 'blur(8px)',
          zIndex: 3
        }}
      />

      {/* Login Card - Basic structure */}
      <div className="w-full max-w-md relative z-10">
        <div className="p-8 rounded-2xl border border-white/10 bg-[#1a1a1a]">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-agency text-4xl font-bold text-white mb-2 tracking-wider">
              Horvath Payments
            </h1>
            <p className="text-white/60 text-sm">
              Login to access your contract and invoices.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/20"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/20"
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
