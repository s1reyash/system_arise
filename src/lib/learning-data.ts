import { DailyLearning } from '@/types/system';

export const INITIAL_DAILY_LEARNING: DailyLearning[] = [
  {
    id: 'learn_1',
    title: 'The Compound Effect of Micro-Habits (1% Daily Growth)',
    category: 'Psychology & Productivity',
    readTimeMinutes: 6,
    content: `When you improve by 1% each day for a year, you end up 37 times better by the time you're done. Conversely, if you get 1% worse each day, you decline down nearly to zero.

What starts as a small win or a minor setback accumulates into something much more significant. The Solo Leveling system is built on this exact principle: Jin-Woo started by doing 100 pushups, 100 situps, 100 squats, and a 10km run every single day. At first, it seemed basic, but repeated relentless daily execution forced an exponential awakening.

Key takeaway: Focus on system consistency over fleeting motivation. The outcome of your life is a lagging measure of your daily habits.`,
    keyInsights: [
      'Small habits accumulate exponentially over time ($1.01^{365} = 37.78$).',
      'Environment design matters more than willpower.',
      'Habit identity shifting: Don\'t say "I am trying to run", say "I am a runner".'
    ],
    actionableTakeaways: [
      'Reduce friction for good habits (put running shoes next to bed).',
      'Increase friction for bad habits (logout of social media apps).',
      'Never break a habit twice in a row.'
    ],
    reflectionQuestion: 'What is one 2-minute habit you can do today that aligns with the person you want to become?',
    exercise: 'Write down 3 daily habits and identify how to make them 50% easier to start today.',
    xpReward: 35,
    completed: false
  },
  {
    id: 'learn_2',
    title: 'Deep Work & Dopamine Detox Protocols',
    category: 'Software Engineering & Productivity',
    readTimeMinutes: 7,
    content: `Deep Work is the ability to focus without distraction on a cognitively demanding task. It’s a skill that allows you to quickly master complicated information and produce better results in less time.

Modern notification overload fragments your attention span, triggering frequent dopamine spikes that make hard tasks feel excruciatingly boring. By implementing a daily 90-minute Deep Work block with zero notifications, you re-calibrate your baseline focus.`,
    keyInsights: [
      'Context switching degrades cognitive capacity by up to 40%.',
      'Work in ultradian rhythm blocks (90 minutes intense focus, 15 minutes complete rest).',
      'Boredom tolerance is a superpower in a hyper-distracted world.'
    ],
    actionableTakeaways: [
      'Put your phone in another room during high-priority habit execution.',
      'Schedule specific "shallow work" windows instead of constantly checking messages.',
      'End deep work sessions with a physical shutdown ritual.'
    ],
    reflectionQuestion: 'What single task, if done with total immersion for 2 hours daily, would transform your career?',
    exercise: 'Block out tomorrow\'s 90-minute Deep Work window in your calendar right now.',
    xpReward: 40,
    completed: false
  },
  {
    id: 'learn_3',
    title: 'Prompt Engineering & Building AI System Workflows',
    category: 'Artificial Intelligence',
    readTimeMinutes: 8,
    content: `Artificial Intelligence is not replacing high performers; high performers leveraging AI are replacing everyone else. Understanding LLM system prompts, context windows, and structured tool calls allows you to build personal autonomous agents that automate administrative overhead.

Key concepts in modern AI engineering include Chain-of-Thought reasoning, RAG (Retrieval-Augmented Generation), and multi-agent coordination.`,
    keyInsights: [
      'Provide clear persona role definitions in your prompts.',
      'Use structured JSON or XML delimiters for complex inputs.',
      'Iterative refinement produces 10x better results than one-shot queries.'
    ],
    actionableTakeaways: [
      'Create a reusable prompt template library for daily coding & writing tasks.',
      'Integrate AI search to summarize 50-page technical documents into 5 bullet points.',
      'Automate repetitive workflows using agentic tools.'
    ],
    reflectionQuestion: 'Which repetitive task in your weekly routine can be automated with an AI prompt or script?',
    exercise: 'Write a comprehensive system prompt for an AI assistant tailored to your specific occupation.',
    xpReward: 45,
    completed: false
  },
  {
    id: 'learn_4',
    title: 'Stoicism & Amor Fati: Harnessing Obstacles as Fuel',
    category: 'Philosophy & Stoicism',
    readTimeMinutes: 5,
    content: `"The impediment to action advances action. What stands in the way becomes the way." — Marcus Aurelius.

Amor Fati translates to "love of fate". It is the mindset of not merely tolerating adversity, but embracing every setback as necessary training for your evolution. When a dungeon gate opens or a setback occurs in life, the Sovereign Hunter sees an opportunity to level up endurance.`,
    keyInsights: [
      'Control what is within your control (your reaction, effort, attitude).',
      'Accept what is outside your control (past events, external judgments).',
      'Dichotomy of Control eliminates unnecessary anxiety.'
    ],
    actionableTakeaways: [
      'When faced with a sudden failure, ask immediately: "What does this enable me to learn?"',
      'Practice voluntary discomfort to expand your tolerance threshold.',
      'Journal nightly to audit your emotional reactions.'
    ],
    reflectionQuestion: 'What recent frustration in your life can you refrain as a blessing or growth opportunity?',
    exercise: 'Identify your biggest current obstacle and list 3 ways it is forcing you to become stronger.',
    xpReward: 30,
    completed: false
  },
  {
    id: 'learn_5',
    title: 'Asymmetric Financial Bets & Asset Allocation',
    category: 'Money & Investing',
    readTimeMinutes: 7,
    content: `True financial freedom comes from acquiring cash-flowing assets that compound independently of your direct physical labor. An asymmetric bet is an investment where the potential upside massively outweighs the limited downside.

Focus on building high-value leverage: Code, Content, Capital, and Labor. Code and Content are permissionless leverage with zero marginal cost of reproduction.`,
    keyInsights: [
      'Earn with your mind, not your time.',
      'Invest in skill stacks that have high market demand and low supply.',
      'Automate monthly index fund contributions and emergency reserve accumulation.'
    ],
    actionableTakeaways: [
      'Audit your subscriptions and monthly recurring expenses.',
      'Build digital assets that generate leverage while you sleep.',
      'Diversify into inflation-resistant assets.'
    ],
    reflectionQuestion: 'Which high-leverage skill (Coding, Writing, Sales, AI) should you invest 100 hours mastering next?',
    exercise: 'Calculate your savings rate percentage and set a target to increase it by 5% this month.',
    xpReward: 40,
    completed: false
  }
];
