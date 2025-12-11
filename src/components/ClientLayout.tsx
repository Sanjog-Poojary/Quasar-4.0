"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user && pathname !== '/login' && pathname !== '/signup') {
      router.push('/login');
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (pathname === '/login' || pathname === '/signup') {
    return <>{children}</>;
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="main-content" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: 'var(--bg-body)',
        minHeight: '100vh'
      }}>
        <Header title="Dashboard" onMenuClick={() => setIsSidebarOpen(true)} />
        <div style={{ padding: '32px' }} className="content-padding">
          {children}
        </div>
      </main>
    </div>
  );
}
