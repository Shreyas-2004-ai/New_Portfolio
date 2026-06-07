import React, { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// --- 1. Network Signal Edge Animation Component ---
const EdgeNetworkSignals = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <svg className="absolute w-full h-full opacity-30" preserveAspectRatio="none">
        <path id="path-top-left" d="M -10,100 L 100,100 L 150,50 L 400,50" fill="none" stroke="#16a34a" strokeWidth="1" strokeDasharray="4 4" />
        <path id="path-bottom-right" d="M 110%,calc(100% - 100px) L calc(100% - 100px),calc(100% - 100px) L calc(100% - 150px),calc(100% - 50px) L calc(100% - 400px),calc(100% - 50px)" fill="none" stroke="#16a34a" strokeWidth="1" strokeDasharray="4 4" />
        <path id="path-left" d="M 50,-10 L 50,300 L 100,350 L 100,600" fill="none" stroke="#16a34a" strokeWidth="1" />
        <path id="path-right" d="M calc(100% - 50px),110% L calc(100% - 50px),calc(100% - 300px) L calc(100% - 100px),calc(100% - 350px) L calc(100% - 100px),calc(100% - 600px)" fill="none" stroke="#16a34a" strokeWidth="1" />

        <circle r="3" fill="#4ade80" filter="drop-shadow(0 0 4px #4ade80)"><animateMotion dur="4s" repeatCount="indefinite" rotate="auto"><mpath href="#path-top-left" /></animateMotion></circle>
        <circle r="3" fill="#4ade80" filter="drop-shadow(0 0 4px #4ade80)"><animateMotion dur="3s" repeatCount="indefinite" rotate="auto" begin="1s"><mpath href="#path-top-left" /></animateMotion></circle>
        <circle r="3" fill="#4ade80" filter="drop-shadow(0 0 4px #4ade80)"><animateMotion dur="5s" repeatCount="indefinite" rotate="auto"><mpath href="#path-bottom-right" /></animateMotion></circle>
        <circle r="2" fill="#22c55e" filter="drop-shadow(0 0 4px #4ade80)"><animateMotion dur="6s" repeatCount="indefinite" rotate="auto"><mpath href="#path-left" /></animateMotion></circle>
        <circle r="2" fill="#22c55e" filter="drop-shadow(0 0 4px #4ade80)"><animateMotion dur="4.5s" repeatCount="indefinite" rotate="auto" begin="2s"><mpath href="#path-right" /></animateMotion></circle>
      </svg>
    </div>
  );
};

// --- 2. Hardware Accelerated 3D Wireframe Cube ---
const FloatingWireframeCube = ({ size, top, left, right, bottom, duration, reverse }: any) => {
  return (
    <div 
      className="absolute z-0 pointer-events-none"
      style={{ top, left, right, bottom, width: size, height: size, perspective: '1000px' }}
    >
      <motion.div
        animate={{ rotateX: reverse ? -360 : 360, rotateY: reverse ? 360 : -360, rotateZ: 360 }}
        transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Cube Faces */}
        {['front', 'back', 'top', 'bottom', 'left', 'right'].map((face, index) => {
          const transforms: Record<string, string> = {
            front: `translateZ(${size/2}px)`,
            back: `rotateY(180deg) translateZ(${size/2}px)`,
            right: `rotateY(90deg) translateZ(${size/2}px)`,
            left: `rotateY(-90deg) translateZ(${size/2}px)`,
            top: `rotateX(90deg) translateZ(${size/2}px)`,
            bottom: `rotateX(-90deg) translateZ(${size/2}px)`,
          };
          return (
            <div 
              key={index}
              className="absolute inset-0 border border-green-500/20 bg-green-500/[0.02] shadow-[0_0_15px_rgba(74,222,128,0.05)]"
              style={{ transform: transforms[face], backfaceVisibility: 'hidden' }}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

// --- 3. Holographic 3D Role Cycler ---
const HolographicRoleCycler = () => {
  const roles = ["FULL STACK DEVELOPER", "CLOUD ENTHUSIAST", "AI ENTHUSIAST"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000); // Changes every 3 seconds
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="relative h-10 w-full overflow-hidden flex justify-center items-center perspective-[1000px] mt-2 mb-6">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ rotateX: -90, opacity: 0, filter: "blur(4px)" }}
          animate={{ rotateX: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ rotateX: 90, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
          className="absolute flex items-center gap-3 font-bold tracking-[0.2em] text-sm md:text-lg"
          style={{ transformOrigin: "center center -20px" }}
        >
          <span className="text-green-500/50">{'<'}</span>
          <span className="text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">
            {roles[index]}
          </span>
          <span className="text-green-500/50">{'/>'}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- 4. Custom Component for the Collision Reveal ---
const QuantumColliderName = ({ text }: { text: string }) => {
  const [hasCollided, setHasCollided] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasCollided(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-[80px] md:h-[120px] pointer-events-none">
      <motion.div
        initial={{ width: "0%", opacity: 1 }}
        animate={{ width: "150%", opacity: hasCollided ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-green-300 shadow-[0_0_20px_4px_rgba(74,222,128,0.9)] z-20 rounded-full"
      />

      {hasCollided && (
        <motion.div
          initial={{ scale: 1, opacity: 0.8, height: "2px" }}
          animate={{ scale: 1.5, opacity: 0, height: "100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-1/2 -translate-y-1/2 w-full bg-green-400/40 blur-md z-0"
        />
      )}

      <motion.h1
        initial={{ y: -80, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 400, damping: 25 }}
        className="absolute text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight z-10"
        style={{ clipPath: "inset(0 0 50% 0)" }}
      >
        {text}
      </motion.h1>

      <motion.h1
        initial={{ y: 80, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 400, damping: 25 }}
        className="absolute text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight z-10"
        style={{ clipPath: "inset(50% 0 0 0)" }}
      >
        {text}
      </motion.h1>

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
        className="absolute text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight z-30"
      >
        {text}
      </motion.h1>
    </div>
  );
};

export default function HackerHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    normX.set((e.clientX / width) * 2 - 1);
    normY.set((e.clientY / height) * 2 - 1);
  };

  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  const gridRotateX = useTransform(useSpring(normY, { stiffness: 50, damping: 20 }), [-1, 1], [55, 65]);
  const gridRotateY = useTransform(useSpring(normX, { stiffness: 50, damping: 20 }), [-1, 1], [-5, 5]);

  return (
    <ParticlesProvider init={async (engine) => { await loadSlim(engine); }}>
    <div 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-[#0a160f] overflow-hidden font-mono pt-20"
    >
      
      {/* Edge Network Signals */}
      <EdgeNetworkSignals />

      {/* 3D Floating Background Geometry */}
      <FloatingWireframeCube size={120} top="20%" left="10%" duration={25} />
      <FloatingWireframeCube size={80} bottom="30%" right="15%" duration={18} reverse={true} />
      <FloatingWireframeCube size={160} top="40%" left="-5%" duration={35} reverse={true} />

      {/* Interactive Neural Network Particles */}
      <Particles
          id="tsparticles"
          className="absolute inset-0 z-0 opacity-100"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            interactivity: {
              events: { onHover: { enable: true, mode: "grab" } },
              modes: { grab: { distance: 250, links: { opacity: 0.8, color: "#4ade80", width: 2 } } },
            },
            particles: {
              color: { value: "#4ade80" },
              links: { color: "#16a34a", distance: 180, enable: true, opacity: 0.3, width: 2.5 },
              move: { enable: true, speed: 0.8, direction: "none", random: true, straight: false, outModes: { default: "bounce" } },
              number: { density: { enable: true, width: 800, height: 800 }, value: 70 },
              opacity: { value: 0.6 },
              shape: { type: "circle" },
              size: { value: { min: 1.5, max: 2.5 } },
            },
            detectRetina: true,
          }}
        />

      {/* Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,101,52,0.3)_0%,rgba(10,22,15,1)_70%)] pointer-events-none z-0" />

      {/* Interactive Parallax 3D Cyberspace Grid */}
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
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-green-500/60 bg-[#0d2114]/80 backdrop-blur-sm shadow-[0_0_15px_rgba(74,222,128,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
          <span className="text-green-400 text-xs tracking-widest uppercase font-bold">System Online // Ready for input</span>
        </motion.div>

        {/* The Quantum Collider Reveal (Your Name) */}
        <QuantumColliderName text="SHREYAS S SANIL" />

        {/* NEW: 3D Holographic Role Cycler */}
        <HolographicRoleCycler />

        {/* NEW: Updated Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-green-400/80 text-sm md:text-base lg:text-lg max-w-2xl font-sans tracking-wide mb-10 leading-relaxed drop-shadow-[0_0_5px_rgba(74,222,128,0.3)]"
        >
          Building intelligent, scalable and secure digital ecosystems powered by AI and Cloud technologies.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto pointer-events-auto"
        >
          {/* Read More Button */}
          <button className="relative group px-8 py-3.5 bg-[#0d2114] border border-green-500 text-green-400 font-bold tracking-widest hover:bg-green-400 hover:text-[#0a160f] transition-all duration-300 rounded shadow-[0_0_15px_rgba(74,222,128,0.3)] hover:shadow-[0_0_30px_rgba(74,222,128,0.8)] overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>
              READ_MORE
            </span>
          </button>

          {/* Download Resume Button (Native Anchor Link) */}
          <a 
            href="/resume.pdf" 
            download="Shreyas_S_Sanil_Resume.pdf"
            className="flex items-center justify-center px-8 py-3.5 bg-transparent border border-green-600/80 text-green-400 font-bold tracking-widest hover:border-green-400 hover:text-green-300 hover:bg-[#0d2114]/50 transition-all duration-300 rounded backdrop-blur-sm cursor-pointer group"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              DOWNLOAD_RESUME
            </span>
          </a>
        </motion.div>

      </div>
    </div>
    </ParticlesProvider>
  );
}