import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, MicOff, Heart, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'saathi';
  timestamp: Date;
  type: 'text' | 'voice';
}

export default function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: `Hello ${user?.name}! I'm Saathi, your AI mental wellness companion. I'm here to listen, support, and help you navigate your emotions. Feel free to share whatever is on your mind - I'm here for you. 🌟`,
        sender: 'saathi',
        timestamp: new Date(),
        type: 'text',
      };
      setMessages([welcomeMessage]);
    }
  }, [user?.name, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateSaathiResponse = (userMessage: string): string => {
    const responses = {
      greetings: [
        "Thank you for sharing that with me. Your feelings are completely valid.",
        "I hear you, and I want you to know that you're not alone in this.",
        "It takes courage to open up. I'm grateful you trust me with your thoughts.",
      ],
      sadness: [
        "I can sense you're going through a difficult time. It's okay to feel sad - emotions are a natural part of being human. Would you like to talk about what's troubling you?",
        "Your feelings matter, and it's important to acknowledge them. Sometimes just expressing our sadness can help us process it better.",
        "I'm here to listen without judgment. Sadness can feel overwhelming, but remember that this feeling is temporary and you have the strength to get through this.",
      ],
      anxiety: [
        "Anxiety can feel really overwhelming. Let's try some grounding techniques together. Can you tell me 5 things you can see around you right now?",
        "I understand how anxiety can make everything feel uncertain. Remember to breathe slowly and deeply. You're safe right now.",
        "Anxiety often makes us worry about things that might never happen. Let's focus on the present moment together.",
      ],
      stress: [
        "Stress can be really challenging to manage. What's been weighing on your mind lately?",
        "It sounds like you have a lot on your plate. Remember, it's okay to take things one step at a time.",
        "When we're stressed, our minds can feel scattered. Let's try to break down what's bothering you into smaller, manageable pieces.",
      ],
      motivation: [
        "You're stronger than you realize. Every day you show up is a victory worth celebrating.",
        "I believe in your ability to overcome challenges. You've made it through difficult times before, and you can do it again.",
        "Your journey matters, and every small step forward is progress. I'm proud of you for reaching out.",
      ],
      general: [
        "Thank you for sharing that with me. How are you feeling about everything right now?",
        "I'm listening. Please tell me more about what's on your mind.",
        "Your thoughts and feelings are important. I'm here to support you through whatever you're experiencing.",
      ],
    };

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      return responses.sadness[Math.floor(Math.random() * responses.sadness.length)];
    }
    if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('nervous')) {
      return responses.anxiety[Math.floor(Math.random() * responses.anxiety.length)];
    }
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelm') || lowerMessage.includes('pressure')) {
      return responses.stress[Math.floor(Math.random() * responses.stress.length)];
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
    }
    if (lowerMessage.includes('motivation') || lowerMessage.includes('encourage') || lowerMessage.includes('give up')) {
      return responses.motivation[Math.floor(Math.random() * responses.motivation.length)];
    }
    
    return responses.general[Math.floor(Math.random() * responses.general.length)];
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const saathiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateSaathiResponse(inputText),
        sender: 'saathi',
        timestamp: new Date(),
        type: 'text',
      };

      setMessages(prev => [...prev, saathiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would handle voice recording
    if (!isRecording) {
      // Start recording
      setTimeout(() => {
        setIsRecording(false);
        // Simulate voice message
        const voiceMessage: Message = {
          id: Date.now().toString(),
          text: "Voice message received - I heard you expressing some concerns. Let me respond to what you shared...",
          sender: 'user',
          timestamp: new Date(),
          type: 'voice',
        };
        setMessages(prev => [...prev, voiceMessage]);
      }, 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col"
    >
      {/* Chat Header */}
      <div className="bg-white rounded-t-2xl border-b border-neutral-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neutral-800">Saathi</h2>
            <p className="text-sm text-neutral-500">Always here to listen</p>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 bg-white overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 text-neutral-800'
              }`}
            >
              {message.type === 'voice' && (
                <div className="flex items-center space-x-2 mb-2">
                  <Mic className="w-4 h-4" />
                  <span className="text-xs opacity-75">Voice Message</span>
                </div>
              )}
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-2 ${
                message.sender === 'user' ? 'text-primary-100' : 'text-neutral-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-neutral-100 rounded-2xl px-4 py-3 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm text-neutral-600">Saathi is typing...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-b-2xl border-t border-neutral-200 p-4">
        <div className="flex items-end space-x-3">
          <button
            onClick={toggleRecording}
            className={`p-3 rounded-full transition-all duration-200 ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <div className="flex-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Share your thoughts, feelings, or what's on your mind..."
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={1}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
          </div>

          <button
            onClick={sendMessage}
            disabled={!inputText.trim() || isLoading}
            className={`p-3 rounded-full transition-all duration-200 ${
              inputText.trim() && !isLoading
                ? 'bg-primary-500 text-white hover:bg-primary-600 transform hover:scale-105'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Helpful Prompts */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "I'm feeling anxious today",
            "Need some motivation",
            "Help me process my emotions",
            "Breathing exercises",
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInputText(prompt)}
              className="px-3 py-1 text-sm bg-neutral-100 text-neutral-600 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}