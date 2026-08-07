export interface HunterLeaderboardEntry {
  rank: number;
  id: string;
  displayName: string;
  username: string;
  avatar: string;
  rankTitle: string;
  level: number;
  totalXP: number;
  currentStreak: number;
  habitsCompleted: number;
  guildName?: string;
  badge: string;
}

export interface HunterGuild {
  id: string;
  name: string;
  tag: string;
  description: string;
  avatar: string;
  memberCount: number;
  totalGuildXP: number;
  weeklyRaidProgress: number; // 0 to 100%
  topMember: string;
  leader: string;
}

export interface GuildQuestChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  progress: number;
  target: number;
  unit: string;
  deadline: string;
  active: boolean;
}

export const INITIAL_LEADERBOARD: HunterLeaderboardEntry[] = [
  {
    rank: 1,
    id: 'h_leader_1',
    displayName: 'Sung Jin-Woo',
    username: 'ShadowMonarch',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rankTitle: 'Monarch',
    level: 100,
    totalXP: 54200,
    currentStreak: 120,
    habitsCompleted: 850,
    guildName: 'Shadow Monarchs',
    badge: '👑 Monarch'
  },
  {
    rank: 2,
    id: 'h_leader_2',
    displayName: 'Cha Hae-In',
    username: 'SwordDancer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rankTitle: 'S-Rank Hunter',
    level: 85,
    totalXP: 38900,
    currentStreak: 75,
    habitsCompleted: 620,
    guildName: 'Ahjin Guild',
    badge: '⚔️ S-Rank'
  },
  {
    rank: 3,
    id: 'h_leader_3',
    displayName: 'Thomas Andre',
    username: 'Goliath',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rankTitle: 'S-Rank Hunter',
    level: 78,
    totalXP: 31200,
    currentStreak: 45,
    habitsCompleted: 510,
    guildName: 'Scavenger Guild',
    badge: '🛡️ S-Rank'
  },
  {
    rank: 4,
    id: 'h_leader_4',
    displayName: 'Liu Zhigang',
    username: 'DragonSlayer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rankTitle: 'S-Rank Hunter',
    level: 74,
    totalXP: 28500,
    currentStreak: 38,
    habitsCompleted: 480,
    guildName: 'China National Guild',
    badge: '🐉 S-Rank'
  },
  {
    rank: 5,
    id: 'h_leader_5',
    displayName: 'Go Gun-Hee',
    username: 'AssociationPresident',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    rankTitle: 'A-Rank Hunter',
    level: 62,
    totalXP: 21400,
    currentStreak: 60,
    habitsCompleted: 410,
    guildName: 'Hunter Association',
    badge: '📜 A-Rank'
  }
];

export const INITIAL_GUILDS: HunterGuild[] = [
  {
    id: 'guild_1',
    name: 'Shadow Monarch Guild',
    tag: 'MONARCH',
    description: 'Elite guild dedicated to relentless daily habit execution & high-level mastery.',
    avatar: '👑',
    memberCount: 142,
    totalGuildXP: 185000,
    weeklyRaidProgress: 88,
    topMember: 'Sung Jin-Woo',
    leader: 'Sung Jin-Woo'
  },
  {
    id: 'guild_2',
    name: 'Ahjin Guild',
    tag: 'AHJIN',
    description: 'Disciplined students, creatives, and daily self-improvers levelling up together.',
    avatar: '⚔️',
    memberCount: 98,
    totalGuildXP: 124000,
    weeklyRaidProgress: 72,
    topMember: 'Cha Hae-In',
    leader: 'Cha Hae-In'
  },
  {
    id: 'guild_3',
    name: 'Deep Focus & Study Squad',
    tag: 'FOCUS',
    description: 'Academic scholars, students, and deep work engineers conquering study quests.',
    avatar: '🎓',
    memberCount: 210,
    totalGuildXP: 145000,
    weeklyRaidProgress: 95,
    topMember: 'Go Gun-Hee',
    leader: 'Go Gun-Hee'
  }
];

export const INITIAL_GUILD_QUESTS: GuildQuestChallenge[] = [
  {
    id: 'gq_1',
    title: '7-Day Unbreakable Iron Streak Raid',
    description: 'All guild members maintain an uninterrupted 7-day habit streak.',
    xpReward: 500,
    progress: 5,
    target: 7,
    unit: 'Days',
    deadline: '3 Days Left',
    active: true
  },
  {
    id: 'gq_2',
    title: '1,000 Collective Habit Execution Raid',
    description: 'Complete 1,000 total habits across all guild members this week.',
    xpReward: 1000,
    progress: 720,
    target: 1000,
    unit: 'Habits',
    deadline: '5 Days Left',
    active: true
  }
];
