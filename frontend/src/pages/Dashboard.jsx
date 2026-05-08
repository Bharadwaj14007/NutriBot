import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Flame, Droplets, Target, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
    }
  }, [navigate]);

  if (!user) return <div className="text-center mt-20">Loading...</div>;

  const macroData = [
    { name: 'Protein', value: 30, color: '#ef4444' },
    { name: 'Carbs', value: 50, color: '#3b82f6' },
    { name: 'Fats', value: 20, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
        <div className="glass px-4 py-2 rounded-full flex items-center space-x-2">
          <Target className="w-5 h-5 text-blue-500" />
          <span className="font-semibold">Goal: Weight Loss</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Daily Calories" 
          value="1,850" 
          subtitle="Goal: 2,200 kcal"
          icon={<Flame className="w-8 h-8 text-orange-500" />}
          progress={75}
        />
        <MetricCard 
          title="Water Intake" 
          value="1.5 L" 
          subtitle="Goal: 3.0 L"
          icon={<Droplets className="w-8 h-8 text-blue-500" />}
          progress={50}
        />
        <MetricCard 
          title="Active Streak" 
          value="5 Days" 
          subtitle="Keep it up!"
          icon={<Activity className="w-8 h-8 text-emerald-500" />}
          progress={100}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div whileHover={{ scale: 1.01 }} className="glass p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4">Macronutrient Breakdown</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {macroData.map(macro => (
              <div key={macro.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }}></div>
                <span className="text-sm font-medium">{macro.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.01 }} className="glass p-6 rounded-2xl flex flex-col justify-center items-center text-center">
          <Activity className="w-16 h-16 text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">AI Diet Planner</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Let NutriBot generate a personalized meal plan based on your recent progress.</p>
          <button onClick={() => navigate('/planner')} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-colors">
            Go to Planner
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, subtitle, icon, progress }) => (
  <motion.div whileHover={{ y: -5 }} className="glass p-6 rounded-2xl flex items-center space-x-4">
    <div className="p-4 bg-white/10 dark:bg-black/10 rounded-xl">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="text-gray-500 dark:text-gray-400 font-medium">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-gray-400">{subtitle}</p>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  </motion.div>
);

export default Dashboard;
