"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user && pathname !== '/login') {
      router.push('/login');
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  if (pathname === '/login') {
    return <>{children}</>;
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ 
        flex: 1, 
        marginLeft: '260px', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: 'var(--bg-body)',
        minHeight: '100vh'
      }}>
        <Header title="Dashboard" />
        <div style={{ padding: '32px' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
