import { useMemo } from 'react';
import { motion } from 'framer-motion';
import GitHubCalendarModule from 'react-github-calendar';
import AnimatedHeading from './AnimatedHeading';
import { fadeUp, cardReveal, staggerContainer, lineReveal, sectionTransition } from '../animationVariants';

const GitHubCalendarComponent = GitHubCalendarModule?.default ?? GitHubCalendarModule;

const GitHubStats = () => {
  const username = useMemo(() => 'RashmikaGamage2002', []);

  return (
    <section id="githubstats" className="py-32 bg-secondary border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-16">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.18, 1] }}
          className="text-center mb-16"
        >

          <AnimatedHeading
            subtitle="Git Contribution"
            direction="split"
            fromLeftText="GIT"
            fromRightText="Activity"
            className="mb-4"
          />
          <motion.div
            initial={{ opacity: 0, scaleX: 0.9 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.77, 0, 0.18, 1] }}
            className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-accent"
          />
        </motion.div>

        <div className="bg-cardBg border border-borderMuted rounded-2xl p-8 max-w-5xl mx-auto flex justify-center overflow-x-auto">
          <GitHubCalendarComponent
            username={username}
            blockSize={14}
            blockMargin={5}
            fontSize={14}
            colorScheme="dark"
          />
        </div>

      </div>
    </section>
  );
};

export default GitHubStats;