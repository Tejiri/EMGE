import React, { useState } from "react";
import { firebaseApp } from "../controllers/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Header from "./Header";
import axios from "axios";

function Register() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  return (
    <div>
      <Header />

      <div>
        <form
          action=""
          method="post"
          onSubmit={async (event) => {
            event.preventDefault();
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                axios.post("/register", { email: email }).then((value) => {
                  console.log(value);
                });

                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                seterror(errorMessage);
                // ..
              });
          }}
        >
          <input
            type="email"
            name=""
            id=""
            placeholder="email"
            onChange={(event) => {
              setemail(event.target.value);
            }}
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="password"
            onChange={(event) => {
              setpassword(event.target.value);
            }}
          />
          <input type="submit" value="Submit" />
        </form>
        <div>
          {error === "" ? null : <div style={{ color: "red" }}>{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default Register;
