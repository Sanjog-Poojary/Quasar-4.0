"use client";
import Link from 'next/link';
import styles from './page.module.css';

const masteryData = [
  { topic: "Newton's Laws", score: 85, status: "Mastered" },
  { topic: "Kinematics", score: 92, status: "Mastered" },
  { topic: "Energy Conservation", score: 65, status: "Learning" },
  { topic: "Thermodynamics", score: 42, status: "Needs Focus" },
  { topic: "Wave Motion", score: 10, status: "Not Started" },
];

export default function MasteryPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Knowledge Mastery Profile</h2>
          <p className={styles.subtitle}>Real-time tracking of concept mastery based on performance.</p>
        </div>
        <Link href="/mastery/practice" className="btn-primary">Start Adaptive Practice</Link>
      </div>

      <div className={styles.grid}>
        <div className={`${styles.card} glass-panel ${styles.overviewCard}`}>
          <h3>Overall Physics Mastery</h3>
          <div className={styles.circularProgress}>
            <svg viewBox="0 0 36 36" className={styles.circularChart}>
              <path className={styles.circleBg}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path className={styles.circle}
                strokeDasharray="72, 100"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className={styles.percentage}>72%</text>
            </svg>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statVal}>12</span>
              <span className={styles.statLbl}>Mastered</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statVal}>5</span>
              <span className={styles.statLbl}>Learning</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statVal}>3</span>
              <span className={styles.statLbl}>To Review</span>
            </div>
          </div>
        </div>

        <div className={`${styles.card} glass-panel ${styles.topicsCard}`}>
          <h3>Topic Breakdown</h3>
          <div className={styles.topicList}>
            {masteryData.map((item, i) => (
              <div key={i} className={styles.topicItem}>
                <div className={styles.topicInfo}>
                  <span className={styles.topicName}>{item.topic}</span>
                  <span className={`${styles.topicStatus} ${styles[item.status.replace(' ', '')]}`}>
                    {item.status}
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ 
                      width: `${item.score}%`,
                      background: item.score > 80 ? '#00E096' : item.score > 50 ? '#FFB900' : '#FF3D71'
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.card} glass-panel`}>
        <h3>Recommended Focus Areas (Zone of Proximal Development)</h3>
        <div className={styles.recommendations}>
          <div className={styles.recCard}>
            <div className={styles.recIcon}>🔥</div>
            <div className={styles.recContent}>
              <h4>Thermodynamics: Heat Transfer</h4>
              <p>You&apos;re close to mastering this! Try 3 more problems.</p>
            </div>
            <Link href="/mastery/practice">
              <button className={styles.practiceBtn}>Practice</button>
            </Link>
          </div>
          <div className={styles.recCard}>
            <div className={styles.recIcon}>⚡</div>
            <div className={styles.recContent}>
              <h4>Energy Conservation: Potential Energy</h4>
              <p>Review the core concepts before moving to Kinetic Energy.</p>
            </div>
            <button className={styles.practiceBtn} onClick={() => alert("Review module coming soon")}>Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}
