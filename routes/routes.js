const express = require("express");
const {
  homePost,
  userInfo,
  registerPost,
  updateOnePost,
  deleteManyPost,
  deleteOnePost,
} = require("../controllers/controller");
const { Expense } = require("../models/expense");
const routes = express.Router();

routes.route("/").post(homePost);

routes.route("/server/register").post(registerPost);

routes.route("/server/userinfo").post(userInfo);

routes.route("/expense/delete").post(deleteOnePost);

routes.route("/expenses/deletemany").post(deleteManyPost);

routes.route("/expenses/updateone").post(updateOnePost);

module.exports = routes;
