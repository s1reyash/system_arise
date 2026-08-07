import { Achievement } from '@/types/system';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  // --- HUNTER RANKS & LEVEL ACHIEVEMENTS ---
  { id: 'ach_1', title: 'The Awakening', description: 'Awaken your inner power and take the first step.', category: 'Hunter Ranks', icon: 'Sparkles', unlocked: true, unlockedAt: '2026-08-01', progress: 1, maxProgress: 1, xpReward: 50 },
  { id: 'ach_2', title: 'E-Rank Hunter', description: 'Reach Level 5. Recognized by the Hunter Association.', category: 'Hunter Ranks', icon: 'Shield', unlocked: false, progress: 0, maxProgress: 5, rankRequirement: 'E-Rank', xpReward: 150 },
  { id: 'ach_3', title: 'D-Rank Hunter', description: 'Reach Level 10. You are no longer weak.', category: 'Hunter Ranks', icon: 'ShieldAlert', unlocked: false, progress: 0, maxProgress: 10, rankRequirement: 'D-Rank', xpReward: 300 },
  { id: 'ach_4', title: 'C-Rank Hunter', description: 'Reach Level 20. Clear C-Rank dungeons effortlessly.', category: 'Hunter Ranks', icon: 'Swords', unlocked: false, progress: 0, maxProgress: 20, rankRequirement: 'C-Rank', xpReward: 500 },
  { id: 'ach_5', title: 'B-Rank Hunter', description: 'Reach Level 35. Command respect among high-rank guilds.', category: 'Hunter Ranks', icon: 'Crown', unlocked: false, progress: 0, maxProgress: 35, rankRequirement: 'B-Rank', xpReward: 800 },
  { id: 'ach_6', title: 'A-Rank Hunter', description: 'Reach Level 50. An elite force capable of soloing raids.', category: 'Hunter Ranks', icon: 'Flame', unlocked: false, progress: 0, maxProgress: 50, rankRequirement: 'A-Rank', xpReward: 1200 },
  { id: 'ach_7', title: 'S-Rank Hunter', description: 'Reach Level 70. National asset level strength.', category: 'Hunter Ranks', icon: 'Zap', unlocked: false, progress: 0, maxProgress: 70, rankRequirement: 'S-Rank', xpReward: 2500 },
  { id: 'ach_8', title: 'Shadow Monarch', description: 'Reach Level 100. Rule over all habits and discipline.', category: 'Monarch Special', icon: 'Skull', unlocked: false, progress: 0, maxProgress: 100, xpReward: 10000 },

  // --- XP MILESTONES ---
  { id: 'ach_9', title: 'First Blood', description: 'Gain your first 100 XP.', category: 'XP & Level', icon: 'Target', unlocked: true, unlockedAt: '2026-08-01', progress: 100, maxProgress: 100, xpReward: 50 },
  { id: 'ach_10', title: 'Power Rising', description: 'Accumulate 1,000 Total XP.', category: 'XP & Level', icon: 'TrendingUp', unlocked: false, progress: 350, maxProgress: 1000, xpReward: 200 },
  { id: 'ach_11', title: '5,000 XP Overload', description: 'Accumulate 5,000 Total XP.', category: 'XP & Level', icon: 'Zap', unlocked: false, progress: 350, maxProgress: 5000, xpReward: 500 },
  { id: 'ach_12', title: '10,000 XP Titan', description: 'Accumulate 10,000 Total XP.', category: 'XP & Level', icon: 'Award', unlocked: false, progress: 350, maxProgress: 10000, xpReward: 1000 },
  { id: 'ach_13', title: '50,000 XP Sovereign', description: 'Accumulate 50,000 Total XP.', category: 'XP & Level', icon: 'Trophy', unlocked: false, progress: 350, maxProgress: 50000, xpReward: 5000 },

  // --- STREAK ACHIEVEMENTS ---
  { id: 'ach_14', title: 'Spark of Momentum', description: 'Maintain a 3-day active streak.', category: 'Streak', icon: 'Flame', unlocked: true, unlockedAt: '2026-08-04', progress: 3, maxProgress: 3, xpReward: 50 },
  { id: 'ach_15', title: 'Week of Iron Will', description: 'Maintain a 7-day continuous streak.', category: 'Streak', icon: 'Flame', unlocked: false, progress: 5, maxProgress: 7, xpReward: 150 },
  { id: 'ach_16', title: 'Fortress of Habits', description: 'Maintain a 14-day continuous streak.', category: 'Streak', icon: 'Shield', unlocked: false, progress: 5, maxProgress: 14, xpReward: 300 },
  { id: 'ach_17', title: 'Unbreakable Month', description: 'Maintain a 30-day streak.', category: 'Streak', icon: 'Lock', unlocked: false, progress: 5, maxProgress: 30, xpReward: 600 },
  { id: 'ach_18', title: 'Quarterly Monarch', description: 'Maintain a 90-day streak.', category: 'Streak', icon: 'Medal', unlocked: false, progress: 5, maxProgress: 90, xpReward: 1500 },
  { id: 'ach_19', title: 'Legendary 100-Day Streak', description: 'Maintain a 100-day streak without breaking.', category: 'Streak', icon: 'Crown', unlocked: false, progress: 5, maxProgress: 100, xpReward: 2500 },
  { id: 'ach_20', title: 'Year of the Sovereign', description: 'Maintain a 365-day active streak.', category: 'Streak', icon: 'Star', unlocked: false, progress: 5, maxProgress: 365, xpReward: 10000 },

  // --- HABIT QUANTITY ACHIEVEMENTS ---
  { id: 'ach_21', title: 'First Quest Complete', description: 'Complete your very first habit.', category: 'Habit Master', icon: 'CheckCircle2', unlocked: true, unlockedAt: '2026-08-01', progress: 1, maxProgress: 1, xpReward: 25 },
  { id: 'ach_22', title: '10 Quests Cleared', description: 'Complete 10 habits in total.', category: 'Habit Master', icon: 'ListCheck', unlocked: true, unlockedAt: '2026-08-03', progress: 10, maxProgress: 10, xpReward: 100 },
  { id: 'ach_23', title: '50 Quests Cleared', description: 'Complete 50 habits in total.', category: 'Habit Master', icon: 'Layers', unlocked: false, progress: 28, maxProgress: 50, xpReward: 250 },
  { id: 'ach_24', title: '100 Quests Mastered', description: 'Complete 100 habits in total.', category: 'Habit Master', icon: 'Milestone', unlocked: false, progress: 28, maxProgress: 100, xpReward: 500 },
  { id: 'ach_25', title: '500 Quests Legend', description: 'Complete 500 habits in total.', category: 'Habit Master', icon: 'Zap', unlocked: false, progress: 28, maxProgress: 500, xpReward: 2000 },
  { id: 'ach_26', title: '1,000 Quests Sovereign', description: 'Complete 1,000 habits in total.', category: 'Habit Master', icon: 'Crown', unlocked: false, progress: 28, maxProgress: 1000, xpReward: 5000 },

  // --- DISCIPLINE & FITNESS CATEGORIES ---
  { id: 'ach_27', title: 'Morning Warrior', description: 'Complete 5 early morning habits before 7:00 AM.', category: 'Discipline & Fitness', icon: 'Sun', unlocked: false, progress: 2, maxProgress: 5, xpReward: 150 },
  { id: 'ach_28', title: 'Gym Beast', description: 'Complete 20 Workout or Fitness habits.', category: 'Discipline & Fitness', icon: 'Dumbbell', unlocked: false, progress: 8, maxProgress: 20, xpReward: 300 },
  { id: 'ach_29', title: 'Marathon Mindset', description: 'Log 10 Running or Cardio sessions.', category: 'Discipline & Fitness', icon: 'Activity', unlocked: false, progress: 3, maxProgress: 10, xpReward: 200 },
  { id: 'ach_30', title: 'Hydration Monarch', description: 'Log 30 Water Hydration habits.', category: 'Discipline & Fitness', icon: 'Droplets', unlocked: false, progress: 12, maxProgress: 30, xpReward: 150 },
  { id: 'ach_31', title: 'Zen Meditation Master', description: 'Complete 15 Meditation sessions.', category: 'Discipline & Fitness', icon: 'Heart', unlocked: false, progress: 4, maxProgress: 15, xpReward: 200 },
  { id: 'ach_32', title: 'Cold Shower Discipline', description: 'Complete 7 Cold Shower habits.', category: 'Discipline & Fitness', icon: 'Snowflake', unlocked: false, progress: 1, maxProgress: 7, xpReward: 250 },
  { id: 'ach_33', title: 'Clean Nutrition', description: 'Log 14 Healthy Meal habits.', category: 'Discipline & Fitness', icon: 'Apple', unlocked: false, progress: 5, maxProgress: 14, xpReward: 200 },
  { id: 'ach_34', title: 'Discipline Monster', description: 'Complete all daily habits for 5 consecutive days.', category: 'Discipline & Fitness', icon: 'Swords', unlocked: false, progress: 2, maxProgress: 5, xpReward: 400 },
  { id: 'ach_35', title: 'No Zero Days', description: 'Complete at least 1 habit every day for 14 days.', category: 'Discipline & Fitness', icon: 'CheckSquare', unlocked: false, progress: 5, maxProgress: 14, xpReward: 300 },

  // --- KNOWLEDGE & LEARNING CATEGORIES ---
  { id: 'ach_36', title: 'Reading Master', description: 'Read 10 Book or Reading habits.', category: 'Knowledge', icon: 'BookOpen', unlocked: false, progress: 4, maxProgress: 10, xpReward: 200 },
  { id: 'ach_37', title: 'AI Explorer', description: 'Complete 5 AI Learning or Tech modules.', category: 'Knowledge', icon: 'Cpu', unlocked: false, progress: 2, maxProgress: 5, xpReward: 250 },
  { id: 'ach_38', title: 'Code Architect', description: 'Complete 15 Coding or Software Engineering habits.', category: 'Knowledge', icon: 'Code', unlocked: false, progress: 6, maxProgress: 15, xpReward: 300 },
  { id: 'ach_39', title: 'Polyglot Hunter', description: 'Complete 10 Language Learning habits.', category: 'Knowledge', icon: 'Globe', unlocked: false, progress: 1, maxProgress: 10, xpReward: 200 },
  { id: 'ach_40', title: 'Millionaire Mind', description: 'Complete 10 Finance or Investment lessons.', category: 'Knowledge', icon: 'DollarSign', unlocked: false, progress: 3, maxProgress: 10, xpReward: 350 },
  { id: 'ach_41', title: '10% Better Scholar', description: 'Read 10 Daily Learning lessons in the app.', category: 'Knowledge', icon: 'GraduationCap', unlocked: false, progress: 3, maxProgress: 10, xpReward: 250 },
  { id: 'ach_42', title: 'Polymath Hunter', description: 'Read 30 Daily Learning lessons across 5 different topics.', category: 'Knowledge', icon: 'Library', unlocked: false, progress: 3, maxProgress: 30, xpReward: 600 },

  // --- SYSTEM JOURNAL & REFLECTION ---
  { id: 'ach_43', title: 'System Chronicler', description: 'Write 5 Daily Reflections in your log.', category: 'Journaling', icon: 'PenTool', unlocked: false, progress: 2, maxProgress: 5, xpReward: 150 },
  { id: 'ach_44', title: 'Mind Uncluttered', description: 'Create 10 System Notes or Brain Dumps.', category: 'Journaling', icon: 'FileText', unlocked: false, progress: 3, maxProgress: 10, xpReward: 200 },
  { id: 'ach_45', title: 'Stoic Reflective', description: 'Log your daily mood for 7 days.', category: 'Journaling', icon: 'Smile', unlocked: false, progress: 4, maxProgress: 7, xpReward: 150 },

  // --- GENERATE EXPANDED ACHIEVEMENTS LIST TO TOTAL 100+ ---
  ...Array.from({ length: 55 }).map((_, idx) => {
    const num = idx + 46;
    const categories: Achievement['category'][] = ['Habit Master', 'Discipline & Fitness', 'Knowledge', 'Monarch Special', 'Streak'];
    const cat = categories[idx % categories.length];
    const titles = [
      `Dungeon Raider ${num}`, `Iron Will Phase ${idx + 1}`, `Knowledge Seeker ${num}`,
      `Cyber Discipline ${num}`, `Hyper Focus Level ${idx + 1}`, `Sovereign Mind ${num}`,
      `Shadow Guard ${num}`, `System Override ${idx + 1}`, `Daily Dominance ${num}`, `Unstoppable Force ${num}`
    ];
    return {
      id: `ach_${num}`,
      title: titles[idx % titles.length],
      description: `Complete advanced System quest challenge ${num} to earn elite rank recognition.`,
      category: cat,
      icon: idx % 2 === 0 ? 'Zap' : 'Shield',
      unlocked: false,
      progress: Math.min(idx * 2, 50),
      maxProgress: 50 + idx * 5,
      xpReward: 100 + idx * 20
    } as Achievement;
  })
];
