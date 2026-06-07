import React, { useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'signal' | 'core' | 'logs' | 'granted';

interface AbyssBootSequenceProps {
  onComplete: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BOOT_LOGS: string[] = [
  '[0x00] BIOS_POST... OK',
  '[0x01] CPU_CORES: 128 detected',
  '[0x02] RAM: 65536MB ECC verified',
  '[0x03] ENTROPY_POOL: seeded',
  '[0x04] KERNEL loading /boot/vmlinuz-9.0.1',
  '[0x05] INITRD decompressing...',
  '[0x06] PCI_BUS: enumerating devices',
  '[0x07] NVMe_0: 8TB online',
  '[0x08] CRYPT_MAPPER: AES-512-XTS',
  '[0x09] NET_STACK: IPv6 ready',
  '[0x0A] FIREWALL: rule chain loaded (4096 rules)',
  '[0x0B] SECBOOT: signature OK',
  '[0x0C] TPM2: PCR[7] sealed',
  '[0x0D] SSH: ed25519 host key loaded',
  '[0x0E] TLS: cipher suite TLS_CHACHA20_POLY1305 active',
  '[0x0F] MEMORY_MAP: 0x00000000–0xFFFFFFFF',
  '[0x10] SCHEDULER: CFS quantum 100μs',
  '[0x11] GPU_DRIVER: VRAM 24GB mapped',
  '[0x12] AUDIT_DAEMON: inotify watches: 16384',
  '[0x13] SYSLOG: remote sink 10.0.0.1:514',
  '[0x14] CGROUP_v2: hierarchy mounted',
  '[0x15] USER_NS: isolation enabled',
  '[0x16] SECCOMP: filter applied (222 syscalls)',
  '[0x17] IDENTITY: loading credentials...',
  '[0x18] VERIFY: HMAC-SHA3-512 ... PASS',
  '[0x19] DECRYPTING payload... done',
  '[0x1A] NEURAL_SYNC: weights checksum OK',
  '[0x1B] MODEL: context window 2M tokens',
  '[0x1C] VECTOR_STORE: 4096-dim embeddings online',
  '[0x1D] INFERENCE_ENGINE: ready',
  '[0x1E] ABYSS_OS boot complete — 00.847s',
];

const LOG_SUCCESS_KEYWORDS = ['PASS', ' OK', 'complete', 'ready', 'online', 'active', 'verified', 'seeded'];
const LOG_WARN_KEYWORDS    = ['filter', 'WARN', 'isolation'];

function getLogColor(line: string): string {
  if (LOG_SUCCESS_KEYWORDS.some((k) => line.includes(k))) return '#00ff80';
  if (LOG_WARN_KEYWORDS.some((k) => line.includes(k))) return '#ffcc00';
  return 'rgba(0,255,128,0.55)';
}

// ─── Binary Rain Canvas Hook ──────────────────────────────────────────────────

function useBinaryRain(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  speedRef: React.MutableRefObject<number>,
  active: boolean,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COL_W = 16;
    let animId: number;

    function resize() {
      if (!canvas) return;
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();

    const cols  = Math.floor(canvas.width / COL_W);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);

    function draw() {
      if (!canvas || !ctx) return;
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const isHead = Math.random() > 0.85;
        ctx.fillStyle = isHead
          ? '#80ffb8'
          : Math.random() > 0.6
          ? '#00ff80'
          : 'rgba(0,200,80,0.55)';

        ctx.font = `${Math.random() > 0.7 ? 'bold ' : ''}13px Courier New`;
        ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * COL_W, drops[i] * 18);

        if (drops[i] * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += speedRef.current;
      }

      animId = requestAnimationFrame(draw);
    }

    if (active) draw();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [active, canvasRef, speedRef]);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const SignalPhase: React.FC = () => (
  <div style={styles.centeredLayer}>
    <div style={styles.systemBoot}>SYSTEM BOOT v4.2.0</div>

    <div style={styles.spinnerWrapper}>
      <div style={styles.pulseRing1} />
      <div style={styles.pulseRing2} />
      <div style={styles.spinnerRing} />
    </div>

    <div style={styles.initLabel}>INITIALIZING</div>

    <div style={styles.dotsRow}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            ...styles.dot,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  </div>
);

interface CorePhaseProps {
  progress: number;
}

const CorePhase: React.FC<CorePhaseProps> = ({ progress }) => (
  <div style={styles.centeredLayer}>
    <div style={styles.glitchWrapper}>
      <span style={styles.mainTitle}>ABYSS_OS</span>
      <span style={styles.glitchCopy} aria-hidden="true">ABYSS_OS</span>
    </div>

    <div style={styles.kernelRow}>
      <div style={styles.dividerLine} />
      <span style={styles.kernelLabel}>KERNEL 9.0.1-SECURE</span>
      <div style={styles.dividerLine} />
    </div>

    <div style={styles.progressTrack}>
      <div style={{ ...styles.progressFill, width: `${progress}%` }} />
    </div>

    <div style={styles.progressLabel}>{Math.floor(progress)}%</div>
  </div>
);

interface LogsPhaseProps {
  lines: string[];
}

const LogsPhase: React.FC<LogsPhaseProps> = ({ lines }) => (
  <div style={styles.logsContainer}>
    <div style={styles.logLines}>
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            ...styles.logLine,
            color: getLogColor(line),
          }}
        >
          {line}
        </div>
      ))}
    </div>
  </div>
);

const GrantedPhase: React.FC = () => (
  <div style={styles.grantedOverlay}>
    <div style={styles.grantedCard}>
      <div style={styles.grantedTopEdge} />
      <div style={styles.grantedBottomEdge} />
      <div style={styles.grantedStatus}>STATUS</div>
      <div style={styles.grantedTitle}>ACCESS GRANTED</div>
      <div style={styles.grantedDivider} />
      <div style={styles.grantedSubtitle}>IDENTITY VERIFIED • SECURE LINK ACTIVE</div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AbyssBootSequence({ onComplete }: AbyssBootSequenceProps) {
  const [phase, setPhase]       = useState<Phase>('signal');
  const [progress, setProgress] = useState(0);
  const [logLines, setLogLines] = useState<string[]>([]);
  const [visible, setVisible]   = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef  = useRef<number>(1);

  useBinaryRain(canvasRef, speedRef, visible);

  // ── Phase orchestration ──────────────────────────────────────────────────

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let cancelled = false;

    const runGranted = () => {
      if (cancelled) return;
      speedRef.current = 0.3;
      setPhase('granted');
      setTimeout(() => {
        if (cancelled) return;
        setVisible(false);
        onCompleteRef.current();
      }, 1600);
    };

    const runLogs = () => {
      if (cancelled) return;
      speedRef.current = 2.5;
      setPhase('logs');
      let i = 0;
      function addNext() {
        if (cancelled) return;
        if (i >= BOOT_LOGS.length) {
          setTimeout(runGranted, 250);
          return;
        }
        setLogLines((prev) => {
          const next = [...prev, BOOT_LOGS[i]];
          return next.length > 18 ? next.slice(next.length - 18) : next;
        });
        i++;
        setTimeout(addNext, 55 + Math.random() * 30);
      }
      addNext();
    };

    const runProgressBar = () => {
      if (cancelled) return;
      speedRef.current = 1.5;
      setPhase('core');
      let pct = 0;
      const iv = setInterval(() => {
        if (cancelled) { clearInterval(iv); return; }
        pct = Math.min(pct + Math.random() * 4 + 1, 100);
        setProgress(pct);
        if (pct >= 100) {
          clearInterval(iv);
          setTimeout(runLogs, 300);
        }
      }, 55);
    };

    const timer = setTimeout(runProgressBar, 2200);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  return (
    <div style={styles.root}>
      <style>{keyframes}</style>

      {/* Binary rain canvas */}
      <canvas ref={canvasRef} style={styles.canvas} />

      {/* CRT scanline sweep */}
      <div style={styles.scanline} />

      {/* CRT horizontal lines overlay */}
      <div style={styles.crtLines} />

      {/* Phases */}
      {phase === 'signal'  && <SignalPhase />}
      {phase === 'core'    && <CorePhase progress={progress} />}
      {phase === 'logs'    && <LogsPhase lines={logLines} />}
      {phase === 'granted' && <GrantedPhase />}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  root: {
    position: 'fixed',
    inset: 0,
    background: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Courier New', monospace",
    overflow: 'hidden',
    zIndex: 100,
  },
  canvas: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    opacity: 0.55,
    pointerEvents: 'none',
  },
  scanline: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    background: 'linear-gradient(to bottom, rgba(0,255,128,0), rgba(0,255,128,0.18) 50%, rgba(0,255,128,0))',
    pointerEvents: 'none',
    zIndex: 5,
    animation: 'scanline 3s linear infinite',
  },
  crtLines: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 4,
    background:
      'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)',
  },
  fadeOut: {
    position: 'absolute',
    inset: 0,
    background: '#000',
    animation: 'fadeIn 0.4s ease forwards',
    zIndex: 50,
  },

  // Signal phase
  centeredLayer: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    zIndex: 10,
  },
  systemBoot: {
    color: '#00ff80',
    fontSize: 11,
    letterSpacing: '0.4em',
    opacity: 0.6,
    animation: 'flicker 2s ease-in-out infinite',
  },
  spinnerWrapper: {
    position: 'relative',
    width: 64,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing1: {
    position: 'absolute',
    inset: 0,
    border: '1px solid rgba(0,255,128,0.3)',
    borderRadius: '50%',
    animation: 'pulseRing 2s ease-out infinite',
  },
  pulseRing2: {
    position: 'absolute',
    inset: 0,
    border: '1px solid rgba(0,255,128,0.2)',
    borderRadius: '50%',
    animation: 'pulseRing 2s ease-out infinite 0.5s',
  },
  spinnerRing: {
    width: 36,
    height: 36,
    border: '1.5px solid rgba(0,255,128,0.9)',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  initLabel: {
    color: '#00ff80',
    fontSize: 14,
    letterSpacing: '0.25em',
  },
  dotsRow: {
    display: 'flex',
    gap: 6,
    alignItems: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    background: '#00ff80',
    borderRadius: '50%',
    animation: 'dotBounce 1.4s ease-in-out infinite',
  },

  // Core phase
  glitchWrapper: {
    position: 'relative',
    fontSize: 28,
    fontWeight: 700,
    color: '#00ff80',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    lineHeight: 1,
  },
  mainTitle: {
    display: 'block',
  },
  glitchCopy: {
    position: 'absolute',
    inset: 0,
    color: '#00e5ff',
    animation: 'glitch 2.5s step-end infinite',
    pointerEvents: 'none',
  },
  kernelRow: {
    display: 'flex',
    gap: 6,
    alignItems: 'center',
    margin: '4px 0',
  },
  dividerLine: {
    width: 1,
    height: 12,
    background: 'rgba(0,255,128,0.3)',
  },
  kernelLabel: {
    color: 'rgba(0,255,128,0.5)',
    fontSize: 10,
    letterSpacing: '0.3em',
  },
  progressTrack: {
    width: 220,
    height: 1,
    background: 'rgba(0,255,128,0.15)',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 1,
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    background: '#00ff80',
    transition: 'width 0.1s linear',
  },
  progressLabel: {
    color: 'rgba(0,255,128,0.5)',
    fontSize: 10,
    letterSpacing: '0.25em',
  },

  // Logs phase
  logsContainer: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '20px 24px',
    zIndex: 10,
    overflow: 'hidden',
  },
  logLines: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%)',
    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%)',
  },
  logLine: {
    fontSize: 10,
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    animation: 'fadeInUp 0.1s ease',
  },

  // Granted phase
  grantedOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  grantedCard: {
    border: '1px solid rgba(0,255,128,0.4)',
    padding: '20px 36px',
    textAlign: 'center',
    position: 'relative',
  },
  grantedTopEdge: {
    position: 'absolute',
    top: -1,
    left: 12,
    right: 12,
    height: 1,
    background: 'linear-gradient(to right, transparent, #00ff80, transparent)',
  },
  grantedBottomEdge: {
    position: 'absolute',
    bottom: -1,
    left: 12,
    right: 12,
    height: 1,
    background: 'linear-gradient(to right, transparent, #00ff80, transparent)',
  },
  grantedStatus: {
    color: 'rgba(0,255,128,0.5)',
    fontSize: 10,
    letterSpacing: '0.4em',
    marginBottom: 8,
  },
  grantedTitle: {
    color: '#00ff80',
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: '0.2em',
    animation: 'flicker 1.5s ease-in-out',
  },
  grantedDivider: {
    marginTop: 10,
    height: 1,
    background: 'rgba(0,255,128,0.15)',
  },
  grantedSubtitle: {
    color: 'rgba(0,255,128,0.4)',
    fontSize: 9,
    letterSpacing: '0.35em',
    marginTop: 8,
  },
};

// ─── Keyframe Animations ──────────────────────────────────────────────────────

const keyframes = `
  @keyframes scanline {
    0%   { top: -4px; }
    100% { top: 100%; }
  }
  @keyframes pulseRing {
    0%   { transform: scale(0.8); opacity: 0.9; }
    100% { transform: scale(2.2); opacity: 0;   }
  }
  @keyframes spin {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }
  @keyframes dotBounce {
    0%, 80%, 100% { transform: scale(0); }
    40%           { transform: scale(1); }
  }
  @keyframes glitch {
    0%,  100% { clip-path: inset(0 0 98% 0);  transform: translateX(0);   }
    20%        { clip-path: inset(33% 0 40% 0); transform: translateX(-4px); }
    40%        { clip-path: inset(70% 0 5% 0);  transform: translateX(4px);  }
    60%        { clip-path: inset(15% 0 75% 0); transform: translateX(-2px); }
    80%        { clip-path: inset(60% 0 20% 0); transform: translateX(2px);  }
  }
  @keyframes flicker {
    0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1;   }
    20%, 24%, 55%                           { opacity: 0.4; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;