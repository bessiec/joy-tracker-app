'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Coffee, UtensilsCrossed, BookOpen, Smile, Dumbbell, Trees, Calendar, TrendingUp, X, Edit2 } from 'lucide-react';

// Type definitions
interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface Entry {
  id: number;
  category: string;
  timestamp: string;
  notes: string;
}

export default function JoyTracker() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [notes, setNotes] = useState('');
  const [view, setView] = useState<'timeline' | 'stats'>('timeline');
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

  const categories: Category[] = [
    { id: 'coffee', name: 'Coffee & Tea', icon: Coffee, color: 'bg-slate-600' },
    { id: 'meals', name: 'Meals', icon: UtensilsCrossed, color: 'bg-slate-500' },
    { id: 'content', name: 'Books, Content, & Music', icon: BookOpen, color: 'bg-blue-600' },
    { id: 'projects', name: 'Fun Projects', icon: Smile, color: 'bg-indigo-600' },
    { id: 'exercise', name: 'Exercise', icon: Dumbbell, color: 'bg-cyan-600' },
    { id: 'nature', name: 'Nature & Places', icon: Trees, color: 'bg-teal-600' },
    { id: 'memory', name: 'Memory', icon: BookOpen, color: 'bg-purple-600' },
    { id: 'etc', name: 'Etc', icon: Plus, color: 'bg-gray-600' },
  ];

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('joyEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever entries change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('joyEntries', JSON.stringify(entries));
    }
  }, [entries]);

  const openModal = (category: Category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setNotes('');
    setEditingEntry(null);
  };

  const quickLog = (category: Category) => {
    const newEntry: Entry = {
      id: Date.now(),
      category: category.id,
      timestamp: new Date().toISOString(),
      notes: '',
    };
    setEntries([newEntry, ...entries]);
  };

  const saveEntry = () => {
    if (!selectedCategory) return;
    
    if (editingEntry) {
      // Update existing entry
      setEntries(entries.map(entry => 
        entry.id === editingEntry.id 
          ? { ...entry, notes: notes.trim() }
          : entry
      ));
    } else {
      // Create new entry
      const newEntry: Entry = {
        id: Date.now(),
        category: selectedCategory.id,
        timestamp: new Date().toISOString(),
        notes: notes.trim(),
      };
      setEntries([newEntry, ...entries]);
    }
    closeModal();
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const editEntry = (entry: Entry) => {
    const category = getCategoryById(entry.category);
    if (category) {
      setSelectedCategory(category);
      setNotes(entry.notes || '');
      setEditingEntry(entry);
      setShowModal(true);
    }
  };

  const getCategoryById = (id: string): Category | undefined => {
    return categories.find(c => c.id === id);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    
    return `${month}-${day}-${year} at ${time}`;
  };

  const getStats = () => {
    const last7Days = entries.filter(e => {
      const entryDate = new Date(e.timestamp);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    });

    const categoryCounts: Record<string, number> = {};
    categories.forEach(cat => {
      categoryCounts[cat.id] = last7Days.filter(e => e.category === cat.id).length;
    });

    return { total: last7Days.length, byCategory: categoryCounts };
  };

  const exportData = () => {
    const dataStr = JSON.stringify(entries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `joy-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyDataToClipboard = () => {
    const readableData = entries.map(entry => {
      const category = getCategoryById(entry.category);
      return `${formatDate(entry.timestamp)} - ${category?.name}${entry.notes ? '\n  ' + entry.notes : ''}`;
    }).join('\n\n');
    
    navigator.clipboard.writeText(readableData).then(() => {
      alert('Data copied to clipboard! You can paste it into Google Docs.');
    }).catch(err => {
      console.error('Failed to copy:', err);
      alert('Failed to copy. Try the JSON export instead.');
    });
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Smile className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-gray-800">Joy Tracker</h1>
          </div>
          <p className="text-gray-600">Capture the small moments that bring you happiness</p>
          
          {/* Export Buttons */}
          {entries.length > 0 && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={copyDataToClipboard}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium text-sm flex items-center gap-2"
                title="Copy data as text for Google Docs"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Data
              </button>
              <button
                onClick={exportData}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center gap-2"
                title="Export as JSON file"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export JSON
              </button>
            </div>
          )}
        </div>

        {/* Quick Log Buttons */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">Log what brought you joy today</h2>
          <p className="text-sm text-gray-500 mb-4">Click to quick-log, or hover and click + to add notes</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <div key={category.id} className="relative group">
                  <button
                    onClick={() => quickLog(category)}
                    className={`w-full ${category.color} text-white rounded-xl p-4 hover:opacity-90 transition-all transform hover:scale-105 shadow-md`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                  <button
                    onClick={() => openModal(category)}
                    className="absolute top-2 right-2 bg-white/30 hover:bg-white/40 rounded-full p-1.5 md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-sm"
                    title="Add notes"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setView('timeline')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              view === 'timeline'
                ? 'bg-white text-gray-800 shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Timeline
          </button>
          <button
            onClick={() => setView('stats')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              view === 'stats'
                ? 'bg-white text-gray-800 shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Insights
          </button>
        </div>

        {/* Content Area */}
        {view === 'timeline' ? (
          <div className="space-y-3">
            {entries.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <Smile className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 text-lg">No joy moments yet. Start tracking!</p>
              </div>
            ) : (
              entries.map(entry => {
                const category = getCategoryById(entry.category);
                if (!category) return null;
                const Icon = category.icon;
                return (
                  <div
                    key={entry.id}
                    className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${category.color} rounded-lg p-3 flex-shrink-0`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-800">{category.name}</h3>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => editEntry(entry)}
                              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 transition-all"
                              title="Edit notes"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteEntry(entry.id)}
                              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                              title="Delete"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{formatDate(entry.timestamp)}</p>
                        {entry.notes && (
                          <p className="text-gray-700 bg-gray-50 rounded-lg p-3 text-sm">
                            {entry.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Past 7 Days</h2>
            <p className="text-gray-600 mb-6">You logged <span className="font-bold text-2xl text-blue-600">{stats.total}</span> joy moments</p>
            
            <div className="space-y-4">
              {categories.map(category => {
                const count = stats.byCategory[category.id] || 0;
                const Icon = category.icon;
                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                
                return (
                  <div key={category.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`${category.color} rounded-lg p-2`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-700">{category.name}</span>
                      </div>
                      <span className="text-lg font-bold text-gray-800">{count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${category.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {stats.total === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Start logging to see your patterns!</p>
              </div>
            )}
          </div>
        )}

        {/* Modal for adding notes - IMPROVED STYLING */}
        {showModal && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border-2 border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {selectedCategory && (
                    <>
                      <div className={`${selectedCategory.color} rounded-lg p-2`}>
                        {React.createElement(selectedCategory.icon, { className: "w-5 h-5 text-white" })}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{selectedCategory.name}</h3>
                        {editingEntry && (
                          <p className="text-xs text-gray-500">Editing notes</p>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What made this moment special? (optional)"
                className="w-full border-2 border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 placeholder-gray-400"
                rows={4}
                autoFocus
              />

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEntry}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}