import axios from "axios";
import React, { useState } from "react";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import { AccessAlarm } from "@mui/icons-material";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
  {
    field: "delete",
    headerName: "Delete",
    description: "This column has a value getter and is not sortable.",
    width: 100,
  },
];

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: 35,
    delete: <AccessAlarm />,
  },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

function Home() {
  const [title, settitle] = useState("");
  const [date, setdate] = useState("");
  const [expenseType, setexpenseType] = useState("");
  const [amount, setamount] = useState("");
  return (
    <div>
      <Header />
      <AccessAlarm />
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
        <DataGrid
          style={{ width: "70%" }}
          rows={rows}
          onSelectionModelChange={(newSelectionModel) => {
            for (const key in newSelectionModel) {
              console.log(newSelectionModel[key]);
              console.log(rows[newSelectionModel[key] - 1]);
            }
            //  console.log(newSelectionModel);
          }}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
        <div>
          <button>Delete Selected</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
