const express = require("express");
const router = express.Router();
const mercadopago = require("mercadopago");

// 🔥 CONFIGURAÇÃO NOVA (SDK ATUAL)
const client = new mercadopago.MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

const payment = new mercadopago.Payment(client);

// =======================
// 💳 PIX
// =======================
router.post("/pix", async (req, res) => {
  try {
    const { total, email } = req.body;

    if (!total) {
      return res.status(400).json({ erro: "Total não enviado" });
    }

    const result = await payment.create({
      body: {
        transaction_amount: Number(total),
        payment_method_id: "pix",
        payer: {
          email: email || "teste@email.com"
        }
      }
    });

    return res.json({
      qr: result.point_of_interaction.transaction_data.qr_code_base64,
      copiaecola: result.point_of_interaction.transaction_data.qr_code
    });

  } catch (err) {
    console.log("ERRO PIX REAL:", err);

    return res.status(500).json({
      erro: "Erro PIX",
      detalhe: err.message
    });
  }
});

// =======================
// 🔔 WEBHOOK (opcional)
// =======================
router.post("/webhook", (req, res) => {
  console.log("Pagamento recebido:", req.body);
  res.sendStatus(200);
});

module.exports = router;