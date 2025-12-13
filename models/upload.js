const db = require("../db/db");

async function createUpload({ filename, original_name, mime_type, size, path, uploaded_by }) {
  const q = `INSERT INTO public.uploads (filename, original_name, mime_type, size, path, uploaded_by)
             VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
  const { rows } = await db.query(q, [filename, original_name, mime_type, size, path, uploaded_by]);
  return rows[0];
}

module.exports = { createUpload };
