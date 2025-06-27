import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Shield, Sparkles, Play, Pause } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMood } from '../contexts/MoodContext';
import AvatarVideo from '../components/AvatarVideo';
import QuickMoodCheck from '../components/QuickMoodCheck';

export default function Home() {
  const { user, login } = useAuth();
  const { getTodayMood } = useMood();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [name, setName] = useState('');
  const todayMood = getTodayMood();

  const handleAnonymousLogin = () => {
    login();
  };

  const handleNamedLogin = () => {
    if (name.trim()) {
      login(name.trim());
      setShowLoginModal(false);
      setName('');
    }
  };

  const features = [
    {
      icon: MessageCircle,
      title: 'AI Companion',
      description: 'Talk to Saathi anytime, anywhere. Your friendly AI companion understands Hindi, English, and Hinglish.',
      color: 'text-primary-500',
      bg: 'bg-primary-50',
    },
    {
      icon: Shield,
      title: 'Complete Privacy',
      description: 'Anonymous by default. Your conversations and feelings are safe with end-to-end encryption.',
      color: 'text-secondary-500',
      bg: 'bg-secondary-50',
    },
    {
      icon: Sparkles,
      title: 'Personalized Care',
      description: 'Get wellness tips, mood tracking, and personalized guidance based on your emotional journey.',
      color: 'text-accent-500',
      bg: 'bg-accent-50',
    },
  ];

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen"
      >
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-600">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <Heart className="w-16 h-16 text-white mx-auto mb-4" />
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  Meet Saathi
                </h1>
                <p className="text-xl md:text-2xl text-primary-100 font-hindi">
                  आपका AI मानसिक स्वास्थ्य साथी
                </p>
              </motion.div>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto"
              >
                Your empathetic AI companion for mental wellness. Talk freely, track your moods, 
                and get personalized support—all in complete privacy.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <button
                  onClick={handleAnonymousLogin}
                  className="w-full sm:w-auto bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-200 shadow-lg"
                >
                  Start Anonymous Chat
                </button>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="w-full sm:w-auto border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200"
                >
                  Create Profile
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
                Why Choose Saathi?
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Designed specifically for Indian youth, with cultural sensitivity and complete anonymity.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="text-center p-8 rounded-2xl border border-neutral-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Login Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-neutral-800 mb-4 text-center">
                What should I call you?
              </h3>
              <p className="text-neutral-600 mb-6 text-center">
                This helps me personalize our conversations. You can always change this later.
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name (optional)"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg mb-6 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleNamedLogin()}
              />
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 px-4 py-3 border border-neutral-300 text-neutral-600 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNamedLogin}
                  className="flex-1 px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Welcome Section */}
      <div className="mb-8">
        <AvatarVideo userName={user.name} />
      </div>

      {/* Quick Mood Check */}
      {!todayMood && (
        <div className="mb-8">
          <QuickMoodCheck />
        </div>
      )}

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/chat" className="group">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <MessageCircle className="w-8 h-8 text-primary-500" />
              <span className="text-sm text-neutral-500">Available 24/7</span>
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              Chat with Saathi
            </h3>
            <p className="text-neutral-600">
              Share your thoughts and feelings. I'm here to listen and support you.
            </p>
          </div>
        </Link>

        <Link to="/journal" className="group">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <Heart className="w-8 h-8 text-accent-500" />
              <span className="text-sm text-neutral-500">Private & Secure</span>
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              Mood Journal
            </h3>
            <p className="text-neutral-600">
              Track your emotional journey and discover patterns in your wellbeing.
            </p>
          </div>
        </Link>

        <Link to="/wellness" className="group">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <Sparkles className="w-8 h-8 text-secondary-500" />
              <span className="text-sm text-neutral-500">Personalized</span>
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              Wellness Tips
            </h3>
            <p className="text-neutral-600">
              Get daily insights and activities tailored to your emotional needs.
            </p>
          </div>
        </Link>
      </div>

      {/* Today's Summary */}
      {todayMood && (
        <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">
            Today's Check-in
          </h3>
          <div className="flex items-center space-x-4">
            <div className="text-2xl">
              {todayMood.mood === 'great' && '😊'}
              {todayMood.mood === 'good' && '🙂'}
              {todayMood.mood === 'okay' && '😐'}
              {todayMood.mood === 'low' && '😔'}
              {todayMood.mood === 'terrible' && '😢'}
            </div>
            <div>
              <p className="font-medium text-neutral-800 capitalize">
                Feeling {todayMood.mood}
              </p>
              <p className="text-sm text-neutral-600">
                Energy Level: {todayMood.energy}/10
              </p>
            </div>
          </div>
          {todayMood.notes && (
            <p className="mt-4 text-neutral-700 italic">
              "{todayMood.notes}"
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}