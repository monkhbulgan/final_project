// services/otp.service.js
const generateOtp = require("../utils/otpGenerator");
const transporter = require("../config/email");
const { createLog } = require("./log.service"); // optional logging
const router = require("./auth");

async function sendOtp({ toEmail }) {
  const otp = generateOtp(6);
  const html = `<h3>Your OTP</h3><p style="font-size:20px">${otp}</p><p>Valid for 5 minutes.</p>`;

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Your OTP Code",
    html,
  });

  // you should store OTP server-side (e.g. password_reset_tokens or separate otp table) with expiry
  return { otp, info };
}

module.exports = router;
