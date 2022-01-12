import React, { useState } from "react";
import Header from "./Header";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { failureAlert } from "../controllers/sweetalert";
function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  let navigate = useNavigate();
  return (
    <div>
      <Header />
<div>

</div>
      <form
        className="login-form-div"
        action=""
        method="post"
        onSubmit={(event) => {
          event.preventDefault();
          const auth = getAuth();
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              navigate("/", { replace: true });

              console.log(user);
            })
            .catch((err) => {
              failureAlert(err.message)
              // console.log(err);
              seterror(err.message);
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
       
        <input type="submit" name="" id="" value={"Login"} />
        {error === "" ? null : <div style={{ color: "red" }}>{error}</div>}
      </form>
    </div>
  );
}

export default Login;
