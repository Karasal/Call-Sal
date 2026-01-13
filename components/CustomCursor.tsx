
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkTouch = () => setIsTouchDevice(window.matchMedia('(hover: none)').matches);
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <div aria-hidden="true">
      {/* HUD Crosshair */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-[9999] flex items-center justify-center"
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div 
          animate={{ 
            scale: isHovering ? 1.5 : 1,
            rotate: isHovering ? 90 : 0,
            opacity: 0.8
          }}
          className={`w-full h-full border-[1px] ${isHovering ? 'border-[#CCFF00]' : 'border-white/30'} relative`}
        >
          {/* Corner Ticks */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current" />
        </motion.div>
        
        {/* Center Dot */}
        <motion.div 
          animate={{ scale: isMouseDown ? 3 : 1, backgroundColor: isHovering ? '#CCFF00' : '#ffffff' }}
          className="absolute w-1 h-1 rounded-full" 
        />
      </motion.div>

      {/* Trailing Pointer for tactical feel */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-[#CCFF00] pointer-events-none z-[10000]"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
      />
    </div>
  );
};
