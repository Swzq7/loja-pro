const router = require("express").Router();

// 🔥 PRODUTOS FIXOS (pra não quebrar nunca)
router.get("/", (req, res) => {
  res.json([
    {
      nome: "Tênis Nike",
      preco: 199,
      imagem: "https://via.placeholder.com/200"
    },
    {
      nome: "Camisa",
      preco: 99,
      imagem: "https://via.placeholder.com/200"
    },
    {
      nome: "Boné",
      preco: 59,
      imagem: "https://via.placeholder.com/200"
    }
  ]);
});

module.exports = router;