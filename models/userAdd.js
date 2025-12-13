const db = require("../db/db");

async function createUser({ email, password_hash, role = "customer", phone = null, address = null }) {
  const q = `INSERT INTO public.users (email, password_hash, role, phone, address)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const { rows } = await db.query(q, [email, password_hash, role, phone, address]);
  return rows[0];
}

async function getUserByEmail(email) {
  const q = `SELECT * FROM public.users WHERE email = $1`;
  const { rows } = await db.query(q, [email]);
  return rows[0];
}

async function getUserById(id) {
  const q = `SELECT * FROM public.users WHERE id = $1`;
  const { rows } = await db.query(q, [id]);
  return rows[0];
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
