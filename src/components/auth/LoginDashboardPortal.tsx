'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { 
  Zap, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Fingerprint, 
  KeyRound, 
  Volume2, 
  VolumeX, 
  ShieldAlert, 
  Smartphone, 
  Globe, 
  CheckCircle2, 
  RefreshCw, 
  Activity, 
  Flame, 
  Eye, 
  EyeOff
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { soundEngine } from '@/lib/sound-engine';

type AuthTab = 'login' | 'pin' | 'biometric' | 'signup' | 'forgot';

interface DemoAccount {
  name: string;
  email: string;
  rank: string;
  level: number;
  avatar: string;
}

const DEMO_HUNTERS: DemoAccount[] = [
  {
    name: 'Sung Jin-Woo',
    email: 'jinwoo@system.arise',
    rank: 'Shadow Monarch',
    level: 99,
    avatar: '/sung_jin_woo_arise.png'
  },
  {
    name: 'Cha Hae-In',
    email: 'cha.haein@system.arise',
    rank: 'S-Rank Hunter',
    level: 78,
    avatar: '/monarch_shadow_dragon.png'
  },
  {
    name: 'Thomas Andre',
    email: 'thomas@system.arise',
    rank: 'National Level Hunter',
    level: 88,
    avatar: '/monarch_shadow_dragon.png'
  }
];

export const LoginDashboardPortal: React.FC = () => {
  const { login, signup, googleLogin, soundEnabled, toggleSound, userProfile, userStats } = useSystem();
  const router = useRouter();

  // Tab & Form State
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [email, setEmail] = useState('jinwoo@system.arise');
  const [password, setPassword] = useState('monarch123');
  const [username, setUsername] = useState('Sung Jin-Woo');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // PIN Access State
  const [pin, setPin] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  // Biometric Scan State
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanSuccess, setScanSuccess] = useState(false);

  // General Status & Cutscene
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isAwakeningCutscene, setIsAwakeningCutscene] = useState(false);
  const [showSecurityDetails, setShowSecurityDetails] = useState(false);

  // Sound playback wrapper
  const triggerSound = (action: () => void) => {
    if (soundEnabled) {
      soundEngine.playClick();
    }
    action();
  };

  // Awakening Animation Trigger
  const triggerAwakening = (onDone: () => void) => {
    soundEngine.playDragonAwakening();
    setIsAwakeningCutscene(true);
    setTimeout(() => {
      onDone();
    }, 2200);
  };

  // Handle Standard Email Login
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMsg({ text: 'Please fill in both email and password.', type: 'error' });
      return;
    }
    triggerAwakening(() => {
      login(email, password);
      router.push('/');
    });
  };

  // Handle Registration
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setMsg({ text: 'Please fill out all registration fields.', type: 'error' });
      return;
    }
    triggerAwakening(() => {
      signup(username, email, password);
      router.push('/');
    });
  };

  // Handle PIN Numpad Press
  const handlePinInput = (num: string) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      soundEngine.playClick();

      if (nextPin.length === 4) {
        if (nextPin === '7777' || nextPin === '1234' || nextPin === '0000') {
          setPinError(null);
          triggerAwakening(() => {
            login('jinwoo@system.arise', 'pin-authenticated');
            router.push('/');
          });
        } else {
          setPinError('INVALID MONARCH PIN • ACCESS DENIED');
          soundEngine.playClick();
          setTimeout(() => {
            setPin('');
            setPinError(null);
          }, 1500);
        }
      }
    }
  };

  const handlePinBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    soundEngine.playClick();
  };

  // Handle Biometric Fingerprint Scan Simulation
  const startBiometricScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    soundEngine.playClick();

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanSuccess(true);
          soundEngine.playXpGain();

          setTimeout(() => {
            triggerAwakening(() => {
              login('jinwoo@system.arise', 'biometric-authenticated');
              router.push('/');
            });
          }, 800);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  // Quick fill demo account credentials
  const selectDemoHunter = (demo: DemoAccount) => {
    setEmail(demo.email);
    setUsername(demo.name);
    setPassword('monarch123');
    soundEngine.playClick();
    setMsg({ text: `Loaded credentials for ${demo.name} [${demo.rank}]`, type: 'info' });
  };

  // Calculate Password Strength
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'Empty', color: 'bg-slate-700' };
    if (pass.length < 6) return { score: 1, label: 'E-Rank (Weak)', color: 'bg-red-500' };
    if (pass.length < 10) return { score: 2, label: 'B-Rank (Medium)', color: 'bg-amber-500' };
    return { score: 3, label: 'S-Rank (Sovereign Shield)', color: 'bg-emerald-400' };
  };

  const pwdStrength = getPasswordStrength(password);

  // Fullscreen Shadow Awakening Cutscene
  if (isAwakeningCutscene) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05020a] animate-fadeIn p-6 space-y-6 text-center">
        <div className="relative w-full max-w-2xl h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-fuchsia-500/70 shadow-[0_0_120px_rgba(217,70,239,0.6)]">
          {/* eslint-disable-next-next/no-img-element */}
          <img 
            src="/monarch_shadow_dragon.png" 
            alt="Shadow Dragon Fire Awakening" 
            className="w-full h-full object-cover animate-pulse scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05020a] via-fuchsia-950/40 to-transparent flex flex-col justify-end p-6">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-mono text-xs font-bold border border-fuchsia-400/60 backdrop-blur-md self-center animate-bounce shadow-lg">
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              SYSTEM AUTHENTICATION: SHADOW MONARCH AWAKENED
            </div>
          </div>
        </div>

        <div className="space-y-3 max-w-md">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-purple-300 to-cyan-400 font-mono tracking-wider">
            AUTHENTICATION COMPLETE
          </h2>
          <p className="text-xs font-mono text-slate-300 animate-pulse">
            Establishing Sovereign Neural Connection to System HUD...
          </p>
          <div className="w-full h-2 bg-[#130b24] rounded-full overflow-hidden border border-fuchsia-500/30 p-0.5">
            <div className="h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 rounded-full animate-pulse w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[88vh] flex flex-col items-center justify-center py-6 px-2 sm:px-4">
      
      {/* TOP PORTAL HEADER & QUICK SETTINGS */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400">
            <ShieldCheck className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-100 font-mono tracking-wide uppercase">
              SOVEREIGN AUTHENTICATION PORTAL
            </h2>
            <p className="text-[11px] text-purple-300/60 font-mono">
              Secure Gateway • Protocol 256-Bit Shadow Encrypted
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-2.5 rounded-xl bg-[#130b24] border border-purple-500/30 text-slate-300 hover:text-fuchsia-400 hover:border-fuchsia-500/50 transition-all text-xs font-mono flex items-center gap-1.5"
            title="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-fuchsia-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            <span className="hidden sm:inline">{soundEnabled ? 'AUDIO ON' : 'MUTED'}</span>
          </button>

          <button
            onClick={() => setShowSecurityDetails(!showSecurityDetails)}
            className={`p-2.5 rounded-xl border transition-all text-xs font-mono flex items-center gap-1.5 ${
              showSecurityDetails 
                ? 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/50' 
                : 'bg-[#130b24] text-slate-300 border-purple-500/30 hover:border-fuchsia-500/40'
            }`}
          >
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">SECURITY TELEMETRY</span>
          </button>
        </div>
      </div>

      {/* SECURITY TELEMETRY EXPANDABLE PANEL */}
      {showSecurityDetails && (
        <div className="w-full max-w-5xl mb-6 glass-panel rounded-2xl p-4 border border-fuchsia-500/35 bg-[#0e071c] space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-purple-900/40 pb-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-200">
              <ShieldAlert className="w-4 h-4 text-fuchsia-400" />
              <span>LIVE SECURITY STATUS & ACTIVE SESSIONS</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              SYSTEM HEALTH: 98.4% PERFECT
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-[#130b24] border border-purple-500/20">
              <div className="text-[10px] text-purple-300/60 flex items-center gap-1">
                <Globe className="w-3 h-3 text-cyan-400" /> CURRENT IP / GATEWAY
              </div>
              <div className="font-bold text-slate-200 mt-1">192.168.1.108 (US-EAST-MONARCH)</div>
              <div className="text-[9px] text-emerald-400 mt-0.5">TLS v1.3 • AES-256 Protocol</div>
            </div>

            <div className="p-3 rounded-xl bg-[#130b24] border border-purple-500/20">
              <div className="text-[10px] text-purple-300/60 flex items-center gap-1">
                <Smartphone className="w-3 h-3 text-fuchsia-400" /> DEVICE & BROWSER
              </div>
              <div className="font-bold text-slate-200 mt-1">macOS • Chrome Sovereign Edition</div>
              <div className="text-[9px] text-purple-300 mt-0.5">Primary Authenticated Device</div>
            </div>

            <div className="p-3 rounded-xl bg-[#130b24] border border-purple-500/20">
              <div className="text-[10px] text-purple-300/60 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-400" /> 2-FACTOR PROTECTION
              </div>
              <div className="font-bold text-amber-300 mt-1">Sovereign Guard Active</div>
              <div className="text-[9px] text-slate-400 mt-0.5">Passkey & Biometric Enabled</div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN LOGIN DASHBOARD CONTAINER */}
      <div className="w-full max-w-5xl glass-modal rounded-3xl overflow-hidden border border-fuchsia-500/40 shadow-2xl grid grid-cols-1 lg:grid-cols-12 relative bg-[#0a0512]">
        
        {/* LEFT COLUMN: HERO ANIME ART & STAT PREVIEW (5 COLS) */}
        <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-[620px] overflow-hidden bg-[#07030c] flex flex-col justify-between p-6 border-b lg:border-b-0 lg:border-r border-fuchsia-500/30">
          {/* Background Artwork */}
          {/* eslint-disable-next-next/no-img-element */}
          <img 
            src="/sung_jin_woo_arise.png" 
            alt="Sung Jin-Woo Monarch Arise" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-80 hover:scale-105 transition-transform duration-700 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07030c] via-[#07030c]/40 to-transparent pointer-events-none" />

          {/* Top Badge */}
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-fuchsia-950/80 backdrop-blur-md text-fuchsia-300 font-mono text-xs font-bold border border-fuchsia-400/50 shadow-lg">
              <Sparkles className="w-4 h-4 text-fuchsia-400 animate-pulse" />
              <span>SYSTEM DASHBOARD PORTAL</span>
            </div>
          </div>

          {/* HUNTER PREVIEW CARD */}
          <div className="relative z-10 space-y-4 my-auto py-6">
            <div className="p-4 rounded-2xl bg-[#0d051a]/90 backdrop-blur-xl border border-fuchsia-500/40 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-purple-900/40 pb-2">
                <span className="text-[10px] font-mono text-purple-300/70 uppercase">TARGET HUNTER STATUS</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 font-bold border border-fuchsia-500/30">
                  {userStats.rankTitle || 'Shadow Monarch'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-600 p-0.5 shadow-md shrink-0">
                  <div className="w-full h-full rounded-[10px] bg-[#0c0517] overflow-hidden flex items-center justify-center">
                    {/* eslint-disable-next-next/no-img-element */}
                    <img 
                      src="/sung_jin_woo_arise.png" 
                      alt="Hunter Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100 font-mono">{username || userProfile.displayName}</h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mt-0.5">
                    <span>LVL <strong className="text-fuchsia-400">{userStats.level}</strong></span>
                    <span>•</span>
                    <span className="text-amber-400 flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-amber-400" />
                      {userStats.currentStreak}D Streak
                    </span>
                  </div>
                </div>
              </div>

              {/* DEMO HUNTERS QUICK SELECTOR */}
              <div className="pt-2">
                <div className="text-[10px] font-mono text-purple-300/70 mb-1.5 flex items-center justify-between">
                  <span>QUICK-FILL HUNTER DEMO ACCOUNTS:</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {DEMO_HUNTERS.map((demo) => (
                    <button
                      key={demo.email}
                      type="button"
                      onClick={() => selectDemoHunter(demo)}
                      className={`p-1.5 rounded-lg border text-[10px] font-mono text-left transition-all truncate ${
                        email === demo.email 
                          ? 'bg-fuchsia-500/25 text-fuchsia-200 border-fuchsia-400 font-bold' 
                          : 'bg-[#150a26]/70 text-slate-300 border-purple-900/40 hover:bg-purple-900/40'
                      }`}
                    >
                      <div className="truncate font-bold">{demo.name.split(' ')[0]}</div>
                      <div className="text-[8px] text-purple-300/60 truncate">Lvl {demo.level}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Monarch Speech Banner */}
          <div className="relative z-10">
            <div className="px-4 py-2.5 rounded-2xl bg-[#0d051a]/95 backdrop-blur-md border border-fuchsia-500/40 text-center space-y-1">
              <div className="text-xl font-extrabold tracking-widest text-fuchsia-300 font-mono drop-shadow-[0_0_15px_rgba(217,70,239,0.8)]">
                ARISE.
              </div>
              <p className="text-[10px] text-purple-200/70 font-mono">
                Log in to resume daily quests, rank progress, & habit stats.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MULTI-TAB AUTHENTICATION INTERFACE (7 COLS) */}
        <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between bg-[#0a0512]/95 backdrop-blur-2xl">
          
          <div className="space-y-5">
            
            {/* AUTH METHOD TABS */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#130b24] border border-purple-500/30 font-mono text-xs">
              <button
                type="button"
                onClick={() => triggerSound(() => setActiveTab('login'))}
                className={`flex-1 min-w-[90px] py-2 px-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'login' 
                    ? 'bg-fuchsia-500 text-slate-950 shadow-md shadow-fuchsia-500/30' 
                    : 'text-purple-200/70 hover:text-slate-100 hover:bg-purple-900/30'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>LOGIN</span>
              </button>

              <button
                type="button"
                onClick={() => triggerSound(() => setActiveTab('pin'))}
                className={`flex-1 min-w-[90px] py-2 px-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'pin' 
                    ? 'bg-fuchsia-500 text-slate-950 shadow-md shadow-fuchsia-500/30' 
                    : 'text-purple-200/70 hover:text-slate-100 hover:bg-purple-900/30'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>PIN ACCESS</span>
              </button>

              <button
                type="button"
                onClick={() => triggerSound(() => setActiveTab('biometric'))}
                className={`flex-1 min-w-[90px] py-2 px-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'biometric' 
                    ? 'bg-fuchsia-500 text-slate-950 shadow-md shadow-fuchsia-500/30' 
                    : 'text-purple-200/70 hover:text-slate-100 hover:bg-purple-900/30'
                }`}
              >
                <Fingerprint className="w-3.5 h-3.5" />
                <span>BIOMETRIC</span>
              </button>

              <button
                type="button"
                onClick={() => triggerSound(() => setActiveTab('signup'))}
                className={`flex-1 min-w-[90px] py-2 px-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'signup' 
                    ? 'bg-fuchsia-500 text-slate-950 shadow-md shadow-fuchsia-500/30' 
                    : 'text-purple-200/70 hover:text-slate-100 hover:bg-purple-900/30'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>REGISTER</span>
              </button>
            </div>

            {/* TAB TITLE & SUBTITLE */}
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-mono tracking-tight flex items-center gap-2">
                {activeTab === 'login' && 'HUNTER CREDENTIAL LOGIN'}
                {activeTab === 'pin' && 'SOVEREIGN 4-DIGIT PIN CODE'}
                {activeTab === 'biometric' && 'SHADOW PASSKEY BIOMETRIC SCAN'}
                {activeTab === 'signup' && 'AWAKEN NEW HUNTER ACCOUNT'}
                {activeTab === 'forgot' && 'SOVEREIGN ACCOUNT RECOVERY'}
              </h1>
              <p className="text-xs text-purple-300/70 font-mono">
                {activeTab === 'login' && 'Enter your registered email and password to access the HUD.'}
                {activeTab === 'pin' && 'Enter your 4-digit security PIN for instant quick access (Default: 7777).'}
                {activeTab === 'biometric' && 'Use simulated fingerprint laser scanner to verify sovereign identity.'}
                {activeTab === 'signup' && 'Register a new profile to begin your questing journey.'}
                {activeTab === 'forgot' && 'Send a system recovery link to restore lost account credentials.'}
              </p>
            </div>

            {/* FEEDBACK NOTIFICATION BANNER */}
            {msg && (
              <div className={`p-3 rounded-xl border text-xs font-mono text-center transition-all ${
                msg.type === 'error' ? 'bg-red-950/60 border-red-500 text-red-300' :
                msg.type === 'success' ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' :
                'bg-fuchsia-950/60 border-fuchsia-400 text-fuchsia-300'
              }`}>
                {msg.text}
              </div>
            )}

            {/* TAB 1: STANDARD EMAIL & PASSWORD LOGIN */}
            {activeTab === 'login' && (
              <form onSubmit={handleEmailLogin} className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">HUNTER EMAIL ADDRESS</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-purple-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hunter@system.arise"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#130b24] border border-purple-500/30 text-slate-100 text-xs focus:outline-none focus:border-fuchsia-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-mono text-slate-300">SECURITY PASSWORD</label>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${pwdStrength.color} text-slate-950 font-bold`}>
                      {pwdStrength.label}
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-purple-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#130b24] border border-purple-500/30 text-slate-100 text-xs focus:outline-none focus:border-fuchsia-400 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-purple-500/40 bg-[#130b24] text-fuchsia-500 focus:ring-0"
                    />
                    <span>Remember this session</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setActiveTab('forgot')}
                    className="text-fuchsia-400 hover:text-fuchsia-300 underline underline-offset-2"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 font-bold text-slate-950 text-xs font-mono shadow-lg shadow-fuchsia-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <span>AUTHENTICATE & ENTER HUD</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* TAB 2: SOVEREIGN 4-DIGIT PIN CODE NUMPAD */}
            {activeTab === 'pin' && (
              <div className="space-y-5 animate-fadeIn flex flex-col items-center">
                {/* PIN Display Dots */}
                <div className="flex items-center justify-center gap-3 py-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className={`w-10 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-extrabold font-mono transition-all ${
                        pin.length > idx
                          ? 'border-fuchsia-400 bg-fuchsia-500/20 text-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.5)]'
                          : 'border-purple-900/50 bg-[#130b24] text-slate-600'
                      }`}
                    >
                      {pin.length > idx ? '●' : ''}
                    </div>
                  ))}
                </div>

                {pinError && (
                  <div className="text-xs font-mono text-red-400 font-bold animate-pulse text-center">
                    {pinError}
                  </div>
                )}

                {/* Digital Numpad Grid */}
                <div className="grid grid-cols-3 gap-2.5 w-full max-w-xs font-mono">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                    <button
                      key={digit}
                      type="button"
                      onClick={() => handlePinInput(digit)}
                      className="py-3 rounded-2xl bg-[#130b24] hover:bg-fuchsia-950/60 border border-purple-500/30 text-slate-100 text-base font-bold transition-all hover:scale-105 active:scale-95 shadow-md"
                    >
                      {digit}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setPin('')}
                    className="py-3 rounded-2xl bg-[#130b24] hover:bg-slate-800 border border-purple-500/20 text-purple-300 text-xs font-bold"
                  >
                    CLEAR
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePinInput('0')}
                    className="py-3 rounded-2xl bg-[#130b24] hover:bg-fuchsia-950/60 border border-purple-500/30 text-slate-100 text-base font-bold transition-all hover:scale-105 active:scale-95 shadow-md"
                  >
                    0
                  </button>

                  <button
                    type="button"
                    onClick={handlePinBackspace}
                    className="py-3 rounded-2xl bg-[#130b24] hover:bg-slate-800 border border-purple-500/20 text-purple-300 text-xs font-bold"
                  >
                    ⌫ DEL
                  </button>
                </div>

                <div className="text-[11px] font-mono text-purple-300/60 text-center">
                  Tip: Master Monarch PIN is set to <strong className="text-fuchsia-400">7777</strong>
                </div>
              </div>
            )}

            {/* TAB 3: BIOMETRIC SCANNER */}
            {activeTab === 'biometric' && (
              <div className="space-y-6 animate-fadeIn flex flex-col items-center text-center py-4">
                <div className="relative">
                  {/* Fingerprint Laser Ring */}
                  <div className={`w-36 h-36 rounded-full border-4 flex items-center justify-center transition-all duration-500 relative overflow-hidden ${
                    scanSuccess 
                      ? 'border-emerald-400 bg-emerald-950/30 shadow-[0_0_40px_rgba(52,211,153,0.6)]'
                      : isScanning 
                      ? 'border-fuchsia-400 bg-fuchsia-950/40 shadow-[0_0_50px_rgba(217,70,239,0.7)] animate-pulse'
                      : 'border-purple-500/40 bg-[#130b24] hover:border-fuchsia-400'
                  }`}>
                    {/* Scanning Laser Line */}
                    {isScanning && (
                      <div 
                        className="absolute w-full h-1 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent shadow-[0_0_10px_#d946ef] transition-all duration-150"
                        style={{ top: `${scanProgress}%` }}
                      />
                    )}

                    <Fingerprint className={`w-20 h-20 transition-all ${
                      scanSuccess ? 'text-emerald-400 scale-110' :
                      isScanning ? 'text-fuchsia-400 animate-pulse' :
                      'text-purple-300/60'
                    }`} />
                  </div>
                </div>

                <div className="space-y-1 font-mono">
                  <h3 className="text-sm font-bold text-slate-100 uppercase">
                    {scanSuccess ? 'BIOMETRIC VERIFIED' : isScanning ? `SCANNING FINGERPRINT (${scanProgress}%)` : 'TOUCH SENSOR TO SCAN'}
                  </h3>
                  <p className="text-xs text-purple-300/70 max-w-xs">
                    Place your thumb on your physical device or click below to simulate Monarch Passkey scan.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isScanning || scanSuccess}
                  onClick={startBiometricScan}
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 font-bold text-slate-950 text-xs font-mono shadow-xl shadow-fuchsia-500/30 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  <Fingerprint className="w-4 h-4" />
                  <span>{isScanning ? 'SCANNING...' : scanSuccess ? 'ACCESS GRANTED' : 'START PASSKEY SCAN'}</span>
                </button>
              </div>
            )}

            {/* TAB 4: NEW HUNTER SIGNUP */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">HUNTER USERNAME</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3.5 text-purple-400" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. Sung Jin-Woo"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#130b24] border border-purple-500/30 text-slate-100 text-xs focus:outline-none focus:border-fuchsia-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">EMAIL ADDRESS</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-purple-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hunter@system.arise"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#130b24] border border-purple-500/30 text-slate-100 text-xs focus:outline-none focus:border-fuchsia-400 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">CREATE PASSWORD</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-purple-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#130b24] border border-purple-500/30 text-slate-100 text-xs focus:outline-none focus:border-fuchsia-400 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 font-bold text-slate-950 text-xs font-mono shadow-lg shadow-fuchsia-500/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AWAKEN ACCOUNT & START LEVEL 1</span>
                </button>
              </form>
            )}

            {/* TAB 5: RECOVERY MODE */}
            {activeTab === 'forgot' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                setMsg({ text: `System verification link dispatched to ${email}`, type: 'success' });
              }} className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">REGISTERED HUNTER EMAIL</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-purple-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hunter@system.arise"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#130b24] border border-purple-500/30 text-slate-100 text-xs focus:outline-none focus:border-fuchsia-400 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 font-bold text-slate-950 text-xs font-mono shadow-lg shadow-fuchsia-500/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>DISPATCH SYSTEM RESET LINK</span>
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="text-xs font-mono text-purple-300 hover:text-fuchsia-300"
                  >
                    ← Back to Login Credentials
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* OAUTH SSO & FOOTER ACTIONS */}
          <div className="space-y-3 pt-6 border-t border-purple-900/40">
            <button
              type="button"
              onClick={() => triggerAwakening(() => {
                googleLogin();
                router.push('/');
              })}
              className="w-full py-2.5 rounded-xl bg-[#130b24] hover:bg-purple-950/60 border border-purple-500/30 text-slate-200 text-xs font-mono font-bold flex items-center justify-center gap-2.5 transition-all hover:border-fuchsia-500/40 shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-fuchsia-400" />
              <span>CONTINUE WITH GOOGLE SSO PROVIDER</span>
            </button>

            <div className="flex items-center justify-between text-[11px] font-mono text-purple-300/60">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Zero Latency Auth
              </span>
              <span>SYSTEM VER 2.5 • SOLO LEVELING OS</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
