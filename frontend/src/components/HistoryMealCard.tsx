import React from "react";

interface Item {
  food_item: string;
  nutrition_facts: {
    calories: number;
    nutrients: {
      macronutrients: {
        carbohydrates: number;
        monounsaturatedFat: number;
        polyunsaturatedFat: number;
        protein: number;
        saturatedFat: number;
        totalFat: number;
      };
      micronutrients: {
        cholesterol: number;
        potassium: number;
        sodium: number;
      };
      minerals?: Record<string, number>; // You can specify specific mineral types if needed
      vitamins?: Record<string, number>; // You can specify specific vitamin types if needed
    };
  };
  servingSize: string;
}

interface NutritionData {
  consumptionDateTime: string;
  items: Item[];
  user: string;
  __v: number;
  _id: string;
}

interface HistoryMealCardProps {
  meal: NutritionData;
}

const HistoryMealCard: React.FC<HistoryMealCardProps> = ({ meal }) => {
  return (
    <div key={meal._id} className="meal-card">
      {meal.items.map((item, index) => (
        <div key={index}>
          <h3>{item.food_item}</h3>
          <p>Serving Size: {item.servingSize}</p>
          <div className="nutrient-details">
            <h4>Nutrition Facts:</h4>
            <ul>
              <li>Calories: {item.nutrition_facts.calories}</li>
              <li>
                Protein: {item.nutrition_facts.nutrients.macronutrients.protein}
                g
              </li>
              <li>
                Carbohydrates:{" "}
                {item.nutrition_facts.nutrients.macronutrients.carbohydrates}g
              </li>
              <li>
                Fat: {item.nutrition_facts.nutrients.macronutrients.totalFat}g
              </li>
              <li>
                Saturated Fat:{" "}
                {item.nutrition_facts.nutrients.macronutrients.saturatedFat}g
              </li>
              <li>
                Monounsaturated Fat:{" "}
                {
                  item.nutrition_facts.nutrients.macronutrients
                    .monounsaturatedFat
                }
                g
              </li>
              <li>
                Polyunsaturated Fat:{" "}
                {
                  item.nutrition_facts.nutrients.macronutrients
                    .polyunsaturatedFat
                }
                g
              </li>
              <li>
                Cholesterol:{" "}
                {item.nutrition_facts.nutrients.micronutrients.cholesterol}mg
              </li>
              <li>
                Potassium:{" "}
                {item.nutrition_facts.nutrients.micronutrients.potassium}
                mg
              </li>
              <li>
                Sodium: {item.nutrition_facts.nutrients.micronutrients.sodium}mg
              </li>
              {/* Add other nutrients as needed */}
            </ul>
          </div>
        </div>
      ))}
      <p>Consumed on: {meal.consumptionDateTime}</p>
    </div>
  );
};

export default HistoryMealCard;
