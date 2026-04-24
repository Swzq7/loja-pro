const router = require("express").Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

router.get("/", async (req, res) => {
  res.json(await Order.find());
});

module.exports = router;