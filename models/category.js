const db = require("../db/db");

exports.create = async (name) => {
  const q = `INSERT INTO categories(name) VALUES($1) RETURNING *`;
  return (await db.query(q, [name])).rows[0];
};

exports.getAll = async () => {
  return (await db.query(`SELECT * FROM categories`)).rows;
};

exports.getById = async (id) => {
  return (await db.query(`SELECT * FROM categories WHERE id=$1`, [id])).rows[0];
};

exports.update = async (id, name) => {
  return (await db.query(
    `UPDATE categories SET name=$1 WHERE id=$2 RETURNING *`,
    [name, id]
  )).rows[0];
};

exports.remove = async (id) => {
  await db.query(`DELETE FROM categories WHERE id=$1`, [id]);
};
