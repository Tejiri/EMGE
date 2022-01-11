import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import { AccessAlarm } from "@mui/icons-material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CircularProgress } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 300 },
  { field: "title", headerName: "Title", width: 70 },
  { field: "date", headerName: "Date", width: 130 },
  { field: "expenseType", headerName: "Expense Type", width: 130 },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 90,
  },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue(params.id, "firstName") || ""} ${
  //       params.getValue(params.id, "lastName") || ""
  //     }`,
  // },
];

// var rows = [
//   {
//     id: 1,
//     lastName: "Snow",
//     firstName: "Jon",
//     age: 35,
//   },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

function Home() {
  const [title, settitle] = useState("");
  const [date, setdate] = useState("");
  const [expenseType, setexpenseType] = useState("");
  const [amount, setamount] = useState("");
  const [user, setuser] = useState("");
  const [userInfo, setuserInfo] = useState("");
  const [rows, setrows] = useState([]);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      var list = [];
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // console.log(user);
        setuser(user.email);
        axios
          .post("/server/user", { user: user.email })
          .then((value) => {
            for (const key in value.data.spending) {
              let data = {
                id: value.data.spending[key]._id,
                date: value.data.spending[key].date,
                amount: value.data.spending[key].amount,
                expenseType: value.data.spending[key].expenseType,
                title: value.data.spending[key].title,
              };
              list.push(data);
            }
            console.log(list);
            setrows(list);
            // setuserInfo(value.data);
            // console.log(value.data.spending);
            // console.log(userInfo);
          })
          .catch((err) => {
            console.log(err);
          });
        // ...
      } else {
        console.log("User signed out");
        // User is signed out
        // ...
      }
    });
  }, []);
  return (
    <div>
      <Header />
      <div>
        <span>User: </span>
        <span> {user === "" ? <CircularProgress /> : user}</span>
      </div>
      <h2>Add Expense</h2>
      <form
        action=""
        method="post"
        onSubmit={(event) => {
          let data = {
            user: user,
            title: title,
            date: date,
            expenseType: expenseType,
            amount: amount,
          };
          event.preventDefault();
          axios
            .post("/", data)
            .then((value) => {
              console.log(value.data);
              window.location.reload();
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

      <div
        style={{
          height: 400,

          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          placeItems: "center",
        }}
      >
        <h2>All my expenses</h2>
        {rows === [] ? (
          <CircularProgress />
        ) : (
          <DataGrid
            style={{ width: "90%" }}
            rows={rows}
            onSelectionModelChange={(newSelectionModel) => {
              // console.log(rows);
              for (const key in newSelectionModel) {
                // console.log(newSelectionModel[key]);
                for (const rowKey in rows) {
                  // console.log(rows[key].id);
                  if (rows[rowKey].id === newSelectionModel[key]) {
                    console.log(rows[key]);
                  }
                }
                // console.log(rows[newSelectionModel[key] - 1]);
              }
              // console.log(newSelectionModel);
            }}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        )}
        <div>
          <button>Delete Selected</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
