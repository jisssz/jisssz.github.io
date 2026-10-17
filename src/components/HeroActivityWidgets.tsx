import { useState, useEffect, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  LeetCodeStats,
  GitHubStats,
  initialLeetCodeStats,
  initialGitHubStats,
} from '../data/activityData';

// Mini LeetCode SVG Icon
function LeetCodeLogo({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.874 5.874 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.593c.31.034.624.051.937.051a5.874 5.874 0 0 0 2.215-.434l3.774-1.48 2.76-1.08a1.37 1.37 0 0 0 .794-1.748 1.37 1.37 0 0 0-1.748-.794l-2.76 1.08-3.774 1.48a3.17 3.17 0 0 1-1.196.234 3.21 3.21 0 0 1-.506-.027 3.208 3.208 0 0 1-2.607-1.944 3.176 3.176 0 0 1-.189-.55 2.982 2.982 0 0 1-.034-1.278 2.87 2.87 0 0 1 .654-1.139l3.854-4.126 5.406-5.788a1.37 1.37 0 0 0-.97-2.345zm2.84 8.34a1.37 1.37 0 0 0-.97.401l-4.908 4.908a1.37 1.37 0 1 0 1.94 1.94l4.908-4.908a1.37 1.37 0 0 0-.97-2.341zm-1.884 6.724a1.37 1.37 0 0 0-.97 2.341l1.542 1.542a1.37 1.37 0 1 0 1.94-1.94l-1.542-1.542a1.37 1.37 0 0 0-.97-.401z" />
    </svg>
  );
}

// Mini GitHub SVG Icon
function GitHubLogo({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// GitHub Level to Color Mapping
const LEVEL_COLORS = [
  'rgba(255, 255, 255, 0.06)', // level 0 (empty)
  '#0e4429',                  // level 1
  '#006d32',                  // level 2
  '#26a641',                  // level 3
  '#39d353',                  // level 4
];

export function HeroActivityWidgets() {
  const [lcStats, setLcStats] = useState<LeetCodeStats>(initialLeetCodeStats);
  const [ghStats, setGhStats] = useState<GitHubStats>(initialGitHubStats);

  // Background fetch for LeetCode stats
  useEffect(() => {
    let isMounted = true;

    async function fetchLeetCode() {
      try {
        // Try primary API
        const res = await fetch('https://alfa-leetcode-api.onrender.com/userProfile/bMFExkNlUl');
        if (!res.ok) throw new Error('Primary API unavailable');
        const data = await res.json();
        if (isMounted && data && typeof data.totalSolved === 'number') {
          setLcStats(prev => ({
            ...prev,
            totalSolved: data.totalSolved,
            easySolved: data.easySolved ?? prev.easySolved,
            mediumSolved: data.mediumSolved ?? prev.mediumSolved,
            hardSolved: data.hardSolved ?? prev.hardSolved,
            ranking: data.ranking ?? prev.ranking,
            isLive: true,
          }));
          return;
        }
      } catch {
        // Try secondary fallback
        try {
          const res2 = await fetch('https://leetcode-api-faisalshohag.vercel.app/bMFExkNlUl');
          if (res2.ok) {
            const data2 = await res2.json();
            if (isMounted && data2 && typeof data2.totalSolved === 'number') {
              setLcStats(prev => ({
                ...prev,
                totalSolved: data2.totalSolved,
                easySolved: data2.easySolved ?? prev.easySolved,
                mediumSolved: data2.mediumSolved ?? prev.mediumSolved,
                hardSolved: data2.hardSolved ?? prev.hardSolved,
                isLive: true,
              }));
            }
          }
        } catch {
          // Gracefully retain verified snapshot
        }
      }
    }

    fetchLeetCode();
    return () => { isMounted = false; };
  }, []);

  // Background fetch for GitHub contribution stats
  useEffect(() => {
    let isMounted = true;

    async function fetchGitHub() {
      try {
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/jisssz?y=last');
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data && Array.isArray(data.contributions)) {
          setGhStats(prev => ({
            ...prev,
            totalLastYear: data.total?.lastYear ?? prev.totalLastYear,
            contributions: data.contributions,
            isLive: true,
          }));
        }
      } catch {
        // Gracefully retain verified snapshot
      }
    }

    fetchGitHub();
    return () => { isMounted = false; };
  }, []);

  // Prepare recent ~22 weeks of GitHub contributions for compact view
  const recentWeeks = useMemo(() => {
    const list = ghStats.contributions || [];
    // We want the most recent 22 weeks (22 * 7 = 154 days)
    const sliceDays = list.slice(-154);
    const weeks: Array<Array<{ date: string; count: number; level: number }>> = [];
    let currentWeek: Array<{ date: string; count: number; level: number }> = [];

    sliceDays.forEach(day => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
    return weeks;
  }, [ghStats.contributions]);

  // Problem breakdown percentages for LeetCode bar
  const totalSolved = Math.max(1, lcStats.totalSolved);
  const easyPct = Math.round((lcStats.easySolved / totalSolved) * 100);
  const medPct = Math.round((lcStats.mediumSolved / totalSolved) * 100);
  const hardPct = Math.max(0, 100 - easyPct - medPct);

  return (
    <div className="flex flex-col gap-2.5 w-full max-w-[340px] xl:max-w-[360px] pointer-events-auto">
      {/* ──────────────────────────────────────────────────────────
          CARD 1: LEETCODE STATS WIDGET
      ────────────────────────────────────────────────────────── */}
      <a
        href={lcStats.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="View Jis Shajan's LeetCode Profile"
        aria-label="LeetCode Profile: 144 Problems Solved"
        className="group relative block rounded-2xl bg-black/50 hover:bg-black/60 border border-white/[0.08] hover:border-[#FFA116]/50 p-3.5 backdrop-blur-md transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] focus:outline-none focus:ring-1 focus:ring-[#FFA116]"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[#FFA116] flex items-center justify-center">
              <LeetCodeLogo size={14} />
            </span>
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#F5F5F7]">
              LEETCODE
            </span>
            <span className="text-[10px] font-mono text-[#8E8E93]">
              @{lcStats.username}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[9px] font-mono text-[#FF5500]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="radar-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5500] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF5500]" />
              </span>
              <span>14d STREAK</span>
            </div>
            <ArrowUpRight
              size={13}
              className="text-[#8E8E93] group-hover:text-[#FFA116] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </div>
        </div>

        {/* Primary Numbers Row */}
        <div className="flex items-baseline justify-between gap-4 mt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-extrabold text-2xl text-white tracking-tight leading-none">
              {lcStats.totalSolved}
            </span>
            <span className="font-mono text-[10px] text-[#8E8E93] uppercase tracking-wider">
              Solved
            </span>
          </div>

          {/* Difficulty Breakdown Badges */}
          <div className="flex items-center gap-2 font-mono text-[10px]">
            <div className="flex items-center gap-1 text-[#00B8A3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B8A3]" />
              <span>{lcStats.easySolved}</span>
            </div>
            <div className="flex items-center gap-1 text-[#FFC01E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC01E]" />
              <span>{lcStats.mediumSolved}</span>
            </div>
            <div className="flex items-center gap-1 text-[#FF375F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF375F]" />
              <span>{lcStats.hardSolved}</span>
            </div>
          </div>
        </div>

        {/* Visual Ratio Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden flex mt-2.5">
          <div style={{ width: `${easyPct}%` }} className="bg-[#00B8A3] h-full" title={`Easy: ${lcStats.easySolved}`} />
          <div style={{ width: `${medPct}%` }} className="bg-[#FFC01E] h-full" title={`Medium: ${lcStats.mediumSolved}`} />
          <div style={{ width: `${hardPct}%` }} className="bg-[#FF375F] h-full" title={`Hard: ${lcStats.hardSolved}`} />
        </div>

        {/* Sub-label Footer */}
        <div className="flex items-center justify-between text-[9px] font-mono text-[#8E8E93] mt-2">
          <span>{lcStats.activeDays} ACTIVE DAYS</span>
          <span className="text-white/40">{lcStats.isLive ? '● LIVE SYNC' : 'VERIFIED OCT 2026'}</span>
        </div>
      </a>

      {/* ──────────────────────────────────────────────────────────
          CARD 2: GITHUB CONTRIBUTION HEATMAP WIDGET
      ────────────────────────────────────────────────────────── */}
      <a
        href={ghStats.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="View Jis Shajan's GitHub Profile"
        aria-label={`GitHub Profile: ${ghStats.totalLastYear} Contributions`}
        className="group relative block rounded-2xl bg-black/50 hover:bg-black/60 border border-white/[0.08] hover:border-[#10B981]/50 p-3.5 backdrop-blur-md transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] focus:outline-none focus:ring-1 focus:ring-[#10B981]"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[#F5F5F7] flex items-center justify-center">
              <GitHubLogo size={14} />
            </span>
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#F5F5F7]">
              GITHUB
            </span>
            <span className="text-[10px] font-mono text-[#8E8E93]">
              @{ghStats.username}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-semibold text-[#10B981]">
              {ghStats.totalLastYear} contribs
            </span>
            <ArrowUpRight
              size={13}
              className="text-[#8E8E93] group-hover:text-[#10B981] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
            />
          </div>
        </div>

        {/* Micro SVG Heatmap Grid */}
        <div className="w-full overflow-hidden mt-1 pt-0.5">
          <div className="flex items-center justify-between gap-1 w-full">
            {recentWeeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    className="w-2 h-2 rounded-[2px] transition-colors"
                    style={{ backgroundColor: LEVEL_COLORS[day.level] || LEVEL_COLORS[0] }}
                    title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap Legend & Frequency Indicator */}
        <div className="flex items-center justify-between text-[9px] font-mono text-[#8E8E93] mt-2.5">
          <span>PAST 5 MONTHS</span>
          <div className="flex items-center gap-1">
            <span className="text-[8px] text-white/40">LESS</span>
            {LEVEL_COLORS.map((c, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-[1px]" style={{ backgroundColor: c }} />
            ))}
            <span className="text-[8px] text-white/40">MORE</span>
          </div>
        </div>
      </a>
    </div>
  );
}
