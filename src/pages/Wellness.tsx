import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Brain, Wind, Sun, Moon, Play, Pause } from 'lucide-react';
import { useMood } from '../contexts/MoodContext';

interface WellnessTip {
  id: string;
  title: string;
  description: string;
  category: 'breathing' | 'meditation' | 'affirmation' | 'exercise' | 'mindfulness';
  duration: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

export default function Wellness() {
  const { moods } = useMood();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentTip, setCurrentTip] = useState<WellnessTip | null>(null);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  const tips: WellnessTip[] = [
    {
      id: '1',
      title: '4-7-8 Breathing Technique',
      description: 'A powerful breathing exercise to reduce anxiety and promote relaxation. Inhale for 4, hold for 7, exhale for 8.',
      category: 'breathing',
      duration: '5 min',
      icon: Wind,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
    },
    {
      id: '2',
      title: 'Loving-Kindness Meditation',
      description: 'Send positive thoughts to yourself and others. Start with "May I be happy, may I be peaceful" and extend to loved ones.',
      category: 'meditation',
      duration: '10 min',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      id: '3',
      title: 'Daily Gratitude Practice',
      description: 'Write down three things you\'re grateful for each day. This simple practice can significantly boost your mood.',
      category: 'mindfulness',
      duration: '5 min',
      icon: Sun,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      id: '4',
      title: 'Progressive Muscle Relaxation',
      description: 'Tense and release each muscle group from toes to head. This helps release physical tension and mental stress.',
      category: 'exercise',
      duration: '15 min',
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: '5',
      title: 'Positive Affirmations',
      description: 'Repeat empowering statements to yourself: "I am worthy, I am strong, I am capable of handling challenges."',
      category: 'affirmation',
      duration: '3 min',
      icon: Sparkles,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: '6',
      title: 'Evening Wind-Down Ritual',
      description: 'Create a calming bedtime routine with gentle stretches, journaling, or reading to improve sleep quality.',
      category: 'mindfulness',
      duration: '20 min',
      icon: Moon,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Tips', icon: Sparkles },
    { id: 'breathing', label: 'Breathing', icon: Wind },
    { id: 'meditation', label: 'Meditation', icon: Heart },
    { id: 'mindfulness', label: 'Mindfulness', icon: Brain },
    { id: 'exercise', label: 'Exercise', icon: Sun },
    { id: 'affirmation', label: 'Affirmations', icon: Moon },
  ];

  const getPersonalizedTips = () => {
    if (moods.length === 0) return tips;

    const recentMoods = moods.slice(0, 5);
    const hasAnxiety = recentMoods.some(mood => mood.mood === 'terrible' || mood.mood === 'low');
    const lowEnergy = recentMoods.some(mood => mood.energy < 5);

    let recommendedTips = [...tips];

    if (hasAnxiety) {
      recommendedTips = recommendedTips.sort((a, b) => 
        (a.category === 'breathing' || a.category === 'meditation') ? -1 : 1
      );
    }

    if (lowEnergy) {
      recommendedTips = recommendedTips.sort((a, b) => 
        (a.category === 'affirmation' || a.category === 'exercise') ? -1 : 1
      );
    }

    return recommendedTips;
  };

  const filteredTips = selectedCategory === 'all' 
    ? getPersonalizedTips() 
    : getPersonalizedTips().filter(tip => tip.category === selectedCategory);

  // Breathing exercise timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isBreathingActive) {
      interval = setInterval(() => {
        setBreathingPhase(prev => {
          switch (prev) {
            case 'inhale': return 'hold';
            case 'hold': return 'exhale';
            case 'exhale': return 'inhale';
            default: return 'inhale';
          }
        });
      }, breathingPhase === 'inhale' ? 4000 : breathingPhase === 'hold' ? 7000 : 8000);
    }

    return () => clearInterval(interval);
  }, [isBreathingActive, breathingPhase]);

  const startBreathingExercise = (tip: WellnessTip) => {
    setCurrentTip(tip);
    setIsBreathingActive(true);
    setBreathingPhase('inhale');
  };

  const stopBreathingExercise = () => {
    setIsBreathingActive(false);
    setCurrentTip(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">Wellness Center</h1>
        <p className="text-neutral-600">Personalized tools and exercises for your mental wellness</p>
      </div>

      {/* Personalized Message */}
      {moods.length > 0 && (
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-neutral-800 mb-2">
            Recommended for You
          </h2>
          <p className="text-neutral-600">
            Based on your recent mood patterns, here are some exercises that might help you feel better.
          </p>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Wellness Tips Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredTips.map((tip) => {
            const Icon = tip.icon;
            return (
              <motion.div
                key={tip.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => tip.category === 'breathing' ? startBreathingExercise(tip) : null}
              >
                <div className={`w-12 h-12 ${tip.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${tip.color}`} />
                </div>
                
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors">
                    {tip.title}
                  </h3>
                  <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full">
                    {tip.duration}
                  </span>
                </div>
                
                <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                  {tip.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${tip.color} capitalize`}>
                    {tip.category}
                  </span>
                  {tip.category === 'breathing' && (
                    <Play className="w-4 h-4 text-neutral-400 group-hover:text-primary-600 transition-colors" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Breathing Exercise Modal */}
      <AnimatePresence>
        {currentTip && isBreathingActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
            >
              <h3 className="text-2xl font-bold text-neutral-800 mb-2">
                {currentTip.title}
              </h3>
              <p className="text-neutral-600 mb-8">
                Follow the breathing circle and instructions
              </p>

              {/* Breathing Circle */}
              <div className="relative w-48 h-48 mx-auto mb-8">
                <motion.div
                  animate={{
                    scale: breathingPhase === 'inhale' ? 1.5 : breathingPhase === 'hold' ? 1.5 : 1,
                  }}
                  transition={{
                    duration: breathingPhase === 'inhale' ? 4 : breathingPhase === 'hold' ? 7 : 8,
                    ease: "easeInOut"
                  }}
                  className="w-32 h-32 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      {breathingPhase === 'inhale' ? '4' : breathingPhase === 'hold' ? '7' : '8'}
                    </div>
                    <div className="text-sm text-white/80 capitalize">
                      {breathingPhase}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-lg font-medium text-neutral-700 mb-6 capitalize">
                {breathingPhase === 'inhale' && 'Breathe In Slowly...'}
                {breathingPhase === 'hold' && 'Hold Your Breath...'}
                {breathingPhase === 'exhale' && 'Breathe Out Gently...'}
              </div>

              <button
                onClick={stopBreathingExercise}
                className="bg-neutral-500 text-white px-6 py-3 rounded-lg hover:bg-neutral-600 transition-colors"
              >
                <Pause className="w-4 h-4 inline mr-2" />
                Stop Exercise
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily Inspiration */}
      <div className="mt-12 bg-gradient-to-r from-accent-50 to-primary-50 rounded-2xl p-8 text-center">
        <Heart className="w-12 h-12 text-primary-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-neutral-800 mb-2">
          Daily Inspiration
        </h3>
        <p className="text-lg text-neutral-700 font-medium italic mb-2">
          "You are braver than you believe, stronger than you seem, and more loved than you know."
        </p>
        <p className="text-sm text-neutral-500">
          Remember: Your mental health journey is unique and valid. Take it one day at a time. 💝
        </p>
      </div>
    </motion.div>
  );
}