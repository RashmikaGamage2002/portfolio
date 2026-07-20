import { motion } from 'framer-motion';
import { personalInfo } from '../data/data';

const About = () => {
  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative">
            <img src="/profile.png" alt="Profile" className="rounded-2xl w-full max-w-md mx-auto shadow-2xl" />
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <p className="text-dimText text-lg leading-relaxed mb-6">{personalInfo.about}</p>
            <div className="space-y-2 text-dimText">
              <p><span className="text-accent">📍</span> {personalInfo.location}</p>
              <p><span className="text-accent">🎓</span> {personalInfo.education}</p>
              <p><span className="text-accent">📧</span> {personalInfo.email}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
