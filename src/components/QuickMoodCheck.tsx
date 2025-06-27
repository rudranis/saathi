import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Meh, Frown, Heart } from 'lucide-react';
import { useMood } from '../contexts/MoodContext';
import { format } from 'date-fns';

export default function QuickMoodCheck() {
  const { addMood } = useMood();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [energy, setEnergy] = useState(5);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const moods = [
    { id: 'great', emoji: '😊', label: 'Great', color: 'text-green-500', bg: 'bg-green-100' },
    { id: 'good', emoji: '🙂', label: 'Good', color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'okay', emoji: '😐', label: 'Okay', color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { id: 'low', emoji: '😔', label: 'Low', color: 'text-orange-500', bg: 'bg-orange-100' },
    { id: 'terrible', emoji: '😢', label: 'Terrible', color: 'text-red-500', bg: 'bg-red-100' },
  ];

  const handleSubmit = () => {
    if (selectedMood) {
      addMood({
        date: format(new Date(), 'yyyy-MM-dd'),
        mood: selectedMood as any,
        energy,
        notes,
        tags: [],
      });
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 text-center"
      >
        <Heart className="w-12 h-12 text-primary-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-neutral-800 mb-2">
          Thank you for sharing!
        </h3>
        <p className="text-neutral-600">
          Your mood has been recorded. I'm here whenever you need to talk.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200"
    >
      <div className="text-center mb-6">
        <Smile className="w-8 h-8 text-primary-500 mx-auto mb-2" />
        <h3 className="text-xl font-semibold text-neutral-800 mb-2">
          How are you feeling today?
        </h3>
        <p className="text-neutral-600">
          Let's start with a quick mood check-in
        </p>
      </div>

      {/* Mood Selection */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setSelectedMood(mood.id)}
            className={`p-3 rounded-xl text-center transition-all duration-200 ${
              selectedMood === mood.id
                ? `${mood.bg} ring-2 ring-primary-300 scale-105`
                : 'bg-neutral-50 hover:bg-neutral-100'
            }`}
          >
            <div className="text-2xl mb-1">{mood.emoji}</div>
            <div className={`text-xs font-medium ${selectedMood === mood.id ? mood.color : 'text-neutral-600'}`}>
              {mood.label}
            </div>
          </button>
        ))}
      </div>

      {/* Energy Level */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Energy Level: {energy}/10
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={energy}
          onChange={(e) => setEnergy(Number(e.target.value))}
          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-neutral-500 mt-1">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      {/* Optional Notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Anything specific on your mind? (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Share what's on your heart..."
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedMood}
        className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
          selectedMood
            ? 'bg-primary-500 text-white hover:bg-primary-600 transform hover:scale-105'
            : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
        }`}
      >
        Record My Mood
      </button>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </motion.div>
  );
}