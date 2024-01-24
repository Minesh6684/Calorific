const CalorieGoal = require("../models/CalorieGoal");

const doesCalorieGoalExist = async (userId) => {
  const calorieGoalExist = await CalorieGoal.find({ user: userId });
  return calorieGoalExist.length > 0;
};

const setCalorieGoal = async (req, res) => {
  try {
    const userId = req.user._id;
    const calorieGoalExists = await doesCalorieGoalExist(userId);
    const calorieGoalData = req.body;
    const calorieGoalDataToAdd = { user: userId, ...calorieGoalData };

    if (!calorieGoalExists) {
      console.log("CalorieGoal does not exist");
      const calorieGoal = await CalorieGoal.create(calorieGoalDataToAdd);
      res.status(201).json(calorieGoal);
    } else {
      const calorieGoal = await CalorieGoal.findOneAndUpdate(
        { user: userId },
        calorieGoalDataToAdd,
        { new: true, upsert: true }
      );
      console.log("Updated goal", calorieGoal);
      res.status(200).json(calorieGoal);
    }
  } catch (error) {
    console.error("Error saving/updating calorie goal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCalorieGoal = async (req, res) => {
  try {
    const userId = req.user._id;
    const calorieGoal = await CalorieGoal.find({ user: userId });
    res.status(200).json(calorieGoal);
  } catch (error) {
    console.error("Error retrieving calorie goal:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { setCalorieGoal, getCalorieGoal };
