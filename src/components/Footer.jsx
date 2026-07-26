import { motion } from 'framer-motion';
import { fadeIn, sectionTransition } from '../animationVariants';

const Footer = () => {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      transition={sectionTransition}
      className="py-10 bg-primary border-t border-white/10"
    >
      <div className="container mx-auto px-6 text-center text-dimText">
        <p>© {new Date().getFullYear()} Rashmika Gamage. Built with React, Vite, and Tailwind CSS.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
