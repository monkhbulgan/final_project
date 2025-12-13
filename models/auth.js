const userModel = require("../models/user.model"); // DB query хийх module
const { hashPassword, comparePassword } = require("../utils/passwordHash");
const jwt = require("../config/jwt");

/**
 * User signup
 */
async function signup({ email, password, phone, address }) {
  const existing = await userModel.getUserByEmail(email);
  if (existing) throw new Error("EMAIL_EXISTS");

  const password_hash = await hashPassword(password);
  const user = await userModel.createUser({
    email,
    password_hash,
    phone,
    address,
    role: "user", // default role
  });

  const token = jwt.sign({ userId: user.id, role: user.role });
  return { user, token };
}

/**
 * User login
 */
async function login({ email, password }) {
  const user = await userModel.getUserByEmail(email);
  if (!user) throw new Error("USER_NOT_FOUND");

  const ok = await comparePassword(password, user.password_hash);
  if (!ok) throw new Error("INVALID_CREDENTIALS");

  const token = jwt.sign({ userId: user.id, role: user.role });
  return { user, token };
}

module.exports = { signup, login };
