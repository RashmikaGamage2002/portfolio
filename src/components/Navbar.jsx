import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  const NAV_LINKS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  // Handle scroll effect
  useEffect(() => {
    let frameId = null;

    const onScroll = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30);
        frameId = null;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  // Handle active section detection with IntersectionObserver
  useEffect(() => {
    const observers = [];
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        {/* Desktop Navigation */}
        <nav
          className={`hidden md:flex items-center gap-1 rounded-full border px-5 py-4 transition-all duration-300 ${
            scrolled
              ? 'border-white/15 bg-primary/80 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(0,191,255,0.25)]'
              : 'border-white/10 bg-white/[0.03] backdrop-blur-md'
          }`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative px-4 py-1.5 text-sm font-medium text-white-400 transition-colors hover:text-accent"
              >
                <span className={isActive ? 'text-accent' : ''}>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ 
                      background: 'rgba(0, 191, 255, 0.04)', 
                      border: '1px solid rgba(0,191,255,0.35)' 
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Bar */}
        <div className="md:hidden flex w-full items-center justify-between rounded-full border border-white/10 bg-primary/60 backdrop-blur-xl px-4 py-3">
          <span className="text-sm font-semibold tracking-wide text-white">
            Rashmika<span className="text-accent">.</span>
          </span>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="text-white hover:text-accent transition-colors"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer - Slides from Right */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-40 w-72 border-l border-white/10 bg-primary/95 backdrop-blur-xl p-8 pt-24 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className={`w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors ${
                      active === link.id 
                        ? 'text-white bg-white/5' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;