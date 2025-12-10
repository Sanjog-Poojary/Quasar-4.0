"use client";
import { useTheme } from '@/context/ThemeContext';
import styles from './page.module.css';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Settings</h2>
      
      <div className={styles.grid}>
        <div className={`${styles.card} glass-panel`}>
          <h3>Appearance</h3>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <h4>Theme Preference</h4>
              <p>Switch between light and dark mode</p>
            </div>
            <button className={styles.toggleBtn} onClick={toggleTheme}>
              {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </div>
        </div>

        <div className={`${styles.card} glass-panel`}>
          <h3>Profile</h3>
          <div className={styles.profileSection}>
            <div className={styles.avatar}>T</div>
            <div className={styles.profileInfo}>
              <h4>Mr. Anderson</h4>
              <p>Teacher • Physics Department</p>
              <button className={styles.editBtn}>Edit Profile</button>
            </div>
          </div>
        </div>

        <div className={`${styles.card} glass-panel`}>
          <h3>Notifications</h3>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <h4>Email Notifications</h4>
              <p>Receive daily summaries of student progress</p>
            </div>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <h4>Real-time Alerts</h4>
              <p>Get notified when confusion index spikes</p>
            </div>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
