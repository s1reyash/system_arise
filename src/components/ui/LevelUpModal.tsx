'use client';

import React, { useEffect } from 'react';
import { useSystem } from '@/context/SystemContext';
import { Shield, Sparkles, Crown, Zap, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LevelUpModal: React.FC = () => {
  const { levelUpModalData, closeLevelUpModal } = useSystem();

  useEffect(() => {
    if (levelUpModalData?.show) {
      // Trigger Confetti Burst
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#a855f7', '#3b82f6', '#f59e0b']
        });
      } catch {
        // Confetti fallback
      }
    }
  }, [levelUpModalData]);

  if (!levelUpModalData?.show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-lg glass-modal rounded-3xl p-6 sm:p-8 text-center border-2 border-cyan-400 shadow-[0_0_80px_rgba(0,240,255,0.4)]">
        
        {/* Glow Halo Background */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Level Up Badge Icon */}
        <div className="relative mx-auto mb-6 w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 p-1 shadow-2xl shadow-cyan-500/50 animate-bounce">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            {levelUpModalData.newLevel >= 70 ? (
              <Crown className="w-12 h-12 text-amber-400 animate-pulse" />
            ) : (
              <Zap className="w-12 h-12 text-cyan-400 animate-pulse" />
            )}
          </div>
        </div>

        {/* Title & Banner */}
        <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold uppercase tracking-widest mb-2">
          SYSTEM OVERRIDE DETECTED
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 tracking-tight">
          SYSTEM LEVEL UP!
        </h2>

        <p className="text-sm font-mono text-slate-300 mt-2">
          LVL <span className="text-slate-400 line-through mr-1">{levelUpModalData.oldLevel}</span>
          <span className="text-cyan-400 font-bold text-xl">➔ LVL {levelUpModalData.newLevel}</span>
        </p>

        {/* New Rank Card */}
        <div className="my-6 p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-cyan-500/30 flex items-center justify-between">
          <div className="text-left">
            <div className="text-[10px] font-mono text-slate-400 uppercase">NEW RANK TITLE</div>
            <div className="text-lg font-bold text-cyan-300 font-mono flex items-center gap-1.5">
              <Shield className="w-5 h-5 text-cyan-400" />
              {levelUpModalData.newTitle}
            </div>
          </div>
          <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
            PROMOTED
          </span>
        </div>

        {/* STAT BOOST BREAKDOWN */}
        <div className="space-y-2 text-left mb-6 font-mono text-xs">
          <div className="text-slate-400 text-[11px] mb-1 uppercase tracking-wider">STAT ATTRIBUTE BOOSTS UNLOCKED</div>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-blue-500/20 text-center">
              <div className="text-slate-400 text-[10px]">STRENGTH</div>
              <div className="text-cyan-400 font-bold text-sm">+10 PTS</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-blue-500/20 text-center">
              <div className="text-slate-400 text-[10px]">AGILITY</div>
              <div className="text-cyan-400 font-bold text-sm">+10 PTS</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-blue-500/20 text-center">
              <div className="text-slate-400 text-[10px]">DISCIPLINE</div>
              <div className="text-purple-400 font-bold text-sm">+10 PTS</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={closeLevelUpModal}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-bold text-slate-950 shadow-lg shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
        >
          <CheckCircle2 className="w-5 h-5" />
          ACCEPT LEVEL UP & CONTINUE QUEST
        </button>

      </div>
    </div>
  );
};
