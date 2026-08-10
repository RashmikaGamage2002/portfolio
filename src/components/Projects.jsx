// src/components/Projects.jsx
import { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFigma } from 'react-icons/fa';
import { projects } from '../data/data';
import AnimatedHeading from './AnimatedHeading';

const blobVariants = {
  floatA: { x: [0, 40, -20, 0], y: [0, -30, 20, 0], transition: { duration: 14, repeat: Infinity, ease: 'easeInOut' } },
  floatB: { x: [0, -30, 30, 0], y: [0, 25, -15, 0], transition: { duration: 18, repeat: Infinity, ease: 'easeInOut' } },
  floatC: { x: [0, 25, -25, 0], y: [0, 20, -30, 0], transition: { duration: 16, repeat: Infinity, ease: 'easeInOut' } },
};

const scanline = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: { scaleY: 1, opacity: 1, transition: { duration: 1.2, ease: [0.77, 0, 0.18, 1] } },
};

const Projects = () => {
  const sectionRef = useRef(null);

  // ─── Card variants based on parity ──────────────────────────────────────────
  const getVariants = (index) => {
    const isEven = index % 2 === 0;

    return {
      // Image animation: scale + reveal (different direction based on side)
      image: {
        hidden: {
          opacity: 0,
          scale: 0.85,
          x: isEven ? -60 : 60,
        },
        visible: {
          opacity: 1,
          scale: 1,
          x: 0,
          transition: {
            type: 'spring',
            stiffness: 70,
            damping: 20,
            duration: 0.9,
          },
        },
      },
      // Text: horizontal slide from opposite direction
      text: {
        hidden: {
          opacity: 0,
          x: isEven ? 60 : -60,
        },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            type: 'spring',
            stiffness: 80,
            damping: 20,
            duration: 0.8,
            delay: 0.1,
          },
        },
      },
      // Number: vertical movement (slide up/down)
      number: {
        hidden: {
          opacity: 0,
          y: isEven ? -40 : 40,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
            duration: 0.6,
            delay: 0.2,
          },
        },
      },
    };
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative border-t border-white/5 py-24 sm:py-32"
    >
      {/* ─── Animated background blobs ─── */}
      <motion.div className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,191,255,0.30) 0%, transparent 70%)', filter: 'blur(70px)' }}
        variants={blobVariants} animate="floatA" />
      <motion.div className="pointer-events-none absolute top-1/2 right-10 h-80 w-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)', filter: 'blur(80px)' }}
        variants={blobVariants} animate="floatB" />
      <motion.div className="pointer-events-none absolute bottom-10 left-1/3 h-64 w-64 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,153,204,0.28) 0%, transparent 70%)', filter: 'blur(70px)' }}
        variants={blobVariants} animate="floatC" />

      {/* ─── Animated grid overlay ─── */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,191,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        animate={{ backgroundPosition: ['0px 0px', '60px 60px'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* ─── Heading ──────────────────────────────────────────────────────── */}
        <div className="mb-16 text-center">
          <AnimatedHeading
            subtitle="My Work"
            direction="split"
            fromLeftText="Featured"
            fromRightText="Projects"
            className="mb-4"
            align="center"
          />
          <p className="text-dimText font-light max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            A space for self-initiated products, prototypes, and creative systems
            shaped by curiosity, code, and fast iteration.
          </p>
          <div className="mt-4 flex justify-center">
            <div className="w-16 h-px bg-accent/30" />
          </div>
        </div>

        {/* ─── Cards ────────────────────────────────────────────────────────── */}
        <div className="space-y-20 md:space-y-28">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const cardRef = useRef(null);
            const isInView = useInView(cardRef, {
              once: true,
              amount: 0.2,
              margin: '-50px',
            });

            // ─── Scroll-driven blur & scale for each card ──────────────────
            const { scrollYProgress } = useScroll({
              target: cardRef,
              offset: ['start end', 'end start'],
            });
            const cardBlur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [8, 0, 0, 8]);
            const cardScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.96, 1, 1, 0.96]);

            const variants = getVariants(index);

            return (
              <motion.div
                key={project.id}
                ref={cardRef}
                style={{
                  filter: isInView ? 'blur(0px)' : `blur(${cardBlur}px)`,
                  scale: isInView ? 1 : cardScale,
                }}
                className={`group relative bg-cardBg rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-accent/20 transition-shadow duration-700 border border-white/5 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex flex-col`}
              >
                {/* ─── Animated blue border glow ───────────────────────── */}
                <span className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,191,255,0.6), rgba(37,99,235,0.4), rgba(0,153,204,0.6))',
                    backgroundSize: '200% 200%',
                  }}>
                  <motion.span
                    className="absolute inset-[1px] rounded-2xl bg-cardBg"
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    style={{ backgroundImage: 'linear-gradient(135deg, rgba(0,191,255,0.0), rgba(0,153,204,0.0))' }}
                  />
                </span>
                <motion.span
                  className="pointer-events-none absolute left-0 top-0 h-full w-[2px] origin-top bg-gradient-to-b from-accent via-blue-500 to-transparent opacity-0 group-hover:opacity-100"
                  variants={scanline}
                  initial="hidden"
                  whileInView="visible"
                />

                {/* ─── Image ──────────────────────────────────────────────── */}
                <motion.div
                  variants={variants.image}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="relative md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[320px] overflow-hidden"
                >
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-0.5"
                    whileHover={{ scale: 1.05, rotate: 0.5 }}
                    transition={{ type: 'tween', duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Overlay links */}
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
                </motion.div>

                {/* ─── Content ────────────────────────────────────────────── */}
                <motion.div
                  variants={variants.text}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="flex-1 p-6 md:p-8 flex flex-col justify-center relative"
                >
                  {/* Project Number */}
                  <motion.div
                    variants={variants.number}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="absolute top-4 right-4 md:top-6 md:right-6 text-6xl font-bold text-white/5 select-none pointer-events-none"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {project.tech.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full border border-accent/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs text-dimText/50">+{project.tech.length - 3}</span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-lightText group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-dimText text-sm leading-relaxed max-w-xl">
                    {project.description}
                  </p>

                  {/* Action buttons */}
                  <div className="mt-5 flex flex-wrap gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-dimText hover:text-accent transition-colors"
                      >
                        <FaGithub className="text-lg" />
                        <span>Source</span>
                      </a>
                    )}
                    {project.figma && (
                      <a
                        href={project.figma}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-dimText hover:text-accent transition-colors"
                      >
                        <FaFigma className="text-lg" />
                        <span>Figma</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-dimText hover:text-accent transition-colors"
                      >
                        <FaExternalLinkAlt className="text-lg" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;