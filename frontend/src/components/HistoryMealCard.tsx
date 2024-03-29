import { useState } from "react";
import "../css/HistoryMealCard.css";
import { MdFlipToFront } from "react-icons/md";

interface Item {
  food_item: string;
  nutrition_facts: {
    calories: number;
    nutrients: {
      macronutrients: {
        carbohydrates: number;
        monounsaturated_fat: number;
        polyunsaturated_fat: number;
        protein: number;
        saturated_fat: number;
        total_fat: number;
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
  serving_size: string;
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
  const [isFlipped, setIsFlipped] = useState(false);

  const total_calories = Object.values(meal.items).reduce(
    (total, item) => total + item.nutrition_facts.calories,
    0
  );

  const total_carbs = Object.values(meal.items).reduce(
    (total, item) =>
      total + item.nutrition_facts.nutrients.macronutrients.carbohydrates,
    0
  );

  const total_protein = Object.values(meal.items).reduce(
    (total, item) =>
      total + item.nutrition_facts.nutrients.macronutrients.protein,
    0
  );

  const total_fat = Object.values(meal.items).reduce(
    (total, item) =>
      total + item.nutrition_facts.nutrients.macronutrients.total_fat,
    0
  );

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div className="history-meal-card-container">
      <MdFlipToFront
        className={`history-card-flip-icon ${isFlipped ? "flip" : ""}`}
        onClick={flipCard}
      />
      <div className={`history-meal-card-back ${isFlipped ? "" : "flip"}`}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Food Item</th>
              <th>Serving Size</th>
              <th>Carbs</th>
              <th>Proteins</th>
              <th>Fats</th>
            </tr>
          </thead>
          <tbody>
            {meal.items.map((item, index) => (
              <tr key={index}>
                <td>{item.food_item}</td>
                <td>
                  {item.serving_size.split(" ")[0]}
                  {item.serving_size.split(" ")[1] === "grams" ? "g" : "ml"}
                </td>
                <td>
                  {item.nutrition_facts.nutrients.macronutrients.carbohydrates}
                </td>
                <td>{item.nutrition_facts.nutrients.macronutrients.protein}</td>
                <td>
                  {item.nutrition_facts.nutrients.macronutrients.total_fat}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        key={meal._id}
        className={`history-meal-card ${isFlipped ? "flip" : ""}`}
      >
        <div className="history-meal-details">
          <div className="history-item-list">
            {meal.items.map((item, index) => (
              <p key={index} className="history-item">
                <span className="history-food-item">{item.food_item}</span>
                <span className="history-serving-size">
                  {item.serving_size.split(" ")[0]}
                  {item.serving_size.split(" ")[1] === "grams" ? "g" : "ml"}
                </span>
              </p>
            ))}
          </div>
          <div className="history-totals">
            <p className="history-total-calories">
              <span className="history-label">Calories</span>
              <span className="history-value">{total_calories}</span>
            </p>
          </div>
        </div>
        <div className="history-macronutrients">
          <p className="history-carbs">
            <span className="history-label">Carbs</span>
            <span className="history-value">{total_carbs}</span>
          </p>
          <p className="history-protein">
            <span className="history-label">Protein</span>
            <span className="history-value">{total_protein}</span>
          </p>
          <p className="history-fat">
            <span className="history-label">Fat</span>
            <span className="history-value">{total_fat}</span>
          </p>
        </div>
        <p className="history-consumption-date">
          Consumed on: {meal.consumptionDateTime.slice(11, 16)}
        </p>
      </div>
    </div>
  );
};

export default HistoryMealCard;
