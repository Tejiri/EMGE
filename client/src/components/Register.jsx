import React, { useState } from "react";
import { firebaseApp } from "../controllers/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Header from "./Header";
import "../styles/Register.css";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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

                axios.post("/register", { email: email }).then((value) => {
                  console.log(value);
                });

                // ...
              })
              .catch((error) => {
                console.log(error);
                const errorCode = error.code;
                const errorMessage = error.message;
                MySwal.fire({
                  // title: "Error",
                  titleText: errorCode,
                  icon: "error",
                  // footer: error.message,
                  // didOpen: () => {
                  //   // `MySwal` is a subclass of `Swal`
                  //   //   with all the same instance & static methods
                  //   MySwal.clickConfirm();
                  // },
                }).then(() => {
                  // return MySwal.fire(<p>Shorthand works too</p>);
                });
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
          <div>
          {error === "" ? null : <div style={{ color: "red" }}>{error}</div>}
        </div>
        </form>
       
      </div>
    </div>
  );
}

export default Register;
