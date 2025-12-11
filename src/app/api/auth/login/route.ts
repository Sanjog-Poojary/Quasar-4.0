import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import bcrypt from 'bcryptjs';
import { User } from '@/models/User';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const userDoc = await db.collection('users').doc(email).get();

        if (!userDoc.exists) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const user = userDoc.data() as User;

        const isMatch = await bcrypt.compare(password, user.password!);

        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Return user data without password
        const userData = {
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar
        };

        return NextResponse.json(userData);
    } catch (error: any) {
        console.error('Login Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
