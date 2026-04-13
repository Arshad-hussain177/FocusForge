const Task = require("../models/Task");
const Reward = require("../models/Reward");
const User = require("../models/User");

const buildFallbackAdvice = ({
  user,
  totalTasks,
  completedTasks,
  pendingTasks,
  nextReward,
  pointsNeeded
}) => {
  if (totalTasks === 0) {
    return "Start by adding your first task. Small wins create momentum.";
  }

  if (pendingTasks > completedTasks) {
    return "You have more pending tasks than completed ones. Try finishing one small task first to build momentum.";
  }

  if (nextReward && pointsNeeded > 0 && pointsNeeded <= 20) {
    return `You are only ${pointsNeeded} points away from unlocking ${nextReward.title}. Focus on one high-value task next.`;
  }

  if (completedTasks > 0 && pendingTasks === 0) {
    return "Excellent work. You have completed all current tasks. Add a new meaningful task to keep your streak going.";
  }

  if (completedTasks >= 3) {
    return "Good progress so far. Keep your consistency strong by completing your highest-point pending task next.";
  }

  return "Stay consistent. Complete one pending task now and keep moving toward your next reward.";
};

const getAiCoach = async (req, res) => {
  try {
    const userId = req.user._id;

    const [user, tasks, rewards] = await Promise.all([
      User.findById(userId).select("name email totalPoints"),
      Task.find({ user: userId }).sort({ createdAt: -1 }).lean(),
      Reward.find({ user: userId }).sort({ requiredPoints: 1 }).lean()
    ]);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const pendingTasks = tasks.filter((task) => !task.completed).length;

    const unredeemedRewards = rewards
      .filter((reward) => !reward.redeemed)
      .sort((a, b) => a.requiredPoints - b.requiredPoints);

    const nextReward = unredeemedRewards.length ? unredeemedRewards[0] : null;
    const pointsNeeded = nextReward
      ? Math.max(nextReward.requiredPoints - user.totalPoints, 0)
      : 0;

    const fallbackAdvice = buildFallbackAdvice({
      user,
      totalTasks,
      completedTasks,
      pendingTasks,
      nextReward,
      pointsNeeded
    });

    if (!process.env.OPENAI_API_KEY) {
      return res.status(200).json({
        advice: fallbackAdvice,
        source: "fallback"
      });
    }

    const pendingTaskTitles = tasks
      .filter((task) => !task.completed)
      .slice(0, 5)
      .map((task) => `- ${task.title} (${task.points} pts)`);

    const completedTaskTitles = tasks
      .filter((task) => task.completed)
      .slice(0, 5)
      .map((task) => `- ${task.title} (${task.points} pts)`);

    const prompt = `
You are an encouraging productivity coach inside a gamified productivity app called FocusForge.

Your job:
- Give short, practical advice in 2 to 4 sentences.
- Be motivating but not cheesy.
- Mention the next best action.
- If helpful, mention the next reward.
- Keep the response under 80 words.

User summary:
Name: ${user.name}
Total points: ${user.totalPoints}
Total tasks: ${totalTasks}
Completed tasks: ${completedTasks}
Pending tasks: ${pendingTasks}

Completed tasks:
${completedTaskTitles.length ? completedTaskTitles.join("\n") : "None"}

Pending tasks:
${pendingTaskTitles.length ? pendingTaskTitles.join("\n") : "None"}

Next reward:
${
  nextReward
    ? `${nextReward.title} (${nextReward.requiredPoints} pts, ${pointsNeeded} pts needed)`
    : "No reward created yet"
}
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.4",
        input: prompt
      })
    });

    if (!response.ok) {
      return res.status(200).json({
        advice: fallbackAdvice,
        source: "fallback"
      });
    }

    const data = await response.json();

    const advice =
      data.output_text?.trim() ||
      fallbackAdvice;

    return res.status(200).json({
      advice,
      source: "ai"
    });
  } catch (error) {
    return res.status(200).json({
      advice: "Stay consistent. Complete one meaningful task today and keep moving toward your next reward.",
      source: "fallback"
    });
  }
};

module.exports = {
  getAiCoach
};