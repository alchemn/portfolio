'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Bot, Shield } from 'lucide-react';

const services = [
  { icon: Cloud, name: 'Nextcloud', desc: 'Cloud storage & file sync' },
  { icon: Shield, name: 'Cloudflared', desc: 'Secure tunnel access' },
  { icon: Bot, name: 'AI Agent', desc: 'LLM productivity assistant' },
];

/* ═══════════════════════════════════════════
   Typing Terminal
   ═══════════════════════════════════════════ */
function TypingTerminal() {
  const [line, setLine] = useState(0);
  const [char, setChar] = useState(0);
  const [output, setOutput] = useState<string[]>([]);

  const lines: Array<{ cmd?: string; delay?: number; output?: string[] }> = [
    { cmd: 'docker ps --format "table"', delay: 40 },
    { output: ['NAMES        STATUS', 'nextcloud    running', 'cloudflared  running', 'ai-agent     running'] },
    { cmd: 'curl -s localhost:3000/health', delay: 35 },
    { output: ['{"status":"healthy","uptime":"99.9%"}'] },
  ];

  useEffect(() => {
    if (line >= lines.length) return;

    const current = lines[line];

    if (current.cmd !== undefined) {
      if (char < current.cmd.length) {
        const timer = setTimeout(() => {
          setChar((c) => c + 1);
        }, current.delay ?? 40);
        return () => clearTimeout(timer);
      } else {
        // Command done, show output
        const timer = setTimeout(() => {
          const nextLine = line + 1;
          if (nextLine < lines.length && lines[nextLine].output) {
            setOutput((prev) => [...prev, ...(lines[nextLine].output ?? [])]);
            setLine(nextLine + 1);
            setChar(0);
          } else {
            setLine(nextLine);
            setChar(0);
          }
        }, 300);
        return () => clearTimeout(timer);
      }
    } else if (current.output) {
      const timer = setTimeout(() => {
        setLine(line + 1);
        setChar(0);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [line, char, output]);

  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/40 overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04]">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <span className="w-2 h-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[10px] text-white/30 font-mono">bash</span>
      </div>
      <div className="p-4 font-mono text-xs space-y-1 min-h-[140px]">
        {output.map((line, i) => (
          <div key={i} className="text-white/40">{line}</div>
        ))}
        {line < lines.length && 'cmd' in lines[line] && (
          <div className="flex">
            <span className="text-emerald-400/70 mr-2">$</span>
            <span className="text-white/60">{lines[line].cmd?.slice(0, char)}</span>
            <span className="w-1.5 h-3.5 bg-white/40 ml-0.5 animate-pulse" />
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
          <p className="text-sm text-white/35">Self-managed infrastructure — cloud storage, AI automation, secure remote access.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <TypingTerminal />
          </motion.div>

          {/* Services + Stats */}
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

            {/* Stats */}
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
