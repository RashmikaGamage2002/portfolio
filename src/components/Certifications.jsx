import { motion } from 'framer-motion';
import { certifications } from '../data/data';

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Certifications</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <motion.a
              key={cert.name}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="block bg-primary p-8 rounded-3xl shadow-2xl border border-white/10 hover:border-accent transition-all"
            >
              <h3 className="text-2xl font-semibold mb-2">{cert.name}</h3>
              <p className="text-dimText">Issued by {cert.issuer}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
