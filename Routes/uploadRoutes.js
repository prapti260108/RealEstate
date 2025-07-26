const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  uploadFile,
  getFiles,
  deleteFile,
  updateFile
} = require("../Controller/uploadController");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uploadFile);
router.get("/upload", getFiles);
router.put("/upload/:id", upload.single("file"), updateFile);
router.delete("/upload/:id", deleteFile);

module.exports = router;
