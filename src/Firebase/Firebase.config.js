// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// apiKey: "AIzaSyCH-YyX2MekCHvaQLL6e6EqJlBYmDatEjc",
    // authDomain: "foods-app-704bd.firebaseapp.com",
    // projectId: "foods-app-704bd",
    // storageBucket: "foods-app-704bd.firebasestorage.app",
    // messagingSenderId: "667644319055",
    // appId: "1:667644319055:web:18028aea10a32765a5613a"

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;