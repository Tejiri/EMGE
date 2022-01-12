import React, { useState } from "react";
import { firebaseApp } from "../controllers/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Header from "./Header";
import "../styles/Register.css";
import axios from "axios";
import { failureAlert, successAlert } from "../controllers/sweetalert";

function Register() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  return (
    <div>
      <Header />

      <div>
        <form
          className="register-form-div"
          action=""
          method="post"
          onSubmit={async (event) => {
            event.preventDefault();
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                successAlert(user.email + " has been registered");
                seterror("");
                axios
                  .post("/server/register", { email: email })
                  .then((value) => {
                    console.log(value);
                  });

                // ...
              })
              .catch((error) => {
                console.log(error);
                const errorCode = error.code;
                const errorMessage = error.message;
                failureAlert(errorMessage);
                console.log(errorCode);
                console.log(errorMessage);
                seterror(errorMessage);
                // ..
              });
          }}
        >
          <label htmlFor="">Email:</label>
          <input
            type="email"
            name=""
            id=""
            placeholder="email"
            onChange={(event) => {
              setemail(event.target.value);
            }}
          />
          <label htmlFor="">Password:</label>
          <input
            type="password"
            name=""
            id=""
            placeholder="password"
            onChange={(event) => {
              setpassword(event.target.value);
            }}
          />
          <input type="submit" value="Register" />
          <div>
            {error === "" ? null : <div style={{ color: "red" }}>{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
