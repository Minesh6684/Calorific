import { useEffect, useState } from "react";
import { useAppSelector } from "../app/store";
import axios from "axios";
import HistoryMealCard from "../components/HistoryMealCard";

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

const History = () => {
  const user = useAppSelector((state) => state.Authentication.user);
  const [history, setHistory] = useState<NutritionData[]>();
  const [mealDate, setMealDate] = useState<string>(
    new Date().getDate().toString()
  );
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
    const formattedSelectedDate = new Date(selectedDate)
      .toISOString()
      .split("T")[0];
    setMealDate(formattedSelectedDate);
    console.log(history);
    setSelectedDateMeal(
      history?.filter(
        (meal) => meal.consumptionDateTime.split("T")[0] === selectedDate
      )
    );
  };

  return (
    <div className="history-container">
      <input
        type="date"
        placeholder={mealDate}
        value={mealDate}
        onChange={(e) => filterMealByDate(e)}
        className="history-meal-filter"
      />
      <div className="history-meal-cards-container">
        {selectedDateMeal?.map((meal) => (
          <HistoryMealCard meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default History;
