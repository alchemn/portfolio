'use client';

import { motion } from 'framer-motion';
import { Code, Layout, Zap, Database } from 'lucide-react';

const skills = [
  { icon: Code, title: 'Frontend', description: 'React, Next.js, TypeScript' },
  { icon: Database, title: 'Backend', description: 'Node.js, APIs, Databases' },
  { icon: Layout, title: 'UI/UX', description: 'Figma, design systems' },
  { icon: Zap, title: 'Performance', description: 'Fast, accessible, SEO' },
];

const stats = [
  { value: '6+', label: 'Projects' },
  { value: '3', label: 'Live products' },
  { value: '5+', label: 'Technologies' },
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-28">
      <div className="max-w-5xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          <div>
            <p className="text-sm font-medium text-primary mb-3">About Me</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Turning Ideas into Reality
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I&apos;m Ardiansyah Putra, a Full Stack Developer based in Banda
                Aceh. I like turning ideas into real, working products — handling
                everything from interface design to the code that powers it.
              </p>
              <p>
                I focus on clean, maintainable code and interfaces that feel
                effortless to use. Beyond that, I&apos;m always exploring new tools
                and shipping things people actually use.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl sm:text-4xl font-bold text-gradient tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className="group rounded-3xl border border-border bg-card p-6 card-glow transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <skill.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{skill.title}</h3>
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
