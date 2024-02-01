import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/store";
import { login } from "../features/authentication/AuthenticationSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "../css/Login.css";
import calorific_logo from "../components/calorific_logo.png";

interface UserDataFromServer {
  name: string;
  token: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.Authentication.user);

  useEffect(() => {
    if (user?.token) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    // Perform authentication logic here (e.g., send credentials to a server)
    try {
      // Example: Send login request to the server
      const response = await axios.get<UserDataFromServer>(
        "/authentication/login",
        {
          params: { email, password },
        }
      );

      if (response.status === 200) {
        const userData: UserDataFromServer = response.data;
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(login(userData));
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="register-page-logo-organisation">
        <img src={calorific_logo} alt="" className="calorific_logo" />
        <p>Calorific</p>
      </div>
      <h2>Welcome Back !</h2>
      <p>Enter to track your calories and much more!</p>
      <form onSubmit={handleLogin} className="login-form">
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
