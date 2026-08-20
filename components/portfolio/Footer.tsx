'use client';

import { Github, Linkedin, Mail } from 'lucide-react';

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/alchemn' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/ardiansyah-putra' },
  { icon: Mail, label: 'Email', href: 'mailto:ardiansyah.ap8@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto px-5 py-6 flex items-center justify-between">
        <p className="text-[11px] text-white/20">
          © {new Date().getFullYear()} Ardiansyah Putra
        </p>
        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-white/20 hover:text-white/50 transition-colors"
            >
              <social.icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
