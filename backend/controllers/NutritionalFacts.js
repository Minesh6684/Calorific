const NutritionalFacts = require("../models/NutritionalFacts");
const ItemSuggestion = require("../models/ItemSuggestions");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
});

const getNutritionalFacts = async (req, res) => {
  const itemName = req.query.item;
  const amount = req.query.amount;
  const unit = req.query.unit;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `1. Generate nutritional information in JSON format for ${itemName} based on a serving size of ${amount} ${unit}
           2. Include details such as calories, macronutrients (protein, carbohydrates, and fats), and include vitamins and minerals if available.
           3. Ensure that the macronutrients and micronutrients are organized within a single 'nutrients' entity.
           4. Additionally, make sure the output pattern strictly follows this structure:
           {
            "food_item": "[Food Item]",
            "serving_size": "100 grams",
            "nutrition_facts": {
              "calories": [Calories],
              "nutrients": {
                "macronutrients": {
                  "protein": [Protein],
                  "total_fat": [Total Fat],
                  "saturated_fat": [Saturated Fat],
                  "monounsaturated_fat": [Monounsaturated Fat],
                  "polyunsaturated_fat": [Polyunsaturated Fat],
                  "carbohydrates": [Carbohydrates]
                },
                "micronutrients": {
                  "cholesterol": [Cholesterol],
                  "sodium": [Sodium],
                  "potassium": [Potassium]
                },
                "vitamins": {},
                "minerals": {}
              }
            }
          }
          5. Dont mention any kind of introductory sentence please.
          `,
      },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const nutritionalFacts = JSON.parse(response.choices[0].message.content);
  res.status(200).json(nutritionalFacts);
};

module.exports = { getNutritionalFacts };
