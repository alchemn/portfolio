'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import TiltCard from '@/components/ui/tilt-card';

type Category = 'All' | 'Frontend' | 'Backend' | 'Fullstack';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  url: string | null;
  github: string | null;
  category: Category;
}

const projects: Project[] = [
  {
    title: 'Ruang Konten',
    description: 'Platform konten kreator untuk mengelola dan mempublikasikan konten digital',
    image: '/img/ruangkonten.png',
    tags: ['React', 'TanStack', 'TypeScript'],
    url: 'https://ruangkonten.my.id',
    github: null,
    category: 'Frontend',
  },
  {
    title: 'CPNS Hub',
    description: 'Platform latihan soal CPNS dengan simulasi tryout TWK, TIU, dan TKP',
    image: '/img/cpns.png',
    tags: ['React', 'TanStack', 'Tailwind'],
    url: 'https://cpnshub.xyz',
    github: null,
    category: 'Frontend',
  },
  {
    title: 'NCO Store',
    description: 'Platform PPOB untuk pembayaran token listrik, pulsa, dan tagihan',
    image: '/img/nco.png',
    tags: ['React', 'TanStack', 'Payment'],
    url: 'https://ncostore.my.id',
    github: null,
    category: 'Fullstack',
  },
  {
    title: 'Virtual Assistant BPJS',
    description: 'VA berbasis NLP dengan face detection TensorFlow.js',
    image: '/img/va.png',
    tags: ['Next.js', 'TensorFlow', 'NLP'],
    url: 'https://va-bpjs.vercel.app',
    github: 'https://github.com/alchemn/va-bpjs',
    category: 'Fullstack',
  },
  {
    title: 'E-Commerce Platform',
    description: 'E-commerce dengan integrasi pembayaran Midtrans',
    image: '/img/ecomm.png',
    tags: ['React', 'Express', 'MongoDB'],
    url: null,
    github: 'https://github.com/alchemn/front-ecom',
    category: 'Fullstack',
  },
  {
    title: 'Job Find App',
    description: 'Aplikasi pencarian lowongan kerja',
    image: '/img/classi.png',
    tags: ['Next.js', 'Tailwind', 'MongoDB'],
    url: 'https://lokerapp-iota.vercel.app',
    github: 'https://github.com/alchemn/lokerapp',
    category: 'Frontend',
  },
];

const categories: Category[] = ['All', 'Frontend', 'Fullstack', 'Backend'];

const tagColors: Record<string, string> = {
  'React': 'text-cyan-400',
  'TanStack': 'text-red-400',
  'Next.js': 'text-blue-400',
  'Tailwind': 'text-cyan-400',
  'TypeScript': 'text-blue-400',
  'TensorFlow': 'text-amber-400',
  'NLP': 'text-pink-400',
  'Express': 'text-green-400',
  'MongoDB': 'text-green-400',
  'Payment': 'text-emerald-400',
};

export default function Projects() {
  const [active, setActive] = useState<Category>('All');

  const filtered = active === 'All'
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-5xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Projects</h2>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.06] w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors"
              >
                {active === cat && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${active === cat ? 'text-white/90' : 'text-white/35 hover:text-white/60'}`}>
                  {cat}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ perspective: '1200px' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <TiltCard>
                  <a
                    href={project.url ?? project.github ?? '#'}
                    target={project.url || project.github ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group block rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] overflow-hidden hover:border-white/[0.12] transition-colors duration-300"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      {/* Hover overlay with icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                          <ExternalLink className="w-4 h-4 text-white" />
                        </div>
                      </div>

                      {/* Gradient border bottom */}
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">{project.title}</h3>
                        {project.github && <Github className="w-3.5 h-3.5 text-white/15" />}
                      </div>
                      <p className="text-xs text-white/35 leading-relaxed mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className={`text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] ${tagColors[tag] ?? 'text-white/40'}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
