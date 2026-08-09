import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFigma, FaArrowRight } from 'react-icons/fa';
import { projects } from '../data/data';

const Projects = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="projects" className="relative bg-primary py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs uppercase tracking-[0.5em] text-accent font-light">
              03 · Work
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <p className="text-dimText font-light mt-4 max-w-xl text-sm sm:text-base leading-relaxed">
            A selection of my recent work — each project is a blend of creativity,
            technology, and thoughtful design.
          </p>
        </div>

        {/* Cards – no extra spacing between them */}
        <div className="relative">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, total, isMobile }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  const role = project.tech?.[0] || 'Project';
  const year = new Date().getFullYear();
  const link = project.live || project.github || project.figma || '#';

  return (
    <motion.div
      ref={ref}
      className="sticky top-[15vh] md:top-[20vh]"
      style={{
        zIndex: total - index,
        paddingTop: isMobile ? `${index * 1}rem` : `${index * 2.5}rem`,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="group relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-cardBg border border-white/5 hover:border-accent/20 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          onClick={(e) => { if (link === '#') e.preventDefault(); }}
        >
          <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover transition-[filter] duration-700 group-hover:brightness-110 group-hover:contrast-[1.05]"
              style={{
                y: isMobile ? 0 : imageY,
                scale: isMobile ? 1 : imageScale,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />

            <span className="absolute right-4 top-4 md:right-6 md:top-6 rounded-full border border-white/10 bg-primary/60 px-3 py-1 md:px-4 md:py-1.5 font-mono text-[10px] md:text-xs text-dimText backdrop-blur-md">
              {year}
            </span>

            <div className="absolute inset-x-4 bottom-4 md:inset-x-8 md:bottom-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="mb-1 md:mb-2 text-[10px] md:text-xs uppercase tracking-[0.28em] text-accent font-light">
                  {role}
                </p>
                <h3 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white leading-[0.95] transition-transform duration-500 group-hover:-translate-y-1">
                  {project.title}
                </h3>
                <p className="mt-2 md:mt-3 max-w-md text-xs sm:text-sm text-dimText leading-relaxed line-clamp-2 md:line-clamp-3">
                  {project.description}
                </p>
                <div className="mt-3 md:mt-4 flex flex-wrap gap-1.5 md:gap-2">
                  {project.tech?.map((tech, ti) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/5 bg-white/5 px-2 py-0.5 md:px-3 md:py-1 text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-dimText transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-accent/30 group-hover:text-lightText"
                      style={{ transitionDelay: `${ti * 50}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <span className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-primary/50 backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent">
                <FaArrowRight className="h-4 w-4 md:h-5 md:w-5 text-white group-hover:text-primary transition-colors" />
              </span>
            </div>
          </div>
        </a>
      </div>
    </motion.div>
  );
};

export default Projects;