import { useState, useEffect } from 'react';

//load from localStorage or return empty array
function loadTasks() {
  try {
    const saved = localStorage.getItem('todo-tasks');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function useTasks() {
  const [tasks, setTasks] = useState(loadTasks);

  // Save tasks change
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  function addTask(text) {
    if (!text.trim()) return;
    setTasks(prev => [
      {
        id: Date.now(),                                                                             // Unique ID using timestamp
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,                                                                                  // New task goes to the top
    ]);
  }

  // Toggle task btw done or not done
  function toggleTask(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Delete single task
  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  // Edit existing task
  function editTask(id, newText) {
    if (!newText.trim()) return;
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, text: newText.trim() } : task
      )
    );
  }

  // Remove all completed tasks
  function clearCompleted() {
    setTasks(prev => prev.filter(task => !task.completed));
  }

  return { tasks, addTask, toggleTask, deleteTask, editTask, clearCompleted };
}