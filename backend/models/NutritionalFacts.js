const mongoose = require("mongoose");

const nutritionalFactsSchema = new mongoose.Schema({
  food_item: {
    type: String,
    required: true,
  },
  serving_size: {
    type: String,
    required: true,
  },
  nutrition_facts: {
    calories: {
      type: Number,
      required: true,
    },
    nutrients: {
      macronutrients: {
        protein: Number,
        total_fat: Number,
        saturated_fat: Number,
        monounsaturated_fat: Number,
        polyunsaturated_fat: Number,
        carbohydrates: Number,
      },
      micronutrients: {
        cholesterol: Number,
        sodium: Number,
        potassium: Number,
      },
      vitamins: {
        vitamin_a: Number,
        vitamin_c: Number,
        // ...
      },
      minerals: {
        calcium: Number,
        iron: Number,
      },
    },
  },
});

const NutrionalFacts = mongoose.model(
  "NutritionalFacts",
  nutritionalFactsSchema
);

module.exports = NutrionalFacts;
