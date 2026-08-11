import { motion } from 'framer-motion';
import { personalInfo } from '../data/data';
import { FaBirthdayCake, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';
import AnimatedHeading from './AnimatedHeading';
import { fadeUp, lineReveal, cardReveal, staggerContainer, sectionTransition } from '../animationVariants';

const About = () => {
  return (
    <section id="about" className="relative min-h-screen py-20 overflow-hidden">
      {/* ─── Background Layer (Desktop Only) ─────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden md:block">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/about-bg.png')`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0 "></div>
      </div>

      {/* Content - positioned on top of background */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          transition={{ delayChildren: 0.08, staggerChildren: 0.07 }}
          className="px-4 md:pl-[10px] md:pr-[60px]"
        >
          {/* Heading */}
          <AnimatedHeading
            subtitle="Who I Am"
            direction="split"
            fromLeftText="About"
            fromRightText="Me"
            className="mb-4"
            align="mobile-center"
          />

          <motion.div variants={lineReveal} transition={{ duration: 0.7, delay: 0.2, ease: [0.77, 0, 0.18, 1] }} className="w-16 h-1 bg-accent rounded-full mx-auto md:mx-0 mb-8"></motion.div>

          {/* Mobile 3D Circle Image */}
          <motion.div
            className="md:hidden flex justify-center mb-10 w-full pt-4"
            variants={fadeUp}
            style={{ perspective: '1200px' }}
          >
            <motion.div
              className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{
                rotateX: [8, -8, 8],
                rotateY: [-12, 12, -12],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Halo / Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-accent/40"
                style={{ translateZ: -20 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0,191,255,0.1)',
                    '0 0 40px rgba(0,191,255,0.4)',
                    '0 0 20px rgba(0,191,255,0.1)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Actual Image */}
              <motion.img
                src="/about-bg2.png"
                alt="About"
                className="w-full h-full rounded-full object-cover object-center border-2 border-primary shadow-xl"
                style={{ translateZ: 20 }}
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="space-y-6 text-lightText/90 text-base md:text-lg leading-relaxed text-left max-w-3xl">
            <motion.p variants={fadeUp} transition={sectionTransition} className="text-xl font-semibold text-lightText">
              {personalInfo.name} is a passionate Software Engineering student with a growing career in full-stack development, UI/UX design, and digital problem-solving.
            </motion.p>

            <p>
              My journey into software development began with a fascination for technology and its power to solve real-world problems.
              I am currently pursuing a BSc (Hons) in Software Engineering at NSBM, where I've built a strong foundation in algorithms,
              system design, and modern development practices.
            </p>

            <motion.p variants={fadeUp} transition={{ ...sectionTransition, delay: 0.16 }}>
              Over the past few years, I have developed a diverse skill set, specializing in frontend technologies like React and
              Tailwind CSS, while also gaining practical experience in backend development with Node.js and Java. My projects, such
              as a real-time auction web system and a complete UI/UX redesign for the ETA Sri Lanka website, demonstrate my ability
              to apply technical craft to create intuitive and impactful digital experiences.
            </motion.p>

            <motion.div variants={cardReveal} transition={{ ...sectionTransition, delay: 0.2 }} className="my-8 p-6 bg-primary/40 backdrop-blur-md border-l-4 border-accent rounded-r-xl">
              <p className="italic text-lightText">
                "Since 2024, I've been actively shaping my professional identity through internships, personal projects, and
                continuous learning, aiming to evolve into a well-rounded software engineer who bridges the gap between
                technical innovation and user-centric design."
              </p>
            </motion.div>

            <motion.p variants={fadeUp} transition={{ ...sectionTransition, delay: 0.24 }}>
              Currently, I am pursuing my BSc (Hons) in Software Engineering at NSBM Green University, continuously refining my skills through academic work, personal projects, and hands-on exploration. My focus lies at the intersection of frontend development and UI/UX design, where I aim to create modern, accessible, and engaging digital experiences while growing into a well-rounded software engineer.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;