import { motion } from 'framer-motion';
import { personalInfo } from '../data/data';

const About = () => {
  return (
    <section id="about" className="min-h-screen py-12 sm:py-20 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 text-center">
            About Me
          </h2>

          <div className="w-16 h-1 bg-accent rounded-full mb-6 sm:mb-8 mx-auto"></div>

          {/* Centered Image */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-2xl"></div>
              <img 
                src="/about-bg.png" 
                alt="Rashmika Gamage"
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] rounded-2xl object-cover shadow-2xl shadow-accent/10 border-2 border-accent/20"
              />
            </div>
          </div>

          {/* Stacked paragraphs centered */}
          <div className="space-y-6 text-lightText/90 text-sm sm:text-base md:text-lg leading-relaxed text-center">
            <p className="text-base sm:text-xl font-semibold text-white">
              {personalInfo.name} is a passionate Software Engineering student with a growing career in full-stack development, UI/UX design, and digital problem-solving.
            </p>

            <p>
              My journey into software development began with a fascination for technology and its power to solve real-world problems. 
              I am currently pursuing a BSc (Hons) in Software Engineering at NSBM, where I've built a strong foundation in algorithms, 
              system design, and modern development practices.
            </p>

            <p>
              Over the past few years, I have developed a diverse skill set, specializing in frontend technologies like React and 
              Tailwind CSS, while also gaining practical experience in backend development with Node.js and Java. My projects, such 
              as a real-time auction web system and a complete UI/UX redesign for the ETA Sri Lanka website, demonstrate my ability 
              to apply technical craft to create intuitive and impactful digital experiences.
            </p>

            <div className="my-4 sm:my-6 p-4 sm:p-6 bg-primary/50 backdrop-blur-sm border-l-4 border-accent rounded-r-xl mx-auto">
              <p className="italic text-white/80 text-sm sm:text-base">
                "Since 2024, I've been actively shaping my professional identity through internships, personal projects, and 
                continuous learning, aiming to evolve into a well-rounded software engineer who bridges the gap between 
                technical innovation and user-centric design."
              </p>
            </div>

            <p>
              Currently, I am honing my skills as a Frontend Developer at Daraz, where I collaborate with cross-functional teams to 
              improve user interfaces and deliver high-quality features. Alongside my work, I am exploring the intersection of design 
              and development, with a focus on creating accessible and engaging web applications.
            </p>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10 flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-dimText justify-center">
              <span><span className="font-semibold text-white">🎂 Born:</span> 24 March 2002</span>
              <span><span className="font-semibold text-white">📍 Location:</span> {personalInfo.location}</span>
              <span><span className="font-semibold text-white">🎓 Education:</span> {personalInfo.education}</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;