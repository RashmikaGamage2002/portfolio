import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { fadeUp, fadeIn, hoverLift, sectionTransition, staggerContainer } from '../animationVariants';

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

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50vh] w-[50vh] md:h-[70vh] md:w-[70vh] rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute inset-0">
          <img
            src="/hero-bg.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/30" />
        </div>
      </div>


      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          transition={{ delayChildren: 0.1, staggerChildren: 0.08 }}
          className="text-center"
        >
          <div className="mx-auto w-full">
            <motion.p
              className="text-[12px] uppercase tracking-[0.4em] text-gray-500 mb-4"
              variants={fadeIn}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
            >
              Hi, I'm
            </motion.p>

            <motion.h1
              className="text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[7vw] xl:text-[8rem] font-black uppercase leading-[0.9] tracking-tighter whitespace-nowrap flex justify-center gap-[2vw] md:gap-4"
              variants={fadeUp}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
            >
              <span className="text-[#E6DACE]">Rashmika</span>
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #E6DACE' }}>Gamage</span>
            </motion.h1>

            <motion.div
              className="mt-5 flex flex-wrap items-center justify-center gap-3"
              variants={fadeIn}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
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
              variants={fadeUp}
              transition={{ delay: 0.45, duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
            >
              Passionate Software Engineering student with hands-on experience in
              building full-stack applications and creating intuitive user experiences.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeUp}
              transition={{ delay: 0.55, duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
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
              variants={fadeIn}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
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
                  whileHover={hoverLift}
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