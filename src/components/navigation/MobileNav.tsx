'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Target, 
  Trophy,
  BarChart3, 
  BookOpen, 
  User 
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();

  const mobileItems = [
    { name: 'HUD', href: '/', icon: LayoutDashboard },
    { name: 'Quests', href: '/habits', icon: CheckSquare },
    { name: 'Goals', href: '/goals', icon: Target },
    { name: 'Ranks', href: '/leaderboard', icon: Trophy },
    { name: 'Learning', href: '/learning', icon: BookOpen },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-0 right-0 z-50 px-4 pointer-events-none mb-safe">
      <nav className="pointer-events-auto max-w-md mx-auto glass-panel rounded-full border border-fuchsia-500/40 bg-[#0a0512]/95 backdrop-blur-2xl px-4 py-2.5 flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-1 rounded-xl transition-all ${
                isActive
                  ? 'text-fuchsia-400 font-bold scale-110'
                  : 'text-purple-300/50 hover:text-slate-200'
              }`}
            >
              <div className={`p-1.5 rounded-full ${isActive ? 'bg-fuchsia-500/20 shadow-[0_0_12px_rgba(217,70,239,0.6)]' : ''}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-mono leading-none">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
