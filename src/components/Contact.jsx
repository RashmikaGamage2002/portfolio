// src/components/Contact.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { personalInfo } from '../data/data';
import AnimatedHeading from './AnimatedHeading';
import { fadeUp, lineReveal, hoverLift, sectionTransition, sectionTransitionDelayed, staggerContainer } from '../animationVariants';

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('Thanks for your message! I will reply shortly.');
    event.currentTarget.reset();
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-primary py-24 sm:py-32">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-accent/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        
        {/* Section Header with Split Letter Animation */}
        <div className="mb-14 text-center">
          <AnimatedHeading
            subtitle="Get in touch"
            direction="split"
            fromLeftText="Let's Work"
            fromRightText="Together"
            className="mb-4"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={lineReveal}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.77, 0, 0.18, 1] }}
            className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-accent"
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          transition={{ delayChildren: 0.12, staggerChildren: 0.08 }}
          className="grid gap-8 lg:grid-cols-2"
        >
          {/* Left Side - Contact Info */}
          <motion.div variants={fadeUp} transition={sectionTransition} className="space-y-10 text-gray-300">
            <motion.p variants={fadeUp} transition={sectionTransition} className="max-w-xl text-lg leading-8">
              Have a project, a role, or just want to say hi? Drop a message and I'll get back to you as soon as I can.
            </motion.p>

            <motion.div variants={fadeUp} transition={sectionTransitionDelayed} className="space-y-2">
              <div className="flex items-center gap-6 text-gray-300">
                <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-accent/10 text-accent">
                  <FaEnvelope />
                </div>
                <span className="text-white">{personalInfo.email}</span>
              </div>
            
              <div className="flex items-center gap-6 text-gray-300">
                <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-accent/10 text-accent">
                  <FaMapMarkerAlt />
                </div>
                <span className="text-white">{personalInfo.location}</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ ...sectionTransition, delay: 0.25 }} className="flex items-center gap-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-accent/30 hover:text-accent"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-accent/30 hover:text-accent"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-accent/30 hover:text-accent"
              >
                <AiFillInstagram />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.77, 0, 0.18, 1], delay: 0.25 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Name</p>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className="w-full rounded-3xl border border-white/10 bg-primary/90 px-4 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-accent/50"
                  />
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Email</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-3xl border border-white/10 bg-primary/90 px-4 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-accent/50"
                  />
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Subject</p>
                <input
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  required
                  className="w-full rounded-3xl border border-white/10 bg-primary/90 px-4 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-accent/50"
                />
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Message</p>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell me a bit about your project or idea..."
                  required
                  className="w-full rounded-[1.75rem] border border-white/10 bg-primary/90 px-4 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-accent/50 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full rounded-full bg-accent px-6 py-4 text-sm font-semibold text-primary transition hover:bg-blue-400"
                whileHover={hoverLift}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>

              {status && (
                <div className="rounded-3xl border border-accent/20 bg-accent/10 px-5 py-4 text-sm text-accent">
                  {status}
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;