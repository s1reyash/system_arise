'use client';

import React, { useState } from 'react';
import { useSystem } from '@/context/SystemContext';
import { SystemNote } from '@/types/system';
import { FileText, Plus, Pin, Search, Trash2, Tag, Folder, Save, Eye, Edit3 } from 'lucide-react';

export default function NotesPage() {
  const { notes, addNote, updateNote, deleteNote, togglePinNote } = useSystem();

  const [activeNoteId, setActiveNoteId] = useState<string>(notes[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];

  const [titleInput, setTitleInput] = useState(activeNote?.title || '');
  const [contentInput, setContentInput] = useState(activeNote?.content || '');

  // Handle switching active note
  const handleSelectNote = (note: SystemNote) => {
    setActiveNoteId(note.id);
    setTitleInput(note.title);
    setContentInput(note.content);
  };

  const handleCreateNew = () => {
    addNote('New System Log', 'Write your sovereign reflection or brain dump here...', 'General', ['Note']);
  };

  const handleSave = () => {
    if (activeNote) {
      updateNote(activeNote.id, titleInput, contentInput);
    }
  };

  const filteredNotes = notes.filter(n => {
    if (searchTerm && !n.title.toLowerCase().includes(searchTerm.toLowerCase()) && !n.content.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] border border-cyan-500/30 font-bold uppercase">
              SOVEREIGN CHRONICLES
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 font-mono mt-1">
            SYSTEM JOURNAL & BRAIN DUMP
          </h1>
          <p className="text-xs text-slate-400">
            Store directives, strategic reflections, and knowledge notes.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 text-xs shadow-lg shadow-cyan-500/30 hover:scale-[1.02] transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          CREATE NEW NOTE
        </button>
      </div>

      {/* MAIN TWO COLUMN EDITOR LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Note List */}
        <div className="glass-panel rounded-3xl p-4 border border-blue-500/20 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search notes..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-blue-500/20 text-slate-100 text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredNotes.map(note => {
              const isSelected = note.id === activeNoteId;
              return (
                <div
                  key={note.id}
                  onClick={() => handleSelectNote(note)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-cyan-500/40 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold font-mono truncate">{note.title || 'Untitled Note'}</h4>
                    {note.isPinned && <Pin className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-sans">{note.content}</p>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mt-2">
                    <span>{note.folder}</span>
                    <span>{note.updatedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Note Editor */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-cyan-500/30 space-y-4 flex flex-col justify-between min-h-[500px]">
          {activeNote ? (
            <>
              <div className="space-y-3">
                {/* Editor Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    placeholder="Note Title..."
                    className="bg-transparent text-xl font-bold text-slate-100 font-mono focus:outline-none w-full"
                  />

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => togglePinNote(activeNote.id)}
                      className={`p-2 rounded-xl border transition-all ${
                        activeNote.isPinned
                          ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                      title="Pin Note"
                    >
                      <Pin className={`w-4 h-4 ${activeNote.isPinned ? 'fill-cyan-300' : ''}`} />
                    </button>

                    <button
                      onClick={() => setIsPreview(!isPreview)}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 text-xs font-mono flex items-center gap-1"
                    >
                      {isPreview ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span className="hidden sm:inline">{isPreview ? 'Edit' : 'Preview'}</span>
                    </button>

                    <button
                      onClick={() => deleteNote(activeNote.id)}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400"
                      title="Delete Note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Editor Textarea or Preview */}
                {isPreview ? (
                  <div className="prose prose-invert max-w-none text-slate-300 text-sm whitespace-pre-wrap font-sans p-4 rounded-2xl bg-slate-900/60 border border-slate-800 min-h-[350px]">
                    {contentInput}
                  </div>
                ) : (
                  <textarea
                    rows={16}
                    value={contentInput}
                    onChange={(e) => setContentInput(e.target.value)}
                    placeholder="Write in Markdown or plain text..."
                    className="w-full p-4 rounded-2xl bg-slate-900/60 border border-blue-500/20 text-slate-100 text-sm font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 leading-relaxed"
                  />
                )}
              </div>

              {/* Editor Save Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Last updated: {activeNote.updatedAt}
                </span>

                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 text-xs shadow-lg shadow-cyan-500/30 hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  SAVE SYSTEM NOTE
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-slate-500 font-mono text-sm">
              No note selected. Select a note or create a new one.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
