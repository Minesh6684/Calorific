const mongoose = require("mongoose");

// Define the schema
const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Assuming there's a User model
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
        cholesterol: { type: Number, required: true },
        sodium: { type: Number, required: true },
        potassium: { type: Number, required: true },
      },
      vitamins: { type: Map, of: Number },
      minerals: { type: Map, of: Number },
    },
  },
  consumptionDateTime: { type: Date, default: Date.now },
});

// Create the Mongoose model
const History = mongoose.model("History", historySchema);

module.exports = History;
