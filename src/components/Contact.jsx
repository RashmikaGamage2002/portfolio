// src/components/Contact.jsx
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { personalInfo } from '../data/data';
import AnimatedHeading from './AnimatedHeading';
import { fadeUp, lineReveal, hoverLift, sectionTransition, sectionTransitionDelayed, staggerContainer } from '../animationVariants';

const blobVariants = {
  floatA: { x: [0, 35, -25, 0], y: [0, -30, 20, 0], transition: { duration: 15, repeat: Infinity, ease: 'easeInOut' } },
  floatB: { x: [0, -30, 25, 0], y: [0, 25, -20, 0], transition: { duration: 19, repeat: Infinity, ease: 'easeInOut' } },
};

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const SERVICE_ID = 'service_jc43ddf';
  const TEMPLATE_ID = 'template_vfiijuj';
  const PUBLIC_KEY = '3s1wb0RijuExFxaBt';

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formRef.current) return;

    setIsLoading(true);
    setStatus('');

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus('✅ Message sent successfully! I\'ll get back to you soon.');
        event.target.reset();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setStatus('❌ Something went wrong. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-primary py-24 sm:py-32 border-t border-white/5">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-accent/10 to-transparent blur-3xl" />

      {/* Animated floating blobs */}
      <motion.div className="pointer-events-none absolute top-20 -left-20 h-96 w-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,191,255,0.30) 0%, transparent 70%)', filter: 'blur(80px)' }}
        variants={blobVariants} animate="floatA" />
      <motion.div className="pointer-events-none absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)', filter: 'blur(90px)' }}
        variants={blobVariants} animate="floatB" />
      <motion.div className="pointer-events-none absolute top-1/3 left-1/3 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,153,204,0.28) 0%, transparent 70%)', filter: 'blur(70px)' }}
        animate={{ x: [0, 25, -25, 0], y: [0, -20, 30, 0], transition: { duration: 17, repeat: Infinity, ease: 'easeInOut' } }} />

      {/* Animated grid overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,191,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
        animate={{ backgroundPosition: ['0px 0px', '60px 60px'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />

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
              <motion.a
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="group/social flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-accent/60 hover:text-accent"
              >
                <span className="absolute" />
                <FaGithub />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-accent/60 hover:text-accent"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition hover:border-accent/60 hover:text-accent"
              >
                <AiFillInstagram />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            className="relative rounded-[2rem] p-[1px] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.35)]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.77, 0, 0.18, 1], delay: 0.25 }}
          >
            {/* Rotating animated border */}
            <motion.div
              className="absolute inset-0 rounded-[2rem]"
              style={{
                background: 'conic-gradient(from 0deg, rgba(0,191,255,0.6), rgba(37,99,235,0.3), rgba(0,153,204,0.6), rgba(0,191,255,0.6))',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Name</p>
                  <input
                    type="text"
                    name="from_name" // ⭐ Changed to match EmailJS template variable
                    placeholder="Your name"
                    required
                    className="w-full rounded-3xl border border-white/10 bg-primary/90 px-4 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-accent/50 focus:shadow-[0_0_18px_rgba(0,191,255,0.35)] focus:bg-primary/70"
                  />
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Email</p>
                  <input
                    type="email"
                    name="reply_to" // ⭐ Changed to match EmailJS template variable
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-3xl border border-white/10 bg-primary/90 px-4 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-accent/50 focus:shadow-[0_0_18px_rgba(0,191,255,0.35)] focus:bg-primary/70"
                  />
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Subject</p>
                <input
                  type="text"
                  name="subject" // ⭐ Matches EmailJS template variable
                  placeholder="What's this about?"
                  required
                  className="w-full rounded-3xl border border-white/10 bg-primary/90 px-4 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-accent/50 focus:shadow-[0_0_18px_rgba(0,191,255,0.35)] focus:bg-primary/70"
                />
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Message</p>
                <textarea
                  name="message" // ⭐ Matches EmailJS template variable
                  rows="6"
                  placeholder="Tell me a bit about your project or idea..."
                  required
                  className="w-full rounded-[1.75rem] border border-white/10 bg-primary/90 px-4 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-accent/50 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full bg-accent px-6 py-4 text-sm font-semibold text-primary transition hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isLoading ? hoverLift : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </motion.button>

              {status && (
                <div className={`rounded-3xl border px-5 py-4 text-sm ${status.includes('successfully')
                  ? 'border-green-500/20 bg-green-500/10 text-green-400'
                  : 'border-red-500/20 bg-red-500/10 text-red-400'
                  }`}>
                  {status}
                </div>
              )}
            </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;