'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'ardiansyah.ap8@gmail.com',
    link: 'mailto:ardiansyah.ap8@gmail.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+6282276330774',
    link: 'tel:+6282276330774',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Banda Aceh, Indonesia',
    link: '#',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="max-w-5xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-80px' }}
          className="grid lg:grid-cols-5 gap-10 items-start"
        >
          {/* Info */}
          <div className="lg:col-span-2">
            <p className="text-sm font-medium text-primary mb-3">Get In Touch</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Let&apos;s Work Together
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              I&apos;m open to freelance work and collaboration. Tell me about your
              idea — I usually reply within a day.
            </p>

            <div className="mt-8 space-y-4">
              {contactInfo.map((info) => (
                <a
                  key={info.title}
                  href={info.link}
                  className="group flex items-center gap-4 text-sm hover:text-foreground transition-colors"
                >
                  <span className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <info.icon className="w-5 h-5 text-primary" />
                  </span>
                  <span>
                    <span className="block text-muted-foreground">{info.title}</span>
                    <span className="font-medium">{info.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-3"
          >
            <form
              className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-5 card-glow"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name" className="text-sm">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="mt-1.5 bg-background border-border/70"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-1.5 bg-background border-border/70"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="mt-1.5 bg-background border-border/70 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
