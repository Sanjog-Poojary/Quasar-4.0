"use client";
import { useState } from 'react';
import styles from './page.module.css';

export default function StudentEngagementPage() {
  const [confused, setConfused] = useState(false);
  const [voted, setVoted] = useState(false);

  const toggleConfusion = () => {
    setConfused(!confused);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Physics 101 - Live Session</h3>
        <div className={styles.status}>🔴 Live</div>
      </div>

      <div className={styles.mainAction}>
        <button 
          className={`${styles.confusionBtn} ${confused ? styles.active : ''}`}
          onClick={toggleConfusion}
        >
          <span className={styles.icon}>{confused ? '✋' : '🤔'}</span>
          <span className={styles.label}>
            {confused ? "I'm Confused (Signal Sent)" : "I'm Confused"}
          </span>
          {confused && <span className={styles.subLabel}>Tap to clear</span>}
        </button>
      </div>

      <div className={`${styles.pollCard} glass-card`}>
        <h4>Active Poll</h4>
        <p className={styles.question}>How confident are you with Newton's Third Law?</p>
        
        {!voted ? (
          <div className={styles.options}>
            <button className={styles.optionBtn} onClick={() => setVoted(true)}>Very Confident</button>
            <button className={styles.optionBtn} onClick={() => setVoted(true)}>Somewhat Confident</button>
            <button className={styles.optionBtn} onClick={() => setVoted(true)}>Confused</button>
          </div>
        ) : (
          <div className={styles.votedState}>
            <div className={styles.checkIcon}>✓</div>
            <p>Response Submitted</p>
            <button className={styles.textBtn} onClick={() => setVoted(false)}>Change Answer</button>
          </div>
        )}
      </div>

      <div className={styles.reactions}>
        <button className={styles.reactionBtn}>👍</button>
        <button className={styles.reactionBtn}>❤️</button>
        <button className={styles.reactionBtn}>👏</button>
        <button className={styles.reactionBtn}>🎉</button>
      </div>
    </div>
  );
}
