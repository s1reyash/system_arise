'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { 
  Zap, 
  Flame, 
  Plus, 
  SlidersHorizontal,
  LayoutGrid,
  Eye,
  EyeOff
} from 'lucide-react';
import { DailyQuestCard } from '@/components/dashboard/DailyQuestCard';
import { DailyQuoteCard } from '@/components/dashboard/DailyQuoteCard';
import { HeatmapSection } from '@/components/dashboard/HeatmapSection';
import { HunterStatsRadar } from '@/components/dashboard/HunterStatsRadar';
import { DailyLearningCard } from '@/components/dashboard/DailyLearningCard';
import { MoodReflectionCard } from '@/components/dashboard/MoodReflectionCard';
import { LeaderboardWidget } from '@/components/dashboard/LeaderboardWidget';
import { QuickAddHabitModal } from '@/components/ui/QuickAddHabitModal';

export default function SimplifiedDashboardPage() {
  const { userProfile, userStats } = useSystem();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);

  // Widget visibility state for ultra-minimalist focus
  const [widgets, setWidgets] = useState({
    quests: true,
    leaderboard: true,
    statsRadar: true,
    wisdomQuote: true,
    heatmap: true,
    dailyLearning: false,
    reflection: false,
  });

  const toggleWidget = (key: keyof typeof widgets) => {
    setWidgets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const xpPct = Math.min(100, Math.round((userStats.currentXP / userStats.nextLevelXP) * 100));

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* MINIMALIST HERO OVERVIEW BAR */}
      <div className="relative overflow-hidden glass-panel rounded-3xl p-6 sm:p-8 border border-fuchsia-500/35 bg-gradient-to-br from-[#0e071c] via-[#140b28] to-[#1f0d3b] shadow-2xl">
        <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Welcome Info */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-mono text-xs font-bold border border-fuchsia-400/40">
              <Zap className="w-3.5 h-3.5 text-fuchsia-400 animate-pulse" />
              SOVEREIGN SYSTEM HUD ACTIVE
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight font-sans">
              Welcome Back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400">{userProfile.displayName}</span>
            </h1>

            <div className="flex items-center gap-3 text-xs font-mono text-purple-200/70 pt-1">
              <span>LVL <strong className="text-fuchsia-400 font-bold">{userStats.level}</strong> [{userStats.rankTitle}]</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {userStats.currentStreak} Day Streak
              </span>
            </div>
          </div>

          {/* Quick Actions & Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowCustomize(!showCustomize)}
              className="p-3 rounded-2xl bg-[#130b24] border border-purple-500/30 text-purple-300 hover:text-fuchsia-400 hover:border-fuchsia-500/50 transition-all text-xs font-mono font-bold flex items-center gap-2"
              title="Customize Minimal Dashboard Widgets"
            >
              <SlidersHorizontal className="w-4 h-4 text-fuchsia-400" />
              <span className="hidden sm:inline">CUSTOMIZE WIDGETS</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex-1 md:flex-initial px-6 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 font-bold text-slate-950 text-xs shadow-xl shadow-fuchsia-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              NEW QUEST
            </button>
          </div>

        </div>

        {/* MINIMAL COMPACT STATS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-purple-900/40">
          <div className="p-3 rounded-2xl bg-[#130b24]/90 border border-purple-500/20">
            <div className="text-[10px] font-mono text-purple-300/60 uppercase">TODAY&apos;S QUESTS</div>
            <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
              {userStats.completedHabitsToday} / {userStats.totalHabits} Completed
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#130b24]/90 border border-purple-500/20">
            <div className="text-[10px] font-mono text-purple-300/60 uppercase">COMPLETION RATE</div>
            <div className="text-base font-bold text-fuchsia-300 font-mono mt-0.5">
              {userStats.completionRateToday}%
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#130b24]/90 border border-purple-500/20">
            <div className="text-[10px] font-mono text-purple-300/60 uppercase">ACCUMULATED XP</div>
            <div className="text-base font-bold text-cyan-300 font-mono mt-0.5">
              {userStats.currentXP} XP
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#130b24]/90 border border-purple-500/20">
            <div className="text-[10px] font-mono text-purple-300/60 uppercase">NEXT RANK PROGRESS</div>
            <div className="text-base font-bold text-amber-400 font-mono mt-0.5">
              {xpPct}% to Next Level
            </div>
          </div>
        </div>

      </div>

      {/* WIDGET CUSTOMIZER PANEL */}
      {showCustomize && (
        <div className="glass-panel rounded-3xl p-5 border border-fuchsia-500/40 bg-[#0f071d] space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-fuchsia-400" />
              <h3 className="text-xs font-mono font-bold text-slate-200 uppercase">MINIMAL DASHBOARD WIDGET CONTROLS</h3>
            </div>
            <span className="text-[10px] font-mono text-purple-300/60">Toggle widgets on/off to simplify your dashboard.</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {Object.entries(widgets).map(([key, isVisible]) => (
              <button
                key={key}
                onClick={() => toggleWidget(key as keyof typeof widgets)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all flex items-center gap-2 ${
                  isVisible
                    ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 font-bold'
                    : 'bg-[#130b24] text-slate-500 border border-purple-900/40'
                }`}
              >
                {isVisible ? <Eye className="w-3.5 h-3.5 text-fuchsia-400" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MODULAR WIDGET GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main 2-Column Area */}
        <div className="lg:col-span-2 space-y-6">
          {widgets.quests && <DailyQuestCard onOpenAddHabit={() => setIsAddModalOpen(true)} />}
          {widgets.leaderboard && <LeaderboardWidget />}
          {widgets.heatmap && <HeatmapSection />}
        </div>

        {/* Right 1-Column Area */}
        <div className="space-y-6">
          {widgets.wisdomQuote && <DailyQuoteCard />}
          {widgets.statsRadar && <HunterStatsRadar />}
          {widgets.dailyLearning && <DailyLearningCard />}
          {widgets.reflection && <MoodReflectionCard />}
        </div>

      </div>

      {/* Quick Add Habit Modal */}
      <QuickAddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

    </div>
  );
}
