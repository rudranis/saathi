import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Heart, Plus, Filter } from 'lucide-react';
import { useMood } from '../contexts/MoodContext';
import { format, parseISO } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Journal() {
  const { moods, getMoodTrend } = useMood();
  const [view, setView] = useState<'list' | 'chart'>('list');
  const [filter, setFilter] = useState<'all' | 'week' | 'month'>('all');

  const moodColors = {
    great: '#22c55e',
    good: '#3b82f6',
    okay: '#f59e0b',
    low: '#f97316',
    terrible: '#ef4444',
  };

  const moodEmojis = {
    great: '😊',
    good: '🙂',
    okay: '😐',
    low: '😔',
    terrible: '😢',
  };

  const getFilteredMoods = () => {
    const now = new Date();
    switch (filter) {
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return moods.filter(mood => mood.timestamp >= weekAgo);
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return moods.filter(mood => mood.timestamp >= monthAgo);
      default:
        return moods;
    }
  };

  const filteredMoods = getFilteredMoods();
  const moodTrend = getMoodTrend();

  const chartData = filteredMoods.reduce((acc, mood) => {
    const date = format(mood.timestamp, 'MMM dd');
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ date, count: 1, mood: mood.mood });
    }
    return acc;
  }, [] as { date: string; count: number; mood: string }[]).slice(-7);

  const pieData = moodTrend.map(item => ({
    name: item.mood,
    value: item.count,
    fill: moodColors[item.mood as keyof typeof moodColors],
  }));

  if (moods.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="text-center bg-white rounded-2xl p-12 shadow-sm border border-neutral-200">
          <Heart className="w-16 h-16 text-primary-500 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-neutral-800 mb-4">
            Start Your Wellness Journey
          </h2>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto">
            Your mood journal is empty. Track your daily emotions to gain insights into your mental wellness patterns.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Record Your First Mood
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">Mood Journal</h1>
        <p className="text-neutral-600">Track your emotional journey and discover patterns</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'list'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-neutral-600 hover:bg-primary-50'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Timeline
          </button>
          <button
            onClick={() => setView('chart')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              view === 'chart'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-neutral-600 hover:bg-primary-50'
            }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Analytics
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-neutral-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
          </select>
        </div>
      </div>

      {view === 'list' ? (
        /* Timeline View */
        <div className="space-y-4">
          {filteredMoods.map((mood) => (
            <motion.div
              key={mood.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{moodEmojis[mood.mood]}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 capitalize">
                      Feeling {mood.mood}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {format(mood.timestamp, 'EEEE, MMMM d, yyyy • h:mm a')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-neutral-600 mb-1">Energy Level</div>
                  <div className="flex items-center space-x-1">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-4 rounded-sm ${
                          i < mood.energy ? 'bg-primary-500' : 'bg-neutral-200'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium text-neutral-700">
                      {mood.energy}/10
                    </span>
                  </div>
                </div>
              </div>

              {mood.notes && (
                <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                  <p className="text-neutral-700 italic">"{mood.notes}"</p>
                </div>
              )}

              {mood.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {mood.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        /* Analytics View */
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mood Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">
              Mood Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Trends */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">
              Recent Activity
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights */}
          <div className="lg:col-span-2 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">
              Personal Insights
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {filteredMoods.length}
                </div>
                <div className="text-sm text-neutral-600">Total Check-ins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600">
                  {Math.round(
                    filteredMoods.reduce((sum, mood) => sum + mood.energy, 0) / 
                    filteredMoods.length || 0
                  )}/10
                </div>
                <div className="text-sm text-neutral-600">Avg Energy Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">
                  {moodTrend.length > 0 ? 
                    moodEmojis[moodTrend.sort((a, b) => b.count - a.count)[0].mood as keyof typeof moodEmojis] : 
                    '😊'
                  }
                </div>
                <div className="text-sm text-neutral-600">Most Common Mood</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}