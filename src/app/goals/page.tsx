'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { Target, Plus, CheckSquare, Calendar, Clock, Trophy, Trash2, CheckCircle2, Circle, X } from 'lucide-react';
import { GoalCategory } from '@/types/system';

export default function GoalsPage() {
  const { goals, addGoal, toggleMilestone, deleteGoal } = useSystem();
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<GoalCategory>('Short Term');
  const [deadline, setDeadline] = useState('2026-12-31');
  const [milestonesInput, setMilestonesInput] = useState('Step 1\nStep 2\nStep 3');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const msArray = milestonesInput
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map((line, idx) => ({
        id: 'm_' + idx + '_' + Date.now(),
        title: line.trim(),
        completed: false
      }));

    addGoal({
      title,
      description,
      category,
      priority: 'High',
      deadline,
      milestones: msArray
    });

    setTitle('');
    setDescription('');
    setIsAddGoalOpen(false);
  };

  const getRemainingDays = (deadlineStr: string) => {
    const today = new Date();
    const due = new Date(deadlineStr);
    const diff = due.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    return days > 0 ? `${days} Days Left` : 'Deadline Passed';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-purple-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[10px] border border-purple-500/30 font-bold uppercase">
              MAJOR OBJECTIVES & QUESTS
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 font-mono mt-1">
            GOALS & TARGET MASTER
          </h1>
          <p className="text-xs text-slate-400">
            Define short-term & long-term sovereign goals with milestone tracking.
          </p>
        </div>

        <button
          onClick={() => setIsAddGoalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 font-bold text-slate-950 text-xs shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          LOG NEW GOAL
        </button>
      </div>

      {/* GOALS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const remainingText = getRemainingDays(goal.deadline);

          return (
            <div
              key={goal.id}
              className="glass-panel rounded-3xl p-6 border border-purple-500/20 bg-gradient-to-br from-slate-950 via-slate-900/90 to-purple-950/20 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[10px] border border-purple-500/30 font-bold">
                    {goal.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{goal.deadline}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-100 font-sans">{goal.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{goal.description}</p>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300">Milestone Progress</span>
                    <span className="text-cyan-300 font-bold">{goal.completionPercentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-purple-500/20">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                      style={{ width: `${goal.completionPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Milestones Checklist */}
                <div className="space-y-2 pt-2">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">KEY MILESTONES</div>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {goal.milestones.map(m => (
                      <button
                        key={m.id}
                        onClick={() => toggleMilestone(goal.id, m.id)}
                        className="w-full p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-left flex items-center gap-2 text-xs font-mono transition-colors"
                      >
                        {m.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                        <span className={m.completed ? 'line-through text-slate-400' : 'text-slate-200'}>
                          {m.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono">
                <span className="text-purple-300 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {remainingText}
                </span>

                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800"
                  title="Delete Goal"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* CREATE GOAL MODAL */}
      {isAddGoalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-lg glass-modal rounded-3xl p-6 border border-purple-500/40 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-slate-100 font-mono">NEW GOAL PROTOCOL</h3>
              </div>
              <button onClick={() => setIsAddGoalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">GOAL TITLE *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Master Full-Stack AI & Reach Level 50"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-purple-500/20 text-slate-100 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">DESCRIPTION</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="High-level description of success..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-purple-500/20 text-slate-100 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">CATEGORY</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as GoalCategory)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-purple-500/20 text-slate-100 text-xs font-mono"
                  >
                    <option value="Short Term">Short Term</option>
                    <option value="Long Term">Long Term</option>
                    <option value="Life">Life</option>
                    <option value="Financial">Financial</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Career">Career</option>
                    <option value="Learning">Learning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">TARGET DEADLINE</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900/90 border border-purple-500/20 text-slate-100 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">MILESTONES (ONE PER LINE)</label>
                <textarea
                  rows={3}
                  value={milestonesInput}
                  onChange={(e) => setMilestonesInput(e.target.value)}
                  placeholder="Milestone 1&#10;Milestone 2&#10;Milestone 3"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-purple-500/20 text-slate-100 text-xs font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddGoalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 text-xs font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 font-bold text-slate-950 text-xs shadow-lg shadow-purple-500/30"
                >
                  ACTIVATE GOAL
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
