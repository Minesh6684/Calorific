import { useEffect, useState } from "react";
import { useAppSelector } from "../app/store";
import axios from "axios";
import HistoryMealCard from "../components/HistoryMealCard";
import { Link } from "react-router-dom";

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
  serving_size: string;
}

interface NutritionData {
  consumptionDateTime: string;
  items: Item[];
  user: string;
  __v: number;
  _id: string;
}

const History = () => {
  const user = useAppSelector((state) => state.Authentication.user);
  const [history, setHistory] = useState<NutritionData[]>();
  const [mealDate, setMealDate] = useState<string>("");
  const [selectedDateMeal, setSelectedDateMeal] = useState<NutritionData[]>();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    };
    const getDietHistory = async () => {
      const response = await axios.get("/history/get", config);
      setHistory(response.data);
    };
    getDietHistory();
  }, []);

  const filterMealByDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedDate = e.target.value;
    setMealDate(selectedDate);

    setSelectedDateMeal(
      history?.filter(
        (meal) => meal.consumptionDateTime.split("T")[0] === selectedDate
      )
    );
  };

  console.log(history);

  return (
    <div>
      <button>
        <Link
          to="/dashboard"
          style={{ color: "black", textDecoration: "none" }}
        >
          Dashboard
        </Link>
      </button>
      <input
        type="date"
        value={mealDate}
        onChange={(e) => filterMealByDate(e)}
      />
      {selectedDateMeal?.map((meal) => (
        <HistoryMealCard meal={meal} />
      ))}
    </div>
  );
};

export default History;
