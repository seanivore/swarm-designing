import React from 'react';
import { motion } from 'framer-motion';

// Agent 4: The Greenhouse / Solarpunk
// Stack: Tailwind, Framer Motion
// Vibe: "Her" (2013) meets a botanical garden

const GlassCard = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
    whileHover={{ y: -5, boxShadow: "0 20px 40px -5px rgba(0,0,0,0.1)" }}
    className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-[2rem] p-6 shadow-sm cursor-pointer relative overflow-hidden group"
  >
    {children}
    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </motion.div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] to-[#ecfccb] text-[#064e3b] font-sans selection:bg-[#bef264] selection:text-[#064e3b] p-8 md:p-12">

      {/* Organic Background Blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] right-[-5%] w-[60vh] h-[60vh] bg-[#bbf7d0] rounded-full mix-blend-multiply filter blur-3xl opacity-40 z-0"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="fixed bottom-[-10%] left-[-5%] w-[60vh] h-[60vh] bg-[#fef08a] rounded-full mix-blend-multiply filter blur-3xl opacity-40 z-0"
      />

      <div className="max-w-6xl mx-auto relative z-10">

        <header className="flex justify-between items-center mb-16">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            className="text-4xl font-light tracking-tight"
          >
            Swarm<strong className="font-semibold">Garden</strong>
          </motion.div>
          <nav className="flex gap-6 text-sm font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
            <span>Nursery</span>
            <span>Archive</span>
            <span>Seeds</span>
          </nav>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <GlassCard delay={0.2}>
            <div className="aspect-[4/3] bg-teal-50 rounded-2xl mb-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-16 h-16 border-2 border-[#064e3b] rounded-full"></div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-1">CMY Cube</h3>
            <p className="text-sm opacity-60">Gen 1 • Spatial Logic</p>
          </GlassCard>

          <GlassCard delay={0.4}>
            <div className="aspect-[4/3] bg-yellow-50 rounded-2xl mb-4 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-16 h-16 border-2 border-orange-800 rounded-lg rotate-12"></div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-1">Neural Net</h3>
            <p className="text-sm opacity-60">Gen 2 • Organic Growth</p>
          </GlassCard>

          <GlassCard delay={0.6}>
            <div className="aspect-[4/3] border-2 border-dashed border-[#064e3b]/10 rounded-2xl mb-4 flex items-center justify-center text-3xl opacity-20 group-hover:opacity-40 transition-opacity">
              +
            </div>
            <h3 className="text-xl font-bold mb-1">Plant New</h3>
            <p className="text-sm opacity-60">Initialize Seed</p>
          </GlassCard>

        </section>

      </div>

    </div>
  );
}
