'use client';

import { type ReactNode, type MouseEvent } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

interface MagneticButtonProps extends MotionProps {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  stiffness?: number;
  damping?: number;
  intensity?: number;
}

function MagneticLink({
  children,
  href,
  className,
  stiffness,
  damping,
  intensity,
  ...props
}: Omit<MagneticButtonProps, 'onClick'> & { href: string }) {
  const { ref, style, handleMouseMove, handleMouseLeave } = useMagneticEffect<HTMLAnchorElement>({
    stiffness,
    damping,
    intensity,
  });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}

function MagneticBtn({
  children,
  className,
  onClick,
  stiffness,
  damping,
  intensity,
  ...props
}: Omit<MagneticButtonProps, 'href'>) {
  const { ref, style, handleMouseMove, handleMouseLeave } = useMagneticEffect<HTMLButtonElement>({
    stiffness,
    damping,
    intensity,
  });

  return (
    <motion.button
      ref={ref}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default function MagneticButton({ href, ...props }: MagneticButtonProps) {
  if (href) {
    return <MagneticLink href={href} {...props} />;
  }
  return <MagneticBtn {...props} />;
}
