import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authentication/AuthenticationSlice";
import MealSearchForm from "./MealSearchForm";
import History from "../components/History";
import WeightTracker from "../components/WeightTracker";
import "../css/SearchMeals.css";
import axios from "axios";

import { MdOutlineMonitorWeight } from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import { TfiWrite } from "react-icons/tfi";
import { BiLogOut } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";

import calorific_logo from "./calorific_logo.png";

const SearchMeal: React.FC = () => {
  const [isMealSearchForm, setIsMealSearchForm] = useState(true);
  const [isHistory, setIsHistory] = useState(false);
  const [isWeightTracker, setIsWeightTracker] = useState(false);

  const [caloriGoal, setCalorieGoal] = useState({
    calorie_goal: 1700,
    carb_goal: 50,
    protein_goal: 30,
    fat_goal: 20,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.Authentication.user);

  useEffect(() => {
    if (!user?.token) {
      navigate("/");
    }
  }, [user, navigate]);

  const removeNav = () => {
    const mobile = document.querySelector(".dashboard-nav-mobile");
    if (mobile) {
      mobile.classList.add("dashboard-nav");
      mobile.classList.remove("dashboard-nav-mobile");
    } else {
      console.error("Element with class 'dashboard-nav' not found.");
    }
  };

  const displayNav = () => {
    const navigation = document.querySelector(".dashboard-nav");

    if (navigation) {
      navigation.classList.add("dashboard-nav-mobile");
      navigation.classList.remove("dashboard-nav");
    } else {
      removeNav();
    }
  };

  const showMealSearchForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsHistory(false);
    setIsWeightTracker(false);
    setIsMealSearchForm(true);
    removeNav();
  };

  const showHistory = (e: React.FormEvent) => {
    e.preventDefault();
    setIsWeightTracker(false);
    setIsMealSearchForm(false);
    setIsHistory(true);
    removeNav();
  };

  const showWeightTracker = (e: React.FormEvent) => {
    e.preventDefault();
    setIsHistory(false);
    setIsMealSearchForm(false);
    setIsWeightTracker(true);
    removeNav();
  };

  const logoutFrom = () => {
    localStorage.removeItem("user");
    dispatch(logout());
  };

  const showGoalForm = () => {
    const goal_form_container = document.querySelector(
      ".calorie-goal-form-container"
    );
    const goal_form = document.querySelector(".calorie-goal-form");

    goal_form_container?.classList.add("calorie-goal-form-container-show");
    goal_form_container?.classList.remove("calorie-goal-form-container");

    goal_form?.classList.add("calorie-goal-form-show");
    goal_form?.classList.remove("calorie-goal-form");
  };

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

  const handleCalorieGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCalorieGoal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveCalorieGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "/calorie-goal/set",
        caloriGoal,
        config
      );
      setCalorieGoal((prevState) => ({
        ...prevState,
        ...response.data,
      }));
    } catch (error) {
      console.error("Error saving calorie goal:", error);
    }
  };

  return (
    <div className="dashboard">
      <div className="mobile-navbar">
        <p onClick={displayNav}>Calorific</p>
      </div>
      <div className="dashboard-nav">
        <div className="dashboard-greeting-section">
          <p>Welcome Back, {user?.name}</p>
          {/* <p>{user?.email÷}</p> */}
        </div>
        <div className="dashboard-navigation-section">
          <button onClick={showMealSearchForm}>
            <TfiWrite />
            <span>Record a Meal</span>
          </button>
          <button onClick={showHistory}>
            <GiMeal />
            <span>History</span>
          </button>
          <button onClick={showWeightTracker}>
            <MdOutlineMonitorWeight />
            <span>Weight Tracker</span>
          </button>
        </div>
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
        <div className="logout-section">
          <div className="logout-section-profile">
            <img
              className="profile-photo"
              src={calorific_logo}
              alt="Grapefruit slice atop a pile of other slices"
            />
            <div className="logout-section-profile-nutritional-goals">
              <p className="logout-section-profile-nutritional-goals-calories">
                <span>
                  Goal
                  <button className="goal-edit-btn" onClick={showGoalForm}>
                    <FiEdit2 />
                  </button>
                </span>
                <span>{caloriGoal.calorie_goal}</span>
              </p>
              <div className="logout-section-profile-nutritional-goals-macros">
                <p>
                  <span>Carbs</span>
                  <span>{caloriGoal.carb_goal}</span>
                </p>
                <p>
                  <span>Proteins</span>
                  <span>{caloriGoal.protein_goal}</span>
                </p>
                <p>
                  <span>Fats</span>
                  <span>{caloriGoal.fat_goal}</span>
                </p>
              </div>
            </div>
          </div>
          <button onClick={logoutFrom} className="logout-button">
            <BiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className="display-section">
        {isMealSearchForm && <MealSearchForm />}
        {isHistory && <History />}
        {isWeightTracker && <WeightTracker />}
      </div>
    </div>
  );
};

export default SearchMeal;
