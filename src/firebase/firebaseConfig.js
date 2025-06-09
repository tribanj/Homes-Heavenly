// src/firebase/firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // ✅ Add this

const firebaseConfig = {
  apiKey: "AIzaSyA2Y8paq6LtYGmQLQiu572eR6wad97cs4w",
  authDomain: "home-heavenly.firebaseapp.com",
  projectId: "home-heavenly",
  storageBucket: "home-heavenly.appspot.com", // ✅ Corrected from `.app` to `.com`
  messagingSenderId: "1057281166801",
  appId: "1:1057281166801:web:5a9d759999f9ee2774e4f0",
  measurementId: "G-KYEFKDPL4Y"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ Export Storage
