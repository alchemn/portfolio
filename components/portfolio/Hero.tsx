'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MapPin, Code, Database, Layout } from 'lucide-react';

const codeLines = [
  { prompt: '> ', text: 'whoami', color: 'text-muted-foreground' },
  { prompt: '', text: 'ardiansyah.putra', color: 'text-primary' },
  { prompt: '> ', text: 'stack', color: 'text-muted-foreground' },
  { prompt: '', text: 'next.js + typescript', color: 'text-violet-400' },
  { prompt: '> ', text: 'passion', color: 'text-muted-foreground' },
  { prompt: '', text: 'building useful things', color: 'text-emerald-400' },
];

const socials = [
  { icon: Github, href: 'https://github.com/alchemn', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/ardiansyah-putra', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:ardiansyah.ap8@gmail.com', label: 'Email' },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const floatChips = [
  { icon: Code, label: 'Next.js', className: 'top-16 -right-2 sm:-right-8 animate-float' },
  { icon: Database, label: 'Node.js', className: '-top-5 -left-2 sm:-left-6 animate-float-delay' },
  { icon: Layout, label: 'UI/UX', className: '-bottom-4 -right-6 sm:-right-12 animate-float' },
];

function Terminal() {
  // Single global char counter — derive every line from it. Clean & correct.
  const [count, setCount] = useState(0);

  const totalChars = codeLines.reduce((sum, line) => sum + line.text.length, 0);

  useEffect(() => {
    if (count >= totalChars) return;
    const id = setTimeout(() => setCount((c) => c + 1), 45);
    return () => clearTimeout(id);
  }, [count, totalChars]);

  // Each line: shows its prompt once enough chars have "passed", then its text.
  let charsUsed = 0;
  const rendered = codeLines.map((line) => {
    const start = charsUsed;
    const visible = Math.max(0, Math.min(count - start, line.text.length));
    charsUsed += line.text.length;
    return { ...line, visible };
  });
  const done = count >= totalChars;

  return (
    <div className="relative rounded-2xl border border-white/10 bg-black/40 shadow-2xl shadow-black/50 backdrop-blur-md overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-xs text-muted-foreground font-mono">
          ardiansyah@portfolio — zsh
        </span>
      </div>
      {/* Terminal body */}
      <div className="p-5 sm:p-6 font-mono text-sm leading-relaxed space-y-3 min-h-[13rem]">
        {rendered.map((line, i) => (
          <div key={i} className="flex gap-2">
            {line.prompt && (
              <span className="text-emerald-400 flex-shrink-0">{line.prompt}</span>
            )}
            <span className={line.color}>{line.text.slice(0, line.visible)}</span>
          </div>
        ))}
        <div className="flex gap-2">
          <span className="text-emerald-400 flex-shrink-0">&gt; </span>
          <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16">
      {/* Ambient gradient orbs — very subtle */}
      <div className="absolute -top-32 -right-32 w-[34rem] h-[34rem] rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 w-[30rem] h-[30rem] rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div variants={container} initial="hidden" animate="show" className="order-2 lg:order-1">
            <motion.p
              variants={item}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Full Stack Developer
            </motion.p>

            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              Hi, I&apos;m
              <br />
              <span className="text-gradient">Ardiansyah Putra</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              I craft fast, functional web products and design experiences people enjoy
              using — from live production apps to clean, thoughtful interfaces.
            </motion.p>

            <motion.div variants={item} className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              Banda Aceh, Indonesia
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                View My Work
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl border border-border hover:border-foreground/30 hover:bg-card/60 transition-colors"
              >
                Let&apos;s Talk
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="mt-10 flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — visual (typing terminal) */}
          <motion.div
            variants={item}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative order-1 lg:order-2"
          >
            <Terminal />

            {/* Floating tech chips */}
            {floatChips.map((chip) => (
              <div
                key={chip.label}
                className={`absolute ${chip.className} px-4 py-2.5 rounded-2xl bg-card border border-border flex items-center gap-2 shadow-xl shadow-black/30`}
              >
                <chip.icon className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium">{chip.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
