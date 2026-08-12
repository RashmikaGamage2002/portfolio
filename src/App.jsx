
import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import Loader from './components/Loader';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import GitHubStats from './components/GitHubStats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Cursor from './components/cursor';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };


  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  return (
    <div className="bg-primary">

      {isLoading && <Loader onComplete={handleLoaderComplete} />}


      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-accent z-[9999]"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: '0% 0%',
          opacity: isLoading ? 0 : 1,
        }}
      />


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <cursor />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />

        <Contact />
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;