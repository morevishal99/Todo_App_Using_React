const express = require("express");
const { TodoModel } = require("../models/todoModel");
const todoRoute = express.Router();
const jwt = require("jsonwebtoken");
const key = "todo";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ message: "Authorization header missing" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, key);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
// get route to get all todo data  

todoRoute.get("/", verifyToken, async (req, res) => {
  const userId = req.userId;
  try {
    const todo = await TodoModel.find({ userID: userId });
    res.status(200).send(todo);
  } catch (err) {
    res.send(err);
  }
});


// post route to post todo data 

todoRoute.post("/add", verifyToken, async (req, res) => {
  const userId = req.userId;

  try {
    const newTodo = { ...req.body, userID: userId };
    const cart = await new TodoModel(newTodo);
    await cart.save();

  } catch (error) {
    res.send(error)
  }
});







//delete route to delete data from cart 
todoRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params
    await TodoModel.findByIdAndDelete({ _id: id });
    res.status(200).send("cart item deleted");
  } catch (err) {
    res.send(err);
  }
});

// patch route to update todo data 
todoRoute.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    await TodoModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send("cart item updated");
  } catch (err) {
    // console.log(err);
    res.send(err);
  }
});


module.exports = { todoRoute };

