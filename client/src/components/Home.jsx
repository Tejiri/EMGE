import axios from "axios";
import React, { useState } from "react";
import Header from "./Header";

function Home() {
  const [title, settitle] = useState("");
  const [date, setdate] = useState("");
  const [expenseType, setexpenseType] = useState("");
  const [amount, setamount] = useState("");
  return (
    <div>
      <Header />
      <h2>Add Expense</h2>
      <form
        action=""
        method="post"
        onSubmit={(event) => {
          let data = {
            title: title,
            date: date,
            expenseType: expenseType,
            amount: amount,
          };
          event.preventDefault();
          axios
            .post("/", data)
            .then((value) => {
              console.log(value);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <input
          type="text"
          name="title"
          id=""
          placeholder="Title"
          onChange={(event) => {
            settitle(event.target.value);
          }}
        />
        <input
          type="date"
          name="date"
          id=""
          onChange={(event) => {
            setdate(event.target.value);
          }}
        />
        <input
          type="text"
          name="expenseType"
          id=""
          placeholder="Expense Type"
          onChange={(event) => {
            setexpenseType(event.target.value);
          }}
        />
        <input
          type="number"
          name="amount"
          id=""
          placeholder="Amount"
          onChange={(event) => {
            setamount(event.target.value);
          }}
        />
        <input type="submit" value="Submit Expense" />
      </form>
    </div>
  );
}

export default Home;
