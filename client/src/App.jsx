import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Edit from "./components/Edit";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/register" element={<Register />} exact />
      <Route path="/login" element={<Login />} exact />
      <Route path="/edit/:expenseid" element={<Edit />} />
    </Routes>
  );
}

export default App;
