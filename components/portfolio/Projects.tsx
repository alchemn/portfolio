'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string | null;
  liveUrl: string | null;
}

const projects: Project[] = [
  {
    title: 'CPNS Hub',
    description:
      'Platform latihan soal CPNS dengan simulasi tryout TWK, TIU, dan TKP — membantu calon ASN berlatih dan memantau progres skor.',
    image: '/img/cpns.png',
    tags: ['Next.js', 'Tailwind CSS'],
    githubUrl: null,
    liveUrl: 'https://cpnshub.xyz',
  },
  {
    title: 'NCO Store',
    description:
      'Platform PPOB untuk pembayaran token listrik, pulsa, paket data, dan tagihan lainnya — lengkap dengan manajemen transaksi.',
    image: '/img/nco.png',
    tags: ['Next.js', 'PPOB', 'Payment'],
    githubUrl: null,
    liveUrl: 'https://ncostore.my.id',
  },
  {
    title: 'E-Commerce Platform',
    description:
      'Platform e-commerce dengan React dan Express, termasuk integrasi pembayaran Midtrans.',
    image: '/img/ecomm.png',
    tags: ['React', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/alchemn/front-ecom',
    liveUrl: null,
  },
  {
    title: 'Job Find App',
    description:
      'Aplikasi pencarian lowongan kerja yang dibangun dengan Next.js dan Tailwind CSS.',
    image: '/img/classi.png',
    tags: ['Next.js', 'Tailwind', 'MongoDB'],
    githubUrl: 'https://github.com/alchemn/lokerapp',
    liveUrl: 'https://lokerapp-iota.vercel.app/',
  },
  {
    title: 'Financial Track with N8N',
    description:
      'Aplikasi pencatatan keuangan memanfaatkan N8N untuk laporan otomatis, dengan pembayaran Midtrans.',
    image: '/img/ftt.png',
    tags: ['Next.js', 'Shadcn', 'N8N', 'Midtrans'],
    githubUrl: 'https://github.com/alchemn/n8n-finance-tracking',
    liveUrl: null,
  },
  {
    title: 'Virtual Assistant BPJS',
    description:
      'Virtual assistant berbasis Next.js dengan NLP dan deteksi wajah TensorFlow.',
    image: '/img/va.png',
    tags: ['Next.js', 'TensorFlow', 'NLP'],
    githubUrl: 'https://github.com/alchemn/va-bpjs',
    liveUrl: 'https://va-bpjs.vercel.app/',
  },
];

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

// Blue-family colors per tag — matching plugin's colored chip style
const tagColors: Record<string, string> = {
  'Next.js': 'bg-blue-500/10 text-blue-400',
  'Tailwind CSS': 'bg-cyan-500/10 text-cyan-400',
  Tailwind: 'bg-cyan-500/10 text-cyan-400',
  React: 'bg-sky-500/10 text-sky-400',
  MongoDB: 'bg-green-500/10 text-green-400',
  PPOB: 'bg-violet-500/10 text-violet-400',
  Payment: 'bg-emerald-500/10 text-emerald-400',
  Shadcn: 'bg-slate-500/10 text-slate-300',
  N8N: 'bg-orange-500/10 text-orange-400',
  Midtrans: 'bg-teal-500/10 text-teal-400',
  TensorFlow: 'bg-amber-500/10 text-amber-400',
  NLP: 'bg-pink-500/10 text-pink-400',
};
const tagClass = (tag: string) => tagColors[tag] ?? 'bg-primary/10 text-primary';

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-28">
      <div className="max-w-5xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-14"
        >
          <p className="text-sm font-medium text-primary mb-3">Selected work</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
              viewport={{ once: true, margin: '-60px' }}
              className={index === 0 ? 'md:col-span-2' : ''}
            >
              <a
                href={project.liveUrl ?? project.githubUrl ?? '#'}
                target={project.liveUrl || project.githubUrl ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group block rounded-3xl border border-border bg-card overflow-hidden card-glow transition-all duration-300 h-full"
              >
                {/* macOS-style browser mockup */}
                <div className={`p-4 sm:p-6 ${index === 0 ? 'bg-gradient-to-b from-primary/10 to-transparent' : ''}`}>
                  <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-foreground/5 shadow-2xl shadow-black/40 ${index === 0 ? 'animate-float' : ''}`}>
                    {/* Toolbar */}
                    <div className="flex items-center gap-3 px-3 sm:px-4 py-2.5 bg-background/40 backdrop-blur-md border-b border-white/5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                      </div>
                      <div className="flex-1 flex justify-center min-w-0">
                        <span className="flex items-center gap-1.5 max-w-full px-3 py-1 rounded-md bg-black/20 text-[11px] text-muted-foreground truncate">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                          {project.liveUrl ? hostname(project.liveUrl) : project.title.toLowerCase().replace(/\s+/g, '-')}
                        </span>
                      </div>
                    </div>
                    {/* Screen */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                </div>

                <div className="px-6 sm:px-8 pb-8 -mt-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {project.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 rounded-full px-3 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {project.liveUrl ? 'Live' : 'In development'}
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${tagClass(tag)}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      {project.githubUrl && (
                        <span className="group-hover:text-foreground transition-colors" title="View source">
                          <Github className="w-4 h-4" />
                        </span>
                      )}
                      {(project.liveUrl || project.githubUrl) && (
                        <span className="group-hover:text-foreground transition-colors">
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
