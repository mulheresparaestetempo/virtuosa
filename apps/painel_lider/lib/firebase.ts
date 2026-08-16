import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDhTQRP7HdwaDruyAP_rRZRoSnC6O1Gttg',
  authDomain: 'app-filha-af1f9.firebaseapp.com',
  projectId: 'app-filha-af1f9',
  storageBucket: 'app-filha-af1f9.firebasestorage.app',
  messagingSenderId: '557958037513',
  appId: '1:557958037513:web:e2e4f96045453ed87138d8',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
