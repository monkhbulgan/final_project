const multer = require("multer");
const path = require("path");
const fs = require("fs");

const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniq = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniq}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
