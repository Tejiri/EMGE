import { Home, Logout } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../controllers/firebase";
import "../styles/SecondHeader.css";

function SecondHeader() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        placeItems: "center",
        padding: "0px 30px",
        marginBottom: "20px",
        backgroundColor: "cadetblue",
      }}
    >
      <h3>EMGE Expenses</h3>
      <div>
        <span
          style={{ paddingRight: "20px" }}
          onClick={(event) => {
            navigate("/");
          }}
        >
          <Home />
        </span>
        <span
          onClick={(event) => {
            auth.signOut().then(() => {
              navigate("/login");
            });
          }}
        >
          <Logout />
        </span>
      </div>
    </div>
  );
}

export default SecondHeader;
