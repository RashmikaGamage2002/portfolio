import { motion } from 'framer-motion';
import { skills } from '../data/data';
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
  FaJs,
  FaGit,
  FaDocker,
  FaFigma,
  FaNode,
  FaVimeo,
  FaCss3Alt,
  FaDatabase,
} from 'react-icons/fa';

const iconMap = {
  'React': FaReact,
  'Node.js': FaNodeJs,
  'Tailwind CSS': FaCss3Alt,
  'Java': FaJava,
  'Python': FaPython,
  'JavaScript': FaJs,
  'TypeScript': FaJs,
  'MySQL': FaDatabase,
  'MongoDB': FaDatabase,
  'Git': FaGit,
  'Docker': FaDocker,
  'Figma': FaFigma,
  'Vite': FaNode,
};

const Skills = () => {
  const allSkills = [...skills.languages, ...skills.frameworks, ...skills.tools, ...skills.databases];

  return (
    <section id="skills" className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
          {allSkills.map((skill, index) => {
            const Icon = iconMap[skill];
            return (
              <motion.div
                key={`${skill}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-secondary p-6 rounded-xl text-center hover:shadow-lg hover:shadow-accent/20 transition-all hover:-translate-y-1"
              >
                {Icon && <Icon className="text-4xl mx-auto mb-2 text-accent" />}
                <p className="text-sm text-dimText">{skill}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
