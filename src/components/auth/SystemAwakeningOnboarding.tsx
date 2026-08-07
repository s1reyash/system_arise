'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { UserDomain } from '@/types/system';
import { Zap, User, ArrowRight, Swords, Sparkles } from 'lucide-react';
import { soundEngine } from '@/lib/sound-engine';

interface OnboardingProps {
  onComplete: () => void;
}

export const SystemAwakeningOnboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { updateProfile, login } = useSystem();

  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState('');
  const [domain, setDomain] = useState<UserDomain>('General Hunter');
  const [occupation, setOccupation] = useState('Sovereign Hunter');
  const [goal, setGoal] = useState('Become the strongest version of myself');
  const [heightCm, setHeightCm] = useState(180);
  const [weightKg, setWeightKg] = useState(75);
  const [isAwakeningCutscene, setIsAwakeningCutscene] = useState(false);

  const triggerDragonAwakening = (onDone: () => void) => {
    soundEngine.playDragonAwakening();
    setIsAwakeningCutscene(true);
    setTimeout(() => {
      onDone();
    }, 2200);
  };

  const handleNext = () => {
    soundEngine.playClick();
    if (step < 3) {
      setStep(step + 1);
    } else {
      triggerDragonAwakening(() => {
        updateProfile({
          displayName: name || 'Awakened Hunter',
          username: (name || 'Hunter').replace(/\s+/g, '').toLowerCase(),
          domain,
          occupation,
          currentGoal: goal,
          heightCm: Number(heightCm),
          weightKg: Number(weightKg)
        });
        onComplete();
      });
    }
  };

  const handleDemoLogin = () => {
    soundEngine.playClick();
    triggerDragonAwakening(() => {
      login('monarch@system.arise', 'password123');
      onComplete();
    });
  };

  const domains: { label: UserDomain; desc: string; icon: string }[] = [
    { label: 'General Hunter', desc: 'Balanced lifestyle, habits & self-growth', icon: '⚡' },
    { label: 'Student', desc: 'Academics, exam prep, deep focus study', icon: '🎓' },
    { label: 'Professional', desc: 'Career, productivity, business growth', icon: '💼' },
    { label: 'Home & Family', desc: 'Household management, mindfulness, wellness', icon: '🏡' },
    { label: 'Fitness Enthusiast', desc: 'Workouts, nutrition & physical conditioning', icon: '💪' },
    { label: 'Creative & Writer', desc: 'Writing, content, art & creative projects', icon: '🎨' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl animate-fadeIn">
      
      {/* CINEMATIC SHADOW DRAGON FIRE AWAKENING CUTSCENE */}
      {isAwakeningCutscene ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07030c] animate-fadeIn text-center p-6 space-y-6">
          <div className="relative w-full max-w-2xl h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-fuchsia-500/60 shadow-[0_0_100px_rgba(217,70,239,0.5)]">
            {/* eslint-disable-next-next/no-img-element */}
            <img 
              src="/monarch_shadow_dragon.png" 
              alt="Shadow Dragon Fire Awakening" 
              className="w-full h-full object-cover animate-pulse"
            />
            
            {/* Top Flame Particle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07030c] via-fuchsia-950/30 to-transparent flex flex-col justify-end p-6">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-mono text-xs font-bold border border-fuchsia-400/50 backdrop-blur-md self-center animate-bounce">
                <Sparkles className="w-4 h-4 text-fuchsia-400" />
                SYSTEM AWAKENING: SHADOW DRAGON FLAME UNLOCKED
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-purple-300 to-cyan-400 font-mono tracking-wide">
              LEVEL 0 HUNTER AWAKENED!
            </h2>
            <p className="text-xs font-mono text-slate-400 animate-pulse">
              Initializing Sovereign HUD Telemetry...
            </p>
          </div>
        </div>
      ) : (
        /* STANDARD ONBOARDING STEPS */
        <div className="relative w-full max-w-xl glass-modal rounded-3xl p-6 sm:p-8 border-2 border-fuchsia-500/40 shadow-[0_0_80px_rgba(217,70,239,0.25)] space-y-6">
          
          {/* Top Badge */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-mono text-xs font-bold border border-fuchsia-400/40">
              <Zap className="w-4 h-4 text-fuchsia-400 animate-pulse" />
              SYSTEM QUEST: HUNTER AWAKENING
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-purple-400 to-cyan-400 font-mono">
              {step === 1 && 'IDENTITY & LIFE DOMAIN'}
              {step === 2 && 'PHYSICAL TELEMETRY & GOAL'}
              {step === 3 && 'SYSTEM INITIALIZATION READY'}
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Step {step} of 3 • You are starting at Level 0 [Awakened] (0 XP)
            </p>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-mono text-fuchsia-300 mb-1">HUNTER NAME *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sung Jin-Woo"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#130b24] border border-purple-500/30 text-slate-100 text-sm focus:outline-none focus:border-fuchsia-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-fuchsia-300 mb-1.5">SELECT YOUR LIFE DOMAIN</label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {domains.map(d => (
                    <button
                      type="button"
                      key={d.label}
                      onClick={() => { setDomain(d.label); setOccupation(d.label); }}
                      className={`p-2.5 rounded-xl border text-left transition-all font-mono text-xs ${
                        domain === d.label
                          ? 'bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-300 font-bold'
                          : 'bg-[#130b24] border-purple-900/40 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{d.icon}</span>
                        <span>{d.label}</span>
                      </div>
                      <div className="text-[10px] font-sans text-slate-400 font-normal mt-0.5">{d.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-fuchsia-300 mb-1">HEIGHT (CM)</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#130b24] border border-purple-500/20 text-slate-100 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-fuchsia-300 mb-1">WEIGHT (KG)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#130b24] border border-purple-500/20 text-slate-100 text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-fuchsia-300 mb-1">PRIMARY SOVEREIGN GOAL</label>
                <textarea
                  rows={2}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="What is your main target for self-improvement?"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#130b24] border border-purple-500/20 text-slate-100 text-sm focus:outline-none focus:border-fuchsia-400"
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-[#130b24] border border-fuchsia-500/30 space-y-2 text-xs font-mono">
                <div className="text-fuchsia-400 font-bold uppercase flex items-center gap-1.5">
                  <Swords className="w-4 h-4 text-fuchsia-400" />
                  INITIAL LEVEL 0 STARTER QUESTS ACTIVATED:
                </div>
                <div className="space-y-1.5 pt-1 text-slate-300">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                    <span>1. Hydrate & Electrolyte Flush</span>
                    <span className="text-cyan-400 font-bold">+5 XP</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                    <span>2. Monarch Morning Awakening</span>
                    <span className="text-amber-400 font-bold">+20 XP</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex justify-between">
                    <span>3. Sovereign Reading (30 Pages)</span>
                    <span className="text-fuchsia-400 font-bold">+25 XP</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 italic pt-1">
                  Completing your first quests will immediately unlock Level 1 [Beginner Hunter]!
                </p>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleNext}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 font-bold text-slate-950 text-sm shadow-lg shadow-fuchsia-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>{step === 3 ? 'ENTER SYSTEM HUD & AWAKEN' : 'CONTINUE STEP'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
              <button onClick={handleDemoLogin} className="text-slate-400 hover:text-fuchsia-300 underline">
                Or Try Existing Hunter Demo Mode
              </button>
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} className="text-slate-400 hover:text-white">
                  Back
                </button>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
