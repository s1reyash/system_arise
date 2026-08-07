'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { INITIAL_LEADERBOARD, INITIAL_GUILDS, INITIAL_GUILD_QUESTS, HunterLeaderboardEntry, HunterGuild, GuildQuestChallenge } from '@/lib/leaderboard-data';
import { Trophy, Users, Swords, Flame, Zap, Shield, Crown, Plus, CheckCircle2, Sparkles, Search } from 'lucide-react';
import { soundEngine } from '@/lib/sound-engine';

export default function LeaderboardPage() {
  const { userStats, userProfile, addNotification } = useSystem();
  
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'guilds' | 'raids'>('leaderboard');
  const [guilds, setGuilds] = useState<HunterGuild[]>(INITIAL_GUILDS);
  const [joinedGuildId, setJoinedGuildId] = useState<string | null>('guild_1');
  const [raids, setRaids] = useState<GuildQuestChallenge[]>(INITIAL_GUILD_QUESTS);

  // New Guild Form Modal
  const [showCreateGuild, setShowCreateGuild] = useState(false);
  const [newGuildName, setNewGuildName] = useState('');
  const [newGuildTag, setNewGuildTag] = useState('');
  const [newGuildDesc, setNewGuildDesc] = useState('');

  const handleJoinGuild = (guildId: string, guildName: string) => {
    soundEngine.playClick();
    setJoinedGuildId(guildId);
    addNotification('Joined Hunter Guild', `You are now a member of [${guildName}].`, 'system');
  };

  const handleCreateGuildSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuildName.trim()) return;
    
    const created: HunterGuild = {
      id: 'guild_' + Date.now(),
      name: newGuildName,
      tag: newGuildTag || 'HUNTER',
      description: newGuildDesc || 'Dedicated Hunter Guild for daily discipline.',
      avatar: '🛡️',
      memberCount: 1,
      totalGuildXP: userStats.currentXP,
      weeklyRaidProgress: 0,
      topMember: userProfile.displayName,
      leader: userProfile.displayName
    };

    setGuilds([created, ...guilds]);
    setJoinedGuildId(created.id);
    setShowCreateGuild(false);
    soundEngine.playAchievement();
    addNotification('Hunter Guild Formed!', `Created Guild [${created.name}].`, 'system');
  };

  const handleClaimRaidXP = (raidId: string, xpReward: number) => {
    soundEngine.playAchievement();
    addNotification(`+${xpReward} GUILD RAID XP`, 'Claimed Guild Raid Reward!', 'quest');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-fuchsia-500/35 bg-gradient-to-br from-[#120822] via-[#1a0b30] to-[#280e46] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-mono text-[10px] border border-fuchsia-500/30 font-bold uppercase">
              GLOBAL COMPETITION & GUILDS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono mt-1">
            HUNTER RANKBOARD & GUILDS
          </h1>
          <p className="text-xs text-purple-300/70">
            Compete with Hunters worldwide, form Guild Squads, and execute Weekly Raid Quests.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateGuild(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-600 font-bold text-slate-950 text-xs font-mono shadow-lg shadow-fuchsia-500/30 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            CREATE GUILD
          </button>
        </div>
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel border border-purple-900/40 w-fit">
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTab === 'leaderboard'
              ? 'bg-fuchsia-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-4 h-4" />
          GLOBAL RANKINGS
        </button>

        <button
          onClick={() => setActiveTab('guilds')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTab === 'guilds'
              ? 'bg-fuchsia-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          HUNTER GUILDS ({guilds.length})
        </button>

        <button
          onClick={() => setActiveTab('raids')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            activeTab === 'raids'
              ? 'bg-fuchsia-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Swords className="w-4 h-4" />
          WEEKLY GUILD RAIDS
        </button>
      </div>

      {/* TAB 1: GLOBAL HUNTER LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="glass-panel rounded-3xl p-6 border border-purple-500/20 space-y-4">
          <h3 className="text-base font-bold font-mono text-slate-100 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            TOP SOVEREIGN HUNTERS
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-purple-900/40 text-purple-300/60 uppercase">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Hunter</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Level & XP</th>
                  <th className="py-3 px-4">Streak</th>
                  <th className="py-3 px-4">Guild</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/20">
                
                {/* YOUR USER POSITION ROW */}
                <tr className="bg-fuchsia-500/10 border-l-4 border-l-fuchsia-500 font-bold">
                  <td className="py-3 px-4 text-fuchsia-300">YOU</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {/* eslint-disable-next-next/no-img-element */}
                      <img src={userProfile.avatar} alt="Avatar" className="w-6 h-6 rounded-lg object-cover" />
                      <span className="text-slate-100">{userProfile.displayName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-fuchsia-300">{userStats.rankTitle}</td>
                  <td className="py-3 px-4 text-cyan-400">LVL {userStats.level} ({userStats.currentXP} XP)</td>
                  <td className="py-3 px-4 text-amber-400">{userStats.currentStreak} Days</td>
                  <td className="py-3 px-4 text-slate-300">Shadow Monarchs</td>
                </tr>

                {/* GLOBAL RANKINGS LIST */}
                {INITIAL_LEADERBOARD.map((hunter) => (
                  <tr key={hunter.id} className="hover:bg-purple-950/30 transition-all">
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        hunter.rank === 1 ? 'bg-amber-400 text-slate-950' :
                        hunter.rank === 2 ? 'bg-slate-300 text-slate-950' :
                        hunter.rank === 3 ? 'bg-amber-700 text-slate-100' : 'text-slate-400'
                      }`}>
                        #{hunter.rank}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <img src={hunter.avatar} alt={hunter.displayName} className="w-7 h-7 rounded-xl object-cover border border-purple-500/30" />
                        <div>
                          <div className="text-slate-200 font-bold">{hunter.displayName}</div>
                          <div className="text-[10px] text-purple-300/60">@{hunter.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-fuchsia-300">{hunter.badge}</td>
                    <td className="py-3.5 px-4 text-cyan-400">LVL {hunter.level} ({hunter.totalXP} XP)</td>
                    <td className="py-3.5 px-4 text-amber-400">{hunter.currentStreak} Days</td>
                    <td className="py-3.5 px-4 text-slate-400">{hunter.guildName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: HUNTER GUILDS */}
      {activeTab === 'guilds' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guilds.map((g) => {
            const isMember = joinedGuildId === g.id;
            return (
              <div key={g.id} className="glass-panel rounded-3xl p-6 border border-purple-500/30 space-y-4 relative flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{g.avatar}</span>
                      <div>
                        <h4 className="text-base font-bold text-slate-100 font-mono">{g.name}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                          [{g.tag}]
                        </span>
                      </div>
                    </div>

                    {isMember && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] border border-emerald-500/30 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> MEMBER
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300/70 leading-relaxed font-sans">{g.description}</p>

                  <div className="p-3 rounded-2xl bg-[#130b24] border border-purple-500/20 space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Members</span>
                      <span className="text-fuchsia-300 font-bold">{g.memberCount} Hunters</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Guild XP</span>
                      <span className="text-cyan-400 font-bold">{g.totalGuildXP} XP</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Leader</span>
                      <span className="text-amber-400 font-bold">{g.leader}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-900/30">
                  {isMember ? (
                    <button disabled className="w-full py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                      ACTIVE SQUAD MEMBER
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoinGuild(g.id, g.name)}
                      className="w-full py-2.5 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-400 text-slate-950 text-xs font-mono font-bold transition-all shadow-md"
                    >
                      JOIN GUILD SQUAD
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: WEEKLY GUILD RAIDS */}
      {activeTab === 'raids' && (
        <div className="space-y-4">
          {raids.map(raid => (
            <div key={raid.id} className="glass-panel rounded-3xl p-6 border border-fuchsia-500/40 bg-gradient-to-r from-[#120822] via-[#1a0b30] to-[#280e46] space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-mono text-[10px] border border-fuchsia-400/30 font-bold">
                    WEEKLY GUILD RAID • {raid.deadline}
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 font-mono mt-1">{raid.title}</h3>
                  <p className="text-xs text-slate-300/70">{raid.description}</p>
                </div>

                <button
                  onClick={() => handleClaimRaidXP(raid.id, raid.xpReward)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-600 text-slate-950 font-bold text-xs font-mono shadow-lg shadow-fuchsia-500/30 flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  CLAIM +{raid.xpReward} RAID XP
                </button>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1 text-slate-300">
                  <span>Guild Raid Progress</span>
                  <span className="text-cyan-400 font-bold">{raid.progress} / {raid.target} {raid.unit}</span>
                </div>
                <div className="w-full h-3 bg-[#0a0512] rounded-full overflow-hidden border border-purple-500/30 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (raid.progress / raid.target) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE GUILD MODAL */}
      {showCreateGuild && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fadeIn">
          <form onSubmit={handleCreateGuildSubmit} className="relative w-full max-w-md glass-modal rounded-3xl p-6 sm:p-8 border border-fuchsia-500/40 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-100 font-mono">CREATE HUNTER GUILD</h3>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">GUILD NAME *</label>
              <input
                type="text"
                required
                value={newGuildName}
                onChange={(e) => setNewGuildName(e.target.value)}
                placeholder="e.g. Sovereign Monarchs"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#130b24] border border-purple-500/20 text-slate-100 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">GUILD TAG *</label>
              <input
                type="text"
                required
                maxLength={8}
                value={newGuildTag}
                onChange={(e) => setNewGuildTag(e.target.value.toUpperCase())}
                placeholder="e.g. MONARCH"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#130b24] border border-purple-500/20 text-slate-100 text-xs font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">GUILD MISSION</label>
              <textarea
                rows={2}
                value={newGuildDesc}
                onChange={(e) => setNewGuildDesc(e.target.value)}
                placeholder="Describe your guild's vision..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#130b24] border border-purple-500/20 text-slate-100 text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateGuild(false)}
                className="px-4 py-2 rounded-xl bg-[#130b24] border border-slate-800 text-slate-300 text-xs font-mono"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-600 text-slate-950 font-bold text-xs font-mono shadow-lg shadow-fuchsia-500/30"
              >
                INITIALIZE GUILD
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
