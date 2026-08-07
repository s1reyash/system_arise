'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { 
  Zap, 
  Flame, 
  Volume2, 
  VolumeX, 
  Bell, 
  User, 
  Shield, 
  Crown, 
  Sparkles,
  X,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const { 
    userStats, 
    userProfile, 
    soundEnabled, 
    toggleSound, 
    notifications, 
    dismissNotification 
  } = useSystem();

  const [showNotifs, setShowNotifs] = useState(false);

  const xpProgressPct = Math.min(100, Math.round((userStats.currentXP / userStats.nextLevelXP) * 100));
  const unreadNotifs = notifications.filter(n => !n.read);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-purple-500/25 bg-[#0a0512]/90 backdrop-blur-xl overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 flex-nowrap overflow-x-hidden">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-600 p-0.5 shadow-lg shadow-fuchsia-500/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0d0718] rounded-[10px] flex items-center justify-center">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-wider text-base sm:text-lg bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 font-mono">
                ARISE
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 font-bold hidden sm:inline-block">
                v2.5
              </span>
            </div>
            <p className="text-[9px] text-purple-300/60 font-mono hidden md:block">MONARCH PRODUCTIVITY OS</p>
          </div>
        </Link>

        {/* DESKTOP STATS & PROGRESS BAR */}
        <div className="flex-1 max-w-md hidden md:flex items-center gap-3 bg-[#130b24]/70 rounded-xl p-2 border border-purple-500/20">
          {/* Rank Badge */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/30">
            {userStats.level >= 70 ? (
              <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
            ) : (
              <Shield className="w-4 h-4 text-fuchsia-400" />
            )}
            <div>
              <div className="text-[9px] font-mono uppercase tracking-wider text-purple-300/60">RANK</div>
              <div className="text-xs font-bold text-fuchsia-300 whitespace-nowrap">
                {userStats.rankTitle}
              </div>
            </div>
          </div>

          {/* XP Bar */}
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span className="text-slate-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-fuchsia-400" />
                LVL <span className="text-fuchsia-400 font-bold">{userStats.level}</span>
              </span>
              <span className="text-purple-300/70 text-[10px]">
                {userStats.currentXP} / {userStats.nextLevelXP} XP ({xpProgressPct}%)
              </span>
            </div>
            <div className="w-full h-2 bg-[#090412] rounded-full overflow-hidden p-0.5 border border-purple-500/25">
              <div 
                className="h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(217,70,239,0.8)]"
                style={{ width: `${xpProgressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* CONSOLIDATED HUD CONTROLS */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Streak Indicator */}
          <div className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] sm:text-xs font-bold shadow-[0_0_10px_rgba(245,158,11,0.2)]">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{userStats.currentStreak}D</span>
          </div>

          {/* CLUBBED QUICK CONTROLS PILL (SOUND + NOTIFICATIONS) */}
          <div className="flex items-center p-1 rounded-xl bg-[#130b24] border border-purple-500/30 gap-1">
            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-1.5 rounded-lg hover:bg-purple-900/40 text-slate-300 hover:text-fuchsia-400 transition-all"
              title={soundEnabled ? 'Disable Audio' : 'Enable Audio'}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fuchsia-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
              )}
            </button>

            <div className="w-[1px] h-4 bg-purple-900/50" />

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="p-1.5 rounded-lg hover:bg-purple-900/40 text-slate-300 hover:text-fuchsia-400 transition-all relative"
                title="System Alerts"
              >
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-fuchsia-500 text-slate-950 text-[9px] font-bold flex items-center justify-center animate-pulse">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {/* Notification Popup */}
              {showNotifs && (
                <div className="absolute right-0 mt-3 w-72 sm:w-80 glass-modal rounded-2xl p-4 shadow-2xl z-50 border border-fuchsia-500/35">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-purple-900/40">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-fuchsia-400" />
                      <span className="font-mono font-bold text-xs text-slate-200 uppercase tracking-wider">SYSTEM LOG ALERTS</span>
                    </div>
                    <button onClick={() => setShowNotifs(false)} className="text-slate-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-4">No recent notifications.</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="p-2.5 rounded-xl bg-[#130b24] border border-purple-500/20 flex items-start justify-between gap-2">
                          <div>
                            <div className="text-xs font-bold text-fuchsia-300 flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                              {n.title}
                            </div>
                            <p className="text-[11px] text-slate-300 mt-0.5">{n.message}</p>
                            <span className="text-[9px] text-purple-300/50 font-mono">{n.timestamp}</span>
                          </div>
                          <button onClick={() => dismissNotification(n.id)} className="text-slate-500 hover:text-red-400 p-0.5">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Profile Trigger */}
          <Link href="/profile" className="flex items-center gap-2 pl-1 border-l border-purple-900/40 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-600 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[10px] overflow-hidden bg-[#0d0718] flex items-center justify-center">
                {userProfile.avatar ? (
                  /* eslint-disable-next-next/no-img-element */
                  <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-fuchsia-400" />
                )}
              </div>
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-200 group-hover:text-fuchsia-300 transition-colors">
                {userProfile.displayName}
              </div>
              <div className="text-[10px] text-purple-300/60 font-mono">
                LVL {userStats.level} • {userStats.rankTitle}
              </div>
            </div>
          </Link>

        </div>

      </div>
    </header>
  );
};
