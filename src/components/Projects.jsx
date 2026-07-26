import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFigma } from 'react-icons/fa';
import { projects } from '../data/data';
import AnimatedHeading from './AnimatedHeading';
import { fadeUp, cardReveal, staggerContainer, lineReveal, sectionTransition } from '../animationVariants';

const Projects = () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    viewportWidth: 0,
    headerWidth: 0,
    cardWidth: 0,
    gap: 0,
    maxTranslation: 0,
  });

  useEffect(() => {
    const calculate = () => {
      const vw = window.innerWidth;
      let cardWidth, gap, headerWidth;

      if (vw >= 1024) {
        cardWidth = 380;
        gap = 64;
        headerWidth = 450;
      } else if (vw >= 768) {
        cardWidth = 340;
        gap = 48;
        headerWidth = 380;
      } else if (vw >= 640) {
        cardWidth = 300;
        gap = 32;
        headerWidth = 320;
      } else {
        cardWidth = 280;
        gap = 32;
        headerWidth = 280;
      }

      const totalCards = projects.length;
      const totalContentWidth = headerWidth + (totalCards * (cardWidth + gap)) - gap;

      let maxTranslation = 0;
      if (totalContentWidth > vw) {
        const lastCardCenter = headerWidth + (totalCards - 1) * (cardWidth + gap) + cardWidth / 2;
        maxTranslation = Math.max(0, lastCardCenter - vw / 2);
      }

      setDimensions({
        viewportWidth: vw,
        headerWidth,
        cardWidth,
        gap,
        maxTranslation,
      });
    };

    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, [projects.length]);

  const { viewportWidth, headerWidth, cardWidth, gap, maxTranslation } = dimensions;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslation]);

  const sectionHeight = maxTranslation > 0
    ? `${Math.ceil((maxTranslation / viewportWidth) * 100) + 100}vh`
    : '100vh';

  const cardScales = projects.map((_, index) => {
    const cardCenterOffset = headerWidth + index * (cardWidth + gap) + cardWidth / 2;

    return useTransform(scrollYProgress, (progress) => {
      const currentX = -maxTranslation * progress;
      const cardCenterInViewport = cardCenterOffset + currentX;
      const distance = Math.abs(cardCenterInViewport - viewportWidth / 2);

      const maxDist = viewportWidth * 0.6;
      const normalized = Math.min(distance / maxDist, 1);
      const scale = 1 + 0.15 * (1 - normalized * normalized);
      return Math.min(Math.max(scale, 0.85), 1.15);
    });
  });

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative bg-primary border-t border-white/5"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          transition={{ delayChildren: 0.08, staggerChildren: 0.07 }}
          className="flex items-center gap-8 md:gap-12 lg:gap-16 px-6 md:px-10 lg:px-16"
        >
          {/* Header Section */}
          <motion.div variants={fadeUp} transition={sectionTransition} className="w-[300px] sm:w-[360px] md:w-[440px] lg:w-[520px] flex-shrink-0">
            <div className="mb-14 text-center">
              <AnimatedHeading
                subtitle="My Work"
                direction="split"
                fromLeftText="Featured"
                fromRightText="Projects"
                className="mb-4"
                align="left"
              />

            </div>
            <motion.p variants={fadeUp} transition={{ ...sectionTransition, delay: 0.12 }} className="text-dimText font-light mt-4 max-w-sm text-sm sm:text-base leading-relaxed">
              A space for self-initiated products, prototypes, and creative systems
              shaped by curiosity, code, and fast iteration.
            </motion.p>
            <motion.div variants={lineReveal} transition={{ duration: 0.7, delay: 0.2, ease: [0.77, 0, 0.18, 1] }} className="mt-6 flex items-center gap-3 text-dimText/40 text-xs uppercase tracking-[0.2em]">
              <span>Scroll →</span>
              <div className="w-16 h-px bg-dimText/20" />
            </motion.div>
          </motion.div>

          {/* Project Cards */}
          {projects.map((project, index) => {
            const scale = cardScales[index];
            return (
              <motion.div
                key={project.id}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: index * 0.06, ease: [0.77, 0, 0.18, 1] }}
                style={{ scale }}
                className="group relative w-[280px] sm:w-[300px] md:w-[340px] lg:w-[380px] flex-shrink-0 bg-cardBg rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent/10 transition-shadow duration-500"
              >
                <div className="relative overflow-hidden h-48 sm:h-52 md:h-56 lg:h-64">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7, ease: [0.77, 0, 0.18, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <span className="absolute top-4 right-4 text-sm font-light text-white/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-lightText/10 backdrop-blur-md rounded-full hover:bg-accent transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaGithub className="text-2xl text-lightText" />
                      </motion.a>
                    )}
                    {project.figma && (
                      <motion.a
                        href={project.figma}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#fcfcfc]/20 backdrop-blur-md rounded-full hover:bg-[#fcfcfc]/40 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaFigma className="text-2xl text-[#000000]" />
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-accent rounded-full hover:bg-accent-dark transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaExternalLinkAlt className="text-2xl text-primary" />
                      </motion.a>
                    )}
                  </div>
                </div>

                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-lightText mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-dimText text-xs sm:text-sm mb-3 md:mb-4 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-accent/10 text-accent rounded-full border border-accent/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;