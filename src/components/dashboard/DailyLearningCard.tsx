'use client';

import React from 'react';
import { useSystem } from '@/context/SystemContext';
import { BookOpen, Clock, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const DailyLearningCard: React.FC = () => {
  const { learningModules } = useSystem();
  const activeLesson = learningModules[0];

  if (!activeLesson) return null;

  return (
    <div className="glass-panel rounded-3xl p-6 border border-blue-500/20 bg-gradient-to-br from-slate-950 via-slate-900/90 to-blue-950/30 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">
              10% BETTER DAILY LESSON
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] border border-cyan-500/30">
          {activeLesson.category}
        </span>
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-100 font-sans">
          {activeLesson.title}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 mt-1 font-sans">
          {activeLesson.content}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            {activeLesson.readTimeMinutes} min read
          </span>
          <span className="flex items-center gap-1 text-cyan-400 font-bold">
            <Zap className="w-3.5 h-3.5" />
            +{activeLesson.xpReward} XP
          </span>
        </div>

        <Link
          href="/learning"
          className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30 transition-all flex items-center gap-1"
        >
          <span>{activeLesson.completed ? 'REVIEW LESSON' : 'READ & CLAIM XP'}</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
