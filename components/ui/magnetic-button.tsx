'use client';

import { type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  stiffness?: number;
  damping?: number;
  intensity?: number;
}

export default function MagneticButton({
  children,
  href,
  className = '',
  onClick,
  stiffness,
  damping,
  intensity,
}: MagneticButtonProps) {
  const { ref, style, handleMouseMove, handleMouseLeave } = useMagneticEffect<HTMLAnchorElement | HTMLButtonElement>({
    stiffness,
    damping,
    intensity,
  });

  const Component = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <Component
      ref={ref as any}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
