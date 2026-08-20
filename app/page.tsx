import Navbar from '@/components/portfolio/Navbar';
import Hero from '@/components/portfolio/Hero';
import Projects from '@/components/portfolio/Projects';
import HomeServer from '@/components/portfolio/HomeServer';
import About from '@/components/portfolio/About';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <HomeServer />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
