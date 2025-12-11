import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        // Clear existing data (optional, be careful in production)
        // Firestore doesn't have a simple "delete collection" method for client SDKs, 
        // but for seeding we can just overwrite or manually delete if needed.
        // For simplicity in this seed script, we'll just overwrite specific docs.

        const hashedPassword = await bcrypt.hash('password123', 10);

        const users = [
            {
                email: 'teacher@amep.com',
                password: hashedPassword,
                name: 'Mr. Anderson',
                role: 'teacher',
                avatar: 'T'
            },
            {
                email: 'student@amep.com',
                password: hashedPassword,
                name: 'Alex Student',
                role: 'student',
                avatar: 'S'
            },
            {
                email: 'sarah@amep.com',
                password: hashedPassword,
                name: 'Sarah High-Achiever',
                role: 'student',
                avatar: 'SH'
            },
            {
                email: 'mike@amep.com',
                password: hashedPassword,
                name: 'Mike Struggling',
                role: 'student',
                avatar: 'MS'
            },
            {
                email: 'emily@amep.com',
                password: hashedPassword,
                name: 'Emily Creative',
                role: 'student',
                avatar: 'EC'
            },
            {
                email: 'david@amep.com',
                password: hashedPassword,
                name: 'David Tech',
                role: 'student',
                avatar: 'DT'
            }
        ];

        const batch = db.batch();

        // Seed Users
        for (const user of users) {
            const userRef = db.collection('users').doc(user.email);
            batch.set(userRef, user);
        }

        // Seed Teacher Data
        const teacherDataRef = db.collection('dashboardData').doc('teacher');
        batch.set(teacherDataRef, {
            role: 'teacher',
            stats: [
                { label: 'Class Mastery Rate', value: '78%', trend: '+5% from last week', icon: '📈', color: '#00E096', bgColor: 'rgba(0, 224, 150, 0.1)' },
                { label: 'Engagement Index', value: '92%', trend: 'High participation', icon: '📡', color: '#0095FF', bgColor: 'rgba(0, 149, 255, 0.1)' },
                { label: 'Confusion Alerts', value: 3, trend: 'Requires attention', icon: '⚠️', color: '#FFB900', bgColor: 'rgba(255, 185, 0, 0.1)' }
            ],
            chartData: [
                { name: "Mon", mastery: 65, engagement: 40 },
                { name: "Tue", mastery: 59, engagement: 50 },
                { name: "Wed", mastery: 80, engagement: 60 },
                { name: "Thu", mastery: 81, engagement: 70 },
                { name: "Fri", mastery: 56, engagement: 50 },
                { name: "Sat", mastery: 55, engagement: 40 },
                { name: "Sun", mastery: 40, engagement: 30 }
            ],
            projects: [
                { title: 'Mars Colony Design', subtitle: 'Physics • Grade 10 • Due in 3 days', status: 'In Progress', icon: '🚀' },
                { title: 'Sustainable City', subtitle: 'Biology • Grade 9 • Starting next week', status: 'Planned', icon: '🌱', statusColor: '#6c757d', statusBg: 'rgba(108, 117, 125, 0.1)' }
            ],
            activity: [
                { user: 'John Smith', action: 'submitted Milestone 2', time: '2 mins ago', avatar: 'JS' },
                { user: 'Ada Lovelace', action: 'flagged a Confusion', time: '15 mins ago', avatar: 'AL', avatarBg: '#FF3D71' }
            ]
        });

        // Seed Student Data
        const studentDataRef = db.collection('dashboardData').doc('student');
        batch.set(studentDataRef, {
            role: 'student',
            stats: [
                { label: 'Assignments Due', value: 2, trend: 'Physics & Biology', icon: '📚', color: '#00E096', bgColor: 'rgba(0, 224, 150, 0.1)' },
                { label: 'Current Grade', value: 'A-', trend: 'Top 10% of class', icon: '⭐', color: '#0095FF', bgColor: 'rgba(0, 149, 255, 0.1)' },
                { label: 'Attendance', value: '98%', trend: 'Excellent', icon: '📅', color: '#FFB900', bgColor: 'rgba(255, 185, 0, 0.1)' }
            ],
            projects: [
                { title: 'Mars Colony Design', subtitle: 'Physics • Due in 3 days', status: 'In Progress', icon: '🚀' },
                { title: 'Sustainable City', subtitle: 'Biology • Starting next week', status: 'Upcoming', icon: '🌱', statusColor: '#6c757d', statusBg: 'rgba(108, 117, 125, 0.1)' }
            ],
            activity: [
                { user: 'Mr. Anderson', action: 'commented on Milestone 1', time: '2 hours ago', avatar: 'T' },
                { user: 'System', action: 'Mastery Level Up!', time: 'Yesterday', avatar: 'S', avatarBg: '#28a745' }
            ]
        });

        await batch.commit();

        return NextResponse.json({ message: 'Database seeded successfully with Users and Dashboard Data' });
    } catch (error: any) {
        console.error('Seed Error:', error);
        return NextResponse.json({ error: 'Failed to seed database', details: error.message }, { status: 500 });
    }
}
