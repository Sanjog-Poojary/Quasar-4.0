import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBRljpl5xfZthiH7n41wPkqVOW0nAzJPTE",
  authDomain: "amep-b8e77.firebaseapp.com",
  projectId: "amep-b8e77",
  storageBucket: "amep-b8e77.firebasestorage.app",
  messagingSenderId: "255040709942",
  appId: "1:255040709942:web:673b11847ab6def8103f97",
  measurementId: "G-GL1KREYW2V"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
