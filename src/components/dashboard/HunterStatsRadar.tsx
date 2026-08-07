'use client';

import React from 'react';
import { useSystem } from '@/context/SystemContext';
import { Shield, Sparkles } from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';

export const HunterStatsRadar: React.FC = () => {
  const { userStats } = useSystem();
  const { strength, agility, intelligence, discipline, vitality } = userStats.attributePoints;

  const data = [
    { subject: 'Strength', value: strength, fullMark: 100 },
    { subject: 'Agility', value: agility, fullMark: 100 },
    { subject: 'Intelligence', value: intelligence, fullMark: 100 },
    { subject: 'Discipline', value: discipline, fullMark: 100 },
    { subject: 'Vitality', value: vitality, fullMark: 100 },
  ];

  return (
    <div className="glass-panel rounded-3xl p-6 border border-purple-500/20 bg-gradient-to-br from-slate-950 via-slate-900/90 to-purple-950/20 flex flex-col justify-between">
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-100 font-mono">HUNTER ATTRIBUTE RADAR</h3>
            <p className="text-xs text-slate-400">Dynamic stat points evaluation.</p>
          </div>
        </div>
        <span className="text-xs font-mono text-purple-300 font-bold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> LVL {userStats.level}
        </span>
      </div>

      <div className="h-64 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="rgba(168, 85, 247, 0.2)" />
            <PolarAngleAxis dataKey="subject" stroke="#c084fc" tick={{ fill: '#c084fc', fontSize: 11, fontFamily: 'monospace' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(59, 130, 246, 0.2)" tick={false} />
            <Radar
              name="Hunter Stats"
              dataKey="value"
              stroke="#00f0ff"
              fill="#00f0ff"
              fillOpacity={0.35}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-5 gap-1 pt-2 border-t border-slate-800 text-center font-mono text-[10px]">
        <div className="p-1 rounded bg-slate-900 border border-slate-800">
          <div className="text-slate-400">STR</div>
          <div className="text-cyan-400 font-bold">{strength}</div>
        </div>
        <div className="p-1 rounded bg-slate-900 border border-slate-800">
          <div className="text-slate-400">AGI</div>
          <div className="text-cyan-400 font-bold">{agility}</div>
        </div>
        <div className="p-1 rounded bg-slate-900 border border-slate-800">
          <div className="text-slate-400">INT</div>
          <div className="text-purple-400 font-bold">{intelligence}</div>
        </div>
        <div className="p-1 rounded bg-slate-900 border border-slate-800">
          <div className="text-slate-400">DIS</div>
          <div className="text-purple-400 font-bold">{discipline}</div>
        </div>
        <div className="p-1 rounded bg-slate-900 border border-slate-800">
          <div className="text-slate-400">VIT</div>
          <div className="text-emerald-400 font-bold">{vitality}</div>
        </div>
      </div>

    </div>
  );
};
