import React, { useEffect, useState } from "react";

const RewardForm = ({
  onAddReward,
  onUpdateReward,
  editingReward,
  clearEditingReward
}) => {
  const [formData, setFormData] = useState({
    title: "",
    requiredPoints: 10
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingReward) {
      setFormData({
        title: editingReward.title || "",
        requiredPoints: editingReward.requiredPoints || 10
      });
    } else {
      setFormData({
        title: "",
        requiredPoints: 10
      });
    }
  }, [editingReward]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("Reward title is required");
      return;
    }

    const payload = {
      ...formData,
      requiredPoints: Number(formData.requiredPoints)
    };

    if (editingReward) {
      await onUpdateReward(editingReward._id, payload);
    } else {
      await onAddReward(payload);
    }

    setFormData({
      title: "",
      requiredPoints: 10
    });
  };

  const handleCancel = () => {
    clearEditingReward();
    setFormData({
      title: "",
      requiredPoints: 10
    });
    setError("");
  };

  return (
    <form className="reward-form" onSubmit={handleSubmit}>
      <h2>{editingReward ? "Edit Reward" : "Add Reward"}</h2>

      {error && <p className="error-text">{error}</p>}

      <input
        type="text"
        name="title"
        placeholder="Reward title"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="number"
        name="requiredPoints"
        placeholder="Required points"
        value={formData.requiredPoints}
        onChange={handleChange}
        min="1"
      />

      <div className="form-actions">
        <button type="submit" className="primary-btn">
          {editingReward ? "Update Reward" : "Add Reward"}
        </button>

        {editingReward && (
          <button type="button" className="secondary-btn" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default RewardForm;