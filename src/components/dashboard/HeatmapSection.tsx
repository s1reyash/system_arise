'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { Calendar as CalendarIcon, X, Zap, CheckCircle2, Flame, Smile } from 'lucide-react';

export const HeatmapSection: React.FC = () => {
  const { systemLogs, habits } = useSystem();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Generate 84 days (12 weeks) array ending today
  const today = new Date();
  const daysArray: { dateStr: string; dayNum: number; level: number; completedCount: number }[] = [];

  for (let i = 83; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    // Compute completed habits count on this date
    const countOnDate = habits.filter(h => h.completedDates.includes(dateStr)).length;
    let glowLevel = 0;
    if (countOnDate >= 5) glowLevel = 4;
    else if (countOnDate >= 3) glowLevel = 3;
    else if (countOnDate >= 2) glowLevel = 2;
    else if (countOnDate >= 1) glowLevel = 1;

    daysArray.push({
      dateStr,
      dayNum: d.getDate(),
      level: glowLevel,
      completedCount: countOnDate
    });
  }

  const getSquareColor = (level: number) => {
    switch (level) {
      case 4: return 'bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.8)] border-cyan-300';
      case 3: return 'bg-cyan-500/80 shadow-[0_0_6px_rgba(0,240,255,0.5)] border-cyan-400/60';
      case 2: return 'bg-blue-600/70 border-blue-500/50';
      case 1: return 'bg-blue-900/60 border-blue-800/40';
      default: return 'bg-slate-900 border-slate-800/80';
    }
  };

  const selectedLog = selectedDate ? systemLogs[selectedDate] : null;
  const habitsDoneOnSelected = selectedDate
    ? habits.filter(h => h.completedDates.includes(selectedDate))
    : [];

  return (
    <div className="glass-panel rounded-3xl p-6 border border-blue-500/20 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-100 font-mono">SOVEREIGN SYSTEM HEATMAP</h2>
            <p className="text-xs text-slate-400">GitHub-style activity matrix. Click any day square to inspect system logs.</p>
          </div>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
          <span>Less</span>
          <div className="w-3 h-3 rounded bg-slate-900 border border-slate-800" />
          <div className="w-3 h-3 rounded bg-blue-900/60 border border-blue-800/40" />
          <div className="w-3 h-3 rounded bg-blue-600/70 border border-blue-500/50" />
          <div className="w-3 h-3 rounded bg-cyan-500/80 border border-cyan-400/60" />
          <div className="w-3 h-3 rounded bg-cyan-400 border border-cyan-300 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
          <span>More</span>
        </div>
      </div>

      {/* HEATMAP GRID */}
      <div className="overflow-x-auto pb-2 pt-2">
        <div className="grid grid-rows-7 grid-flow-col gap-2 min-w-[640px]">
          {daysArray.map((item) => (
            <button
              key={item.dateStr}
              onClick={() => setSelectedDate(item.dateStr)}
              className={`w-5 h-5 rounded-md border transition-all duration-200 hover:scale-125 hover:z-10 focus:outline-none ${getSquareColor(item.level)}`}
              title={`${item.dateStr}: ${item.completedCount} quests completed`}
            />
          ))}
        </div>
      </div>

      {/* DAILY SYSTEM LOG MODAL / DRAWER */}
      {selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-md glass-modal rounded-3xl p-6 border border-cyan-500/40 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">SYSTEM DAILY LOG</div>
                <h3 className="text-lg font-bold text-slate-100 font-mono">{selectedDate}</h3>
              </div>
              <button onClick={() => setSelectedDate(null)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Log Details */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-blue-500/20">
                <span className="text-slate-400">Quests Completed:</span>
                <span className="text-emerald-400 font-bold">{habitsDoneOnSelected.length} Habits</span>
              </div>

              {selectedLog?.mood && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-blue-500/20">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Smile className="w-4 h-4 text-purple-400" /> Logged Mood:
                  </span>
                  <span className="text-purple-300 font-bold">{selectedLog.mood}</span>
                </div>
              )}

              {/* Completed Quests List */}
              <div>
                <div className="text-[11px] text-slate-400 uppercase mb-2">QUESTS EXECUTED ON THIS DAY</div>
                {habitsDoneOnSelected.length === 0 ? (
                  <p className="text-slate-500 text-xs italic">No habits logged on this date.</p>
                ) : (
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {habitsDoneOnSelected.map(h => (
                      <div key={h.id} className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span className="text-slate-200 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          {h.name}
                        </span>
                        <span className="text-cyan-400 font-bold">+{h.xpValue} XP</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedLog?.reflection && (
                <div className="p-3 rounded-xl bg-slate-900/90 border border-purple-500/30 text-slate-300">
                  <div className="text-[10px] text-purple-400 uppercase mb-1">DAILY REFLECTION JOURNAL</div>
                  <p className="italic font-sans text-xs">{selectedLog.reflection}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedDate(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800"
            >
              CLOSE LOG
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
