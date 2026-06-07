import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ==========================================
// 1. LEFT SIDE 3D ELEMENTS (AI & Backend)
// ==========================================

const AIOrbitalCore = () => (
  <motion.div
    className="absolute top-[15%] left-[-10%] sm:left-[2%] z-10 pointer-events-none scale-[0.45] sm:scale-75 lg:scale-100 origin-top-left opacity-80"
    animate={{ y: [-10, 10, -10] }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="relative w-48 h-48" style={{ transformStyle: "preserve-3d" }}>
      <div className="absolute inset-0 rounded-full bg-green-500/5 shadow-[0_0_60px_20px_rgba(74,222,128,0.08)]" />
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 192 192">
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 96 + 80 * Math.cos(rad);
            const y = 96 + 80 * Math.sin(rad);
            return (
              <g key={i}>
                <line x1="96" y1="96" x2={x} y2={y} stroke="#4ade80" strokeWidth="0.5" strokeDasharray="3 6" />
                <circle cx={x} cy={y} r="3" fill="#4ade80" opacity="0.6" />
              </g>
            );
          })}
          <circle cx="96" cy="96" r="80" fill="none" stroke="#16a34a" strokeWidth="0.5" strokeDasharray="8 4" />
        </motion.g>
      </svg>
      <motion.div className="absolute inset-[12%] rounded-full border border-green-400/30" style={{ transformStyle: "preserve-3d" }} animate={{ rotateX: 360, rotateY: 120 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute inset-[18%] rounded-full border border-green-500/40" style={{ transformStyle: "preserve-3d" }} animate={{ rotateY: 360, rotateZ: 60 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute inset-[24%] rounded-full border border-green-600/50" style={{ transformStyle: "preserve-3d" }} animate={{ rotateX: -360, rotateZ: 180 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-5 h-5 bg-green-400 rounded-full shadow-[0_0_30px_10px_rgba(74,222,128,0.5)]" />
      </div>
    </div>
    <div className="mt-2 text-center">
      <div className="text-green-500/60 text-[10px] tracking-[0.25em] font-mono">[ AI_CORE ]</div>
    </div>
  </motion.div>
);

const AIDataStream = () => (
  <motion.div
    className="absolute top-[45%] left-[-5%] sm:left-[3%] z-10 pointer-events-none scale-[0.45] sm:scale-75 lg:scale-100 origin-left opacity-80"
    animate={{ y: [8, -8, 8] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
  >
    <div className="w-36">
      <svg width="100%" viewBox="0 0 130 90" className="opacity-60">
        {[[20, 15], [20, 45], [20, 75]].map(([y1], ni) =>
          [[65, 22], [65, 45], [65, 68]].map(([, y2], nj) => (
            <motion.line key={`${ni}-${nj}`} x1="20" y1={y1} x2="65" y2={y2} stroke="#16a34a" strokeWidth="0.8" animate={{ opacity: [0.1, 0.6, 0.1] }} transition={{ duration: 1.5, delay: (ni + nj) * 0.2, repeat: Infinity }} />
          ))
        )}
        {[[65, 22], [65, 45], [65, 68]].map(([x1, y1], ni) =>
          [[110, 30], [110, 60]].map(([, y2], nj) => (
            <motion.line key={`b-${ni}-${nj}`} x1={x1} y1={y1} x2="110" y2={y2} stroke="#16a34a" strokeWidth="0.8" animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 1.5, delay: (ni + nj) * 0.3 + 0.5, repeat: Infinity }} />
          ))
        )}
        {[15, 45, 75].map(y => <motion.circle key={y} cx="20" cy={y} r="4" fill="#4ade80" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, delay: y * 0.01, repeat: Infinity }} />)}
        {[22, 45, 68].map(y => <motion.circle key={y} cx="65" cy={y} r="5" fill="none" stroke="#22c55e" strokeWidth="1.5" animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.8, delay: y * 0.008, repeat: Infinity }} style={{ transformOrigin: `65px ${y}px` }} />)}
        {[30, 60].map(y => <circle key={y} cx="110" cy={y} r="5" fill="#15803d" stroke="#4ade80" strokeWidth="1" />)}
      </svg>
      <div className="text-green-500/60 text-[10px] tracking-[0.2em] font-mono text-center mt-2">[ NEURAL_NET ]</div>
    </div>
  </motion.div>
);

const DatabaseCylinder = () => (
  <motion.div
    className="absolute bottom-[15%] left-[2%] sm:left-[6%] z-10 pointer-events-none scale-[0.5] sm:scale-75 lg:scale-100 origin-bottom-left opacity-80"
    animate={{ y: [-12, 12, -12] }}
    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="relative w-24 h-40">
      {[0, 1, 2, 3, 4].map((layer) => (
        <div key={layer} className="absolute left-0 w-full border border-green-500/30 rounded-[50%] bg-[#051f0a]/80" style={{ height: '18px', bottom: `${layer * 16}px`, borderColor: `rgba(74,222,128,${0.15 + layer * 0.05})`, boxShadow: layer === 4 ? '0 0 12px rgba(74,222,128,0.15)' : 'none' }} />
      ))}
      {[-1, 0, 1].map((offset) => (
        <div key={offset} className="absolute border-l border-green-600/15" style={{ left: `${50 + offset * 25}%`, bottom: '9px', height: `${4 * 16}px` }} />
      ))}
      <motion.div className="absolute left-0 w-full h-[2px] rounded-[50%]" style={{ background: 'rgba(74,222,128,0.7)', boxShadow: '0 0 10px 2px rgba(74,222,128,0.4)' }} animate={{ bottom: ['5%', '85%', '5%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} />
      {[0, 1].map(i => (
        <motion.div key={i} className="absolute left-1/2 w-1.5 h-1.5 -ml-0.5 bg-green-400 rounded-full shadow-[0_0_6px_rgba(74,222,128,0.8)]" animate={{ bottom: ['5%', '95%'], opacity: [0, 1, 0] }} transition={{ duration: 3, delay: i * 1.4, repeat: Infinity, ease: "easeOut" }} />
      ))}
    </div>
    <div className="text-center mt-4">
      <div className="text-green-500/60 text-[10px] tracking-[0.25em] font-mono">[ DB_SYNC ]</div>
    </div>
  </motion.div>
);

// ==========================================
// 2. RIGHT SIDE 3D ELEMENTS (Cloud & Net)
// ==========================================

const CloudServerStack = () => (
  <motion.div
    className="absolute top-[12%] right-[2%] sm:right-[6%] z-10 pointer-events-none scale-[0.45] sm:scale-75 lg:scale-100 origin-top-right opacity-80"
    animate={{ y: [15, -15, 15] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  >
    <div className="relative w-44 h-56" style={{ perspective: "400px" }}>
      {[0, 1, 2, 3].map((layer) => {
        const zOff = layer * 22;
        return (
          <motion.div
            key={layer}
            className="absolute"
            style={{ left: `${layer * 4}px`, bottom: `${layer * 20}px`, width: `${136 - layer * 8}px`, height: '40px', transform: `rotateX(52deg) rotateZ(-38deg)`, transformStyle: 'preserve-3d', border: '1px solid rgba(74,222,128,0.25)', background: `rgba(5,31,10,${0.7 + layer * 0.05})`, boxShadow: `0 0 20px rgba(74,222,128,0.05), inset 0 0 10px rgba(74,222,128,0.03)` }}
            animate={{ translateZ: [zOff, zOff + 6, zOff] }}
            transition={{ duration: 3 + layer * 0.7, repeat: Infinity, ease: "easeInOut", delay: layer * 0.4 }}
          >
            <div className="absolute inset-0 flex items-center px-2 gap-1.5">
              <div className="flex flex-col gap-1">{[0, 1].map(r => <div key={r} className="w-8 h-1.5 bg-green-900/60 rounded-sm border border-green-700/30" />)}</div>
              <div className="flex-1 h-3 border border-green-600/20 rounded-sm bg-green-900/20" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1 + layer * 0.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
            </div>
            <div className="absolute" style={{ top: '-10px', left: '4px', right: '-4px', height: '10px', background: 'rgba(22,101,52,0.2)', transform: 'skewX(-38deg)', borderTop: '1px solid rgba(74,222,128,0.2)' }} />
          </motion.div>
        );
      })}
    </div>
    <div className="text-center mt-[-10px]">
      <div className="text-green-500/60 text-[10px] tracking-[0.25em] font-mono">[ CLOUD_NODES ]</div>
    </div>
  </motion.div>
);

const NetworkTopology = () => (
  <motion.div
    className="absolute top-[48%] right-[-5%] sm:right-[3%] z-10 pointer-events-none scale-[0.45] sm:scale-75 lg:scale-100 origin-right opacity-80"
    animate={{ y: [-10, 10, -10] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
  >
    <svg width="120" height="100" viewBox="0 0 120 100" className="opacity-60">
      <motion.circle cx="60" cy="50" r="8" fill="none" stroke="#4ade80" strokeWidth="1.5" animate={{ r: [8, 10, 8] }} transition={{ duration: 2, repeat: Infinity }} />
      <circle cx="60" cy="50" r="3" fill="#4ade80" />
      {[[20, 20], [100, 20], [15, 80], [105, 80], [60, 8]].map(([x, y], i) => (
        <g key={i}>
          <motion.line x1="60" y1="50" x2={x} y2={y} stroke="#16a34a" strokeWidth="1" strokeDasharray="3 4" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }} />
          <motion.circle cx={x} cy={y} r="4" fill="#0d2114" stroke="#22c55e" strokeWidth="1" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, delay: i * 0.25, repeat: Infinity }} />
          <motion.circle r="1.5" fill="#4ade80" animate={{ cx: [60, x, 60], cy: [50, y, 50], opacity: [0, 1, 0] }} transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }} />
        </g>
      ))}
    </svg>
    <div className="text-green-500/60 text-[10px] tracking-[0.2em] font-mono text-center mt-2">[ MESH_NET ]</div>
  </motion.div>
);

const CloudMetricsBadge = () => {
  const metrics = [{ label: "UPTIME", val: "99.99%" }, { label: "LATENCY", val: "8ms" }, { label: "RPS", val: "1.2M" }];
  return (
    <motion.div
      className="absolute bottom-[20%] right-[2%] sm:right-[6%] z-10 pointer-events-none scale-[0.6] sm:scale-75 lg:scale-100 origin-bottom-right opacity-90"
      animate={{ y: [6, -6, 6] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
    >
      <div className="border border-green-500/30 bg-[#051f0a]/80 backdrop-blur-sm rounded-sm overflow-hidden w-32">
        {metrics.map(({ label, val }, i) => (
          <motion.div
            key={i}
            className="flex justify-between items-center px-3 py-1.5 border-b border-green-900/50 last:border-0"
            animate={{ backgroundColor: ['rgba(5,31,10,0)', 'rgba(22,101,52,0.15)', 'rgba(5,31,10,0)'] }}
            transition={{ duration: 3, delay: i * 1, repeat: Infinity }}
          >
            <span className="text-green-600/80 text-[8px] font-mono tracking-widest">{label}</span>
            <span className="text-green-400 text-[10px] font-mono font-bold">{val}</span>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-3">
        <div className="text-green-500/60 text-[10px] tracking-[0.2em] font-mono">[ SYS_STAT ]</div>
      </div>
    </motion.div>
  );
};

// ==========================================
// 3. BACKGROUND LINES & CENTER TEXT
// ==========================================

const EdgeNetworkSignals = () => (
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

const HolographicRoleCycler = () => {
  const roles = ["FULL STACK DEVELOPER", "CLOUD ENTHUSIAST", "AI ENTHUSIAST"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % roles.length), 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="relative h-12 w-full overflow-hidden flex justify-center items-center perspective-[1000px] mt-2 mb-6 pointer-events-none">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ rotateX: -180, opacity: 0, filter: "blur(10px)" }}
          animate={{ rotateX: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ rotateX: 180, opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 150, damping: 20 }}
          className="absolute flex items-center gap-3 font-bold text-sm md:text-xl font-mono uppercase tracking-[0.25em]"
          style={{ transformOrigin: "center center -30px" }}
        >
          <span className="text-green-500/40 font-light">[</span>
          <span className="text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">{roles[index]}</span>
          <span className="text-green-500/40 font-light">]</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const QuantumColliderName = ({ text }: { text: string }) => {
  const [hasCollided, setHasCollided] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHasCollided(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-[80px] md:h-[120px] pointer-events-none z-20">
      <motion.div initial={{ width: "0%", opacity: 1 }} animate={{ width: "150%", opacity: hasCollided ? 0 : 1 }} transition={{ duration: 0.5, ease: "easeOut" }} className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-green-300 shadow-[0_0_20px_4px_rgba(74,222,128,0.9)] z-20 rounded-full" />
      {hasCollided && (
        <motion.div initial={{ scale: 1, opacity: 0.8, height: "2px" }} animate={{ scale: 1.5, opacity: 0, height: "100px" }} transition={{ duration: 0.6, ease: "easeOut" }} className="absolute top-1/2 -translate-y-1/2 w-full bg-green-400/40 blur-md z-0" />
      )}
      <motion.h1 initial={{ y: -80, opacity: 0, filter: "blur(10px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 400, damping: 25 }} className="absolute text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight z-10" style={{ clipPath: "inset(0 0 50% 0)" }}>{text}</motion.h1>
      <motion.h1 initial={{ y: 80, opacity: 0, filter: "blur(10px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 400, damping: 25 }} className="absolute text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight z-10" style={{ clipPath: "inset(50% 0 0 0)" }}>{text}</motion.h1>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: hasCollided ? 1 : 0, x: hasCollided ? [0, -4, 4, -2, 2, 0] : 0, textShadow: hasCollided ? ["0px 0px 0px transparent", "3px 0px 10px rgba(74,222,128,0.8), -3px 0px 10px rgba(6,95,70,0.8)", "0px 0px 15px rgba(74,222,128,0.6)"] : "0px 0px 15px rgba(74,222,128,0.6)" }}
        transition={{ duration: 0.4 }}
        className="absolute text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight z-30"
      >{text}</motion.h1>
    </div>
  );
};

// Canvas-based particle network (no third-party dependency)
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: globalThis.MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.parentElement?.addEventListener('mousemove', onMouseMove);

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(74,222,128,0.6)';
        ctx.fill();

        // connect nearby particles
        for (const q of particles) {
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(22,163,74,${0.25 * (1 - dist / 180)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // connect to mouse
        const mdx = p.x - mx, mdy = p.y - my;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 250) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(74,222,128,${0.8 * (1 - mdist / 250)})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-80" />;
};

// ==========================================
// 4. MAIN HERO COMPONENT
// ==========================================

export default function HackerHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
    normX.set((e.clientX / width) * 2 - 1);
    normY.set((e.clientY / height) * 2 - 1);
  };

  const gridRotateX = useTransform(useSpring(normY, { stiffness: 50, damping: 20 }), [-1, 1], [55, 65]);
  const gridRotateY = useTransform(useSpring(normX, { stiffness: 50, damping: 20 }), [-1, 1], [-5, 5]);

  return (
    <div onMouseMove={handleMouseMove} className="relative min-h-screen flex items-center justify-center bg-[#0a160f] overflow-hidden font-mono pt-20">

      <EdgeNetworkSignals />

      {/* --- LEFT SIDE ELEMENTS --- */}
      <AIOrbitalCore />
      <AIDataStream />
      <DatabaseCylinder />

      {/* --- RIGHT SIDE ELEMENTS --- */}
      <CloudServerStack />
      <NetworkTopology />
      <CloudMetricsBadge />

      {/* --- PARTICLE NETWORK --- */}
      <ParticleCanvas />

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(22,101,52,0.3)_0%,rgba(10,22,15,1)_70%)] pointer-events-none z-0" />

      {/* 3D Grid */}
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

      {/* --- CENTER CONTENT --- */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-2xl lg:max-w-4xl w-full mt-[-5vh] pointer-events-none">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-green-500/60 bg-[#0d2114]/80 backdrop-blur-sm shadow-[0_0_15px_rgba(74,222,128,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
          <span className="text-green-400 text-[10px] md:text-xs tracking-widest uppercase font-bold">System Online // Ready for input</span>
        </motion.div>

        <QuantumColliderName text="SHREYAS S SANIL" />
        <HolographicRoleCycler />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-green-400/80 text-xs md:text-base lg:text-lg font-sans tracking-wide mb-10 leading-relaxed drop-shadow-[0_0_5px_rgba(74,222,128,0.3)]"
        >
          Building intelligent, scalable and secure digital ecosystems powered by AI and Cloud technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto pointer-events-auto"
        >
          <button className="relative group px-8 py-3.5 bg-[#0d2114] border border-green-500 text-green-400 font-bold tracking-widest text-xs md:text-sm hover:bg-green-400 hover:text-[#0a160f] transition-all duration-300 rounded shadow-[0_0_15px_rgba(74,222,128,0.3)] hover:shadow-[0_0_30px_rgba(74,222,128,0.8)] overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
              READ_MORE
            </span>
          </button>

          <a
            href="/resume.pdf"
            download="Shreyas_S_Sanil_Resume.pdf"
            className="flex items-center justify-center px-8 py-3.5 bg-transparent border border-green-600/80 text-green-400 font-bold tracking-widest text-xs md:text-sm hover:border-green-400 hover:text-green-300 hover:bg-[#0d2114]/50 transition-all duration-300 rounded backdrop-blur-sm cursor-pointer group"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              DOWNLOAD_RESUME
            </span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}