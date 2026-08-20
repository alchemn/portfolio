'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'Server', href: '#home-server' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-white/[0.04]' : ''}`}>
      <nav className="max-w-5xl mx-auto h-14 px-5 flex items-center justify-between">
        <a href="#home" className="text-sm font-semibold tracking-tight text-white/80">
          ardiansyah.dev
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] text-white/35 hover:text-white/80 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
