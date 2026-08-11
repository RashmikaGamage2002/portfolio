
import { motion } from 'framer-motion';
import { certifications } from '../data/data';
import AnimatedHeading from './AnimatedHeading';
import { cardReveal, staggerContainer } from '../animationVariants';

const blobVariants = {
  floatA: { x: [0, -35, 25, 0], y: [0, 30, -20, 0], transition: { duration: 17, repeat: Infinity, ease: 'easeInOut' } },
  floatB: { x: [0, 30, -25, 0], y: [0, -25, 20, 0], transition: { duration: 21, repeat: Infinity, ease: 'easeInOut' } },
};

const Certifications = () => {
  return (
    <section id="certifications" className="relative overflow-hidden py-24 sm:py-32 bg-primary border-t border-white/5">


      <motion.div className="pointer-events-none absolute top-10 -right-20 h-96 w-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,191,255,0.30) 0%, transparent 70%)', filter: 'blur(80px)' }}
        variants={blobVariants} animate="floatA" />
      <motion.div className="pointer-events-none absolute bottom-10 -left-20 h-80 w-80 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.28) 0%, transparent 70%)', filter: 'blur(70px)' }}
        variants={blobVariants} animate="floatB" />
      <motion.div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,153,204,0.25) 0%, transparent 70%)', filter: 'blur(70px)' }}
        animate={{ x: [0, 20, -30, 0], y: [0, -25, 30, 0], transition: { duration: 19, repeat: Infinity, ease: 'easeInOut' } }} />


      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,191,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        animate={{ backgroundPosition: ['60px 60px', '0px 0px'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 max-w-6xl">


        <div className="mb-14 text-center">
          <AnimatedHeading
            subtitle="Professional Growth"
            direction="split"
            fromLeftText="My"
            fromRightText="Certifications"
            className="mb-4"
          />

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.77, 0, 0.18, 1] }}
            className="mx-auto mt-4 h-px w-32 origin-center bg-gradient-to-r from-transparent via-accent to-transparent"
          />
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.name}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              variants={cardReveal}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.77, 0, 0.18, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative block bg-primary/60 p-6 rounded-2xl border border-white/5 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 overflow-hidden"
            >

              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"
                style={{ background: 'linear-gradient(110deg, transparent 40%, rgba(0,191,255,0.18) 50%, transparent 60%)' }} />


              <motion.span
                className="absolute top-3 right-3 h-2 w-2 rounded-full bg-accent opacity-0 group-hover:opacity-100"
                style={{ boxShadow: '0 0 10px rgba(0,191,255,0.9)' }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />

              <h3 className="relative text-lg font-medium text-lightText group-hover:text-accent transition-colors">
                {cert.name}
              </h3>
              <p className="relative text-sm font-light text-dimText mt-1">
                Issued by {cert.issuer}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;