import React, { useState, MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- Types & Data ---
type NavItem = {
  id: string;
  icon: React.ReactNode; // Updated to accept SVG elements
  label: string;
};

// Added professional SVG logos for each item
const navItems: NavItem[] = [
  { 
    id: 'cloud', 
    label: 'Home',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  { 
    id: 'ai', 
    label: 'Profile',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  { 
    id: 'security', 
    label: 'Projects',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  { 
    id: 'vault', 
    label: 'Reviews',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  },
  { 
    id: 'network', 
    label: 'Reach Out',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
];

export default function FuturisticNavbar() {
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

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-center justify-center w-full max-w-5xl px-4">
        <motion.nav
          onMouseMove={handleMouseMove}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex items-center gap-2 p-2 rounded-2xl border border-cyan-500/30 bg-slate-950/60 backdrop-blur-xl shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] overflow-hidden"
        >
          {/* Animated Glowing Border Effect */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none animate-pulse opacity-50 shadow-[inset_0_0_20px_rgba(6,182,212,0.2)]" />

          {/* Mouse-following Spotlight */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: useTransform(
                [smoothX, smoothY],
                ([x, y]) =>
                  `radial-gradient(120px circle at ${x}px ${y}px, rgba(56, 189, 248, 0.15), transparent 80%)`
              ),
            }}
          />

          {navItems.map((item) => {
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-300 group overflow-hidden ${
                  isActive ? 'text-cyan-300' : 'text-slate-400 hover:text-cyan-100'
                }`}
              >
                {/* Active Sliding Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute inset-0 bg-cyan-900/30 border border-cyan-500/50 rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    {/* Bottom active glow line */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] rounded-full" />
                  </motion.div>
                )}

                {/* Sublte Energy Wave on Hover (CSS based) */}
                <span className="absolute inset-0 rounded-xl bg-cyan-400/0 group-hover:bg-cyan-400/10 transition-colors duration-500 scale-0 group-hover:scale-150 rounded-full blur-md" />

                {/* Content */}
                <motion.div
                  className="relative flex items-center gap-2 z-10"
                  animate={{ y: isActive ? [0, -2, 0] : 0 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className={`text-base ${isActive ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="tracking-wide">{item.label}</span>
                </motion.div>
              </button>
            );
          })}
        </motion.nav>
      </div>

      {/* --- MOBILE NAVBAR TOGGLE --- */}
      <div className="fixed top-4 right-4 z-[60] lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* --- MOBILE HOLOGRAPHIC PANEL --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:hidden bg-slate-950/80 backdrop-blur-xl"
          >
            {/* Grid overlay for holographic effect */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(6,182,212,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            <div className="relative w-full max-w-sm rounded-2xl border border-cyan-500/50 bg-slate-900/50 p-6 shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden">
              {/* Scanning line animation */}
              <motion.div
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 w-full h-[2px] bg-cyan-400/50 shadow-[0_0_10px_#22d3ee] z-0"
              />

              <div className="relative z-10 flex flex-col gap-4">
                <h3 className="text-cyan-500 text-xs font-mono uppercase tracking-widest mb-2 text-center">
                  Command Center Online
                </h3>
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => {
                      setActiveItem(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-4 p-4 rounded-xl border ${
                      activeItem === item.id
                        ? 'bg-cyan-950/50 border-cyan-400/50 text-cyan-300 shadow-[inset_0_0_20px_rgba(6,182,212,0.2)]'
                        : 'border-transparent text-slate-400 hover:bg-slate-800/50'
                    } transition-all duration-300`}
                  >
                    <span className="text-xl flex items-center justify-center">{item.icon}</span>
                    <span className="font-medium tracking-wide">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}