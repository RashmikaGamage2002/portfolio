// src/components/Certifications.jsx
import { motion } from 'framer-motion';
import { certifications } from '../data/data';
import AnimatedHeading from './AnimatedHeading';
import { fadeUp, cardReveal, staggerContainer, lineReveal, sectionTransition } from '../animationVariants';

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 sm:py-32 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Section Header */}
        <div className="mb-14 text-center">
          <AnimatedHeading
            subtitle="Professional Growth"
            direction="split"
            fromLeftText="My"
            fromRightText="Certifications"
            className="mb-4"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.name}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group block bg-primary/50 p-6 rounded-2xl border border-white/5 hover:border-accent/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
            >
              <h3 className="text-lg font-medium text-lightText group-hover:text-accent transition-colors">
                {cert.name}
              </h3>
              <p className="text-sm font-light text-dimText mt-1">
                Issued by {cert.issuer}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;