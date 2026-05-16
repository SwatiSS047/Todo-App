import { useState } from 'react';
import Header from './components/Header/Header';
import TaskInput from './components/TaskInput/TaskInput';
import FilterBar from './components/FilterBar/FilterBar';
import TaskList from './components/TaskList/TaskList';
import useTasks from './hooks/useTasks';
import styles from './App.module.css';

export default function App() {
  // All task logic comes from our custom hook
  const { tasks, addTask, toggleTask, deleteTask, editTask, clearCompleted } = useTasks();

  // Filter state: 'all' | 'active' | 'completed'
  const [filter, setFilter] = useState('all');

  // Derive filtered list from tasks + current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active')    return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  const activeCount = tasks.filter(t => !t.completed).length;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Header />
        <TaskInput onAdd={addTask} />
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          activeCount={activeCount}
          onClearCompleted={clearCompleted}
          hasCompleted={tasks.some(t => t.completed)}
        />
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
        {tasks.length === 0 && (
          <p className={styles.emptyMsg}>No tasks yet. Add one above! 👆</p>
        )}
      </div>
    </div>
  );
}