import { useMemo } from 'react';
import GitHubCalendar from 'react-github-calendar';

const GitHubStats = () => {
  const username = useMemo(() => 'RashmikaGamage2002', []);

  return (
    <section id="githubstats" className="py-32 bg-primary border-t border-borderMuted">
      <div className="container mx-auto px-6 lg:px-16">
        
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.5em] text-accent">CONTRIBUTION</p>
          <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl">GIT Activity</h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-accent" />
          
        </div>

        <div className="bg-cardBg border border-borderMuted rounded-2xl p-8 max-w-5xl mx-auto flex justify-center overflow-x-auto">
          <GitHubCalendar 
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