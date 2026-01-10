
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(hover: none)').matches);
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    // Cross-Window Listener for Iframes (Demos)
    const handleIframeMessage = (e: MessageEvent) => {
      const { type, x, y, hovering } = e.data;
      
      if (type === 'sal-cursor-move') {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          const rect = iframe.getBoundingClientRect();
          cursorX.set(rect.left + x);
          cursorY.set(rect.top + y);
        }
      } else if (type === 'sal-cursor-down') {
        setIsMouseDown(true);
      } else if (type === 'sal-cursor-up') {
        setIsMouseDown(false);
      } else if (type === 'sal-cursor-hover') {
        setIsHovering(hovering);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('message', handleIframeMessage);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('message', handleIframeMessage);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <div aria-hidden="true">
      {/* Outer Glow / Follower */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference"
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div 
          animate={{ 
            scale: isHovering ? 2.5 : 1,
            rotate: isHovering ? 45 : 0,
            borderRadius: isHovering ? "0%" : "0%"
          }}
          transition={{ type: "spring", damping: 20 }}
          className="w-10 h-10 border border-white/30" 
        />
        <div className="absolute w-[1px] h-full bg-white/10" />
        <div className="absolute h-[1px] w-full bg-white/10" />
      </motion.div>

      {/* Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[10000] bg-white mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{ 
          scale: isMouseDown ? 0.5 : 1,
        }}
      />
    </div>
  );
};
