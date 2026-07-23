import { useMemo } from 'react';
import GitHubCalendar from 'react-github-calendar';

const GitHubStats = () => {
  const username = useMemo(() => 'RashmikaGamage2002', []);

  return (
    <section id="githubstats" className="py-32 bg-primary border-t border-borderMuted">
      <div className="container mx-auto px-6 lg:px-16">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-lightText mb-2">
            GIT Activity
          </h2>
          <p className="text-dimText font-light mt-3 max-w-xl mx-auto">
            A visual representation of my GitHub contributions and activity over time
          </p>
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