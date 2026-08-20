'use client';

import { useRef, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  url: string | null;
  github: string | null;
}

const projects: Project[] = [
  {
    title: 'Ruang Konten',
    description: 'Platform konten kreator untuk mengelola dan mempublikasikan konten digital',
    image: '/img/ruangkonten.png',
    tags: ['React', 'TanStack', 'TypeScript'],
    url: 'https://ruangkonten.my.id',
    github: null,
  },
  {
    title: 'CPNS Hub',
    description: 'Platform latihan soal CPNS dengan simulasi tryout TWK, TIU, dan TKP',
    image: '/img/cpns.png',
    tags: ['React', 'TanStack', 'Tailwind'],
    url: 'https://cpnshub.xyz',
    github: null,
  },
  {
    title: 'NCO Store',
    description: 'Platform PPOB untuk pembayaran token listrik, pulsa, dan tagihan',
    image: '/img/nco.png',
    tags: ['React', 'TanStack', 'Payment'],
    url: 'https://ncostore.my.id',
    github: null,
  },
  {
    title: 'Virtual Assistant BPJS',
    description: 'VA berbasis NLP dengan face detection TensorFlow.js',
    image: '/img/va.png',
    tags: ['Next.js', 'TensorFlow', 'NLP'],
    url: 'https://va-bpjs.vercel.app',
    github: 'https://github.com/alchemn/va-bpjs',
  },
  {
    title: 'E-Commerce Platform',
    description: 'E-commerce dengan integrasi pembayaran Midtrans',
    image: '/img/ecomm.png',
    tags: ['React', 'Express', 'MongoDB'],
    url: null,
    github: 'https://github.com/alchemn/front-ecom',
  },
  {
    title: 'Job Find App',
    description: 'Aplikasi pencarian lowongan kerja',
    image: '/img/classi.png',
    tags: ['Next.js', 'Tailwind', 'MongoDB'],
    url: 'https://lokerapp-iota.vercel.app',
    github: 'https://github.com/alchemn/lokerapp',
  },
];

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

/* ═══════════════════════════════════════════
   3D Tilt Card with Shine Effect
   ═══════════════════════════════════════════ */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);
  const scale = useSpring(1, { stiffness: 200, damping: 20 });
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [100, -100]), springConfig);
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const yPos = (e.clientY - rect.top - rect.height / 2) / rect.height;
    x.set(xPos);
    y.set(yPos);
    scale.set(1.02);
    glareOpacity.set(0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, scale }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <div className="relative overflow-hidden">
        {children}
        {/* Glare effect */}
        <motion.div
          style={{ opacity: glareOpacity }}
          className="absolute inset-0 pointer-events-none rounded-xl"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
            style={{ transform: `translateX(${glareX}%)` }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
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
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" style={{ perspective: '1200px' }}>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30, rotateX: 5 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-40px' }}
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
        </div>
      </div>
    </section>
  );
}
