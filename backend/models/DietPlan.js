const mongoose = require('mongoose');

const DietPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  meals: {
    breakfast: { name: String, calories: Number, protein: Number, carbs: Number, fats: Number },
    lunch: { name: String, calories: Number, protein: Number, carbs: Number, fats: Number },
    dinner: { name: String, calories: Number, protein: Number, carbs: Number, fats: Number },
    snacks: { name: String, calories: Number, protein: Number, carbs: Number, fats: Number }
  },
  waterIntake: { type: Number, default: 0 }, // current intake
  totalCalories: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('DietPlan', DietPlanSchema);
