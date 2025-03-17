import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAqJh2RonIlX83H38WD3uLT6OAjkm3ao-E",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "aniv-hugo3.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "aniv-hugo3",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "aniv-hugo3.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1054325740643",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1054325740643:web:178dd42c5cb93ad7381456",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-EV6PVJXR6Y"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

// Inicializar Storage
const storage = getStorage(app);

// Inicializar Analytics (apenas no navegador)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, db, storage, analytics }; 