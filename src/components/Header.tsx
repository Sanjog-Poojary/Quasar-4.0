"use client";
import styles from './Header.module.css';
import { useTheme } from '@/context/ThemeContext';

export default function Header({ title, onMenuClick }: { title: string; onMenuClick?: () => void }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <button className={styles.menuBtn} onClick={onMenuClick}>
          ☰
        </button>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.actions}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input type="text" placeholder="Search projects, students..." className={styles.searchInput} />
        </div>
        <button className={styles.iconBtn} onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button className={styles.iconBtn}>🔔</button>
        <button className={styles.iconBtn}>❓</button>
      </div>
    </header>
  );
}
