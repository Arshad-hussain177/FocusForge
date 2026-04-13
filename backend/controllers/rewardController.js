const Reward = require("../models/Reward");
const User = require("../models/User");

const createReward = async (req, res) => {
  try {
    const { title, requiredPoints } = req.body;

    if (!title || !requiredPoints) {
      return res.status(400).json({ message: "Title and required points are required" });
    }

    const reward = await Reward.create({
      title,
      requiredPoints,
      user: req.user._id
    });

    return res.status(201).json(reward);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(rewards);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateReward = async (req, res) => {
  try {
    const { title, requiredPoints } = req.body;

    const reward = await Reward.findById(req.params.id);

    if (!reward) {
      return res.status(404).json({ message: "Reward not found" });
    }

    if (reward.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this reward" });
    }

    if (reward.redeemed) {
      return res.status(400).json({ message: "Redeemed rewards cannot be edited" });
    }

    reward.title = title || reward.title;
    reward.requiredPoints = requiredPoints || reward.requiredPoints;

    await reward.save();

    return res.status(200).json(reward);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const redeemReward = async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);

    if (!reward) {
      return res.status(404).json({ message: "Reward not found" });
    }

    if (reward.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to redeem this reward" });
    }

    if (reward.redeemed) {
      return res.status(400).json({ message: "Reward already redeemed" });
    }

    const user = await User.findById(req.user._id);

    if (user.totalPoints < reward.requiredPoints) {
      return res.status(400).json({ message: "Not enough points to redeem this reward" });
    }

    user.totalPoints -= reward.requiredPoints;
    await user.save();

    reward.redeemed = true;
    reward.redeemedAt = new Date();
    await reward.save();

    return res.status(200).json({
      message: "Reward redeemed successfully",
      reward,
      totalPoints: user.totalPoints
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteReward = async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);

    if (!reward) {
      return res.status(404).json({ message: "Reward not found" });
    }

    if (reward.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this reward" });
    }

    await reward.deleteOne();

    return res.status(200).json({ message: "Reward deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReward,
  getRewards,
  updateReward,
  redeemReward,
  deleteReward
};