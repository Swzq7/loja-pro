require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// ⚠️ se travar, comenta temporariamente
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log(err));

// ROTAS
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/orders", require("./routes/orders"));
app.use("/payment", require("./routes/payment"));

app.listen(3000, () => console.log("Servidor rodando http://localhost:3000"));
const cors = require("cors");
app.use(cors());