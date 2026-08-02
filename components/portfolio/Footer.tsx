import { Github, Linkedin, Mail } from 'lucide-react';

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/alchemn' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/ardiansyah-putra' },
  { icon: Mail, label: 'Email', href: 'mailto:ardiansyah.ap8@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/70">
      <div className="max-w-5xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-violet-500 flex items-center justify-center text-[13px] font-bold text-white shadow-lg shadow-primary/25">
            AP
          </span>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ardiansyah Putra
          </p>
        </div>

        <div className="flex items-center gap-5">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
