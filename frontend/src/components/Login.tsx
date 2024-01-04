import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/store";
import { login } from "../features/authentication/AuthenticationSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:5004/";

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
