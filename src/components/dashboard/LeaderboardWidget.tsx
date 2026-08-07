'use client';

import React from 'react';
import { useSystem } from '@/context/SystemContext';
import { INITIAL_LEADERBOARD } from '@/lib/leaderboard-data';
import { Trophy, Flame, Zap, Shield, Crown, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const LeaderboardWidget: React.FC = () => {
  const { userStats, userProfile } = useSystem();

  return (
    <div className="glass-panel rounded-3xl p-6 border border-fuchsia-500/35 bg-gradient-to-br from-[#120822] via-[#1a0b30] to-[#280e46] space-y-4 shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-100 font-mono flex items-center gap-2">
              HUNTER RANKBOARD & GUILDS
            </h3>
            <p className="text-[11px] text-purple-300/60">Compete with Hunters & Guild Squads globally.</p>
          </div>
        </div>

        <Link
          href="/leaderboard"
          className="px-3 py-1.5 rounded-xl bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-300 font-mono text-xs font-bold border border-fuchsia-400/40 transition-all flex items-center gap-1"
        >
          <span>FULL RANKBOARD</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* TOP HUNTERS LIST */}
      <div className="space-y-2">
        {INITIAL_LEADERBOARD.slice(0, 3).map((hunter) => (
          <div
            key={hunter.id}
            className="p-3 rounded-2xl bg-[#130b24] border border-purple-500/20 flex items-center justify-between gap-3 text-xs font-mono"
          >
            <div className="flex items-center gap-3">
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                hunter.rank === 1 ? 'bg-amber-400 text-slate-950 shadow-[0_0_10px_rgba(251,191,36,0.8)]' :
                hunter.rank === 2 ? 'bg-slate-300 text-slate-950' : 'bg-amber-700 text-slate-100'
              }`}>
                #{hunter.rank}
              </span>

              <div className="w-8 h-8 rounded-xl overflow-hidden bg-slate-900 border border-purple-500/30 shrink-0">
                {/* eslint-disable-next-next/no-img-element */}
                <img src={hunter.avatar} alt={hunter.displayName} className="w-full h-full object-cover" />
              </div>

              <div>
                <div className="font-bold text-slate-100 flex items-center gap-1.5">
                  {hunter.displayName}
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                    {hunter.rankTitle}
                  </span>
                </div>
                <div className="text-[10px] text-purple-300/60 font-sans">
                  {hunter.guildName}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-fuchsia-300 font-bold flex items-center gap-1 justify-end">
                <Zap className="w-3 h-3 text-fuchsia-400" />
                {hunter.totalXP} XP
              </div>
              <div className="text-[10px] text-amber-400 flex items-center gap-1 justify-end">
                <Flame className="w-3 h-3 fill-amber-500" />
                {hunter.currentStreak}d Streak
              </div>
            </div>
          </div>
        ))}

        {/* YOUR USER POSITION BAR */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-fuchsia-950/40 via-purple-900/40 to-indigo-950/40 border border-fuchsia-400/50 flex items-center justify-between gap-3 text-xs font-mono mt-2 shadow-[0_0_15px_rgba(217,70,239,0.15)]">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-lg bg-fuchsia-500 text-slate-950 font-bold text-xs flex items-center justify-center">
              YOU
            </span>
            <div>
              <div className="font-bold text-fuchsia-300">{userProfile.displayName} (Level {userStats.level})</div>
              <div className="text-[10px] text-purple-300/70">{userStats.rankTitle} • {userProfile.domain || 'General Hunter'}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-fuchsia-300 font-bold">{userStats.currentXP} XP</div>
            <div className="text-[10px] text-amber-400">{userStats.currentStreak}d Streak</div>
          </div>
        </div>
      </div>

    </div>
  );
};
