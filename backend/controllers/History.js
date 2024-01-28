const History = require("../models/History");
const User = require("../models/User");

const AddMeal = async (req, res) => {
  try {
    const mealData = req.body;
    const mealDataToAdd = { user: req.user._id, ...mealData };

    // Convert consumptionDateTime to Date object in Toronto time
    const torontoOptions = { timeZone: "America/Toronto" };
    mealDataToAdd.consumptionDateTime = new Date(
      mealDataToAdd.consumptionDateTime
    ).toLocaleString("en-US", torontoOptions);
    console.log(mealDataToAdd);
    const meal = await History.create(mealDataToAdd);
    res.status(200).json(meal);
  } catch (error) {
    console.error("Error parsing meal data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getHistory = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const history = await History.find({ user: user._id });
    console.log(history);
    res.status(200).json(history);
  } else {
    res.status(400).json({ Message: "User Not found" });
  }
};
const DeleteMeal = async (req, res) => {
  console.log("Meal Deleted");
};
module.exports = { AddMeal, DeleteMeal, getHistory };
