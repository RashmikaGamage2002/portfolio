import { motion } from 'framer-motion';
import { certifications } from '../data/data';

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 sm:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Section Header - Consistent with others */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-accent">Credentials</p>
          <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Certifications</h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-accent" />
          
        </motion.div>

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