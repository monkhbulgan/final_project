const db = require("../db/db");

async function createOrder({ user_id, total_amount, shipping_address = null, billing_address = null, status = "pending" }) {
  const q = `INSERT INTO public.orders (user_id, total_amount, shipping_address, billing_address, status)
             VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const { rows } = await db.query(q, [user_id, total_amount, shipping_address, billing_address, status]);
  return rows[0];
}

module.exports = { createOrder };
