import styles from './Header.module.css';

export default function Header({ title }: { title: string }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.actions}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input type="text" placeholder="Search projects, students..." className={styles.searchInput} />
        </div>
        <button className={styles.iconBtn}>🔔</button>
        <button className={styles.iconBtn}>❓</button>
      </div>
    </header>
  );
}
