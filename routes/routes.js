const express = require("express");
const { Expense } = require("../models/expense");
const routes = express.Router();

routes.route("/").post((req, res) => {
  var exists = false;
  console.log(req.body);
  Expense.findOne({ user: req.body.user }, (err, doc) => {
    for (const key in doc.spending) {
      if (
        doc.spending[key].title === req.body.title &&
        doc.spending[key].date === req.body.date
      ) {
        exists = true;
      } else {
      }
    }
    console.log(exists);
    if (exists === true) {
      let message = {
        name: "Error",
        message: "entry already exists",
      };
      res.json(message);
    } else {
      Expense.updateOne(
        { email: req.body.user },
        { $push: { spending: req.body } },
        (err, doc) => {
          if (err) {
            console.log(err);
          } else {
            console.log(doc);
          }
        }
      );
    }
  });
});

routes.route("/register").post((req, res) => {
  const data = {
    user: req.body.email,
    spending: [],
  };
  new Expense(data).save();
});

routes.route("/server/user").post((req, res) => {
  console.log(req.body);
  Expense.findOne({ user: req.body.user }, (err, doc) => {
    if (err) {
      res.json(err);
    } else {
      res.json(doc);
    }
  });
  // res.send("fdgdf");
});

module.exports = routes;
