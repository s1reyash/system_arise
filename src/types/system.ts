export type DifficultyRank = 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank';

export type HunterRankTitle = 
  | 'Awakened'
  | 'Beginner Hunter'
  | 'E-Rank Hunter'
  | 'D-Rank Hunter'
  | 'C-Rank Hunter'
  | 'B-Rank Hunter'
  | 'A-Rank Hunter'
  | 'S-Rank Hunter'
  | 'Monarch';

export type HabitCategory =
  | 'Fitness'
  | 'Study'
  | 'Meditation'
  | 'Reading'
  | 'Coding'
  | 'AI Learning'
  | 'Business'
  | 'Finance'
  | 'Health'
  | 'Nutrition'
  | 'Running'
  | 'Workout'
  | 'Journaling'
  | 'Language Learning'
  | 'Relationships'
  | 'Career'
  | 'Personal Development'
  | 'Home & Family'
  | 'Custom';

export type UserDomain = 
  | 'General Hunter'
  | 'Student'
  | 'Professional'
  | 'Home & Family'
  | 'Fitness Enthusiast'
  | 'Creative & Writer';

export type FrequencyType = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly' | 'Specific Days';

export type GoalCategory =
  | 'Short Term'
  | 'Long Term'
  | 'Life'
  | 'Financial'
  | 'Fitness'
  | 'Career'
  | 'Learning'
  | 'Personal';

export type ThemePreset = 'Apple White Glass' | 'Sakura Cherry Monarch' | 'Cyber Neon' | 'Monarch Purple';
export type FontStyleOption = 'Sans (Sovereign)' | 'Mono (Cyber Terminal)' | 'Serif (Elegance)' | 'Roboto (Minimal)';
export type GlowIntensity = 'Subtle' | 'Medium' | 'Ultra Glow';
export type AppMode = 'dark' | 'light';

export interface ThemeSettings {
  preset: ThemePreset;
  mode: AppMode;
  fontStyle: FontStyleOption;
  glassOpacity: number;
  glassBlur: number;
  glowIntensity: GlowIntensity;
}

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  difficulty: DifficultyRank;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  color: string;
  icon: string;
  target: number;
  targetUnit?: string;
  frequency: FrequencyType;
  specificDays?: number[];
  reminderTime?: string;
  deadline?: string;
  estimatedMinutes?: number;
  actualMinutes?: number;
  notes?: string;
  checklist?: ChecklistItem[];
  tags?: string[];
  customReward?: string;
  customPunishment?: string;
  streak: number;
  longestStreak: number;
  completedDates: string[];
  archived: boolean;
  paused: boolean;
  xpValue: number;
  createdAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  deadline: string;
  milestones: Milestone[];
  completionPercentage: number;
  createdAt: string;
}

export interface DailyLearning {
  id: string;
  title: string;
  category: string;
  readTimeMinutes: number;
  content: string;
  keyInsights: string[];
  actionableTakeaways: string[];
  reflectionQuestion: string;
  exercise: string;
  xpReward: number;
  completed: boolean;
  savedToNotes?: boolean;
}

export interface DailyQuote {
  id: string;
  text: string;
  author: string;
  category: 'Discipline' | 'Hard Work' | 'Success' | 'Stoicism' | 'Growth' | 'Focus' | 'Leadership' | 'Courage' | 'Consistency';
  isFavorite?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'Streak' | 'XP & Level' | 'Habit Master' | 'Hunter Ranks' | 'Discipline & Fitness' | 'Knowledge' | 'Journaling' | 'Monarch Special';
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  rankRequirement?: DifficultyRank;
  xpReward: number;
}

export interface SystemNote {
  id: string;
  title: string;
  content: string;
  folder: string;
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SystemLog {
  date: string;
  mood?: 'Elite' | 'Strong' | 'Steady' | 'Fatigued' | 'Battle Ready';
  reflection?: string;
  xpEarned: number;
  habitsCompletedCount: number;
  notesCount: number;
}

export interface AttributePoints {
  strength: number;
  agility: number;
  intelligence: number;
  discipline: number;
  vitality: number;
}

export interface UserStats {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  currentStreak: number;
  longestStreak: number;
  rankTitle: HunterRankTitle;
  attributePoints: AttributePoints;
  totalHabits: number;
  completedHabitsToday: number;
  missedHabitsToday: number;
  completionRateToday: number;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  domain: UserDomain;
  age: number;
  gender: 'Male' | 'Female' | 'Hunter' | 'Unspecified';
  heightCm: number;
  weightKg: number;
  bmi: number;
  missionStatement: string;
  currentGoal: string;
  occupation: string;
  timezone: string;
  dailyReminderTime: string;
  themePreference: ThemePreset;
  themeSettings: ThemeSettings;
  language: string;
  notificationPreferences: {
    push: boolean;
    email: boolean;
    sound: boolean;
    haptics: boolean;
  };
}

export interface NotificationAlert {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'system' | 'quest' | 'achievement' | 'reminder' | 'level';
  read: boolean;
}
