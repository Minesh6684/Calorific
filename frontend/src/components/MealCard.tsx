import React from "react";

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
      <button onClick={handleDiscard}>Discard</button>
      <div className="meal-info">
        <h2>{food_item}</h2>
        <p>Serving Size: {serving_size}</p>
        <p>Calories: {calories}</p>
        <h3>Macronutrients</h3>
        <ul>
          <li>Protein: {protein}g</li>
          <li>Total Fat: {total_fat}g</li>
          <li>Saturated Fat: {saturated_fat}g</li>
          <li>Monounsaturated Fat: {monounsaturated_fat}g</li>
          <li>Polyunsaturated Fat: {polyunsaturated_fat}g</li>
          <li>Carbohydrates: {carbohydrates}g</li>
        </ul>
        <h3>Micronutrients</h3>
        <ul>
          <li>Cholesterol: {cholesterol}mg</li>
          <li>Sodium: {sodium}mg</li>
          <li>Potassium: {potassium}mg</li>
        </ul>
        <h3>Vitamins</h3>
        <ul>
          {Object.entries(vitamins).map(([vitamin, value]) => (
            <li key={vitamin}>
              {vitamin}: {value}mg
            </li>
          ))}
        </ul>
        <h3>Minerals</h3>
        <ul>
          {Object.entries(minerals).map(([mineral, value]) => (
            <li key={mineral}>
              {mineral}: {value}mg
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealCard;
