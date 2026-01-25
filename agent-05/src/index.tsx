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
  const [cardBounds, setCardBounds] = useState<DOMRect | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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

  // Track cursor position for light effect
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
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
      className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor-following light source - intensifies near card */}
      <div
        className="fixed pointer-events-none z-0 transition-opacity duration-200"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(201, 156, 173, 0.4) 0%, rgba(143, 169, 179, 0.2) 30%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: interaction.lightIntensity,
        }}
      />

      {/* Login Card - Style this, but keep the structure */}
      <div className="w-full max-w-md relative z-10">
        <div
          ref={cardRef}
          className="p-8 rounded-2xl border border-white/10 bg-[#1f1f1f] relative overflow-hidden"
        >
          {/* Localized light reflection on card surface */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-200"
            style={{
              opacity: interaction.cardHighlight.opacity,
              background: `radial-gradient(circle 400px at ${interaction.cardHighlight.x}% ${interaction.cardHighlight.y}%, rgba(201, 156, 173, 0.15) 0%, transparent 50%)`,
            }}
          />

          {/* Edge highlight - follows light position */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-200"
            style={{
              opacity: interaction.cardHighlight.opacity * 0.8,
              background: `radial-gradient(circle 200px at ${interaction.cardHighlight.x}% ${interaction.cardHighlight.y}%, rgba(143, 169, 179, 0.3) 0%, transparent 60%)`,
              mixBlendMode: 'screen',
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-[#C99CAD]/50 focus:outline-none focus:ring-2 focus:ring-[#C99CAD]/30 transition-all"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-[#C99CAD]/50 focus:outline-none focus:ring-2 focus:ring-[#C99CAD]/30 transition-all"
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
              className="w-full bg-[#C99CAD] hover:bg-[#C99CAD]/80 text-[#0f0f0f] font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#C99CAD] focus:ring-offset-2 focus:ring-offset-[#1f1f1f]"
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
