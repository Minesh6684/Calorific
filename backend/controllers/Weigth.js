const DailyWeight = require("../models/Weight");

const AddWeight = async (req, res) => {
  const user = req.user._id;
  console.log(user);
  console.log(req.body);
  const dailyWeight = await DailyWeight.create({ user: user, ...req.body });
  console.log(dailyWeight);
  res.status(201).json(dailyWeight);
};

const GetWeightRecord = async (req, res) => {
  const user = req.user._id;
  const weightRecord = await DailyWeight.find({ user: user });
  res.status(200).json(weightRecord);
};

module.exports = { AddWeight, GetWeightRecord };
