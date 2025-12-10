import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>Welcome back, Mr. Anderson</h2>
        <p className={styles.welcomeSubtitle}>Here&apos;s what&apos;s happening in your classroom today.</p>
      </section>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} glass-card`}>
          <div className={styles.statIcon} style={{ background: 'rgba(0, 224, 150, 0.1)', color: '#00E096' }}>📈</div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Class Mastery Rate</span>
            <span className={styles.statValue}>78%</span>
            <span className={styles.statTrend}>+5% from last week</span>
          </div>
        </div>

        <div className={`${styles.statCard} glass-card`}>
          <div className={styles.statIcon} style={{ background: 'rgba(0, 149, 255, 0.1)', color: '#0095FF' }}>📡</div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Engagement Index</span>
            <span className={styles.statValue}>92%</span>
            <span className={styles.statTrend}>High participation</span>
          </div>
        </div>

        <div className={`${styles.statCard} glass-card`}>
          <div className={styles.statIcon} style={{ background: 'rgba(255, 185, 0, 0.1)', color: '#FFB900' }}>⚠️</div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Confusion Alerts</span>
            <span className={styles.statValue}>3</span>
            <span className={styles.statTrend}>Requires attention</span>
          </div>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={`${styles.sectionCard} glass-panel`}>
          <div className={styles.cardHeader}>
            <h3>Active Projects</h3>
            <Link href="/projects/new">
              <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>+ New Project</button>
            </Link>
          </div>
          <div className={styles.projectList}>
            <div className={styles.projectItem}>
              <div className={styles.projectIcon}>🚀</div>
              <div className={styles.projectDetails}>
                <h4>Mars Colony Design</h4>
                <p>Physics • Grade 10 • Due in 3 days</p>
              </div>
              <div className={styles.projectStatus}>In Progress</div>
            </div>
            <div className={styles.projectItem}>
              <div className={styles.projectIcon}>🌱</div>
              <div className={styles.projectDetails}>
                <h4>Sustainable City</h4>
                <p>Biology • Grade 9 • Starting next week</p>
              </div>
              <div className={styles.projectStatus} style={{ background: 'rgba(255,255,255,0.1)' }}>Planned</div>
            </div>
          </div>
        </div>

        <div className={`${styles.sectionCard} glass-panel`}>
          <div className={styles.cardHeader}>
            <h3>Recent Activity</h3>
          </div>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.avatar}>JS</div>
              <div>
                <p><strong>John Smith</strong> submitted <strong>Milestone 2</strong></p>
                <span className={styles.time}>2 mins ago</span>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.avatar} style={{ background: '#FF3D71' }}>AL</div>
              <div>
                <p><strong>Ada Lovelace</strong> flagged a <strong>Confusion</strong></p>
                <span className={styles.time}>15 mins ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
