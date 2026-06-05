import { useState, useEffect, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// --- Network Signal Edge Animation Component ---
const EdgeNetworkSignals = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* We use an SVG that covers the whole screen to define the 'tracks' 
        that our data signals will travel along.
      */}
      <svg className="absolute w-full h-full opacity-30" preserveAspectRatio="none">
        
        {/* TOP LEFT PATH */}
        <path 
          id="path-top-left" 
          d="M -10,100 L 100,100 L 150,50 L 400,50" 
          fill="none" 
          stroke="#16a34a" 
          strokeWidth="1" 
          strokeDasharray="4 4"
        />
        {/* BOTTOM RIGHT PATH */}
        <path 
          id="path-bottom-right" 
          d="M 110%,calc(100% - 100px) L calc(100% - 100px),calc(100% - 100px) L calc(100% - 150px),calc(100% - 50px) L calc(100% - 400px),calc(100% - 50px)" 
          fill="none" 
          stroke="#16a34a" 
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* LEFT VERTICAL PATH */}
        <path 
          id="path-left" 
          d="M 50,-10 L 50,300 L 100,350 L 100,600" 
          fill="none" 
          stroke="#16a34a" 
          strokeWidth="1"
        />
        {/* RIGHT VERTICAL PATH */}
        <path 
          id="path-right" 
          d="M calc(100% - 50px),110% L calc(100% - 50px),calc(100% - 300px) L calc(100% - 100px),calc(100% - 350px) L calc(100% - 100px),calc(100% - 600px)" 
          fill="none" 
          stroke="#16a34a" 
          strokeWidth="1"
        />

        {/* --- ANIMATING DATA PACKETS (The glowing signals) --- */}
        
        <circle r="3" fill="#4ade80" filter="drop-shadow(0 0 4px #4ade80)">
          <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#path-top-left" />
          </animateMotion>
        </circle>

        <circle r="3" fill="#4ade80" filter="drop-shadow(0 0 4px #4ade80)">
          <animateMotion dur="3s" repeatCount="indefinite" rotate="auto" begin="1s">
            <mpath href="#path-top-left" />
          </animateMotion>
        </circle>

        <circle r="3" fill="#4ade80" filter="drop-shadow(0 0 4px #4ade80)">
          <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
            <mpath href="#path-bottom-right" />
          </animateMotion>
        </circle>

        <circle r="2" fill="#22c55e" filter="drop-shadow(0 0 4px #4ade80)">
          <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
            <mpath href="#path-left" />
          </animateMotion>
        </circle>

        <circle r="2" fill="#22c55e" filter="drop-shadow(0 0 4px #4ade80)">
          <animateMotion dur="4.5s" repeatCount="indefinite" rotate="auto" begin="2s">
            <mpath href="#path-right" />
          </animateMotion>
        </circle>

      </svg>
    </div>
  );
};

// --- Custom Component for the Collision Reveal ---
const QuantumColliderName = ({ text }: { text: string }) => {
  const [hasCollided, setHasCollided] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasCollided(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-[100px] md:h-[120px] pointer-events-none">
      {/* 1. Slicing Laser (Brightened) */}
      <motion.div
        initial={{ width: "0%", opacity: 1 }}
        animate={{ width: "150%", opacity: hasCollided ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-green-300 shadow-[0_0_20px_4px_rgba(74,222,128,0.9)] z-20 rounded-full"
      />

      {/* 2. Impact Shockwave (Brightened) */}
      {hasCollided && (
        <motion.div
          initial={{ scale: 1, opacity: 0.8, height: "2px" }}
          animate={{ scale: 1.5, opacity: 0, height: "100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-1/2 -translate-y-1/2 w-full bg-green-400/40 blur-md z-0"
        />
      )}

      {/* 3. Top Half */}
      <motion.h1
        initial={{ y: -80, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 400, damping: 25 }}
        className="absolute text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tight z-10"
        style={{ clipPath: "inset(0 0 50% 0)" }}
      >
        {text}
      </motion.h1>

      {/* 4. Bottom Half */}
      <motion.h1
        initial={{ y: 80, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 400, damping: 25 }}
        className="absolute text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tight z-10"
        style={{ clipPath: "inset(50% 0 0 0)" }}
      >
        {text}
      </motion.h1>

      {/* 5. Unified Text with Glitch (Brightened Text Shadow) */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: hasCollided ? 1 : 0,
          x: hasCollided ? [0, -4, 4, -2, 2, 0] : 0,
          textShadow: hasCollided 
            ? ["0px 0px 0px transparent", "3px 0px 10px rgba(74,222,128,0.8), -3px 0px 10px rgba(6,95,70,0.8)", "0px 0px 15px rgba(74,222,128,0.6)"] 
            : "0px 0px 15px rgba(74,222,128,0.6)"
        }}
        transition={{ duration: 0.4 }}
        className="absolute text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tight z-30"
      >
        {text}
      </motion.h1>
    </div>
  );
};

export default function HackerHero() {
  // --- Mouse Tracking for Interactions ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Normalized mouse values (-1 to 1) for 3D grid tilt
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    
    normX.set((e.clientX / width) * 2 - 1);
    normY.set((e.clientY / height) * 2 - 1);
  };

  const gridRotateX = useTransform(useSpring(normY, { stiffness: 50, damping: 20 }), [-1, 1], [55, 65]);
  const gridRotateY = useTransform(useSpring(normX, { stiffness: 50, damping: 20 }), [-1, 1], [-5, 5]);

  return (
    <ParticlesProvider init={async (engine) => { await loadSlim(engine); }}>
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-[#0a160f] overflow-hidden font-mono pt-20"
    >
      
      {/* --- NEW: EDGE NETWORK SIGNALS --- */}
      <EdgeNetworkSignals />

      {/* 1. Interactive Neural Network Particles */}
      <Particles
          id="tsparticles"
          className="absolute inset-0 z-0 opacity-100"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
              },
              modes: {
                grab: { 
                  distance: 250, 
                  links: { 
                    opacity: 0.8, 
                    color: "#4ade80",
                    width: 2 
                  } 
                },
              },
            },
            particles: {
              color: { value: "#4ade80" },
              links: {
                color: "#16a34a",
                distance: 180,
                enable: true,
                opacity: 0.3, 
                width: 2.5,
              },
              move: {
                enable: true,
                speed: 0.8,
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "bounce" },
              },
              number: { density: { enable: true, width: 800, height: 800 }, value: 70 },
              opacity: { value: 0.6 },
              shape: { type: "circle" },
              size: { value: { min: 1.5, max: 2.5 } },
            },
            detectRetina: true,
          }}
        />

      {/* 2. Ambient Background Glow (Spotlight Removed) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,101,52,0.3)_0%,rgba(10,22,15,1)_70%)] pointer-events-none z-0" />

      {/* 3. Interactive Parallax 3D Cyberspace Grid */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[70vh] opacity-25 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(transparent 0%, #15803d 2%, transparent 3%), linear-gradient(90deg, transparent 0%, #15803d 2%, transparent 3%)`,
          backgroundSize: '40px 40px',
          transformOrigin: 'bottom',
          rotateX: gridRotateX,
          rotateY: gridRotateY,
          perspective: 500,
          maskImage: 'radial-gradient(ellipse at center bottom, black 0%, transparent 65%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center bottom, black 0%, transparent 65%)',
        }}
      />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl w-full mt-[-5vh] pointer-events-none">
        
        {/* Top Status Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-green-500/60 bg-[#0d2114]/80 backdrop-blur-sm shadow-[0_0_15px_rgba(74,222,128,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
          <span className="text-green-400 text-xs tracking-widest uppercase font-bold">System Online // Ready for input</span>
        </motion.div>

        {/* The Quantum Collider Reveal */}
        <QuantumColliderName text="SHREYAS S SANIL" />

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-green-400/90 text-sm md:text-lg lg:text-xl max-w-2xl font-sans tracking-wide mb-12 mt-6 leading-relaxed drop-shadow-[0_0_5px_rgba(74,222,128,0.3)]"
        >
          I engineer secure, high-performance digital architectures. Bridging the gap between raw data and seamless human experiences.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto pointer-events-auto"
        >
          <button className="relative group px-8 py-3.5 bg-[#0d2114] border border-green-500 text-green-400 font-bold tracking-widest hover:bg-green-400 hover:text-[#0a160f] transition-all duration-300 rounded shadow-[0_0_15px_rgba(74,222,128,0.3)] hover:shadow-[0_0_30px_rgba(74,222,128,0.8)] overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              EXECUTE_PROJECTS
            </span>
          </button>

          <button className="px-8 py-3.5 bg-transparent border border-green-600/80 text-green-400 font-bold tracking-widest hover:border-green-400 hover:text-green-300 hover:bg-[#0d2114]/50 transition-all duration-300 rounded backdrop-blur-sm">
            VIEW_SOURCE
          </button>
        </motion.div>

      </div>
    </div>
    </ParticlesProvider>
  );
}