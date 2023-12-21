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

interface AddMealModelProps extends Partial<NutritionalFacts> {
  setIsAddMealModel: (close: boolean) => void;
}

const AddMealModel: React.FC<AddMealModelProps> = (props) => {
  const mealData = props;
  const closeModel = () => {
    props.setIsAddMealModel(false);
  };

  const user = useAppSelector((state) => state.Authentication.user);
  const addToHistory = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      console.log("adding meal");
      const response = await axios.post("/history/add", mealData, config);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding meal to history:", error);
    }
  };

  return (
    <div>
      {/* <button onClick={closeModel}>X</button> */}
      <p>{mealData.food_item}</p>
      <p>{mealData.serving_size}</p>
      <input type="date" />
      <input type="time" />
      <p>
        Are you sure you want to save the meal?{" "}
        <button onClick={addToHistory}>YES</button>
        <button onClick={closeModel}>NO</button>
      </p>
    </div>
  );
};

export default AddMealModel;
