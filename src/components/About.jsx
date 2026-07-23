import { motion } from 'framer-motion';
import { personalInfo } from '../data/data';
import { FaBirthdayCake, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="relative min-h-screen py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/about-bg.png')`,
          backgroundAttachment: 'fixed' // Optional: parallax effect
        }}
      >
        {/* Dark Overlay - adjust opacity as needed */}
        <div className="absolute inset-0 bg-primary/10 "></div>
      </div>

      {/* Content - positioned on top of background */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pl-[10px] pr-[60px]"
        >
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-lightText mb-2 text-left">
            About Me
          </h2>
          
          <div className="w-16 h-1 bg-accent rounded-full mb-8"></div>

          {/* Content */}
          <div className="space-y-6 text-lightText/90 text-base md:text-lg leading-relaxed text-left max-w-3xl">
            <p className="text-xl font-semibold text-lightText">
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

            <div className="my-8 p-6 bg-primary/40 backdrop-blur-md border-l-4 border-accent rounded-r-xl">
              <p className="italic text-lightText">
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

            <div className="mt-8 pt-6 border-t border-primary/50 flex flex-wrap gap-x-6 gap-y-2 text-sm text-dimText text-left">
              <span>
               <FaBirthdayCake className="inline text-accent mr-2" /> 
               <span className="font-semibold text-lightText">Born:</span> 24 March 2002
              </span>
              <span>
               <FaMapMarkerAlt className="inline text-accent mr-2" /> 
               <span className="font-semibold text-lightText">Location:</span> {personalInfo.location}
              </span>
              <span>
               <FaGraduationCap className="inline text-accent mr-2" /> 
               <span className="font-semibold text-lightText">Education:</span> {personalInfo.education}
              </span>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;