require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { pool, connectDB } = require("./db");

const authRoutes = require("./routes/auth");
const roleRoutes = require("./routes/role");

const app = express(); // app-ийг эхэндээ initialize

// ===== Middleware =====

// JSON request body-г парс хийх
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // optional, form-data request-д хэрэгтэй

// CORS
app.use(cors({
  origin: ["http://localhost:5000", "https://yourdomain.mn"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Security headers
app.use(helmet());

// Rate limiter (15 мин = max 200 requests)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
});
app.use(limiter);

// ===== Routes =====
app.use("/api/auth", authRoutes);
app.use("/api", roleRoutes);

// ===== Error handler =====
app.use((err, req, res, next) => {
  console.error(err); // Алдааг console дээр харах
  res.status(500).json({ success: false, message: err.message });
});

// ===== Start Server & Connect DB =====
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB(); // DB холболт
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
})();
