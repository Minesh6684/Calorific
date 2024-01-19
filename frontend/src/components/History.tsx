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
  const [mealDate, setMealDate] = useState<string>();
  const [selectedDateMeal, setSelectedDateMeal] = useState<NutritionData[]>();
  const [totalCarbs, setTotalCarbs] = useState<number>(0);
  const [totalProteins, setTotalProteins] = useState<number>(0);
  const [totalFats, setTotalFats] = useState<number>(0);

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

  useEffect(() => {
    if (selectedDateMeal) {
      let carbs = 0;
      let proteins = 0;
      let fats = 0;

      selectedDateMeal.forEach((meal) => {
        meal.items.forEach((item) => {
          carbs += item.nutrition_facts.nutrients.macronutrients.carbohydrates;
          proteins += item.nutrition_facts.nutrients.macronutrients.protein;
          fats += item.nutrition_facts.nutrients.macronutrients.total_fat;
        });
      });

      setTotalCarbs(carbs);
      setTotalProteins(proteins);
      setTotalFats(fats);
    }
  }, [selectedDateMeal]);

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

  return (
    <div className="history-container">
      <input
        type="date"
        value={mealDate}
        onChange={(e) => filterMealByDate(e)}
        className="history-meal-filter"
      />
      {mealDate && (
        <div className="history-total-macros-by-date">
          <p>
            <span>Carbs</span>
            <span>{totalCarbs.toFixed()} g</span>
          </p>
          <p>
            <span>Proteins</span>
            <span>{totalProteins.toFixed()} g</span>
          </p>
          <p>
            <span>Fats</span>
            <span>{totalFats.toFixed()} g</span>
          </p>
        </div>
      )}
      {mealDate && (
        <div className="history-meal-cards-container">
          {selectedDateMeal?.map((meal) => (
            <HistoryMealCard meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
