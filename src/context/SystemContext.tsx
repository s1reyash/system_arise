'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Habit,
  Goal,
  DailyLearning,
  DailyQuote,
  Achievement,
  SystemNote,
  SystemLog,
  UserProfile,
  UserStats,
  HunterRankTitle,
  NotificationAlert,
  ThemeSettings,
  ThemePreset,
  FontStyleOption,
  AppMode,
  GlowIntensity,
  UserDomain
} from '@/types/system';

import { soundEngine } from '@/lib/sound-engine';
import { INITIAL_ACHIEVEMENTS } from '@/lib/achievements-data';
import { INITIAL_DAILY_LEARNING } from '@/lib/learning-data';
import { INITIAL_QUOTES } from '@/lib/quotes-data';

interface SystemContextType {
  // Auth, Profile, Theme & Onboarding
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  userProfile: UserProfile;
  userStats: UserStats;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateThemeSettings: (updates: Partial<ThemeSettings>) => void;
  login: (email: string, pass: string) => void;
  signup: (username: string, email: string, pass: string) => void;
  googleLogin: () => void;
  logout: () => void;

  // Habits
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak' | 'longestStreak'>) => void;
  toggleHabitToday: (habitId: string) => void;
  editHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  archiveHabit: (id: string) => void;
  pauseHabit: (id: string) => void;
  duplicateHabit: (id: string) => void;

  // Goals
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'completionPercentage'>) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;
  deleteGoal: (id: string) => void;

  // Learning & Quotes
  learningModules: DailyLearning[];
  quotes: DailyQuote[];
  activeQuote: DailyQuote;
  toggleQuoteFavorite: (id: string) => void;
  getRandomQuote: () => void;
  completeLearningModule: (id: string) => void;

  // System Notes & Logs
  notes: SystemNote[];
  addNote: (title: string, content: string, folder?: string, tags?: string[]) => void;
  updateNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
  togglePinNote: (id: string) => void;

  systemLogs: Record<string, SystemLog>;
  saveDailyReflection: (mood: SystemLog['mood'], reflection: string) => void;

  // Achievements
  achievements: Achievement[];

  // Sound & Level Up Modal
  soundEnabled: boolean;
  toggleSound: () => void;
  levelUpModalData: { show: boolean; oldLevel: number; newLevel: number; newTitle: HunterRankTitle } | null;
  closeLevelUpModal: () => void;

  // Notifications
  notifications: NotificationAlert[];
  dismissNotification: (id: string) => void;
  addNotification: (title: string, message: string, type?: NotificationAlert['type']) => void;

  // Export / Import Sync
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  preset: 'Sakura Cherry Monarch',
  mode: 'dark',
  fontStyle: 'Sans (Sovereign)',
  glassOpacity: 0.85,
  glassBlur: 20,
  glowIntensity: 'Medium'
};

const STARTER_LEVEL_ZERO_HABITS: Habit[] = [
  {
    id: 'h_start_1',
    name: 'Hydrate & Electrolyte Flush',
    category: 'Nutrition',
    difficulty: 'E-Rank',
    priority: 'Medium',
    color: '#fadcd5',
    icon: 'Droplets',
    target: 2,
    targetUnit: 'Liters',
    frequency: 'Daily',
    reminderTime: '08:00',
    estimatedMinutes: 5,
    actualMinutes: 5,
    notes: 'Drink 1L immediately upon waking for optimal brain hydration.',
    tags: ['Health', 'Daily'],
    customReward: '+5 XP Hydration Shield',
    streak: 0,
    longestStreak: 0,
    completedDates: [],
    archived: false,
    paused: false,
    xpValue: 5,
    createdAt: new Date().toISOString().split('T')[0]
  },
  {
    id: 'h_start_2',
    name: 'Monarch Morning Awakening (5:30 AM)',
    category: 'Personal Development',
    difficulty: 'B-Rank',
    priority: 'High',
    color: '#6d3c52',
    icon: 'Sun',
    target: 1,
    targetUnit: 'Awakening',
    frequency: 'Daily',
    reminderTime: '05:30',
    estimatedMinutes: 1,
    notes: 'Out of bed instantly on first alarm. Zero snooze button.',
    tags: ['Discipline', 'Mindset'],
    customReward: '+20 XP Discipline Boost',
    streak: 0,
    longestStreak: 0,
    completedDates: [],
    archived: false,
    paused: false,
    xpValue: 20,
    createdAt: new Date().toISOString().split('T')[0]
  },
  {
    id: 'h_start_3',
    name: 'Sovereign Reading (30 Pages)',
    category: 'Reading',
    difficulty: 'C-Rank',
    priority: 'High',
    color: '#765d67',
    icon: 'BookOpen',
    target: 30,
    targetUnit: 'Pages',
    frequency: 'Daily',
    reminderTime: '21:00',
    estimatedMinutes: 30,
    notes: 'Read non-fiction, strategy, or high-value literature.',
    tags: ['Books', 'Wisdom'],
    customReward: '+25 XP Knowledge Elixir',
    streak: 0,
    longestStreak: 0,
    completedDates: [],
    archived: false,
    paused: false,
    xpValue: 25,
    createdAt: new Date().toISOString().split('T')[0]
  }
];

const DEFAULT_PROFILE: UserProfile = {
  id: 'hunter_01',
  username: 'AwakenedHunter',
  displayName: 'Awakened Hunter',
  email: 'hunter@system.arise',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  domain: 'General Hunter',
  age: 24,
  gender: 'Hunter',
  heightCm: 180,
  weightKg: 75,
  bmi: 23.1,
  missionStatement: 'I will break all limits, conquer every dungeon, and become the Sovereign of my own destiny.',
  currentGoal: 'Reach Level 1 Beginner Hunter Status',
  occupation: 'Sovereign Hunter',
  timezone: 'GMT+5:30 (India Standard Time)',
  dailyReminderTime: '08:00',
  themePreference: 'Sakura Cherry Monarch',
  themeSettings: DEFAULT_THEME_SETTINGS,
  language: 'English',
  notificationPreferences: {
    push: true,
    email: true,
    sound: true,
    haptics: true,
  }
};

const LEVEL_THRESHOLDS: { level: number; xp: number; title: HunterRankTitle }[] = [
  { level: 0, xp: 0, title: 'Awakened' },
  { level: 1, xp: 100, title: 'Beginner Hunter' },
  { level: 5, xp: 600, title: 'E-Rank Hunter' },
  { level: 10, xp: 1500, title: 'D-Rank Hunter' },
  { level: 20, xp: 4000, title: 'C-Rank Hunter' },
  { level: 35, xp: 8000, title: 'B-Rank Hunter' },
  { level: 50, xp: 15000, title: 'A-Rank Hunter' },
  { level: 70, xp: 25000, title: 'S-Rank Hunter' },
  { level: 100, xp: 50000, title: 'Monarch' },
];

export function calculateRankTitle(xp: number): { level: number; rankTitle: HunterRankTitle; nextLevelXP: number } {
  let currentLevel = 0;
  let title: HunterRankTitle = 'Awakened';
  let nextXP = 100;

  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i].xp) {
      title = LEVEL_THRESHOLDS[i].title;
      currentLevel = LEVEL_THRESHOLDS[i].level + Math.floor((xp - LEVEL_THRESHOLDS[i].xp) / 100);
      const nextThreshold = LEVEL_THRESHOLDS[i + 1];
      nextXP = nextThreshold ? nextThreshold.xp : (currentLevel + 1) * 500;
    }
  }

  return { level: currentLevel, rankTitle: title, nextLevelXP: nextXP };
}

export function calculateBMI(heightCm: number, weightKg: number): number {
  if (!heightCm || !weightKg) return 22.0;
  const meters = heightCm / 100;
  return parseFloat((weightKg / (meters * meters)).toFixed(1));
}

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [totalXP, setTotalXP] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const [habits, setHabits] = useState<Habit[]>(STARTER_LEVEL_ZERO_HABITS);
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 'g_1',
      title: 'Achieve Level 1 Beginner Hunter Status',
      description: 'Accumulate 100 total XP by executing daily quests.',
      category: 'Career',
      priority: 'High',
      deadline: '2026-12-31',
      completionPercentage: 0,
      createdAt: new Date().toISOString().split('T')[0],
      milestones: [
        { id: 'm1', title: 'Complete first hydration habit (+5 XP)', completed: false },
        { id: 'm2', title: 'Complete morning awakening (+20 XP)', completed: false },
        { id: 'm3', title: 'Reach Level 1 (100 XP)', completed: false }
      ]
    }
  ]);

  const [learningModules, setLearningModules] = useState<DailyLearning[]>(INITIAL_DAILY_LEARNING);
  const [quotes, setQuotes] = useState<DailyQuote[]>(INITIAL_QUOTES);
  const [activeQuote, setActiveQuote] = useState<DailyQuote>(INITIAL_QUOTES[0]);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  const [notes, setNotes] = useState<SystemNote[]>([]);
  const [systemLogs, setSystemLogs] = useState<Record<string, SystemLog>>({});

  const [levelUpModalData, setLevelUpModalData] = useState<{ show: boolean; oldLevel: number; newLevel: number; newTitle: HunterRankTitle } | null>(null);

  const [notifications, setNotifications] = useState<NotificationAlert[]>([
    {
      id: 'n_1',
      title: '⚔️ System Quest Initialized',
      message: 'Welcome Hunter. Your Daily Quests are ready for execution.',
      timestamp: 'Just now',
      type: 'system',
      read: false
    }
  ]);

  const applyThemeToDOM = (settings: ThemeSettings) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.setAttribute('data-theme', settings.preset);
      root.setAttribute('data-mode', settings.mode);
      
      let fontStack = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      if (settings.fontStyle.includes('Mono')) {
        fontStack = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      } else if (settings.fontStyle.includes('Serif')) {
        fontStack = 'Georgia, Cambria, "Times New Roman", Times, serif';
      }
      root.style.setProperty('--font-family-app', fontStack);
      root.style.setProperty('--glass-blur', `${settings.glassBlur}px`);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('SYSTEM_ARISE_STATE');
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          if (parsed.userProfile) {
            const profileWithDefaults = {
              ...DEFAULT_PROFILE,
              ...parsed.userProfile,
              themeSettings: { ...DEFAULT_THEME_SETTINGS, ...(parsed.userProfile.themeSettings || {}) }
            };
            setUserProfile(profileWithDefaults);
            applyThemeToDOM(profileWithDefaults.themeSettings);
          } else {
            applyThemeToDOM(DEFAULT_THEME_SETTINGS);
          }
          if (parsed.totalXP !== undefined) setTotalXP(parsed.totalXP);
          if (parsed.habits) setHabits(parsed.habits);
          if (parsed.goals) setGoals(parsed.goals);
          if (parsed.learningModules) setLearningModules(parsed.learningModules);
          if (parsed.quotes) setQuotes(parsed.quotes);
          if (parsed.achievements) setAchievements(parsed.achievements);
          if (parsed.notes) setNotes(parsed.notes);
          if (parsed.systemLogs) setSystemLogs(parsed.systemLogs);
          if (parsed.hasCompletedOnboarding !== undefined) setHasCompletedOnboarding(parsed.hasCompletedOnboarding);
          if (parsed.isAuthenticated !== undefined) setIsAuthenticated(parsed.isAuthenticated);
        } catch {
          applyThemeToDOM(DEFAULT_THEME_SETTINGS);
        }
      } else {
        applyThemeToDOM(DEFAULT_THEME_SETTINGS);
      }
    }
  }, []);

  const saveToLocalStorage = (stateUpdates: Record<string, unknown>) => {
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem('SYSTEM_ARISE_STATE');
      const current = existing ? JSON.parse(existing) : {};
      localStorage.setItem('SYSTEM_ARISE_STATE', JSON.stringify({ ...current, ...stateUpdates }));
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const { level, rankTitle, nextLevelXP } = calculateRankTitle(totalXP);

  const completedTodayCount = habits.filter(h => h.completedDates.includes(todayStr)).length;
  const totalActiveHabits = habits.filter(h => !h.archived).length;
  const missedTodayCount = Math.max(0, totalActiveHabits - completedTodayCount);
  const completionRateToday = totalActiveHabits > 0 ? Math.round((completedTodayCount / totalActiveHabits) * 100) : 0;

  const currentStreak = habits.length > 0 ? Math.max(...habits.map(h => h.streak), 0) : 0;
  const longestStreak = habits.length > 0 ? Math.max(...habits.map(h => h.longestStreak), 0) : 0;

  const userStats: UserStats = {
    level,
    currentXP: totalXP,
    nextLevelXP,
    currentStreak,
    longestStreak,
    rankTitle,
    attributePoints: {
      strength: Math.min(100, 10 + level * 2 + completedTodayCount * 3),
      agility: Math.min(100, 10 + currentStreak * 2),
      intelligence: Math.min(100, 15 + learningModules.filter(m => m.completed).length * 5),
      discipline: Math.min(100, 10 + completionRateToday),
      vitality: Math.min(100, 20 + level)
    },
    totalHabits: habits.length,
    completedHabitsToday: completedTodayCount,
    missedHabitsToday: missedTodayCount,
    completionRateToday
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
    setIsAuthenticated(true);
    saveToLocalStorage({ hasCompletedOnboarding: true, isAuthenticated: true });
    addNotification('Awakening Complete', 'Your Level 0 Hunter System has been initialized.', 'system');
  };

  const updateThemeSettings = (updates: Partial<ThemeSettings>) => {
    setUserProfile(prev => {
      const nextSettings = { ...prev.themeSettings, ...updates };
      const nextProfile = {
        ...prev,
        themePreference: nextSettings.preset,
        themeSettings: nextSettings
      };
      applyThemeToDOM(nextSettings);
      saveToLocalStorage({ userProfile: nextProfile });
      return nextProfile;
    });
    soundEngine.playClick();
    addNotification('Theme System Updated', `Applied theme: ${updates.preset || 'Custom aesthetic'}`, 'system');
  };

  const addXP = (amount: number, reasonTitle: string) => {
    setTotalXP(prevXP => {
      const oldRank = calculateRankTitle(prevXP);
      const newXP = Math.max(0, prevXP + amount);
      const newRank = calculateRankTitle(newXP);

      if (newRank.level > oldRank.level) {
        soundEngine.playLevelUp();
        setLevelUpModalData({
          show: true,
          oldLevel: oldRank.level,
          newLevel: newRank.level,
          newTitle: newRank.rankTitle
        });
        addNotification('👑 SYSTEM LEVEL UP!', `Congratulations Hunter! You have ascended to Level ${newRank.level} [${newRank.rankTitle}].`, 'level');
      } else if (amount > 0) {
        soundEngine.playXpGain();
      }

      saveToLocalStorage({ totalXP: newXP });
      return newXP;
    });

    if (amount > 0) {
      addNotification(`+${amount} XP GAINED`, reasonTitle, 'quest');
    }
  };

  const addNotification = (title: string, message: string, type: NotificationAlert['type'] = 'system') => {
    const newNotif: NotificationAlert = {
      id: 'notif_' + Date.now(),
      title,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 20)]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const toggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    soundEngine.enabled = nextVal;
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const nextProfile = { ...prev, ...updates };
      if (updates.heightCm || updates.weightKg) {
        nextProfile.bmi = calculateBMI(nextProfile.heightCm, nextProfile.weightKg);
      }
      saveToLocalStorage({ userProfile: nextProfile });
      return nextProfile;
    });
    soundEngine.playClick();
  };

  const login = (email: string, pass: string) => {
    setIsAuthenticated(true);
    setHasCompletedOnboarding(true);
    updateProfile({ email });
    saveToLocalStorage({ isAuthenticated: true, hasCompletedOnboarding: true });
    addNotification('Hunter Authenticated', `Welcome back, Hunter ${userProfile.displayName}.`, 'system');
  };

  const signup = (username: string, email: string, pass: string) => {
    setIsAuthenticated(true);
    setHasCompletedOnboarding(true);
    updateProfile({ username, displayName: username, email });
    saveToLocalStorage({ isAuthenticated: true, hasCompletedOnboarding: true });
    addNotification('System Awakening Complete', 'Your Hunter profile has been registered.', 'system');
  };

  const googleLogin = () => {
    setIsAuthenticated(true);
    setHasCompletedOnboarding(true);
    saveToLocalStorage({ isAuthenticated: true, hasCompletedOnboarding: true });
    addNotification('Google SSO Authenticated', 'Access Granted to System HUD.', 'system');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
    saveToLocalStorage({ isAuthenticated: false, hasCompletedOnboarding: false });
    addNotification('System Session Terminated', 'Logged out safely.', 'system');
  };

  // Habits Operations
  const toggleHabitToday = (habitId: string) => {
    setHabits(prev => {
      const nextHabits = prev.map(h => {
        if (h.id === habitId) {
          const isDoneToday = h.completedDates.includes(todayStr);
          let updatedDates: string[];
          let newStreak = h.streak;

          if (isDoneToday) {
            updatedDates = h.completedDates.filter(d => d !== todayStr);
            newStreak = Math.max(0, h.streak - 1);
            addXP(-h.xpValue, `Undid ${h.name}`);
          } else {
            updatedDates = [...h.completedDates, todayStr];
            newStreak = h.streak + 1;
            const newLongest = Math.max(h.longestStreak, newStreak);
            soundEngine.playQuestComplete();
            addXP(h.xpValue, `Completed Quest: ${h.name}`);

            return {
              ...h,
              completedDates: updatedDates,
              streak: newStreak,
              longestStreak: newLongest
            };
          }
          return { ...h, completedDates: updatedDates, streak: newStreak };
        }
        return h;
      });

      saveToLocalStorage({ habits: nextHabits });
      return nextHabits;
    });
  };

  const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak' | 'longestStreak'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: 'h_' + Date.now(),
      createdAt: todayStr,
      completedDates: [],
      streak: 0,
      longestStreak: 0
    };
    setHabits(prev => {
      const next = [newHabit, ...prev];
      saveToLocalStorage({ habits: next });
      return next;
    });
    soundEngine.playClick();
    addNotification('New Quest Initialized', `Added Habit: ${newHabit.name}`, 'quest');
  };

  const editHabit = (id: string, updates: Partial<Habit>) => {
    setHabits(prev => {
      const next = prev.map(h => h.id === id ? { ...h, ...updates } : h);
      saveToLocalStorage({ habits: next });
      return next;
    });
    soundEngine.playClick();
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => {
      const next = prev.filter(h => h.id !== id);
      saveToLocalStorage({ habits: next });
      return next;
    });
    soundEngine.playClick();
  };

  const archiveHabit = (id: string) => {
    editHabit(id, { archived: true });
  };

  const pauseHabit = (id: string) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, paused: !h.paused } : h));
  };

  const duplicateHabit = (id: string) => {
    const target = habits.find(h => h.id === id);
    if (target) {
      addHabit({
        ...target,
        name: `${target.name} (Copy)`
      });
    }
  };

  // Goals Operations
  const addGoal = (goalData: Omit<Goal, 'id' | 'createdAt' | 'completionPercentage'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: 'g_' + Date.now(),
      createdAt: todayStr,
      completionPercentage: 0
    };
    setGoals(prev => [newGoal, ...prev]);
    soundEngine.playClick();
    addNotification('Major Objective Logged', `Goal: ${newGoal.title}`, 'system');
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        const updatedMilestones = g.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m);
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const pct = Math.round((completedCount / updatedMilestones.length) * 100);
        if (pct === 100 && g.completionPercentage < 100) {
          addXP(100, `Completed Goal: ${g.title}`);
          soundEngine.playAchievement();
        }
        return { ...g, milestones: updatedMilestones, completionPercentage: pct };
      }
      return g;
    }));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  // Learning & Quotes
  const getRandomQuote = () => {
    const randomIdx = Math.floor(Math.random() * quotes.length);
    setActiveQuote(quotes[randomIdx]);
    soundEngine.playClick();
  };

  const toggleQuoteFavorite = (id: string) => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, isFavorite: !q.isFavorite } : q));
    soundEngine.playClick();
  };

  const completeLearningModule = (id: string) => {
    setLearningModules(prev => prev.map(m => {
      if (m.id === id && !m.completed) {
        addXP(m.xpReward, `Completed Lesson: ${m.title}`);
        soundEngine.playAchievement();
        return { ...m, completed: true };
      }
      return m;
    }));
  };

  // System Notes & Logs
  const addNote = (title: string, content: string, folder = 'General', tags: string[] = []) => {
    const newNote: SystemNote = {
      id: 'note_' + Date.now(),
      title,
      content,
      folder,
      tags,
      isPinned: false,
      createdAt: todayStr,
      updatedAt: todayStr
    };
    setNotes(prev => [newNote, ...prev]);
    soundEngine.playClick();
    addXP(10, 'Created System Note');
  };

  const updateNote = (id: string, title: string, content: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, title, content, updatedAt: todayStr } : n));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const togglePinNote = (id: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  const saveDailyReflection = (mood: SystemLog['mood'], reflection: string) => {
    setSystemLogs(prev => {
      const existing = prev[todayStr] || { date: todayStr, xpEarned: 0, habitsCompletedCount: 0, notesCount: 0 };
      const updated = { ...existing, mood, reflection };
      const next = { ...prev, [todayStr]: updated };
      saveToLocalStorage({ systemLogs: next });
      return next;
    });
    addXP(15, 'Logged Daily System Reflection');
    soundEngine.playClick();
  };

  const closeLevelUpModal = () => {
    setLevelUpModalData(null);
  };

  // JSON Export / Import
  const exportDataJSON = (): string => {
    return JSON.stringify({
      userProfile,
      totalXP,
      habits,
      goals,
      learningModules,
      notes,
      systemLogs,
      exportedAt: new Date().toISOString()
    }, null, 2);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.userProfile) setUserProfile(data.userProfile);
      if (data.totalXP !== undefined) setTotalXP(data.totalXP);
      if (data.habits) setHabits(data.habits);
      if (data.goals) setGoals(data.goals);
      if (data.learningModules) setLearningModules(data.learningModules);
      if (data.notes) setNotes(data.notes);
      if (data.systemLogs) setSystemLogs(data.systemLogs);
      saveToLocalStorage(data);
      addNotification('System Backup Restored', 'All Hunter data synced successfully.', 'system');
      return true;
    } catch {
      return false;
    }
  };

  return (
    <SystemContext.Provider value={{
      isAuthenticated,
      hasCompletedOnboarding,
      completeOnboarding,
      userProfile,
      userStats,
      updateProfile,
      updateThemeSettings,
      login,
      signup,
      googleLogin,
      logout,
      habits,
      addHabit,
      toggleHabitToday,
      editHabit,
      deleteHabit,
      archiveHabit,
      pauseHabit,
      duplicateHabit,
      goals,
      addGoal,
      toggleMilestone,
      deleteGoal,
      learningModules,
      quotes,
      activeQuote,
      toggleQuoteFavorite,
      getRandomQuote,
      completeLearningModule,
      notes,
      addNote,
      updateNote,
      deleteNote,
      togglePinNote,
      systemLogs,
      saveDailyReflection,
      achievements,
      soundEnabled,
      toggleSound,
      levelUpModalData,
      closeLevelUpModal,
      notifications,
      dismissNotification,
      addNotification,
      exportDataJSON,
      importDataJSON
    }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};
