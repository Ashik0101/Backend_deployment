const express = require("express");
const { ProductModel } = require("../Models/Products.model");

const productRouter = express.Router();
productRouter.use(express.json());

/* <><><><><> get method is here <><><><><> */
productRouter.get("/", async (req, res) => {
  console.log(req.body);
  const products = await ProductModel.find();
  res.send(products);
});

/* <><><><><> creating the product <><><><><> */
productRouter.post("/create", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  try {
    const product = new ProductModel(payload);
    await product.save();
    res.send({ msg: "product added!!" });
  } catch (err) {
    res.send({ msg: "some error in creating the product!!" });
    console.log("some error in creating products!!", err);
  }
});

/* <><><><><> deleting the product <><><><><> */
productRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;
  try {
    const data = await ProductModel.findOne({ _id: id });
    console.log(userId);
    console.log(data.userId);
    if (userId != data.userId) {
      res.send({ msg: "You are not authorized to delete this data!!" });
    } else {
      await ProductModel.findByIdAndDelete({ _id: id });
      res.send("Products deleted!!");
    }
  } catch (err) {
    res.send("some error in deleting the product");
    console.log("some error in deleting product :", err);
  }
});

/* <><><><><> updating the product <><><><><> */
productRouter.put("/update/:id", async (req, res) => {
  let payload = req.body;
  let id = req.params.id;
  let userIdFromReqBody = req.body.userId;
  console.log(payload);
  try {
    const data = await ProductModel.findOne({ _id: id });
    if (userIdFromReqBody != data.userId) {
      res.send({ msg: "You Are Not Authorized to Update this data!!" });
    } else {
      await ProductModel.findByIdAndUpdate({ _id: id }, payload);
    }
    await ProductModel.findByIdAndUpdate({ _id: id });
    res.send("Poduct updated!!!");
  } catch (err) {
    res.send("Some Error in updating the product!!");
    console.log("some error in updating the product:", err);
  }
});
module.exports = { productRouter };
