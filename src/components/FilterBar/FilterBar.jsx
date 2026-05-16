import styles from './FilterBar.module.css';

const FILTERS = ['all', 'active', 'completed'];

export default function FilterBar({
  filter,
  onFilterChange,
  activeCount,
  onClearCompleted,
  hasCompleted,
}) {
  return (
    <div className={styles.bar}>
      <span className={styles.count}>
        {activeCount} task{activeCount !== 1 ? 's' : ''} left
      </span>

      <div className={styles.filters}>
        {FILTERS.map(f => (
          <button
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
            onClick={() => onFilterChange(f)}
          >
            {/* Capitalize first letter */}
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {hasCompleted && (
        <button className={styles.clearBtn} onClick={onClearCompleted}>
          Clear done
        </button>
      )}
    </div>
  );
}