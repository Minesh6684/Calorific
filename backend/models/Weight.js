const mongoose = require("mongoose");

const dailyWeightSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  weight: { type: Number, required: true },
});

const DailyWeight = mongoose.model("DailyWeight", dailyWeightSchema);

module.exports = DailyWeight;
