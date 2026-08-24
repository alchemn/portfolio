import { useRef, useCallback, type RefObject } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

interface MagneticEffectOptions {
  stiffness?: number;
  damping?: number;
  intensity?: number;
}

export function useMagneticEffect<T extends HTMLElement = HTMLElement>(
  options: MagneticEffectOptions = {}
) {
  const { stiffness = 200, damping = 20, intensity = 0.15 } = options;
  const ref = useRef<T>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness, damping });
  const springY = useSpring(y, { stiffness, damping });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * intensity);
    y.set((e.clientY - rect.top - rect.height / 2) * intensity);
  }, [x, y, intensity]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return {
    ref: ref as RefObject<T>,
    style: { x: springX, y: springY },
    handleMouseMove,
    handleMouseLeave,
  };
}
