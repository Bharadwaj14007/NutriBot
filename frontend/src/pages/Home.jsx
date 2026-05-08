import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Activity, Heart, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="max-w-3xl space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">AI Dietitian</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          NutriBot uses advanced artificial intelligence to provide personalized diet plans, smart meal suggestions, and 24/7 nutrition guidance.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/register" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105">
            Get Started
          </Link>
          <Link to="/login" className="px-8 py-4 glass hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold rounded-full transition-all transform hover:scale-105">
            Login
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-5xl">
        <FeatureCard 
          icon={<Bot className="w-10 h-10 text-blue-500" />}
          title="AI Chatbot"
          description="Ask any nutrition question and get instant, science-backed answers from our advanced AI."
        />
        <FeatureCard 
          icon={<Activity className="w-10 h-10 text-emerald-500" />}
          title="Smart Planning"
          description="Dynamic daily diet plans tailored to your specific goals, weight, and food preferences."
        />
        <FeatureCard 
          icon={<Heart className="w-10 h-10 text-red-500" />}
          title="Health Tracking"
          description="Monitor your calories, macros, hydration, and weight progress over time beautifully."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass p-6 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-xl"
  >
    <div className="p-4 bg-white/10 dark:bg-black/10 rounded-full">
      {icon}
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

export default Home;
