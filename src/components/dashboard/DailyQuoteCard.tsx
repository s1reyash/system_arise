'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { Quote, RefreshCw, Heart, Share2, Sparkles, Check } from 'lucide-react';

export const DailyQuoteCard: React.FC = () => {
  const { activeQuote, getRandomQuote, toggleQuoteFavorite } = useSystem();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`"${activeQuote.text}" — ${activeQuote.author}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative overflow-hidden glass-panel rounded-3xl p-6 border border-purple-500/20 bg-gradient-to-br from-slate-950 via-slate-900/90 to-purple-950/30">
      
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Quote className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              DAILY SOVEREIGN WISDOM
            </span>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[10px] border border-purple-500/30 uppercase">
          {activeQuote.category}
        </span>
      </div>

      <p className="text-base sm:text-lg font-serif italic text-slate-100 leading-relaxed my-3">
        &ldquo;{activeQuote.text}&rdquo;
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
        <span className="font-mono text-xs text-cyan-300 font-bold">
          — {activeQuote.author}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleQuoteFavorite(activeQuote.id)}
            className={`p-2 rounded-xl border transition-all ${
              activeQuote.isFavorite
                ? 'bg-red-500/20 border-red-500/40 text-red-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Favorite Quote"
          >
            <Heart className={`w-4 h-4 ${activeQuote.isFavorite ? 'fill-red-400' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-all"
            title="Copy Quote"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={getRandomQuote}
            className="p-2 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30 transition-all"
            title="Next Wisdom"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
