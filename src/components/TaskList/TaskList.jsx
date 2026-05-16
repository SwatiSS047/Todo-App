import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.css';

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Nothing here. Try a different filter?</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}        // Key helps React identify which item changed
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}