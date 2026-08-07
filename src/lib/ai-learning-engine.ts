import { UserDomain, DailyLearning } from '@/types/system';

export interface PersonalizedTopic {
  id: string;
  name: string;
  category: string;
  domain: UserDomain | 'Universal';
  description: string;
}

export const INTEREST_TOPICS: PersonalizedTopic[] = [
  { id: 't_ai', name: 'AI & Future Technology', category: 'AI Learning', domain: 'Professional', description: 'Leveraging AI agents, prompt engineering, and modern LLM automation.' },
  { id: 't_study', name: 'Deep Focus & Exam Mastery', category: 'Study', domain: 'Student', description: 'Pomodoro focus, active recall, Feynman technique, and study stamina.' },
  { id: 't_home', name: 'Household Systems & Family Wellness', category: 'Home & Family', domain: 'Home & Family', description: 'Mindful home management, daily balance, nutrition, and peaceful living.' },
  { id: 't_creative', name: 'Creative Writing & Storytelling', category: 'Creative & Writer', domain: 'Creative & Writer', description: 'Flow state writing, narrative structure, and creative output.' },
  { id: 't_fitness', name: 'Sovereign Physical Conditioning', category: 'Fitness', domain: 'Fitness Enthusiast', description: 'Hypertrophy, metabolic efficiency, hydration, and sleep hygiene.' },
  { id: 't_stoic', name: 'Monarch Mindset & Stoicism', category: 'Meditation', domain: 'Universal', description: 'Unshakable discipline, emotional regulation, and high performance.' }
];

export function generatePersonalizedDailyArticle(userDomain: UserDomain, username: string): DailyLearning {
  const domainNormalized = userDomain || 'General Hunter';

  if (domainNormalized === 'Student') {
    return {
      id: `ai_lesson_${Date.now()}`,
      title: `Academic Mastery: The 3-Hour Deep Study Protocol for ${username}`,
      category: 'Student Study Engine',
      readTimeMinutes: 6,
      content: `Welcome Hunter ${username}. As a Student, your main dungeon is cognitive focus. To retain 2x more information in half the time:

1. THE 50/10 DEEP WORK CYCLES: Work for 50 uninterrupted minutes with phone on Silent in another room, followed by 10 minutes of complete cognitive rest.
2. ACTIVE RECALL RECITATION: After reading a section, close the book and write down 5 key points from memory before moving forward.
3. THE FEYNMAN EXPLANATION TEST: Explain the core topic out loud as if teaching a 10-year-old.`,
      keyInsights: [
        'Passive reading yields only 10% retention; active recall yields 80%+.',
        'Multitasking splits your attention residue and degrades exam performance.'
      ],
      actionableTakeaways: [
        'Execute two 50-minute zero-distraction study sessions today.',
        'Summarize today\'s hardest topic in 3 bullet points from memory.'
      ],
      reflectionQuestion: 'What is the single biggest distraction holding back your academic potential right now?',
      exercise: 'Perform a 25-minute Pomodoro study sprint with zero notifications.',
      xpReward: 35,
      completed: false
    };
  }

  if (domainNormalized === 'Home & Family') {
    return {
      id: `ai_lesson_${Date.now()}`,
      title: `Sovereign Household & Mindful Living Protocol for ${username}`,
      category: 'Home & Family',
      readTimeMinutes: 5,
      content: `Welcome Hunter ${username}. Managing a home and family requires high emotional intelligence, clarity, and daily routines:

1. THE 15-MINUTE MORNING RESET: Dedicate 15 minutes every morning to zero-noise mindfulness and quiet reflection before daily tasks begin.
2. THE EVENING DECLUTTER RITUAL: Clear primary living spaces before sleep. A clutter-free room creates a quiet mind.
3. INTENTIONAL PRESENCE: When engaging with family or loved ones, place digital devices out of reach to be 100% present.`,
      keyInsights: [
        'A calm physical environment directly reduces cortisol and daily stress levels.',
        'Small micro-habits executed consistently build long-term family harmony.'
      ],
      actionableTakeaways: [
        'Take 10 minutes for mindful breathing and quiet reflection today.',
        'Declutter one countertop or workspace before ending your evening.'
      ],
      reflectionQuestion: 'How can you create a more peaceful, clutter-free sanctuary at home today?',
      exercise: 'Spend 10 minutes meditating or journaling on daily family gratitude.',
      xpReward: 30,
      completed: false
    };
  }

  if (domainNormalized === 'Professional') {
    return {
      id: `ai_lesson_${Date.now()}`,
      title: `High-Performance Career & AI Automation Strategy for ${username}`,
      category: 'Professional Productivity',
      readTimeMinutes: 7,
      content: `Welcome Hunter ${username}. In the modern digital landscape, leverage and focus are your primary weapons:

1. ASYNCHRONOUS DEEP WORK: Block off 9:00 AM to 11:30 AM for high-impact strategic tasks before opening email or Slack.
2. AI ACCELERATION: Use AI tools as your executive co-pilot to summarize reports, generate drafts, and automate routine tasks.
3. THE 80/20 PRINCIPLE: Identify the top 20% of activities that generate 80% of your career results.`,
      keyInsights: [
        'Reactive work (answering emails all day) creates the illusion of speed without actual progress.',
        'High-value outputs come from uninterrupted 90-minute strategic blocks.'
      ],
      actionableTakeaways: [
        'Block 90 minutes of calendar time for your highest-impact task today.',
        'Automate one repetitive administrative task using an AI workflow.'
      ],
      reflectionQuestion: 'Which 20% of your daily work creates 80% of your real professional impact?',
      exercise: 'Write down your 3 top career priorities for the week and eliminate non-essential tasks.',
      xpReward: 40,
      completed: false
    };
  }

  // DEFAULT / GENERAL HUNTER
  return {
    id: `ai_lesson_${Date.now()}`,
    title: `Monarch Self-Improvement & Daily Discipline Engine for ${username}`,
    category: 'Sovereign Growth',
    readTimeMinutes: 6,
    content: `Welcome Hunter ${username}. Self-improvement is a continuous ascension loop:

1. THE 1% BETTER RULE: Improving by just 1% each day compounding over 365 days yields a 37x transformation.
2. NEUROPLASTICITY & STREAKS: Every time you execute a difficult daily quest, your neural pathways reinforce self-discipline.
3. UNBREAKABLE CONSISTENCY: Never miss two days in a row. If life interrupts your routine, execute a micro-version of your habit.`,
    keyInsights: [
      'Identity drives habit execution. Define yourself as a Sovereign Hunter.',
      'Consistency outperforms intensity every single time.'
    ],
    actionableTakeaways: [
      'Complete all 3 of your starter quests today.',
      'Protect your habit streak at all costs.'
    ],
    reflectionQuestion: 'What is one small habit you can execute today to become 1% better?',
    exercise: 'Complete today\'s hydration and reading quests.',
    xpReward: 30,
    completed: false
  };
}
