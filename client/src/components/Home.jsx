import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CircularProgress } from "@mui/material";
import { IconButton } from "@mui/material";
import { failureAlert } from "../controllers/sweetalert";
import { Link, useNavigate } from "react-router-dom";
import SecondHeader from "./SecondHeader";
import { auth } from "../controllers/firebase";

function Home() {
  const [title, settitle] = useState("");
  const [date, setdate] = useState("");
  const [expenseType, setexpenseType] = useState("");
  const [amount, setamount] = useState("");
  const [user, setuser] = useState("");
  // const [userInfo, setuserInfo] = useState("");
  const [rows, setrows] = useState([]);
  const [selectedexpenses, setselectedexpenses] = useState("");
  const navigate = useNavigate();

  const logOutUser = () => {
    navigate("/login", { replace: true });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      var list = [];
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // console.log(user);
        setuser(user.email);
        axios
          .post("/server/userinfo", { user: user.email })
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
            // console.log(list);
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
        navigate("/login", { replace: true });
        console.log("User signed out");
        // User is signed out
        // ...
      }
    });
  }, []);

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
    

    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <IconButton
          onClick={(event) => {
            event.ignore = true;
            console.log(params.id);
            navigate("/edit/" + params.id);
          }}
        >
          <Edit />
        </IconButton>
      ),
    },

    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <IconButton
          onClick={(event) => {
            let data = {
              user: user,
              id: params.id,
            };
            event.ignore = true;
            console.log(params.id);
            axios.post("/expense/delete", data).then((value) => {
              window.location.reload();
              // console.log(value);
            });
          }}
        >
          <Delete />
        </IconButton>
      ),
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

  return (
    <div>
      <SecondHeader />
      <div>
        <span>User: </span>
        <span style={{ fontWeight: "bold" }}>
          {" "}
          {user === "" ? <CircularProgress /> : user}
        </span>
      </div>
      <h2>Add Expense</h2>
      <form
        action=""
        method="post"
        onSubmit={(event) => {
          event.preventDefault();
          let data = {
            user: user,
            title: title,
            date: date,
            expenseType: expenseType,
            amount: amount,
          };
          axios
            .post("/", data)
            .then((value) => {
              if (value.data.name === "error") {
                failureAlert(value.data.message);
              } else {
                console.log(value.data);
                window.location.reload();
              }
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
          required
          placeholder="Title"
          onChange={(event) => {
            settitle(event.target.value);
          }}
        />
        <input
          type="date"
          name="date"
          id=""
          required
          onChange={(event) => {
            setdate(event.target.value);
          }}
        />
        <input
          type="text"
          name="expenseType"
          id=""
          required
          placeholder="Expense Type"
          onChange={(event) => {
            setexpenseType(event.target.value);
          }}
        />
        <input
          type="number"
          name="amount"
          id=""
          required
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
            style={{ width: "100%" }}
            rows={rows}
            onSelectionModelChange={(newSelectionModel) => {
              setselectedexpenses(newSelectionModel);
              console.log(selectedexpenses);
              // console.log(rows);
              for (const key in newSelectionModel) {
                // console.log(newSelectionModel[key]);
                for (const rowKey in rows) {
                  // console.log(rows[key].id);
                  if (rows[rowKey].id === newSelectionModel[key]) {
                    // console.log(rows[key]);
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
          <button
            style={{ margin: "30px 0px" }}
            onClick={(event) => {
              event.preventDefault();
              let data = {
                user: user,
                items: selectedexpenses,
              };
              axios
                .post("/expenses/deletemany", data)
                .then((value) => {
                  window.location.reload();
                })
                .catch((err) => {});
            }}
          >
            Delete selected rows
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
