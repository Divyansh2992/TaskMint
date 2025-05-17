const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const authController = require("../controllers/authController");

// Signup
router.post("/", authController.signup);
// Login
router.post("/login", authController.login);
// Dashboard (protected)
router.get("/dashboard", authenticateToken, authController.dashboard);
// Logout
router.get("/logout", authController.logout);

module.exports = router;
