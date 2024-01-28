const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      food_item: { type: String, required: true },
      serving_size: { type: String, required: true },
      nutrition_facts: {
        calories: { type: Number, required: true },
        nutrients: {
          macronutrients: {
            protein: { type: Number, required: true },
            total_fat: { type: Number, required: true },
            saturated_fat: { type: Number, required: true },
            monounsaturated_fat: { type: Number, required: true },
            polyunsaturated_fat: { type: Number, required: true },
            carbohydrates: { type: Number, required: true },
          },
          micronutrients: {
            cholesterol: { type: Number },
            sodium: { type: Number },
            potassium: { type: Number },
          },
          vitamins: { type: Map, of: Number },
          minerals: { type: Map, of: Number },
        },
      },
    },
  ],
  consumptionDateTime: {
    type: Date,
    required: true,
    timeZone: {
      type: String,
      default: "America/Toronto",
    },
  },
});

const History = mongoose.model("History", historySchema);

module.exports = History;
