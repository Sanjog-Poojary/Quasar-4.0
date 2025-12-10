"use client";
import { useState } from 'react';
import styles from './page.module.css';

export default function ProjectWorkspace() {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <span className={styles.badge}>Physics • Grade 10</span>
          <span className={styles.dueDate}>Due in 12 days</span>
        </div>
        <h2 className={styles.title}>Mars Colony Design</h2>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
          <button className={`${styles.tab} ${activeTab === 'tasks' ? styles.activeTab : ''}`} onClick={() => setActiveTab('tasks')}>Tasks & Kanban</button>
          <button className={`${styles.tab} ${activeTab === 'team' ? styles.activeTab : ''}`} onClick={() => setActiveTab('team')}>Team</button>
          <button className={`${styles.tab} ${activeTab === 'files' ? styles.activeTab : ''}`} onClick={() => setActiveTab('files')}>Files</button>
        </div>
      </div>

      <div className={styles.content}>
        {activeTab === 'tasks' && (
          <div className={styles.kanbanBoard}>
            <div className={styles.column}>
              <div className={styles.columnHeader}>
                <span className={styles.dot} style={{ background: '#FF3D71' }} />
                <h3>To Do</h3>
                <span className={styles.count}>3</span>
              </div>
              <div className={styles.taskList}>
                <div className={`${styles.taskCard} glass-card`}>
                  <div className={styles.taskTags}><span className={styles.tag}>Research</span></div>
                  <h4>Analyze soil composition data</h4>
                  <div className={styles.taskFooter}>
                    <div className={styles.avatar}>JS</div>
                    <span className={styles.priority}>High</span>
                  </div>
                </div>
                <div className={`${styles.taskCard} glass-card`}>
                  <div className={styles.taskTags}><span className={styles.tag}>Design</span></div>
                  <h4>Draft initial habitat layout</h4>
                  <div className={styles.taskFooter}>
                    <div className={styles.avatar} style={{ background: '#00E096' }}>AL</div>
                  </div>
                </div>
                <div className={`${styles.taskCard} glass-card`}>
                  <div className={styles.taskTags}><span className={styles.tag}>Logistics</span></div>
                  <h4>Calculate oxygen requirements</h4>
                  <div className={styles.taskFooter}>
                    <div className={styles.unassigned}>?</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.columnHeader}>
                <span className={styles.dot} style={{ background: '#FFB900' }} />
                <h3>In Progress</h3>
                <span className={styles.count}>1</span>
              </div>
              <div className={styles.taskList}>
                <div className={`${styles.taskCard} glass-card`}>
                  <div className={styles.taskTags}><span className={styles.tag}>Engineering</span></div>
                  <h4>3D Model of Air Lock System</h4>
                  <div className={styles.taskFooter}>
                    <div className={styles.avatar}>MA</div>
                    <span className={styles.priority} style={{ color: '#FFB900' }}>Med</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.columnHeader}>
                <span className={styles.dot} style={{ background: '#00E096' }} />
                <h3>Done</h3>
                <span className={styles.count}>2</span>
              </div>
              <div className={styles.taskList}>
                <div className={`${styles.taskCard} glass-card`}>
                  <div className={styles.taskTags}><span className={styles.tag}>Planning</span></div>
                  <h4>Team Charter Signed</h4>
                  <div className={styles.taskFooter}>
                    <div className={styles.avatar}>ALL</div>
                  </div>
                </div>
                <div className={`${styles.taskCard} glass-card`}>
                  <div className={styles.taskTags}><span className={styles.tag}>Research</span></div>
                  <h4>Select landing site</h4>
                  <div className={styles.taskFooter}>
                    <div className={styles.avatar}>JS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className={`${styles.teamPanel} glass-panel`}>
            <h3>Team Alpha</h3>
            <div className={styles.memberList}>
              <div className={styles.member}>
                <div className={styles.largeAvatar}>JS</div>
                <div className={styles.memberInfo}>
                  <h4>John Smith</h4>
                  <p>Role: Researcher</p>
                </div>
                <div className={styles.memberStats}>
                  <span>Tasks: 2</span>
                  <span>Engagement: High</span>
                </div>
              </div>
              <div className={styles.member}>
                <div className={styles.largeAvatar} style={{ background: '#00E096' }}>AL</div>
                <div className={styles.memberInfo}>
                  <h4>Ada Lovelace</h4>
                  <p>Role: Engineer</p>
                </div>
                <div className={styles.memberStats}>
                  <span>Tasks: 3</span>
                  <span>Engagement: High</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
