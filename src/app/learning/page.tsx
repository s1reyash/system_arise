'use client';

import React, { useState, useEffect } from 'react';
import { useSystem } from '@/context/SystemContext';
import { DailyLearning } from '@/types/system';
import { generatePersonalizedDailyArticle, INTEREST_TOPICS } from '@/lib/ai-learning-engine';
import { BookOpen, Clock, Zap, CheckCircle2, ArrowRight, Bookmark, X, Sparkles, ChevronDown, ChevronUp, Bot, RefreshCw } from 'lucide-react';
import { soundEngine } from '@/lib/sound-engine';

export default function LearningPage() {
  const { userProfile, learningModules, completeLearningModule, addNote } = useSystem();
  
  const [personalizedArticle, setPersonalizedArticle] = useState<DailyLearning | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<DailyLearning | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string>('All');

  useEffect(() => {
    // Generate individualized AI daily article based on user domain & username
    const aiLesson = generatePersonalizedDailyArticle(userProfile.domain || 'General Hunter', userProfile.displayName);
    setPersonalizedArticle(aiLesson);
  }, [userProfile.domain, userProfile.displayName]);

  const handleGenerateFreshAI = () => {
    soundEngine.playClick();
    const fresh = generatePersonalizedDailyArticle(userProfile.domain || 'General Hunter', userProfile.displayName);
    setPersonalizedArticle(fresh);
  };

  const handleSaveToNotes = (lesson: DailyLearning) => {
    addNote(
      `Lesson: ${lesson.title}`,
      `# ${lesson.title}\n\nCategory: ${lesson.category}\n\n## Content\n${lesson.content}\n\n## Key Insights\n${lesson.keyInsights.map(i => '- ' + i).join('\n')}\n\n## Takeaways\n${lesson.actionableTakeaways.map(t => '- ' + t).join('\n')}`,
      '10% Better Learning',
      [lesson.category]
    );
  };

  const featuredLesson = personalizedArticle || learningModules[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-fuchsia-500/35 bg-gradient-to-br from-[#120822] via-[#1a0b30] to-[#280e46] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-mono text-[10px] border border-fuchsia-500/30 font-bold uppercase flex items-center gap-1">
              <Bot className="w-3 h-3 text-fuchsia-400" />
              PERSONALIZED AI LEARNING CURATOR ({userProfile.domain || 'General Hunter'})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono mt-1">
            TODAY&apos;S INDIVIDUALIZED LESSON
          </h1>
          <p className="text-xs text-purple-300/70">
            Tailored specifically for {userProfile.displayName} based on your [{userProfile.domain || 'General Hunter'}] persona.
          </p>
        </div>

        <button
          onClick={handleGenerateFreshAI}
          className="px-4 py-2.5 rounded-xl bg-[#130b24] border border-fuchsia-500/40 text-fuchsia-300 font-mono text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4 text-fuchsia-400" />
          RE-GENERATE AI LESSON
        </button>
      </div>

      {/* TOPIC CURATION CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
        <button
          onClick={() => setActiveTopic('All')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
            activeTopic === 'All'
              ? 'bg-fuchsia-500 text-slate-950 font-bold shadow-md'
              : 'bg-[#130b24] text-slate-400 border border-slate-800'
          }`}
        >
          All Topics
        </button>
        {INTEREST_TOPICS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTopic(t.category)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
              activeTopic === t.category
                ? 'bg-fuchsia-500 text-slate-950 font-bold shadow-md'
                : 'bg-[#130b24] text-slate-400 border border-slate-800'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* SINGLE FEATURED DAILY LESSON CARD */}
      {featuredLesson && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-fuchsia-500/40 bg-gradient-to-br from-[#120822] via-[#1a0b30] to-[#280e46] space-y-6 shadow-2xl relative overflow-hidden">
          
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-mono text-xs font-bold border border-fuchsia-400/40 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
              AI CURATED FOR {userProfile.displayName.toUpperCase()} • {featuredLesson.category}
            </span>

            {featuredLesson.completed ? (
              <span className="flex items-center gap-1 text-emerald-400 font-mono text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" /> COMPLETED TODAY
              </span>
            ) : (
              <span className="flex items-center gap-1 text-cyan-400 font-mono text-xs font-bold">
                <Zap className="w-4 h-4" /> +{featuredLesson.xpReward} XP REWARD
              </span>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans">
              {featuredLesson.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans line-clamp-4">
              {featuredLesson.content}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-purple-900/40 text-xs font-mono">
            <div className="flex items-center gap-3 text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-purple-400" />
                {featuredLesson.readTimeMinutes} min read time
              </span>
            </div>

            <button
              onClick={() => setSelectedLesson(featuredLesson)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-indigo-600 font-bold text-slate-950 text-xs shadow-lg shadow-fuchsia-500/30 hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <span>READ FULL ARTICLE & REFLECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* EXPANDABLE LESSON ARCHIVE (TOGGLEABLE) */}
      <div className="pt-2">
        <button
          onClick={() => setShowArchive(!showArchive)}
          className="w-full p-4 rounded-2xl glass-panel border border-slate-800 text-xs font-mono font-bold text-slate-300 flex items-center justify-between hover:border-purple-500/40"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>PAST LESSONS ARCHIVE ({learningModules.length} MODULES AVAILABLE)</span>
          </span>
          {showArchive ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showArchive && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 animate-fadeIn">
            {learningModules.filter(m => activeTopic === 'All' || m.category.includes(activeTopic)).map(lesson => (
              <div
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson)}
                className="glass-panel rounded-2xl p-4 border border-slate-800 hover:border-purple-500/40 cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-purple-300">
                  <span>{lesson.category}</span>
                  <span>{lesson.readTimeMinutes} mins</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 font-sans">{lesson.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 font-sans">{lesson.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FULL LESSON READER MODAL */}
      {selectedLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-2xl glass-modal rounded-3xl p-6 sm:p-8 border border-fuchsia-500/40 shadow-2xl overflow-y-auto max-h-[90vh] space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-purple-900/40">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-mono text-[10px] border border-fuchsia-500/30">
                  {selectedLesson.category}
                </span>
                <h2 className="text-xl font-bold text-slate-100 mt-1 font-sans">{selectedLesson.title}</h2>
              </div>
              <button onClick={() => setSelectedLesson(null)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Body */}
            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4 font-sans">
              <p className="whitespace-pre-line">{selectedLesson.content}</p>
              
              <div className="p-4 rounded-2xl bg-[#130b24] border border-purple-500/20 space-y-2">
                <h4 className="text-xs font-mono font-bold text-fuchsia-400 uppercase">KEY INSIGHTS</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                  {selectedLesson.keyInsights.map((ins, i) => <li key={i}>{ins}</li>)}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#130b24] border border-purple-500/20 space-y-2">
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase">ACTIONABLE TAKEAWAYS</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                  {selectedLesson.actionableTakeaways.map((tak, i) => <li key={i}>{tak}</li>)}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#190b2f] to-[#270c44] border border-fuchsia-500/30 space-y-1">
                <h4 className="text-xs font-mono font-bold text-fuchsia-300 uppercase">REFLECTION QUESTION</h4>
                <p className="italic text-xs text-slate-200">&ldquo;{selectedLesson.reflectionQuestion}&rdquo;</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-purple-900/40 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => handleSaveToNotes(selectedLesson)}
                className="px-4 py-2.5 rounded-xl bg-[#130b24] border border-purple-500/25 text-slate-300 hover:text-fuchsia-400 text-xs font-bold font-mono flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4" />
                SAVE TO SYSTEM NOTES
              </button>

              <div className="flex items-center gap-2">
                {!selectedLesson.completed && (
                  <button
                    onClick={() => {
                      completeLearningModule(selectedLesson.id);
                      setSelectedLesson(prev => prev ? { ...prev, completed: true } : null);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-600 font-bold text-slate-950 text-xs shadow-lg shadow-fuchsia-500/30 flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    MARK COMPLETED & CLAIM +{selectedLesson.xpReward} XP
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
