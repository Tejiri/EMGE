import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import "../styles/Header.css";
import {
  Home as HomeIcon,
  Login as LoginIcon,
  AppRegistration,
} from "@mui/icons-material";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="header-div">
      <h3>EMGE Expenses</h3>
      <div className="header-links">
        <span
          className="header-link"
          onClick={() => {
            navigate("/");
          }}
        >
          <HomeIcon />
        </span>
        <span
          className="header-link"
          onClick={() => {
            navigate("/login");
          }}
        >
          <LoginIcon />
        </span>
        <span
          className="header-link"
          onClick={() => {
            navigate("/register");
          }}
        >
          <AppRegistration />
        </span>
      </div>
    </div>
  );
}

export default Header;
