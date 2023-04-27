const express = require("express");
const { connection } = require("./database");
const { todoRoute } = require("./routes/todoRoute");
const { authRoute } = require("./routes/auth.Route");


const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/todo", todoRoute);
app.use("/auth", authRoute);

app.listen(4000, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (err) {
    // console.log(err);
  }
  console.log(`Server Running at ${4000} Port`);
});
