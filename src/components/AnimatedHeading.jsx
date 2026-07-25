// src/components/AnimatedHeading.jsx
import { motion } from 'framer-motion';

// Helper function to split text into characters
const splitText = (text = '') => {
  return String(text)
    .split('')
    .map((char, index) => ({
      char: char === ' ' ? '\u00A0' : char,
      index,
      isSpace: char === ' ',
    }));
};

const AnimatedHeading = ({
  text,
  subtitle = '',
  direction = 'center', // 'left', 'right', 'center', 'split'
  className = '',
  subtitleClassName = '',
  staggerDelay = 0.04,
  fromLeftText = '',
  fromRightText = '',
  accentColor = 'text-accent',
}) => {
  // For 'split' mode: split text into two parts
  const leftChars = fromLeftText ? splitText(fromLeftText) : [];
  const rightChars = fromRightText ? splitText(fromRightText) : [];

  // For other modes: all text goes together
  const allChars = splitText(text);

  // Animation variants for characters coming from LEFT
  const leftCharVariants = {
    hidden: (i) => ({
      opacity: 0,
      x: -50,
      rotateY: 45,
    }),
    visible: (i) => ({
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        delay: i * staggerDelay,
        duration: 0.6,
        ease: [0.77, 0, 0.18, 1],
      },
    }),
  };

  // Animation variants for characters coming from RIGHT
  const rightCharVariants = {
    hidden: (i) => ({
      opacity: 0,
      x: 50,
      rotateY: -45,
    }),
    visible: (i) => ({
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        delay: i * staggerDelay,
        duration: 0.6,
        ease: [0.77, 0, 0.18, 1],
      },
    }),
  };

  // Animation variants for characters coming from CENTER (growing)
  const centerCharVariants = {
    hidden: (i) => ({
      opacity: 0,
      scale: 0.5,
      rotateX: 45,
    }),
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: i * staggerDelay * 0.8,
        duration: 0.6,
        ease: [0.77, 0, 0.18, 1],
      },
    }),
  };

  // Animation variants for characters coming from LEFT (for left-aligned headings)
  const leftAlignedCharVariants = {
    hidden: (i) => ({
      opacity: 0,
      x: -30,
    }),
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * staggerDelay,
        duration: 0.6,
        ease: [0.77, 0, 0.18, 1],
      },
    }),
  };

  // Animation variants for characters coming from RIGHT (for right-aligned headings)
  const rightAlignedCharVariants = {
    hidden: (i) => ({
      opacity: 0,
      x: 30,
    }),
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * staggerDelay,
        duration: 0.6,
        ease: [0.77, 0, 0.18, 1],
      },
    }),
  };

  // Select the appropriate animation based on direction
  const getVariants = () => {
    switch (direction) {
      case 'left':
        return leftAlignedCharVariants;
      case 'right':
        return rightAlignedCharVariants;
      case 'center':
        return centerCharVariants;
      case 'split':
        return null; // Handled separately
      default:
        return centerCharVariants;
    }
  };

  const variants = getVariants();

  // Render split mode (left + right parts)
  if (direction === 'split' && fromLeftText && fromRightText) {
    return (
      <div className={className}>
        {/* Subtitle (eyebrow text) */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
            className={`text-xs uppercase tracking-[0.5em] text-accent mb-3 ${subtitleClassName}`}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center items-center"
        >
          {/* Left Part */}
          <div className="flex flex-wrap justify-center">
            {leftChars.map(({ char, index }) => (
              <motion.span
                key={`left-${index}`}
                custom={index}
                variants={leftCharVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-accent inline-block"
                style={{
                  whiteSpace: char === '\u00A0' ? 'pre' : 'normal',
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Space between parts */}
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white inline-block w-2 sm:w-3">
            &nbsp;
          </span>

          {/* Right Part */}
          <div className="flex flex-wrap justify-center">
            {rightChars.map(({ char, index }) => (
              <motion.span
                key={`right-${index}`}
                custom={index}
                variants={rightCharVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white inline-block"
                style={{
                  whiteSpace: char === '\u00A0' ? 'pre' : 'normal',
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // Render standard mode (all characters together)
  return (
    <div className={className}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
          className={`text-xs uppercase tracking-[0.5em] text-accent mb-3 ${subtitleClassName}`}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className={`flex flex-wrap ${
          direction === 'left' ? 'justify-start' : 
          direction === 'right' ? 'justify-end' : 
          'justify-center'
        }`}
      >
        {allChars.map(({ char, index }) => (
          <motion.span
            key={index}
            custom={index}
            variants={variants}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white inline-block ${accentColor}`}
            style={{
              whiteSpace: char === '\u00A0' ? 'pre' : 'normal',
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default AnimatedHeading;