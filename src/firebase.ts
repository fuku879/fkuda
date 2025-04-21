// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKtp3dUyEOhIZ6k5IehtpdArIjuQL3BDw",
    authDomain: "household-6bf06.firebaseapp.com",
    projectId: "household-6bf06",
    storageBucket: "household-6bf06.firebasestorage.app",
    messagingSenderId: "391009608257",
    appId: "1:391009608257:web:b9a14341890b08cb8a5cc0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
