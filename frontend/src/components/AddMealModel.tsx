import { useState } from "react";
import axios from "axios";
import { useAppSelector } from "../app/store";

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

interface AddMealModelProps {
  nutritionalFacts: NutritionalFacts[];
  setIsAddMealModel: (close: boolean) => void;
}

const AddMealModel: React.FC<AddMealModelProps> = ({
  nutritionalFacts,
  setIsAddMealModel,
}) => {
  const closeModel = () => {
    setIsAddMealModel(false);
  };

  const [mealDate, setMealDate] = useState<string>("");
  const [mealTime, setMealTime] = useState<string>("");

  const user = useAppSelector((state) => state.Authentication.user);

  const addToHistory = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      console.log("Adding meal to history");
      // Assuming you want to add all meals in the nutritionalFacts array
      const response = await axios.post(
        "/history/add",
        {
          items: nutritionalFacts,
          consumption_time: `${mealDate} ${mealTime}`,
        },
        config
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error adding meal to history:", error);
    }
  };

  return (
    <div>
      {/* <button onClick={closeModel}>X</button> */}
      {nutritionalFacts.map((item) => (
        <span>
          {item.food_item}({item.serving_size}),{" "}
        </span>
      ))}
      {/* Additional components to display information */}
      <input
        type="date"
        value={mealDate}
        onChange={(e) => setMealDate(e.target.value)}
      />
      <input
        type="time"
        value={mealTime}
        onChange={(e) => setMealTime(e.target.value)}
      />

      <p>
        Are you sure you want to save the meals?{" "}
        <button onClick={addToHistory}>YES</button>
        <button onClick={closeModel}>NO</button>
      </p>
    </div>
  );
};

export default AddMealModel;
