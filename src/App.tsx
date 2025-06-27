import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Journal from './pages/Journal';
import Wellness from './pages/Wellness';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
import { MoodProvider } from './contexts/MoodContext';

function App() {
  return (
    <AuthProvider>
      <MoodProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-secondary-50">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/wellness" element={<Wellness />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </AnimatePresence>
          </div>
        </Router>
      </MoodProvider>
    </AuthProvider>
  );
}

export default App;