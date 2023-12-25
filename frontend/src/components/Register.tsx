import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/store";
import { register } from "../features/authentication/AuthenticationSlice";
import { useNavigate, Link } from "react-router-dom";

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
        "http://localhost:5004/authentication/register",
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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
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
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Register;
