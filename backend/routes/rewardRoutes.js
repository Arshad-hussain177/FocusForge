const express = require("express");
const router = express.Router();
const {
  createReward,
  getRewards,
  updateReward,
  redeemReward,
  deleteReward
} = require("../controllers/rewardController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createReward);
router.get("/", protect, getRewards);
router.put("/:id", protect, updateReward);
router.put("/:id/redeem", protect, redeemReward);
router.delete("/:id", protect, deleteReward);

module.exports = router;