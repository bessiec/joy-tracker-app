'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Coffee, UtensilsCrossed, BookOpen, Smile, Dumbbell, Trees, Calendar, TrendingUp, X, Edit2 } from 'lucide-react';

// Demo data - anonymized real entries
const demoEntries = [
  {
    id: 1777914928041,
    category: "nature",
    timestamp: "2026-05-03T22:15:00.000Z",
    notes: "Sunday Jazz at Jones Coffee Roasters"
  },
  {
    id: 1777914890348,
    category: "etc",
    timestamp: "2026-05-01T17:14:00.000Z",
    notes: "Alumni networking event"
  },
  {
    id: 1777914888477,
    category: "etc",
    timestamp: "2026-04-30T17:14:00.000Z",
    notes: "Tech startup panel and networking reception"
  },
  {
    id: 1777914869747,
    category: "etc",
    timestamp: "2026-04-29T02:14:00.000Z",
    notes: "Community drinks meetup"
  },
  {
    id: 1777348998870,
    category: "projects",
    timestamp: "2026-04-27T04:03:00.000Z",
    notes: "Added restaurant recommendations to city guide project"
  },
  {
    id: 1777348961190,
    category: "coffee",
    timestamp: "2026-04-27T04:02:00.000Z",
    notes: "La Colombe and river walk on a beautiful day"
  },
  {
    id: 1777348982996,
    category: "etc",
    timestamp: "2026-04-26T04:02:00.000Z",
    notes: "Sound healing session, ran into an old friend"
  },
  {
    id: 1777144319170,
    category: "nature",
    timestamp: "2026-04-25T19:11:00.000Z",
    notes: "Farmer's market morning"
  },
  {
    id: 1777144304814,
    category: "content",
    timestamp: "2026-04-24T21:11:00.000Z",
    notes: "Watched Sicario - intense!"
  },
  {
    id: 1777144289959,
    category: "content",
    timestamp: "2026-04-24T01:11:00.000Z",
    notes: "Finished Derry Girls - such a good show"
  },
  {
    id: 1776911715885,
    category: "memory",
    timestamp: "2026-04-23T02:35:00.000Z",
    notes: "Post dinner walk with family"
  },
  {
    id: 1776911707622,
    category: "exercise",
    timestamp: "2026-04-22T02:34:00.000Z",
    notes: "SkiERG leaderboard winner at the gym!"
  },
  {
    id: 1776708757281,
    category: "nature",
    timestamp: "2026-04-19T18:12:00.000Z",
    notes: "Bird watching - saw a mockingbird"
  },
  {
    id: 1776708920664,
    category: "content",
    timestamp: "2026-04-18T18:12:00.000Z",
    notes: "Enjoying several good shows and podcasts lately"
  },
  {
    id: 1776401748652,
    category: "meals",
    timestamp: "2026-04-17T04:55:00.000Z",
    notes: "Birthday dinner with family and amazing taro cake"
  },
  {
    id: 1776311936707,
    category: "exercise",
    timestamp: "2026-04-16T03:58:00.000Z",
    notes: "Great workout"
  },
  {
    id: 1776311910592,
    category: "projects",
    timestamp: "2026-04-16T03:58:00.000Z",
    notes: "Account onboarding for new client"
  },
  {
    id: 1776311899203,
    category: "projects",
    timestamp: "2026-04-16T03:58:00.000Z",
    notes: "Deck furniture maintenance project"
  },
  {
    id: 1776311930512,
    category: "meals",
    timestamp: "2026-04-15T03:58:00.000Z",
    notes: "Taco Tuesday and fancy latte at local cafe"
  },
  {
    id: 1776034663539,
    category: "meals",
    timestamp: "2026-04-12T22:57:00.000Z",
    notes: "Homemade clam noodles - delicious"
  },
  {
    id: 1776034616309,
    category: "meals",
    timestamp: "2026-04-12T22:56:00.000Z",
    notes: "Coffee shop hopping and reservoir walk with a friend"
  },
  {
    id: 1776015109563,
    category: "coffee",
    timestamp: "2026-04-11T22:31:00.000Z",
    notes: "Mango Matcha treat"
  },
  {
    id: 1776015138690,
    category: "etc",
    timestamp: "2026-04-11T17:32:00.000Z",
    notes: "Sound Healing session at the gym"
  },
  {
    id: 1775886560006,
    category: "nature",
    timestamp: "2026-04-10T22:48:00.000Z",
    notes: "Library visit and coffee at beautiful historic building"
  },
  {
    id: 1775837104292,
    category: "memory",
    timestamp: "2026-04-09T07:04:00.000Z",
    notes: "Lunch and walking with family at botanical garden"
  },
  {
    id: 1775706578853,
    category: "etc",
    timestamp: "2026-04-09T03:49:00.000Z",
    notes: "Alumni committee meeting"
  },
  {
    id: 1775706557187,
    category: "meals",
    timestamp: "2026-04-09T01:49:00.000Z",
    notes: "Sushi dinner"
  },
  {
    id: 1775683032931,
    category: "coffee",
    timestamp: "2026-04-08T21:16:00.000Z",
    notes: "Made coffee with special brewing method from recent trip"
  },
  {
    id: 1775682958513,
    category: "meals",
    timestamp: "2026-04-08T19:15:00.000Z",
    notes: "Sushi with family"
  },
  {
    id: 1775682932538,
    category: "memory",
    timestamp: "2026-04-08T02:15:00.000Z",
    notes: "Drinks with old friend - good conversation"
  },
  {
    id: 1775581124337,
    category: "content",
    timestamp: "2026-04-07T16:58:44.337Z",
    notes: "Finished watching great documentary"
  },
  {
    id: 1775534007847,
    category: "projects",
    timestamp: "2026-04-07T03:53:27.847Z",
    notes: "Deployed this joy tracking app!"
  },
  {
    id: 1775533997691,
    category: "exercise",
    timestamp: "2026-04-07T03:53:17.691Z",
    notes: "Solid gym session"
  },
  {
    id: 1775533984036,
    category: "coffee",
    timestamp: "2026-04-07T03:53:04.036Z",
    notes: "Special tea and last treat from recent trip"
  }
];

const sampleAIAnalysis = `# Your Joy Patterns: AI Analysis

## Overview
Over the past month, you've logged **34 moments of joy** across 8 different categories. Here's what your data reveals:

## Key Patterns

**Social Connection is Your Foundation**
Your joy entries show a strong social thread - family meals, friend meetups, alumni events, and community gatherings appear frequently. You find happiness in both intimate moments (family dinners, one-on-one walks) and larger social settings (networking events, community drinks).

**Rituals Matter**
Coffee and tea aren't just beverages for you - they're experiences. From special brewing methods to discovering new cafes, these moments of intentional consumption bring consistent joy. The detail you include ("Mango Matcha treat", "special brewing method from recent trip") shows mindfulness around these rituals.

**The Exercise-Social Connection**
Interestingly, your exercise entries often include a social element (gym leaderboard competition, sound healing sessions). You're not just working out - you're connecting through movement.

**Project Completion Brings Joy**
Your "Fun Projects" category reveals satisfaction from finishing things - deploying this app, completing client work, home maintenance. There's a pattern of pride in accomplishment, whether it's professional or personal.

**Cultural Engagement**
Your "Books, Content, & Music" and event attendance show active cultural participation. You consume thoughtfully (noting specific shows you finished) and engage with your community through panels and conferences.

**Place-Based Joy**
Nature & Places entries reveal you find happiness in urban exploration - farmer's markets, coffee shops, libraries, botanical gardens. These aren't passive visits but active experiences.

## Recommendations

1. **Lean into the social-ritual combo**: Your coffee/meal entries are especially rich when shared with others. Consider making these social coffee dates a weekly ritual.

2. **Document the wins**: You logged "Deployed this joy tracking app!" - more of this! Small project completions clearly bring you satisfaction.

3. **Your streak is strong**: Keep the momentum going. Even quick logs maintain awareness of positive moments.

## What Makes Your Joy Unique

While many people log exercise or meals, your entries show **intentionality**. You're not just eating - you're having "homemade clam noodles." Not just working out - you're "winning the SkiERG leaderboard." This specificity suggests you're already practicing gratitude and mindfulness.

The mix of solitary pleasures (bird watching, finishing shows) and community engagement (alumni events, panels) shows balance between introspection and connection.

---

*Analysis based on 34 entries from April 7 - May 3, 2026. This is a sample analysis - in the self-hosted version, Claude analyzes YOUR actual patterns.*`;

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

export default function DemoPage() {
  const [entries, setEntries] = useState<Entry[]>(demoEntries);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [notes, setNotes] = useState('');
  const [view, setView] = useState<'timeline' | 'stats'>('timeline');
  const [timePeriod, setTimePeriod] = useState<'week' | 'month' | 'allTime'>('week');
  const [showAIModal, setShowAIModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [customDate, setCustomDate] = useState('');

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
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(now);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const last7Days = entries.filter(e => new Date(e.timestamp) >= weekAgo);
    const lastMonth = entries.filter(e => new Date(e.timestamp) >= monthAgo);
    const allTime = entries;

    const getCategoryCounts = (entryList: Entry[]) => {
      const counts: Record<string, number> = {};
      categories.forEach(cat => {
        counts[cat.id] = entryList.filter(e => e.category === cat.id).length;
      });
      return counts;
    };

    return {
      week: { total: last7Days.length, byCategory: getCategoryCounts(last7Days) },
      month: { total: lastMonth.length, byCategory: getCategoryCounts(lastMonth) },
      allTime: { total: allTime.length, byCategory: getCategoryCounts(allTime) }
    };
  };

  const stats = getStats();

  const openModal = (category: Category) => {
    setSelectedCategory(category);
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setCustomDate(`${year}-${month}-${day}T${hours}:${minutes}`);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setNotes('');
    setEditingEntry(null);
    setCustomDate('');
  };

  const quickLog = (category: Category) => {
    const newEntry: Entry = {
      id: Date.now(),
      category: category.id,
      timestamp: new Date().toISOString(),
      notes: '',
    };
    setEntries([newEntry, ...entries].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));
  };

  const saveEntry = () => {
    if (!selectedCategory) return;
    
    const timestamp = customDate ? new Date(customDate).toISOString() : new Date().toISOString();
    
    if (editingEntry) {
      setEntries(entries.map(entry => 
        entry.id === editingEntry.id 
          ? { ...entry, notes: notes.trim(), timestamp: timestamp }
          : entry
      ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    } else {
      const newEntry: Entry = {
        id: Date.now(),
        category: selectedCategory.id,
        timestamp: timestamp,
        notes: notes.trim(),
      };
      setEntries([newEntry, ...entries].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ));
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
      
      const date = new Date(entry.timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      setCustomDate(`${year}-${month}-${day}T${hours}:${minutes}`);
      
      setShowModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Demo Mode Banner */}
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="bg-yellow-400 rounded-full p-2 flex-shrink-0">
              <svg className="w-5 h-5 text-yellow-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-yellow-900 mb-1">Interactive Demo Mode</h3>
              <p className="text-sm text-yellow-800 mb-2">Try all features! Log entries, edit them, view insights. Your changes won't be saved (refreshing resets to sample data).</p>
              <div className="flex gap-2">
                <a 
                  href="/" 
                  className="inline-block bg-yellow-400 text-yellow-900 px-4 py-2 rounded-lg hover:bg-yellow-500 font-medium text-sm"
                >
                  Start Your Own Tracker →
                </a>
                <a 
                  href="https://bessiechu.wordpress.com/2026/05/04/from-idea-to-a-deployed-app-in-one-conversation/" 
                  className="inline-block bg-white text-yellow-900 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium text-sm border-2 border-yellow-400"
                >
                  View Tutorial
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Smile className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-gray-800">Joy Tracker</h1>
          </div>
          <p className="text-gray-600">Capture the small moments that bring you happiness</p>
        </div>

        {/* Quick Log Buttons - Interactive in demo */}
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
            {entries.map(entry => {
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
            })}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Time Period Selector */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setTimePeriod('week')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timePeriod === 'week'
                    ? 'bg-white text-gray-800 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Past 7 Days
              </button>
              <button
                onClick={() => setTimePeriod('month')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timePeriod === 'month'
                    ? 'bg-white text-gray-800 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Past Month
              </button>
              <button
                onClick={() => setTimePeriod('allTime')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timePeriod === 'allTime'
                    ? 'bg-white text-gray-800 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                All Time
              </button>
            </div>

            {/* Summary Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {timePeriod === 'week' ? 'Past 7 Days' : timePeriod === 'month' ? 'Past Month' : 'All Time'}
              </h2>
              <p className="text-gray-600 mb-6">
                You logged <span className="font-bold text-2xl text-blue-600">{stats[timePeriod].total}</span> joy moments
              </p>
              
              <div className="space-y-4">
                {categories.map(category => {
                  const count = stats[timePeriod].byCategory[category.id] || 0;
                  const Icon = category.icon;
                  const percentage = stats[timePeriod].total > 0 ? (count / stats[timePeriod].total) * 100 : 0;
                  
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
            </div>

            {/* Patterns & Insights */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Patterns</h3>
              
              <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Your top joy source</p>
                <p className="text-lg font-semibold text-gray-800">
                  {(() => {
                    const topCategory = Object.entries(stats[timePeriod].byCategory)
                      .sort(([,a], [,b]) => b - a)[0];
                    if (!topCategory || topCategory[1] === 0) return 'No entries yet';
                    const cat = categories.find(c => c.id === topCategory[0]);
                    return `${cat?.name} (${topCategory[1]} ${topCategory[1] === 1 ? 'moment' : 'moments'})`;
                  })()}
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total joy moments logged</p>
                <p className="text-lg font-semibold text-gray-800">{stats[timePeriod].total}</p>
              </div>
            </div>

            {/* AI Analysis Button */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">AI Insights</h3>
                  <p className="text-gray-600 mb-4">Get personalized insights about your joy patterns using AI analysis</p>
                  <button 
                    onClick={() => setShowAIModal(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium shadow-md"
                  >
                    View Sample Analysis
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Analysis Modal */}
        {showAIModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">AI Analysis - Sample</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 prose prose-blue max-w-none">
                <div className="whitespace-pre-wrap text-gray-800">{sampleAIAnalysis}</div>
              </div>

              <div className="sticky bottom-0 bg-gray-50 border-t p-6">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>This is a sample analysis.</strong> In the self-hosted version, Claude API analyzes YOUR actual data. 
                    <a href="https://github.com/yourusername/joy-tracker" className="underline ml-1">See the tutorial to set it up.</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Entry Modal */}
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

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={customDate}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
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