"use client";
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function EngagementPage() {
  const [activePoll, setActivePoll] = useState<any>(null);
  const [confusionIndex, setConfusionIndex] = useState(12);

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setConfusionIndex(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const launchPoll = () => {
    setActivePoll({
      question: "How confident are you with Newton's Third Law?",
      options: [
        { label: "Very Confident", count: 0 },
        { label: "Somewhat Confident", count: 0 },
        { label: "Confused", count: 0 }
      ],
      totalVotes: 0
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Live Engagement Tracking</h2>
        <div className={styles.statusBadge}>
          <span className={styles.dot} /> Live Session Active
        </div>
      </div>

      <div className={styles.grid}>
        <div className={`${styles.card} glass-panel ${styles.mainMetric}`}>
          <h3>Real-time Confusion Index</h3>
          <div className={styles.metricContainer}>
            <div className={styles.metricValue} style={{ color: confusionIndex > 20 ? '#FF3D71' : '#00E096' }}>
              {confusionIndex}%
            </div>
            <p className={styles.metricLabel}>of students are currently confused</p>
          </div>
          <div className={styles.chartPlaceholder}>
            {/* Mock Chart Visualization */}
            <div className={styles.chartBar} style={{ height: '40%' }} />
            <div className={styles.chartBar} style={{ height: '60%' }} />
            <div className={styles.chartBar} style={{ height: '30%' }} />
            <div className={styles.chartBar} style={{ height: '20%' }} />
            <div className={styles.chartBar} style={{ height: '45%' }} />
            <div className={styles.chartBar} style={{ height: '80%' }} />
            <div className={styles.chartBar} style={{ height: '15%' }} />
            <div className={styles.chartBar} style={{ height: `${confusionIndex}%`, background: confusionIndex > 20 ? '#FF3D71' : '#00E096' }} />
          </div>
        </div>

        <div className={`${styles.card} glass-panel`}>
          <h3>Quick Actions</h3>
          <div className={styles.actionGrid}>
            <button className={styles.actionBtn} onClick={launchPoll}>
              <span className={styles.btnIcon}>📊</span>
              Launch Poll
            </button>
            <button className={styles.actionBtn}>
              <span className={styles.btnIcon}>❓</span>
              Check Understanding
            </button>
            <button className={styles.actionBtn}>
              <span className={styles.btnIcon}>🧊</span>
              Ice Breaker
            </button>
            <button className={styles.actionBtn}>
              <span className={styles.btnIcon}>🛑</span>
              Pause Session
            </button>
          </div>
        </div>
      </div>

      {activePoll ? (
        <div className={`${styles.pollContainer} glass-card`}>
          <div className={styles.pollHeader}>
            <h3>Active Poll: {activePoll.question}</h3>
            <button className={styles.closeBtn} onClick={() => setActivePoll(null)}>End Poll</button>
          </div>
          <div className={styles.pollResults}>
            {activePoll.options.map((opt: any, i: number) => (
              <div key={i} className={styles.pollOption}>
                <div className={styles.optionLabel}>
                  <span>{opt.label}</span>
                  <span>{Math.floor(Math.random() * 10)} votes</span> {/* Mock data */}
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${Math.random() * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`${styles.pollPlaceholder} glass-card`}>
          <p>No active poll. Launch one to see real-time responses.</p>
        </div>
      )}
    </div>
  );
}
