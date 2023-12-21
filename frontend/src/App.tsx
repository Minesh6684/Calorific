// app.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchMeal from "./components/SearchMeal";
import History from "./components/History";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<SearchMeal />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
};

export default App;
