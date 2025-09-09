'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, Download } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
      
      {/* Neon grid lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
        <div className="absolute top-3/4 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
      </div>

      {/* Floating neon orbs */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-cyan-400 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-20"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <span className="text-primary text-sm font-medium">Welcome to my portfolio</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Ardiansyah Putra
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 font-light"
        >
          Full Stack Developer & UI/UX Designer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Creating beautiful, functional, and user-centered digital experiences with modern technologies and innovative design solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground border border-primary/20 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
          >
            <Mail className="mr-2 h-5 w-5" />
            Contact Me
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-primary/20 text-primary hover:bg-primary/10 hover:text-primary-foreground transition-all duration-300"
          >
            <Download className="mr-2 h-5 w-5" />
            Download CV
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}