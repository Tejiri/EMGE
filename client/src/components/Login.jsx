import React, { useState } from "react";
import Header from "./Header";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  let navigate = useNavigate();
  return (
    <div>
      <Header />
      <div>
        <form
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
                console.log(err);
                seterror(err.message);
              });
          }}
        >
          <input
            type="email"
            name=""
            id=""
            onChange={(event) => {
              setemail(event.target.value);
            }}
          />
          <input
            type="password"
            name=""
            id=""
            onChange={(event) => {
              setpassword(event.target.value);
            }}
          />
          <input type="submit" name="" id="" value={"Login"} />
        </form>
      </div>
      {error === "" ? null : <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default Login;
