import React, { useEffect, useState } from "react";

const TaskForm = ({ onAddTask, onUpdateTask, editingTask, clearEditingTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: 10
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        points: editingTask.points || 10
      });
    } else {
      setFormData({
        title: "",
        description: "",
        points: 10
      });
    }
  }, [editingTask]);

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
      setError("Task title is required");
      return;
    }

    const payload = {
      ...formData,
      points: Number(formData.points)
    };

    if (editingTask) {
      await onUpdateTask(editingTask._id, payload);
    } else {
      await onAddTask(payload);
    }

    setFormData({
      title: "",
      description: "",
      points: 10
    });
  };

  const handleCancel = () => {
    clearEditingTask();
    setFormData({
      title: "",
      description: "",
      points: 10
    });
    setError("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit Task" : "Add Task"}</h2>

      {error && <p className="error-text">{error}</p>}

      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Task description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="number"
        name="points"
        placeholder="Points"
        value={formData.points}
        onChange={handleChange}
        min="1"
      />

      <div className="form-actions">
        <button type="submit" className="primary-btn">
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button type="button" className="secondary-btn" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;