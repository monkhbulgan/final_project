const express = require("express");
const { authGuard, requireRole } = require("../middleware/authMiddlewares");

const router = express.Router();

router.get("/admin-only", authGuard, requireRole("admin"), (req, res) => {
  res.json({ message: "Welcome admin" });
});

router.post("/seller", authGuard, requireRole("seller"), (req, res) => {
  res.json({ message: "Seller access granted" });
});

module.exports = router;
