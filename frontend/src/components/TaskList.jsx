import React from "react";

const TaskList = ({ tasks, onEditTask, onCompleteTask, onDeleteTask }) => {
  if (!tasks.length) {
    return <p className="empty-text">Start by adding your first productivity task.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className="task-card">
          <div>
            <h3 className={task.completed ? "completed-title" : ""}>
              {task.title}
            </h3>
            <p>{task.description}</p>
            <span className="task-points">{task.points} points</span>
          </div>

          <div className="task-actions">
            {!task.completed ? (
              <>
                <button
                  className="edit-btn"
                  onClick={() => onEditTask(task)}
                >
                  Edit
                </button>

                <button
                  className="complete-btn"
                  onClick={() => onCompleteTask(task._id)}
                >
                  Complete
                </button>
              </>
            ) : (
              <span className="completed-badge">Completed</span>
            )}

            <button
              className="delete-btn"
              onClick={() => onDeleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;