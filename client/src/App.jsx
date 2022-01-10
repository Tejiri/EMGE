import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/register" element={<Register />} exact />
      <Route path="/login" element={<Login />} exact />
    </Routes>
  );
}

export default App;
