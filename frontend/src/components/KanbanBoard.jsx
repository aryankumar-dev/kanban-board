import React, { useState, useEffect } from 'react';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    in_progress: [],
    done: []
  });

  const [newTasks, setNewTasks] = useState({
    todo: '',
    in_progress: '',
    done: ''
  });

  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    const path = window.location.pathname;
    const parts = path.split('/singleproject/');
    if (parts.length > 1 && parts[1]) {
      setProjectId(parts[1]);
    } else {
      setProjectId('defaultProjectId');
    }
  }, []);

  useEffect(() => {
    if (projectId) fetchAllTasks();
  }, [projectId]);

  const fetchAllTasks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/task/getTasks/${projectId}`);
      const data = await res.json();
      const allTasks = data.data.alltaskdata || [];

      const grouped = { todo: [], in_progress: [], done: [] };
      allTasks.forEach(task => {
        const status = task.status;
        if (grouped[status]) grouped[status].push(task);
      });

      setTasks(grouped);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const handleAddTask = async (column) => {
    const title = newTasks[column].trim();
    if (!title) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/task/createTask/${projectId}`, {
        method: 'POST' ,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, status: column })
      });

      const task = await res.json();
      setTasks(prev => ({
        ...prev,
        [column]: [...prev[column], { ...task, id: task._id }]
      }));
      setNewTasks({ ...newTasks, [column]: '' });
       fetchAllTasks();
    } catch (err) {
      console.error("Add task failed", err);
    }
  };

  const handleDeleteTask = async (taskId, column) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/task/deleteTask/${taskId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      setTasks(prev => ({
        ...prev,
        [column]: prev[column].filter(t => t._id !== taskId)
      }));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleDragStart = (e, task, column) => {
    e.dataTransfer.setData('task', JSON.stringify({ task, column }));
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const targetColumn = e.currentTarget.id; // ✅ Get target column from DOM
    const { task, column: sourceColumn } = JSON.parse(e.dataTransfer.getData('task'));

    if (sourceColumn === targetColumn) return;

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/task/updateTask/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: targetColumn })
      });

      setTasks(prev => {
        const updatedSource = prev[sourceColumn].filter(t => t._id !== task._id);
        const updatedTarget = [...prev[targetColumn], { ...task, status: targetColumn }];
        return {
          ...prev,
          [sourceColumn]: updatedSource,
          [targetColumn]: updatedTarget
        };
      });
    } catch (err) {
      console.error("Failed to update task status", err);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const getColumnTitle = (col) => {
    if (col === 'todo') return 'To Do';
    if (col === 'in_progress') return 'In Progress';
    if (col === 'done') return 'Done';
  };

  return (
    <div className="kanban-board">
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Kanban Board</h2>
      <div className="kanban-columns">
        {['todo', 'in_progress', 'done'].map(column => (
          <div
            key={column}
            id={column} // ✅ Required for identifying target column
            className="kanban-column"
            onDrop={handleDrop}
            onDragOver={allowDrop}
          >

            <div className="kanban-add">
              <input
                type="text"
                placeholder="New Task"
                value={newTasks[column]}
                onChange={e => setNewTasks({ ...newTasks, [column]: e.target.value })}
              />
              <button onClick={() => handleAddTask(column)}>Add</button>
            </div>

            {tasks[column]?.length === 0 && (
              <p className="empty-placeholder">No tasks</p>
            )}

            {tasks[column].map(task => (
              <div
                key={task._id}
                className="kanban-task"
                draggable
                onDragStart={e => handleDragStart(e, task, column)}
              >
                <span>{task.title}</span>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTask(task._id, column)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
