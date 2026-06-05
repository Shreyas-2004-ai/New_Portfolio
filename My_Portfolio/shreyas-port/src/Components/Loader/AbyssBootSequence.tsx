import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// --- Data Streams Content ---
const TECH_STREAMS = [
  "INIT_K8S_CLUSTER_09", "ROUTING_SEC_PACKET_99", "DOCKER_IMAGE_PULLED",
  "NEURAL_WEIGHTS_SYNC_88", "AUTH_TOKEN_VALIDATING", "SYS_CORE_TEMP_OPTIMAL"
];

// Reduced to 15 lines so it doesn't take forever
const BOOT_LOGS = Array.from({ length: 15 }).map(() => {
  const codes = ["[OK]", "[INFO]", "[WARN]", "[SEC]"];
  const msg = [
    "MOUNTING VIRTUAL DOM...", "BYPASSING MAINFRAME FIREWALL...",
    "DECRYPTING PAYLOAD...", "ESTABLISHING NEURAL LINK...",
    "INJECTING CYBER-STYLES...", "ALLOCATING MEMORY BLOCKS...",
    "CLOUD INSTANCE SPINNING UP...", "NODE.JS RUNTIME VERIFIED..."
  ];
  const code = codes[Math.floor(Math.random() * codes.length)];
  const m = msg[Math.floor(Math.random() * msg.length)];
  const hex = `0x${Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0')}`;
  return `${code} ${hex} : ${m}`;
});

const generateParticles = (count: number) => Array.from({ length: count }).map((_, i) => ({
  id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 3 + 1, delay: Math.random() * 2,
}));

export default function AbyssBootSequence({ onComplete }: { onComplete: () => void }) {
  const [isFinished, setIsFinished] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const phase1TextRef = useRef<HTMLDivElement>(null);
  const streamsRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const phase6TextRef = useRef<HTMLDivElement>(null);
  const bootLogContainerRef = useRef<HTMLDivElement>(null);

  const particles = React.useMemo(() => generateParticles(40), []);
  const streams = React.useMemo(() => Array.from({ length: 12 }), []);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsFinished(true);
        setTimeout(onComplete, 600); // Trigger page load quickly after finish
      }
    });

    gsap.set([phase1TextRef.current, streamsRef.current, coreRef.current, phase6TextRef.current, bootLogContainerRef.current], { opacity: 0 });
    gsap.set(coreRef.current, { scale: 0.5 });
    gsap.set(scanRef.current, { top: "-10%", opacity: 0 });

    /* PHASE 1: Signal Detected */
    tl.to(phase1TextRef.current, { opacity: 1, duration: 0.8, ease: "power2.inOut" })
      .to(phase1TextRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" });

    /* PHASE 2 & 3: Streams & Core */
    // Increased target opacity so streams are visible
    tl.to(streamsRef.current, { opacity: 0.5, duration: 1 }, "-=0.3")
      .to(coreRef.current, { opacity: 1, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.6)" }, "-=0.5");

    /* PHASE 4: Scan */
    tl.to(scanRef.current, { opacity: 1, duration: 0.1 })
      .to(scanRef.current, { top: "110%", duration: 0.8, ease: "power2.inOut" })
      .to(scanRef.current, { opacity: 0, duration: 0.1 });

    /* PHASE 5: Access Granted */
    tl.to([streamsRef.current, coreRef.current], { opacity: 0.1, filter: "blur(4px)", duration: 0.3 })
      .to(phase6TextRef.current, { opacity: 1, scale: 1.1, duration: 0.1 })
      .to(phase6TextRef.current, { opacity: 0, duration: 0.4, delay: 0.4 });

    /* PHASE 6: Rapid Printing Terminal Codes */
    tl.to(bootLogContainerRef.current, { opacity: 1, duration: 0.1 })
      .fromTo(
        ".boot-log-line", // Targets all lines
        { opacity: 0, x: -10 },
        { 
          opacity: 1, 
          x: 0, 
          stagger: 0.04, // Pops them in super fast one after another
          duration: 0.1, 
          ease: "none" 
        }
      )
      .to(bootLogContainerRef.current, { opacity: 0, filter: "blur(8px)", duration: 0.4, delay: 0.3 });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          ref={containerRef}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#010510] overflow-hidden font-mono"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,50,90,0.2)_0%,rgba(1,5,16,1)_70%)] pointer-events-none" />

          {/* Particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"
              style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
              animate={{ y: [0, -30, 0], opacity: [0, 0.5, 0] }}
              transition={{ duration: Math.random() * 3 + 3, repeat: Infinity, delay: p.delay, ease: "linear" }}
            />
          ))}

          {/* Data Streams - Fixed Text Colors */}
          <div ref={streamsRef} className="absolute inset-0 flex justify-between px-10 mix-blend-screen opacity-0 pointer-events-none">
            {streams.map((_, i) => (
              <div key={i} className="flex flex-col gap-6 animate-[data-stream_12s_linear_infinite]" style={{ animationDelay: `${-Math.random() * 12}s` }}>
                {Array.from({ length: 15 }).map((_, j) => (
                  <span key={j} className="text-cyan-500/40 text-xs font-semibold whitespace-nowrap">
                    {TECH_STREAMS[Math.floor(Math.random() * TECH_STREAMS.length)]}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* AI Core */}
          <div ref={coreRef} className="relative z-10 flex items-center justify-center opacity-0 pointer-events-none">
            <div className="absolute w-32 h-32 bg-cyan-400 rounded-full blur-2xl opacity-40 mix-blend-screen" />
            <div className="relative w-16 h-16 bg-[#0a192f] border-2 border-cyan-300 rounded-full shadow-[0_0_50px_rgba(34,211,238,0.8),inset_0_0_20px_rgba(34,211,238,0.5)] flex items-center justify-center">
              <div className="w-8 h-8 bg-cyan-200 rounded-full blur-[2px] animate-pulse" />
            </div>
          </div>

          {/* Auth Scan Line */}
          <div ref={scanRef} className="absolute left-0 right-0 h-32 z-20 pointer-events-none opacity-0">
            <div className="w-full h-[2px] bg-cyan-400 shadow-[0_0_20px_2px_#22d3ee]" />
            <div className="w-full h-full bg-gradient-to-b from-cyan-400/20 to-transparent" />
          </div>

          {/* Typography Layers */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <div ref={phase1TextRef} className="absolute text-cyan-400 text-sm tracking-[0.5em] opacity-0 drop-shadow-[0_0_5px_#22d3ee]">SIGNAL DETECTED</div>
            <div ref={phase6TextRef} className="absolute text-cyan-300 text-xl md:text-2xl font-bold tracking-[0.3em] opacity-0 drop-shadow-[0_0_15px_rgba(34,211,238,1)] bg-[#010510]/50 px-6 py-2 rounded">ACCESS GRANTED</div>
          </div>

          {/* Terminal Logs - Fixed Appearance & Animation */}
          <div ref={bootLogContainerRef} className="absolute inset-0 flex items-center justify-start pl-8 md:pl-24 z-40 pointer-events-none opacity-0">
            {/* Added a subtle gradient mask so the top of the list fades out smoothly */}
            <div className="flex flex-col gap-1.5 text-[11px] md:text-xs text-cyan-400/90 font-mono tracking-wider w-full text-left drop-shadow-[0_0_3px_rgba(34,211,238,0.6)] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black)]">
              {BOOT_LOGS.map((log, idx) => (
                <div key={idx} className="boot-log-line opacity-0">{log}</div>
              ))}
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}