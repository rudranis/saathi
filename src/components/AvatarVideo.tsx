import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AvatarVideoProps {
  userName: string;
}

export default function AvatarVideo({ userName }: AvatarVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  const welcomeMessages = [
    `Namaste ${userName}! How are you feeling today?`,
    `I'm here to listen and support you whenever you need.`,
    `Your mental wellness journey matters. Let's take it one step at a time.`,
  ];

  const greetings = [
    `Hello ${userName}! 🙏`,
    `Welcome back, dear friend!`,
    `I'm so glad you're here today.`,
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % welcomeMessages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, welcomeMessages.length]);

  return (
    <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-8 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Avatar Placeholder - In production, this would be the actual AI video */}
        <div className="relative mx-auto mb-6 w-48 h-32 md:w-64 md:h-40 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl overflow-hidden shadow-lg">
          {/* Simulated Video Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-300/50 to-secondary-300/50"></div>
          
          {/* Avatar Face */}
          <motion.div
            animate={{ 
              scale: isPlaying ? [1, 1.02, 1] : 1,
            }}
            transition={{ 
              duration: 2,
              repeat: isPlaying ? Infinity : 0,
              ease: "easeInOut"
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="text-3xl md:text-4xl">🧘‍♀️</div>
            </div>
          </motion.div>

          {/* Audio Waves Animation */}
          {isPlaying && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: ["4px", "16px", "4px"],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  className="w-1 bg-white rounded-full"
                />
              ))}
            </div>
          )}

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-primary-600" />
            ) : (
              <Play className="w-5 h-5 text-primary-600 ml-0.5" />
            )}
          </button>

          {/* Mute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-neutral-600" />
            ) : (
              <Volume2 className="w-4 h-4 text-neutral-600" />
            )}
          </button>
        </div>

        {/* Message Display */}
        <motion.div
          key={currentMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-800 mb-2">
            {greetings[Math.floor(Math.random() * greetings.length)]}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            {welcomeMessages[currentMessage]}
          </p>
        </motion.div>

        {/* Interaction Hint */}
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-sm text-neutral-500"
        >
          {isPlaying ? 'Listening...' : 'Click play to hear Saathi'}
        </motion.div>

        {/* Cultural Touch */}
        <div className="mt-4 text-sm text-neutral-500 font-hindi">
          आपका स्वागत है • You are welcome • আপনাকে স্বাগতম
        </div>
      </motion.div>
    </div>
  );
}