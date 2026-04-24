const router = require("express").Router();
const mercadopago = require("mercadopago");
const Order = require("../models/Order");

const client = new mercadopago.MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

const payment = new mercadopago.Payment(client);

// 🔥 CRIAR PIX
router.post("/pix", async (req, res) => {
  try {
    const order = new Order({
      total: req.body.total,
      status: "pendente"
    });

    await order.save();

    const result = await payment.create({
      body: {
        transaction_amount: req.body.total,
        payment_method_id: "pix",
        payer: { email: req.body.email },
        notification_url: "https://thriving-overtake-turbojet.ngrok-free.dev/payment/webhook"
      }
    });

    await Order.findByIdAndUpdate(order._id, {
      paymentId: result.id
    });

    res.json({
      qr: result.point_of_interaction.transaction_data.qr_code_base64,
      copiaecola: result.point_of_interaction.transaction_data.qr_code
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Erro PIX");
  }
});

// 🔔 WEBHOOK PROFISSIONAL
router.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    if (data.type === "payment") {
      const paymentId = data.data.id;

      const paymentInfo = await payment.get({ id: paymentId });

      if (paymentInfo.status === "approved") {
        await Order.findOneAndUpdate(
          { paymentId: paymentId },
          { status: "pago" }
        );

        console.log("Pagamento confirmado!");
      }
    }

    res.sendStatus(200);

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;