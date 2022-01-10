const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Expense } = require("./models/expense");
const routes = require("./routes/routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

const port = 8080 || process.env.PORT;

mongoose.connect(
  "mongodb+srv://Tejiri1995:Firefox1995@emge.uafzq.mongodb.net/emge?retryWrites=true&w=majority",
  (err) => {
    console.log(err);
  }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
