'use client';

import { motion } from 'framer-motion';
import { 
  Shield, Server, Cloud, Bot, Database, 
  ArrowRight, Lock, Wifi, HardDrive, Cpu,
  Laptop, Smartphone
} from 'lucide-react';

/* ═══════════════════════════════════════════
   Architecture Node Component
   ═══════════════════════════════════════════ */
function ArchNode({ 
  icon: Icon, 
  label, 
  sublabel, 
  color, 
  glowColor,
  delay = 0,
  className = '' 
}: { 
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sublabel?: string;
  color: string;
  glowColor: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className={`relative group ${className}`}
    >
      {/* Glow behind */}
      <div className={`absolute inset-0 ${glowColor} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative flex flex-col items-center gap-3">
        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${color} flex items-center justify-center border border-white/[0.08] group-hover:scale-105 transition-transform duration-300`}>
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white/90" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-white/90">{label}</p>
          {sublabel && (
            <p className="text-[11px] text-white/40 mt-0.5">{sublabel}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Animated Connection Line
   ═══════════════════════════════════════════ */
function ConnectionLine({ direction = 'right', label, delay = 0 }: { direction?: 'right' | 'down'; label?: string; delay?: number }) {
  const isHorizontal = direction === 'right';
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`flex items-center justify-center ${isHorizontal ? 'flex-row' : 'flex-col'} gap-2`}
    >
      {isHorizontal ? (
        <>
          <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-white/20 to-white/40 relative overflow-hidden">
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
            />
          </div>
          <ArrowRight className="w-4 h-4 text-white/40" />
        </>
      ) : (
        <>
          <div className="w-[2px] h-8 sm:h-12 bg-gradient-to-b from-white/20 to-white/40 relative overflow-hidden">
            <motion.div
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay }}
              className="absolute inset-0 h-1/3 bg-gradient-to-b from-transparent via-white/60 to-transparent"
            />
          </div>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight className="w-4 h-4 text-white/40 rotate-90" />
          </motion.div>
        </>
      )}
      {label && (
        <span className="text-[10px] text-white/30 font-mono whitespace-nowrap">{label}</span>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Service Card
   ═══════════════════════════════════════════ */
function ServiceCard({ 
  icon: Icon, 
  name, 
  port, 
  color, 
  status = 'running' 
}: { 
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  port?: string;
  color: string;
  status?: 'running' | 'stopped';
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-5 h-5 text-white/90" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white/90 truncate">{name}</p>
        {port && <p className="text-[11px] text-white/40 font-mono">:{port}</p>}
      </div>
      <div className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${status === 'running' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
        <span className={`text-[10px] ${status === 'running' ? 'text-emerald-400' : 'text-red-400'}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main Architecture Diagram
   ═══════════════════════════════════════════ */
export default function ArchitectureDiagram() {

  return (
    <div className="relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h3 className="text-xl font-semibold text-white/90 mb-2">System Architecture</h3>
        <p className="text-sm text-white/40">How services connect and communicate</p>
      </motion.div>

      {/* Desktop Diagram */}
      <div className="hidden md:block">
        <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 overflow-hidden relative">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }} />

          {/* Background glows */}
          <div className="absolute top-1/4 -left-20 w-40 h-40 bg-orange-500/10 blur-[80px] rounded-full" />
          <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-violet-500/10 blur-[80px] rounded-full" />

          <div className="relative">
            {/* Row 1: Clients → Cloudflare Edge */}
            <div className="flex items-center justify-center gap-8 mb-6">
              {/* Client devices */}
              <div className="flex items-center gap-4">
                <ArchNode icon={Laptop} label="Laptop" color="bg-white/[0.06]" glowColor="bg-white/10" delay={0} />
                <ArchNode icon={Smartphone} label="Mobile" color="bg-white/[0.06]" glowColor="bg-white/10" delay={0.05} />
              </div>

              <ConnectionLine label="HTTPS" delay={0.1} />

              {/* Cloudflare Edge */}
              <ArchNode 
                icon={Cloud} 
                label="Cloudflare Edge" 
                sublabel="Global CDN & DNS"
                color="bg-gradient-to-br from-orange-500/30 to-amber-500/30" 
                glowColor="bg-orange-500/20"
                delay={0.15}
              />
            </div>

            {/* Vertical connection */}
            <div className="flex justify-center mb-6">
              <div className="flex flex-col items-center gap-2">
                <ConnectionLine direction="down" label="Encrypted Tunnel" delay={0.2} />
                <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] font-medium text-emerald-400 flex items-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    Zero Trust
                  </span>
                </div>
              </div>
            </div>

            {/* Row 2: Home Server Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 relative"
            >
              {/* Server label */}
              <div className="flex items-center gap-2 mb-4">
                <Server className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold text-white/90">Home Server</span>
                <span className="text-[10px] text-white/40 font-mono">192.168.1.x</span>
              </div>

              {/* Docker container */}
              <div className="rounded-xl border border-dashed border-white/[0.06] p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Database className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs font-medium text-white/60">Docker Containers</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <ServiceCard 
                    icon={Cloud} 
                    name="Nextcloud" 
                    port="443"
                    color="bg-blue-500/20"
                    status="running"
                  />
                  <ServiceCard 
                    icon={Shield} 
                    name="Cloudflared" 
                    port="tunnel"
                    color="bg-orange-500/20"
                    status="running"
                  />
                  <ServiceCard 
                    icon={Bot} 
                    name="AI Agent" 
                    port="3000"
                    color="bg-violet-500/20"
                    status="running"
                  />
                </div>
              </div>

              {/* Resources */}
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-[11px] text-white/40">CPU: 12%</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-[11px] text-white/40">RAM: 2.1 GB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-[11px] text-white/40">Uptime: 99.9%</span>
                </div>
              </div>
            </motion.div>

            {/* Data flow legend */}
            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-[2px] bg-gradient-to-r from-orange-400/40 to-orange-400/80" />
                <span className="text-[10px] text-white/40">Inbound</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-[2px] bg-gradient-to-r from-violet-400/40 to-violet-400/80" />
                <span className="text-[10px] text-white/40">Internal</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-3 h-3 text-emerald-400/60" />
                <span className="text-[10px] text-white/40">Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Diagram (Vertical Flow) */}
      <div className="md:hidden">
        <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-6">
          {/* Clients */}
          <div className="flex items-center justify-center gap-4">
            <ArchNode icon={Laptop} label="Laptop" color="bg-white/[0.06]" glowColor="bg-white/10" delay={0} />
            <ArchNode icon={Smartphone} label="Mobile" color="bg-white/[0.06]" glowColor="bg-white/10" delay={0.05} />
          </div>

          <ConnectionLine direction="down" label="HTTPS" delay={0.1} />

          {/* Cloudflare */}
          <ArchNode 
            icon={Cloud} 
            label="Cloudflare Edge" 
            sublabel="CDN & DNS"
            color="bg-gradient-to-br from-orange-500/30 to-amber-500/30" 
            glowColor="bg-orange-500/20"
            delay={0.15}
          />

          <ConnectionLine direction="down" label="Encrypted Tunnel" delay={0.2} />

          {/* Home Server */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-semibold text-white/90">Home Server</span>
            </div>

            <div className="space-y-2">
              <ServiceCard icon={Cloud} name="Nextcloud" port="443" color="bg-blue-500/20" status="running" />
              <ServiceCard icon={Shield} name="Cloudflared" port="tunnel" color="bg-orange-500/20" status="running" />
              <ServiceCard icon={Bot} name="AI Agent" port="3000" color="bg-violet-500/20" status="running" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
