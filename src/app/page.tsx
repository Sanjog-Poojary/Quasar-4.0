"use client";

import { useAuth } from '@/context/AuthContext';
import TeacherDashboard from '@/components/TeacherDashboard';
import StudentDashboard from '@/components/StudentDashboard';

export default function Home() {
  const { user } = useAuth();

  // If user is null, ClientLayout will handle redirect, but we return null here to avoid flash
  if (!user) return null;

  if (user.role === 'student') {
    return <StudentDashboard />;
  }

  return <TeacherDashboard />;
}
