// src/components/Contact.jsx
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { personalInfo } from '../data/data';
import AnimatedHeading from './AnimatedHeading';
import { fadeUp, lineReveal, hoverLift, sectionTransition, sectionTransitionDelayed, staggerContainer } from '../animationVariants';

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ─── YOUR WHATSAPP NUMBER ──────────────────────────────────────────────────
  // Format: Country code + phone number (no +, no spaces, no dashes)
  const YOUR_PHONE_NUMBER = '94728824504'; // ⭐ Sri Lanka: 94 72 8824504

  const handleSubmit = (event) => {
    event.preventDefault();

    // ─── Get form data ──────────────────────────────────────────────────────
    const form = formRef.current;
    if (!form) return;

    const name = form.from_name.value.trim();
    const message = form.message.value.trim();

    if (!name || !message) {
      setStatus('❌ Please fill in both Name and Message fields.');
      return;
    }

    setIsLoading(true);
    setStatus('');

    // ─── Build WhatsApp message ─────────────────────────────────────────────
    // %0A = line break, %20 = space, %2C = comma
    const whatsappMessage = `Name: ${name}%0A%0A${message}`;

    // ─── Create WhatsApp URL ────────────────────────────────────────────────
    const url = `https://wa.me/${YOUR_PHONE_NUMBER}?text=${whatsappMessage}`;

    // ─── Redirect to WhatsApp ──────────────────────────────────────────────
    window.open(url, '_blank');

    // ─── Reset form and show success ──────────────────────────────────────
    form.reset();
    setStatus('✅ Redirecting to WhatsApp...');
    setIsLoading(false);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-primary py-24 sm:py-32 border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-70" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 max-w-4xl h-[4px] bg-accent/40 blur-md pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6">

        {/* ─── HEADER ────────────────────────────────────────────────────────── */}
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

        {/* ─── CONTENT ────────────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          transition={{ delayChildren: 0.12, staggerChildren: 0.08 }}
          className="grid gap-8 lg:grid-cols-2"
        >

          {/* ─── LEFT: Contact Info ──────────────────────────────────────────── */}
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

          {/* ─── RIGHT: Form ──────────────────────────────────────────────────── */}
          <motion.div
            className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-[0_40px_120px_rgba(0,0,0,0.35)]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.77, 0, 0.18, 1], delay: 0.25 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Name</p>
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Your name"
                    required
                    className="w-full rounded-3xl border border-white/10 bg-primary/90 px-4 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-accent/50 focus:shadow-[0_0_18px_rgba(0,191,255,0.35)] focus:bg-primary/70"
                  />
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Email</p>
                  <input
                    type="email"
                    name="reply_to"
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
                  name="subject"
                  placeholder="What's this about?"
                  required
                  className="w-full rounded-3xl border border-white/10 bg-primary/90 px-4 py-4 text-white placeholder:text-gray-500 outline-none transition focus:border-accent/50 focus:shadow-[0_0_18px_rgba(0,191,255,0.35)] focus:bg-primary/70"
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
                disabled={isLoading}
                className="w-full rounded-full bg-accent px-6 py-4 text-sm font-semibold text-primary transition hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isLoading ? hoverLift : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? 'Redirecting...' : 'Send Message'}
              </motion.button>

              {status && (
                <div className={`rounded-3xl border px-5 py-4 text-sm ${
                  status.includes('successfully') || status.includes('Redirecting')
                    ? 'border-green-500/20 bg-green-500/10 text-green-400'
                    : 'border-red-500/20 bg-red-500/10 text-red-400'
                }`}>
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