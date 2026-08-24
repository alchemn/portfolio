'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import MagneticButton from '@/components/ui/magnetic-button';

const socials = [
  { icon: Github, href: 'https://github.com/alchemn', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/ardiansyah-putra', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:ardiansyah.ap8@gmail.com', label: 'Email' },
];

const techStack = [
  'React', 'Next.js', 'TypeScript', 'TanStack Query', 'Tailwind CSS',
  'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker',
  'Figma', 'Git', 'Linux', 'Cloudflare', 'TensorFlow',
];

/* ═══════════════════════════════════════════
   Tech Stack Marquee
   ═══════════════════════════════════════════ */
function TechMarquee() {
  return (
    <div className="relative overflow-hidden py-4 -mx-5">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex gap-8 whitespace-nowrap"
      >
        {[...techStack, ...techStack].map((tech, i) => (
          <span key={i} className="text-xs font-mono text-white/20 uppercase tracking-widest">
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  return (
    <section id="home" className="min-h-[100dvh] flex flex-col justify-center pt-16 pb-8 px-5">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto w-full"
      >
        {/* Status line */}
        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          <span className="text-[11px] text-white/40 font-mono tracking-wider uppercase">Available for work</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          <span className="text-white/90">Full Stack Developer</span>
          <br />
          <span className="text-white/40 text-[0.65em]">&</span>
          <span className="text-white/40"> UI/UX Designer</span>
        </motion.h1>

        {/* Description + CTA */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-end gap-8">
          <motion.p
            variants={fadeUp}
            className="text-sm text-white/40 leading-relaxed max-w-md"
          >
            Membangun produk web yang cepat, fungsional, dan dirancang dengan detail — 
            dari antarmuka hingga infrastruktur. Banda Aceh, Indonesia.
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <MagneticButton
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 transition-all"
            >
              View Projects
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full border border-white/[0.08] hover:border-white/[0.15] transition-all text-white/60"
            >
              Contact
            </MagneticButton>
          </motion.div>
        </div>

        {/* Tech Stack Marquee */}
        <motion.div variants={fadeUp} className="mt-12">
          <TechMarquee />
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeUp}
          className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <MagneticButton
                key={social.label}
                href={social.href}
                className="text-white/25 hover:text-white/70 transition-colors"
                stiffness={300}
                intensity={0.3}
              >
                <social.icon className="w-4 h-4" />
              </MagneticButton>
            ))}
          </div>
          <div className="flex items-center gap-6 text-[11px] text-white/25 font-mono">
            <span>6+ Projects</span>
            <span>3 Live Apps</span>
            <span>99.9% Uptime</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
