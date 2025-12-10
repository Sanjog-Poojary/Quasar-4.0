"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function NewProjectPage() {
  const [milestones, setMilestones] = useState([{ id: 1, title: 'Project Proposal', due: 'Week 1' }]);

  const addMilestone = () => {
    setMilestones([...milestones, { id: Date.now(), title: '', due: '' }]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/projects" className={styles.backLink}>← Back to Library</Link>
        <h2 className={styles.title}>Create New Project</h2>
      </div>

      <div className={styles.formGrid}>
        <div className={`${styles.card} glass-panel`}>
          <h3>Project Details</h3>
          <div className={styles.inputGroup}>
            <label>Project Title</label>
            <input type="text" placeholder="e.g., Mars Colony Design" className={styles.input} />
          </div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Subject</label>
              <select className={styles.select}>
                <option>Physics</option>
                <option>History</option>
                <option>Biology</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Grade Level</label>
              <select className={styles.select}>
                <option>Grade 9</option>
                <option>Grade 10</option>
                <option>Grade 11</option>
              </select>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Description & Driving Question</label>
            <textarea className={styles.textarea} placeholder="What is the core problem students will solve?" rows={4} />
          </div>
        </div>

        <div className={`${styles.card} glass-panel`}>
          <div className={styles.cardHeader}>
            <h3>Milestones & Assessment</h3>
            <button onClick={addMilestone} className={styles.addBtn}>+ Add Milestone</button>
          </div>
          <div className={styles.milestoneList}>
            {milestones.map((m, i) => (
              <div key={m.id} className={styles.milestoneItem}>
                <span className={styles.milestoneNum}>{i + 1}</span>
                <input type="text" placeholder="Milestone Title" className={styles.input} defaultValue={m.title} />
                <input type="text" placeholder="Due Date" className={styles.input} style={{ width: '120px' }} defaultValue={m.due} />
              </div>
            ))}
          </div>
          
          <div className={styles.softSkills}>
            <h4>Target Soft Skills</h4>
            <div className={styles.skillTags}>
              <span className={`${styles.skillTag} ${styles.active}`}>Collaboration</span>
              <span className={`${styles.skillTag} ${styles.active}`}>Critical Thinking</span>
              <span className={styles.skillTag}>Creativity</span>
              <span className={styles.skillTag}>Communication</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Link href="/projects">
          <button className={styles.cancelBtn}>Cancel</button>
        </Link>
        <Link href="/projects/1">
          <button className="btn-primary">Launch Project</button>
        </Link>
      </div>
    </div>
  );
}
