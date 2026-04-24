router.post("/pix", async (req, res) => {
  try {
    const result = await payment.create({
      body: {
        transaction_amount: Number(req.body.total),
        payment_method_id: "pix",
        payer: { email: req.body.email },
        notification_url: process.env.BASE_URL + "/payment/webhook"
      }
    });

    return res.json({
      qr: result.point_of_interaction.transaction_data.qr_code_base64,
      copiaecola: result.point_of_interaction.transaction_data.qr_code
    });

  } catch (err) {
    console.log("ERRO PIX:", err);

    // 🔥 NUNCA mais usar .send()
    return res.status(500).json({
      erro: "Erro PIX",
      detalhe: err.message
    });
  }
});