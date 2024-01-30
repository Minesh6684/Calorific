import { RiCloseLine } from "react-icons/ri";

interface CalorieGoalProps {
  caloriGoal: {
    calorie_goal: string;
    carb_goal: string;
    protein_goal: string;
    fat_goal: string;
  };
  saveCalorieGoal: (e: React.FormEvent) => Promise<void>;
  handleCalorieGoalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CalorieGoal: React.FC<CalorieGoalProps> = ({
  caloriGoal,
  saveCalorieGoal,
  handleCalorieGoalChange,
}) => {
  const collapseGoalForm = () => {
    const goal_form_container = document.querySelector(
      ".calorie-goal-form-container-show"
    );
    const goal_form = document.querySelector(".calorie-goal-form-show");

    goal_form_container?.classList.add("calorie-goal-form-container");
    goal_form_container?.classList.remove("calorie-goal-form-container-show");

    goal_form?.classList.add("calorie-goal-form");
    goal_form?.classList.remove("calorie-goal-form-show");
  };

  return (
    <div className="calorie-goal-form-container">
      <form onSubmit={saveCalorieGoal} className="calorie-goal-form">
        <RiCloseLine
          onClick={collapseGoalForm}
          className="calorie-goal-form-collapse-btn"
        />
        <div className="calorie-goal-form-calories">
          <p>
            Enter your desired daily calorie, carbohydrate, protein, and fat
            targets to tailor your wellness journey
          </p>
          <input
            type="number"
            name="calorie_goal"
            value={caloriGoal.calorie_goal}
            placeholder="Calories"
            onChange={handleCalorieGoalChange}
          />
        </div>
        <div className="calorie-goal-form-macros">
          <p>Macros( in percentage ) of total calories goal</p>
          <div>
            <input
              type="number"
              name="carb_goal"
              value={caloriGoal.carb_goal}
              onChange={handleCalorieGoalChange}
              placeholder="Carbs %"
            />
            <input
              type="number"
              name="protein_goal"
              value={caloriGoal.protein_goal}
              onChange={handleCalorieGoalChange}
              placeholder="Proteins %"
            />
            <input
              type="number"
              name="fat_goal"
              value={caloriGoal.fat_goal}
              onChange={handleCalorieGoalChange}
              placeholder="Fats %"
            />
          </div>
        </div>
        <button type="submit">Set Goal</button>
      </form>
    </div>
  );
};

export default CalorieGoal;
