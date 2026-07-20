import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaDownload } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const roles = ['Software Engineer', 'Frontend Developer', 'UI/UX Enthusiast'];
  
  useEffect(() => {
    const handleType = () => {
      const currentRole = roles[loopNum % roles.length];
      const updatedText = isDeleting 
        ? currentRole.substring(0, text.length - 1)
        : currentRole.substring(0, text.length + 1);
      
      setText(updatedText);

      if (!isDeleting && updatedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, 100);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-radial from-accent/5 via-transparent to-transparent animate-spin-slow" />
        </div>
      </div>

      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-2 mix-blend-overlay" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-4 px-6 py-2 rounded-full bg-accent/10 border border-accent/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <span className="text-accent text-sm font-medium">Open to Opportunities</span>
          </motion.div>

          <h2 className="text-dimText text-lg md:text-xl mb-3">Hi, I'm</h2>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-black text-lightText mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Rashmika Gamage
          </motion.h1>

          <div className="h-16 md:h-20 flex items-center justify-center gap-3">
            <span className="text-2xl md:text-4xl font-semibold text-dimText">I'm a</span>
            <span className="text-2xl md:text-4xl font-bold text-accent min-w-[200px]">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          <motion.p 
            className="text-dimText max-w-2xl mx-auto text-base md:text-lg mt-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Passionate Software Engineering student with hands-on experience in 
            building full-stack applications and creating intuitive user experiences.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="/Resume.pdf"
              download
              className="group px-8 py-4 bg-gradient-accent text-primary font-semibold rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className="group-hover:animate-bounce" />
              Download CV
            </motion.a>
            
            <motion.a
              href="#projects"
              className="px-8 py-4 border-2 border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-primary transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div 
            className="flex justify-center gap-6 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { icon: FaGithub, link: '#' },
              { icon: FaLinkedin, link: '#' },
              { icon: FaTwitter, link: '#' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                className="text-dimText hover:text-accent transition-all p-3 rounded-full bg-secondary/50 hover:bg-accent/10 backdrop-blur-sm"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="text-2xl" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          >
            <a href="#about" className="flex flex-col items-center gap-2 text-dimText hover:text-accent transition-colors">
              <span className="text-sm">Scroll</span>
              <MdOutlineKeyboardArrowDown className="text-2xl" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;