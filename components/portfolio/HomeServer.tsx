'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Bot, Shield } from 'lucide-react';

const services = [
  { icon: Cloud, name: 'Nextcloud', desc: 'Cloud storage & file sync' },
  { icon: Shield, name: 'Cloudflared', desc: 'Secure tunnel access' },
  { icon: Bot, name: 'AI Agent', desc: 'LLM productivity assistant' },
];

/* ═══════════════════════════════════════════
   Enhanced Typing Terminal
   ═══════════════════════════════════════════ */

interface TerminalLine {
  type: 'cmd' | 'output' | 'blank' | 'info' | 'success' | 'warning' | 'error';
  text: string;
}

const sequence: TerminalLine[][] = [
  // Boot sequence
  [
    { type: 'info', text: '+----------------------------------------+' },
    { type: 'info', text: '|  Home Server v2.1 -- Banda Aceh, ID    |' },
    { type: 'info', text: '|  Kernel: 6.1.0  |  Uptime: 42d 7h     |' },
    { type: 'info', text: '+----------------------------------------+' },
    { type: 'blank', text: '' },
  ],
  // Docker check
  [
    { type: 'cmd', text: 'docker ps --format "table {{.Names}}\t{{.Status}}"' },
    { type: 'blank', text: '' },
    { type: 'output', text: 'NAMES          STATUS' },
    { type: 'success', text: 'nextcloud      Up 42 days' },
    { type: 'success', text: 'cloudflared    Up 42 days' },
    { type: 'success', text: 'ai-agent       Up 42 days' },
    { type: 'success', text: 'nginx-proxy    Up 42 days' },
    { type: 'blank', text: '' },
  ],
  // Health check
  [
    { type: 'cmd', text: 'curl -s localhost:3000/health | jq .' },
    { type: 'blank', text: '' },
    { type: 'success', text: '{' },
    { type: 'output', text: '  "status": "healthy",' },
    { type: 'output', text: '  "uptime": "99.9%",' },
    { type: 'output', text: '  "services": 4,' },
    { type: 'success', text: '}' },
    { type: 'blank', text: '' },
  ],
  // System resources
  [
    { type: 'cmd', text: 'htop --no-color -n 1 | head -5' },
    { type: 'blank', text: '' },
    { type: 'info', text: '+-- CPU: [==========      ] 12%  -- RAM: 2.1 / 8 GB --+' },
    { type: 'warning', text: '|  PID USER      CPU%  MEM%  COMMAND                    |' },
    { type: 'output', text: '|  847 root       2.1   1.8  nginx: worker              |' },
    { type: 'output', text: '| 1204 postgres   1.4   3.2  postgres: nextcloud        |' },
    { type: 'output', text: '|  932 root       0.8   1.1  node server.js             |' },
    { type: 'info', text: '+----------------------------------------------------+' },
    { type: 'blank', text: '' },
  ],
  // Disk usage
  [
    { type: 'cmd', text: 'df -h / | tail -1' },
    { type: 'blank', text: '' },
    { type: 'output', text: '/dev/sda1  480G  127G  329G  28%  /' },
    { type: 'success', text: 'All systems operational' },
  ],
];

const CMD_SPEED = 30;
const OUTPUT_DELAY = 150;
const PAUSE_BETWEEN_SEQUENCES = 2000;

function TerminalLineRenderer({ line }: { line: TerminalLine }) {
  if (line.type === 'blank') return <div className="h-3" />;

  const colors: Record<string, string> = {
    cmd: 'text-white/70',
    output: 'text-white/40',
    info: 'text-blue-400/70',
    success: 'text-emerald-400/80',
    warning: 'text-amber-400/70',
    error: 'text-red-400/70',
  };

  return (
    <div className={colors[line.type] ?? 'text-white/40'}>
      {line.type === 'cmd' && <span className="text-emerald-400/70 mr-2">$</span>}
      {line.text}
    </div>
  );
}

function TypingTerminal() {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [currentSequence, setCurrentSequence] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const restartTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTerminal = useCallback(() => {
    setVisibleLines([]);
    setCurrentSequence(0);
    setCurrentLine(0);
    setCurrentChar(0);
  }, []);

  useEffect(() => {
    if (currentSequence >= sequence.length) {
      restartTimeoutRef.current = setTimeout(() => {
        resetTerminal();
      }, PAUSE_BETWEEN_SEQUENCES);
      return () => {
        if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
      };
    }

    const seq = sequence[currentSequence];

    if (currentLine >= seq.length) {
      const timer = setTimeout(() => {
        setCurrentSequence((s) => s + 1);
        setCurrentLine(0);
        setCurrentChar(0);
      }, OUTPUT_DELAY);
      return () => clearTimeout(timer);
    }

    const line = seq[currentLine];

    if (line.type === 'cmd') {
      if (currentChar < line.text.length) {
        const timer = setTimeout(() => {
          setCurrentChar((c) => c + 1);
        }, CMD_SPEED);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setVisibleLines((prev) => [...prev, line]);
          setCurrentLine((l) => l + 1);
          setCurrentChar(0);
        }, 200);
        return () => clearTimeout(timer);
      }
    } else {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        setCurrentLine((l) => l + 1);
      }, OUTPUT_DELAY);
      return () => clearTimeout(timer);
    }
  }, [currentSequence, currentLine, currentChar, resetTerminal]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines, currentChar]);

  const currentSeq = currentSequence < sequence.length ? sequence[currentSequence] : null;
  const currentCmdLine = currentSeq?.find(
    (l, i) => i === currentLine && l.type === 'cmd'
  );

  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/40 overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04]">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <span className="w-2 h-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[10px] text-white/30 font-mono">bash -- home-server</span>
      </div>

      <div
        ref={containerRef}
        className="p-4 font-mono text-xs space-y-0.5 min-h-[200px] max-h-[260px] overflow-y-auto scrollbar-hide"
      >
        {visibleLines.map((line, i) => (
          <TerminalLineRenderer key={i} line={line} />
        ))}

        {currentCmdLine && currentChar > 0 && currentChar <= currentCmdLine.text.length && (
          <div className="flex">
            <span className="text-emerald-400/70 mr-2">$</span>
            <span className="text-white/70">{currentCmdLine.text.slice(0, currentChar)}</span>
            <span className="w-1.5 h-3.5 bg-emerald-400/70 ml-0.5 animate-pulse" />
          </div>
        )}

        {currentSequence >= sequence.length && (
          <div className="flex">
            <span className="text-emerald-400/70 mr-2">$</span>
            <span className="w-1.5 h-3.5 bg-emerald-400/70 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HomeServer() {
  return (
    <section id="home-server" className="py-20">
      <div className="max-w-5xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Home Server</h2>
          <p className="text-sm text-white/35">Self-managed infrastructure -- cloud storage, AI automation, secure remote access.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <TypingTerminal />
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-2"
          >
            {services.map((service) => (
              <motion.div
                key={service.name}
                variants={fadeUp}
                className="group flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.06] bg-gradient-to-r from-white/[0.03] to-white/[0.01] hover:border-white/[0.12] hover:from-white/[0.05] transition-all duration-300"
              >
                <service.icon className="w-4 h-4 text-emerald-400/60 group-hover:text-emerald-400 transition-colors" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white/80">{service.name}</p>
                  <p className="text-[11px] text-white/30 truncate">{service.desc}</p>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.6)] transition-shadow" />
              </motion.div>
            ))}

            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-2 pt-2">
              {[
                { label: 'CPU', value: '12%' },
                { label: 'RAM', value: '2.1 GB' },
                { label: 'Disk', value: '480 GB' },
              ].map((stat) => (
                <div key={stat.label} className="p-2.5 rounded-lg border border-white/[0.05] bg-white/[0.02] text-center hover:border-white/[0.1] hover:bg-white/[0.03] transition-all">
                  <div className="text-[10px] text-white/25 uppercase tracking-wider mb-0.5">{stat.label}</div>
                  <div className="text-xs font-mono text-white/60">{stat.value}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
