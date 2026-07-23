import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
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
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary"
    >
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-100" />

      {/* Content Container - FIXED POSITIONING */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center pt-28 sm:pt-32 md:pt-36 lg:pt-40 xl:pt-44 pb-16 sm:pb-20 md:pb-24"
        >
          <div className="mx-auto max-w-3xl">
          {/* Badge */}
          <motion.div
            className="inline-block mb-4 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-accent/10 border border-accent/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            <span className="text-accent text-xs sm:text-sm font-medium">Open to Opportunities</span>
          </motion.div>

          {/* Greeting */}
          <h2 className="text-gray-400 text-base sm:text-lg md:text-xl mb-2 sm:mb-3">
            Hi, I'm
          </h2>
          
          {/* Name - Responsive */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black text-white mb-2 sm:mb-4 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Rashmika <span className="text-accent">Gamage</span>
          </motion.h1>

          {/* Typing Effect */}
          <div className="h-12 sm:h-14 md:h-20 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-400">
              I'm a
            </span>
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-accent min-w-[100px] sm:min-w-[140px] md:min-w-[160px]">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          {/* Description - Responsive */}
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg mt-4 sm:mt-6 leading-relaxed px-4 sm:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Passionate Software Engineering student with hands-on experience in 
            building full-stack applications and creating intuitive user experiences.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8 md:mt-10 px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.a
              href="/Resume.pdf"
              download
              className="px-6 sm:px-8 py-3 sm:py-4 bg-accent text-black font-semibold rounded-full shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className="w-4 h-4" />
              Download CV
            </motion.a>
            
            <motion.a
              href="#projects"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-black transition-all text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div 
            className="flex justify-center gap-4 sm:gap-6 mt-8 sm:mt-10 md:mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { icon: FaGithub, link: 'https://github.com/RashmikaGamage2002' },
              { icon: FaLinkedin, link: 'www.linkedin.com/in/rashmika-gamage-b6979b29a' },
              { icon: AiFillInstagram, link: 'https://www.instagram.com/rashmika_gamagee/?hl=en' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                className="text-gray-400 hover:text-accent transition-all p-2 sm:p-3 rounded-full bg-secondary/50 hover:bg-accent/10 backdrop-blur-sm"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="text-xl sm:text-2xl" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
          >
            <a href="#about" className="flex flex-col items-center gap-1 sm:gap-2 text-gray-400 hover:text-accent transition-colors">
              <span className="text-xs sm:text-sm">Scroll</span>
              <MdOutlineKeyboardArrowDown className="text-xl sm:text-2xl" />
            </a>
          </motion.div>
        </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;