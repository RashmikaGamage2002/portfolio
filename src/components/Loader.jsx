// src/components/Loader.jsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/data';

const EXIT_DURATION = 0.9;
const FALLBACK_DURATION = 8000;
const VIDEO_PLAYBACK_RATE = 2.0; // 2.0 means 2x speed. Change this to 1.5 for 1.5x speed, etc.

const Loader = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);
    const [videoDuration, setVideoDuration] = useState(null);

    const videoRef = useRef(null);
    const progressRafRef = useRef(null);
    const dismissedRef = useRef(false);

    const initials = personalInfo.name
        .split(' ')
        .map(word => word[0])
        .join('');

    const firstName = personalInfo.name.split(' ')[0];
    const lastName = personalInfo.name.split(' ').slice(1).join(' ');

    // ── Dismiss (called once, either from onEnded or fallback) ──
    const dismiss = useCallback(() => {
        if (dismissedRef.current) return;
        dismissedRef.current = true;
        if (progressRafRef.current) cancelAnimationFrame(progressRafRef.current);
        setProgress(100);
        setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, EXIT_DURATION * 1000);
        }, 300);
    }, [onComplete]);

    // ── Animate progress bar in sync with video duration ──
    useEffect(() => {
        if (videoDuration === null) return;
        const totalMs = videoDuration * 1000;
        const startTime = performance.now();

        const tick = (now) => {
            const elapsed = now - startTime;
            const pct = Math.min((elapsed / totalMs) * 100, 99);
            setProgress(pct);
            if (elapsed < totalMs) {
                progressRafRef.current = requestAnimationFrame(tick);
            }
        };
        progressRafRef.current = requestAnimationFrame(tick);

        return () => { if (progressRafRef.current) cancelAnimationFrame(progressRafRef.current); };
    }, [videoDuration]);

    // ── Fallback timer ──
    useEffect(() => {
        if (videoDuration) return;
        const fallback = setTimeout(() => {
            if (!dismissedRef.current) dismiss();
        }, FALLBACK_DURATION + EXIT_DURATION * 1000 + 300);
        return () => clearTimeout(fallback);
    }, [dismiss, videoDuration]);

    const handleLoadedMetadata = () => {
        const vid = videoRef.current;
        if (vid && vid.duration && isFinite(vid.duration)) {
            vid.playbackRate = VIDEO_PLAYBACK_RATE;
            setVideoDuration(vid.duration / VIDEO_PLAYBACK_RATE);
        }
    };

    // ── Animation variants ──
    const letterVariants = {
        hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
        visible: (i) => ({
            opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { delay: 0.4 + i * 0.08, duration: 0.6, ease: [0.77, 0, 0.18, 1] },
        }),
    };

    const taglineVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { delay: 1.0, duration: 0.7, ease: [0.77, 0, 0.18, 1] } },
    };

    const pingVariants = {
        animate: {
            scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6],
            transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
        },
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none overflow-hidden"
                    style={{ background: '#0B0B0B' }}
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0, y: '-100%',
                        transition: { duration: EXIT_DURATION, ease: [0.77, 0, 0.18, 1] },
                    }}
                >

                    {/* ── Background Video ── */}
                    <video
                        ref={videoRef}
                        src="/loader-bg.mp4"
                        autoPlay
                        muted
                        playsInline
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={() => {
                            if (!dismissedRef.current) dismiss();
                        }}
                        className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
                    />

                    {/* ── Ambient Glow ── */}
                    <div
                        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(0,191,255,0.10) 0%, transparent 70%)', filter: 'blur(40px)' }}
                    />

                    {/* ── Main Content ── */}
                    <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-6 text-center">

                        {/* Orbiting ring + initials badge */}
                        <div className="relative flex items-center justify-center w-28 h-28 mb-2">
                            {/* Outer orbit */}
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{ border: '1.5px solid rgba(0,191,255,0.25)', boxShadow: '0 0 20px rgba(0,191,255,0.10)' }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                            >
                                {/* Orbit dot */}
                                <div
                                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent"
                                    style={{ boxShadow: '0 0 8px rgba(0,191,255,0.9)' }}
                                />
                            </motion.div>

                            {/* Inner counter-orbit */}
                            <motion.div
                                className="absolute inset-3 rounded-full"
                                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                                animate={{ rotate: -360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                            />

                            {/* Initials badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.6, ease: [0.77, 0, 0.18, 1] }}
                                className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(0,191,255,0.15) 0%, rgba(0,153,204,0.08) 100%)',
                                    border: '1px solid rgba(0,191,255,0.3)',
                                    backdropFilter: 'blur(12px)',
                                }}
                            >
                                <span className="text-xl font-bold tracking-wider text-accent" style={{ fontFamily: 'Inter, sans-serif' }}>
                                    {initials}
                                </span>
                            </motion.div>

                            {/* Ping glow ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{ border: '1px solid rgba(0,191,255,0.2)' }}
                                variants={pingVariants}
                                animate="animate"
                            />
                        </div>

                        {/* Name — letter by letter */}
                        <div className="overflow-hidden">
                            <div className="flex flex-wrap items-baseline justify-center">
                                {firstName.split('').map((char, i) => (
                                    <motion.span
                                        key={`fn-${i}`}
                                        custom={i}
                                        variants={letterVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="text-4xl sm:text-5xl font-bold tracking-tight text-white"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                <span className="mx-2 text-4xl sm:text-5xl">&nbsp;</span>
                                {lastName.split('').map((char, i) => (
                                    <motion.span
                                        key={`ln-${i}`}
                                        custom={firstName.length + 1 + i}
                                        variants={letterVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="text-4xl sm:text-5xl font-bold tracking-tight text-accent"
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Tagline */}
                        <motion.p
                            variants={taglineVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-xs sm:text-sm uppercase tracking-[0.35em] font-light"
                            style={{ color: 'rgba(160,160,160,0.85)' }}
                        >
                            {personalInfo.subtitle}
                        </motion.p>

                        {/* Decorative divider */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
                            className="w-16 h-px"
                            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,191,255,0.5), transparent)' }}
                        />

                        {/* Progress bar + percentage */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.5 }}
                            className="w-48 sm:w-64 flex flex-col items-center gap-2"
                        >
                            <div className="w-full h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${progress}%`,
                                        background: 'linear-gradient(90deg, #00BFFF, #0099CC)',
                                        boxShadow: '0 0 8px rgba(0,191,255,0.6)',
                                        transition: 'width 0.1s linear',
                                    }}
                                />
                            </div>
                            <span className="text-[10px] tabular-nums tracking-widest" style={{ color: 'rgba(0,191,255,0.6)', fontFamily: 'Inter, sans-serif' }}>
                                {Math.round(progress)}%
                            </span>
                        </motion.div>
                    </div>

                    {/* ── Bottom brand strip ── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6, duration: 0.8 }}
                        className="absolute bottom-8 left-0 right-0 flex items-center justify-center"
                    >
                        <span className="text-[9px] uppercase tracking-[0.5em] font-light" style={{ color: 'rgba(255,255,255,0.2)' }}>
                            portfolio · {new Date().getFullYear()}
                        </span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;