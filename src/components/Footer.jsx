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
      className="py-10 bg-secondary border-t border-white/10"
    >
      <div className="container mx-auto px-6 text-center text-dimText">
        <p>© {new Date().getFullYear()} <br />Made by Rashmika Gamage.<br /> FROM IDEAS TO INTERFACES.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
