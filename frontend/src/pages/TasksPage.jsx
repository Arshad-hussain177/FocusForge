import React, { useEffect, useState } from "react";
import API from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch tasks";
      setError(message);
      toast.error(message);
    }
  };

  const addTask = async (taskData) => {
    try {
      setError("");
      const res = await API.post("/tasks", taskData);
      setTasks((prev) => [res.data, ...prev]);
      toast.success("Task added successfully");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to add task";
      setError(message);
      toast.error(message);
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      setError("");
      const res = await API.put(`/tasks/${taskId}`, taskData);

      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? res.data : task))
      );

      setEditingTask(null);
      toast.success("Task updated successfully");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update task";
      setError(message);
      toast.error(message);
    }
  };

  const completeTask = async (taskId) => {
    try {
      setError("");
      const res = await API.put(`/tasks/${taskId}/complete`);

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? res.data.task : task
        )
      );

      const updatedUser = JSON.parse(localStorage.getItem("user")) || {};
      updatedUser.totalPoints = res.data.totalPoints;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast.success(`Task completed! +${res.data.task.points} points earned`);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to complete task";
      setError(message);
      toast.error(message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setError("");
      await API.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));

      if (editingTask?._id === taskId) {
        setEditingTask(null);
      }

      toast.success("Task deleted successfully");
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete task";
      setError(message);
      toast.error(message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h1>Your Tasks</h1>
        <p>Create, manage, and complete tasks to earn points.</p>
      </div>

      {error && <p className="error-text">{error}</p>}

      <TaskForm
        onAddTask={addTask}
        onUpdateTask={updateTask}
        editingTask={editingTask}
        clearEditingTask={() => setEditingTask(null)}
      />

      <TaskList
        tasks={tasks}
        onEditTask={setEditingTask}
        onCompleteTask={completeTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
};

export default TasksPage;