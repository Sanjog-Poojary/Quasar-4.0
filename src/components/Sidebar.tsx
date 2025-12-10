"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const navItems = [
  { label: 'Dashboard', href: '/', icon: '📊' },
  { label: 'Projects (PBL)', href: '/projects', icon: '🚀' },
  { label: 'Engagement', href: '/engagement', icon: '📡' },
  { label: 'Mastery', href: '/mastery', icon: '🧠' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>A</div>
        <span className={styles.logoText}>AMEP</span>
      </div>
      
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
              {isActive && <div className={styles.activeIndicator} />}
            </Link>
          );
        })}
      </nav>

      <div className={styles.userProfile}>
        <div className={styles.avatar}>T</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>Mr. Anderson</div>
          <div className={styles.userRole}>Teacher</div>
        </div>
      </div>
    </aside>
  );
}
