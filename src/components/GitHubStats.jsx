import { useMemo } from 'react';
import GitHubCalendar from 'react-github-calendar';

const GitHubStats = () => {
  const username = useMemo(() => 'github', []);

  return (
    <section id="githubstats" className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">GitHub Stats</h2>
        <div className="bg-secondary rounded-3xl p-8 shadow-2xl border border-white/10">
          <p className="text-dimText text-center mb-6">Recent GitHub contributions and activity overview.</p>
          <GitHubCalendar username={username} blockSize={15} blockMargin={6} fontSize={16} />
        </div>
      </div>
    </section>
  );
};

export default GitHubStats;
