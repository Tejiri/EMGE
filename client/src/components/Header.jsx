import React from "react";
import { Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import "../styles/Header.css";

function Header() {
  return (
    <div className="header-div">
      <h3>EMGE Expenses</h3>
      <div className="header-links">
        <Link to={"/"}>
          <span className="header-link">Home</span>
        </Link>
        <Link to={"/login"}>
          <span className="header-link">Login</span>
        </Link>
        <Link to={"/register"}>
          <span className="header-link">Register</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
