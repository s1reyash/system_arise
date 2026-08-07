'use client';

import React from 'react';
import { useSystem } from '@/context/SystemContext';
import { BarChart3, TrendingUp, PieChart, Shield, Flame, CheckCircle2, Zap } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell
} from 'recharts';
import { HunterStatsRadar } from '@/components/dashboard/HunterStatsRadar';

export default function AnalyticsPage() {
  const { userStats, habits } = useSystem();

  // Mock past 7 days XP growth data
  const xpGrowthData = [
    { day: 'Mon', xp: 850, habits: 4 },
    { day: 'Tue', xp: 980, habits: 5 },
    { day: 'Wed', xp: 1120, habits: 6 },
    { day: 'Thu', xp: 1240, habits: 5 },
    { day: 'Fri', xp: 1350, habits: 7 },
    { day: 'Sat', xp: 1420, habits: 6 },
    { day: 'Sun', xp: userStats.currentXP, habits: userStats.completedHabitsToday },
  ];

  // Category breakdown data
  const categoryCounts: Record<string, number> = {};
  habits.forEach(h => {
    categoryCounts[h.category] = (categoryCounts[h.category] || 0) + 1;
  });

  const pieData = Object.keys(categoryCounts).map(cat => ({
    name: cat,
    value: categoryCounts[cat]
  }));

  const COLORS = ['#00f0ff', '#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950/40 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] border border-cyan-500/30 font-bold uppercase">
              SYSTEM INTELLIGENCE MATRIX
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 font-mono mt-1">
            ANALYTICS & PERFORMANCE METRICS
          </h1>
          <p className="text-xs text-slate-400">
            Real-time metric telemetry on your consistency, XP accumulation, and category breakdown.
          </p>
        </div>
      </div>

      {/* METRIC SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4 border border-blue-500/20">
          <div className="text-xs font-mono text-slate-400">CONSISTENCY SCORE</div>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">94.8%</div>
          <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> Top 5% Sovereign Hunter
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-blue-500/20">
          <div className="text-xs font-mono text-slate-400">ACTIVE STREAK</div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">{userStats.currentStreak} Days</div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">Longest: {userStats.longestStreak} Days</div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-blue-500/20">
          <div className="text-xs font-mono text-slate-400">ACCUMULATED XP</div>
          <div className="text-2xl font-extrabold text-purple-300 font-mono mt-1">{userStats.currentXP} XP</div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">LVL {userStats.level} {userStats.rankTitle}</div>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-blue-500/20">
          <div className="text-xs font-mono text-slate-400">COMPLETION RATE</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">{userStats.completionRateToday}%</div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">{userStats.completedHabitsToday} of {userStats.totalHabits} Completed</div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* XP Growth Area Chart */}
        <div className="glass-panel rounded-3xl p-6 border border-cyan-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-slate-100 font-mono">XP GROWTH OVER TIME</h3>
            </div>
            <span className="text-xs font-mono text-cyan-400">Past 7 Days</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={xpGrowthData}>
                <defs>
                  <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(59, 130, 246, 0.1)" />
                <XAxis dataKey="day" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#07090e', borderColor: '#00f0ff', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="xp" stroke="#00f0ff" strokeWidth={3} fillOpacity={1} fill="url(#xpGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Habits Completed Bar Chart */}
        <div className="glass-panel rounded-3xl p-6 border border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-bold text-slate-100 font-mono">WEEKLY QUEST EXECUTIONS</h3>
            </div>
            <span className="text-xs font-mono text-purple-300">Habits / Day</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={xpGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 85, 247, 0.1)" />
                <XAxis dataKey="day" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#07090e', borderColor: '#a855f7', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="habits" fill="#a855f7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* SECOND ROW CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Category Breakdown Donut */}
        <div className="glass-panel rounded-3xl p-6 border border-blue-500/20 space-y-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-slate-100 font-mono">HABIT CATEGORY BREAKDOWN</h3>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#07090e', borderColor: '#00f0ff', borderRadius: '12px', fontSize: '12px' }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-slate-300">{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hunter Stats Radar */}
        <HunterStatsRadar />

      </div>

    </div>
  );
}
