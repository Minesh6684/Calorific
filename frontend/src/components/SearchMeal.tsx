import { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authentication/AuthenticationSlice";
import MealCard from "./MealCard";
import AddMealModel from "./AddMealModel";

interface ItemSuggestion {
  item: string;
}

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

const SearchMeal: React.FC = () => {
  const [itemName, setItemName] = useState<string>();
  const [itemAmount, setItemAmount] = useState<number>();
  const [itemSuggestions, setItemSuggestions] = useState<string[]>([]);
  const [nutritionalFacts, setNutritionalFacts] = useState<NutritionalFacts[]>(
    []
  );
  const [isAddMealModel, setIsAddMealModel] = useState(false);
  const [mealData, setMealData] = useState<NutritionalFacts>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.Authentication.user);

  useEffect(() => {
    const getItemSuggestions = async () => {
      try {
        const response = await axios.get<ItemSuggestion[]>(
          "http://localhost:5004/item-suggestions/get/"
        );
        const suggestionItems = response.data.map(
          (suggestion) => suggestion.item
        );
        setItemSuggestions(suggestionItems);
      } catch (error) {
        console.error("Error fetching item suggestions:", error);
      }
    };

    getItemSuggestions();

    const storedNutritionalFacts = localStorage.getItem("nutritionalFacts");
    if (storedNutritionalFacts) {
      setNutritionalFacts(JSON.parse(storedNutritionalFacts));
    }

    if (!user?.token) {
      navigate("/");
    }
  }, [user, navigate]);

  const getNutritionalFacts = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Getting Nutritions");

    try {
      const response = await axios.get<NutritionalFacts>(
        `http://localhost:5004/nutritional-facts?item=${itemName}&amount=${itemAmount}`
      );

      const nutrition: NutritionalFacts = response.data;
      setNutritionalFacts([...nutritionalFacts, nutrition]);

      // Save nutritionalFacts to localStorage
      localStorage.setItem(
        "nutritionalFacts",
        JSON.stringify([...nutritionalFacts, nutrition])
      );
    } catch (error) {
      console.error("Error fetching nutritional facts:", error);
    }

    try {
      console.log("Adding item suggestion");
      const response = await axios.post(
        `http://localhost:5004/item-suggestions/add/`,
        {
          item: itemName,
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error fetching nutritional facts:", error);
    }
  };

  const removeCard = (index: number) => {
    // Create a copy of the nutritionalFacts array without the specified card
    const updatedNutritionalFacts = [...nutritionalFacts];
    updatedNutritionalFacts.splice(index, 1);

    // Update state and localStorage
    setNutritionalFacts(updatedNutritionalFacts);
    localStorage.setItem(
      "nutritionalFacts",
      JSON.stringify(updatedNutritionalFacts)
    );
  };

  const logoutFrom = () => {
    localStorage.removeItem("user");
    dispatch(logout());
  };

  return (
    <div>
      {!isAddMealModel ? (
        <div>
          <div>
            <p>{user?.name}</p>
          </div>
          <form onSubmit={getNutritionalFacts}>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              list="suggestions"
            />
            <datalist id="suggestions">
              {itemSuggestions.map((suggestion, index) => (
                <option key={index} value={suggestion} />
              ))}
            </datalist>
            <input
              type="number"
              required
              value={itemAmount}
              onChange={(e) => setItemAmount(Number(e.target.value))}
            />
            <button type="submit">GO</button>
          </form>
          <div>
            <div>
              {nutritionalFacts.map((meal, index) => (
                <MealCard
                  key={index}
                  {...meal}
                  onDiscard={() => removeCard(index)}
                  setIsAddMealModel={setIsAddMealModel}
                  setMealData={setMealData}
                />
              ))}
            </div>
          </div>
          <button onClick={logoutFrom}>Logout</button>
        </div>
      ) : (
        <AddMealModel
          {...mealData}
          setIsAddMealModel={setIsAddMealModel}
        />
      )}
    </div>
  );
};

export default SearchMeal;
