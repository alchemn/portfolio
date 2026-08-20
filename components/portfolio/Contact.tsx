'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'ardiansyah.ap8@gmail.com', href: 'mailto:ardiansyah.ap8@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+6282276330774', href: 'tel:+6282276330774' },
  { icon: MapPin, label: 'Location', value: 'Banda Aceh, Indonesia', href: null },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">Contact</h2>
            <p className="text-sm text-white/40 leading-relaxed max-w-sm mb-6">
              Open untuk freelance dan kolaborasi. Ceritakan idemu — saya biasanya balas dalam sehari.
            </p>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-2"
            >
              {contactInfo.map((info) => (
                <motion.a
                  key={info.label}
                  variants={fadeUp}
                  href={info.href ?? '#'}
                  className="group flex items-center gap-3 p-3 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-white/[0.1] hover:bg-white/[0.03] transition-all duration-300"
                >
                  <info.icon className="w-4 h-4 text-white/30 group-hover:text-white/50 transition-colors" />
                  <span className="flex-1 text-sm text-white/60">{info.value}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/15 group-hover:text-white/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <form
              className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-5 space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-white/30 uppercase tracking-wider mb-1.5 block">Name</label>
                  <input
                    type="text"
                    placeholder="Nama"
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white/[0.03] border border-white/[0.05] text-white placeholder:text-white/20 focus:border-white/[0.15] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-white/30 uppercase tracking-wider mb-1.5 block">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 text-sm rounded-lg bg-white/[0.03] border border-white/[0.05] text-white placeholder:text-white/20 focus:border-white/[0.15] focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-white/30 uppercase tracking-wider mb-1.5 block">Message</label>
                <textarea
                  rows={4}
                  placeholder="Ceritakan projectmu..."
                  className="w-full px-3 py-2 text-sm rounded-lg bg-white/[0.03] border border-white/[0.05] text-white placeholder:text-white/20 focus:border-white/[0.15] focus:outline-none resize-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 text-sm font-medium rounded-lg bg-white text-black hover:bg-white/90 active:scale-[0.99] transition-all"
              >
                Send
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
