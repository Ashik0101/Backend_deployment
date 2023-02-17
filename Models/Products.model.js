const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  seller: { type: String, required: true },
  userId: { type: String, required: true },
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
