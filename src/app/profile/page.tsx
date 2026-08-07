'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { UserDomain } from '@/types/system';
import { 
  User, 
  Shield, 
  Sparkles, 
  Flame, 
  Trophy, 
  Award, 
  Activity, 
  Edit, 
  Check, 
  Crown,
  Lock,
  Zap,
  Camera,
  Upload
} from 'lucide-react';

export default function ProfilePage() {
  const { userProfile, userStats, achievements, updateProfile } = useSystem();
  
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(userProfile.displayName);
  const [username, setUsername] = useState(userProfile.username);
  const [domain, setDomain] = useState<UserDomain>(userProfile.domain || 'General Hunter');
  const [avatarUrl, setAvatarUrl] = useState(userProfile.avatar);
  const [age, setAge] = useState(userProfile.age);
  const [heightCm, setHeightCm] = useState(userProfile.heightCm);
  const [weightKg, setWeightKg] = useState(userProfile.weightKg);
  const [missionStatement, setMissionStatement] = useState(userProfile.missionStatement);
  const [currentGoal, setCurrentGoal] = useState(userProfile.currentGoal);

  const [achievementFilter, setAchievementFilter] = useState<string>('All');

  // Handle local image file upload & convert to base64 Data URL for persistent storage
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarUrl(base64String);
        updateProfile({ avatar: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      displayName,
      username,
      domain,
      avatar: avatarUrl,
      age: Number(age),
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      missionStatement,
      currentGoal
    });
    setIsEditing(false);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight Range', color: 'text-amber-400' };
    if (bmi < 24.9) return { category: 'Optimal Sovereign Range', color: 'text-emerald-400 font-bold' };
    if (bmi < 29.9) return { category: 'Overweight Range', color: 'text-amber-400' };
    return { category: 'Heavy Duty Range', color: 'text-red-400' };
  };

  const bmiInfo = getBMICategory(userProfile.bmi);

  const domains: UserDomain[] = ['General Hunter', 'Student', 'Professional', 'Home & Family', 'Fitness Enthusiast', 'Creative & Writer'];
  const categories = ['All', 'Unlocked', 'Hunter Ranks', 'Streak', 'XP & Level', 'Habit Master', 'Discipline & Fitness', 'Knowledge'];

  const filteredAchievements = achievements.filter(a => {
    if (achievementFilter === 'Unlocked') return a.unlocked;
    if (achievementFilter !== 'All') return a.category === achievementFilter;
    return true;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HUNTER STATUS WINDOW HEADER */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-fuchsia-500/35 bg-gradient-to-br from-[#120822] via-[#1a0b30] to-[#280e46] relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-5">
            {/* AVATAR WITH PHOTO UPLOAD TRIGGER */}
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-fuchsia-400 via-purple-600 to-indigo-600 p-1 shadow-2xl shadow-fuchsia-500/40">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-[#0d0718] flex items-center justify-center relative">
                  {/* eslint-disable-next-next/no-img-element */}
                  <img src={userProfile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  
                  {/* Upload Overlay */}
                  <label className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                    <Camera className="w-5 h-5 text-fuchsia-300" />
                    <span className="text-[9px] font-mono text-fuchsia-200 mt-1">UPLOAD</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-fuchsia-500 text-slate-950 text-[10px] font-mono font-bold border border-fuchsia-300">
                LVL {userStats.level}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans">
                  {userProfile.displayName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-mono text-[10px] border border-fuchsia-500/30 font-bold">
                  {userStats.rankTitle}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] border border-cyan-500/30">
                  {userProfile.domain || 'General Hunter'}
                </span>
              </div>

              <p className="text-xs font-mono text-purple-300/70 mt-1">
                @{userProfile.username} • {userProfile.occupation}
              </p>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-300 mt-2">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" /> {userStats.currentStreak} Day Streak
                </span>
                <span className="flex items-center gap-1 text-purple-300 font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> {userStats.currentXP} XP Accumulated
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 rounded-xl bg-[#130b24] border border-purple-500/30 text-fuchsia-300 font-mono text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            {isEditing ? 'CANCEL EDIT' : 'EDIT PROFILE & PHOTO'}
          </button>

        </div>

      </div>

      {/* EDIT PROFILE FORM */}
      {isEditing && (
        <form onSubmit={handleSaveProfile} className="glass-panel rounded-3xl p-6 border border-fuchsia-500/40 space-y-4">
          <h3 className="text-base font-bold text-fuchsia-300 font-mono">UPDATE PROFILE & DOMAIN</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">DISPLAY NAME</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#130b24] border border-purple-500/20 text-slate-100 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">USERNAME</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#130b24] border border-purple-500/20 text-slate-100 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">LIFE DOMAIN / PERSONA</label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value as UserDomain)}
                className="w-full px-3 py-2 rounded-xl bg-[#130b24] border border-purple-500/20 text-slate-100 text-xs font-mono"
              >
                {domains.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">AVATAR IMAGE URL OR UPLOAD</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://..."
                className="flex-1 px-3 py-2 rounded-xl bg-[#130b24] border border-purple-500/20 text-slate-100 text-xs"
              />
              <label className="px-4 py-2 rounded-xl bg-fuchsia-500/20 text-fuchsia-300 font-mono text-xs font-bold border border-fuchsia-400/40 cursor-pointer flex items-center gap-1.5">
                <Upload className="w-4 h-4" />
                <span>UPLOAD FILE</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">HEIGHT (CM)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#130b24] border border-purple-500/20 text-slate-100 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">WEIGHT (KG)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#130b24] border border-purple-500/20 text-slate-100 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">MISSION STATEMENT</label>
            <input
              type="text"
              value={missionStatement}
              onChange={(e) => setMissionStatement(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#130b24] border border-purple-500/20 text-slate-100 text-xs"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-600 font-bold text-slate-950 text-xs shadow-lg shadow-fuchsia-500/30"
          >
            SAVE CHANGES
          </button>
        </form>
      )}

      {/* BODY METRICS & BMI CALCULATOR CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel rounded-2xl p-5 border border-purple-500/20">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>HEIGHT & WEIGHT</span>
            <Activity className="w-4 h-4 text-fuchsia-400" />
          </div>
          <div className="text-xl font-bold text-slate-100 font-mono mt-1">
            {userProfile.heightCm} cm / {userProfile.weightKg} kg
          </div>
          <div className="text-[10px] text-purple-300/60 font-mono mt-1">Physical Telemetry</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-fuchsia-500/30 bg-fuchsia-950/20">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>BMI CALCULATOR</span>
            <Zap className="w-4 h-4 text-fuchsia-400" />
          </div>
          <div className="text-2xl font-extrabold text-fuchsia-300 font-mono mt-1">
            {userProfile.bmi} BMI
          </div>
          <div className={`text-[10px] font-mono mt-1 ${bmiInfo.color}`}>
            {bmiInfo.category}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-purple-500/20">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>ACHIEVEMENTS UNLOCKED</span>
            <Trophy className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-purple-300 font-mono mt-1">
            {unlockedCount} of {achievements.length} Badges
          </div>
          <div className="text-[10px] text-purple-300/60 font-mono mt-1">
            {Math.round((unlockedCount / achievements.length) * 100)}% Mastered
          </div>
        </div>
      </div>

      {/* 100+ ACHIEVEMENTS GALLERY */}
      <div className="glass-panel rounded-3xl p-6 border border-purple-500/20 space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-extrabold text-slate-100 font-mono">
              SOVEREIGN BADGES & ACHIEVEMENTS (100+)
            </h3>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setAchievementFilter(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                  achievementFilter === cat
                    ? 'bg-fuchsia-500 text-slate-950 font-bold'
                    : 'bg-[#130b24] text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-1">
          {filteredAchievements.map(ach => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all space-y-2 ${
                ach.unlocked
                  ? 'bg-purple-950/30 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                  : 'bg-[#130b24]/60 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl border ${ach.unlocked ? 'bg-fuchsia-500/20 border-fuchsia-500/40 text-fuchsia-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                    {ach.unlocked ? <Trophy className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 font-mono">{ach.title}</h4>
                    <span className="text-[9px] font-mono text-purple-300">{ach.category}</span>
                  </div>
                </div>

                <span className="text-xs font-mono text-fuchsia-400 font-bold">
                  +{ach.xpReward} XP
                </span>
              </div>

              <p className="text-[11px] text-slate-300/70 leading-tight font-sans">{ach.description}</p>

              {ach.unlocked ? (
                <div className="text-[9px] font-mono text-emerald-400 flex items-center gap-1 pt-1">
                  <Check className="w-3 h-3" /> Unlocked on {ach.unlockedAt || 'Recent'}
                </div>
              ) : (
                <div className="w-full h-1.5 bg-[#090412] rounded-full overflow-hidden border border-slate-800 mt-1">
                  <div
                    className="h-full bg-purple-500/50"
                    style={{ width: `${Math.min(100, (ach.progress / ach.maxProgress) * 100)}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
