const uploadModel = require("../models/upload.model");

async function uploadSingle(req, res, next) {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file" });

    const record = await uploadModel.createUpload({
      filename: file.filename,
      original_name: file.originalname,
      mime_type: file.mimetype,
      size: file.size,
      path: file.path,
      uploaded_by: req.user ? req.user.userId : null
    });

    res.json({ success: true, file: record });
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadSingle };
