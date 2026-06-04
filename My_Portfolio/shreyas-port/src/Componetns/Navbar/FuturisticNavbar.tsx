import React, { useState, MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- Types & Data ---
type NavItem = {
  id: string;
  icon: string;
  label: string;
};

const navItems: NavItem[] = [
  { id: 'cloud', icon: '', label: 'Home' },
  { id: 'ai', icon: '', label: 'Profile' },
  { id: 'security', icon: '', label: 'Projects' },
  { id: 'vault', icon: '', label: 'Reviews' },
  { id: 'network', icon: '', label: 'Reach Out' },
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
                    <span className="text-xl">{item.icon}</span>
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