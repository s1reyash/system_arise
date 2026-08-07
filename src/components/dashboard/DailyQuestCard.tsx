'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { 
  CheckCircle2, 
  Circle, 
  Flame, 
  Clock, 
  Swords, 
  Plus, 
  Tag,
  Zap,
  MoreVertical,
  Edit,
  Trash2,
  Copy
} from 'lucide-react';
import { Habit } from '@/types/system';

interface DailyQuestCardProps {
  onOpenAddHabit: () => void;
}

export const DailyQuestCard: React.FC<DailyQuestCardProps> = ({ onOpenAddHabit }) => {
  const { habits, toggleHabitToday, deleteHabit, duplicateHabit } = useSystem();
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];

  const categories = ['All', 'Fitness', 'Study', 'Meditation', 'Reading', 'Coding', 'Nutrition'];

  const filteredHabits = habits.filter(h => {
    if (h.archived) return false;
    if (selectedCat === 'All') return true;
    return h.category === selectedCat;
  });

  const handleToggle = (id: string) => {
    setAnimatingId(id);
    toggleHabitToday(id);
    setTimeout(() => setAnimatingId(null), 1200);
  };

  const getDifficultyColor = (rank: Habit['difficulty']) => {
    switch (rank) {
      case 'S-Rank': return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'A-Rank': return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'B-Rank': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'C-Rank': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-blue-500/20 space-y-4">
      
      {/* HEADER & FILTERS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-100 font-mono flex items-center gap-2">
              TODAY&apos;S DAILY QUESTS
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {habits.filter(h => h.completedDates.includes(todayStr)).length} / {habits.length}
              </span>
            </h2>
            <p className="text-xs text-slate-400">Complete quests daily to maintain streaks & gain XP.</p>
          </div>
        </div>

        <button
          onClick={onOpenAddHabit}
          className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/40 transition-all flex items-center gap-1.5 self-end sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          NEW QUEST
        </button>
      </div>

      {/* CATEGORY FILTER CHIPS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
              selectedCat === cat
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-blue-500/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* QUEST LIST */}
      <div className="space-y-3 pt-2">
        {filteredHabits.length === 0 ? (
          <div className="text-center py-8 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800">
            <p className="text-xs text-slate-400 font-mono">No active quests found in this category.</p>
            <button onClick={onOpenAddHabit} className="text-xs text-cyan-400 underline mt-2">
              Create a new habit quest now
            </button>
          </div>
        ) : (
          filteredHabits.map((habit) => {
            const isCompleted = habit.completedDates.includes(todayStr);
            const isAnimating = animatingId === habit.id;

            return (
              <div
                key={habit.id}
                className={`relative group p-4 rounded-2xl transition-all duration-300 flex items-center justify-between gap-4 border ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    : 'bg-slate-900/80 hover:bg-slate-900 border-blue-500/20 hover:border-cyan-500/40'
                }`}
              >
                {/* FLOATING XP ANIMATION POPUP */}
                {isAnimating && isCompleted && (
                  <div className="absolute top-2 right-12 z-20 animate-float-xp font-mono font-extrabold text-sm text-cyan-300 flex items-center gap-1 bg-cyan-950/90 px-3 py-1 rounded-full border border-cyan-400 shadow-xl">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    +{habit.xpValue} XP
                  </div>
                )}

                {/* Left Toggle & Title */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <button
                    onClick={() => handleToggle(habit.id)}
                    className="p-1 rounded-xl hover:scale-110 transition-transform text-cyan-400 focus:outline-none"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-500 hover:text-cyan-400" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`text-sm font-bold font-sans truncate ${isCompleted ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                        {habit.name}
                      </h3>
                      
                      {/* Difficulty Tag */}
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getDifficultyColor(habit.difficulty)}`}>
                        {habit.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono mt-1 flex-wrap">
                      <span className="text-cyan-400 font-semibold">{habit.category}</span>
                      {habit.target > 0 && (
                        <span>Target: {habit.target} {habit.targetUnit || 'Units'}</span>
                      )}
                      {habit.estimatedMinutes && (
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3 h-3 text-purple-400" />
                          {habit.estimatedMinutes}m
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Badges & Options */}
                <div className="flex items-center gap-3">
                  {/* Streak pill */}
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
                    <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{habit.streak}d</span>
                  </div>

                  {/* XP Tag */}
                  <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>+{habit.xpValue} XP</span>
                  </div>

                  {/* Menu button */}
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === habit.id ? null : habit.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {activeMenuId === habit.id && (
                      <div className="absolute right-0 mt-2 w-36 glass-modal rounded-xl p-1 shadow-2xl z-30 border border-slate-700 text-xs">
                        <button
                          onClick={() => { duplicateHabit(habit.id); setActiveMenuId(null); }}
                          className="w-full text-left px-3 py-1.5 text-slate-300 hover:bg-slate-800 rounded-lg flex items-center gap-2"
                        >
                          <Copy className="w-3.5 h-3.5 text-cyan-400" /> Duplicate
                        </button>
                        <button
                          onClick={() => { deleteHabit(habit.id); setActiveMenuId(null); }}
                          className="w-full text-left px-3 py-1.5 text-red-400 hover:bg-red-950/40 rounded-lg flex items-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-400" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
