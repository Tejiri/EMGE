const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  user: String,
  spending: [
    { title: String, date: Date, expenseType: String, amount: Number },
  ],
});

const Expense = mongoose.model("expense", expenseSchema);

module.exports = {
  Expense: Expense,
};
