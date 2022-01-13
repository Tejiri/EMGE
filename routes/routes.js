const express = require("express");
const { Expense } = require("../models/expense");
const routes = express.Router();

routes.route("/").post((req, res) => {
  var exists = false;
  var dataToSend = {
    title: req.body.title,
    date: req.body.date,
    expenseType: req.body.expenseType,
    amount: req.body.amount,
  };
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
    // console.log(exists);
    if (exists === true) {
      let message = {
        name: "error",
        message: "entry already exists",
      };
      res.json(message);
    } else {
      let message = {
        name: "success",
        message: "entry added",
      };
      Expense.updateOne(
        { user: req.body.user },
        { $push: { spending: dataToSend } },
        (err, doc) => {
          if (err) {
            console.log(err);
          } else {
            console.log(doc);
            res.json(message);
          }
        }
      );
    }
  });
});

routes.route("/server/register").post((req, res) => {
  const data = {
    user: req.body.email,
    spending: [],
  };
  new Expense(data).save();
});

routes.route("/server/userinfo").post((req, res) => {
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

routes.route("/expense/delete").post((req, res) => {
  Expense.findOneAndUpdate(
    { user: req.body.user },
    {
      $pull: {
        spending: { _id: req.body.id },
      },
    },
    { safe: true, upsert: true },
    function (err, doc) {
      if (err) {
        res.json(err);
      } else {
        let message = {
          name: "success",
          message: "entry deleted",
        };
        res.json(message);
      }
    }
  );
  // console.log(req.body);
});

routes.route("/expenses/updateone").post((req, res) => {
  // console.log(req.body);

  Expense.findOne({ user: req.body.email }, (err, doc) => {
    // console.log(doc);
    for (const key in doc.spending) {
      console.log(doc.spending[key]._id);
      console.log(req.body.id);
      if (doc.spending[key]._id == req.body.id) {
        console.log("fdfddsfdsfsddisnfdsi");
        Expense.findOneAndUpdate(
          { user: req.body.email },
          {
            $set: {
              "spending.$[key].title": req.body.title,
              "spending.$[key].date": req.body.date,
              "spending.$[key].expenseType": req.body.expenseType,
              "spending.$[key].amount": req.body.amount,
            },
          },
          {
            arrayFilters: [{ "key._id": req.body.id }],
            new: true,
          },
          function (err, doc) {
            if (err) {
              console.log(err);
              res.json(err);
            } else {
              // console.log(req.body.items.length);
              // console.log("" + 1);
              console.log(doc);
              let message = {
                name: "success",
                message: "entry updated",
              };
              res.json(message);
            }
          }
        );
      }
    }
  });
});

routes.route("/expenses/deletemany").post((req, res) => {
  // console.log(req.body.items.length);
  for (const key in req.body.items) {
    // console.log(key);
    Expense.findOneAndUpdate(
      { user: req.body.user },
      {
        $pull: {
          spending: { _id: req.body.items[key] },
        },
      },
      { safe: true, upsert: true },
      function (err, doc) {
        if (err) {
          res.json(err);
        } else {
          // console.log(req.body.items.length);
          // console.log("" + 1);
          if (req.body.items.length === parseInt(key) + 1) {
            let message = {
              name: "success",
              message: "entries deleted",
            };
            res.json(message);
          }
        }
      }
    );
  }

  // console.log(req.body);
});

module.exports = routes;
