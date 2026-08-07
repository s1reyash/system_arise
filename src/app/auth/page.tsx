'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { Zap, Lock, Mail, User, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { soundEngine } from '@/lib/sound-engine';

export default function AuthPage() {
  const { login, signup, googleLogin } = useSystem();
  const router = useRouter();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [isAwakeningCutscene, setIsAwakeningCutscene] = useState(false);

  const triggerDragonEntrance = (onDone: () => void) => {
    soundEngine.playDragonAwakening();
    setIsAwakeningCutscene(true);
    setTimeout(() => {
      onDone();
    }, 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      triggerDragonEntrance(() => {
        login(email || 'hunter@system.arise', password || 'password123');
        router.push('/');
      });
    } else if (mode === 'signup') {
      triggerDragonEntrance(() => {
        signup(username || 'Hunter', email || 'hunter@system.arise', password || 'password123');
        router.push('/');
      });
    } else if (mode === 'forgot') {
      setMsg('Verification email sent to ' + email);
    }
  };

  const handleGoogle = () => {
    triggerDragonEntrance(() => {
      googleLogin();
      router.push('/');
    });
  };

  if (isAwakeningCutscene) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07030c] animate-fadeIn text-center p-6 space-y-6">
        <div className="relative w-full max-w-2xl h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-fuchsia-500/60 shadow-[0_0_100px_rgba(217,70,239,0.5)]">
          {/* eslint-disable-next-next/no-img-element */}
          <img 
            src="/monarch_shadow_dragon.png" 
            alt="Shadow Dragon Fire Awakening" 
            className="w-full h-full object-cover animate-pulse"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07030c] via-fuchsia-950/30 to-transparent flex flex-col justify-end p-6">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-mono text-xs font-bold border border-fuchsia-400/50 backdrop-blur-md self-center animate-bounce">
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              SYSTEM AUTHENTICATION: SHADOW DRAGON FIRE ENTRANCE
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-purple-300 to-cyan-400 font-mono tracking-wide">
            ACCESS GRANTED • HUNTER AWAKENED!
          </h2>
          <p className="text-xs font-mono text-slate-400 animate-pulse">
            Loading Sovereign System Telemetry...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      
      <div className="w-full max-w-md glass-modal rounded-3xl p-6 sm:p-8 border border-fuchsia-500/40 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Top Glow Accent */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-2 relative z-10">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-purple-600 p-0.5 shadow-lg shadow-fuchsia-500/40 mb-3">
            <div className="w-full h-full bg-[#0d0718] rounded-[14px] flex items-center justify-center">
              <Zap className="w-6 h-6 text-fuchsia-400 animate-pulse" />
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-100 font-mono">
            {mode === 'login' && 'SYSTEM AUTHENTICATION'}
            {mode === 'signup' && 'AWAKEN NEW HUNTER'}
            {mode === 'forgot' && 'VERIFY SYSTEM ACCOUNT'}
          </h1>
          <p className="text-xs text-slate-400">
            Enter your credentials to access your Sovereign System HUD.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">HUNTER USERNAME</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. SungJinWoo"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#130b24] border border-purple-500/20 text-slate-100 text-xs focus:outline-none focus:border-fuchsia-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">EMAIL ADDRESS</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hunter@system.arise"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#130b24] border border-purple-500/20 text-slate-100 text-xs focus:outline-none focus:border-fuchsia-400"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">SECURITY PASSWORD</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#130b24] border border-purple-500/20 text-slate-100 text-xs focus:outline-none focus:border-fuchsia-400"
                />
              </div>
            </div>
          )}

          {msg && (
            <div className="p-3 rounded-xl bg-fuchsia-950/60 border border-fuchsia-400 text-fuchsia-300 text-xs font-mono text-center">
              {msg}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-600 font-bold text-slate-950 text-xs shadow-lg shadow-fuchsia-500/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            <span>{mode === 'login' ? 'AUTHENTICATE & ENTER' : mode === 'signup' ? 'AWAKEN ACCOUNT' : 'SEND RESET LINK'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* GOOGLE LOGIN SIMULATOR */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <button
            onClick={handleGoogle}
            className="w-full py-2.5 rounded-xl bg-[#130b24] hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-mono font-bold flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-fuchsia-400" />
            CONTINUE WITH GOOGLE SSO
          </button>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2">
            {mode === 'login' ? (
              <>
                <button onClick={() => setMode('signup')} className="hover:text-fuchsia-300">Create Account</button>
                <button onClick={() => setMode('forgot')} className="hover:text-fuchsia-300">Forgot Password?</button>
              </>
            ) : (
              <button onClick={() => setMode('login')} className="hover:text-fuchsia-300">Back to Login</button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
