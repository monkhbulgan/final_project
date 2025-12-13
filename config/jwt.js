// config/jwt.js
const jwt = require("jsonwebtoken");

const SECRET = "supersecret"; // өөр secret ашиглаж болно

function sign(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

function verify(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { sign, verify };
