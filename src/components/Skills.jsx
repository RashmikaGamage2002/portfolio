import { motion } from 'framer-motion';
import {
  SiReact, SiNodedotjs, SiTailwindcss, SiPython,
  SiJavascript, SiTypescript, SiMysql, SiMongodb, SiGit,
  SiDocker, SiFigma, SiVite, SiSpringboot, SiPostman
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import AnimatedHeading from './AnimatedHeading';
import { fadeUp, cardReveal, staggerContainer, lineReveal, sectionTransition } from '../animationVariants';

const blobVariants = {
  floatA: { x: [0, -40, 20, 0], y: [0, 25, -20, 0], transition: { duration: 16, repeat: Infinity, ease: 'easeInOut' } },
  floatB: { x: [0, 30, -25, 0], y: [0, -30, 15, 0], transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' } },
  floatC: { x: [0, 20, -30, 0], y: [0, -25, 30, 0], transition: { duration: 18, repeat: Infinity, ease: 'easeInOut' } },
};

const orbitDot = {
  rotate: 360,
  transition: { duration: 14, repeat: Infinity, ease: 'linear' },
};

const Skills = () => {
  const skillCategories = {
    'Languages': ['JavaScript', 'TypeScript', 'Java', 'Python'],
    'Frameworks & Libraries': ['React', 'Node.js', 'Tailwind CSS', 'Spring Boot'],
    'Tools & Platforms': ['Git', 'Docker', 'Figma', 'Vite', 'Postman'],
    'Databases': ['MySQL', 'MongoDB'],
  };

  const iconMap = {
    'React': SiReact,
    'Node.js': SiNodedotjs,
    'Tailwind CSS': SiTailwindcss,
    'Java': FaJava,
    'Python': SiPython,
    'JavaScript': SiJavascript,
    'TypeScript': SiTypescript,
    'MySQL': SiMysql,
    'MongoDB': SiMongodb,
    'Git': SiGit,
    'Docker': SiDocker,
    'Figma': SiFigma,
    'Vite': SiVite,
    'Spring Boot': SiSpringboot,
    'Postman': SiPostman,
  };

  return (
    <section id="skills" className="relative overflow-hidden py-20 border-t border-white/5">

      {/* ─── Animated background blobs ─── */}
      <motion.div className="pointer-events-none absolute top-10 right-10 h-80 w-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,191,255,0.32) 0%, transparent 70%)', filter: 'blur(80px)' }}
        variants={blobVariants} animate="floatA" />
      <motion.div className="pointer-events-none absolute bottom-10 left-10 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.28) 0%, transparent 70%)', filter: 'blur(70px)' }}
        variants={blobVariants} animate="floatB" />
      <motion.div className="pointer-events-none absolute top-1/2 left-1/3 h-64 w-64 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,153,204,0.30) 0%, transparent 70%)', filter: 'blur(70px)' }}
        variants={blobVariants} animate="floatC" />

      {/* ─── Rotating ring decoration ─── */}
      <motion.div
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full border border-accent/15"
        animate={{ rotate: 360 }}
        transition={orbitDot.transition}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-accent"
          style={{ boxShadow: '0 0 12px rgba(0,191,255,0.9)' }} />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full border border-blue-500/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-blue-500"
          style={{ boxShadow: '0 0 10px rgba(59,130,246,0.9)' }} />
      </motion.div>

      <div className="container mx-auto px-6">
        <div className="mb-14 text-center">
          <AnimatedHeading
            subtitle="Toolbox"
            direction="split"
            fromLeftText="Skills &"
            fromRightText="Technologies"
            className="mb-4"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={lineReveal}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.77, 0, 0.18, 1] }}
            className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-accent"
          />
        </div>

        {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
          <motion.div key={categoryIndex} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={staggerContainer} className="mb-12">
            <motion.h3 variants={fadeUp} transition={{ ...sectionTransition, delay: categoryIndex * 0.05 }} className="text-xl font-semibold text-accent mb-6 text-center">{category}</motion.h3>


            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
              {skills.map((skill, index) => {
                const Icon = iconMap[skill];
                return (
                  <motion.div
                    key={index}
                    variants={cardReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, delay: index * 0.04, ease: [0.77, 0, 0.18, 1] }}
                    whileHover={{ y: -8, scale: 1.04 }}
                    className="group relative bg-secondary/80 p-6 rounded-xl text-center hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 border border-white/5 hover:border-accent/40 w-[150px] flex-shrink-0 overflow-hidden"
                  >
                    {/* Rotating conic glow on hover */}
                    <span className="pointer-events-none absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'conic-gradient(from 0deg, rgba(0,191,255,0.0), rgba(0,191,255,0.35), rgba(37,99,235,0.35), rgba(0,153,204,0.35), rgba(0,191,255,0.0))',
                      }}>
                      <motion.span
                        className="absolute inset-[1px] rounded-xl bg-secondary/90"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      />
                    </span>

                    <div className="relative z-10">
                      {Icon && (
                        <motion.div
                          animate={{ rotate: [0, -8, 8, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 }}
                        >
                          <Icon className="text-5xl mx-auto mb-3 text-dimText group-hover:text-accent transition-colors duration-300" />
                        </motion.div>
                      )}
                      <p className="text-sm text-dimText group-hover:text-lightText transition-colors font-medium">
                        {skill}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;