const fs = require("fs");
const path = require("path");

function errorHandler(err, req, res, next) {
  const logDir = path.join(__dirname, "../logs");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const date = new Date().toISOString().slice(0, 10);
  const logFile = path.join(logDir, `errors-${date}.log`);

  const message =
    `[${new Date().toISOString()}] ERROR: ${err.message}\n` +
    `URL: ${req.method} ${req.url}\n` +
    `Stack:\n${err.stack}\n\n`;

  fs.appendFile(logFile, message, (error) => {
    if (error) console.error("Error log write error:", error);
  });

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

module.exports = errorHandler;