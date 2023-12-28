// app.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchMeal from "./components/SearchMeal";

import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<SearchMeal />} />
    </Routes>
  );
};

export default App;
