import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../features/authentication/AuthenticationSlice";
import MealSearchForm from "./MealSearchForm";

const SearchMeal: React.FC = () => {
  const [isMealSearchForm, setIsMealSearchForm] = useState(false);

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
    setIsMealSearchForm(!isMealSearchForm);
  };

  const logoutFrom = () => {
    localStorage.removeItem("user");
    dispatch(logout());
  };

  return (
    <div>
      <div>
        <div>
          <p>Welcome, {user?.name}</p>
        </div>
        <button onClick={showMealSearchForm}>Record a Meal</button>
        <button onClick={logoutFrom}>Logout</button>
        <button>
          <Link
            to="/history"
            style={{ color: "black", textDecoration: "none" }}
          >
            History
          </Link>
        </button>
        <button>
          <Link
            to="/weight_tracker"
            style={{ color: "black", textDecoration: "none" }}
          >
            Weight Tracker
          </Link>
        </button>
        {isMealSearchForm && <MealSearchForm />}
      </div>
    </div>
  );
};

export default SearchMeal;
