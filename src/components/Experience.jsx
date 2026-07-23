import { motion } from 'framer-motion';
import { experience } from '../data/data';

const Experience = () => {
  const ACCENT = '#00BFFF';

  return (
    <section id="experience" className="py-24 sm:py-32 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          
          <h2 className="text-4xl md:text-5xl font-bold text-lightText mb-2">
            Experience
          </h2>
          <p className="text-dimText font-light mt-3 max-w-xl mx-auto">
            My professional journey and the impact I've made
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/10" />
          
          {experience.map((item, index) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-12 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"
              } pl-12 md:pl-0`}
            >
              {/* Timeline Dot */}
              <span
                className="absolute left-4 md:left-auto top-6 h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-primary"
                style={{
                  background: ACCENT,
                  ...(index % 2 === 0 
                    ? { right: "-6px", left: "auto" } 
                    : { left: "-6px" }
                  ),
                }}
              />
              
              {/* Card */}
              <div className="rounded-2xl border border-white/5 bg-secondary/50 backdrop-blur-sm p-6 hover:border-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-lightText">
                    {item.company}
                  </h3>
                  <span className="text-xs font-light tracking-wider text-dimText">
                    {item.period}
                  </span>
                </div>
                
                <p className="mt-1 text-sm font-medium" style={{ color: ACCENT }}>
                  {item.role}
                </p>
                
                <p className="mt-3 text-sm font-light leading-relaxed text-dimText">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;