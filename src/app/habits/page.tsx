'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { 
  CheckSquare, 
  Plus, 
  Flame, 
  Clock, 
  Zap, 
  Trash2, 
  Copy, 
  Archive, 
  PauseCircle, 
  PlayCircle,
  Search,
  CheckCircle2,
  Circle,
  ShieldAlert
} from 'lucide-react';
import { QuickAddHabitModal } from '@/components/ui/QuickAddHabitModal';
import { Habit } from '@/types/system';

export default function HabitsPage() {
  const { habits, toggleHabitToday, deleteHabit, duplicateHabit, pauseHabit, archiveHabit } = useSystem();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const todayStr = new Date().toISOString().split('T')[0];

  const categories = ['All', 'Fitness', 'Study', 'Meditation', 'Reading', 'Coding', 'AI Learning', 'Business', 'Nutrition', 'Journaling'];
  const difficulties = ['All', 'E-Rank', 'D-Rank', 'C-Rank', 'B-Rank', 'A-Rank', 'S-Rank'];

  const filtered = habits.filter(h => {
    if (h.archived) return false;
    if (searchTerm && !h.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (selectedCategory !== 'All' && h.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'All' && h.difficulty !== selectedDifficulty) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] border border-cyan-500/30 font-bold uppercase">
              SOVEREIGN QUEST ENGINE
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 font-mono mt-1">
            HABIT & QUEST PROTOCOLS
          </h1>
          <p className="text-xs text-slate-400">
            Create, manage and execute daily habit protocols to level up your attributes.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 text-xs shadow-lg shadow-cyan-500/30 hover:scale-[1.02] transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          CREATE CUSTOM QUEST
        </button>
      </div>

      {/* SEARCH & FILTER CONTROLS */}
      <div className="glass-panel rounded-2xl p-4 border border-blue-500/20 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search quests by name..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/90 border border-blue-500/20 text-slate-100 text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900/90 border border-blue-500/20 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-400 w-full sm:w-auto"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Rank Dropdown */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900/90 border border-blue-500/20 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-400 w-full sm:w-auto"
          >
            {difficulties.map(d => <option key={d} value={d}>Rank: {d}</option>)}
          </select>

        </div>
      </div>

      {/* HABIT PROTOCOLS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 glass-panel rounded-3xl border border-dashed border-slate-800">
            <ShieldAlert className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-sm font-mono text-slate-400">No habit quests matching your filter criteria.</p>
          </div>
        ) : (
          filtered.map(habit => {
            const isCompleted = habit.completedDates.includes(todayStr);

            return (
              <div
                key={habit.id}
                className={`glass-panel rounded-2xl p-5 border transition-all space-y-3 ${
                  isCompleted
                    ? 'border-emerald-500/30 bg-emerald-950/10'
                    : habit.paused
                    ? 'border-slate-800 opacity-60'
                    : 'border-blue-500/20 hover:border-cyan-500/40 bg-slate-900/80'
                }`}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleHabitToday(habit.id)}
                      className="text-cyan-400 hover:scale-110 transition-transform"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-500/20" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-500 hover:text-cyan-400" />
                      )}
                    </button>
                    <div>
                      <h3 className={`text-base font-bold font-sans ${isCompleted ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                        {habit.name}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mt-0.5">
                        <span className="text-cyan-400">{habit.category}</span>
                        <span>•</span>
                        <span>{habit.frequency}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] border border-cyan-500/30 font-bold">
                    {habit.difficulty}
                  </span>
                </div>

                {/* Notes & Reward */}
                {habit.notes && (
                  <p className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 italic font-mono">
                    &ldquo;{habit.notes}&rdquo;
                  </p>
                )}

                {/* Metrics Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {habit.streak}d Streak
                    </span>
                    <span className="flex items-center gap-1 text-cyan-300 font-bold">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      +{habit.xpValue} XP
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => pauseHabit(habit.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800"
                      title={habit.paused ? 'Resume Habit' : 'Pause Habit'}
                    >
                      {habit.paused ? <PlayCircle className="w-4 h-4 text-emerald-400" /> : <PauseCircle className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => duplicateHabit(habit.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
                      title="Duplicate Habit"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800"
                      title="Delete Habit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Quick Add Modal */}
      <QuickAddHabitModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />

    </div>
  );
}
