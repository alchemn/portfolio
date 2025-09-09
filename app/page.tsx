import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Projects from '@/components/portfolio/Projects';
import Contact from '@/components/portfolio/Contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}