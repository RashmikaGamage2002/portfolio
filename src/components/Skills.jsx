import { motion } from 'framer-motion';
import { 
  SiReact, SiNodedotjs, SiTailwindcss, SiPython, 
  SiJavascript, SiTypescript, SiMysql, SiMongodb, SiGit, 
  SiDocker, SiFigma, SiVite, SiSpringboot, SiPostman 
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import AnimatedHeading from './AnimatedHeading';
import { fadeUp, cardReveal, staggerContainer, lineReveal, sectionTransition } from '../animationVariants';

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
    <section id="skills" className="py-20 bg-primary">
      <div className="container mx-auto px-6">
         <div className="mb-14 text-center">
          <AnimatedHeading
            subtitle="tool box"
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
                    className="group bg-secondary p-6 rounded-xl text-center hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 hover:-translate-y-2 border border-secondary hover:border-accent/30 w-[150px] flex-shrink-0"
                  >
                    {Icon && (
                      <Icon className="text-5xl mx-auto mb-3 text-dimText group-hover:text-accent transition-colors duration-300" />
                    )}
                    <p className="text-sm text-dimText group-hover:text-lightText transition-colors font-medium">
                      {skill}
                    </p>
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