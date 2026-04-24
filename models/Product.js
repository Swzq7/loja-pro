const mongoose = require("mongoose");

module.exports = mongoose.model("Product", {
  nome: String,
  preco: Number,
  imagem: String
});