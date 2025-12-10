"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';
import { useAuth } from '@/context/AuthContext';

const teacherNavItems = [
  { label: 'Dashboard', href: '/', icon: '📊' },
  { label: 'Projects (PBL)', href: '/projects', icon: '🚀' },
  { label: 'Engagement', href: '/engagement', icon: '📡' },
  { label: 'Mastery', href: '/mastery', icon: '🧠' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
];

const studentNavItems = [
  { label: 'Dashboard', href: '/', icon: '🏠' },
  { label: 'My Projects', href: '/projects', icon: '🚀' },
  { label: 'My Progress', href: '/mastery', icon: '📈' },
  { label: 'Settings', href: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = user?.role === 'student' ? studentNavItems : teacherNavItems;

  if (!user) return null;

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
            </Link>
          );
        })}
      </nav>

      <div className={styles.userProfile}>
        <div className={styles.avatar}>{user.avatar}</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{user.name}</div>
          <div className={styles.userRole}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </div>
        </div>
        <button 
          onClick={logout}
          style={{ 
            marginLeft: 'auto', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            fontSize: '16px',
            color: 'var(--text-secondary)'
          }}
          title="Logout"
        >
          🚪
        </button>
      </div>
    </aside>
  );
}
