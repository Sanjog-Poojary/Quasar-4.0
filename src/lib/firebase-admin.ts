import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
        console.error('Missing Firebase Admin Credentials');
        throw new Error('Missing Firebase Admin Credentials. Please check your environment variables.');
    }

    // Handle private key newlines and potential surrounding quotes
    const formattedPrivateKey = privateKey
        .replace(/\\n/g, '\n') // Replace literal \n with actual newlines
        .replace(/^"|"$/g, ''); // Remove surrounding quotes if present

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

export { db };
