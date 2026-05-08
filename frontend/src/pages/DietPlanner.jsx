import React, { useState } from 'react';
import { Utensils, Loader2, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const DietPlanner = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      // Simulate calling Gemini for a plan
      const res = await axios.post(
        'http://localhost:5002/api/chat',
        { message: "Generate a daily diet plan for weight loss. You MUST output ONLY valid JSON without any markdown formatting. The JSON must have this exact structure: { \"breakfast\": { \"name\": \"string\", \"calories\": 0, \"protein\": 0, \"carbs\": 0, \"fats\": 0 }, \"lunch\": { \"name\": \"string\", \"calories\": 0, \"protein\": 0, \"carbs\": 0, \"fats\": 0 }, \"dinner\": { \"name\": \"string\", \"calories\": 0, \"protein\": 0, \"carbs\": 0, \"fats\": 0 }, \"snacks\": { \"name\": \"string\", \"calories\": 0, \"protein\": 0, \"carbs\": 0, \"fats\": 0 } }" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const reply = res.data.reply;
      
      // Parse JSON from Gemini response (strip markdown if present)
      let jsonString = reply;
      if (reply.includes('```json')) {
        jsonString = reply.split('```json')[1].split('```')[0].trim();
      } else if (reply.includes('```')) {
        jsonString = reply.split('```')[1].split('```')[0].trim();
      }
      
      try {
        const generatedPlan = JSON.parse(jsonString);
        setPlan(generatedPlan);
      } catch (parseErr) {
        console.error("Failed to parse Gemini JSON:", jsonString);
        // Fallback to mock data if AI fails to format properly
        setPlan({
          breakfast: { name: 'Oatmeal with Berries & Nuts', calories: 350, protein: 12, carbs: 45, fats: 15 },
          lunch: { name: 'Grilled Chicken Salad', calories: 450, protein: 40, carbs: 20, fats: 25 },
          dinner: { name: 'Baked Salmon with Quinoa', calories: 500, protein: 35, carbs: 40, fats: 20 },
          snacks: { name: 'Greek Yogurt with Honey', calories: 200, protein: 15, carbs: 25, fats: 5 }
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold flex justify-center items-center space-x-3">
          <Utensils className="w-10 h-10 text-emerald-500" />
          <span>Smart Diet Planner</span>
        </h1>
        <p className="text-gray-500 text-lg">Generate personalized daily meal plans instantly using AI.</p>
        
        <button 
          onClick={generatePlan}
          disabled={loading}
          className="mt-6 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full shadow-lg transition-all flex items-center justify-center space-x-2 mx-auto disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Utensils className="w-5 h-5" />}
          <span>{loading ? 'Generating Plan...' : 'Generate New Plan'}</span>
        </button>
      </div>

      {plan && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <MealCard title="Breakfast" data={plan.breakfast} color="border-orange-400" />
          <MealCard title="Lunch" data={plan.lunch} color="border-green-400" />
          <MealCard title="Dinner" data={plan.dinner} color="border-blue-400" />
          <MealCard title="Snacks" data={plan.snacks} color="border-purple-400" />
          
          <div className="md:col-span-2 flex justify-end mt-4">
            <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors">
              <Save className="w-5 h-5" />
              <span>Save Plan</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const MealCard = ({ title, data, color }) => (
  <div className={`glass p-6 rounded-2xl border-t-4 ${color}`}>
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-lg mb-4 font-medium">{data.name}</p>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-center">
        <span className="block text-gray-500">Calories</span>
        <span className="font-bold">{data.calories} kcal</span>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-center">
        <span className="block text-gray-500">Protein</span>
        <span className="font-bold">{data.protein}g</span>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-center">
        <span className="block text-gray-500">Carbs</span>
        <span className="font-bold">{data.carbs}g</span>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-center">
        <span className="block text-gray-500">Fats</span>
        <span className="font-bold">{data.fats}g</span>
      </div>
    </div>
  </div>
);

export default DietPlanner;
