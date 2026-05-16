import { useState } from 'react';
import styles from './TaskInput.module.css';

export default function TaskInput({ onAdd }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();        // Prevent page reload on form submit
    onAdd(value);              // Call parent's addTask function
    setValue('');              // Clear input after adding
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
      />
      <button className={styles.button} type="submit">
        Add
      </button>
    </form>
  );
}