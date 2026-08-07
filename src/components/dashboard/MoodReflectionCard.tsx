'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { SystemLog } from '@/types/system';
import { PenTool, CheckCircle2, Smile, Zap } from 'lucide-react';

export const MoodReflectionCard: React.FC = () => {
  const { systemLogs, saveDailyReflection } = useSystem();
  const todayStr = new Date().toISOString().split('T')[0];

  const todayLog = systemLogs[todayStr];
  const [selectedMood, setSelectedMood] = useState<SystemLog['mood']>(todayLog?.mood || 'Elite');
  const [reflectionText, setReflectionText] = useState(todayLog?.reflection || '');
  const [saved, setSaved] = useState(false);

  const moods: { label: SystemLog['mood']; emoji: string; color: string }[] = [
    { label: 'Elite', emoji: '⚔️', color: 'border-cyan-400 text-cyan-300 bg-cyan-500/20' },
    { label: 'Strong', emoji: '⚡', color: 'border-blue-400 text-blue-300 bg-blue-500/20' },
    { label: 'Steady', emoji: '🛡️', color: 'border-purple-400 text-purple-300 bg-purple-500/20' },
    { label: 'Fatigued', emoji: '🌧️', color: 'border-amber-400 text-amber-300 bg-amber-500/20' },
    { label: 'Battle Ready', emoji: '🔥', color: 'border-red-400 text-red-300 bg-red-500/20' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveDailyReflection(selectedMood, reflectionText);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-blue-500/20 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-100 font-mono">DAILY REFLECTION & MOOD</h3>
            <p className="text-xs text-slate-400">Log today&apos;s mental state & system insights.</p>
          </div>
        </div>
        <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1">
          <Zap className="w-3.5 h-3.5" /> +15 XP
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Mood Selector */}
        <div>
          <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">TODAY&apos;S BATTLE MOOD</label>
          <div className="grid grid-cols-5 gap-2">
            {moods.map((m) => (
              <button
                type="button"
                key={m.label}
                onClick={() => setSelectedMood(m.label)}
                className={`p-2 rounded-xl border text-center font-mono text-xs transition-all flex flex-col items-center gap-1 ${
                  selectedMood === m.label ? m.color + ' font-bold scale-105 shadow-md' : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="text-base">{m.emoji}</span>
                <span className="text-[10px] hidden sm:inline">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reflection Input */}
        <div>
          <label className="block text-[11px] font-mono text-slate-400 mb-1 uppercase">SYSTEM INSIGHTS & LESSONS</label>
          <textarea
            rows={2}
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="What went exceptionally well today? What will you optimize tomorrow?"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-blue-500/20 text-slate-100 text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 text-xs shadow-lg shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              SYSTEM REFLECTION SAVED (+15 XP)
            </>
          ) : (
            'SAVE DAILY REFLECTION'
          )}
        </button>
      </form>
    </div>
  );
};
