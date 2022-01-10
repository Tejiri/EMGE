const express = require("express");
const { Expense } = require("../models/expense");
const routes = express.Router();

routes
  .route("/")
  .get((req, res) => {
    res.send("fdgdf");
  })
  .post((req, res) => {
    console.log(req.body);
  });

routes.route("/register").post((req, res) => {
  const data = {
    user: req.body.email,
    spending: [],
  };
  new Expense(data).save();
});

module.exports = routes;
