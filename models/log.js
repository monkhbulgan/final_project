const db = require("../db/db");

async function createLog({ level = "error", message = "", meta = null, endpoint = null, user_id = null }) {
  const q = `INSERT INTO public.logs (level, message, meta, endpoint, user_id)
             VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const { rows } = await db.query(q, [level, message, meta, endpoint, user_id]);
  return rows[0];
}

module.exports = { createLog };
