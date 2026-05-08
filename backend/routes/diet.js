const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const DietPlan = require('../models/DietPlan');

// Get diet plan for a specific date
router.get('/:date', auth, async (req, res) => {
  try {
    let plan = await DietPlan.findOne({ userId: req.user.id, date: req.params.date });
    if (!plan) {
      plan = new DietPlan({
        userId: req.user.id,
        date: req.params.date,
        meals: {
          breakfast: { name: "", calories: 0, protein: 0, carbs: 0, fats: 0 },
          lunch: { name: "", calories: 0, protein: 0, carbs: 0, fats: 0 },
          dinner: { name: "", calories: 0, protein: 0, carbs: 0, fats: 0 },
          snacks: { name: "", calories: 0, protein: 0, carbs: 0, fats: 0 }
        }
      });
      await plan.save();
    }
    res.json(plan);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Update diet plan
router.post('/', auth, async (req, res) => {
  try {
    const { date, meals, waterIntake, totalCalories } = req.body;
    let plan = await DietPlan.findOne({ userId: req.user.id, date });
    
    if (plan) {
      plan.meals = meals || plan.meals;
      plan.waterIntake = waterIntake !== undefined ? waterIntake : plan.waterIntake;
      plan.totalCalories = totalCalories !== undefined ? totalCalories : plan.totalCalories;
      await plan.save();
      return res.json(plan);
    }

    plan = new DietPlan({
      userId: req.user.id,
      date,
      meals,
      waterIntake,
      totalCalories
    });
    await plan.save();
    res.json(plan);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
