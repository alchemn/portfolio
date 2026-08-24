'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTiltEffect } from '@/hooks/useTiltEffect';

interface TiltCardProps {
  children?: ReactNode;
  className?: string;
  stiffness?: number;
  damping?: number;
  maxTilt?: number;
  showGlare?: boolean;
}

export default function TiltCard({
  children,
  className = '',
  stiffness,
  damping,
  maxTilt,
  showGlare = true,
}: TiltCardProps) {
  const { ref, style, glareStyle, handleMouseMove, handleMouseLeave } = useTiltEffect({
    stiffness,
    damping,
    maxTilt,
  });

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <div className="relative overflow-hidden">
        {children}
        {showGlare && (
          <motion.div
            style={{ opacity: glareStyle.opacity }}
            className="absolute inset-0 pointer-events-none rounded-xl"
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
              style={{ transform: `translateX(${glareStyle.x.get()}%)` }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
