const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  gender: { type: String },
  height: { type: Number }, // in cm
  weight: { type: Number }, // in kg
  goal: { type: String, enum: ['Weight Loss', 'Weight Gain', 'Maintain'] },
  activityLevel: { type: String, enum: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Super Active'] },
  foodPreference: { type: String, enum: ['Veg', 'Non-Veg', 'Vegan'] },
  allergies: [{ type: String }],
  waterIntakeGoal: { type: Number, default: 2.5 }, // liters
  dailyCalories: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
