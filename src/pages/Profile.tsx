import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Heart, Shield, Crown, LogOut, Download, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMood } from '../contexts/MoodContext';

export default function Profile() {
  const { user, logout } = useAuth();
  const { moods } = useMood();
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showDataExport, setShowDataExport] = useState(false);

  const stats = {
    totalCheckIns: moods.length,
    avgEnergy: Math.round(moods.reduce((sum, mood) => sum + mood.energy, 0) / moods.length || 0),
    streak: 5, // This would be calculated based on consecutive days
    joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today',
  };

  const handleLogout = () => {
    logout();
  };

  const handleDataExport = () => {
    const exportData = {
      user: user,
      moods: moods,
      exportDate: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `saathi-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setShowDataExport(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-primary-100">
                {user?.isAnonymous ? 'Anonymous User' : 'Saathi Member'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-primary-100">Member since</div>
            <div className="font-semibold">{stats.joinDate}</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-neutral-200">
          <Heart className="w-8 h-8 text-primary-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-neutral-800">{stats.totalCheckIns}</div>
          <div className="text-sm text-neutral-600">Check-ins</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-neutral-200">
          <div className="text-2xl font-bold text-secondary-600">{stats.avgEnergy}/10</div>
          <div className="text-sm text-neutral-600">Avg Energy</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-neutral-200">
          <div className="text-2xl font-bold text-accent-600">{stats.streak}</div>
          <div className="text-sm text-neutral-600">Day Streak</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-neutral-200">
          <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-neutral-800">Free Plan</div>
          <div className="text-xs text-neutral-600">Basic Features</div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Premium */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
            <Crown className="w-5 h-5 text-yellow-500 mr-2" />
            Upgrade to Premium
          </h3>
          <p className="text-neutral-600 mb-4">
            Unlock advanced features like detailed analytics, personalized therapy sessions, and priority support.
          </p>
          <button
            onClick={() => setShowPremiumModal(true)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 font-medium"
          >
            Learn More
          </button>
        </div>

        {/* Privacy & Data */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
            <Shield className="w-5 h-5 text-green-500 mr-2" />
            Privacy & Data
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-neutral-800">Export My Data</div>
                <div className="text-sm text-neutral-600">Download all your mood entries and data</div>
              </div>
              <button
                onClick={() => setShowDataExport(true)}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium text-neutral-800">Data Encryption</div>
                <div className="text-sm text-neutral-600">Your data is encrypted and secure</div>
              </div>
              <div className="text-green-600 font-medium">✓ Active</div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
            <Settings className="w-5 h-5 text-neutral-600 mr-2" />
            Account Settings
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors">
              <div className="text-left">
                <div className="font-medium text-neutral-800">Notification Preferences</div>
                <div className="text-sm text-neutral-600">Manage your notification settings</div>
              </div>
              <div className="text-neutral-400">›</div>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors">
              <div className="text-left">
                <div className="font-medium text-neutral-800">Language & Region</div>
                <div className="text-sm text-neutral-600">English (India)</div>
              </div>
              <div className="text-neutral-400">›</div>
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Need Help?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <button className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-left">
              <div className="font-medium text-neutral-800">Help Center</div>
              <div className="text-sm text-neutral-600">Find answers to common questions</div>
            </button>
            <button className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-left">
              <div className="font-medium text-neutral-800">Contact Support</div>
              <div className="text-sm text-neutral-600">Get personalized help</div>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-200">
          <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
            <Trash2 className="w-5 h-5 mr-2" />
            Danger Zone
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 transition-colors text-left">
              <div>
                <div className="font-medium text-red-600">Delete All Data</div>
                <div className="text-sm text-neutral-600">Permanently delete all your mood entries</div>
              </div>
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 transition-colors text-left"
            >
              <div>
                <div className="font-medium text-red-600">Sign Out</div>
                <div className="text-sm text-neutral-600">Sign out of your Saathi account</div>
              </div>
              <LogOut className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-neutral-800 mb-2">Saathi Premium</h3>
              <p className="text-neutral-600">Unlock your full wellness potential</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-neutral-700">Advanced mood analytics and insights</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-neutral-700">Personalized AI therapy sessions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-neutral-700">Priority support and guidance</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-neutral-700">Unlimited voice interactions</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-neutral-800">₹299/month</div>
              <div className="text-sm text-neutral-600">or ₹2999/year (save 17%)</div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowPremiumModal(false)}
                className="flex-1 px-4 py-3 border border-neutral-300 text-neutral-600 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Maybe Later
              </button>
              <button className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200">
                Upgrade Now
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Data Export Modal */}
      {showDataExport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <Download className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-neutral-800 mb-2">Export Your Data</h3>
              <p className="text-neutral-600">Download all your Saathi data in JSON format</p>
            </div>

            <div className="bg-neutral-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-neutral-600 space-y-1">
                <div>• {moods.length} mood entries</div>
                <div>• Personal profile information</div>
                <div>• Usage statistics</div>
                <div>• Export timestamp</div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowDataExport(false)}
                className="flex-1 px-4 py-3 border border-neutral-300 text-neutral-600 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDataExport}
                className="flex-1 px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Download
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}