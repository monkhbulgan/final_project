const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// In-memory user storage
let users = [];
let idCounter = 1;

// Mock authService
const authService = {
  signup: async ({ email, password, phone, address }) => {
    const existing = users.find(u => u.email === email);
    if (existing) throw new Error("EMAIL_EXISTS");

    const password_hash = await bcrypt.hash(password, 10);
    const user = {
      id: idCounter++,
      email,
      password_hash,
      phone,
      address,
      role: "user" // default role
    };
    users.push(user);

    const token = jwt.sign({ userId: user.id, role: user.role }, "supersecret", { expiresIn: "1h" });
    return { user, token };
  },
  login: async ({ email, password }) => {
    const user = users.find(u => u.email === email);
    if (!user) throw new Error("USER_NOT_FOUND");

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new Error("INVALID_CREDENTIALS");

    const token = jwt.sign({ userId: user.id, role: user.role }, "supersecret", { expiresIn: "1h" });
    return { user, token };
  }
};

// Mock otpService
const otpService = {
  sendOtp: async ({ toEmail }) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(`Sending OTP ${otp} to ${toEmail}`);
    return { otp, info: { messageId: "mock-message-id" } };
  }
};

// Controller functions
async function register(req, res, next) {
  try {
    const { email, password, phone, address } = req.body;
    const result = await authService.signup({ email, password, phone, address });
    res.json({ success: true, user: result.user, token: result.token });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.json({ success: true, user: result.user, token: result.token });
  } catch (err) {
    next(err);
  }
}

async function sendOtp(req, res, next) {
  try {
    const { email } = req.body;
    const out = await otpService.sendOtp({ toEmail: email });
    res.json({ success: true, messageId: out.info.messageId, otp: out.otp });
  } catch (err) {
    next(err);
  }
}

async function profile(req, res, next) {
  res.json({ success: true, user: req.user });
}

module.exports = { register, login, sendOtp, profile };
