const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Expense } = require("./models/expense");
const routes = require("./routes/routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

app.get("/*", function (req, res) {
 
  res.sendFile(
    path.join(__dirname, "/client/public/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const port = process.env.PORT || 8080;

mongoose.connect(
  "mongodb+srv://Tejiri1995:Firefox1995@emge.uafzq.mongodb.net/emge?retryWrites=true&w=majority",
  (err) => {
    console.log(err);
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
