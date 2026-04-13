const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  getDashboardStats
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/profile", protect, getUserProfile);
router.get("/stats", protect, getDashboardStats);

module.exports = router;