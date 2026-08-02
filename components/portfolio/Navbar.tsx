'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Work', href: '#projects', id: 'projects' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);

      // Scroll spy — highlight current section
      const pos = window.scrollY + window.innerHeight / 3;
      let current = '';
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= pos) current = link.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-5 inset-x-0 z-50 px-4">
      {/* Gradient-border pill */}
      <nav
        className={`max-w-5xl mx-auto p-px rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'bg-gradient-to-r from-primary/40 via-violet-500/30 to-primary/20 shadow-2xl shadow-black/30'
            : 'bg-gradient-to-r from-primary/25 via-border/70 to-violet-500/25'
        }`}
      >
        <div className="w-full h-14 px-5 sm:px-6 flex items-center justify-between rounded-[15px] bg-card/90 backdrop-blur-xl">
          {/* Logo */}
          <a href="#home" className="group flex items-baseline gap-1">
            <span className="text-lg font-bold tracking-tight">
              ardiansyah
            </span>
            <span className="text-lg font-bold text-gradient">.dev</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-to-r from-primary to-violet-400 transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </a>
              );
            })}

            {/* CTA */}
            <a
              href="#contact"
              className="ml-3 inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-violet-500 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-px transition-all"
            >
              Let&apos;s talk
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 -mr-2 rounded-lg hover:bg-muted/60 transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden max-w-5xl mx-auto mt-2 p-px rounded-2xl bg-gradient-to-r from-primary/30 to-violet-500/30">
          <div className="rounded-[15px] bg-card/95 backdrop-blur-xl px-5 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-2 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-violet-500 text-white"
            >
              Let&apos;s talk
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
