require("dotenv").config(); 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { pool, connectDB } = require("./db");

// Middleware
const logger = require("./middlewares/logger.middleware");
const errorHandler = require("./middlewares/error.middleware");

// Routes
const routes = require("./routes/index");

const app = express();

// Custom CORS Settings
app.use(
  cors({
    origin: ["http://localhost:5000", "https://yourdomain.mn"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
// Body parser
app.use(express.json());

// Security header middleware
app.use(helmet());

// Rate Limit (15 min = max 200 requests)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200
});
app.use(limiter);

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger); // custom logger middleware

// Routes
app.use("/api", routes);

// serve uploads folder
app.use("/uploads", express.static(process.env.UPLOAD_DIR || "uploads"));

// Error handler
app.use(errorHandler);

// Server & DB connection
const PORT = process.env.PORT || 5000;
(async () => {
  try {
    await connectDB(); 
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
})();
