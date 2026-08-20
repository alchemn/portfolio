'use client';

import { useRef, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code, Database, Layout, Zap } from 'lucide-react';

const skills = [
  { icon: Code, title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'TanStack', 'Tailwind'] },
  { icon: Database, title: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST API'] },
  { icon: Layout, title: 'Design', items: ['Figma', 'UI/UX', 'Design Systems', 'Prototyping'] },
  { icon: Zap, title: 'DevOps', items: ['Docker', 'Linux', 'Git', 'CI/CD', 'Cloudflare'] },
];

/* ═══════════════════════════════════════════
   3D Tilt Card with Glow
   ═══════════════════════════════════════════ */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springConfig);
  const glowOpacity = useSpring(0, { stiffness: 200, damping: 20 });
  const glowX = useSpring(50, { stiffness: 200, damping: 20 });
  const glowY = useSpring(50, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width * 100;
    const yPos = (e.clientY - rect.top) / rect.height * 100;
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
    glowOpacity.set(0.08);
    glowX.set(xPos);
    glowY.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glowOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      {/* Glow effect */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 rounded-xl pointer-events-none z-0"
      >
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'radial-gradient(circle at center, rgba(16,185,129,0.3), transparent 70%)',
            transform: `translate(${glowX.get() - 50}%, ${glowY.get() - 50}%)`,
          }}
        />
      </motion.div>
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — Text */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">About</h2>
              <div className="space-y-3 text-sm text-white/40 leading-relaxed">
                <p>
                  Full Stack Developer di Banda Aceh. Membangun produk web yang cepat, 
                  fungsional, dan dirancang dengan detail.
                </p>
                <p>
                  Saya juga mengelola home server sendiri dengan layanan self-hosted 
                  dan automasi AI — karena saya percaya pada pemahaman full stack, 
                  dari kode hingga infrastruktur.
                </p>
              </div>

              {/* Quick stats */}
              <div className="mt-6 flex gap-8">
                {[
                  { value: '6+', label: 'Projects' },
                  { value: '3', label: 'Live Apps' },
                  { value: '99.9%', label: 'Uptime' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-lg font-bold text-white/80 font-mono">{stat.value}</div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — 3D Skill Cards */}
          <div className="lg:col-span-3" style={{ perspective: '800px' }}>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20, rotateX: 5 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                >
                  <TiltCard>
                    <div className="p-4 rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-white/[0.12] transition-colors duration-300 h-full">
                      <div className="flex items-center gap-2.5 mb-3">
                        <skill.icon className="w-4 h-4 text-emerald-400/70" />
                        <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">{skill.title}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {skill.items.map((item) => (
                          <span key={item} className="text-[11px] text-white/40">{item}</span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
