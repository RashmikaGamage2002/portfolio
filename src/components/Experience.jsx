// src/components/Experience.jsx
import { motion } from 'framer-motion';
import { experience } from '../data/data';
import AnimatedHeading from './AnimatedHeading';
import { fadeUp, cardReveal, staggerContainer, lineReveal, sectionTransition } from '../animationVariants';

const Experience = () => {
  const ACCENT = '#00BFFF';

  return (
    <section id="experience" className="py-24 sm:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="mb-14 text-center">
          <AnimatedHeading
            subtitle="Career Journey"
            direction="split"
            fromLeftText="Experience &"
            fromRightText="Achievements"
            className="mb-4"
          />
        </div>

        {/* Timeline */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={staggerContainer} transition={{ delayChildren: 0.08, staggerChildren: 0.08 }} className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/10" />
          
          {experience.map((item, index) => (
            <motion.div
              key={item.company}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.77, 0, 0.18, 1] }}
              className={`relative mb-12 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"
              } pl-12 md:pl-0`}
            >
              <span
                className="absolute left-4 md:left-auto top-6 h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-secondary"
                style={{
                  background: ACCENT,
                  ...(index % 2 === 0 
                    ? { right: "-6px", left: "auto" } 
                    : { left: "-6px" }
                  ),
                }}
              />
              
              <motion.div 
                className="rounded-2xl border border-white/5 bg-primary/30 backdrop-blur-sm p-6 hover:border-accent/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/5"
                whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.3, ease: [0.77, 0, 0.18, 1] } }}
              >
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
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;