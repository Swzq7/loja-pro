
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = (email) => {
  transporter.sendMail({
    to: email,
    subject: "Pedido confirmado",
    text: "Seu pedido foi recebido!"
  });
};
