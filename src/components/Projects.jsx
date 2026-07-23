import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFigma } from 'react-icons/fa';
import { projects } from '../data/data';

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-accent">My Works</p>
          <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Featured Projects</h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-accent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-cardBg rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-56">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Overlay Links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-lightText/10 backdrop-blur-md rounded-full hover:bg-accent transition-colors"
                      whileHover={{ scale: 1.1 }}
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
                    >
                      <FaExternalLinkAlt className="text-2xl text-primary" />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-lightText mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-dimText text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.figma && (
                  <motion.a
                    href={project.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#A259FF]/10 text-[#A259FF] rounded-lg hover:bg-[#A259FF]/20 transition-colors text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;