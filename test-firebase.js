const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local to avoid dotenv dependency issues if not installed
function loadEnv() {
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
        console.error('❌ .env.local not found');
        process.exit(1);
    }
    const content = fs.readFileSync(envPath, 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            let value = match[2].trim();
            // Remove quotes if present
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            env[key] = value;
        }
    });
    return env;
}

const env = loadEnv();

const projectId = env.FIREBASE_PROJECT_ID;
const clientEmail = env.FIREBASE_CLIENT_EMAIL;
const privateKey = env.FIREBASE_PRIVATE_KEY;

console.log('Testing with:');
console.log('Project ID:', projectId);
console.log('Client Email:', clientEmail);
console.log('Private Key Length:', privateKey ? privateKey.length : 'MISSING');

if (!projectId || !clientEmail || !privateKey) {
    console.error('❌ Missing credentials');
    process.exit(1);
}

// Logic from firebase-admin.ts
const cleanEnvVar = (value) => {
    if (!value) return undefined;
    return value.replace(/^['"]|['"]$/g, '').replace(/,$/, '').trim();
};

const cleanProjectId = cleanEnvVar(projectId);
const cleanClientEmail = cleanEnvVar(clientEmail);
const cleanPrivateKey = privateKey ? privateKey.replace(/^['"]|['"]$/g, '').replace(/,$/, '') : undefined;

console.log('--- Sanitized Values ---');
console.log('Project ID:', cleanProjectId);
console.log('Client Email:', cleanClientEmail);

if (cleanPrivateKey) {
    const formattedKey = cleanPrivateKey.replace(/\\n/g, '\n');
    console.log('Private Key First 30 chars:', formattedKey.substring(0, 30).replace(/\n/g, '\\n'));
    console.log('Private Key Last 30 chars:', formattedKey.substring(formattedKey.length - 30).replace(/\n/g, '\\n'));
    console.log('Contains BEGIN PRIVATE KEY:', formattedKey.includes('-----BEGIN PRIVATE KEY-----'));
    console.log('Contains END PRIVATE KEY:', formattedKey.includes('-----END PRIVATE KEY-----'));
    console.log('Total Length:', formattedKey.length);

    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: cleanProjectId,
                clientEmail: cleanClientEmail,
                privateKey: formattedKey,
            }),
        });
        console.log('✅ Initialization successful');

        const db = admin.firestore();
        db.listCollections().then(() => {
            console.log('✅ Connection successful! Credentials are valid.');
        }).catch(err => {
            console.error('❌ Connection failed:', err.message);
            console.error('Full Error:', JSON.stringify(err, null, 2));
        });

    } catch (error) {
        console.error('❌ Initialization failed:', error.message);
    }
} else {
    console.error('❌ Private Key is missing after sanitization');
}
