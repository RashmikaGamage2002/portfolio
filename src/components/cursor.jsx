import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverType, setHoverType] = useState('default');
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorRef = useRef(null);
  const lensRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const vel = useRef({ x: 0, y: 0 });
  const tilt = useRef({ rx: 0, ry: 0 });

  useEffect(() => {
    const checkPointer = () => {
      const hasCoarse = window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(hasCoarse);
    };
    checkPointer();
    window.addEventListener('resize', checkPointer);

    if (isTouchDevice) return;

    let animFrameId;

    const onMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const isInteractive = el.closest('button, a, input, select, textarea, [role="button"], .interactive');
        const isImg = el.closest('img, svg');
        const isHeadingOrText = el.closest('h1, h2, h3, h4, h5, h6, p, span, li, code');

        if (isInteractive) setHoverType('interactive');
        else if (isImg) setHoverType('image');
        else if (isHeadingOrText) setHoverType('text');
        else setHoverType('default');
      }
    };

    const onMouseDown = (e) => {
      setIsClicked(true);
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
    };

    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const render = () => {
      const lerpFactor = 0.2;
      const prevX = pos.current.x;
      const prevY = pos.current.y;

      pos.current.x += (target.current.x - pos.current.x) * lerpFactor;
      pos.current.y += (target.current.y - pos.current.y) * lerpFactor;

      vel.current.x = pos.current.x - prevX;
      vel.current.y = pos.current.y - prevY;

      const targetRx = Math.max(-28, Math.min(28, vel.current.y * 0.5));
      const targetRy = Math.max(-28, Math.min(28, -vel.current.x * 0.5));

      tilt.current.rx += (targetRx - tilt.current.rx) * 0.18;
      tilt.current.ry += (targetRy - tilt.current.ry) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0px)`;
      }

      if (lensRef.current) {
        const speed = Math.hypot(vel.current.x, vel.current.y);
        const stretchScale = Math.min(1.22, 1 + speed * 0.0035);
        const rotateAngle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI);

        lensRef.current.style.transform = `
          perspective(600px)
          rotateX(${tilt.current.rx}deg)
          rotateY(${tilt.current.ry}deg)
          rotate(${speed > 1.5 ? rotateAngle : 0}deg)
          scale(${stretchScale})
        `;
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('resize', checkPointer);
      cancelAnimationFrame(animFrameId);
    };
  }, [isVisible, isTouchDevice]);

  const removeRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  if (isTouchDevice) return null;

  // Water bubble sizes – bigger for maximum magnification
  let lensSizeClasses = 'w-12 h-12 -ml-6 -mt-6'; // default 80px
  if (hoverType === 'interactive') {
    lensSizeClasses = 'w-20 h-20 -ml-10 -mt-10'; // 112px for buttons/links
  } else if (hoverType === 'text') {
    lensSizeClasses = 'w-16 h-16 -ml-8 -mt-8'; // 96px for text & fonts
  } else if (hoverType === 'image') {
    lensSizeClasses = 'w-20 h-20 -ml-10 -mt-10'; // 80px for images
  }

  return (
    <>
      {/* SVG Convex Magnification Filter – enhanced for maximum clear zoom */}
      <svg className="pointer-events-none fixed top-0 left-0 w-0 h-0 z-[-1]" aria-hidden="true">
        <defs>
          <radialGradient id="water-bubble-map" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#808080" />
            <stop offset="60%" stopColor="#b0b0b0" />
            <stop offset="100%" stopColor="#ffffff" />
          </radialGradient>

          <filter id="water-magnifier" x="-50%" y="-50%" width="200%" height="200%">
            {/* High displacement scale for powerful optical magnification */}
            <feTurbulence type="fractalNoise" baseFrequency="0.003" numOctaves="2" result="noise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="-75"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* Softer specular highlight for water bubble feel */}
            <feSpecularLighting
              in="noise"
              surfaceScale="4"
              specularConstant="1.2"
              specularExponent="25"
              lightingColor="#ffffff"
              result="specular"
            >
              <feDistantLight azimuth="140" elevation="60" />
            </feSpecularLighting>
            <feComposite in="specular" in2="displaced" operator="in" result="specularComposite" />
            <feBlend in="specularComposite" in2="displaced" mode="screen" />
          </filter>
        </defs>
      </svg>

      {/* Main Cursor Anchor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] will-change-transform"
        style={{ opacity: isVisible ? 0.8 : 0, transition: 'opacity 0.25s ease-out' }}
      >
        {/* Water Bubble Lens */}
        <div
          ref={lensRef}
          className={`relative flex items-center justify-center rounded-full transition-all duration-300 ease-out ${lensSizeClasses}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Bubble Body – glossy, translucent with sharp optical zoom */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-300 ${hoverType === 'interactive'
              ? 'bg-cyan-400/15 border-2 border-cyan-300/70 shadow-[0_0_35px_rgba(0,191,255,0.6)]'
              : hoverType === 'text'
                ? 'bg-blue-400/10 border border-white/40 shadow-[0_0_25px_rgba(0,191,255,0.4)]'
                : 'bg-white/5 border border-white/30 shadow-[0_0_20px_rgba(0,191,255,0.3)]'
              }`}
            style={{
              backdropFilter: 'url(#water-magnifier) blur(0px) contrast(125%) brightness(118%) saturate(140%)',
              WebkitBackdropFilter: 'url(#water-magnifier) blur(0px) contrast(125%) brightness(118%) saturate(140%)',
            }}
          />

          {/* Inner glow – like light trapped in water */}
          <div
            className="absolute inset-[2px] rounded-full pointer-events-none opacity-60"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(0, 191, 255, 0.6) 0%, rgba(0, 150, 255, 0.1) 60%, transparent 80%)',
              filter: 'blur(2px)',
            }}
          />

          {/* Top highlight – specular reflection of a water droplet */}
          <div className="absolute top-1 left-2 right-2 h-[45%] rounded-t-full bg-gradient-to-b from-white/80 via-white/30 to-transparent pointer-events-none" />

          {/* Bottom reflection */}
          <div className="absolute bottom-1 left-4 right-4 h-[15%] rounded-b-full bg-white/10 pointer-events-none" />

          {/* Ring outline – subtle bubble edge */}
          <div className="absolute inset-1 rounded-full border border-white/20 pointer-events-none" />

          {/* Center Dot – small, like a water droplet core */}
          <motion.div
            animate={{
              scale: isClicked ? 0.5 : hoverType === 'interactive' ? 1.8 : 1,
              backgroundColor: hoverType === 'interactive' ? '#00BFFF' : '#FFFFFF',
            }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            className="relative z-10 w-2.5 h-2.5 rounded-full shadow-[0_0_16px_#00BFFF]"
          />

          {/* Animated ripple ring around interactive elements */}
          {hoverType === 'interactive' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
              animate={{ scale: 1.2, opacity: 1, rotate: 360 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
                scale: { duration: 0.25 },
              }}
              className="absolute -inset-1 rounded-full border border-dashed border-cyan-300/60 pointer-events-none"
            />
          )}
        </div>
      </div>

      {/* Click Ripples – water droplet impact ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.2, opacity: 0.8, x: ripple.x - 24, y: ripple.y - 24 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => removeRipple(ripple.id)}
            className="pointer-events-none fixed z-[99998] w-12 h-12 rounded-full border-2 border-cyan-400/60 shadow-[0_0_30px_#00BFFF]"
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default Cursor;