'use client';

import './globals.css';
import { SystemProvider, useSystem } from '@/context/SystemContext';
import { Navbar } from '@/components/ui/Navbar';
import { Sidebar } from '@/components/navigation/Sidebar';
import { MobileNav } from '@/components/navigation/MobileNav';
import { LevelUpModal } from '@/components/ui/LevelUpModal';
import { SystemAwakeningOnboarding } from '@/components/auth/SystemAwakeningOnboarding';

function AppShell({ children }: { children: React.ReactNode }) {
  const { hasCompletedOnboarding, completeOnboarding } = useSystem();

  return (
    <div className="flex flex-col min-h-screen">
      {!hasCompletedOnboarding && (
        <SystemAwakeningOnboarding onComplete={completeOnboarding} />
      )}
      <Navbar />
      <div className="flex flex-1 max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 pb-32 md:pb-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <MobileNav />
      <LevelUpModal />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>SYSTEM: ARISE — Solo Leveling Inspired Productivity OS</title>
        <meta name="description" content="A premium, gamified productivity operating system built to make users addicted to self-improvement." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta property="og:title" content="SYSTEM: ARISE — Solo Leveling Productivity OS" />
        <meta property="og:description" content="Level up your life with daily quests, habits, hunter ranks, and AI personalization." />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#1b0c1a" />
      </head>
      <body className="bg-bg-dark text-slate-100 min-h-screen font-sans selection:bg-fuchsia-500 selection:text-slate-950">
        <SystemProvider>
          <AppShell>{children}</AppShell>
        </SystemProvider>
      </body>
    </html>
  );
}
