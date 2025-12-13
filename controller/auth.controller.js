const authService = require("../services/auth.service");
const otpService = require("../services/otp.service");

async function signup(req, res, next) {
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

async function requestOtp(req, res, next) {
  try {
    const { email } = req.body;
    const out = await otpService.sendOtp({ toEmail: email });
    // store OTP in DB with expiry if needed
    res.json({ success: true, messageId: out.info.messageId, otp: out.otp }); // remove otp in prod
  } catch (err) {
    next(err);
  }
}

module.exports = { signup, login, requestOtp };
