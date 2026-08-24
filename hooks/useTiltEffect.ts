import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltEffectOptions {
  stiffness?: number;
  damping?: number;
  maxTilt?: number;
  scale?: number;
}

export function useTiltEffect(options: TiltEffectOptions = {}) {
  const { stiffness = 200, damping = 20, maxTilt = 8, scale: scaleAmount = 1.02 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness, damping };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);
  const scale = useSpring(1, { stiffness: 200, damping: 20 });
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [100, -100]), springConfig);
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const yPos = (e.clientY - rect.top - rect.height / 2) / rect.height;
    x.set(xPos);
    y.set(yPos);
    scale.set(scaleAmount);
    glareOpacity.set(0.15);
  }, [x, y, scale, glareOpacity, scaleAmount]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    scale.set(1);
    glareOpacity.set(0);
  }, [x, y, scale, glareOpacity]);

  return {
    ref,
    style: { rotateX, rotateY, scale },
    glareStyle: { x: glareX, opacity: glareOpacity },
    handleMouseMove,
    handleMouseLeave,
  };
}
