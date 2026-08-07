'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Target, 
  BarChart3, 
  BookOpen, 
  FileText, 
  User, 
  Settings,
  Sparkles,
  ChevronRight,
  KeyRound,
  Shield,
  Trophy
} from 'lucide-react';
import { useSystem } from '@/context/SystemContext';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { userStats } = useSystem();

  const navItems = [
    { name: 'System HUD', href: '/', icon: LayoutDashboard },
    { name: 'Login Portal', href: '/auth', icon: KeyRound },
    { name: 'Daily Quests', href: '/habits', icon: CheckSquare },
    { name: 'Goals & Targets', href: '/goals', icon: Target },
    { name: 'Rankboard & Guilds', href: '/leaderboard', icon: Trophy },
    { name: 'System Intelligence', href: '/analytics', icon: BarChart3 },
    { name: '10% Daily Learning', href: '/learning', icon: BookOpen },
    { name: 'System Journal', href: '/notes', icon: FileText },
    { name: 'Hunter Status', href: '/profile', icon: User },
    { name: 'System Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 glass-panel border-r border-purple-500/25 bg-[#0a0512]/80 p-4 sticky top-16 h-[calc(100vh-4rem)] z-30 justify-between">
      <div>
        <div className="px-3 py-2 mb-4 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/25">
          <div className="flex items-center gap-2 text-fuchsia-400 font-mono text-xs font-bold">
            <Shield className="w-4 h-4" />
            <span>HUNTER SYSTEM ACTIVE</span>
          </div>
          <p className="text-[11px] text-purple-300/60 mt-1">Disciplined Mind, Sovereign Strength.</p>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-fuchsia-500/20 to-purple-600/20 text-fuchsia-300 border border-fuchsia-500/40 shadow-[0_0_15px_rgba(217,70,239,0.15)] font-bold'
                    : 'text-purple-200/60 hover:text-slate-100 hover:bg-[#150a2b] hover:border-purple-900/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-fuchsia-400' : 'text-purple-300/50 group-hover:text-purple-200'}`} />
                  <span>{item.name}</span>
                </div>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-fuchsia-400 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* HUNTER RANK FOOTER CARD */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#130b24] via-[#1a0c35] to-purple-950/60 border border-purple-500/35">
        <div className="flex items-center justify-between text-xs font-mono text-purple-300 mb-1">
          <span className="flex items-center gap-1 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            {userStats.rankTitle}
          </span>
          <span className="text-fuchsia-400 font-bold">LVL {userStats.level}</span>
        </div>
        <p className="text-[10px] text-purple-300/60 leading-tight">
          Current XP: {userStats.currentXP} / {userStats.nextLevelXP}
        </p>
        <div className="w-full h-1.5 bg-[#090412] rounded-full overflow-hidden mt-2 border border-purple-500/20">
          <div
            className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_8px_rgba(217,70,239,0.8)]"
            style={{ width: `${Math.min(100, (userStats.currentXP / userStats.nextLevelXP) * 100)}%` }}
          />
        </div>
      </div>
    </aside>
  );
};
