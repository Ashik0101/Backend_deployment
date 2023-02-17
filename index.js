const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./Routes/User.routes");
const { productRouter } = require("./Routes/Product.routes");
const { authenticate } = require("./Middlewares/authenticator");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use(authenticate);
app.use("/product", productRouter);

app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log(`Server is listening at port ${process.env.port}`);
    console.log("*******<><><><><><> connected to db <><><><><><>*******");
  } catch (error) {
    console.log("Some error while connecting to db");
  }
});

/* two user that is registered */
/*
{
  "email":"ashik@123",
  "password":"ashik"
}
{
  "email":"mujammil@123",
  "password":"mujammil"
}
*/
