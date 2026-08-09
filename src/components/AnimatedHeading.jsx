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
  align = 'center', // 'left', 'center', 'right'
  textSize = 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
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

  const effectiveAlign = align !== 'center' ? align : (direction === 'left' ? 'left' : direction === 'right' ? 'right' : 'center');
  const justifyClass =
    effectiveAlign === 'left' ? 'justify-start' :
      effectiveAlign === 'right' ? 'justify-end' :
        'justify-center';
  const subtitleAlignClass =
    effectiveAlign === 'left' ? 'text-left' :
      effectiveAlign === 'right' ? 'text-right' :
        'text-center';

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
            className={`text-xs uppercase tracking-[0.5em] text-accent mb-3 ${subtitleAlignClass} ${subtitleClassName}`}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={`flex flex-wrap ${justifyClass} items-center`}
        >
          {/* Left Part */}
          <div className={`flex flex-nowrap ${justifyClass}`}>
            {leftChars.map(({ char, index }) => (
              <motion.span
                key={`left-${index}`}
                custom={index}
                variants={leftCharVariants}
                className={`${textSize} font-bold text-accent inline-block`}
                style={{
                  whiteSpace: char === '\u00A0' ? 'pre' : 'normal',
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Space between parts */}
          <span className={`${textSize} font-bold text-white inline-block w-2 sm:w-3`}>
            &nbsp;
          </span>

          {/* Right Part */}
          <div className={`flex flex-nowrap ${justifyClass}`}>
            {rightChars.map(({ char, index }) => (
              <motion.span
                key={`right-${index}`}
                custom={index}
                variants={rightCharVariants}
                className={`${textSize} font-bold text-white inline-block`}
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
          className={`text-xs uppercase tracking-[0.5em] text-accent mb-3 ${subtitleAlignClass} ${subtitleClassName}`}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className={`flex flex-wrap ${justifyClass}`}
      >
        {allChars.map(({ char, index }) => (
          <motion.span
            key={index}
            custom={index}
            variants={getVariants()}
            className={`${textSize} font-bold text-white inline-block ${accentColor}`}
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