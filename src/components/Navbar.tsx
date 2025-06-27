import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, BookOpen, Sparkles, User, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', icon: Heart, label: 'Home', hindi: 'घर' },
    { path: '/chat', icon: MessageCircle, label: 'Chat', hindi: 'बात' },
    { path: '/journal', icon: BookOpen, label: 'Journal', hindi: 'डायरी' },
    { path: '/wellness', icon: Sparkles, label: 'Wellness', hindi: 'स्वास्थ्य' },
    { path: '/profile', icon: User, label: 'Profile', hindi: 'प्रोफ़ाइल' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold text-neutral-800">Saathi</span>
              <span className="text-sm text-neutral-500 font-hindi">साथी</span>
            </Link>

            <div className="flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary-100 rounded-lg -z-10"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {user && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-neutral-600">
                  Welcome, {user.name}
                </span>
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary-600" />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="w-7 h-7 text-primary-500" />
              <span className="text-lg font-bold text-neutral-800">Saathi</span>
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-neutral-600 hover:text-primary-600 hover:bg-primary-50"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            y: isMobileMenuOpen ? 0 : -20 
          }}
          className={`${isMobileMenuOpen ? 'block' : 'hidden'} bg-white border-t border-neutral-200`}
        >
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  <span className="text-sm text-neutral-400 font-hindi">{item.hindi}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </nav>

      {/* Bottom Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200">
        <div className="flex justify-around items-center py-2">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center py-2 px-3"
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-primary-600' : 'text-neutral-500'}`} />
                <span className={`text-xs mt-1 ${isActive ? 'text-primary-600' : 'text-neutral-500'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-16"></div>
      <div className="md:hidden h-16"></div>
    </>
  );
}