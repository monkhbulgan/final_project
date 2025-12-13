const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const uploadCtrl = require("../controllers/upload.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

router.post("/single", requireAuth, upload.single("file"), uploadCtrl.uploadSingle);

module.exports = router;
