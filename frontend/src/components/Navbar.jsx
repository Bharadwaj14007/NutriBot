import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Bot, Activity, Utensils, LogOut } from 'lucide-react';

const Navbar = ({ toggleTheme, theme }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 glass shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-500 dark:text-blue-400">
          <Activity className="w-8 h-8" />
          <span>NutriBot</span>
        </Link>

        <div className="flex items-center space-x-6">
          {token ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-500 transition-colors">Dashboard</Link>
              <Link to="/planner" className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                <Utensils className="w-4 h-4" /> <span>Diet Planner</span>
              </Link>
              <Link to="/chat" className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                <Bot className="w-4 h-4" /> <span>AI Chat</span>
              </Link>
              <button onClick={handleLogout} className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors">
                <LogOut className="w-4 h-4" /> <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-500 transition-colors">Login</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors">Sign Up</Link>
            </>
          )}

          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors">
            {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
