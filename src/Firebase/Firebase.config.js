// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCH-YyX2MekCHvaQLL6e6EqJlBYmDatEjc",
    authDomain: "foods-app-704bd.firebaseapp.com",
    projectId: "foods-app-704bd",
    storageBucket: "foods-app-704bd.firebasestorage.app",
    messagingSenderId: "667644319055",
    appId: "1:667644319055:web:18028aea10a32765a5613a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;