export const portfolioEasing = [0.77, 0, 0.18, 1];

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeUpSmall = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
};

export const lineReveal = {
  hidden: { opacity: 0, scaleX: 0.9 },
  visible: { opacity: 1, scaleX: 1 },
};

export const cardReveal = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

export const hoverLift = {
  y: -4,
  scale: 1.01,
  transition: { duration: 0.25, ease: portfolioEasing },
};

export const sectionTransition = {
  duration: 0.7,
  ease: portfolioEasing,
};

export const sectionTransitionDelayed = {
  duration: 0.7,
  ease: portfolioEasing,
  delay: 0.1,
};
