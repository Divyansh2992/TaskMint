const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadController = require("../controllers/uploadController");

const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only CSV, XLS, and XLSX files are allowed"));
    }
    cb(null, true);
  },
});

// Route to upload and process CSV
router.post("/upload-csv", upload.single("file"), uploadController.uploadAndDistributeTasks);

module.exports = router;
