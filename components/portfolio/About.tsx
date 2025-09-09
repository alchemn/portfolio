'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Palette, Smartphone, Target } from 'lucide-react';

export default function About() {
  const skills = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "React, Next.js, TypeScript, Tailwind CSS"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Figma, Adobe XD, User Research, Prototyping"
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first approach, Cross-platform compatibility"
    },
    {
      icon: Target,
      title: "Performance Optimization",
      description: "Speed optimization, SEO best practices"
    }
  ];

  return (
    <section className="py-20 relative bg-background">
      {/* Neon accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Passionate About Creating Digital Experiences
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Hi! I&apos;m an aspiring Full Stack Developer with a strong passion for web development. I&apos;m dedicated to learning and implementing modern web technologies to create responsive and user-friendly applications. Through self-study and hands-on project experience, I&apos;m constantly expanding my skills in web development.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              My approach combines technical expertise with creative problem-solving, ensuring that every project I work on is both innovative and practical. I believe in writing clean, maintainable code and creating designs that are both aesthetically pleasing and highly functional.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I&apos;m not coding or designing, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the developer community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {skills.map((skill, index) => (
              <Card key={index} className="bg-card/50 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-6 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center"
                  >
                    <skill.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h4 className="font-semibold mb-2 text-foreground">{skill.title}</h4>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-primary font-medium">Always learning, always growing</span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>

      {/* Bottom neon accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
    </section>
  );
}