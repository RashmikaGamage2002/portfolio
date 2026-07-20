import { motion } from 'framer-motion';
import { projects } from '../data/data';

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-primary rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <div className="text-accent text-sm">Featured</div>
                </div>
                <p className="text-dimText leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-white/10 text-sm text-lightText">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  <a href={project.github} target="_blank" rel="noreferrer" className="text-accent hover:text-lightText">
                    GitHub
                  </a>
                  <a href={project.live} target="_blank" rel="noreferrer" className="text-accent hover:text-lightText">
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
