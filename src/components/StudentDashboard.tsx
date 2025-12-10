"use client";

import styles from '@/app/page.module.css';
import { useEffect, useState } from 'react';
import CameraFeed from '@/components/CameraFeed';

interface DashboardData {
  stats: any[];
  projects: any[];
  activity: any[];
}

export default function StudentDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/dashboard?role=student');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className={styles.loading}>Loading dashboard...</div>;
  if (!data) return <div className={styles.error}>Failed to load data</div>;

  return (
    <div className={styles.container}>
      <section className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>Welcome back, Alex</h2>
        <p className={styles.welcomeSubtitle}>Keep up the great work! Here is your progress.</p>
      </section>

      <div className={styles.statsGrid}>
        {data.stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: stat.bgColor, color: stat.color }}>{stat.icon}</div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statTrend}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <CameraFeed />

      <div className={styles.contentGrid}>
        <div className={styles.sectionCard}>
          <div className={styles.cardHeader}>
            <h3>My Assignments</h3>
          </div>
          <div className={styles.projectList}>
            {data.projects.map((project, index) => (
              <div key={index} className={styles.projectItem}>
                <div className={styles.projectIcon}>{project.icon}</div>
                <div className={styles.projectDetails}>
                  <h4>{project.title}</h4>
                  <p>{project.subtitle}</p>
                </div>
                <div 
                  className={styles.projectStatus} 
                  style={project.statusBg ? { backgroundColor: project.statusBg, color: project.statusColor } : {}}
                >
                  {project.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sectionCard}>
          <div className={styles.cardHeader}>
            <h3>Recent Feedback</h3>
          </div>
          <div className={styles.activityList}>
            {data.activity.map((item, index) => (
              <div key={index} className={styles.activityItem}>
                <div className={styles.avatar} style={item.avatarBg ? { backgroundColor: item.avatarBg } : {}}>{item.avatar}</div>
                <div>
                  <p><strong>{item.user}</strong> {item.action}</p>
                  <p style={{ fontSize: '13px', marginTop: '4px', fontStyle: 'italic' }}>"{item.action.includes('commented') ? 'Great work on the initial concept!' : 'Keep it up!'}"</p>
                  <span className={styles.time}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
