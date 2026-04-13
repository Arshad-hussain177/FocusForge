const express = require("express");
const router = express.Router();
const { getAiCoach } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

router.get("/coach", protect, getAiCoach);

module.exports = router;