import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { personalInfo } from '../data/data';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-primary/85"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-dimText text-lg md:text-xl mb-2">Hi, I'm</h2>
          <h1 className="text-5xl md:text-7xl font-bold text-lightText mb-4">{personalInfo.name}</h1>
          <div className="text-accent text-2xl md:text-4xl font-semibold mb-6">{personalInfo.title}</div>
          <p className="text-dimText max-w-2xl mx-auto text-lg mb-8">{personalInfo.subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/Resume.pdf"
              download
              className="px-8 py-3 bg-accent text-primary font-semibold rounded-full hover:shadow-lg hover:shadow-accent/30 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Download CV
            </motion.a>
            <motion.a
              href="#projects"
              className="px-8 py-3 border-2 border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-primary transition-all"
              whileHover={{ scale: 1.05 }}
            >
              View Projects
            </motion.a>
          </div>

          <div className="flex justify-center gap-6 mt-12">
            <a href="#" className="text-dimText hover:text-accent transition-colors text-2xl">
              <FaGithub />
            </a>
            <a href="#" className="text-dimText hover:text-accent transition-colors text-2xl">
              <FaLinkedin />
            </a>
            <a href="#" className="text-dimText hover:text-accent transition-colors text-2xl">
              <FaTwitter />
            </a>
          </div>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-dimText rounded-full flex justify-center">
              <div className="w-1 h-3 bg-accent rounded-full mt-2"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
