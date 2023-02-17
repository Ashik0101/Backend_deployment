const express = require("express");
const { UserModel } = require("../Models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const userRouter = express.Router();
userRouter.use(express.json());

/* <><><><> register part is here <><><><>*/
userRouter.post("/register", async (req, res) => {
  const { name, password, email } = req.body;
  try {
    console.log(req.body);
    const user = await UserModel.find({ email });
    if (user.length) {
      res.send({ msg: "User Already Registered...Please Login Now!!!" });
    } else {
      // console.log(password);
      bcrypt.hash(password, 7, (err, hash) => {
        if (err) {
          res.send({ msg: "Some Error In Hashing Password" });
          console.log("Some Error in Hashing Password :", err);
        } else {
          const user = new UserModel({
            name: name,
            password: hash,
            email: email,
          });
          user.save();
          res.send({ msg: "User Registered !!!!" });
        }
      });
    }
  } catch (err) {
    res.send("some error in registering ");
    console.log("some error while registering :", err);
  }
});

/* <><><><> login part is here <><><><>*/
userRouter.post("/login", async (req, res) => {
  const { password, email } = req.body;
  try {
    const data = await UserModel.find({ email });
    if (!data.length) {
      res.send({
        msg: "Invalid Credentials!! not able to find document in db",
      });
      console.log("Invalid Credentials:", data);
    } else {
      bcrypt.compare(password, data[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: data[0]._id },
            process.env.SECRET_KEY,
            { expiresIn: "1hr" }
          );
          res.send({ msg: "User Logged In Successfully!!!", token: token });
        } else {
          res.send("Invalid Credentials");
          console.log("Invalid credentials :", err);
        }
      });
    }
  } catch (err) {
    res.send("Something went Wrong in login process !!!");
    console.log("Something went wrong :", err);
  }
});
module.exports = { userRouter };
