const User = require("../models/User");
const Task = require("../models/Task");
const Reward = require("../models/Reward");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({
      user: userId,
      completed: true
    });
    const pendingTasks = await Task.countDocuments({
      user: userId,
      completed: false
    });

    const totalRewards = await Reward.countDocuments({ user: userId });
    const redeemedRewards = await Reward.countDocuments({
      user: userId,
      redeemed: true
    });

    const user = await User.findById(userId).select("totalPoints name email");

    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        totalPoints: user.totalPoints
      },
      stats: {
        totalTasks,
        completedTasks,
        pendingTasks,
        totalRewards,
        redeemedRewards
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserProfile,
  getDashboardStats
};