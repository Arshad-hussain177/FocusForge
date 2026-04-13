const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    requiredPoints: {
      type: Number,
      required: true,
      min: 1
    },
    redeemed: {
      type: Boolean,
      default: false
    },
    redeemedAt: {
      type: Date,
      default: null
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reward", rewardSchema);