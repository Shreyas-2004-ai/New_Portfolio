import React, { useState, MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- Types & Data ---
type NavItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

// SVG Icons retained, styled for the terminal look
const navItems: NavItem[] = [
  { 
    id: 'cloud', 
    label: 'sys.home',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  { 
    id: 'ai', 
    label: 'usr.profile',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  { 
    id: 'security', 
    label: 'dir.projects',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  { 
    id: 'vault', 
    label: 'log.reviews',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  },
  { 
    id: 'network', 
    label: 'net.connect',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
];

export default function HackerNavbar() {
  const [activeItem, setActiveItem] = useState<string>(navItems[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Mouse Spotlight Effect ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Extremely snappy spring physics for the spotlight
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  return (
    <div className="font-mono">
      {/* --- DESKTOP NAVBAR --- */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-center justify-center w-full max-w-5xl px-4">
        <motion.nav
          onMouseMove={handleMouseMove}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom mechanical easing
          className="relative flex items-center gap-2 p-2 rounded-2xl border border-green-500/30 bg-[#010a05]/80 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(74,222,128,0.2)] overflow-hidden"
        >
          {/* Subtle CRT Scanline Overlay inside navbar */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#4ade80_2px,#4ade80_3px)] mix-blend-overlay" />

          {/* Animated Glowing Border Effect */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none animate-pulse opacity-30 shadow-[inset_0_0_20px_rgba(74,222,128,0.2)]" />

          {/* Mouse-following Spotlight (Toxic Green) */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: useTransform(
                [smoothX, smoothY],
                ([x, y]) =>
                  `radial-gradient(100px circle at ${x}px ${y}px, rgba(74, 222, 128, 0.15), transparent 80%)`
              ),
            }}
          />

          {navItems.map((item) => {
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group overflow-hidden ${
                  isActive ? 'text-green-400' : 'text-green-800 hover:text-green-300'
                }`}
              >
                {/* Active Sliding Indicator - Snappy Physics */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 bg-[#051f0a] border border-green-500/40 rounded-xl shadow-[inset_0_0_15px_rgba(74,222,128,0.15)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    {/* Bottom active terminal line */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-green-400 shadow-[0_0_10px_rgba(74,222,128,1)] rounded-full" />
                  </motion.div>
                )}

                {/* Subtle Energy Wave on Hover */}
                <span className="absolute inset-0 rounded-xl bg-green-400/0 group-hover:bg-green-400/10 transition-colors duration-500 scale-0 group-hover:scale-150 rounded-full blur-md" />

                {/* Content */}
                <motion.div
                  className="relative flex items-center gap-2 z-10"
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={`text-base transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]' : ''}`}>
                    {item.icon}
                  </span>
                  
                  {/* Hacker Terminal Text Format */}
                  <span className="tracking-widest flex items-center gap-1">
                    {isActive && <motion.span initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }}>[</motion.span>}
                    {item.label}
                    {isActive && <motion.span initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}>]</motion.span>}
                  </span>
                </motion.div>
              </button>
            );
          })}
        </motion.nav>
      </div>

      {/* --- MOBILE HEADER (Name + Toggle) --- */}
      <div className="fixed top-0 left-0 w-full p-4 z-[60] lg:hidden flex justify-between items-center pointer-events-none">
        
        {/* Terminal Brand Name */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-auto flex items-center gap-2 bg-[#010a05]/90 backdrop-blur-md border border-green-500/30 px-4 py-2.5 rounded-xl shadow-[0_0_15px_rgba(74,222,128,0.15)]"
        >
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
          <span className="text-green-400 text-xs md:text-sm font-bold tracking-widest flex items-center">
            SHREYAS_S_SANIL<span className="animate-pulse text-green-300 ml-[2px]">_</span>
          </span>
        </motion.div>

        {/* Toggle Button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="pointer-events-auto p-3 rounded-xl bg-[#010a05]/90 backdrop-blur-md border border-green-500/40 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.3)] transition-all active:scale-95"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </motion.button>
      </div>

      {/* --- MOBILE HOLOGRAPHIC TERMINAL PANEL --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:hidden bg-[#010a05]/95 backdrop-blur-xl"
          >
            {/* Terminal Grid overlay */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(74,222,128,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(74,222,128,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            <div className="relative w-full max-w-sm rounded-2xl border border-green-500/50 bg-[#051f0a]/80 p-6 shadow-[0_0_50px_rgba(74,222,128,0.15)] overflow-hidden mt-16">
              
              {/* Vertical Laser Scanning line */}
              <motion.div
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 w-full h-[2px] bg-green-400/60 shadow-[0_0_15px_#4ade80] z-0"
              />

              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex flex-col items-center mb-4 border-b border-green-900/50 pb-4">
                  <h3 className="text-green-500 text-[10px] uppercase tracking-[0.3em] text-center animate-pulse">
                    SYS.ADMIN ACCESS GRANTED
                  </h3>
                </div>

                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => {
                      setActiveItem(item.id);
                      setTimeout(() => setIsMobileMenuOpen(false), 200);
                    }}
                    className={`flex items-center gap-4 p-4 rounded-xl border ${
                      activeItem === item.id
                        ? 'bg-[#0a2e16] border-green-400/50 text-green-300 shadow-[inset_0_0_20px_rgba(74,222,128,0.15)]'
                        : 'border-transparent text-green-700 hover:text-green-400 hover:bg-[#051f0a]'
                    } transition-all duration-300`}
                  >
                    <span className="text-xl flex items-center justify-center drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">
                      {item.icon}
                    </span>
                    <span className="font-medium tracking-widest text-sm">
                      {activeItem === item.id ? `> ${item.label}_` : item.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}