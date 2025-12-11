import { NextResponse } from 'next/server';
import { db, auth } from '@/lib/firebase-admin';
import bcrypt from 'bcryptjs';

export async function GET() {
    console.log('Starting seed process...');
    try {
        // Clear existing data (optional, be careful in production)
        // Firestore doesn't have a simple "delete collection" method for client SDKs, 
        // but for seeding we can just overwrite or manually delete if needed.
        // For simplicity in this seed script, we'll just overwrite specific docs.

        const hashedPassword = await bcrypt.hash('password123', 10);
        console.log('Password hashed.');

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
        console.log('Seeding users...');
        for (const user of users) {
            console.log(`Processing user: ${user.email}`);
            // 1. Create in Firestore
            const userRef = db.collection('users').doc(user.email);
            await userRef.set({
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                uid: user.email // Temporary UID for seed data, will be updated if Auth user is created
            });

            // 2. Create in Firebase Authentication
            try {
                // Check if user exists
                try {
                    await auth.getUserByEmail(user.email);
                    console.log(`User ${user.email} already exists in Auth.`);
                } catch (e) {
                    // User doesn't exist, create them
                    const userRecord = await auth.createUser({
                        email: user.email,
                        password: 'password123', // Default password for all seed users
                        displayName: user.name,
                    });
                    console.log(`Created Auth user: ${user.email}`);

                    // Update Firestore with real UID
                    await userRef.update({ uid: userRecord.uid });
                }
            } catch (authError) {
                console.error(`Failed to create auth user for ${user.email}:`, authError);
            }
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
                { title: 'Sustainable City', subtitle: 'Biology • Grade 9 • Starting next week', status: 'Planned', icon: '🌱', statusColor: '#6c757d', statusBg: 'rgba(108, 117, 125, 0.1)' },
                { title: 'AI Ethics Debate', subtitle: 'Computer Science • Grade 11 • Active', status: 'In Progress', icon: '🤖', statusColor: '#0095FF', statusBg: 'rgba(0, 149, 255, 0.1)' },
                { title: 'History of Mathematics', subtitle: 'Math • Grade 10 • Completed', status: 'Completed', icon: '📜', statusColor: '#28a745', statusBg: 'rgba(40, 167, 69, 0.1)' }
            ],
            activity: [
                { user: 'John Smith', action: 'submitted Milestone 2', time: '2 mins ago', avatar: 'JS' },
                { user: 'Ada Lovelace', action: 'flagged a Confusion', time: '15 mins ago', avatar: 'AL', avatarBg: '#FF3D71' },
                { user: 'Grace Hopper', action: 'completed the quiz', time: '1 hour ago', avatar: 'GH', avatarBg: '#00E096' },
                { user: 'Alan Turing', action: 'started a new project', time: '3 hours ago', avatar: 'AT', avatarBg: '#0095FF' }
            ]
        });

        // Seed Student Data
        const studentDataRef = db.collection('dashboardData').doc('student');
        batch.set(studentDataRef, {
            role: 'student',
            stats: [
                { label: 'Assignments Due', value: 4, trend: 'Physics, Biology & CS', icon: '📚', color: '#00E096', bgColor: 'rgba(0, 224, 150, 0.1)' },
                { label: 'Current Grade', value: 'A-', trend: 'Top 10% of class', icon: '⭐', color: '#0095FF', bgColor: 'rgba(0, 149, 255, 0.1)' },
                { label: 'Attendance', value: '98%', trend: 'Excellent', icon: '📅', color: '#FFB900', bgColor: 'rgba(255, 185, 0, 0.1)' }
            ],
            projects: [
                { title: 'Mars Colony Design', subtitle: 'Physics • Due in 3 days', status: 'In Progress', icon: '🚀' },
                { title: 'Sustainable City', subtitle: 'Biology • Starting next week', status: 'Upcoming', icon: '🌱', statusColor: '#6c757d', statusBg: 'rgba(108, 117, 125, 0.1)' },
                { title: 'AI Ethics Essay', subtitle: 'Computer Science • Due tomorrow', status: 'Urgent', icon: '📝', statusColor: '#FF3D71', statusBg: 'rgba(255, 61, 113, 0.1)' },
                { title: 'Calculus Problem Set', subtitle: 'Math • Completed', status: 'Submitted', icon: '➗', statusColor: '#28a745', statusBg: 'rgba(40, 167, 69, 0.1)' }
            ],
            activity: [
                { user: 'Mr. Anderson', action: 'commented on Milestone 1', time: '2 hours ago', avatar: 'T' },
                { user: 'System', action: 'Mastery Level Up!', time: 'Yesterday', avatar: 'S', avatarBg: '#28a745' },
                { user: 'Ms. Johnson', action: 'graded your Biology quiz', time: '2 days ago', avatar: 'J', avatarBg: '#FFB900' }
            ]
        });

        await batch.commit();

        return NextResponse.json({ message: 'Database seeded successfully with Users and Dashboard Data' });
    } catch (error: any) {
        console.error('Seed Error:', error);
        return NextResponse.json({ error: 'Failed to seed database', details: error.message }, { status: 500 });
    }
}
