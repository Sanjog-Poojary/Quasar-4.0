"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const projectTemplates = [
  {
    id: 1,
    title: "Mars Colony Design",
    subject: "Physics & Engineering",
    grade: "Grade 10-12",
    duration: "4 Weeks",
    difficulty: "Advanced",
    image: "🪐",
    tags: ["Space", "Architecture", "Sustainability"]
  },
  {
    id: 2,
    title: "Sustainable City Planning",
    subject: "Environmental Science",
    grade: "Grade 9-10",
    duration: "3 Weeks",
    difficulty: "Intermediate",
    image: "🏙️",
    tags: ["Urban Planning", "Ecology", "Civics"]
  },
  {
    id: 3,
    title: "Ancient Civilizations VR Tour",
    subject: "History & Tech",
    grade: "Grade 6-8",
    duration: "2 Weeks",
    difficulty: "Beginner",
    image: "🏛️",
    tags: ["VR", "History", "Storytelling"]
  },
  {
    id: 4,
    title: "Vertical Farming Prototype",
    subject: "Biology & Engineering",
    grade: "Grade 11-12",
    duration: "5 Weeks",
    difficulty: "Advanced",
    image: "🌱",
    tags: ["Agriculture", "Robotics", "Biology"]
  },
  {
    id: 5,
    title: "Podcast Series: Local Heroes",
    subject: "English & Social Studies",
    grade: "Grade 8-9",
    duration: "3 Weeks",
    difficulty: "Intermediate",
    image: "🎙️",
    tags: ["Media", "Interviewing", "Audio"]
  },
  {
    id: 6,
    title: "Financial Literacy Game",
    subject: "Math & Economics",
    grade: "Grade 10",
    duration: "2 Weeks",
    difficulty: "Intermediate",
    image: "💰",
    tags: ["Game Design", "Finance", "Math"]
  }
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Project Library</h2>
          <p className={styles.subtitle}>Select a template to launch a new PBL experience.</p>
        </div>
        <Link href="/projects/new">
          <button className="btn-primary">+ Create Custom Project</button>
        </Link>
      </div>

      <div className={styles.filters}>
        {['All', 'Science', 'History', 'Math', 'English', 'Arts'].map((f) => (
          <button 
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.activeFilter : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {projectTemplates.map((project) => (
          <div key={project.id} className={`${styles.card} glass-card`}>
            <div className={styles.cardImage}>{project.image}</div>
            <div className={styles.cardContent}>
              <div className={styles.tags}>
                {project.tags.slice(0, 2).map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardSubject}>{project.subject}</p>
              
              <div className={styles.meta}>
                <span className={styles.metaItem}>📅 {project.duration}</span>
                <span className={styles.metaItem}>🎓 {project.grade}</span>
              </div>
              
              <Link href={`/projects/new?template=${project.id}`} style={{ width: '100%' }}>
                <button className={styles.useBtn}>Use Template</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
