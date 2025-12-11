import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');

    if (!role || (role !== 'teacher' && role !== 'student')) {
        return NextResponse.json({ error: 'Invalid or missing role parameter' }, { status: 400 });
    }

    try {
        const dashboardRef = db.collection('dashboardData').doc(role);
        const doc = await dashboardRef.get();

        if (!doc.exists) {
            return NextResponse.json({ error: 'Data not found for role' }, { status: 404 });
        }

        return NextResponse.json(doc.data());
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error', details: error }, { status: 500 });
    }
}
