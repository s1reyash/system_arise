'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { HabitCategory, DifficultyRank, FrequencyType } from '@/types/system';
import { X, Plus, Sparkles, Swords } from 'lucide-react';

interface QuickAddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickAddHabitModal: React.FC<QuickAddHabitModalProps> = ({ isOpen, onClose }) => {
  const { addHabit } = useSystem();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<HabitCategory>('Fitness');
  const [difficulty, setDifficulty] = useState<DifficultyRank>('C-Rank');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('High');
  const [target, setTarget] = useState(1);
  const [targetUnit, setTargetUnit] = useState('Session');
  const [frequency, setFrequency] = useState<FrequencyType>('Daily');
  const [reminderTime, setReminderTime] = useState('08:00');
  const [estimatedMinutes, setEstimatedMinutes] = useState(30);
  const [xpValue, setXpValue] = useState(25);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addHabit({
      name,
      category,
      difficulty,
      priority,
      color: difficulty === 'S-Rank' ? '#a855f7' : difficulty === 'A-Rank' ? '#ef4444' : '#00f0ff',
      icon: 'Target',
      target: Number(target),
      targetUnit,
      frequency,
      reminderTime,
      estimatedMinutes: Number(estimatedMinutes),
      actualMinutes: Number(estimatedMinutes),
      notes,
      tags: [category, difficulty],
      customReward: `+${xpValue} XP Sovereign Energy`,
      archived: false,
      paused: false,
      xpValue: Number(xpValue)
    });

    // Reset & Close
    setName('');
    setNotes('');
    onClose();
  };

  const categories: HabitCategory[] = [
    'Fitness', 'Study', 'Meditation', 'Reading', 'Coding', 'AI Learning',
    'Business', 'Finance', 'Health', 'Nutrition', 'Running', 'Workout',
    'Journaling', 'Language Learning', 'Relationships', 'Career', 'Personal Development'
  ];

  const difficulties: { rank: DifficultyRank; xp: number }[] = [
    { rank: 'E-Rank', xp: 10 },
    { rank: 'D-Rank', xp: 15 },
    { rank: 'C-Rank', xp: 25 },
    { rank: 'B-Rank', xp: 35 },
    { rank: 'A-Rank', xp: 50 },
    { rank: 'S-Rank', xp: 75 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-xl glass-modal rounded-3xl p-6 border border-cyan-500/40 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-100 font-mono">INITIALIZE NEW QUEST</h3>
              <p className="text-xs text-slate-400">Add a new daily habit to your Sovereign Protocol.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">QUEST NAME *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Read 20 Pages of High-Value Books"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-blue-500/20 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as HabitCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-blue-500/20 text-slate-100 text-sm focus:outline-none focus:border-cyan-400"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">DIFFICULTY RANK</label>
              <select
                value={difficulty}
                onChange={(e) => {
                  const d = e.target.value as DifficultyRank;
                  setDifficulty(d);
                  const found = difficulties.find(item => item.rank === d);
                  if (found) setXpValue(found.xp);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-blue-500/20 text-slate-100 text-sm focus:outline-none focus:border-cyan-400"
              >
                {difficulties.map(d => (
                  <option key={d.rank} value={d.rank}>{d.rank} (+{d.xp} XP)</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">TARGET</label>
              <input
                type="number"
                min="1"
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-blue-500/20 text-slate-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">UNIT</label>
              <input
                type="text"
                value={targetUnit}
                onChange={(e) => setTargetUnit(e.target.value)}
                placeholder="Pages / Mins"
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-blue-500/20 text-slate-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">XP REWARD</label>
              <input
                type="number"
                value={xpValue}
                onChange={(e) => setXpValue(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-cyan-300 font-bold text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">FREQUENCY</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as FrequencyType)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-blue-500/20 text-slate-100 text-sm"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">REMINDER TIME</label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-blue-500/20 text-slate-100 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">QUEST DIRECTIVES & NOTES</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Detailed instructions or rules for executing this habit..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-blue-500/20 text-slate-100 text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 text-xs font-bold hover:text-white"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 text-xs shadow-lg shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              CONFIRM & ACTIVATE QUEST
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
