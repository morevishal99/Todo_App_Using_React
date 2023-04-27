const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todo: String,
  status: Boolean,
  userID: String,
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = { TodoModel };
