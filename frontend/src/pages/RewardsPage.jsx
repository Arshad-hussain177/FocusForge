import React, { useEffect, useState } from "react";
import API from "../api/axios";
import RewardForm from "../components/RewardForm";
import RewardList from "../components/RewardList";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const RewardsPage = () => {
  const [rewards, setRewards] = useState([]);
  const [editingReward, setEditingReward] = useState(null);
  const [error, setError] = useState("");
  const { user, setUser } = useAuth();

  const fetchRewards = async () => {
    try {
      const res = await API.get("/rewards");
      setRewards(res.data);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch rewards";
      setError(message);
      toast.error(message);
    }
  };

  const addReward = async (rewardData) => {
    try {
      setError("");
      const res = await API.post("/rewards", rewardData);
      setRewards((prev) => [res.data, ...prev]);
      toast.success("Reward added successfully");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to add reward";
      setError(message);
      toast.error(message);
    }
  };

  const updateReward = async (rewardId, rewardData) => {
    try {
      setError("");
      const res = await API.put(`/rewards/${rewardId}`, rewardData);

      setRewards((prev) =>
        prev.map((reward) => (reward._id === rewardId ? res.data : reward))
      );

      setEditingReward(null);
      toast.success("Reward updated successfully");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update reward";
      setError(message);
      toast.error(message);
    }
  };

  const redeemReward = async (rewardId) => {
    try {
      setError("");
      const res = await API.put(`/rewards/${rewardId}/redeem`);

      setRewards((prev) =>
        prev.map((reward) =>
          reward._id === rewardId ? res.data.reward : reward
        )
      );

      const updatedUser = JSON.parse(localStorage.getItem("user")) || {};
      updatedUser.totalPoints = res.data.totalPoints;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast.success("Reward redeemed successfully");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to redeem reward";
      setError(message);
      toast.error(message);
    }
  };

  const deleteReward = async (rewardId) => {
    try {
      setError("");
      await API.delete(`/rewards/${rewardId}`);
      setRewards((prev) => prev.filter((reward) => reward._id !== rewardId));

      if (editingReward?._id === rewardId) {
        setEditingReward(null);
      }

      toast.success("Reward deleted successfully");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete reward";
      setError(message);
      toast.error(message);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h1>Your Rewards</h1>
        <p>Create personal rewards and redeem them with earned points.</p>
      </div>

      {error && <p className="error-text">{error}</p>}

      <RewardForm
        onAddReward={addReward}
        onUpdateReward={updateReward}
        editingReward={editingReward}
        clearEditingReward={() => setEditingReward(null)}
      />

      <RewardList
        rewards={rewards}
        userPoints={user?.totalPoints || 0}
        onEditReward={setEditingReward}
        onRedeemReward={redeemReward}
        onDeleteReward={deleteReward}
      />
    </div>
  );
};

export default RewardsPage;