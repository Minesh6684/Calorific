import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authentication/AuthenticationSlice";
import MealSearchForm from "./MealSearchForm";
import History from "../components/History";
import WeightTracker from "../components/WeightTracker";
import "../css/SearchMeals.css";

import { MdOutlineMonitorWeight } from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import { TfiWrite } from "react-icons/tfi";
import { BiLogOut } from "react-icons/bi";

const SearchMeal: React.FC = () => {
  const [isMealSearchForm, setIsMealSearchForm] = useState(true);
  const [isHistory, setIsHistory] = useState(false);
  const [isWeightTracker, setIsWeightTracker] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.Authentication.user);

  useEffect(() => {
    if (!user?.token) {
      navigate("/");
    }
  }, [user, navigate]);

  const showMealSearchForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsHistory(false);
    setIsWeightTracker(false);
    setIsMealSearchForm(!isMealSearchForm);
  };

  const showHistory = (e: React.FormEvent) => {
    e.preventDefault();
    setIsWeightTracker(false);
    setIsMealSearchForm(false);
    setIsHistory(!isHistory);
  };

  const showWeightTracker = (e: React.FormEvent) => {
    e.preventDefault();
    setIsHistory(false);
    setIsMealSearchForm(false);
    setIsWeightTracker(!isWeightTracker);
  };

  const logoutFrom = () => {
    localStorage.removeItem("user");
    dispatch(logout());
  };

  return (
    <div className="dashboard">
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
        <div className="logout-section">
          <button onClick={logoutFrom}>
            {" "}
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
