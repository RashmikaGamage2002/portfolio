import { motion } from 'framer-motion';
import { 
  SiReact, SiNodedotjs, SiTailwindcss, SiPython, 
  SiJavascript, SiTypescript, SiMysql, SiMongodb, SiGit, 
  SiDocker, SiFigma, SiVite, SiSpringboot, SiPostman 
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-accent">Toolbox</p>
          <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Skills & Technologies</h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-accent" />
        </motion.div>

        {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h3 className="text-xl font-semibold text-accent mb-6 text-center">{category}</h3>
            
            
            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
              {skills.map((skill, index) => {
                const Icon = iconMap[skill];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;