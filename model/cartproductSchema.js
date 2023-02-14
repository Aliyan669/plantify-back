const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: String,
  backImage: String,
  proImage: String,
  textOne: String,
  textTwo: String,
  price: String,
});
const ProductModel = mongoose.model("Cartproduct", productSchema);
module.exports = ProductModel;

