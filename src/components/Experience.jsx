import { motion } from 'framer-motion';
import { experience } from '../data/data';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Experience</h2>
        <div className="space-y-8 max-w-4xl mx-auto">
          {experience.map((item, index) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-secondary p-8 rounded-3xl shadow-2xl border border-white/10"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">{item.role}</h3>
                  <p className="text-accent">{item.company}</p>
                </div>
                <span className="text-dimText">{item.period}</span>
              </div>
              <p className="mt-4 text-dimText leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
