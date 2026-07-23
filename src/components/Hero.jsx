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
      className="min-h-screen relative overflow-hidden bg-primary"
    >
      {/* Hero blur background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-16 right-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0">
          <img 
            src="/hero-bg.jpg" 
            alt="Background"
            className="w-full h-full object-cover "
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.18, 1] }}
          className="text-center"
        >
          <div className="mx-auto max-w-4xl">                      
            <motion.p
              className="text-[12px] uppercase tracking-[0.4em] text-gray-500 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              Hi, I'm
            </motion.p>

            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
            >
              Rashmika
              
              <span className="text-accent">Gamage</span>
            </motion.h1>

            <motion.div 
              className="mt-5 flex flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="text-base sm:text-lg md:text-xl font-light text-gray-300">
                I'm a
              </span>
              <span className="text-base sm:text-lg md:text-xl font-semibold text-accent">
                {text}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>

            <motion.p 
              className="mx-auto mt-6 max-w-2xl text-sm sm:text-base font-light leading-relaxed text-gray-400 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Passionate Software Engineering student with hands-on experience in
              building full-stack applications and creating intuitive user experiences.
            </motion.p>

            <motion.div 
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <motion.a
                href="/Resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-9 py-4 text-sm font-semibold text-primary shadow-[0_20px_60px_rgba(0,191,255,0.28)] transition-all hover:bg-blue-400"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaDownload className="w-4 h-4" />
                Download CV
              </motion.a>
              
              <motion.a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-9 py-4 text-sm font-medium text-white transition-all hover:border-accent/30 hover:text-accent"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View My Work
              </motion.a>
            </motion.div>

            <motion.div 
              className="flex justify-center gap-6 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              {[
                { icon: FaGithub, link: 'https://github.com/RashmikaGamage2002' },
                { icon: FaLinkedin, link: 'https://www.linkedin.com/in/rashmika-gamage-b6979b29a' },
                { icon: AiFillInstagram, link: 'https://www.instagram.com/rashmika_gamagee/?hl=en' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-accent/30 hover:text-accent"
                  whileHover={{ y: -3 }}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex justify-center mt-12"
            >
              <a href="#about" className="flex flex-col items-center gap-1 text-gray-500 hover:text-accent transition-colors">
                <span className="text-[10px] tracking-[0.2em] uppercase font-light">Scroll</span>
                <MdOutlineKeyboardArrowDown className="text-xl" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;