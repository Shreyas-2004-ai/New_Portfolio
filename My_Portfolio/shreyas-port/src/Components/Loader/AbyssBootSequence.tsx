import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// --- Data Streams Content ---
const TECH_STREAMS = [
  "INIT_K8S_CLUSTER_09", "ROUTING_SEC_PACKET_99", "DOCKER_IMAGE_PULLED",
  "NEURAL_WEIGHTS_SYNC_88", "AUTH_TOKEN_VALIDATING", "SYS_CORE_TEMP_OPTIMAL"
];

// Rapid-fire boot logs
const BOOT_LOGS = Array.from({ length: 45 }).map(() => {
  const codes = ["[OK]", "[INFO]", "[WARN]", "[SEC]"];
  const msg = [
    "MOUNTING VIRTUAL DOM...", "BYPASSING MAINFRAME FIREWALL...",
    "DECRYPTING PAYLOAD...", "ESTABLISHING NEURAL LINK...",
    "INJECTING CYBER-STYLES...", "ALLOCATING MEMORY BLOCKS...",
    "CLOUD INSTANCE SPINNING UP...", "NODE.JS RUNTIME VERIFIED...",
    "COMPILING KERNEL MODULES...", "VERIFYING CHECKSUMS..."
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
  
  // MASSIVELY increased the number of stream columns (from 12 to 24)
  const streams = React.useMemo(() => Array.from({ length: 24 }), []);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsFinished(true);
        setTimeout(onComplete, 600); 
      }
    });

    gsap.set([phase1TextRef.current, streamsRef.current, coreRef.current, phase6TextRef.current, bootLogContainerRef.current], { opacity: 0 });
    gsap.set(coreRef.current, { scale: 0.5 });
    gsap.set(scanRef.current, { top: "-10%", opacity: 0 });

    /* PHASE 1: Signal Detected */
    tl.to(phase1TextRef.current, { opacity: 1, duration: 0.8, ease: "power2.inOut" })
      .to(phase1TextRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" });

    /* PHASE 2 & 3: Streams & Core */
    // Increased opacity here from 0.5 to 0.85 so the background code is very bright
    tl.to(streamsRef.current, { opacity: 0.85, duration: 1 }, "-=0.3")
      .to(coreRef.current, { opacity: 1, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.6)" }, "-=0.5");

    /* PHASE 4: Scan */
    tl.to(scanRef.current, { opacity: 1, duration: 0.1 })
      .to(scanRef.current, { top: "110%", duration: 0.8, ease: "power2.inOut" })
      .to(scanRef.current, { opacity: 0, duration: 0.1 });

    /* PHASE 5: Access Granted */
    // Keeps the streams slightly more visible even when blurred
    tl.to([streamsRef.current, coreRef.current], { opacity: 0.2, filter: "blur(4px)", duration: 0.3 })
      .to(phase6TextRef.current, { opacity: 1, scale: 1.1, duration: 0.1 })
      .to(phase6TextRef.current, { opacity: 0, duration: 0.4, delay: 0.4 });

    /* PHASE 6: Massive Terminal Dump */
    tl.to(bootLogContainerRef.current, { opacity: 1, duration: 0.1 })
      .fromTo(
        ".boot-log-line", 
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, stagger: 0.02, duration: 0.1, ease: "none" }
      )
      .to(bootLogContainerRef.current, { opacity: 0, filter: "blur(8px)", duration: 0.4, delay: 0.4 });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          ref={containerRef}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#010a05] overflow-hidden font-mono"
        >
          {/* Ambient Green Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,70,30,0.25)_0%,rgba(1,10,5,1)_70%)] pointer-events-none" />

          {/* Particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute bg-green-400 rounded-full shadow-[0_0_8px_#4ade80]"
              style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
              animate={{ y: [0, -30, 0], opacity: [0, 0.5, 0] }}
              transition={{ duration: Math.random() * 3 + 3, repeat: Infinity, delay: p.delay, ease: "linear" }}
            />
          ))}

          {/* DENSE Data Streams - Much brighter and more packed */}
          <div ref={streamsRef} className="absolute inset-0 flex justify-between px-2 mix-blend-screen opacity-0 pointer-events-none">
            {streams.map((_, i) => (
              // Sped up animation from 12s to 8s for more energy
              <div key={i} className="flex flex-col gap-4 animate-[data-stream_8s_linear_infinite]" style={{ animationDelay: `${-Math.random() * 8}s` }}>
                {/* Increased rows per column from 15 to 30 */}
                {Array.from({ length: 30 }).map((_, j) => (
                  // Opacity bumped to 80%, font-bold added, strong drop-shadow added
                  <span key={j} className="text-green-400/80 text-[10px] md:text-xs font-bold whitespace-nowrap drop-shadow-[0_0_6px_rgba(74,222,128,0.8)]">
                    {TECH_STREAMS[Math.floor(Math.random() * TECH_STREAMS.length)]}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* AI Core */}
          <div ref={coreRef} className="relative z-10 flex items-center justify-center opacity-0 pointer-events-none">
            <div className="absolute w-32 h-32 bg-green-400 rounded-full blur-2xl opacity-30 mix-blend-screen" />
            <div className="relative w-16 h-16 bg-[#051f0a] border-2 border-green-400 rounded-full shadow-[0_0_50px_rgba(74,222,128,0.8),inset_0_0_20px_rgba(74,222,128,0.5)] flex items-center justify-center">
              <div className="w-8 h-8 bg-green-300 rounded-full blur-[2px] animate-pulse" />
            </div>
          </div>

          {/* Auth Scan Line */}
          <div ref={scanRef} className="absolute left-0 right-0 h-32 z-20 pointer-events-none opacity-0">
            <div className="w-full h-[2px] bg-green-400 shadow-[0_0_20px_2px_#4ade80]" />
            <div className="w-full h-full bg-gradient-to-b from-green-400/20 to-transparent" />
          </div>

          {/* Typography Layers */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <div ref={phase1TextRef} className="absolute text-green-400 text-sm tracking-[0.5em] opacity-0 drop-shadow-[0_0_5px_#4ade80]">SIGNAL DETECTED</div>
            <div ref={phase6TextRef} className="absolute text-green-300 text-xl md:text-2xl font-bold tracking-[0.3em] opacity-0 drop-shadow-[0_0_15px_rgba(74,222,128,1)] bg-[#010a05]/80 backdrop-blur-md px-6 py-2 rounded border border-green-500/50">ACCESS GRANTED</div>
          </div>

          {/* Terminal Logs */}
          <div ref={bootLogContainerRef} className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-40 pointer-events-none opacity-0">
            <div className="flex flex-col gap-[2px] text-[10px] md:text-xs text-green-400/90 font-mono tracking-wider w-full text-left drop-shadow-[0_0_4px_rgba(74,222,128,0.6)] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black)]">
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