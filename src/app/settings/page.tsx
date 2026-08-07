'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { ThemePreset, FontStyleOption, GlowIntensity } from '@/types/system';
import { Palette, Moon, Sun, Type, Sliders, Database, Download, Check, ShieldCheck, HardDrive, Lock } from 'lucide-react';

export default function SettingsPage() {
  const { 
    userProfile, 
    updateThemeSettings, 
    exportDataJSON, 
    importDataJSON 
  } = useSystem();

  const currentTheme = userProfile.themeSettings || {
    preset: 'Sakura Cherry Monarch',
    mode: 'dark',
    fontStyle: 'Sans (Sovereign)',
    glassOpacity: 0.85,
    glassBlur: 20,
    glowIntensity: 'Medium'
  };

  const [importText, setImportText] = useState('');
  const [importMsg, setImportMsg] = useState<{ success: boolean; text: string } | null>(null);

  const presets: { name: ThemePreset; colors: string[]; description: string }[] = [
    {
      name: 'Sakura Cherry Monarch',
      colors: ['#1B0C1A', '#4B2138', '#6D3C52', '#765D67', '#FADCD5'],
      description: 'Elegant Dusky Rose & Plum Obsidian palette.'
    },
    {
      name: 'Apple White Glass',
      colors: ['#f5f5f7', '#ffffff', '#a855f7', '#0071e3'],
      description: 'Clean Apple-Style Pristine Light Mode Glass.'
    },
    {
      name: 'Monarch Purple',
      colors: ['#0a0512', '#180a30', '#a855f7', '#d946ef'],
      description: 'High-contrast Cyber Violet & Neon Magenta.'
    },
    {
      name: 'Cyber Neon',
      colors: ['#07090e', '#0d111d', '#3b82f6', '#00f0ff'],
      description: 'Futuristic Electric Blue & Cyan grid.'
    }
  ];

  const fontOptions: FontStyleOption[] = [
    'Sans (Sovereign)',
    'Mono (Cyber Terminal)',
    'Serif (Elegance)',
    'Roboto (Minimal)'
  ];

  const handlePresetSelect = (name: ThemePreset) => {
    const isLight = name.includes('White');
    updateThemeSettings({
      preset: name,
      mode: isLight ? 'light' : 'dark'
    });
  };

  const handleExport = () => {
    const json = exportDataJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SYSTEM_ARISE_BACKUP_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) return;
    const ok = importDataJSON(importText);
    if (ok) {
      setImportMsg({ success: true, text: 'Backup & Theme preferences restored successfully!' });
      setImportText('');
    } else {
      setImportMsg({ success: false, text: 'Invalid JSON backup format.' });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-accent-primary bg-gradient-to-r from-[#1b0c1a] via-[#2d222f] to-[#4b2138] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-accent-primary/20 text-accent-primary font-mono text-[10px] border border-accent-primary/30 font-bold uppercase flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-accent-primary" />
              SYSTEM CUSTOMIZATION & SECURITY HUD
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 font-mono mt-1">
            THEME & SECURITY CONTROLS
          </h1>
          <p className="text-xs text-slate-300/70">
            Customize visual themes, font typography, liquid glass blur, and local encrypted data backups.
          </p>
        </div>
      </div>

      {/* THEME PRESETS GALLERY */}
      <div className="glass-panel rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-accent-primary" />
          <h3 className="text-base font-bold font-mono">COLOR PALETTE & THEME PRESETS</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {presets.map(p => {
            const isSelected = currentTheme.preset === p.name;
            return (
              <button
                key={p.name}
                onClick={() => handlePresetSelect(p.name)}
                className={`p-4 rounded-2xl border text-left transition-all relative group ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#2d222f] to-[#4b2138] border-accent-primary shadow-[0_0_20px_var(--glow-color)] font-bold'
                    : 'bg-[#1b0c1a]/60 border-slate-800 hover:border-accent-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold font-mono text-slate-100">{p.name}</h4>
                  {isSelected && <Check className="w-4 h-4 text-accent-primary" />}
                </div>

                <p className="text-xs text-slate-300/70 mb-3">{p.description}</p>

                {/* Color Swatch Bar */}
                <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#0a0512]/60 border border-slate-800">
                  {p.colors.map((hex, idx) => (
                    <div
                      key={idx}
                      className="flex-1 h-4 rounded-md border border-white/10"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* TYPOGRAPHY & GLASS EFFECTS ENGINE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Typography & Mode */}
        <div className="glass-panel rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-accent-primary" />
            <h3 className="text-base font-bold font-mono">TYPOGRAPHY & MODE</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">FONT STYLE SELECTOR</label>
              <div className="grid grid-cols-2 gap-2">
                {fontOptions.map(font => (
                  <button
                    key={font}
                    onClick={() => updateThemeSettings({ fontStyle: font })}
                    className={`p-2.5 rounded-xl border text-xs font-mono transition-all ${
                      currentTheme.fontStyle === font
                        ? 'bg-accent-primary/20 border-accent-primary text-accent-primary font-bold'
                        : 'bg-[#1b0c1a] border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {font}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#130b24] border border-slate-800">
              <div>
                <div className="text-xs font-bold font-mono text-slate-200">LIGHT / DARK MODE</div>
                <div className="text-[11px] text-slate-400">Toggle pristine Apple light glass or dark void mode.</div>
              </div>

              <button
                onClick={() => updateThemeSettings({ mode: currentTheme.mode === 'dark' ? 'light' : 'dark' })}
                className="p-2.5 rounded-xl bg-[#1b0c1a] border border-accent-primary/40 text-accent-primary flex items-center gap-2 font-mono text-xs"
              >
                {currentTheme.mode === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span className="capitalize">{currentTheme.mode} Mode</span>
              </button>
            </div>
          </div>
        </div>

        {/* Liquid Glass Opacity & Blur Slider */}
        <div className="glass-panel rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-accent-primary" />
            <h3 className="text-base font-bold font-mono">LIQUID GLASS & GLOW ENGINE</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Glass Backdrop Blur</span>
                <span className="text-accent-primary font-bold">{currentTheme.glassBlur}px</span>
              </div>
              <input
                type="range"
                min="8"
                max="32"
                value={currentTheme.glassBlur}
                onChange={(e) => updateThemeSettings({ glassBlur: Number(e.target.value) })}
                className="w-full accent-accent-primary cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">BORDER GLOW INTENSITY</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Subtle', 'Medium', 'Ultra Glow'] as GlowIntensity[]).map(g => (
                  <button
                    key={g}
                    onClick={() => updateThemeSettings({ glowIntensity: g })}
                    className={`p-2 rounded-xl border text-xs font-mono transition-all ${
                      currentTheme.glowIntensity === g
                        ? 'bg-accent-primary/20 border-accent-primary text-accent-primary font-bold'
                        : 'bg-[#1b0c1a] border-slate-800 text-slate-400'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SYSTEM SECURITY & LOCAL DATA VAULT */}
      <div className="glass-panel rounded-3xl p-6 space-y-4 border border-purple-500/35">
        <div className="flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-accent-primary" />
          <h3 className="text-base font-bold font-mono">LOCAL DATA VAULT & SECURITY BACKUPS</h3>
        </div>

        <p className="text-xs text-slate-300/70">
          All user quests, levels, XP telemetry, and theme preferences are stored safely in local encrypted storage. Export a local JSON backup at any time to preserve or restore your progress.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleExport}
            className="px-5 py-2.5 rounded-xl bg-accent-primary text-slate-950 font-bold font-mono text-xs shadow-lg shadow-accent-primary/30 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            EXPORT BACKUP JSON
          </button>
        </div>

        {/* RESTORE BACKUP FORM */}
        <form onSubmit={handleImportSubmit} className="pt-4 border-t border-purple-900/40 space-y-3">
          <label className="block text-xs font-mono text-slate-300">RESTORE SYSTEM BACKUP (JSON)</label>
          <textarea
            rows={3}
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Paste your SYSTEM_ARISE_BACKUP.json contents here..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b0c1a] border border-slate-800 text-slate-100 text-xs font-mono focus:outline-none focus:border-accent-primary"
          />

          {importMsg && (
            <div className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 ${
              importMsg.success ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}>
              <Check className="w-4 h-4" />
              {importMsg.text}
            </div>
          )}

          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#130b24] border border-slate-800 text-slate-200 hover:text-white text-xs font-mono font-bold"
          >
            RESTORE SYSTEM BACKUP
          </button>
        </form>
      </div>

    </div>
  );
}
