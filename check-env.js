const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');

console.log('Checking .env.local at:', envPath);

if (fs.existsSync(envPath)) {
    console.log('✅ .env.local file exists.');
    const content = fs.readFileSync(envPath, 'utf8');

    const hasProjectId = content.includes('FIREBASE_PROJECT_ID');
    const hasClientEmail = content.includes('FIREBASE_CLIENT_EMAIL');
    const hasPrivateKey = content.includes('FIREBASE_PRIVATE_KEY');

    console.log('Contains FIREBASE_PROJECT_ID:', hasProjectId ? '✅' : '❌');
    console.log('Contains FIREBASE_CLIENT_EMAIL:', hasClientEmail ? '✅' : '❌');
    console.log('Contains FIREBASE_PRIVATE_KEY:', hasPrivateKey ? '✅' : '❌');

    if (hasPrivateKey) {
        const privateKeyLine = content.split('\n').find(l => l.includes('FIREBASE_PRIVATE_KEY'));
        if (privateKeyLine) {
            console.log('Private Key format check:', privateKeyLine.includes('-----BEGIN PRIVATE KEY-----') ? '✅ Looks correct' : '⚠️ Might be malformed');
            console.log('Private Key quotes check:', privateKeyLine.includes('"') ? '✅ Quoted' : '⚠️ Not quoted (might be okay if no spaces)');
        }
    }

} else {
    console.error('❌ .env.local file NOT found.');
}
