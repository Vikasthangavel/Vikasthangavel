// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCb-Lbd99ZNX0Zmjv2Qe9OW5KBKk0EvAe0",
    authDomain: "vikast-me.firebaseapp.com",
    projectId: "vikast-me",
    storageBucket: "vikast-me.firebasestorage.app",
    messagingSenderId: "800389102329",
    appId: "1:800389102329:web:4d935d52c697f06b5cc028",
    measurementId: "G-EQRWYWQNP1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Google Analytics (might be blocked by ad-blockers/tracking prevention)
export let analytics;
try {
    analytics = getAnalytics(app);
} catch (error) {
    console.warn("Firebase Analytics could not be initialized:", error.message);
}