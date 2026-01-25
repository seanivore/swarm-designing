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

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Light source - multiple layers for depth */}
      <div
        ref={lightRef}
        className="pointer-events-none fixed inset-0"
        style={{
          background: `
            radial-gradient(
              600px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(201, 156, 173, 0.15),
              rgba(201, 156, 173, 0.05) 40%,
              transparent 70%
            )
          `,
        }}
      />
      {/* Inner glow - brighter core */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: `
            radial-gradient(
              200px circle at ${mousePos.x}px ${mousePos.y}px,
              rgba(255, 255, 255, 0.08),
              rgba(201, 156, 173, 0.04) 50%,
              transparent 100%
            )
          `,
        }}
      />

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
