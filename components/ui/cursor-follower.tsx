'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const dotX = useSpring(cursorX, { ...springConfig, damping: 20 });
  const dotY = useSpring(cursorY, { ...springConfig, damping: 20 });
  const ringX = useSpring(cursorX, { ...springConfig, damping: 30, stiffness: 200 });
  const ringY = useSpring(cursorY, { ...springConfig, damping: 30, stiffness: 200 });

  useEffect(() => {
    // Hide on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/20 mix-blend-difference hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 64 : 36,
          height: isHovering ? 64 : 36,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
          borderColor: isHovering ? 'rgba(16, 185, 129, 0.5)' : 'rgba(255, 255, 255, 0.2)',
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full bg-emerald-400 mix-blend-difference hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 6 : 4,
          height: isHovering ? 6 : 4,
          transition: 'width 0.2s ease, height 0.2s ease',
        }}
      />
    </>
  );
}
