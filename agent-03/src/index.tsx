import { createRoot } from 'react-dom/client';
import { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import './index.css';

/**
 * PHASE 1: Foundation
 * Light follows cursor. Card exists. Nothing else.
 *
 * Light concept: Atmospheric spotlight with soft bloom.
 * Not a glow effect - a light source illuminating space.
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

  // Smooth cursor tracking with lerp for 60fps performance
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isActive) setIsActive(true);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    // Animation loop with linear interpolation
    const animate = () => {
      const lerp = 0.15; // Smoothing factor
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;

      setLightPos({
        x: currentRef.current.x,
        y: currentRef.current.y
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive]);

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
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4 overflow-hidden relative">
      {/* PHASE 1: Cursor-following light */}
      {!prefersReducedMotion && (
        <div
          className="light-source"
          style={{
            transform: `translate(${lightPos.x}px, ${lightPos.y}px)`,
            opacity: isActive ? 1 : 0
          }}
          aria-hidden="true"
        >
          {/* Outer bloom - soft atmospheric glow */}
          <div className="light-bloom" />
          {/* Inner core - brighter center */}
          <div className="light-core" />
        </div>
      )}

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="p-8 rounded-2xl border border-white/10 bg-[#1f1f1f]">
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
            <div>
              <input 
                type="text" 
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <input 
                type="text" 
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30"
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
