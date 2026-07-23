import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
          mass: 0.5,
        }}
      >
        <div
          className={`w-10 h-10 border-2 rounded-full transition-colors duration-300 ${
            isHovering
              ? 'border-accent bg-accent/10 scale-125'
              : 'border-accent/50'
          }`}
        />
      </motion.div>

      {/* Small Dot following cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
        }}
        transition={{
          type: 'spring',
          stiffness: 1000,
          damping: 20,
          mass: 0.1,
        }}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
            isHovering ? 'bg-accent' : 'bg-dimText'
          }`}
        />
      </motion.div>
    </>
  );
};

export default Cursor;