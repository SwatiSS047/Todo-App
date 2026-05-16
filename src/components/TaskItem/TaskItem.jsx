import { useState, useRef, useEffect } from 'react';
import styles from './TaskItem.module.css';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  // Track whether this task is in edit mode
  const [isEditing, setIsEditing] = useState(false);
  // Local state for the edit input value
  const [editValue, setEditValue] = useState(task.text);
  // Ref to auto-focus the input when editing starts
  const inputRef = useRef(null);

  // When editing starts, focus the input automatically
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select(); // Highlight text so user can replace it instantly
    }
  }, [isEditing]);

  function startEdit() {
    setEditValue(task.text);
    setIsEditing(true);
  }

  function saveEdit() {
    onEdit(task.id, editValue);
    setIsEditing(false);
  }

  function cancelEdit() {
    setEditValue(task.text); // Reset to original
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter')  saveEdit();
    if (e.key === 'Escape') cancelEdit();
  }

  return (
    <li className={`${styles.item} ${task.completed ? styles.done : ''}`}>
      {/* Checkbox */}
      <button
        className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {task.completed && '✓'}
      </button>

      {/* Task text OR edit input */}
      {isEditing ? (
        <input
          ref={inputRef}
          className={styles.editInput}
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onBlur={saveEdit}           // Save when input loses focus
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span
          className={styles.text}
          onDoubleClick={startEdit}    // Double-click to start editing
          title="Double-click to edit"
        >
          {task.text}
        </span>
      )}

      {/* Action buttons */}
      <div className={styles.actions}>
        {!isEditing && (
          <button
            className={styles.editBtn}
            onClick={startEdit}
            aria-label="Edit task"
          >
            ✏️
          </button>
        )}
        <button
          className={styles.deleteBtn}
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}