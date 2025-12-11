import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    // Helper to clean env vars (remove quotes and trailing commas)
    const cleanEnvVar = (value: string | undefined) => {
        if (!value) return undefined;
        // Remove trailing comma if present
        let cleaned = value.replace(/,$/, '').trim();
        // Remove surrounding quotes if present (both start and end)
        if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
            cleaned = cleaned.slice(1, -1);
        }
        return cleaned;
    };

    const projectId = cleanEnvVar(process.env.FIREBASE_PROJECT_ID);
    const clientEmail = cleanEnvVar(process.env.FIREBASE_CLIENT_EMAIL);
    const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !rawPrivateKey) {
        if (!projectId) console.error('Missing env: FIREBASE_PROJECT_ID');
        if (!clientEmail) console.error('Missing env: FIREBASE_CLIENT_EMAIL');
        if (!rawPrivateKey) console.error('Missing env: FIREBASE_PRIVATE_KEY');
        throw new Error('Missing Firebase Admin Credentials. Please check your environment variables.');
    }

    // Handle private key newlines and potential surrounding quotes/commas
    let key = rawPrivateKey.replace(/,$/, '').trim();
    if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
        key = key.slice(1, -1);
    }
    const formattedPrivateKey = key.replace(/\\n/g, '\n');

    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId,
                clientEmail,
                privateKey: formattedPrivateKey,
            }),
        });
        console.log('Firebase Admin Initialized successfully');
    } catch (error) {
        console.error('Firebase Admin Initialization Error:', error);
        throw error;
    }
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
