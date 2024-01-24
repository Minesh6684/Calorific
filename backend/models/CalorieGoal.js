const mongoose = require("mongoose");

// Define the schema
const calorieGoalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Assuming there's a User model
  calorie_goal: { type: Number, required: true },
  carb_goal: { type: Number, required: true },
  protein_goal: { type: Number, required: true },
});

// Create the Mongoose model
const CalorieGoal = mongoose.model("CalorieGoal", calorieGoalSchema);

module.exports = CalorieGoal;
