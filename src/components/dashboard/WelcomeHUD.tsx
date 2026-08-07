'use client';

import React from 'react';
import { useSystem } from '@/context/SystemContext';
import { 
  Zap, 
  Shield, 
  Flame, 
  Target, 
  Plus, 
  TrendingUp, 
  CheckCircle2,
  Clock
} from 'lucide-react';

interface WelcomeHUDProps {
  onOpenAddHabit: () => void;
}

export const WelcomeHUD: React.FC<WelcomeHUDProps> = ({ onOpenAddHabit }) => {
  const { userProfile, userStats } = useSystem();

  return (
    <div className="relative overflow-hidden glass-panel rounded-3xl p-6 sm:p-8 border border-blue-500/30 bg-gradient-to-br from-slate-950 via-slate-900/90 to-blue-950/40 shadow-2xl">
      
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left Welcome Info */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              SYSTEM ACTIVE • DAILY QUEST STATUS READY
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight font-sans">
            Welcome Back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">{userProfile.displayName}</span>
          </h1>

          <p className="text-sm text-slate-300 italic font-mono border-l-2 border-cyan-500/50 pl-3 py-0.5">
            &ldquo;{userProfile.missionStatement}&rdquo;
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
            <div className="flex items-center gap-1.5">
              <Target className="w-4 h-4 text-cyan-400" />
              <span>Goal: <strong className="text-slate-200">{userProfile.currentGoal}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Reminder: <strong className="text-purple-300">{userProfile.dailyReminderTime}</strong></span>
            </div>
          </div>
        </div>

        {/* Right Action & Quick Stats */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <button
            onClick={onOpenAddHabit}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-bold text-slate-950 text-sm shadow-xl shadow-cyan-500/30 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            INITIALIZE QUEST
          </button>
        </div>

      </div>

      {/* BOTTOM METRICS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-800/80">
        
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-blue-500/20">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span>HUNTER RANK</span>
            <Shield className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-base sm:text-lg font-bold text-cyan-300 font-mono truncate">
            {userStats.rankTitle}
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">LVL {userStats.level} Hunter</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-blue-500/20">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span>ACTIVE STREAK</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-base sm:text-lg font-bold text-amber-400 font-mono">
            {userStats.currentStreak} Days
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">Longest: {userStats.longestStreak} Days</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-blue-500/20">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span>TODAY&apos;S PROGRESS</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-base sm:text-lg font-bold text-emerald-400 font-mono">
            {userStats.completionRateToday}%
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            {userStats.completedHabitsToday} of {userStats.totalHabits} Completed
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-blue-500/20">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span>TOTAL XP</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-base sm:text-lg font-bold text-purple-300 font-mono">
            {userStats.currentXP} XP
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">Next: {userStats.nextLevelXP} XP</div>
        </div>

      </div>

    </div>
  );
};
