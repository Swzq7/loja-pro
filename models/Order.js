const mongoose = require("mongoose");

module.exports = mongoose.model("Order", {
  userId: String,
  produtos: Array,
  total: Number,
  status: { type: String, default: "pendente" },
  paymentId: String
});