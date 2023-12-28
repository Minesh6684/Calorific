import React from "react";
import { MdCancel } from "react-icons/md";
import "../css/MealCard.css";

interface NutritionalFacts {
  food_item: string;
  serving_size: string;
  nutrition_facts: {
    calories: number;
    nutrients: {
      macronutrients: {
        protein: number;
        total_fat: number;
        saturated_fat: number;
        monounsaturated_fat: number;
        polyunsaturated_fat: number;
        carbohydrates: number;
      };
      micronutrients: {
        cholesterol: number;
        sodium: number;
        potassium: number;
      };
      vitamins: Record<string, number>; // Placeholder for vitamins
      minerals: Record<string, number>; // Placeholder for minerals
    };
  };
}

interface MealCardProps extends NutritionalFacts {
  onDiscard: () => void;
  setIsAddMealModel: (close: boolean) => void;
  // setMealData: (nutritionalFacts: NutritionalFacts) => void;
}

const MealCard: React.FC<MealCardProps> = (props) => {
  // const MealData = props;
  const { /* ... */ onDiscard } = props;
  // const { setIsAddMealModel } = props;
  // const { setMealData } = props;

  const {
    food_item,
    serving_size,
    nutrition_facts: {
      calories,
      nutrients: {
        macronutrients: {
          protein,
          total_fat,
          saturated_fat,
          monounsaturated_fat,
          polyunsaturated_fat,
          carbohydrates,
        },
        micronutrients: { cholesterol, sodium, potassium },
        vitamins,
        minerals,
      },
    },
  } = props;

  const handleDiscard = () => {
    onDiscard();
  };

  return (
    <div className="meal-card">
      <MdCancel onClick={handleDiscard} className="discard-button" />
      <div className="meal-info">
        <div className="meal-head">
          <p>
            <span>{food_item}</span>
            <span>
              {serving_size.split(" ")[0]}
              {serving_size.split(" ")[1] === "grams" ? "g" : "ml"}
            </span>
          </p>
          <p>Calories {calories}</p>
        </div>
        <div className="meal-macros">
          <table>
            <thead>
              <tr>
                <td>Carbs</td>
                <td>Protein</td>
                <td>Fat</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="macro-values">{carbohydrates}g</td>
                <td className="macro-values">{protein}g</td>
                <td className="macro-values">{total_fat}g</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="meal-fat">
          <table>
            <thead>
              <tr>
                <th>Total fat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span>Saturated Fat</span> {saturated_fat}g
                </td>
              </tr>
              <tr>
                <td>
                  <span>Monounsaturated Fat</span> {monounsaturated_fat}g
                </td>
              </tr>
              <tr>
                <td>
                  <span>Polyunsaturated Fat</span> {polyunsaturated_fat}g
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="meal-fat">
          <table>
            <thead>
              <tr>
                <th>Micronutrients</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span>Cholesterol </span>
                  {cholesterol}mg
                </td>
              </tr>
              <tr>
                <td>
                  <span>Sodium </span>
                  {sodium}mg
                </td>
              </tr>
              <tr>
                <td>
                  <span>Potassium</span> {potassium}mg
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {Object.keys(vitamins).length !== 0 && (
          <div className="meal-vitamins">
            <table>
              <thead>
                <tr>
                  <th>Vitamins</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(vitamins).map(([vitamin, value]) => (
                  <tr>
                    <td>
                      {vitamin}: {value}mg
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {Object.keys(minerals).length !== 0 && (
          <div className="meal-minerals">
            <table>
              <thead>
                <tr>
                  <th>Minerals</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(minerals).map(([mineral, value]) => (
                  <tr>
                    <td>
                      {mineral}: {value}mg
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealCard;
