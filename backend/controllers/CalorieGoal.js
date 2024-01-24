const CalorieGoal = require("../models/CalorieGoal");
const User = require("../models/User");

const setCalorieGoal = async (req, res) => {
  try {
    const calorieGoalData = req.body;
    const calorieGoalDataToAdd = { user: req.user._id, ...calorieGoalData };
    const calorieGoal = await CalorieGoal.create(calorieGoalDataToAdd);
    res.status(200).json(calorieGoal);
  } catch (error) {
    console.error("Error saving calorie goal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCalorieGoal = async( req, res) => {
  try {
    
  } catch (error) {
    
  }
}

module.exports = { setCalorieGoal };
