import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { fadeUp, fadeIn, hoverLift, staggerContainer } from '../animationVariants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
const heroOverlayImg = '/assets/hero-video/hero-image/hero.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const circleRef = useRef(null);
  const bgTextRef = useRef(null);
  const topLayerRef = useRef(null);

  // Cinematic Reveal Refs
  const revealCanvasRef = useRef(null);
  const revealMaskCanvasRef = useRef(null);
  const heroOverlayObj = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  // 1. Preload Images objects
  const imagesRef = useRef([]);
  // Track current frame to avoid redundant renders
  const currentFrameRef = useRef({ index: 0 });

  // 1. Preload Frames
  useEffect(() => {
    const frameCount = 196;
    let loadedCount = 0;
    const images = new Array(frameCount);

    for (let i = 1; i <= frameCount; i++) {
      const num = String(i).padStart(3, '0');
      const img = new Image();
      img.src = `/src/assets/hero-video/ezgif-frame-${num}.png`;

      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setIsLoaded(true);
        }
      };

      images[i - 1] = img;
    }

    imagesRef.current = images;

    const overlayImg = new Image();
    overlayImg.src = heroOverlayImg;
    overlayImg.onload = () => { heroOverlayObj.current = overlayImg; };
    revealMaskCanvasRef.current = document.createElement('canvas');
  }, []);

  // 2. Canvas Rendering Logic – LEFT ALIGNED, HEIGHT FIXED
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: false });
    const img = imagesRef.current[index];

    if (!img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    context.clearRect(0, 0, canvasWidth, canvasHeight);

    // ⭐ LEFT ALIGNED: Height fixed to canvas, width auto
    const scale = canvasHeight / img.height;
    const x = 0; // Align to left edge
    const y = 0; // Align to top

    context.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    if (revealCanvasRef.current) {
      revealCanvasRef.current.width = window.innerWidth * dpr;
      revealCanvasRef.current.height = window.innerHeight * dpr;
    }
    if (revealMaskCanvasRef.current) {
      revealMaskCanvasRef.current.width = window.innerWidth * dpr;
      revealMaskCanvasRef.current.height = window.innerHeight * dpr;
      const maskCtx = revealMaskCanvasRef.current.getContext('2d');
      if (maskCtx) {
        maskCtx.fillStyle = 'black';
        maskCtx.fillRect(0, 0, window.innerWidth * dpr, window.innerHeight * dpr);
      }
    }

    renderFrame(currentFrameRef.current.index);
  };

  // 3. GSAP Scroll Animation
  useGSAP(() => {
    if (!preloaderComplete) {
      document.body.style.overflow = 'hidden';
    }

    if (!isLoaded) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setPreloaderComplete(true);
        document.body.style.overflow = '';
      }
    });

    tl.to('.preloader-panel', {
      yPercent: 100,
      duration: 1.8,
      stagger: 0.12,
      ease: 'power4.inOut'
    })
      .fromTo('.hero-title',
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=1'
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo('.hero-cta',
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.8'
      );

    handleResize();
    window.addEventListener('resize', handleResize);

    const frameCount = 196;

    // Canvas Image Sequence Scrub
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const frameIndex = Math.floor(self.progress * (frameCount - 1));
        if (frameIndex !== currentFrameRef.current.index) {
          currentFrameRef.current.index = frameIndex;
          requestAnimationFrame(() => renderFrame(frameIndex));
        }
      }
    });

    // Circle scale-in animation
    gsap.fromTo(circleRef.current,
      { scale: 0.9 },
      { scale: 1, duration: 1.2, ease: 'power3.out' }
    );

    // ─── CINEMATIC LIGHT REVEAL LOOP ──────────────────────────────────────
    const renderReveal = () => {
      if (!revealCanvasRef.current || !revealMaskCanvasRef.current || !heroOverlayObj.current) return;

      const canvas = revealCanvasRef.current;
      const maskCanvas = revealMaskCanvasRef.current;
      const ctx = canvas.getContext('2d', { alpha: true });
      const maskCtx = maskCanvas.getContext('2d', { alpha: true });

      const w = canvas.width;
      const h = canvas.height;

      if (!ctx || !maskCtx || w === 0 || h === 0) return;

      if (currentFrameRef.current.index < 235) {
        if (mouseRef.current.isActive) {
          ctx.clearRect(0, 0, w, h);
          maskCtx.globalCompositeOperation = 'source-over';
          maskCtx.fillStyle = 'black';
          maskCtx.fillRect(0, 0, w, h);
          mouseRef.current.isActive = false;
        }
        return;
      }

      mouseRef.current.isActive = true;

      maskCtx.globalCompositeOperation = 'source-over';
      maskCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      maskCtx.fillRect(0, 0, w, h);

      const { x, y } = mouseRef.current;
      if (x >= 0 && y >= 0) {
        maskCtx.globalCompositeOperation = 'destination-out';
        const radius = 250;
        const gradient = maskCtx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        maskCtx.fillStyle = gradient;
        maskCtx.beginPath();
        maskCtx.arc(x, y, radius, 0, Math.PI * 2);
        maskCtx.fill();
      }

      ctx.clearRect(0, 0, w, h);

      const img = heroOverlayObj.current;
      const scale = w / img.width;
      const imgY = (h / 2) - (img.height / 2) * scale;

      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(img, 0, imgY, img.width * scale, img.height * scale);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.drawImage(maskCanvas, 0, 0);
    };

    gsap.ticker.add(renderReveal);

    const handleMouseMove = (e) => {
      const dpr = window.devicePixelRatio || 1;
      mouseRef.current.x = e.clientX * dpr;
      mouseRef.current.y = e.clientY * dpr;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const stickyViewport = containerRef.current.querySelector('.sticky');
    if (stickyViewport) {
      stickyViewport.addEventListener('mousemove', handleMouseMove);
      stickyViewport.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      gsap.ticker.remove(renderReveal);
      if (stickyViewport) {
        stickyViewport.removeEventListener('mousemove', handleMouseMove);
        stickyViewport.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, { scope: containerRef, dependencies: [isLoaded] });

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-black">

      {/* Premium GSAP 6-Panel Preloader */}
      {!preloaderComplete && (
        <div className="fixed inset-0 z-[200] flex w-full h-screen pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="preloader-panel h-full bg-[#1a1a1a] border-r border-[#222]"
              style={{ width: '16.666667%' }}
            />
          ))}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-white z-10 text-sm font-medium tracking-widest uppercase opacity-50">
              {loadingProgress}%
            </div>
          )}
        </div>
      )}

      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ⭐ LEFT ALIGNED Canvas Background */}
        <div className="absolute inset-0 flex">
          <canvas
            ref={canvasRef}
            className="h-full object-contain origin-left"
            style={{
              width: 'auto',
              height: '100%',
              maxWidth: '70%', // Adjust this value to control how much space the image takes
            }}
          />
        </div>

        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-primary/80 pointer-events-none z-[1]" />

        {/* Cinematic Reveal Canvas */}
        <canvas
          ref={revealCanvasRef}
          className="absolute inset-0 h-full w-full pointer-events-none z-[2] hidden md:block"
        />

        {/* ⭐ CONTENT OVERLAY – RIGHT ALIGNED */}
        <div className="absolute inset-0 flex items-center justify-end z-10 px-8 md:px-16 lg:px-24">
          <div className="max-w-2xl text-right">

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-[12px] uppercase tracking-[0.4em] text-gray-400 mb-4"
            >
              Hi, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight"
            >
              Rashmika
              <br />
              <span className="text-accent">Gamage</span>
            </motion.h1>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-4"
            >
              <span className="text-base sm:text-lg md:text-xl font-light text-gray-300">
                I'm a
              </span>
              <span className="text-base sm:text-lg md:text-xl font-semibold text-accent ml-2">
                Frontend Developer
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-6 max-w-xl ml-auto text-sm sm:text-base font-light leading-relaxed text-gray-300"
            >
              Passionate Software Engineering student with hands-on experience in
              building full-stack applications and creating intuitive user experiences.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-end"
            >
              <motion.a
                href="/Resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-9 py-4 text-sm font-semibold text-primary shadow-[0_20px_60px_rgba(0,191,255,0.28)] transition-all hover:bg-blue-400"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaDownload className="w-4 h-4" />
                Download CV
              </motion.a>

              <motion.a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-9 py-4 text-sm font-medium text-white transition-all hover:border-accent/30 hover:text-accent"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View My Work
              </motion.a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex justify-end gap-6 mt-10"
            >
              {[
                { icon: FaGithub, link: 'https://github.com/RashmikaGamage2002' },
                { icon: FaLinkedin, link: 'https://www.linkedin.com/in/rashmika-gamage-b6979b29a' },
                { icon: AiFillInstagram, link: 'https://www.instagram.com/rashmika_gamagee/?hl=en' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-accent/30 hover:text-accent"
                  whileHover={{ y: -4 }}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex justify-end mt-12"
            >
              <a href="#about" className="flex flex-col items-center gap-1 text-gray-400 hover:text-accent transition-colors">
                <span className="text-[10px] tracking-[0.2em] uppercase font-light">Scroll</span>
                <MdOutlineKeyboardArrowDown className="text-xl" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Red Circle Design Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
          <div
            ref={circleRef}
            className="absolute rounded-full border border-[rgba(0,191,255,0.15)] h-[320px] w-[320px] md:h-[500px] md:w-[500px] lg:h-[650px] lg:w-[650px]"
            style={{ borderWidth: '1px' }}
          />
        </div>

        {/* Creative Bold Background Text (Second Layer) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
          <h1
            ref={bgTextRef}
            className="text-[18vw] font-black text-white/5 tracking-tighter opacity-0 whitespace-nowrap"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            CREATIVE
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;