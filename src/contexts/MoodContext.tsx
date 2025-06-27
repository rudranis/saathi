import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

export interface MoodEntry {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'okay' | 'low' | 'terrible';
  energy: number; // 1-10
  notes: string;
  tags: string[];
  timestamp: Date;
}

interface MoodContextType {
  moods: MoodEntry[];
  addMood: (mood: Omit<MoodEntry, 'id' | 'timestamp'>) => void;
  getTodayMood: () => MoodEntry | undefined;
  getMoodTrend: () => { mood: string; count: number }[];
  getWeeklyMoods: () => MoodEntry[];
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [moods, setMoods] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const savedMoods = localStorage.getItem('saathi_moods');
    if (savedMoods) {
      const parsedMoods = JSON.parse(savedMoods).map((mood: any) => ({
        ...mood,
        timestamp: new Date(mood.timestamp),
      }));
      setMoods(parsedMoods);
    }
  }, []);

  const addMood = (moodData: Omit<MoodEntry, 'id' | 'timestamp'>) => {
    const newMood: MoodEntry = {
      ...moodData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };

    const updatedMoods = [newMood, ...moods];
    setMoods(updatedMoods);
    localStorage.setItem('saathi_moods', JSON.stringify(updatedMoods));
  };

  const getTodayMood = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return moods.find(mood => mood.date === today);
  };

  const getMoodTrend = () => {
    const moodCounts = moods.reduce((acc, mood) => {
      acc[mood.mood] = (acc[mood.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(moodCounts).map(([mood, count]) => ({ mood, count }));
  };

  const getWeeklyMoods = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return moods.filter(mood => mood.timestamp >= oneWeekAgo);
  };

  return (
    <MoodContext.Provider value={{
      moods,
      addMood,
      getTodayMood,
      getMoodTrend,
      getWeeklyMoods,
    }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
}