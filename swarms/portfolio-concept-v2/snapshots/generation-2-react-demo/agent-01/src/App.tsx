import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Agent 1: Terminal / Cyber-Noir
// Stack: Tailwind, Framer Motion
// Vibe: "Hackers" (1995)

const TerminalLine = ({ text, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.1 }}
    className="font-mono text-green-500 mb-1"
  >
    <span className="text-green-800 mr-2">$</span>{text}
  </motion.div>
);

const SwarmItem = ({ id, name, status, agents }) => (
  <motion.div
    whileHover={{ backgroundColor: 'rgba(0, 255, 65, 0.1)', x: 5 }}
    className="border border-green-900 p-2 mb-2 cursor-pointer font-mono text-xs flex justify-between group"
  >
    <div className="flex gap-4">
      <span className="text-green-700">[{id}]</span>
      <span className="group-hover:text-green-400 font-bold">{name}</span>
    </div>
    <div className="flex gap-4 text-green-800">
      <span>AGENTS:{agents}</span>
      <span>STATUS:{status}</span>
    </div>
  </motion.div>
);

export default function App() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    setTimeout(() => setBooted(true), 1500);
  }, []);

  return (
    <div className="min-h-screen bg-black p-8 font-mono text-green-500 overflow-hidden relative selection:bg-green-500 selection:text-black">

      {/* Scanline Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] opacity-20"></div>

      <header className="mb-12 border-b border-green-900 pb-2 flex justify-between items-end">
        <h1 className="text-2xl font-bold tracking-tighter">SWARM_NET // V2.0</h1>
        <div className="text-[10px] text-green-800 animate-pulse">SYS.ONLINE</div>
      </header>

      <div className="max-w-2xl">
        <TerminalLine text="init_sequence --force" delay={0.2} />
        <TerminalLine text="loading modules..." delay={0.4} />
        <TerminalLine text="connecting to swarm_hub..." delay={0.8} />

        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 border-t border-green-900 pt-8"
          >
            <div className="mb-4 text-xs text-green-800">AVAILABLE_SWARMS:</div>

            <SwarmItem id="0x01" name="CMY_CUBE" status="ACTIVE" agents="05" />
            <SwarmItem id="0x02" name="NEURAL_NET" status="COMPILING" agents="12" />
            <SwarmItem id="0x03" name="INFINITE_UI" status="ERR_404" agents="00" />

            <div className="mt-8 flex gap-2 items-center">
              <span className="text-green-500 animate-pulse">{'>'}</span>
              <input
                type="text"
                className="bg-transparent border-none outline-none text-green-400 w-full focus:ring-0 placeholder-green-900"
                placeholder="ENTER_COMMAND"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
}
