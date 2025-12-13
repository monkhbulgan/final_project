require('dotenv').config(); // заавал хамгийн эхэнд

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASS), // String-р хөрвүүл
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  ssl: false
});

async function connectDB() {
  try {
    const client = await pool.connect();
    console.log("✅ Database connected");
    client.release();
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
}

module.exports = { pool, connectDB };
