import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../controllers/firebase";
import { successAlert } from "../controllers/sweetalert";
import SecondHeader from "./SecondHeader";

function Edit() {
  const [title, settitle] = useState("");
  const [date, setdate] = useState("");
  const [expenseType, setexpenseType] = useState("");
  const [amount, setamount] = useState("");
  const [email, setemail] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const [transactioninfo, settransactioninfo] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      var list = [];
      if (user) {
        setemail(user.email);
        axios
          .post("/server/userinfo", { user: user.email })
          .then((value) => {
            for (const key in value.data.spending) {
              if (value.data.spending[key]._id === params.expenseid) {
                settransactioninfo(value.data.spending[key]);
                settitle(value.data.spending[key].title);
                setdate(value.data.spending[key].date);
                setexpenseType(value.data.spending[key].expenseType);
                setamount(value.data.spending[key].amount);
                console.log(value.data.spending[key]);
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // console.log(user);

        // ...
      } else {
        navigate("/login", { replace: true });
      }
    });
  }, []);

  return (
    <div>
      <SecondHeader />
      {transactioninfo === "" ? (
        ""
      ) : (
        <div style={{ padding: "20px" }}>
          <h3>Update expense</h3>
          <br />
          <form
            action=""
            method="post"
            onSubmit={(event) => {
              let data = {
                id: params.expenseid,
                email: email,
                title: title,
                date: date,
                expenseType: expenseType,
                amount: amount,
              };
              event.preventDefault();
              axios.post("/expenses/updateone", data).then((value) => {
                // console.log(value.data);
                successAlert("Expense has been updated");
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              });
            }}
          >
            <input
              type="text"
              name="title"
              id=""
              placeholder="Title"
              value={title}
              onChange={(event) => {
                settitle(event.target.value);
              }}
            />
            <input
              type="date"
              name="date"
              value={date}
              id=""
              onChange={(event) => {
                setdate(event.target.value);
              }}
            />
            <input
              type="text"
              name="expenseType"
              value={expenseType}
              id=""
              placeholder="Expense Type"
              onChange={(event) => {
                setexpenseType(event.target.value);
              }}
            />
            <input
              type="number"
              name="amount"
              value={amount}
              id=""
              placeholder="Amount"
              onChange={(event) => {
                setamount(event.target.value);
              }}
            />
            <input type="submit" value="Update" />
          </form>
        </div>
      )}
    </div>
  );
}

export default Edit;
