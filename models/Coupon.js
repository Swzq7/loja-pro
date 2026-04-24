
const mongoose = require("mongoose");

module.exports = mongoose.model("Coupon", {
  code: String,
  desconto: Number,
  ativo: Boolean
});
