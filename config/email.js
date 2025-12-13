const nodemailer = require("nodemailer");
const User = require("../models/userModel"); // өөрийн замаа тавина

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password
  },
});

// 6 оронтой OTP үүсгэх
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// OTP илгээх API
async function sendOtp(req, res) {
  try {
    const { email } = req.body;

    // хэрэглэгч авах
    const user = await User.getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    // OTP үүсгэх
    const otp = generateOtp();

    // Email HTML
    const html = `
      <h2>Your Login OTP</h2>
      <p style="font-size: 20px; font-weight: bold;">${otp}</p>
      <p>This OTP is valid for 5 minutes.</p>
    `;

    // Email илгээх
    const info = await transporter.sendMail({
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: html,
    });

    res.status(200).json({
      success: true,
      otp,
      messageId: info.messageId,
      response: info.response,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "OTP sending failed" });
  }
}

module.exports = { sendOtp };
