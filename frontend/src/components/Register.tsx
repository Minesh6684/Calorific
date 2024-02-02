import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/store";
import { register } from "../features/authentication/AuthenticationSlice";
import { useNavigate, Link } from "react-router-dom";

import "../css/Register.css";
import calorific_logo from "../components/calorific_logo.png";
import calorific_banner from "../assets/Calorific_Banner.png";

interface UserDataFromServer {
  name: string;
  token: string;
}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.Authentication.user);

  useEffect(() => {
    if (user?.token) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      // Handle error, show error message, etc.
      return;
    }

    // Perform registration logic here (e.g., send data to a server)
    try {
      const response = await axios.post<UserDataFromServer>(
        "/authentication/register",
        {
          name: name,
          email: email,
          password: password,
        }
      );

      if (response.status === 201) {
        const userData: UserDataFromServer = response.data;
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(register(userData));
      } else {
        console.error(
          "Registration failed. Server returned:",
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-page">
        <div className="register-page-logo-organisation">
          <img src={calorific_logo} alt="" className="calorific_logo" />
          <p>Calorific</p>
        </div>
        <h2>Register</h2>
        <p>Register to unlock the benefits of daily calorie tracking</p>
        <form onSubmit={handleRegister} className="register-form">
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
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
              placeholder="Enter password"
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter the password"
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
      <div className="register-page-banner-container">
        <img src={calorific_banner} alt="Calorific Banner" className="register-page-banner"/>
      </div>
    </div>
  );
};

export default Register;
